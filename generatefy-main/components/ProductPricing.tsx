import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  DollarSign,
  Info,
  PackageCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

type ProductForPricing = {
  name: string;
  type: string;
  description: string;
  price?: number;
  priceLabel?: string;
  pricingNotes?: string;
};

interface ProductPricingProps {
  currentProduct: ProductForPricing | null;
  onBackToProduct: () => void;
  onPriceDefined: (price: number, priceLabel: string, pricingNotes: string) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

const parseCurrencyInput = (value: string) => {
  const cleaned = value.replace(/[^\d,.]/g, '').trim();
  if (!cleaned) return 0;
  const normalized = cleaned.includes(',') ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const priceSuggestions = [
  { label: 'Entrada', value: 27, note: 'Para volume, teste rapido e publico frio.' },
  { label: 'Principal', value: 47, note: 'Bom equilibrio para ebook e oferta inicial.' },
  { label: 'Premium', value: 97, note: 'Para promessa forte, bonus e conteudo mais completo.' },
  { label: 'SaaS', value: 29.9, note: 'Modelo mensal simples para app/SaaS.' },
];

export default function ProductPricing({ currentProduct, onBackToProduct, onPriceDefined }: ProductPricingProps) {
  const initialPrice = currentProduct?.priceLabel || currentProduct?.price ? String(currentProduct.priceLabel || currentProduct.price) : '';
  const [priceInput, setPriceInput] = useState(initialPrice);
  const [pricingNotes, setPricingNotes] = useState(currentProduct?.pricingNotes || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentProduct) return;
    setPriceInput(currentProduct.priceLabel || (currentProduct.price ? String(currentProduct.price) : ''));
    setPricingNotes(currentProduct.pricingNotes || '');
    setMessage('');
  }, [currentProduct]);

  const numericPrice = useMemo(() => parseCurrencyInput(priceInput), [priceInput]);
  const priceLabel = numericPrice > 0 ? formatCurrency(numericPrice) : 'Valor a definir';

  const handleSubmit = () => {
    if (!currentProduct) {
      onBackToProduct();
      return;
    }

    if (numericPrice <= 0) {
      setMessage('Defina um valor maior que zero para continuar.');
      return;
    }

    onPriceDefined(
      numericPrice,
      priceLabel,
      pricingNotes.trim() || 'Valor definido manualmente para esta oferta.'
    );
  };

  if (!currentProduct) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
        <div className="max-w-3xl mx-auto rounded-[2.5rem] border border-white/5 bg-zinc-950/70 p-10 text-center">
          <PackageCheck className="w-12 h-12 text-primary mx-auto mb-5" />
          <h1 className="text-3xl font-black text-white">Crie a oferta primeiro</h1>
          <p className="mt-3 text-sm text-zinc-500">A etapa de valor precisa de um ebook ou SaaS validado antes.</p>
          <button
            type="button"
            onClick={onBackToProduct}
            className="mt-8 px-6 py-4 rounded-2xl bg-primary text-black text-[10px] font-black uppercase tracking-widest"
          >
            Voltar para oferta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-black tracking-widest uppercase">
            <BadgeDollarSign className="w-3.5 h-3.5" />
            Passo 03: Valor da oferta
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Defina o <span className="text-emerald-300 italic">preco.</span>
            </h1>
            <p className="mt-3 text-sm text-zinc-500 font-medium leading-relaxed">
              Esta etapa define o valor do ebook/SaaS atual antes de gerar copy, encontrar leads e iniciar o disparo.
            </p>
          </div>
        </header>

        {message && (
          <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm font-bold text-amber-100">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <section className="xl:col-span-5 rounded-[2.5rem] border border-white/5 bg-zinc-950/60 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">Produto atual</p>
                <h2 className="mt-2 text-2xl font-black text-white leading-tight">{currentProduct.name}</h2>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-primary">{currentProduct.type}</p>
              </div>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-6">
              {currentProduct.description}
            </p>

            <div className="rounded-[2rem] border border-white/5 bg-black/30 p-5">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-4 h-4 text-emerald-300" />
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500">Como usar</p>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Esse preco entra como contexto comercial da copy e pode ser usado depois no dashboard de faturamento para registrar vendas.
              </p>
            </div>
          </section>

          <section className="xl:col-span-7 rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-7 shadow-2xl">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Valor manual</label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
                <input
                  value={priceInput}
                  onChange={(event) => setPriceInput(event.target.value)}
                  placeholder="Ex: 47,00"
                  inputMode="decimal"
                  className="w-full rounded-[2rem] bg-black/50 border border-white/10 pl-14 pr-5 py-6 text-2xl font-black text-white outline-none focus:border-emerald-400/50"
                />
              </div>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                Valor final: <span className="text-emerald-300">{priceLabel}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {priceSuggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => {
                    setPriceInput(String(suggestion.value).replace('.', ','));
                    setPricingNotes(suggestion.note);
                  }}
                  className="rounded-[1.5rem] border border-white/5 bg-black/30 p-4 text-left hover:border-emerald-300/30 hover:bg-emerald-300/5 transition-all"
                >
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{suggestion.label}</p>
                  <p className="mt-2 text-xl font-black text-white">{formatCurrency(suggestion.value)}</p>
                  <p className="mt-2 text-[10px] text-zinc-600 leading-relaxed">{suggestion.note}</p>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Observacao de precificacao</label>
              <textarea
                value={pricingNotes}
                onChange={(event) => setPricingNotes(event.target.value)}
                rows={4}
                placeholder="Ex: preco de entrada para validar demanda; depois subir para R$97..."
                className="w-full rounded-2xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-white outline-none focus:border-emerald-400/50 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-[2rem] border border-white/5 bg-black/30 p-5">
                <Sparkles className="w-5 h-5 text-primary mb-3" />
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Oferta</p>
                <p className="mt-2 text-sm font-black text-white">Preco claro antes da copy</p>
              </div>
              <div className="rounded-[2rem] border border-white/5 bg-black/30 p-5">
                <TrendingUp className="w-5 h-5 text-emerald-300 mb-3" />
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Venda</p>
                <p className="mt-2 text-sm font-black text-white">Contexto pronto para abordagem</p>
              </div>
              <div className="rounded-[2rem] border border-white/5 bg-black/30 p-5">
                <CheckCircle2 className="w-5 h-5 text-amber-300 mb-3" />
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Execucao</p>
                <p className="mt-2 text-sm font-black text-white">Segue para copy e disparo</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-5 rounded-2xl bg-emerald-400 text-black font-black uppercase tracking-[0.22em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(52,211,153,0.18)]"
            >
              Salvar valor e escrever copy
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
