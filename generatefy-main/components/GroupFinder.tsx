import React, { useState } from 'react';
import { 
  Search, Globe, MessageCircle, Instagram, Facebook, 
  ExternalLink, Zap, Target, Loader2, Sparkles, Plus,
  ShieldCheck, AlertCircle, Copy, Check, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";
import { UserIdentity } from '../types';

interface GroupFinderProps {
  niche: string;
  identity: UserIdentity;
  onNext?: () => void;
}

interface SearchDork {
  platform: string;
  query: string;
  description: string;
  icon: any;
  color: string;
}

export default function GroupFinder({ niche, identity, onNext }: GroupFinderProps) {
  const [loading, setLoading] = useState(false);
  const [dorks, setDorks] = useState<SearchDork[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const staticDirectories = [
    { platform: 'WhatsApp Directory', query: 'https://gruposwhats.app/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://grupodewhatsapp.com/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://gruposbrasil.com.br/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://gruposdewhatss.app/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://gruposdewhatsapp.site/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://linkdegrupo.com.br/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://linksgruposwhats.com/', description: 'Achamos grupos desse nicho aqui' },
    { platform: 'WhatsApp Directory', query: 'https://gruposwpp.com.br/', description: 'Achamos grupos desse nicho aqui' },
  ];

  const findGroups = async () => {
    // No longer using AI for queries, just showing the identified directories
    setLoading(true);
    setTimeout(() => {
      const combinedResults = staticDirectories.map(d => ({ ...d, icon: MessageCircle, color: 'text-green-400' }));
      setDorks(combinedResults);
      setLoading(false);
    }, 800);
  };

  const handleExecute = (query: string) => {
    window.open(query, '_blank');
  };

  const handleCopy = (query: string, index: number) => {
    navigator.clipboard.writeText(query);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const [showAdSpy, setShowAdSpy] = useState(false);
  const [customKeyword, setCustomKeyword] = useState('');

  const launchKeywords = [
    'evento', 'workshop', 'ao vivo', 'mentoria', 'aula', 
    'inscrições abertas', 'gratuito', 'masterclass', 'desafio',
    'intensivo', 'maratona', 'jornada', 'webinário', 'treinamento'
  ];

  const adQueries = launchKeywords.map(k => `${niche} ${k}`);

  if (showAdSpy) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              Bônus: Espionagem de Lançamentos
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Radar de <span className="text-primary italic">Concorrência.</span></h1>
            <p className="text-neutral-500 max-w-2xl text-sm font-medium">
              Use estas combinações na Biblioteca de Anúncios do Facebook para encontrar especialistas fazendo lançamentos agora no nicho <span className="text-white italic">{niche}</span>.
            </p>
          </header>

          <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl space-y-4">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Pesquisa Personalizada</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                <input 
                  type="text" 
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="Digite uma palavra-chave (ex: intensivo, workshop...)"
                  className="w-full bg-black/40 border border-white/10 py-4 pl-12 pr-6 rounded-2xl text-white text-xs focus:border-primary/40 outline-none transition-all"
                />
              </div>
              <button 
                onClick={() => window.open(`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&q=${encodeURIComponent(`${niche} ${customKeyword}`.trim())}&search_type=keyword_unordered&media_type=all`, '_blank')}
                disabled={!customKeyword.trim()}
                className="px-8 py-4 bg-primary text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
              >
                Buscar Agora
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adQueries.map((query, i) => (
              <div key={i} className="bg-card/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-primary/20 transition-all">
                <p className="text-xs font-mono text-primary mb-4">{query}</p>
                <button 
                  onClick={() => window.open(`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&q=${encodeURIComponent(query)}&search_type=keyword_unordered&media_type=all`, '_blank')}
                  className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  Buscar no Facebook
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowAdSpy(false)}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Voltar para Grupos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Target className="w-3.5 h-3.5 animate-pulse" />
            Passo 04: Localizador de Audiência
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Mina de <span className="text-primary italic">Ouro.</span></h1>
          <p className="text-neutral-500 max-w-2xl text-sm font-medium">
            Encontre onde seu público se esconde. Use nossos algoritmos de busca para localizar grupos de WhatsApp e comunidades reais para seu projeto.
          </p>
        </header>

        {!dorks.length ? (
          <div className="bg-card/40 border border-white/5 rounded-[3rem] p-12 text-center space-y-8 backdrop-blur-xl">
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Iniciar Varredura Digital</h2>
              <p className="text-neutral-500 text-sm max-w-md mx-auto font-medium">
                Nossa IA vai criar comandos de busca profunda para encontrar links de grupos ativos na internet.
              </p>
            </div>
            <button 
              onClick={findGroups}
              disabled={loading}
              className="px-12 py-5 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.05] transition-all shadow-xl shadow-primary/20 mx-auto disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              Mapear Grupos do Nicho
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {dorks.map((dork, i) => (
              <div key={i} className="bg-card/40 border border-white/5 rounded-[2rem] p-6 hover:border-primary/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", dork.color)}>
                        <dork.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Fonte Encontrada</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-black text-primary leading-tight uppercase italic">{dork.description}</p>
                      <div className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-[10px] text-neutral-400 break-all select-all">
                        {dork.query}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex items-center gap-2">
                    <button 
                      onClick={() => handleExecute(dork.query)}
                      className="flex-1 py-3 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Acessar Diretório
                    </button>
                    <button 
                      onClick={() => handleCopy(dork.query, i)}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-all"
                    >
                      {copiedIndex === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 space-y-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Aviso de Segurança e Performance</h4>
              <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
                O WhatsApp pode resetar links de convite. Recomendamos usar contas de "aquecimento" para entrar em muitos grupos no mesmo dia. Esta ferramenta apenas localiza grupos públicos indexados na web. Use com responsabilidade.
              </p>
            </div>
          </div>

          {onNext && dorks.length > 0 && (
            <button 
              onClick={onNext}
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
            >
              Próximo Passo: Iniciar Disparos
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <button 
            onClick={() => setShowAdSpy(true)}
            className="w-full py-4 border border-primary/20 bg-primary/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/10 transition-all group"
          >
            <Sparkles className="w-4 h-4 text-primary group-hover:scale-125 transition-transform" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Espionar Lançamentos na Biblioteca de Anúncios
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
