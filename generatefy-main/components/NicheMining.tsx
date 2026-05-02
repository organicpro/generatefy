import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock3, Loader2, Radar, RefreshCw, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

export interface MinedNicheSelection {
  id: string;
  niche: string;
  title: string;
  targetAudience: string;
  productType: 'ebook' | 'app';
  description: string;
  reason: string;
  score: number;
  growth: string;
  keywords: string[];
}

interface TrendingNicheResponse {
  updatedAt: string;
  nextUpdateAt: string;
  source: string;
  isFallback: boolean;
  items: MinedNicheSelection[];
}

interface NicheMiningProps {
  onSelect: (selection: MinedNicheSelection) => void;
}

const CACHE_KEY = 'generatefy_trending_niches_cache_v2';

const fallbackResponse: TrendingNicheResponse = {
  updatedAt: new Date().toISOString(),
  nextUpdateAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  source: 'fallback-local',
  isFallback: true,
  items: [
    {
      id: 'fallback-emagrecimento',
      niche: 'Emagrecimento para mulheres ocupadas usando treinos curtos e alimentacao simples',
      title: 'Emagrecimento pratico para rotina corrida',
      targetAudience: 'Mulheres de 25 a 45 anos que querem emagrecer sem academia e sem dieta radical',
      productType: 'ebook',
      description: 'Produto digital com plano semanal, cardapio simples, checklist de habitos e treinos de 20 minutos.',
      reason: 'Categoria evergreen com alta demanda em produtos digitais e facil transformacao em ebook ou app.',
      score: 94,
      growth: '+28%',
      keywords: ['emagrecimento', 'treino em casa', 'habitos saudaveis'],
    },
    {
      id: 'fallback-ia-renda',
      niche: 'Renda extra com inteligencia artificial para iniciantes',
      title: 'IA para renda extra iniciante',
      targetAudience: 'Pessoas que querem ganhar dinheiro online mas ainda nao sabem usar ferramentas de IA',
      productType: 'ebook',
      description: 'Guia pratico com prompts, servicos vendaveis, rotina de prospeccao e exemplos de ofertas.',
      reason: 'IA segue com forte apelo comercial e baixa barreira de entrada para infoprodutos.',
      score: 91,
      growth: '+24%',
      keywords: ['inteligencia artificial', 'renda extra', 'prompts'],
    },
    {
      id: 'fallback-ansiedade',
      niche: 'Controle de ansiedade e sono para adultos sobrecarregados',
      title: 'Sono e ansiedade no dia a dia',
      targetAudience: 'Adultos com rotina pesada, dificuldade para dormir e busca por tecnicas simples',
      productType: 'ebook',
      description: 'Metodo com respiracao guiada, diario emocional, higiene do sono e rotina noturna de 7 dias.',
      reason: 'Bem-estar e saude mental vendem bem em formatos de guias, desafios e apps simples.',
      score: 88,
      growth: '+19%',
      keywords: ['ansiedade', 'sono', 'bem-estar'],
    },
    {
      id: 'fallback-skincare',
      niche: 'Skincare para pele madura com rotina simples e produtos acessiveis',
      title: 'Skincare para pele madura',
      targetAudience: 'Mulheres acima de 35 anos que querem uma rotina anti-idade sem gastar muito',
      productType: 'ebook',
      description: 'Rotina AM/PM, guia de ingredientes, checklist semanal e diario de evolucao da pele.',
      reason: 'Beleza e autocuidado tem forte recorrencia e aceita bem guias, desafios e mini apps.',
      score: 86,
      growth: '+17%',
      keywords: ['skincare', 'anti-idade', 'beleza'],
    },
    {
      id: 'fallback-marmitas',
      niche: 'Marmitas fitness economicas para emagrecimento e rotina de trabalho',
      title: 'Marmitas fitness economicas',
      targetAudience: 'Pessoas que querem comer melhor gastando pouco e levando comida para o trabalho',
      productType: 'ebook',
      description: 'Cardapios, lista de compras, calculadora de porcoes e preparo em lote para 7 dias.',
      reason: 'Une saude, economia e praticidade, tres gatilhos fortes para compra de produto digital.',
      score: 84,
      growth: '+15%',
      keywords: ['marmita fitness', 'receitas', 'economia'],
    },
    {
      id: 'fallback-ingles',
      niche: 'Ingles pratico para entrevistas, trabalho remoto e reunioes',
      title: 'Ingles profissional sem enrolacao',
      targetAudience: 'Profissionais que precisam destravar ingles para oportunidades melhores',
      productType: 'ebook',
      description: 'Roteiros de reuniao, simulador de entrevista, frases prontas e plano de estudo de 30 dias.',
      reason: 'Educacao profissional tem compra racional forte quando promete aumento de renda e carreira.',
      score: 81,
      growth: '+12%',
      keywords: ['ingles', 'carreira', 'trabalho remoto'],
    },
    {
      id: 'fallback-pets',
      niche: 'Cuidados naturais e rotina saudavel para caes pequenos',
      title: 'Pet saudavel em casa',
      targetAudience: 'Donos de caes pequenos que querem prevenir problemas e melhorar rotina do pet',
      productType: 'ebook',
      description: 'Checklist de cuidados, alimentacao segura, sinais de alerta e agenda de vacinas/higiene.',
      reason: 'Mercado pet segue com alto gasto emocional e boa aderencia a guias simples.',
      score: 80,
      growth: '+11%',
      keywords: ['pet', 'cachorro', 'cuidados'],
    },
    {
      id: 'fallback-marketing-local',
      niche: 'Marketing local com WhatsApp e Instagram para pequenos negocios',
      title: 'Clientes todos os dias no bairro',
      targetAudience: 'Donos de pequenos negocios que precisam vender mais sem agencia',
      productType: 'ebook',
      description: 'Calendario de posts, scripts de WhatsApp, ofertas semanais e funil simples de bairro.',
      reason: 'Pequenos negocios buscam solucao direta para vendas e aceitam templates aplicaveis.',
      score: 75,
      growth: '+8%',
      keywords: ['marketing local', 'whatsapp', 'instagram'],
    },
  ],
};

