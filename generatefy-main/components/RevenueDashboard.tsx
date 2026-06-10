import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  Bell,
  CheckCircle2,
  Copy,
  DollarSign,
  Loader2,
  PlugZap,
  ReceiptText,
  Sparkles,
  Trash2,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { UserIdentity } from '../types';
import { extractJsonObject, generateGroqText } from '../services/groqService';

const REVENUE_STORAGE_KEY = 'generatefy_revenue_sales_v1';
const LIVE_SECRET_STORAGE_KEY = 'generatefy_live_sale_secret_v1';

type RevenueProduct = {
  name: string;
  type: string;
  description: string;
};

type SaleRecord = {
  id: string;
  productName: string;
  productDescription: string;
  productType: string;
  amount: number;
  platform: string;
  customerName: string;
  createdAt: string;
};

interface RevenueDashboardProps {
  currentProduct: RevenueProduct | null;
  currentProjectDesc: string;
  identity: UserIdentity;
  onNext: () => void;
}

const platformOptions = ['Manual', 'Hotmart', 'Kiwify', 'Eduzz', 'Monetizze', 'Stripe', 'Mercado Pago'];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

const parseCurrencyInput = (value: string) => {
  const cleaned = value.replace(/[^\d,.]/g, '').trim();
  if (!cleaned) return 0;
  const normalized = cleaned.includes(',') ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const buildSaleNotification = (sale: SaleRecord) => {
  const date = new Date(sale.createdAt).toLocaleString('pt-BR');
  return [
    'Venda registrada no Generatefy',
    `Produto: ${sale.productName}`,
    `Valor: ${formatCurrency(sale.amount)}`,
    `Plataforma: ${sale.platform}`,
    `Cliente: ${sale.customerName || 'Nao informado'}`,
    `Data: ${date}`,
    '',
    `Descricao: ${sale.productDescription}`,
  ].join('\n');
};

export default function RevenueDashboard({ currentProduct, currentProjectDesc, identity, onNext }: RevenueDashboardProps) {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [productName, setProductName] = useState(currentProduct?.name || '');
  const [productDescription, setProductDescription] = useState(currentProduct?.description || currentProjectDesc || '');
  const [productType, setProductType] = useState(currentProduct?.type || 'produto');
  const [amount, setAmount] = useState('');
  const [platform, setPlatform] = useState('Manual');
  const [customerName, setCustomerName] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [notice, setNotice] = useState('');
  const [lastNotification, setLastNotification] = useState('');
  const [liveSecret, setLiveSecret] = useState('venda');
  const [liveToast, setLiveToast] = useState<SaleRecord | null>(null);
  const secretBufferRef = useRef('');
  const lastSecretTriggerRef = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem(REVENUE_STORAGE_KEY);
    if (stored) {
      try {
        setSales(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar faturamento local:', error);
      }
    }

    const storedSecret = localStorage.getItem(LIVE_SECRET_STORAGE_KEY);
    if (storedSecret) setLiveSecret(storedSecret);
  }, []);

  useEffect(() => {
    if (!currentProduct) return;
    setProductName(currentProduct.name || '');
    setProductDescription(currentProduct.description || currentProjectDesc || '');
    setProductType(currentProduct.type || 'produto');
  }, [currentProduct, currentProjectDesc]);

  const persistSales = (nextSales: SaleRecord[]) => {
    setSales(nextSales);
    localStorage.setItem(REVENUE_STORAGE_KEY, JSON.stringify(nextSales));
  };

  const totals = useMemo(() => {
    const total = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const ticket = sales.length ? total / sales.length : 0;
    const currentProductTotal = sales
      .filter((sale) => sale.productName.toLowerCase() === productName.trim().toLowerCase())
      .reduce((sum, sale) => sum + sale.amount, 0);

    return {
      total,
      ticket,
      count: sales.length,
      currentProductTotal,
    };
  }, [sales, productName]);

  const recentBars = useMemo(() => {
    const lastSeven = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      const key = day.toISOString().slice(0, 10);
      const total = sales
        .filter((sale) => sale.createdAt.slice(0, 10) === key)
        .reduce((sum, sale) => sum + sale.amount, 0);
      return { key, label: day.toLocaleDateString('pt-BR', { weekday: 'short' }), total };
    });
    const max = Math.max(...lastSeven.map((item) => item.total), 1);
    return lastSeven.map((item) => ({ ...item, height: Math.max(8, (item.total / max) * 100) }));
  }, [sales]);

  const suggestProductInfo = async () => {
    setLoadingSuggestion(true);
    setNotice('');

    try {
      const prompt = `
        Aja como estrategista de produto digital.
        Com base no contexto abaixo, gere um nome comercial curto e uma descricao persuasiva para registrar uma venda.

        CONTEXTO:
        ${currentProduct?.description || currentProjectDesc || productDescription}

        PRODUTO ATUAL:
        ${currentProduct?.name || productName || 'Produto digital'}

        Retorne JSON estrito:
        {
          "productName": "nome do produto",
          "productDescription": "descricao comercial em 2 frases"
        }
      `;

      const text = await generateGroqText({
        prompt,
        customApiKey: identity.groqApiKey || identity.apiKey,
        json: true,
        temperature: 0.25,
        maxTokens: 1200,
      });

      const parsed = JSON.parse(extractJsonObject(text || '{}'));
      setProductName(parsed.productName || currentProduct?.name || productName);
      setProductDescription(parsed.productDescription || currentProduct?.description || productDescription);
      setNotice('Dados comerciais sugeridos pela IA.');
    } catch (error) {
      console.error(error);
      setNotice('Nao consegui atualizar com IA agora, mas voce pode preencher manualmente.');
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const emitSaleNotification = async (sale: SaleRecord) => {
    const notificationText = buildSaleNotification(sale);
    setLastNotification(notificationText);
    setLiveToast(sale);
    window.setTimeout(() => {
      setLiveToast((current) => current?.id === sale.id ? null : current);
    }, 7000);

    try {
      await navigator.clipboard?.writeText(notificationText);
    } catch (error) {
      console.warn('Nao foi possivel copiar a notificacao automaticamente:', error);
    }

    if ('Notification' in window) {
      try {
        const permission = Notification.permission === 'default'
          ? await Notification.requestPermission()
          : Notification.permission;

        if (permission === 'granted') {
          new Notification('Venda registrada', {
            body: `${sale.productName} - ${formatCurrency(sale.amount)}`,
          });
        }
      } catch (error) {
        console.warn('Notificacao do navegador indisponivel:', error);
      }
    }
  };

  const registerSale = async (source: 'manual' | 'secret' = 'manual') => {
    const saleAmount = parseCurrencyInput(amount);

    if (!productName.trim()) {
      setNotice('Informe ou gere o nome do produto antes de registrar.');
      return;
    }

    if (saleAmount <= 0) {
      setNotice('Coloque um valor maior que zero para registrar a venda.');
      return;
    }

    const sale: SaleRecord = {
      id: crypto.randomUUID(),
      productName: productName.trim(),
      productDescription: productDescription.trim() || 'Produto gerado pelo Generatefy.',
      productType,
      amount: saleAmount,
      platform,
      customerName: customerName.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextSales = [sale, ...sales];
    persistSales(nextSales);
    if (source === 'manual') setAmount('');
    setCustomerName('');
    setNotice(`Venda registrada: ${formatCurrency(saleAmount)} em ${sale.productName}.`);
    await emitSaleNotification(sale);
  };

  useEffect(() => {
    const handleSecretTyping = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isTypingInField = tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target?.isContentEditable;

      if (isTypingInField || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;

      const normalizedSecret = liveSecret.trim().toLowerCase();
      if (!normalizedSecret) return;

      secretBufferRef.current = `${secretBufferRef.current}${event.key.toLowerCase()}`.slice(-Math.max(normalizedSecret.length, 24));

      if (!secretBufferRef.current.endsWith(normalizedSecret)) return;

      const now = Date.now();
      if (now - lastSecretTriggerRef.current < 1500) return;

      lastSecretTriggerRef.current = now;
      secretBufferRef.current = '';
      void registerSale('secret');
    };

    window.addEventListener('keydown', handleSecretTyping);
    return () => window.removeEventListener('keydown', handleSecretTyping);
  }, [liveSecret, amount, productName, productDescription, productType, platform, customerName, sales]);

  const copyLastNotification = async () => {
    if (!lastNotification) return;
    await navigator.clipboard?.writeText(lastNotification);
    setNotice('Notificacao copiada.');
  };

  const deleteSale = (saleId: string) => {
    persistSales(sales.filter((sale) => sale.id !== saleId));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar">
      {liveToast && (
        <div className="fixed right-5 top-5 z-[220] w-[min(420px,calc(100vw-40px))] animate-in slide-in-from-right-8 fade-in zoom-in-95 duration-500">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/30 bg-zinc-950/95 p-5 shadow-[0_30px_100px_rgba(16,185,129,0.32)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-primary to-amber-300" />
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.45)]">
                <BadgeDollarSign className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-black uppercase tracking-[0.28em] text-emerald-300">Venda registrada agora</p>
                <h3 className="mt-1 text-lg font-black text-white leading-tight truncate">{liveToast.productName}</h3>
                <p className="mt-2 text-3xl font-black text-emerald-300 tracking-tight">{formatCurrency(liveToast.amount)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-300">
                    {liveToast.platform}
                  </span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-300">
                    Registro manual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-black tracking-widest uppercase">
            <BadgeDollarSign className="w-3.5 h-3.5" />
            Faturamento simulado
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Painel de <span className="text-emerald-300 italic">Vendas.</span>
            </h1>
            <p className="mt-3 text-sm text-zinc-500 font-medium leading-relaxed">
              Registre vendas manualmente agora e deixe preparado para futuras integracoes com plataformas. O nome e a descricao podem vir da IA; o valor voce controla.
            </p>
          </div>
        </header>

        {notice && (
          <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm font-bold text-emerald-100">
            {notice}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Faturamento total', value: formatCurrency(totals.total), icon: Wallet },
            { label: 'Vendas registradas', value: String(totals.count), icon: ReceiptText },
            { label: 'Ticket medio', value: formatCurrency(totals.ticket), icon: TrendingUp },
            { label: 'Produto atual', value: formatCurrency(totals.currentProductTotal), icon: DollarSign },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="rounded-[2rem] border border-white/5 bg-white/[0.03] p-5 shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">{metric.label}</p>
                    <p className="mt-3 text-2xl font-black text-white tracking-tight">{metric.value}</p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <section className="xl:col-span-5 rounded-[2.5rem] border border-white/5 bg-zinc-950/60 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-300">Registro manual</p>
                <h2 className="mt-2 text-2xl font-black text-white">Nova venda</h2>
              </div>
              <button
                type="button"
                onClick={suggestProductInfo}
                disabled={loadingSuggestion}
                className="px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
              >
                {loadingSuggestion ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                IA
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Nome do produto</label>
                <input
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  placeholder="A IA preenche, mas voce pode editar"
                  className="w-full rounded-2xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-white outline-none focus:border-emerald-400/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Descricao comercial</label>
                <textarea
                  value={productDescription}
                  onChange={(event) => setProductDescription(event.target.value)}
                  rows={5}
                  placeholder="Descricao gerada pelo contexto do produto"
                  className="w-full rounded-2xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-white outline-none focus:border-emerald-400/50 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Valor manual</label>
                  <input
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Ex: 97,00"
                    inputMode="decimal"
                    className="w-full rounded-2xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-white outline-none focus:border-emerald-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Plataforma</label>
                  <select
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}
                    className="w-full rounded-2xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-white outline-none focus:border-emerald-400/50"
                  >
                    {platformOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Cliente ou observacao opcional</label>
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Ex: Joao, venda no direct, pedido 1021..."
                  className="w-full rounded-2xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-white outline-none focus:border-emerald-400/50"
                />
              </div>

              <button
                type="button"
                onClick={() => registerSale()}
                className="w-full py-5 rounded-2xl bg-emerald-400 text-black font-black uppercase tracking-[0.22em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(52,211,153,0.18)]"
              >
                <Bell className="w-4 h-4" />
                Registrar venda e notificar
              </button>

            </div>
          </section>

          <section className="xl:col-span-7 space-y-6">
            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">Ultimos 7 dias</p>
                  <h2 className="mt-2 text-2xl font-black text-white">Radar de faturamento</h2>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-zinc-500 font-bold uppercase">Modo</p>
                  <p className="text-[10px] text-emerald-300 font-black uppercase tracking-widest">Simulado</p>
                </div>
              </div>

              <div className="h-52 flex items-end gap-3 rounded-[2rem] bg-black/30 border border-white/5 p-5">
                {recentBars.map((bar) => (
                  <div key={bar.key} className="flex-1 h-full flex flex-col items-center justify-end gap-3">
                    <div className="w-full flex items-end justify-center h-full">
                      <div
                        className="w-full max-w-12 rounded-t-2xl bg-gradient-to-t from-emerald-500 to-primary shadow-[0_0_30px_rgba(52,211,153,0.18)] transition-all"
                        style={{ height: `${bar.height}%` }}
                        title={formatCurrency(bar.total)}
                      />
                    </div>
                    <span className="text-[8px] font-black uppercase text-zinc-600">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/60 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <PlugZap className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Integracoes futuras</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {platformOptions.slice(1).map((option) => (
                    <div key={option} className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                      <p className="text-[10px] font-black text-white">{option}</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Simulado</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/60 p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-emerald-300" />
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Notificacao</h3>
                  </div>
                  <button
                    type="button"
                    onClick={copyLastNotification}
                    disabled={!lastNotification}
                    className="px-3 py-2 rounded-xl bg-white/5 text-zinc-300 border border-white/10 disabled:opacity-30"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="min-h-40 whitespace-pre-wrap rounded-2xl bg-black/40 border border-white/5 p-4 text-[10px] leading-relaxed text-zinc-400 font-sans">
                  {lastNotification || 'Registre uma venda para gerar a notificacao automaticamente.'}
                </pre>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/60 overflow-hidden">
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600">Historico</p>
                  <h3 className="text-lg font-black text-white">Vendas recentes</h3>
                </div>
                <button
                  type="button"
                  onClick={onNext}
                  className="px-4 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[9px] flex items-center gap-2 hover:bg-primary transition-all"
                >
                  Ir para copy
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {sales.length ? sales.slice(0, 8).map((sale) => (
                  <div key={sale.id} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-300 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-white truncate">{sale.productName}</p>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        {sale.platform} - {new Date(sale.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <p className="text-sm font-black text-emerald-300">{formatCurrency(sale.amount)}</p>
                    <button
                      type="button"
                      onClick={() => deleteSale(sale.id)}
                      className="w-9 h-9 rounded-xl border border-white/5 text-zinc-600 hover:text-red-300 hover:border-red-500/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                )) : (
                  <div className="px-6 py-12 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-700">Nenhuma venda registrada ainda</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
