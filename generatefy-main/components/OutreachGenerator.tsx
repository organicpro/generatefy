
import React, { useState } from 'react';
import { 
  Zap, MessageCircle, Instagram, Mail, Phone, Copy, 
  Check, Loader2, Sparkles, Send, Target, Layout, ShieldCheck,
  ChevronRight, BrainCircuit, User, Building2, Link2, Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';
import { UserIdentity } from '../types';
import { generateGroqText } from '../services/groqService';

interface OutreachGeneratorProps {
  currentProjectDesc: string;
  identity: UserIdentity;
  onNext?: () => void;
}

type Channel = 'whatsapp' | 'instagram' | 'email' | 'coldcall';
type Tone = 'friendly' | 'professional' | 'creative' | 'urgent';

export default function OutreachGenerator({ currentProjectDesc, identity, onNext }: OutreachGeneratorProps) {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('whatsapp');
  const [selectedTone, setSelectedTone] = useState<Tone>('friendly');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const [clientName, setClientName] = useState('');
  const [businessHighlight, setBusinessHighlight] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  const channels = [
    { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'instagram', icon: Instagram, label: 'Instagram', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'email', icon: Mail, label: 'E-mail', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'coldcall', icon: Phone, label: 'Cold Call', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const tones = [
    { id: 'friendly', label: 'Conexão (Grupo)' },
    { id: 'professional', label: 'Profissional' },
    { id: 'creative', label: 'Criativo' },
    { id: 'urgent', label: 'Urgente' },
  ];

  const generateScript = async () => {
    setLoading(true);
    setCopied(false);
    
    try {
      const prompt = `
        Aja como um especialista em Social Selling e Mensagens de Conexão.
        O objetivo é uma mensagem de "Abertura de Loop" para o nicho descrito abaixo.
        
        CONTEXTO DO PRODUTO: ${currentProjectDesc}
        
        REQUISITOS DA MENSAGEM:
        1. NÃO use [Nome], [Pessoa] ou placeholders. A mensagem deve ser enviada como "Oi tudo bem".
        2. TEMA: "Mandei essa mensagem porque vi que você está no grupo de [NICHO]..."
        3. FOCO: Curiosidade e Ajuda Real. "Descobri um [Ebook/App] que resolve [PROBLEMA X] e lembrei do grupo. Posso te mostrar?"
        4. ESTILO: Conversacional, direto, sem cara de spam.
        5. Use o nome do produto ou a promessa principal do projeto: ${currentProjectDesc}.
        
        Canal de Envio: ${selectedChannel}.
        
        Retorne APENAS o texto da mensagem final.
      `;

      const text = await generateGroqText({
        prompt,
        customApiKey: identity.groqApiKey || identity.apiKey,
        temperature: 0.35,
        maxTokens: 2048,
      });

      setScript(text || "");
    } catch (e) {
      console.error(e);
      setScript('Erro ao gerar script. Verifique sua conexão e chave API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            Vendas e Prospecção Pro
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Engine de <span className="text-primary italic">Conversão.</span></h1>
          <p className="text-neutral-500 max-w-2xl text-sm font-medium">
            Não envie spam. Envie abordagens personalizadas que convertem estranhos em clientes pagantes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls - Left Column */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            
            <div className="bg-card/40 border border-white/5 rounded-[2rem] p-8 space-y-8 shadow-2xl backdrop-blur-xl">
              
              <div className="space-y-4">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary" /> Estilo de Disparo
                </label>
                <p className="text-[10px] text-neutral-500 font-medium leading-relaxed px-2">
                  Configurado para disparos em massa. As mensagens serão geradas sem nomes específicos para garantir compatibilidade com sua lista de contatos.
                </p>
              </div>

              {/* Seção 2: Estilo de Abordagem */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2 items-center flex gap-2">
                  <Target className="w-3 h-3" /> Tom da Conversa
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTone(t.id as Tone)}
                      className={cn(
                        "px-3 py-4 rounded-2xl border text-[9px] font-black uppercase tracking-widest text-center transition-all",
                        selectedTone === t.id 
                          ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]" 
                          : "bg-white/5 border-white/5 text-neutral-600 hover:text-neutral-400"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generateScript}
                disabled={loading}
                className="w-full py-5 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Mesclar Abordagem Personalizada
              </button>
            </div>
          </div>

          {/* Result - Right Column */}
          <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
            {script ? (
              <div className="bg-card border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl sticky top-8">
                <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Send className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Script Gerado</span>
                      <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Pronto para envio</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                      copied ? "bg-green-500 text-white" : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
                    )}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado!' : 'Copiar Texto'}
                  </button>
                </div>
                <div className="p-8 md:p-12">
                  <pre className="text-sm md:text-base text-neutral-300 font-medium leading-relaxed whitespace-pre-wrap font-sans">
                    {script}
                  </pre>
                </div>
                <div className="px-8 py-6 bg-primary/5 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
                      <span className="text-primary font-black uppercase mr-1">Dica Pro:</span> 
                      Abordagens que começam com um elogio real ao negócio do cliente têm 4x mais chance de resposta.
                    </p>
                  </div>
                  
                  {onNext && (
                    <button 
                      onClick={onNext}
                      className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
                    >
                      Próximo Passo: Localizar Grupos
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[600px] border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 opacity-30">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Target className="w-10 h-10 text-neutral-700" />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.4em] text-neutral-600">Aguardando definição do alvo...</p>
                <p className="text-[11px] text-neutral-800 font-bold uppercase mt-4 max-w-xs leading-relaxed">
                  Preencha os dados do cliente à esquerda para criar uma mensagem altamente persuasiva.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