export default function NicheMining({ onSelect }: NicheMiningProps) {
  const [data, setData] = useState<TrendingNicheResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [now, setNow] = useState(Date.now());

  const nextUpdateLabel = useMemo(() => {
    if (!data?.nextUpdateAt) return 'a cada 8h';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(data.nextUpdateAt));
  }, [data?.nextUpdateAt]);

  const cacheCycle = useMemo(() => {
    if (!data?.updatedAt || !data?.nextUpdateAt) {
      return { progress: 0, remaining: '8h restantes' };
    }

    const start = new Date(data.updatedAt).getTime();
    const end = new Date(data.nextUpdateAt).getTime();
    const total = Math.max(1, end - start);
    const elapsed = Math.max(0, Math.min(total, now - start));
    const remainingMs = Math.max(0, end - now);
    const hours = Math.floor(remainingMs / 3600000);
    const minutes = Math.ceil((remainingMs % 3600000) / 60000);

    return {
      progress: Math.round((elapsed / total) * 100),
      remaining: hours > 0 ? `${hours}h ${String(minutes).padStart(2, '0')}min restantes` : `${minutes}min restantes`,
    };
  }, [data?.nextUpdateAt, data?.updatedAt, now]);

  const loadNiches = async (force = false) => {
    setError('');
    if (force) setRefreshing(true);
    else setLoading(true);

    try {
      if (!force) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as TrendingNicheResponse;
          if (new Date(parsed.nextUpdateAt).getTime() > Date.now()) {
            setData(parsed);
            setLoading(false);
            return;
          }
        }
      }

      const response = await fetch(`/api/trending-niches${force ? '?refresh=1' : ''}`);
      if (!response.ok) throw new Error('Fonte de tendencias indisponivel');
      const payload = await response.json() as TrendingNicheResponse;
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
      setData(payload);
    } catch (err: any) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setData(JSON.parse(cached));
        setError('Usei o ultimo radar salvo porque a fonte externa nao respondeu agora.');
      } else {
        setData(fallbackResponse);
        setError('Usei o radar local de seguranca. Assim a ferramenta continua funcionando.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNiches();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-full bg-black px-4 py-6 md:px-8 md:py-10 custom-scrollbar">
      <style>{`
        @keyframes progress-sheen {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-zinc-950 to-black p-7 md:p-10 shadow-2xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-primary">
              <Radar className="h-3.5 w-3.5 animate-pulse" />
              Mineração de Nichos
            </div>
            <h1 className="mt-5 text-3xl md:text-6xl font-black tracking-tighter text-white">
              Escolha um mercado quente antes de criar o produto.
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base font-medium leading-relaxed text-zinc-400">
              O radar cruza tendencias publicas, sinais de demanda e categorias que costumam vender bem como ebook, app ou SaaS simples.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-600">Oportunidades ranqueadas</p>
                <h2 className="mt-1 text-xl font-black text-white">Nichos em alta para produto digital</h2>
              </div>
              <button
                type="button"
                onClick={() => loadNiches(true)}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-300 transition-all hover:border-primary/40 hover:text-primary disabled:opacity-40"
              >
                {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Atualizar radar
              </button>
            </div>

            {error && (
              <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm font-semibold text-amber-100">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-64 rounded-[2.5rem] border border-white/5 bg-white/[0.02] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data?.items || fallbackResponse.items).map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-950/70 p-6 text-left shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.04]"
                  >
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-[60px] opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Score</span>
                        <p className="text-2xl font-black text-primary">{item.score}</p>
                      </div>
                    </div>
                    <div className="relative z-10 mt-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-500">#{index + 1}</span>
                        <span className="rounded-full bg-green-500/10 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-green-400">{item.growth}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-black leading-tight tracking-tight text-white">{item.title}</h3>
                      <p className="mt-3 text-xs font-semibold leading-relaxed text-zinc-500">{item.niche}</p>
                      <p className="mt-4 text-[11px] leading-relaxed text-zinc-400">{item.reason}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.keywords.slice(0, 3).map((keyword) => (
                          <span key={keyword} className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-[9px] font-bold text-zinc-500">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Usar este nicho</span>
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <aside className="lg:sticky lg:top-8 h-fit rounded-[2.5rem] border border-white/5 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">Cache 8h</span>
            </div>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-zinc-400">
              Atualiza automaticamente a cada 8 horas. O botão de atualizar força uma nova busca quando você quiser.
            </p>
            <div className="mt-6 space-y-3 rounded-3xl border border-white/5 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Proxima atualização</span>
                <Clock3 className="h-4 w-4 text-zinc-600" />
              </div>
              <p className="text-sm font-black text-white">{nextUpdateLabel}</p>
              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-zinc-600">Ciclo 8h</span>
                  <span className="text-primary">{cacheCycle.progress}%</span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] animate-[progress-sheen_2s_linear_infinite]" />
                  <div
                    className="relative h-full rounded-full bg-gradient-to-r from-primary via-green-300 to-primary shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all duration-700"
                    style={{ width: `${cacheCycle.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] font-bold text-zinc-500">{cacheCycle.remaining}</p>
              </div>
            </div>
            <div className={cn(
              "mt-4 rounded-3xl border p-4",
              data?.isFallback ? "border-amber-500/20 bg-amber-500/10" : "border-green-500/20 bg-green-500/10"
            )}>
              <div className="flex items-center gap-2">
                <Sparkles className={cn("h-4 w-4", data?.isFallback ? "text-amber-300" : "text-green-400")} />
                <span className={cn("text-[10px] font-black uppercase tracking-widest", data?.isFallback ? "text-amber-200" : "text-green-300")}>
                  {data?.isFallback ? 'Radar de segurança' : 'Fonte online ativa'}
                </span>
              </div>
              <p className="mt-2 text-[11px] font-medium leading-relaxed text-zinc-400">
                Fonte: {data?.source || fallbackResponse.source}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
