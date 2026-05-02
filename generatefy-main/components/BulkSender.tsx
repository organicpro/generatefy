import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  PauseCircle,
  PlayCircle,
  Power,
  QrCode,
  RefreshCcw,
  Send,
  Shield,
  Smartphone,
  Upload,
  Users,
  XCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { UserIdentity } from '../types';

interface BulkSenderProps {
  currentProjectDesc: string;
  identity: UserIdentity;
}

interface EngineStatus {
  status: 'disconnected' | 'connecting' | 'qr_pending' | 'ready';
  error?: string;
  qrCode?: string;
  isDispatching?: boolean;
  currentDispatch?: DispatchSnapshot | null;
}

interface DispatchSnapshot {
  id: string;
  name: string;
  message: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  status: 'running' | 'aborting' | 'aborted' | 'completed';
  startedAt: string;
  finishedAt: string | null;
  lastNumber: string;
  lastError: string;
  mediaType: string;
}

interface DispatchHistoryItem {
  id: string;
  name: string;
  total: number;
  sent: number;
  failed: number;
  pending?: number;
  startedAt: string;
  finishedAt: string | null;
  status: string;
  logs?: Array<{ number: string; status: string; error?: string; ts: string }>;
}

interface ProfileData {
  name: string;
  email: string;
  business: string;
  segment: string;
  interval: string;
  acceptedTerms: boolean;
}

const defaultProfile = (identity: UserIdentity): ProfileData => ({
  name: identity.name || '',
  email: '',
  business: identity.specialty || '',
  segment: identity.specialty || 'Marketing Digital',
  interval: '20',
  acceptedTerms: true,
});

const normalizePhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, '').replace(/^0+/, '');
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if (digits.length >= 12 && digits.length <= 15) return digits;
  return '';
};

const parseNumbers = (raw: string) => {
  const candidates = raw
    .split(/\r?\n|,|;|\|/)
    .flatMap((chunk) => {
      const digits = chunk.replace(/\D/g, '').replace(/^0+/, '');
      if (digits.length >= 10 && digits.length <= 15) return [chunk];
      return digits.match(/55\d{10,11}|\d{10,11}/g) || [];
    })
    .map(normalizePhoneDigits)
    .filter(Boolean);

  return Array.from(new Set(candidates));
};

const formatDateTime = (value?: string | null) => {
  if (!value) return 'Agora';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Agora' : date.toLocaleString('pt-BR');
};

const getMediaType = (file: File | null) => {
  if (!file) return 'text';
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.startsWith('video/')) return 'video';
  return 'text';
};

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'error' in payload
        ? String((payload as { error?: string; message?: string }).message || (payload as { error?: string }).error)
        : 'Falha na comunicacao com o motor de disparo.';
    throw new Error(message);
  }

  return payload as T;
}

