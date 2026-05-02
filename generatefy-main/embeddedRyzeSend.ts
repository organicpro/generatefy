import express from "express";
import fs from "fs";
import multer from "multer";
import os from "os";
import path from "path";
import QRCode from "qrcode";
import { execFile } from "child_process";
import type { Client as WhatsAppClient } from "whatsapp-web.js";
import whatsappWeb from "whatsapp-web.js";

const { Client, LocalAuth, MessageMedia } = whatsappWeb;

type WaStatus = "disconnected" | "connecting" | "qr_pending" | "ready";
type DispatchStatus = "running" | "aborting" | "aborted" | "completed";

interface DispatchLogEntry {
  number: string;
  status: "success" | "error";
  error?: string;
  ts: string;
}

interface DispatchHistoryItem {
  id: string;
  name: string;
  message: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  logs: DispatchLogEntry[];
  startedAt: string;
  finishedAt: string | null;
  status: DispatchStatus;
}

interface DispatchSnapshot {
  id: string;
  name: string;
  message: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  status: DispatchStatus;
  startedAt: string;
  finishedAt: string | null;
  lastNumber: string;
  lastError: string;
  mediaType: string;
}

interface ProfileData {
  interval?: string | number;
  acceptedTerms?: boolean;
  [key: string]: unknown;
}

interface WhatsAppNumberId {
  _serialized?: string;
  user?: string;
  server?: string;
}

interface ValidatedMedia {
  filename: string;
  type: string;
  path: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const dataRoot = process.env.RYZESEND_DATA_DIR
  ? path.resolve(process.env.RYZESEND_DATA_DIR)
  : path.join(process.cwd(), "data", "ryzesend");
const DATA_DIR = dataRoot;
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const AUTH_DIR = path.join(DATA_DIR, ".wwebjs_auth");
const CACHE_DIR = process.env.RYZESEND_CACHE_DIR
  ? path.resolve(process.env.RYZESEND_CACHE_DIR)
  : path.join(DATA_DIR, ".wwebjs_cache");
const CHROME_PROFILE_DIR = path.join(DATA_DIR, "chrome-profile");
const CHROME_DEBUG_PORT = Number(process.env.WHATSAPP_DEBUG_PORT || 9222);
const HISTORY_LIMIT = 100;
const SEND_TIMEOUT_MS = Number(process.env.RYZESEND_SEND_TIMEOUT_MS || 60000);

for (const dir of [DATA_DIR, UPLOAD_DIR, CHROME_PROFILE_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  profile: path.join(DATA_DIR, "profile.json"),
  dispatches: path.join(DATA_DIR, "dispatches.json"),
};

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
    }
  } catch {
    return fallback;
  }
  return fallback;
}

function writeJSON(file: string, data: unknown) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

function cleanWhatsAppSession() {
  for (const dir of [AUTH_DIR, CACHE_DIR]) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
}

function sanitizePhoneNumber(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length >= 12 && digits.length <= 15 ? digits : "";
}

function normalizeNumberList(values: unknown[]) {
  const seen = new Set<string>();
  const numbers: string[] = [];

  for (const value of values) {
    const digits = sanitizePhoneNumber(value);
    if (digits && !seen.has(digits)) {
      seen.add(digits);
      numbers.push(digits);
    }
  }

  return numbers;
}

