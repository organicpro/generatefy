
import React, { useState } from 'react';
import { X, Copy, Check, Database, Rocket, CloudUpload, Download, AlertTriangle, Code, ShieldCheck, Zap, Info, ListOrdered, ExternalLink, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

interface PublishModalProps {
  html: string;
  onClose: () => void;
}

type Tab = 'deploy' | 'database';

const PublishModal: React.FC<PublishModalProps> = ({ html, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('deploy');
  const [dbCopied, setDbCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html'; // Fundamental para o Netlify
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const supabaseSnippet = `<!-- 1. Script do SDK (Cole no <head> do seu site) -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
  // 2. Suas chaves (Pegue no painel do Supabase > Project Settings > API)
  const SUPABASE_URL = 'SUA_URL_AQUI';
  const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANON_AQUI';
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 3. Função para salvar (A IA pode usar isso nos seus formulários)
  async function salvarLead(dados) {
    const { error } = await supabaseClient.from('leads').insert([dados]);
    if (error) alert('Erro ao salvar');
    else alert('Sucesso!');
  }
</script>`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-6 bg-background/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-card w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
        
        {/* Header com Navegação Educativa */}
        <div className="bg-white/[0.02] border-b border-white/5 shrink-0">
          <div className="p-5 md:p-8 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-black text-white tracking-tight uppercase">Central de Lançamento</h2>
                <p className="text-[8px] md:text-[10px] text-neutral-500 font-bold uppercase tracking-widest hidden sm:block">Guia para colocar seu projeto no ar hoje</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 md:p-3 hover:bg-white/5 rounded-full text-neutral-500 transition-all">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex px-5 md:px-8 gap-4 md:gap-8">
            <button 
              onClick={() => setActiveTab('deploy')}
              className={cn(
                "pb-4 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 flex items-center gap-2",
                activeTab === 'deploy' ? "border-primary text-primary" : "border-transparent text-neutral-600 hover:text-neutral-400"
              )}
            >
              <CloudUpload className="w-3.5 h-3.5" /> 1. Publicar Site
            </button>
            <button 
              onClick={() => setActiveTab('database')}
              className={cn(
                "pb-4 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 flex items-center gap-2",
                activeTab === 'database' ? "border-primary text-primary" : "border-transparent text-neutral-600 hover:text-neutral-400"
              )}
            >
              <Database className="w-3.5 h-3.5" /> 2. Conectar Banco
            </button>
          </div>
        </div>

        {/* Área de Conteúdo com Scroll */}
        <div className="flex-1 p-5 md:p-10 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar">
          
          {activeTab === 'deploy' ? (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-left-4 duration-300">
              {/* Guia Passo a Passo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">1</div>
                  <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">Baixe o Arquivo</h4>
                  <p className="text-[10px] md:text-[11px] text-neutral-500 leading-relaxed font-medium">
                    O Netlify exige um arquivo chamado <span className="text-white font-bold">index.html</span> para o deploy.
                  </p>
                  <button onClick={handleDownload} className="w-full py-3.5 md:py-4 bg-primary/10 border border-primary/20 text-primary rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-primary hover:text-background transition-all flex items-center justify-center gap-2">
                    <Download className="w-3.5 h-3.5" /> Baixar index.html
                  </button>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-blue-500/20">2</div>
                  <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">Acesse o Netlify</h4>
                  <p className="text-[10px] md:text-[11px] text-neutral-500 leading-relaxed font-medium">
                    Use o serviço <span className="text-white">Netlify Drop</span> para hospedagem gratuita.
                  </p>
                  <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="w-full py-3.5 md:py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5" /> Abrir Netlify Drop
                  </a>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-green-500/20">3</div>
                  <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">Arraste e Solte</h4>
                  <p className="text-[10px] md:text-[11px] text-neutral-500 leading-relaxed font-medium">
                    Arraste o arquivo para o navegador e seu site estará online em 5 segundos.
                  </p>
                  <div className="w-full h-10 md:h-12 rounded-xl border-2 border-dashed border-white/5 flex items-center justify-center opacity-50">
                    <CloudUpload className="w-4 h-4 text-neutral-700" />
                  </div>
                </div>
              </div>

              {/* Alerta de Navegação */}
              <div className="p-5 md:p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl md:rounded-3xl flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] md:text-xs font-black text-amber-500 uppercase tracking-widest">Dica Anti-404</p>
                  <p className="text-[9px] md:text-[11px] text-neutral-400 leading-relaxed">
                    Nossa IA usa <span className="text-white font-bold">Navegação em Single Page (SPA)</span>. Tudo está no mesmo arquivo, evitando erros de servidor.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="p-5 md:p-6 bg-primary/5 border border-primary/20 rounded-2xl md:rounded-3xl flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-bold text-white leading-tight">Captura de Dados</h3>
                  <p className="text-[9px] md:text-xs text-neutral-500 font-medium">Use o Supabase para salvar leads e formulários automaticamente.</p>
                </div>
              </div>

              {/* Tutorial Supabase */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest">
                  <ListOrdered className="w-4 h-4 text-primary" /> Guia de Configuração
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-4 md:p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                    <p className="text-[10px] md:text-[11px] text-white font-bold">1. Projeto Supabase</p>
                    <p className="text-[9px] md:text-[10px] text-neutral-600 leading-relaxed">Acesse <a href="https://supabase.com" target="_blank" className="text-primary underline">supabase.com</a> e crie um projeto.</p>
                  </div>
                  <div className="p-4 md:p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                    <p className="text-[10px] md:text-[11px] text-white font-bold">2. Tabela Leads</p>
                    <p className="text-[9px] md:text-[10px] text-neutral-600 leading-relaxed">Crie uma tabela <code className="text-primary">leads</code> para armazenar os contatos.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">Código de Integração</label>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(supabaseSnippet); setDbCopied(true); setTimeout(() => setDbCopied(false), 2000); }} 
                    className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:text-white transition-colors self-start"
                  >
                    {dbCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {dbCopied ? 'Script Copiado!' : 'Copiar para a IA'}
                  </button>
                </div>
                <div className="bg-black/60 rounded-2xl border border-white/5 p-4 md:p-6 overflow-hidden">
                  <pre className="text-[9px] md:text-[10px] text-primary/70 leading-relaxed overflow-x-auto font-mono custom-scrollbar max-h-40">
                    {supabaseSnippet}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Responsivo */}
        <div className="p-5 md:p-8 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <p className="text-[8px] md:text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Seguro</p>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-[8px] md:text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Instantâneo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={handleCopy} className="text-[9px] md:text-[10px] font-black text-neutral-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-all">
              <Code className="w-4 h-4" /> Fonte
            </button>
            <div className="h-4 w-px bg-white/10" />
            <button className="text-[9px] md:text-[10px] font-black text-primary hover:text-white uppercase tracking-widest flex items-center gap-2 transition-all">
              <MessageSquare className="w-4 h-4" /> Ajuda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