export default function BulkSender({ currentProjectDesc, identity }: BulkSenderProps) {
  const [engineStatus, setEngineStatus] = useState<EngineStatus | null>(null);
  const [dispatchHistory, setDispatchHistory] = useState<DispatchHistoryItem[]>([]);
  const [profile, setProfile] = useState<ProfileData>(() => defaultProfile(identity));
  const [campaignName, setCampaignName] = useState('Campanha Generatefy');
  const [message, setMessage] = useState('');
  const [numbersText, setNumbersText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isBooting, setIsBooting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const pollRef = useRef<number | null>(null);

  const parsedNumbers = parseNumbers(numbersText);
  const currentDispatch = engineStatus?.currentDispatch || null;
  const progress = currentDispatch ? Math.round(((currentDispatch.sent + currentDispatch.failed) / Math.max(currentDispatch.total, 1)) * 100) : 0;

  const loadEngineState = async (silent = false) => {
    try {
      const [status, profileData, historyData] = await Promise.all([
        apiFetch<EngineStatus>('/api/whatsapp-engine/status'),
        apiFetch<Partial<ProfileData>>('/api/whatsapp-engine/profile'),
        apiFetch<DispatchHistoryItem[]>('/api/whatsapp-engine/dispatches'),
      ]);

      setEngineStatus(status);
      setDispatchHistory(Array.isArray(historyData) ? historyData : []);
      if (profileData && Object.keys(profileData).length > 0) {
        setProfile((prev) => ({
          ...prev,
          ...profileData,
          acceptedTerms: profileData.acceptedTerms ?? prev.acceptedTerms,
          interval: String(profileData.interval ?? prev.interval),
        }));
      }
      setError('');
    } catch (err: any) {
      if (!silent) {
        setError(err.message || 'Nao foi possivel carregar o motor de disparo.');
      }
      setEngineStatus(null);
    }
  };

  useEffect(() => {
    if (currentProjectDesc) {
      const baseName = currentProjectDesc.split('. ')[0].slice(0, 60).trim();
      if (baseName) {
        setCampaignName(`Disparo - ${baseName}`);
      }
    }
    if (!message && currentProjectDesc) {
      setMessage(`Olá! Estou entrando em contato por causa desta oferta: ${currentProjectDesc}`);
    }
  }, [currentProjectDesc]);

  useEffect(() => {
    void loadEngineState();

    pollRef.current = window.setInterval(() => {
      void loadEngineState(true);
    }, 4000);

    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
      }
    };
  }, []);

  const handleStartEngine = async () => {
    setIsBooting(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/whatsapp-engine-admin/start', { method: 'POST' });
      await loadEngineState();
      setSuccess('Motor WhatsApp inicializado com sucesso.');
    } catch (err: any) {
      setError(err.message || 'Nao foi possivel iniciar o motor WhatsApp.');
    } finally {
      setIsBooting(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/whatsapp-engine/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      setSuccess('Perfil operacional salvo no motor de disparo.');
    } catch (err: any) {
      setError(err.message || 'Nao foi possivel salvar o perfil.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleConnect = async (fresh = false) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch(`/api/whatsapp-engine/connect${fresh ? '?fresh=1' : ''}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fresh }),
      });
      await loadEngineState();
      setSuccess(fresh ? 'Novo QR solicitado com sucesso.' : 'Solicitacao de conexao enviada ao WhatsApp.');
    } catch (err: any) {
      setError(err.message || 'Nao foi possivel conectar o WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/whatsapp-engine/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      await loadEngineState();
      setSuccess('Sessao do WhatsApp desconectada.');
    } catch (err: any) {
      setError(err.message || 'Nao foi possivel desconectar o WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartDispatch = async () => {
    if (!profile.acceptedTerms) {
      setError('Aceite os termos operacionais antes de iniciar um disparo.');
      return;
    }
    if (parsedNumbers.length === 0) {
      setError('Adicione ao menos um numero valido em formato DDI + DDD + numero.');
      return;
    }
    if (!message.trim() && !selectedFile) {
      setError('Preencha a mensagem ou anexe uma midia antes de disparar.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    let uploadedFilename = '';

    try {
      await apiFetch('/api/whatsapp-engine/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (selectedFile) {
        const formData = new FormData();
        formData.append('media', selectedFile);
        const uploadResponse = await apiFetch<{ filename: string }>('/api/whatsapp-engine/upload', {
          method: 'POST',
          body: formData,
        });
        uploadedFilename = uploadResponse.filename;
      }

      await apiFetch('/api/whatsapp-engine/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName.trim() || `Campanha ${new Date().toLocaleString('pt-BR')}`,
          message: message.trim(),
          numbers: parsedNumbers,
          mediaFilename: uploadedFilename || undefined,
          mediaType: getMediaType(selectedFile),
        }),
      });

      setSuccess('Disparo iniciado. A etapa final agora esta operando com o motor real de WhatsApp.');
      setSelectedFile(null);
      await loadEngineState();
    } catch (err: any) {
      if (uploadedFilename) {
        try {
          await apiFetch('/api/whatsapp-engine/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: uploadedFilename }),
          });
        } catch {
          // noop
        }
      }
      setError(err.message || 'Nao foi possivel iniciar o disparo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAbortDispatch = async () => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/whatsapp-engine/dispatch/abort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      await loadEngineState();
      setSuccess('Sinal de abortar disparo enviado para o motor.');
    } catch (err: any) {
      setError(err.message || 'Nao foi possivel abortar o disparo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearHistory = async () => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await apiFetch('/api/whatsapp-engine/dispatches', { method: 'DELETE' });
      setDispatchHistory([]);
      setSuccess('Historico do motor de disparo limpo com sucesso.');
    } catch (err: any) {
      setError(err.message || 'Nao foi possivel limpar o historico.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusTone =
    engineStatus?.status === 'ready'
      ? 'text-green-400 border-green-500/20 bg-green-500/10'
      : engineStatus?.status === 'qr_pending'
        ? 'text-amber-300 border-amber-500/20 bg-amber-500/10'
        : engineStatus?.status === 'connecting'
          ? 'text-sky-300 border-sky-500/20 bg-sky-500/10'
          : 'text-zinc-400 border-white/10 bg-white/5';

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Send className="w-3.5 h-3.5" />
            Fase Final: Motor WhatsApp Operacional
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Disparo real com <span className="text-primary italic">WhatsApp Engine.</span>
          </h1>
          <p className="text-neutral-500 max-w-3xl text-sm font-medium">
            A Generatefy agora fecha o funil direto no motor de disparo. Aqui você conecta o WhatsApp, salva o perfil do operador,
            sobe mídia, envia para a lista final e acompanha a execução em tempo real.
          </p>
        </header>

        {(error || success) && (
          <div
            className={cn(
              'rounded-[2rem] border px-5 py-4 text-sm font-semibold flex items-center gap-3',
              error ? 'border-red-500/20 bg-red-500/10 text-red-200' : 'border-green-500/20 bg-green-500/10 text-green-200'
            )}
          >
            {error ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{error || success}</span>
          </div>
        )}

        {engineStatus?.error && (
          <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm font-semibold flex items-start gap-3 text-amber-100">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>O motor de WhatsApp reportou: <span className="font-black">{engineStatus.error}</span></p>
              <p className="text-xs text-amber-200/80">O QR code aparece neste mesmo painel, logo abaixo do bloco “Motor de Disparo WhatsApp”, assim que o status mudar para <span className="font-black">QR aguardando leitura</span>.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 space-y-8">
            <section className="bg-card/40 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl space-y-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black tracking-widest uppercase', statusTone)}>
                    <Power className="w-3.5 h-3.5" />
                    {engineStatus?.status === 'ready'
                      ? 'WhatsApp pronto'
                      : engineStatus?.status === 'qr_pending'
                        ? 'QR aguardando leitura'
                        : engineStatus?.status === 'connecting'
                          ? 'Conectando motor'
                          : 'Motor offline'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Motor de Disparo WhatsApp</h2>
                    <p className="text-xs text-neutral-500 font-medium mt-1">
                      Projeto em campanha: <span className="text-primary">{campaignName}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleStartEngine}
                    disabled={isBooting}
                    className="px-5 py-3 rounded-2xl bg-primary text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                  >
                    {isBooting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
                    Iniciar motor
                  </button>
                  <button
                    onClick={() => handleConnect(false)}
                    disabled={isSubmitting}
                    className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                  >
                    <Smartphone className="w-4 h-4" />
                    Conectar WhatsApp
                  </button>
                  <button
                    onClick={() => handleConnect(true)}
                    disabled={isSubmitting}
                    className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                  >
                    <QrCode className="w-4 h-4" />
                    Novo QR
                  </button>
                  <button
                    onClick={handleDisconnect}
                    disabled={isSubmitting}
                    className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                  >
                    <PauseCircle className="w-4 h-4" />
                    Desconectar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                  <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Motor</p>
                  <p className="text-lg font-black text-white">{engineStatus?.status || 'aguardando'}</p>
                  <p className="text-[10px] text-neutral-500">Conexao interna ativa para o motor de disparo.</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                  <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Fila ativa</p>
                  <p className="text-lg font-black text-white">{currentDispatch ? `${currentDispatch.sent + currentDispatch.failed}/${currentDispatch.total}` : '0/0'}</p>
                  <p className="text-[10px] text-neutral-500">
                    {currentDispatch ? `Ultimo destino: ${currentDispatch.lastNumber || 'em processamento'}` : 'Nenhum disparo em andamento.'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                  <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Intervalo</p>
                  <p className="text-lg font-black text-white">{profile.interval}s</p>
                  <p className="text-[10px] text-neutral-500">Controle salvo dentro do perfil operacional.</p>
                </div>
              </div>

              {engineStatus?.qrCode ? (
                <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-6 flex flex-col lg:flex-row gap-6 items-center">
                  <div className="rounded-[2rem] bg-white p-3 shadow-2xl">
                    <img
                      src={engineStatus.qrCode}
                      alt="QR Code do WhatsApp"
                      className="w-72 h-72 md:w-80 md:h-80 block"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Leitura pendente</p>
                    <h3 className="text-2xl font-black text-white">Escaneie este QR com o WhatsApp.</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                      Abra o WhatsApp no celular, entre em Dispositivos conectados e faça a leitura. Quando o motor ficar
                      em estado <span className="text-primary">ready</span>, o disparo já pode ser executado por esta etapa final.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 flex items-start gap-4">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Sessao operacional</p>
                    <p className="text-sm text-neutral-400">
                      Se o QR ainda nao apareceu, use <span className="text-white">Iniciar motor</span> e depois{' '}
                      <span className="text-white">Conectar WhatsApp</span>. O arquivo de sessao corrompido do backup foi
                      ignorado, então o primeiro login pode pedir nova autenticacao.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-card/40 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Campanha de disparo</h2>
                  <p className="text-xs text-neutral-500 font-medium mt-1">
                    Use o contexto do projeto atual para fechar a operação com lista, copy e mídia.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Numeros validos</p>
                  <p className="text-2xl font-black text-primary">{parsedNumbers.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Nome da campanha</label>
                  <input
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white outline-none focus:border-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Mídia opcional</label>
                  <label className="w-full rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-neutral-400 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-colors">
                    <Upload className="w-4 h-4 text-primary" />
                    <span className="truncate">{selectedFile ? selectedFile.name : 'Imagem, audio ou video para anexar'}</span>
                    <input
                      type="file"
                      accept="image/*,audio/*,video/*"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Mensagem base</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none focus:border-primary/40 resize-none"
                  placeholder="Escreva aqui a copy final da sua campanha."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Lista de numeros</label>
                <textarea
                  value={numbersText}
                  onChange={(e) => setNumbersText(e.target.value)}
                  rows={8}
                  className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none focus:border-primary/40 resize-none font-mono"
                  placeholder={'5511999999999\n5511988888888\n5521997777777'}
                />
                <p className="text-[11px] text-neutral-500">
                  Formato esperado: DDI + DDD + numero, sem simbolos. A validação já ignora espaços, traços e parênteses.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleStartDispatch}
                  disabled={isSubmitting || engineStatus?.status !== 'ready' || !!currentDispatch?.status?.match(/running|aborting/)}
                  className="px-6 py-4 rounded-2xl bg-primary text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Iniciar disparo real
                </button>
                <button
                  onClick={handleAbortDispatch}
                  disabled={isSubmitting || !currentDispatch || !['running', 'aborting'].includes(currentDispatch.status)}
                  className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                >
                  <XCircle className="w-4 h-4" />
                  Abortar fila
                </button>
                <button
                  onClick={() => void loadEngineState()}
                  disabled={isSubmitting}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 disabled:opacity-40"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Atualizar status
                </button>
              </div>
            </section>
          </div>

          <div className="xl:col-span-4 space-y-6">
            <section className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Perfil operacional</h3>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSavingProfile}
                  className="text-[9px] font-black uppercase tracking-widest text-primary disabled:opacity-40"
                >
                  {isSavingProfile ? 'Salvando...' : 'Salvar'}
                </button>
              </div>

              <div className="space-y-3">
                <input
                  value={profile.name}
                  onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome do operador"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white outline-none"
                />
                <input
                  value={profile.email}
                  onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="E-mail"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white outline-none"
                />
                <input
                  value={profile.business}
                  onChange={(e) => setProfile((prev) => ({ ...prev, business: e.target.value }))}
                  placeholder="Negocio"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white outline-none"
                />
                <input
                  value={profile.segment}
                  onChange={(e) => setProfile((prev) => ({ ...prev, segment: e.target.value }))}
                  placeholder="Segmento"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white outline-none"
                />
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest px-1">Intervalo entre envios</label>
                  <input
                    value={profile.interval}
                    onChange={(e) => setProfile((prev) => ({ ...prev, interval: e.target.value.replace(/\D/g, '') || '0' }))}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white outline-none"
                  />
                </div>
                <label className="flex items-start gap-3 text-[11px] text-neutral-400 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={profile.acceptedTerms}
                    onChange={(e) => setProfile((prev) => ({ ...prev, acceptedTerms: e.target.checked }))}
                    className="mt-0.5 accent-primary"
                  />
                  <span>Confirmo que essa etapa final será usada com consentimento e dentro do ritmo seguro da conta.</span>
                </label>
              </div>
            </section>

            <section className="bg-card/40 border border-white/5 rounded-[2rem] p-6 space-y-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Execução atual</h3>
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">{progress}%</span>
              </div>

              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>

              {currentDispatch ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3 text-center">
                      <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">Total</p>
                      <p className="text-xl font-black text-white">{currentDispatch.total}</p>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                      <p className="text-[8px] font-black text-green-300 uppercase tracking-widest">Sucesso</p>
                      <p className="text-xl font-black text-green-300">{currentDispatch.sent}</p>
                    </div>
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
                      <p className="text-[8px] font-black text-red-300 uppercase tracking-widest">Falha</p>
                      <p className="text-xl font-black text-red-300">{currentDispatch.failed}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px] text-neutral-400">
                    <p><span className="text-white font-bold">Status:</span> {currentDispatch.status}</p>
                    <p><span className="text-white font-bold">Último número:</span> {currentDispatch.lastNumber || 'aguardando envio'}</p>
                    <p><span className="text-white font-bold">Iniciado em:</span> {formatDateTime(currentDispatch.startedAt)}</p>
                    {currentDispatch.lastError && (
                      <p className="text-red-300"><span className="font-bold">Último erro:</span> {currentDispatch.lastError}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-white/5 rounded-2xl">
                  <Clock3 className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                  <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Nenhum disparo ativo</p>
                </div>
              )}
            </section>

            <section className="bg-card/40 border border-white/5 rounded-[2rem] p-6 space-y-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Histórico recente</h3>
                <button
                  onClick={handleClearHistory}
                  disabled={isSubmitting}
                  className="text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-white disabled:opacity-40"
                >
                  Limpar
                </button>
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar">
                {dispatchHistory.length > 0 ? (
                  dispatchHistory.slice(0, 8).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-black text-white">{item.name}</p>
                          <p className="text-[10px] text-neutral-500">{formatDateTime(item.startedAt)}</p>
                        </div>
                        <span
                          className={cn(
                            'px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest',
                            item.status === 'completed'
                              ? 'bg-green-500/10 text-green-300'
                              : item.status === 'aborted'
                                ? 'bg-amber-500/10 text-amber-300'
                                : 'bg-red-500/10 text-red-300'
                          )}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl bg-black/30 p-2">
                          <p className="text-[8px] text-neutral-500 uppercase tracking-widest font-black">Total</p>
                          <p className="text-sm font-black text-white">{item.total}</p>
                        </div>
                        <div className="rounded-xl bg-black/30 p-2">
                          <p className="text-[8px] text-neutral-500 uppercase tracking-widest font-black">Enviados</p>
                          <p className="text-sm font-black text-green-300">{item.sent}</p>
                        </div>
                        <div className="rounded-xl bg-black/30 p-2">
                          <p className="text-[8px] text-neutral-500 uppercase tracking-widest font-black">Falhas</p>
                          <p className="text-sm font-black text-red-300">{item.failed}</p>
                        </div>
                      </div>
                      {item.logs && item.logs.length > 0 && (
                        <div className="space-y-2">
                          {item.logs.slice(0, 3).map((log, index) => (
                            <div key={`${item.id}-${index}`} className="flex items-start gap-2 text-[10px] text-neutral-400">
                              {log.status === 'success' ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                              )}
                              <span>{log.number}{log.error ? ` - ${log.error}` : ''}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
                    <Users className="w-8 h-8 text-neutral-700 mx-auto mb-3" />
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Nenhum disparo salvo ainda</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
