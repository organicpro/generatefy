// ============================================================
// RyzeSend - Server
// (c) 2026 RyzeSend v2.0
// ============================================================

const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const QRCode  = require('qrcode');
const multer  = require('multer');
const os      = require('os');

const fs       = require('fs');
const path     = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// ── Data ──────────────────────────────────────────────────

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const FILES = {
  profile:    path.join(DATA_DIR, 'profile.json'),
  dispatches: path.join(DATA_DIR, 'dispatches.json'),
};

function readJSON(file, fallback) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (_) {}
  return fallback;
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Upload config ─────────────────────────────────────────
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename:    (req, file, cb) => cb(null, `media_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'audio/mpeg', 'audio/mp3', 'audio/ogg',
      'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm',
    ];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Formato nao permitido.'));
  },
});



// ── WhatsApp ──────────────────────────────────────────────

let waClient = null;
let waStatus = 'disconnected'; // disconnected | connecting | qr_pending | ready
let waLastError = '';
let currentQrDataUrl = '';

const AUTH_DIR = path.join(DATA_DIR, '.wwebjs_auth');
const CACHE_DIR = path.join(__dirname, '.wwebjs_cache');
const BROWSER_CANDIDATES = [
  process.env.WHATSAPP_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

function getStatusPayload(status = waStatus) {
  return {
    status,
    error: waLastError,
    qrCode: status === 'qr_pending' ? currentQrDataUrl : '',
    isDispatching,
    currentDispatch: currentDispatchSnapshot,
  };
}

function emitWaStatus(status = waStatus) {
  io.emit('wa:status', getStatusPayload(status));
}

function cleanWhatsAppSession() {
  [AUTH_DIR, CACHE_DIR].forEach(dir => {
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  });
}

function resolveBrowserExecutable() {
  for (const candidate of BROWSER_CANDIDATES) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined;
}

async function resetWhatsAppClient({ clearSession = false } = {}) {
  if (waClient) {
    try { await waClient.destroy(); } catch (_) {}
    waClient = null;
  }
  if (clearSession) cleanWhatsAppSession();
  waStatus = 'disconnected';
  currentQrDataUrl = '';
}

function setWaError(err) {
  waLastError = err && err.message ? err.message : String(err || 'Falha desconhecida ao conectar.');
  console.error('[WhatsApp]', waLastError);
}

function initWhatsApp({ fresh = false } = {}) {
  if (waClient) return;
  if (fresh) cleanWhatsAppSession();

  waStatus = 'connecting';
  waLastError = '';
  emitWaStatus('connecting');

  const executablePath = resolveBrowserExecutable();
  if (executablePath) {
    console.log(`[WhatsApp] Browser engine: ${executablePath}`);
  } else {
    console.warn('[WhatsApp] Nenhum Chrome/Edge detectado explicitamente. Usando resolucao padrao do Puppeteer.');
  }

  waClient = new Client({
    authStrategy: new LocalAuth({ dataPath: AUTH_DIR }),
    takeoverOnConflict: true,
    takeoverTimeoutMs: 0,
    authTimeoutMs: 90000,
    qrMaxRetries: 8,
    puppeteer: {
      headless: true,
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-features=site-per-process',
        '--window-size=1280,720'
      ]
    }
  });

  waClient.on('qr', async (qr) => {
    waStatus = 'qr_pending';
    waLastError = '';
    try {
      currentQrDataUrl = await QRCode.toDataURL(qr, {
        width: 260,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' }
      });
      io.emit('wa:qr', currentQrDataUrl);
    } catch (e) {
      currentQrDataUrl = '';
      io.emit('wa:qr', qr);
    }
    emitWaStatus('qr_pending');
  });

  waClient.on('authenticated', () => {
    waStatus = 'connecting';
    waLastError = '';
    currentQrDataUrl = '';
    emitWaStatus('connecting');
  });

  waClient.on('ready', () => {
    waStatus = 'ready';
    waLastError = '';
    currentQrDataUrl = '';
    emitWaStatus('ready');
  });

  waClient.on('auth_failure', async (msg) => {
    setWaError(msg || 'Falha de autenticacao. Gere um novo QR Code.');
    await resetWhatsAppClient({ clearSession: true });
    emitWaStatus('disconnected');
  });

  waClient.on('disconnected', async (reason) => {
    if (reason) setWaError(reason);
    await resetWhatsAppClient();
    emitWaStatus('disconnected');
  });

  waClient.initialize().catch(async (err) => {
    setWaError(err);
    await resetWhatsAppClient();
    emitWaStatus('disconnected');
  });
}

// ── Dispatch state ────────────────────────────────────────

let isDispatching = false;
let abortSignal   = false;
let currentDispatchSnapshot = null;

// ── Routes ────────────────────────────────────────────────

app.get('/api/status', (req, res) => {
  res.json(getStatusPayload());
});

app.post('/api/connect', (req, res) => {
  const fresh = req.query.fresh === '1' || req.body?.fresh === true;
  if (!waClient) initWhatsApp({ fresh });
  res.json({ ok: true, status: waStatus, error: waLastError });
});

app.post('/api/disconnect', async (req, res) => {
  await resetWhatsAppClient({ clearSession: true });
  waStatus = 'disconnected';
  waLastError = '';
  emitWaStatus('disconnected');

  // Apaga sessão salva para permitir novo QR
  const authDir = path.join(DATA_DIR, '.wwebjs_auth');
  const cacheDir = path.join(__dirname, '.wwebjs_cache');
  [authDir, cacheDir].forEach(dir => {
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  });

  res.json({ ok: true });
});

// Upload
app.post('/api/upload', upload.single('media'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo recebido.' });
  res.json({ ok: true, filename: req.file.filename, originalname: req.file.originalname, size: req.file.size });
});

app.delete('/api/upload', (req, res) => {
  const { filename } = req.body;
  if (filename) {
    const fp = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }
  res.json({ ok: true });
});

// Profile
app.get('/api/profile',  (req, res) => res.json(readJSON(FILES.profile, {})));
app.post('/api/profile', (req, res) => {
  writeJSON(FILES.profile, req.body);
  res.json({ ok: true });
});

// Dispatches
app.get('/api/dispatches', (req, res) => res.json(readJSON(FILES.dispatches, [])));
app.get('/api/dispatch/current', (req, res) => res.json(currentDispatchSnapshot));

// Start dispatch
app.post('/api/dispatch', async (req, res) => {
  if (waStatus !== 'ready')
    return res.status(400).json({ error: 'WhatsApp não conectado.' });
  if (isDispatching)
    return res.status(400).json({ error: 'Já existe um disparo em andamento.' });

  const { message, numbers, name, mediaFilename, mediaType } = req.body;
  if ((!message || !message.trim()) && mediaType === 'text')
    return res.status(400).json({ error: 'Mensagem não pode estar vazia.' });
  if (!numbers || !numbers.length)
    return res.status(400).json({ error: 'Nenhum número válido fornecido.' });

  const profile  = readJSON(FILES.profile, {});
  const interval = parseInt(profile.interval || 20) * 1000;

  const dispatchId = Date.now().toString();
  const dispatch = {
    id: dispatchId,
    name: name || `Disparo ${new Date().toLocaleString('pt-BR')}`,
    message,
    total:      numbers.length,
    sent:       0,
    failed:     0,
    pending:    numbers.length,
    logs:       [],
    startedAt:  new Date().toISOString(),
    finishedAt: null,
    status:     'running',
  };

  currentDispatchSnapshot = {
    id: dispatchId,
    name: dispatch.name,
    message,
    total: dispatch.total,
    sent: dispatch.sent,
    failed: dispatch.failed,
    pending: dispatch.pending,
    status: dispatch.status,
    startedAt: dispatch.startedAt,
    finishedAt: null,
    lastNumber: '',
    lastError: '',
    mediaType: mediaType || 'text',
  };

  isDispatching = true;
  abortSignal   = false;

  res.json({ ok: true, dispatchId, total: numbers.length });

  // Async loop
  (async () => {
    io.emit('dispatch:start', { dispatchId, total: numbers.length });

    for (let i = 0; i < numbers.length; i++) {
      if (abortSignal) { dispatch.status = 'aborted'; break; }

      const numero = numbers[i].trim();
      const chatId = numero.includes('@c.us') ? numero : `${numero}@c.us`;

      try {
        const numberId = await waClient.getNumberId(numero);
        if (!numberId) {
          throw new Error('Número não encontrado no WhatsApp');
        }
        if (mediaFilename) {
          const mediaPath = path.join(UPLOAD_DIR, mediaFilename);
          if (mediaType === 'video') {
            const media = MessageMedia.fromFilePath(mediaPath);
            await waClient.sendMessage(numberId._serialized, media, { caption: message || undefined });
          } else if (mediaType === 'audio') {
            const media = MessageMedia.fromFilePath(mediaPath);
            await waClient.sendMessage(numberId._serialized, media, { sendAudioAsVoice: true });
          } else {
            const media = MessageMedia.fromFilePath(mediaPath);
            await waClient.sendMessage(numberId._serialized, media, { caption: message || undefined });
          }
        } else {
          await waClient.sendMessage(numberId._serialized, message);
        }
        dispatch.sent++;
        dispatch.pending--;
        dispatch.logs.push({ number: numero, status: 'success', ts: new Date().toISOString() });
        currentDispatchSnapshot = {
          ...currentDispatchSnapshot,
          sent: dispatch.sent,
          failed: dispatch.failed,
          pending: dispatch.pending,
          status: dispatch.status,
          lastNumber: numero,
          lastError: '',
        };
        io.emit('dispatch:progress', {
          dispatchId, number: numero, status: 'success',
          sent: dispatch.sent, failed: dispatch.failed,
          pending: dispatch.pending, total: dispatch.total,
        });
      } catch (err) {
        dispatch.failed++;
        dispatch.pending--;
        console.error(`  [ERRO] ${numero}: ${err.message}`);
        dispatch.logs.push({ number: numero, status: 'error', error: err.message, ts: new Date().toISOString() });
        currentDispatchSnapshot = {
          ...currentDispatchSnapshot,
          sent: dispatch.sent,
          failed: dispatch.failed,
          pending: dispatch.pending,
          status: dispatch.status,
          lastNumber: numero,
          lastError: err.message,
        };
        io.emit('dispatch:progress', {
          dispatchId, number: numero, status: 'error',
          sent: dispatch.sent, failed: dispatch.failed,
          pending: dispatch.pending, total: dispatch.total,
        });
      }

      if (i < numbers.length - 1 && !abortSignal)
        await new Promise(r => setTimeout(r, interval));
    }

    if (dispatch.status === 'running') dispatch.status = 'completed';
    dispatch.finishedAt = new Date().toISOString();
    isDispatching = false;
    currentDispatchSnapshot = currentDispatchSnapshot ? {
      ...currentDispatchSnapshot,
      sent: dispatch.sent,
      failed: dispatch.failed,
      pending: dispatch.pending,
      status: dispatch.status,
      finishedAt: dispatch.finishedAt,
    } : null;

    // Clean up uploaded media
    if (mediaFilename) {
      const mp = path.join(UPLOAD_DIR, mediaFilename);
      if (fs.existsSync(mp)) fs.unlinkSync(mp);
    }

    const all = readJSON(FILES.dispatches, []);
    all.unshift(dispatch);
    writeJSON(FILES.dispatches, all);

    io.emit('dispatch:done', {
      dispatchId,
      sent:    dispatch.sent,
      failed:  dispatch.failed,
      total:   dispatch.total,
      status:  dispatch.status,
    });
  })();
});

app.delete('/api/dispatches', (req, res) => {
  writeJSON(FILES.dispatches, []);
  res.json({ ok: true });
});

app.post('/api/dispatch/abort', (req, res) => {
  abortSignal = true;
  if (currentDispatchSnapshot && currentDispatchSnapshot.status === 'running') {
    currentDispatchSnapshot = {
      ...currentDispatchSnapshot,
      status: 'aborting',
    };
  }
  res.json({ ok: true });
});

// ── Socket.io ─────────────────────────────────────────────

io.on('connection', (socket) => {
  socket.emit('wa:status', getStatusPayload());
  socket.emit('server:state', { isDispatching });
});

// ── Boot ──────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('\n  ╔═══════════════════════════════════════╗');
  console.log('  ║         RYZESEND — v2.0               ║');
  console.log('  ║  (c) 2026 RyzeSend                    ║');
  console.log(`  ║  Rodando em http://localhost:${PORT}      ║`);
  console.log('  ╚═══════════════════════════════════════╝\n');
});