function getSafeBasename(value: unknown) {
  const filename = typeof value === "string" ? path.basename(value.trim()) : "";
  return filename && filename !== "." ? filename : "";
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, `media_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "audio/mpeg",
      "audio/mp3",
      "audio/ogg",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm",
    ]);

    if (allowedMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Formato nao permitido."));
  },
});

export function createEmbeddedRyzeSend() {
  const router = express.Router();

  let waClient: WhatsAppClient | null = null;
  let waStatus: WaStatus = "disconnected";
  let waLastError = "";
  let currentQrDataUrl = "";
  let engineBooting = false;
  let navigationRetryCount = 0;
  let reconnectAttemptCount = 0;
  let connectingWatchdog: NodeJS.Timeout | null = null;
  let reconnectTimer: NodeJS.Timeout | null = null;

  let isDispatching = false;
  let abortSignal = false;
  let currentDispatchSnapshot: DispatchSnapshot | null = null;

  const browserCandidates = [
    process.env.WHATSAPP_EXECUTABLE_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ].filter(Boolean) as string[];

  const getStatusPayload = (status = waStatus) => ({
    status,
    error: waLastError,
    qrCode: status === "qr_pending" ? currentQrDataUrl : "",
    isDispatching,
    currentDispatch: currentDispatchSnapshot,
  });

  const getAdminState = () => ({
    configured: true,
    mode: "embedded" as const,
    running: true,
    booting: engineBooting,
    dataDir: DATA_DIR,
    uploadsDir: UPLOAD_DIR,
    authDir: AUTH_DIR,
    cacheDir: CACHE_DIR,
    hostname: os.hostname(),
    engine: getStatusPayload(),
  });

  function normalizeErrorMessage(error: unknown) {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    if (typeof error === "string" && error.trim()) {
      return error;
    }

    if (error && typeof error === "object") {
      const candidate = error as { message?: unknown; error?: unknown; name?: unknown };
      if (typeof candidate.message === "string" && candidate.message.trim()) {
        return candidate.message;
      }
      if (typeof candidate.error === "string" && candidate.error.trim()) {
        return candidate.error;
      }
      if (typeof candidate.name === "string" && candidate.name.trim()) {
        return candidate.name;
      }

      try {
        const serialized = JSON.stringify(error);
        if (serialized && serialized !== "{}") {
          return serialized;
        }
      } catch {
        // noop
      }
    }

    return "Falha desconhecida ao conectar.";
  }

  function setWaError(error: unknown) {
    const rawMessage = normalizeErrorMessage(error);
    waLastError = rawMessage.includes("spawn EPERM")
      ? "Este ambiente bloqueou a abertura automatica do Chrome para o WhatsApp. O servidor esta ok, mas o QR nao pode ser gerado aqui ate liberar a execucao do navegador."
      : rawMessage;
    console.error("[RyzeSend:Embedded]", waLastError);
  }

  function isRecoverableBrowserError(error: unknown) {
    const message = normalizeErrorMessage(error).toLowerCase();
    return (
      message.includes("target.setautoattach") ||
      message.includes("target closed") ||
      message.includes("session closed") ||
      message.includes("execution context was destroyed") ||
      message.includes("econnrefused 127.0.0.1:9222")
    );
  }

  function clearConnectionTimers() {
    if (connectingWatchdog) {
      clearTimeout(connectingWatchdog);
      connectingWatchdog = null;
    }

    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  }

  function markWhatsAppReady() {
    waStatus = "ready";
    waLastError = "";
    currentQrDataUrl = "";
    engineBooting = false;
    navigationRetryCount = 0;
    reconnectAttemptCount = 0;
    clearConnectionTimers();
  }

  async function refreshWaStatusFromClient() {
    if (!waClient || waStatus === "qr_pending") {
      return;
    }

    try {
      const state = await waClient.getState();
      if (state === "CONNECTED") {
        markWhatsAppReady();
      } else if (state === "OPENING" || state === "PAIRING" || state === "TIMEOUT" || state === "CONFLICT") {
        waStatus = "connecting";
      }
    } catch (error) {
      if (isRecoverableBrowserError(error)) {
        await scheduleReconnect(error);
      }
    }
  }

  async function scheduleReconnect(reason: unknown, options: { fresh?: boolean } = {}) {
    if (reconnectTimer) {
      return;
    }

    if (reconnectAttemptCount >= 3) {
      setWaError(reason);
      engineBooting = false;
      await resetWhatsAppClient();
      return;
    }

    reconnectAttemptCount += 1;
    waStatus = "connecting";
    waLastError = "Reconectando a sessao do WhatsApp apos a validacao do celular...";
    currentQrDataUrl = "";
    engineBooting = true;

    await resetWhatsAppClient();
    waStatus = "connecting";
    waLastError = "Reconectando a sessao do WhatsApp apos a validacao do celular...";
    engineBooting = true;

    reconnectTimer = setTimeout(async () => {
      reconnectTimer = null;
      try {
        await initWhatsApp({ fresh: options.fresh });
      } catch (error) {
        setWaError(error);
      }
    }, 1500);
  }

  function resolveBrowserExecutable() {
    for (const candidate of browserCandidates) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
    return undefined;
  }

  async function readBrowserDebugger(browserURL: string) {
    const response = await fetch(`${browserURL}/json/version`);
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { webSocketDebuggerUrl?: string };
    return payload.webSocketDebuggerUrl || null;
  }

  async function waitForBrowserEndpoint(browserURL: string) {
    for (let attempt = 0; attempt < 20; attempt++) {
      try {
        const wsEndpoint = await readBrowserDebugger(browserURL);
        if (wsEndpoint) {
          return wsEndpoint;
        }
      } catch {
        // noop
      }
      await wait(500);
    }

    return null;
  }

  async function ensureWindowsDebugBrowser(executablePath: string) {
    const browserURL = `http://127.0.0.1:${CHROME_DEBUG_PORT}`;
    const forcedDebuggerUrl = process.env.WHATSAPP_REMOTE_DEBUG_URL?.trim();

    const existingEndpoint = await waitForBrowserEndpoint(browserURL);
    if (existingEndpoint) {
      return existingEndpoint;
    }

    if (forcedDebuggerUrl && !forcedDebuggerUrl.startsWith("ws://") && !forcedDebuggerUrl.startsWith("wss://")) {
      const forcedEndpoint = await waitForBrowserEndpoint(forcedDebuggerUrl);
      if (forcedEndpoint) {
        return forcedEndpoint;
      }
    }

    const chromeArgs = [
      `--remote-debugging-port=${CHROME_DEBUG_PORT}`,
      `--user-data-dir=${CHROME_PROFILE_DIR}`,
      "--no-first-run",
      "--no-default-browser-check",
      "about:blank",
    ];

    const psArgs = [
      "-NoProfile",
      "-Command",
      `Start-Process -FilePath '${executablePath.replace(/'/g, "''")}' -ArgumentList ${chromeArgs
        .map((value) => `'${value.replace(/'/g, "''")}'`)
        .join(",")} -WindowStyle Hidden`,
    ];

    await new Promise<void>((resolve, reject) => {
      execFile("powershell.exe", psArgs, { windowsHide: true }, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });

    const readyEndpoint = await waitForBrowserEndpoint(browserURL);
    if (!readyEndpoint) {
      throw new Error("Nao foi possivel iniciar o Chrome em modo depuracao.");
    }

    return readyEndpoint;
  }

  async function resetWhatsAppClient({ clearSession = false }: { clearSession?: boolean } = {}) {
    clearConnectionTimers();

    if (waClient) {
      try {
        await waClient.destroy();
      } catch {
        // noop
      }
      waClient = null;
    }

    if (clearSession) {
      cleanWhatsAppSession();
    }

    waStatus = "disconnected";
    currentQrDataUrl = "";
  }

  async function initWhatsApp({ fresh = false }: { fresh?: boolean } = {}) {
    if (waClient) {
      return;
    }

    if (fresh) {
      cleanWhatsAppSession();
    }

    engineBooting = true;
    waStatus = "connecting";
    waLastError = "";
    currentQrDataUrl = "";

    const executablePath = resolveBrowserExecutable();
    let browserWSEndpoint: string | undefined;

    if (executablePath) {
      console.log(`[RyzeSend:Embedded] Browser engine: ${executablePath}`);
    } else {
      console.warn("[RyzeSend:Embedded] Chrome/Edge nao detectado explicitamente. Usando resolucao padrao do Puppeteer.");
    }

    try {
      if (process.platform === "win32" && executablePath) {
        browserWSEndpoint = await ensureWindowsDebugBrowser(executablePath);
      }
    } catch (error) {
      setWaError(error);
      engineBooting = false;
      waStatus = "disconnected";
      return;
    }

    waClient = new Client({
      authStrategy: new LocalAuth({ dataPath: AUTH_DIR }),
      takeoverOnConflict: true,
      takeoverTimeoutMs: 0,
      authTimeoutMs: 90000,
      qrMaxRetries: 0,
      puppeteer: {
        headless: process.env.WHATSAPP_HEADLESS !== "false",
        executablePath: browserWSEndpoint ? undefined : executablePath,
        browserWSEndpoint,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--disable-extensions",
          "--disable-features=site-per-process",
          "--window-size=1280,720",
        ],
      },
      webVersionCache: {
        type: "none",
      },
    });

    connectingWatchdog = setTimeout(async () => {
      if (!waClient || waStatus !== "connecting") {
        return;
      }

      try {
        const pageUrl = waClient.pupPage ? await waClient.pupPage.url() : "";
        const pageTitle = waClient.pupPage ? await waClient.pupPage.title() : "";
        const inferredReady = pageUrl.includes("web.whatsapp.com") && /whatsapp/i.test(pageTitle || "");

        if (inferredReady) {
          markWhatsAppReady();
        }
      } catch {
        // noop
      }
    }, 20000);

    waClient.on("qr", async (qr: string) => {
      waStatus = "qr_pending";
      waLastError = "";
      try {
        currentQrDataUrl = await QRCode.toDataURL(qr, {
          width: 720,
          margin: 4,
          errorCorrectionLevel: "Q",
          color: { dark: "#000000", light: "#ffffff" },
        });
      } catch {
        currentQrDataUrl = "";
      }
    });

    waClient.on("authenticated", () => {
      waStatus = "connecting";
      waLastError = "";
      currentQrDataUrl = "";
    });

    waClient.on("ready", () => {
      markWhatsAppReady();
    });

    waClient.on("change_state", (state: string) => {
      if (state === "CONNECTED") {
        markWhatsAppReady();
      } else if (state === "OPENING" || state === "PAIRING" || state === "TIMEOUT" || state === "CONFLICT") {
        waStatus = "connecting";
        waLastError = "";
      }
    });

    waClient.on("auth_failure", async (msg: string) => {
      setWaError(msg || "Falha de autenticacao. Gere um novo QR Code.");
      engineBooting = false;
      await resetWhatsAppClient({ clearSession: true });
    });

    waClient.on("disconnected", async (reason: string) => {
      if (isRecoverableBrowserError(reason)) {
        console.warn("[RyzeSend:Embedded] Sessao do navegador foi reciclada; tentando reconectar o WhatsApp.");
        await scheduleReconnect(reason);
        return;
      }

      if (reason) {
        setWaError(reason);
      }
      engineBooting = false;
      await resetWhatsAppClient();
    });

    waClient
      .initialize()
      .catch(async (error: unknown) => {
        if (isRecoverableBrowserError(error) && navigationRetryCount < 2) {
          navigationRetryCount += 1;
          console.warn(`[RyzeSend:Embedded] Retry de navegacao do WhatsApp Web ${navigationRetryCount}/2`);
          await scheduleReconnect(error, { fresh });
          return;
        }

        setWaError(error);
        engineBooting = false;
        await resetWhatsAppClient();
      });
  }

  async function ensureStarted() {
    if (!waClient) {
      await initWhatsApp();
    }

    for (let attempt = 0; attempt < 10; attempt++) {
      if (waStatus !== "disconnected" || waLastError) {
        break;
      }
      await wait(300);
    }

    return getAdminState();
  }

  function upsertDispatchHistory(dispatch: DispatchHistoryItem) {
    const allDispatches = readJSON<DispatchHistoryItem[]>(FILES.dispatches, []);
    const index = allDispatches.findIndex((item) => item.id === dispatch.id);
    const snapshot = {
      ...dispatch,
      logs: [...dispatch.logs],
    };

    if (index >= 0) {
      allDispatches[index] = snapshot;
    } else {
      allDispatches.unshift(snapshot);
    }

    writeJSON(FILES.dispatches, allDispatches.slice(0, HISTORY_LIMIT));
  }

  function resolveValidatedMedia(mediaFilename: unknown, mediaType: unknown): ValidatedMedia | null {
    const filename = getSafeBasename(mediaFilename);
    if (!filename) {
      return null;
    }

    const type = typeof mediaType === "string" && mediaType.trim() ? mediaType.trim() : "text";
    const filePath = path.join(UPLOAD_DIR, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error("Midia anexada nao foi encontrada no servidor.");
    }

    return { filename, type, path: filePath };
  }

  function getIntervalMs(profile: ProfileData) {
    const intervalSeconds = Number.parseInt(String(profile.interval ?? 20), 10);
    const safeIntervalSeconds = Number.isFinite(intervalSeconds) ? Math.max(1, intervalSeconds) : 20;
    return safeIntervalSeconds * 1000;
  }

  async function abortableDelay(ms: number) {
    const startedAt = Date.now();
    while (!abortSignal && Date.now() - startedAt < ms) {
      await wait(Math.min(500, ms - (Date.now() - startedAt)));
    }
  }

  async function withTimeout<T>(promise: Promise<T>, ms: number, timeoutMessage: string) {
    let timeout: NodeJS.Timeout | null = null;
    try {
      return await Promise.race([
        promise,
        new Promise<T>((_resolve, reject) => {
          timeout = setTimeout(() => reject(new Error(timeoutMessage)), ms);
        }),
      ]);
    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }

  async function ensureReadyClient() {
    await refreshWaStatusFromClient();
    if (!waClient || waStatus !== "ready") {
      throw new Error("WhatsApp nao conectado.");
    }
    await ensureWhatsAppSendCompatibility(waClient);
    return waClient;
  }

  async function ensureWhatsAppSendCompatibility(client: WhatsAppClient) {
    if (!client.pupPage) {
      throw new Error("Pagina do WhatsApp nao esta pronta para envio.");
    }

    await client.pupPage.evaluate(() => {
      const store = (globalThis as { Store?: any }).Store;
      const userStore = store?.User;
      if (!userStore) {
        return;
      }

      if (typeof userStore.getMaybeMeUser !== "function" && typeof userStore.getMeUser === "function") {
        userStore.getMaybeMeUser = userStore.getMeUser.bind(userStore);
      }
    });
  }

  function resolveSerializedNumber(numberId: unknown, fallbackNumber: string) {
    if (typeof numberId === "string" && numberId.includes("@c.us")) {
      return numberId;
    }

    const candidate = numberId as WhatsAppNumberId | null;
    if (candidate?._serialized && candidate._serialized.includes("@c.us")) {
      return candidate._serialized;
    }

    if (candidate?.user && candidate?.server) {
      return `${candidate.user}@${candidate.server}`;
    }

    return `${fallbackNumber}@c.us`;
  }

  async function resolveDestinationChatId(client: WhatsAppClient, normalizedNumber: string) {
    const numberId = await withTimeout(
      client.getNumberId(normalizedNumber) as Promise<unknown>,
      SEND_TIMEOUT_MS,
      "Tempo esgotado ao validar o numero no WhatsApp."
    );

    if (!numberId) {
      throw new Error("Numero nao encontrado no WhatsApp.");
    }

    return resolveSerializedNumber(numberId, normalizedNumber);
  }

  function isPostSendSerializationError(error: unknown) {
    const message = normalizeErrorMessage(error);
    return message.includes("getMessageModel") && message.includes("serialize");
  }

  async function sendWhatsAppMessage(params: {
    client: WhatsAppClient;
    chatId: string;
    message: string;
    media: ValidatedMedia | null;
  }) {
    const { client, chatId, message, media } = params;

    try {
      if (media) {
        const messageMedia = MessageMedia.fromFilePath(media.path);

        if (media.type === "audio") {
          await withTimeout(
            client.sendMessage(chatId, messageMedia, { sendAudioAsVoice: true, sendSeen: false }),
            SEND_TIMEOUT_MS,
            "Tempo esgotado ao enviar a midia."
          );
        } else {
          await withTimeout(
            client.sendMessage(chatId, messageMedia, { caption: message || undefined, sendSeen: false }),
            SEND_TIMEOUT_MS,
            "Tempo esgotado ao enviar a midia."
          );
        }
      } else {
        await withTimeout(
          client.sendMessage(chatId, message, { sendSeen: false }),
          SEND_TIMEOUT_MS,
          "Tempo esgotado ao enviar a mensagem."
        );
      }
    } catch (error) {
      if (isPostSendSerializationError(error)) {
        console.warn("[RyzeSend:Embedded] Mensagem enviada, mas o retorno do WhatsApp Web nao pode ser serializado.");
        return;
      }

      throw error;
    }
  }

  async function runDispatch(params: {
    dispatchId: string;
    dispatch: DispatchHistoryItem;
    message: string;
    numbers: string[];
    mediaFilename?: string;
    mediaType: string;
  }) {
    const { dispatchId, dispatch, message, numbers, mediaFilename, mediaType } = params;
    const profile = readJSON<ProfileData>(FILES.profile, {});
    const intervalMs = getIntervalMs(profile);
    const media = mediaFilename ? resolveValidatedMedia(mediaFilename, mediaType) : null;

    upsertDispatchHistory(dispatch);

    for (let index = 0; index < numbers.length; index++) {
      if (abortSignal) {
        dispatch.status = "aborted";
        break;
      }

      const normalizedNumber = sanitizePhoneNumber(numbers[index]);
      if (!normalizedNumber) {
        dispatch.failed += 1;
        dispatch.pending = Math.max(0, dispatch.pending - 1);
        dispatch.logs.push({
          number: String(numbers[index] ?? ""),
          status: "error",
          error: "Numero invalido.",
          ts: new Date().toISOString(),
        });
        upsertDispatchHistory(dispatch);
        continue;
      }

      try {
        const client = await ensureReadyClient();
        const chatId = await resolveDestinationChatId(client, normalizedNumber);
        await sendWhatsAppMessage({ client, chatId, message, media });

        dispatch.sent += 1;
        dispatch.pending = Math.max(0, dispatch.pending - 1);
        dispatch.logs.push({ number: normalizedNumber, status: "success", ts: new Date().toISOString() });
        currentDispatchSnapshot = currentDispatchSnapshot
          ? {
              ...currentDispatchSnapshot,
              sent: dispatch.sent,
              failed: dispatch.failed,
              pending: dispatch.pending,
              status: dispatch.status,
              lastNumber: normalizedNumber,
              lastError: "",
            }
          : null;
      } catch (error) {
        const messageText = normalizeErrorMessage(error);
        dispatch.failed += 1;
        dispatch.pending = Math.max(0, dispatch.pending - 1);
        dispatch.logs.push({ number: normalizedNumber, status: "error", error: messageText, ts: new Date().toISOString() });
        currentDispatchSnapshot = currentDispatchSnapshot
          ? {
              ...currentDispatchSnapshot,
              sent: dispatch.sent,
              failed: dispatch.failed,
              pending: dispatch.pending,
              status: dispatch.status,
              lastNumber: normalizedNumber,
              lastError: messageText,
            }
          : null;

        if (isRecoverableBrowserError(error) || messageText.includes("WhatsApp nao conectado")) {
          dispatch.status = "aborted";
          await scheduleReconnect(error);
          break;
        }
      }

      upsertDispatchHistory(dispatch);

      if (index < numbers.length - 1 && !abortSignal) {
        await abortableDelay(intervalMs);
      }
    }

    if (dispatch.status === "running") {
      dispatch.status = "completed";
    }

    dispatch.finishedAt = new Date().toISOString();
    isDispatching = false;
    abortSignal = false;

    currentDispatchSnapshot = currentDispatchSnapshot
      ? {
          ...currentDispatchSnapshot,
          sent: dispatch.sent,
          failed: dispatch.failed,
          pending: dispatch.pending,
          status: dispatch.status,
          finishedAt: dispatch.finishedAt,
        }
      : null;

    if (media) {
      if (fs.existsSync(media.path)) {
        fs.unlinkSync(media.path);
      }
    }

    upsertDispatchHistory(dispatch);

    console.log(`[RyzeSend:Embedded] Dispatch ${dispatchId} finalizado com status ${dispatch.status}.`);
  }

  router.get("/status", async (_req, res) => {
    await refreshWaStatusFromClient();
    res.json(getStatusPayload());
  });

  router.post("/connect", async (req, res) => {
    const fresh = req.query.fresh === "1" || req.body?.fresh === true;
    if (fresh && waClient) {
      await resetWhatsAppClient({ clearSession: true });
    }
    if (!waClient) {
      await initWhatsApp({ fresh });
    } else {
      await refreshWaStatusFromClient();
    }
    res.json({ ok: true, ...getStatusPayload() });
  });

  router.post("/disconnect", async (_req, res) => {
    await resetWhatsAppClient({ clearSession: true });
    waStatus = "disconnected";
    waLastError = "";
    res.json({ ok: true });
  });

  router.post("/upload", (req, res) => {
    upload.single("media")(req, res, (error) => {
      if (error) {
        res.status(400).json({ error: normalizeErrorMessage(error) });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: "Nenhum arquivo recebido." });
        return;
      }

      res.json({
        ok: true,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
      });
    });
  });

  router.delete("/upload", (req, res) => {
    const filename = typeof req.body?.filename === "string" ? req.body.filename : "";
    if (filename) {
      const filePath = path.join(UPLOAD_DIR, path.basename(filename));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.json({ ok: true });
  });

  router.get("/profile", (_req, res) => {
    res.json(readJSON<ProfileData>(FILES.profile, {}));
  });

  router.post("/profile", (req, res) => {
    writeJSON(FILES.profile, req.body ?? {});
    res.json({ ok: true });
  });

  router.get("/dispatches", (_req, res) => {
    res.json(readJSON<DispatchHistoryItem[]>(FILES.dispatches, []));
  });

  router.get("/dispatch/current", (_req, res) => {
    res.json(currentDispatchSnapshot);
  });

  router.post("/dispatch", async (req, res) => {
    try {
      await ensureReadyClient();
    } catch {
      res.status(400).json({ error: "WhatsApp nao conectado." });
      return;
    }

    if (isDispatching) {
      res.status(400).json({ error: "Ja existe um disparo em andamento." });
      return;
    }

    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const mediaType = typeof req.body?.mediaType === "string" ? req.body.mediaType : "text";
    let media: ValidatedMedia | null = null;
    try {
      media = resolveValidatedMedia(req.body?.mediaFilename, mediaType);
    } catch (error) {
      res.status(400).json({ error: normalizeErrorMessage(error) });
      return;
    }
    const numbers = Array.isArray(req.body?.numbers) ? normalizeNumberList(req.body.numbers) : [];

    if (!message && !media) {
      res.status(400).json({ error: "Mensagem nao pode estar vazia." });
      return;
    }

    if (numbers.length === 0) {
      res.status(400).json({ error: "Nenhum numero valido fornecido." });
      return;
    }

    const profile = readJSON<ProfileData>(FILES.profile, {});
    if (profile.acceptedTerms === false) {
      res.status(400).json({ error: "Aceite os termos operacionais antes de iniciar um disparo." });
      return;
    }

    const dispatchId = Date.now().toString();
    const dispatch: DispatchHistoryItem = {
      id: dispatchId,
      name: name || `Disparo ${new Date().toLocaleString("pt-BR")}`,
      message,
      total: numbers.length,
      sent: 0,
      failed: 0,
      pending: numbers.length,
      logs: [],
      startedAt: new Date().toISOString(),
      finishedAt: null,
      status: "running",
    };

    currentDispatchSnapshot = {
      id: dispatchId,
      name: dispatch.name,
      message,
      total: dispatch.total,
      sent: 0,
      failed: 0,
      pending: dispatch.total,
      status: "running",
      startedAt: dispatch.startedAt,
      finishedAt: null,
      lastNumber: "",
      lastError: "",
      mediaType: media?.type || mediaType,
    };

    isDispatching = true;
    abortSignal = false;
    upsertDispatchHistory(dispatch);

    res.json({ ok: true, dispatchId, total: numbers.length });

    void runDispatch({
      dispatchId,
      dispatch,
      message,
      numbers,
      mediaFilename: media?.filename,
      mediaType: media?.type || mediaType,
    }).catch((error) => {
      const messageText = normalizeErrorMessage(error);
      dispatch.status = "aborted";
      dispatch.finishedAt = new Date().toISOString();
      dispatch.failed += dispatch.pending;
      dispatch.pending = 0;
      dispatch.logs.push({ number: "fila", status: "error", error: messageText, ts: new Date().toISOString() });
      isDispatching = false;
      abortSignal = false;
      currentDispatchSnapshot = currentDispatchSnapshot
        ? {
            ...currentDispatchSnapshot,
            failed: dispatch.failed,
            pending: 0,
            status: "aborted",
            finishedAt: dispatch.finishedAt,
            lastError: messageText,
          }
        : null;
      upsertDispatchHistory(dispatch);
    });
  });

  router.delete("/dispatches", (_req, res) => {
    writeJSON(FILES.dispatches, []);
    res.json({ ok: true });
  });

  router.post("/dispatch/abort", (_req, res) => {
    abortSignal = true;
    if (currentDispatchSnapshot && currentDispatchSnapshot.status === "running") {
      currentDispatchSnapshot = {
        ...currentDispatchSnapshot,
        status: "aborting",
      };
    }
    res.json({ ok: true });
  });

  return {
    router,
    ensureStarted,
    getAdminState,
    getStatusPayload,
  };
}
