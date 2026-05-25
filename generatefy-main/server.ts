import express from "express";
import type { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { ServerResponse } from "http";
import { createEmbeddedWhatsAppEngine } from "./embeddedRyzeSend.js";

const PORT = Number(process.env.PORT) || 3000;
const TRENDING_CACHE_TTL_MS = 8 * 60 * 60 * 1000;

type TrendingNiche = {
  id: string;
  niche: string;
  title: string;
  targetAudience: string;
  productType: "ebook" | "app";
  description: string;
  reason: string;
  score: number;
  growth: string;
  keywords: string[];
};

type TrendingNichePayload = {
  updatedAt: string;
  nextUpdateAt: string;
  source: string;
  isFallback: boolean;
  items: TrendingNiche[];
};

type GroqChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GroqChatBody = {
  messages?: GroqChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: "json_object" };
  apiKey?: string;
};

let trendingCache: { expiresAt: number; payload: TrendingNichePayload } | null = null;

const fallbackTrendingNiches: TrendingNiche[] = [
  {
    id: "emagrecimento-rotina-corrida",
    niche: "Emagrecimento para mulheres ocupadas usando treinos curtos e alimentacao simples",
    title: "Emagrecimento pratico para rotina corrida",
    targetAudience: "Mulheres de 25 a 45 anos que querem emagrecer sem academia e sem dieta radical",
    productType: "ebook",
    description: "Produto digital com plano semanal, cardapio simples, checklist de habitos e treinos de 20 minutos.",
    reason: "Categoria evergreen com alta demanda em produtos digitais e facil transformacao em ebook ou app.",
    score: 94,
    growth: "+28%",
    keywords: ["emagrecimento", "treino em casa", "habitos saudaveis"],
  },
  {
    id: "ia-renda-extra",
    niche: "Renda extra com inteligencia artificial para iniciantes",
    title: "IA para renda extra iniciante",
    targetAudience: "Pessoas que querem ganhar dinheiro online mas ainda nao sabem usar ferramentas de IA",
    productType: "ebook",
    description: "Guia pratico com prompts, servicos vendaveis, rotina de prospeccao e exemplos de ofertas.",
    reason: "IA segue com forte apelo comercial e baixa barreira de entrada para infoprodutos.",
    score: 91,
    growth: "+24%",
    keywords: ["inteligencia artificial", "renda extra", "prompts"],
  },
  {
    id: "sono-ansiedade",
    niche: "Controle de ansiedade e sono para adultos sobrecarregados",
    title: "Sono e ansiedade no dia a dia",
    targetAudience: "Adultos com rotina pesada, dificuldade para dormir e busca por tecnicas simples",
    productType: "ebook",
    description: "Metodo com respiracao guiada, diario emocional, higiene do sono e rotina noturna de 7 dias.",
    reason: "Bem-estar e saude mental vendem bem em formatos de guias, desafios e apps simples.",
    score: 88,
    growth: "+19%",
    keywords: ["ansiedade", "sono", "bem-estar"],
  },
  {
    id: "beleza-pele-madura",
    niche: "Skincare para pele madura com rotina simples e produtos acessiveis",
    title: "Skincare para pele madura",
    targetAudience: "Mulheres acima de 35 anos que querem uma rotina anti-idade sem gastar muito",
    productType: "ebook",
    description: "Rotina AM/PM, guia de ingredientes, checklist semanal e diario de evolucao da pele.",
    reason: "Beleza e autocuidado tem forte recorrencia e aceita bem guias, desafios e mini apps.",
    score: 86,
    growth: "+17%",
    keywords: ["skincare", "anti-idade", "beleza"],
  },
  {
    id: "marmitas-fitness",
    niche: "Marmitas fitness economicas para emagrecimento e rotina de trabalho",
    title: "Marmitas fitness economicas",
    targetAudience: "Pessoas que querem comer melhor gastando pouco e levando comida para o trabalho",
    productType: "ebook",
    description: "Cardapios, lista de compras, calculadora de porcoes e preparo em lote para 7 dias.",
    reason: "Une saude, economia e praticidade, tres gatilhos fortes para compra de produto digital.",
    score: 84,
    growth: "+15%",
    keywords: ["marmita fitness", "receitas", "economia"],
  },
  {
    id: "financas-casal",
    niche: "Organizacao financeira para casais que querem sair das dividas",
    title: "Financas para casal sem briga",
    targetAudience: "Casais jovens com renda ativa, dividas e dificuldade para organizar metas",
    productType: "ebook",
    description: "Planilha, metodo de reuniao semanal, roteiro de negociacao de dividas e metas em conjunto.",
    reason: "Financas pessoais costuma vender bem quando a promessa e especifica e emocional.",
    score: 82,
    growth: "+13%",
    keywords: ["financas", "casais", "dividas"],
  },
  {
    id: "ingles-trabalho",
    niche: "Ingles pratico para entrevistas, trabalho remoto e reunioes",
    title: "Ingles profissional sem enrolacao",
    targetAudience: "Profissionais que precisam destravar ingles para oportunidades melhores",
    productType: "ebook",
    description: "Roteiros de reuniao, simulador de entrevista, frases prontas e plano de estudo de 30 dias.",
    reason: "Educacao profissional tem compra racional forte quando promete aumento de renda e carreira.",
    score: 81,
    growth: "+12%",
    keywords: ["ingles", "carreira", "trabalho remoto"],
  },
  {
    id: "pets-cuidados",
    niche: "Cuidados naturais e rotina saudavel para caes pequenos",
    title: "Pet saudavel em casa",
    targetAudience: "Donos de caes pequenos que querem prevenir problemas e melhorar rotina do pet",
    productType: "ebook",
    description: "Checklist de cuidados, alimentacao segura, sinais de alerta e agenda de vacinas/higiene.",
    reason: "Mercado pet segue com alto gasto emocional e boa aderencia a guias simples.",
    score: 80,
    growth: "+11%",
    keywords: ["pet", "cachorro", "cuidados"],
  },
  {
    id: "organizacao-casa",
    niche: "Organizacao da casa para maes, familias e rotina sem tempo",
    title: "Casa organizada em 15 minutos",
    targetAudience: "Mulheres e familias que querem organizar a casa sem perder o fim de semana",
    productType: "ebook",
    description: "Metodo de zonas, cronograma semanal, checklist imprimivel e desafio de 7 dias.",
    reason: "Casa, rotina e produtividade domestica convertem bem em desafios e checklists.",
    score: 79,
    growth: "+10%",
    keywords: ["organizacao", "casa", "rotina"],
  },
  {
    id: "airfryer-receitas",
    niche: "Receitas saudaveis e baratas na air fryer para semana toda",
    title: "Air fryer fit e economica",
    targetAudience: "Pessoas que querem comer melhor com praticidade, pouco oleo e baixo custo",
    productType: "ebook",
    description: "Receitas, lista de compras, preparo em lote e cardapio economico de 14 dias.",
    reason: "Receitas praticas unem conveniencia, saude e economia, otimo para produto de entrada.",
    score: 78,
    growth: "+10%",
    keywords: ["air fryer", "receitas", "economia"],
  },
  {
    id: "concurso-foco",
    niche: "Plano de estudos para concursos com pouco tempo por dia",
    title: "Concurso com 1 hora por dia",
    targetAudience: "Adultos que trabalham e querem estudar com constancia para concurso",
    productType: "ebook",
    description: "Cronograma inteligente, revisao espaçada, simulados semanais e controle de desempenho.",
    reason: "Preparacao para concursos tem alta dor e boa disposicao a comprar metodo organizado.",
    score: 77,
    growth: "+9%",
    keywords: ["concurso", "estudos", "foco"],
  },
  {
    id: "maes-pos-parto",
    niche: "Autocuidado e volta a rotina para maes no pos-parto",
    title: "Pos-parto leve e organizado",
    targetAudience: "Maes recentes que precisam de rotina, autocuidado e organizacao emocional",
    productType: "ebook",
    description: "Planner, checklist de autocuidado, rotina de sono possivel e apoio emocional guiado.",
    reason: "Nichos maternos compram bem quando a promessa e especifica, segura e acolhedora.",
    score: 76,
    growth: "+8%",
    keywords: ["maternidade", "pos-parto", "autocuidado"],
  },
  {
    id: "marketing-local",
    niche: "Marketing local com WhatsApp e Instagram para pequenos negocios",
    title: "Clientes todos os dias no bairro",
    targetAudience: "Donos de pequenos negocios que precisam vender mais sem agencia",
    productType: "ebook",
    description: "Calendario de posts, scripts de WhatsApp, ofertas semanais e funil simples de bairro.",
    reason: "Pequenos negocios buscam solucao direta para vendas e aceitam templates aplicaveis.",
    score: 75,
    growth: "+8%",
    keywords: ["marketing local", "whatsapp", "instagram"],
  },
  {
    id: "idosos-tecnologia",
    niche: "Tecnologia facil para idosos usarem celular, banco e WhatsApp com seguranca",
    title: "Celular sem medo para idosos",
    targetAudience: "Idosos e familiares que querem aprender recursos basicos com seguranca digital",
    productType: "ebook",
    description: "Aulas passo a passo, golpes comuns, WhatsApp, banco, fotos e configuracoes essenciais.",
    reason: "Educacao digital para idosos tem demanda crescente e forte decisor familiar.",
    score: 74,
    growth: "+7%",
    keywords: ["idosos", "celular", "seguranca digital"],
  },
];

function decodeXmlText(value: string): string {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

async function fetchTrendSignals(): Promise<string[]> {
  const sourceUrl = process.env.TRENDING_RSS_URL || "https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR";
  const response = await fetch(sourceUrl, {
    headers: {
      "user-agent": "GeneratefyTrendRadar/1.0 (+https://localhost)",
      accept: "application/rss+xml, application/xml, text/xml",
    },
    signal: AbortSignal.timeout(7000),
  });

  if (!response.ok) {
    throw new Error(`Trend source failed with ${response.status}`);
  }

  const xml = await response.text();
  const titleMatches = Array.from(xml.matchAll(/<title>([\s\S]*?)<\/title>/gi))
    .map((match) => decodeXmlText(match[1]))
    .filter((title) => title && !/daily search trends|google trends/i.test(title));
  const newsMatches = Array.from(xml.matchAll(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/gi))
    .map((match) => decodeXmlText(match[1]));

  return Array.from(new Set([...titleMatches, ...newsMatches]))
    .filter(Boolean)
    .slice(0, 30);
}

function buildTrendingNiches(signals: string[]): TrendingNiche[] {
  const signalText = signals.join(" | ").toLowerCase();
  const liveBoosts: Array<{ test: RegExp; niche: TrendingNiche }> = [
    {
      test: /emagrec|dieta|treino|fitness|academia|corrida|sa[uú]de|ozempic|jejum/i,
      niche: {
        ...fallbackTrendingNiches[0],
        id: "live-emagrecimento",
        reason: "Sinais recentes de busca ligados a saude/fitness reforcam demanda para um produto pratico de emagrecimento.",
        score: 97,
        growth: "+34%",
      },
    },
    {
      test: /\bia\b|intelig[eê]ncia artificial|chatgpt|gemini|automacao|renda extra|trabalho online/i,
      niche: {
        ...fallbackTrendingNiches[1],
        id: "live-ia-renda-extra",
        reason: "Tendencias recentes de tecnologia/IA indicam boa janela para produto simples e aplicavel.",
        score: 95,
        growth: "+31%",
      },
    },
    {
      test: /ansiedade|sono|mental|estresse|medita|terapia|burnout/i,
      niche: {
        ...fallbackTrendingNiches[2],
        id: "live-sono-ansiedade",
        reason: "Buscas recentes de bem-estar sugerem alta intencao por solucoes guiadas e de baixo atrito.",
        score: 92,
        growth: "+26%",
      },
    },
    {
      test: /beleza|skincare|pele|cabelo|maquiagem|estetica/i,
      niche: {
        ...fallbackTrendingNiches[3],
        id: "live-skincare",
        reason: "Sinais de beleza e autocuidado favorecem produtos com rotina, checklist e acompanhamento.",
        score: 89,
        growth: "+22%",
      },
    },
    {
      test: /dinheiro|finan|d[ií]vida|cart[aã]o|invest|imposto|banco/i,
      niche: {
        ...fallbackTrendingNiches[5],
        id: "live-financas-casal",
        reason: "Assuntos financeiros em alta tendem a converter bem quando viram metodo pratico e especifico.",
        score: 87,
        growth: "+18%",
      },
    },
  ];

  const picked = liveBoosts
    .filter((entry) => entry.test.test(signalText))
    .map((entry) => ({
      ...entry.niche,
      keywords: Array.from(new Set([...entry.niche.keywords, ...signals.slice(0, 2)])).slice(0, 4),
    }));

  const merged = [...picked, ...fallbackTrendingNiches]
    .filter((item, index, arr) => arr.findIndex((candidate) => candidate.niche === item.niche) === index)
    .sort((a, b) => b.score - a.score)
    .slice(0, 14);

  return merged;
}

async function getTrendingNichePayload(forceRefresh = false): Promise<TrendingNichePayload> {
  if (!forceRefresh && trendingCache && trendingCache.expiresAt > Date.now()) {
    return trendingCache.payload;
  }

  const updatedAt = new Date();
  const nextUpdateAt = new Date(updatedAt.getTime() + TRENDING_CACHE_TTL_MS);

  try {
    const signals = await fetchTrendSignals();
    const payload: TrendingNichePayload = {
      updatedAt: updatedAt.toISOString(),
      nextUpdateAt: nextUpdateAt.toISOString(),
      source: signals.length > 0 ? "Google Trends BR RSS + scoring Generatefy" : "Generatefy fallback",
      isFallback: signals.length === 0,
      items: signals.length > 0 ? buildTrendingNiches(signals) : fallbackTrendingNiches,
    };
    trendingCache = { expiresAt: nextUpdateAt.getTime(), payload };
    return payload;
  } catch (error) {
    console.warn("[Trending Niches] using fallback:", error);
    const payload: TrendingNichePayload = {
      updatedAt: updatedAt.toISOString(),
      nextUpdateAt: nextUpdateAt.toISOString(),
      source: "Generatefy fallback local",
      isFallback: true,
      items: fallbackTrendingNiches,
    };
    trendingCache = { expiresAt: nextUpdateAt.getTime(), payload };
    return payload;
  }
}

async function startServer() {
  const app = express();
  const whatsappEngine = createEmbeddedWhatsAppEngine();

  app.use(express.json({ limit: "12mb" }));

  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", async (_req, res) => {
    const adminState = whatsappEngine.getAdminState();
    res.json({
      status: "ok",
      time: new Date().toISOString(),
      whatsapp: {
        configured: adminState.configured,
        running: adminState.running,
        booting: adminState.booting,
        mode: adminState.mode,
        dataDir: adminState.dataDir,
        engine: adminState.engine,
      },
    });
  });

  app.get("/api/trending-niches", async (req, res) => {
    const forceRefresh = req.query.refresh === "1" || req.query.refresh === "true";
    const payload = await getTrendingNichePayload(forceRefresh);
    res.json(payload);
  });

  app.post("/api/groq/chat", async (req: Request<unknown, unknown, GroqChatBody>, res: Response) => {
    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const serverGroqKey = process.env.GROQ_API_KEY?.trim();
    const apiKey = serverGroqKey || req.body.apiKey?.trim();
    const model = req.body.model?.trim() || process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";

    if (!apiKey) {
      res.status(400).json({
        error: "GROQ_API_KEY_MISSING",
        message: "Nao foi possivel gerar agora. Tente novamente em alguns instantes.",
      });
      return;
    }

    if (messages.length === 0) {
      res.status(400).json({ error: "EMPTY_MESSAGES", message: "Nenhuma mensagem enviada para a Groq." });
      return;
    }

    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: Number.isFinite(req.body.temperature) ? req.body.temperature : 0.3,
          max_completion_tokens: req.body.maxTokens || 8192,
          response_format: req.body.responseFormat,
        }),
      });

      const data: any = await groqResponse.json().catch(() => ({}));

      if (!groqResponse.ok) {
        res.status(groqResponse.status).json({
          error: data?.error?.code || "GROQ_REQUEST_FAILED",
          message: "Nao foi possivel gerar agora. Tente novamente em alguns instantes.",
        });
        return;
      }

      res.json({
        text: data?.choices?.[0]?.message?.content || "",
        model: data?.model || model,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(502).json({ error: "GROQ_NETWORK_ERROR", message });
    }
  });

  app.get(["/api/whatsapp-engine-admin/status", "/api/ryzesend-admin/status"], (_req, res) => {
    res.json(whatsappEngine.getAdminState());
  });

  app.post(["/api/whatsapp-engine-admin/start", "/api/ryzesend-admin/start"], async (_req, res) => {
    const state = await whatsappEngine.ensureStarted();
    res.json({ ok: true, ...state });
  });

  app.get("/supabase-proxy/health", (_req, res) => {
    res.json({ status: "proxy-alive", target: "https://tjmacxansodaebpqfinb.supabase.co" });
  });

  app.use("/supabase-proxy", (req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey, x-client-info");
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.use(
    "/supabase-proxy",
    createProxyMiddleware({
      target: "https://tjmacxansodaebpqfinb.supabase.co",
      changeOrigin: true,
      timeout: 10000,
      proxyTimeout: 10000,
      pathRewrite: {
        "^/supabase-proxy": "",
      },
      on: {
        proxyReq: (proxyReq, req) => {
          console.log(`[Proxy Request] ${req.method} ${req.url} -> ${proxyReq.path}`);
          if (req.headers["apikey"]) {
            proxyReq.setHeader("apikey", req.headers["apikey"]);
          }
        },
        proxyRes: (proxyRes, req) => {
          console.log(`[Proxy Response] ${proxyRes.statusCode} for ${req.url}`);
          proxyRes.headers["access-control-allow-origin"] = "*";
          proxyRes.headers["access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS";
          proxyRes.headers["access-control-allow-headers"] = "Content-Type, Authorization, apikey, x-client-info";
        },
        error: (err, _req, res) => {
          console.error("[Proxy Error]", err);
          if (res instanceof ServerResponse) {
            res.writeHead(500, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ error: "Proxy Error", message: err.message }));
          }
        },
      },
    })
  );

  app.use(["/api/whatsapp-engine", "/api/ryzesend"], whatsappEngine.router);

  app.use((req, res, next) => {
    if (req.url.startsWith("/supabase-proxy") || req.url.startsWith("/api")) {
      if (!res.headersSent) {
        res.status(404).json({ error: "Not Found", message: "Route not handled by proxy" });
        return;
      }
    }
    next();
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Supabase Proxy active at /supabase-proxy");
    console.log("WhatsApp dispatch engine mounted.");
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
