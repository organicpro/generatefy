import React, { useEffect, useState } from 'react';
import { 
  Plus, Sparkles, BookOpen, AppWindow, ArrowRight, Loader2, 
  CheckCircle2, Download, Share2, Rocket, Zap, Wand2,
  FileText, Code2, Presentation, Smartphone, ShoppingBag,
  Dumbbell, Coins, Brain, Timer, X, Eye, FileDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { UserIdentity } from '../types';
import { extractJsonObject, generateGroqText } from '../services/groqService';

interface ProductCreatorProps {
  onProductCreated: (productName: string, productType: string, description: string) => void;
  identity: UserIdentity;
  onOpenIdentity: () => void;
  seedNiche?: ProductSeed | null;
}

type ProductType = 'ebook' | 'app';

interface ProductSeed {
  niche: string;
  targetAudience?: string;
  productType?: ProductType;
}

const APP_MODELS = [
  {
    id: 'fitness',
    icon: Dumbbell,
    title: 'FitFlow AI',
    subtitle: 'O personal trainer inteligente que cabe no seu bolso.',
    description: 'Um aplicativo completo de fitness que utiliza inteligência artificial para criar treinos adaptativos. Ideal para quem busca resultados reais sem precisar de uma academia cara. Inclui rastreamento de calorias, vídeos em 4K e planos de nutrição personalizados.',
    structure: [
      'Treinos Adaptativos via IA',
      'Plano Nutricional Inteligente',
      'Comunidade Exclusiva de Alunos',
      'Rastreamento de Progresso Biométrico',
      'Integração com Apple Health / Google Fit'
    ],
    priceSuggestion: 'R$ 49,90/mês',
    bonus: 'Acesso vitalício ao Pack de Receitas Saudáveis'
  },
  {
    id: 'finance',
    icon: Coins,
    title: 'MoneyMind',
    subtitle: 'Domine suas finanças e alcance a liberdade financeira.',
    description: 'O gerenciador financeiro definitivo para quem deseja sair das dívidas e começar a investir. Sincronização bancária automática, categorização inteligente de gastos e projeções de patrimônio para os próximos 10 anos.',
    structure: [
      'Dashboard Financeiro em Tempo Real',
      'Calculadora de Independência Financeira',
      'Alerta de Gastos Excessivos',
      'Módulo de Investimentos para Iniciantes',
      'Exportação de Relatórios para IR'
    ],
    priceSuggestion: 'R$ 29,90/mês',
    bonus: 'Ebook: O Guia Definitivo do Investidor Iniciante'
  },
  {
    id: 'zen',
    icon: Brain,
    title: 'ZenSpace',
    subtitle: 'Sua paz mental é a nossa maior prioridade.',
    description: 'Um refúgio digital para ansiedade e estresse. Meditações guiadas por especialistas, sons ambientes de alta fidelidade e exercícios de respiração comprovados pela ciência. Melhore seu sono e aumente seu foco diário.',
    structure: [
      'Biblioteca de Meditações Guiadas',
      'Monitor de Qualidade do Sono',
      'Diário de Gratidão Digital',
      'Sons Binaurais para Foco Profundo',
      'Workshops Mensais com Psicólogos'
    ],
    priceSuggestion: 'R$ 19,90/mês',
    bonus: 'Sessão de Mentoria em Grupo (Primeiro Mês)'
  },
  {
    id: 'productivity',
    icon: Timer,
    title: 'FocusForce',
    subtitle: 'Transforme procrastinação em produtividade implacável.',
    description: 'O sistema operacional para sua rotina. Metodologia ágil aplicada à vida pessoal. Organize suas tarefas, gerencie seus projetos e utilize o timer Pomodoro integrado para manter a concentração máxima durante todo o dia.',
    structure: [
      'Gestão de Tarefas Estilo Kanban',
      'Timer Pomodoro Customizável',
      'Bloqueador de Distrações Integrado',
      'Estatísticas de Produtividade Semanal',
      'Sincronização entre Dispositivos'
    ],
    priceSuggestion: 'R$ 14,90/mês',
    bonus: 'Curso: Gestão do Tempo para Alta Performance'
  },
  {
    id: 'beauty',
    icon: ShoppingBag,
    title: 'GlowUp AI',
    subtitle: 'Sua rotina de skincare personalizada pelo poder da ciência.',
    description: 'Um guia digital interativo que analisa seu tipo de pele e condições climáticas locais para sugerir a rotina perfeita. Inclui lembretes de hidratação, análise de ingredientes de produtos e diário de fotos para acompanhar a evolução da sua pele.',
    structure: [
      'Análise de Pele via Filtros Inteligentes',
      'Rotina de Skincare Diária e Noturna',
      'Banco de Dados de Ingredientes (Decifrador)',
      'Lembretes de Hidratação e Protetor Solar',
      'Marketplace de Produtos Recomendados'
    ],
    priceSuggestion: 'R$ 39,90 (Acesso Semestral)',
    bonus: 'Guia: Alimentação para uma Pele Radiante'
  }
];

const EBOOK_WAVE_COUNT = 10;

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildEbookFrontMatter = (content: any, niche: string, targetAudience: string, authorName: string) => {
  const structure = Array.isArray(content?.structure) ? content.structure : [];
  const title = escapeHtml(content?.title || 'Ebook Generatefy');
  const subtitle = escapeHtml(content?.subtitle || 'Guia pratico para transformar conhecimento em resultado.');
  const description = escapeHtml(content?.description || '');
  const audience = escapeHtml(targetAudience || 'Leitores que buscam evoluir com clareza e acao.');
  const nicheLabel = escapeHtml(niche || 'Produto digital');
  const author = escapeHtml(authorName || 'Generatefy');

  return `
    <section class="gamma-page gamma-card-primary ebook-cover">
      <div class="page-kicker">EBOOK PREMIUM</div>
      <h1>${title}</h1>
      <p class="cover-subtitle">${subtitle}</p>
      <div class="gamma-grid">
        <div class="gamma-feature"><strong>Nicho</strong><br/>${nicheLabel}</div>
        <div class="gamma-feature"><strong>Publico</strong><br/>${audience}</div>
      </div>
      <p class="page-footer">Edicao Generatefy • ${author} • ${new Date().getFullYear()}</p>
    </section>

    <section class="gamma-page gamma-card">
      <div class="page-kicker">PAGINA 02</div>
      <h2>Como usar este material</h2>
      <p>${description}</p>
      <div class="gamma-grid">
        <div class="gamma-feature"><strong>Leia com foco:</strong><br/>Separe um bloco de tempo para absorver cada capitulo sem pressa.</div>
        <div class="gamma-feature"><strong>Aplique em seguida:</strong><br/>Cada capitulo foi pensado para virar uma acao pratica no mesmo dia.</div>
        <div class="gamma-feature"><strong>Revise semanalmente:</strong><br/>Volte aos checklists para medir evolucao e ajustar o plano.</div>
        <div class="gamma-feature"><strong>Personalize:</strong><br/>Adapte exemplos e exercicios para sua rotina, publico e objetivo.</div>
      </div>
    </section>

    <section class="gamma-page gamma-card-dark">
      <div class="page-kicker">PAGINA 03</div>
      <h2>Sumario executivo</h2>
      <p>Este ebook combina estrategia, clareza e plano de acao. Abaixo estao os pilares que guiam a jornada:</p>
      <ol class="ebook-list">
        ${structure.map((item: string, index: number) => `<li><strong>${String(index + 1).padStart(2, '0')}.</strong> ${escapeHtml(item)}</li>`).join('')}
      </ol>
    </section>

    <section class="gamma-page gamma-card">
      <div class="page-kicker">PAGINA 04</div>
      <h2>Mapa da transformacao</h2>
      <p>Antes dos capitulos, entenda a promessa central: sair de uma situacao confusa ou travada para um processo simples, organizado e aplicavel.</p>
      <div class="gamma-grid">
        <div class="gamma-feature"><strong>Ponto de partida</strong><br/>Dores, duvidas e bloqueios que impedem o progresso.</div>
        <div class="gamma-feature"><strong>Metodo</strong><br/>Conceitos práticos explicados com exemplos, exercicios e checklists.</div>
        <div class="gamma-feature"><strong>Resultado</strong><br/>Clareza para executar, medir e evoluir sem depender de improviso.</div>
        <div class="gamma-feature"><strong>Proximo passo</strong><br/>Um plano simples para colocar tudo em movimento.</div>
      </div>
    </section>
  `;
};

const buildFallbackEbookWave = (waveTitle: string, index: number, generatedTitle: string) => `
  <section class="gamma-page gamma-card-dark">
    <div class="page-kicker">CAPITULO ${index + 1}</div>
    <h2>${escapeHtml(waveTitle)}</h2>
    <p>Esta secao aprofunda uma etapa essencial do metodo ${escapeHtml(generatedTitle)} com foco em entendimento, aplicacao e consistencia.</p>
  </section>
  <section class="gamma-page gamma-card">
    <div class="page-kicker">PAGINA PRATICA</div>
    <h2>Aplicacao guiada</h2>
    <p>Use esta pagina como roteiro de execucao: identifique o problema principal, escolha uma acao pequena, defina um prazo curto e registre o resultado.</p>
    <div class="gamma-grid">
      <div class="gamma-feature"><strong>Diagnostico</strong><br/>O que precisa mudar agora?</div>
      <div class="gamma-feature"><strong>Acao</strong><br/>Qual atitude simples sera feita hoje?</div>
      <div class="gamma-feature"><strong>Metrica</strong><br/>Como voce vai saber que evoluiu?</div>
      <div class="gamma-feature"><strong>Revisao</strong><br/>O que deve ser ajustado na proxima tentativa?</div>
    </div>
  </section>
`;

export default function ProductCreator({ onProductCreated, identity, onOpenIdentity, seedNiche }: ProductCreatorProps) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType>('ebook');
  const [niche, setNiche] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [productHtml, setProductHtml] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [currentWave, setCurrentWave] = useState(0);

  useEffect(() => {
    if (!seedNiche) return;

    setSelectedType(seedNiche.productType || 'ebook');
    setNiche(seedNiche.niche || '');
    setTargetAudience(seedNiche.targetAudience || '');
    setGeneratedContent(null);
    setProductHtml('');
    setErrorMessage('');
  }, [seedNiche]);
  
  const productTypes = [
    { id: 'ebook', icon: BookOpen, label: 'Ebook Digital', desc: 'Conteúdo educativo em PDF' },
    { id: 'app', icon: Smartphone, label: 'App/SaaS Pronto', desc: 'Modelos de software completos' }
  ];

  const generateProduct = async () => {
    if (!niche) {
      setErrorMessage('Escolha um nicho antes de gerar a oferta.');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    
    try {
      const prompt = `
        Aja como um Product Manager e Copywriter Senior. 
        Crie um Ebook de alta conversão para o nicho "${niche}".
        Público alvo: ${targetAudience || 'Empreendedores e profissionais digitais'}.
        
        Retorne um JSON estrito com os campos:
        "title": Nome chamativo do produto,
        "subtitle": Promessa forte (headline),
        "description": Descrição persuasiva (3-4 parágrafos),
        "structure": Lista de 5-7 tópicos/módulos/funcionalidades principais,
        "priceSuggestion": Sugestão de preço em Real (R$),
        "bonus": Um bônus irresistível.
      `;

      const text = await generateGroqText({
        prompt,
        customApiKey: identity.groqApiKey || identity.apiKey,
        json: true,
        temperature: 0.3,
        maxTokens: 4096,
      });

      const jsonStr = extractJsonObject(text || "{}");
      const content = JSON.parse(jsonStr);
      setGeneratedContent(content);
      setProductHtml(''); 
    } catch (error) {
      console.error("Generator error:", error);
      setErrorMessage("Nao foi possivel gerar a oferta agora. Tente novamente em alguns instantes.");
    } finally {
      setLoading(false);
    }
  };

  const materializeContent = async () => {
    if (!generatedContent) return;
    setGeneratingContent(true);
    setProductHtml('');
    setCurrentWave(0);
    setErrorMessage('');
    
    try {
      if (selectedType === 'app') {
        // SIMULAÇÃO DE GERAÇÃO PARA APPS
        const totalSimSteps = 10;
        for (let i = 1; i <= totalSimSteps; i++) {
          setCurrentWave(i);
          // Simula latência da IA
          await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
        }

        // Recupera template pré-definido ou gera um básico se não existir
        const { APP_TEMPLATES } = await import('../constants/app_templates');
        let appHtml = APP_TEMPLATES[generatedContent.id] || APP_TEMPLATES['fitness']; // Fallback

        // Personalização leve do template com os dados gerados
        appHtml = appHtml
          .replace(/\{\{APP_TITLE\}\}/g, generatedContent.title || 'App Generatefy')
          .replace(/\{\{APP_SUBTITLE\}\}/g, generatedContent.subtitle || 'Seu app pronto e funcional')
          .replace(/\{\{USER_NAME\}\}/g, identity.name || 'Usuario')
          .replace(/\{\{NICHE\}\}/g, niche || generatedContent.title || 'Rotina digital')
          .replace(/Atleta/g, identity.name || 'Usuario')
          .replace(/FitFlow AI/g, generatedContent.title)
          .replace(/MoneyMind/g, generatedContent.title);
        
        setProductHtml(appHtml);
        setIsPreviewOpen(true);
      } else {
        let fullHtml = buildEbookFrontMatter(generatedContent, niche, targetAudience, identity.name);
        setProductHtml(fullHtml);
        const waves = [
          { title: 'Capa e Sumário Executivo', start: 0, end: 0 },
          { title: 'Capítulos 1 e 2: A Fundação', start: 1, end: 2 },
          { title: 'Capítulos 3 e 4: Pilares do Sucesso', start: 3, end: 4 },
          { title: 'Capítulos 5 e 6: Técnicas Avançadas', start: 5, end: 6 },
          { title: 'Capítulos 7 e 8: Domínio de Mercado', start: 7, end: 8 },
          { title: 'Capítulos 9 e 10: Estratégias de Escala', start: 9, end: 10 },
          { title: 'Capítulos 11 e 12: Psicologia e Conversão', start: 11, end: 12 },
          { title: 'Capítulos 13 e 14: Gestão e Operação', start: 13, end: 14 },
          { title: 'Capítulos 15 e 16: Otimização e Performance', start: 15, end: 16 },
          { title: 'Capítulos 17 e 18: Casos de Sucesso e Erros Comuns', start: 17, end: 18 },
          { title: 'Capítulos 19 e 20: Conclusão e Plano de Ação', start: 19, end: 20 }
        ];

        for (let i = 0; i < waves.length; i++) {
          setCurrentWave(i + 1);
          const wave = waves[i];
          
          const prompt = `
            Aja como um designer instrucional e Copywriter de elite especializado no nicho ${niche}. 
            Você está criando o e-book PREMIUM (Estilo Gamma App / Slidedeck Moderno): "${generatedContent.title}".
            
            TAREFA: Escrever a ONDA ${i+1} que compreende: ${wave.title}.
            Publico alvo: ${targetAudience || 'pessoas interessadas no tema'}.
            IMPORTANTE: Gere PAGINAS reais de ebook, nao apenas capitulos ou topicos.
            Cada pagina deve ser uma secao HTML com classe "gamma-page" e marcador "PAGINA".
            Para cada capitulo, gere abertura, conteudo profundo, exemplos e pagina pratica.
            Esta onda deve ter entre 5 e 8 paginas completas, com paragrafos, listas, grids e exercicios.
            
            DIRETRIZES DE DESIGN (ESTILO GAMMA APP):
            - O conteúdo deve ser estruturado em "CARDS" independentes.
            - Cada card deve ser uma seção <section class="gamma-card">.
            - Alterne entre designs de cards usando as classes: 
              - "gamma-card" (Padrão, fundo branco)
              - "gamma-card-dark" (Elegante, fundo escuro)
              - "gamma-card-primary" (Destaque, fundo gradiente escuro)
            
            REQUISITOS DE CONTEÚDO PARA ESTA ONDA:
            - Escreva o conteúdo real e detalhado dos capítulos ${wave.start} e ${wave.end}.
            - Não economize no conhecimento técnico. Use listas, tabelas e grids.
            - Use a estrutura <div class="gamma-grid"> para comparar conceitos ou listar benefícios.
            - Dentro da grid, use <div class="gamma-feature"> para cada item.
            
            ESTRUTURA DETALHADA DESTA ONDA:
            ${i === 0 ? `
              - CARD DE CAPA (gamma-card-primary):
                - Título gigante (font-black text-6xl md:text-8xl tracking-tighter).
                - Subtítulo persuasivo.
                - Rodapé: "EDICÃO EXCLUSIVA NEURAL ENGINE • ${identity.name}".
              - CARD DE SUMÁRIO (gamma-card):
                - Lista visual dos 20 capítulos.
            ` : `
              - CARDS DE CONTEÚDO (Pelos menos 2 cards por capítulo):
                - Cada capítulo deve começar com um card de destaque (gamma-card-dark).
                - O desenvolvimento técnico deve ser em cards detalhados (gamma-card).
              ${i === waves.length - 1 ? '- CARD DE CONCLUSÃO EPIC (gamma-card-primary) com plano de ação.' : ''}
            `}
            
            REGRAS ADICIONAIS:
            - Tipografia: Use classes do Tailwind (text-4xl, md:text-6xl, tracking-tight).
            - ÍCONES: Como não temos bibliotecas externas no HTML injetado, use Emojis de forma estratégica e elegante para substituir ícones.
            - Retorne APENAS o HTML puro dos cards. Não use <html>, <head> ou <body>.
          `;

          try {
            const text = await generateGroqText({
              prompt,
              customApiKey: identity.groqApiKey || identity.apiKey,
              temperature: 0.35,
              maxTokens: 12000,
            });

            const waveHtml = (text || "").replace(/```html|```/gi, '').trim();
            if (!waveHtml || waveHtml.length < 300) {
              throw new Error('Onda retornou conteudo curto demais.');
            }
            fullHtml += `\n<!-- ONDA ${i+1}: ${wave.title} -->\n` + waveHtml;
          } catch (waveError) {
            console.error(`Erro na onda ${i + 1}:`, waveError);
            fullHtml += `\n<!-- ONDA ${i+1}: fallback seguro -->\n` + buildFallbackEbookWave(wave.title, i, generatedContent.title || 'Ebook');
            setErrorMessage('Uma parte do ebook oscilou na IA, mas gerei paginas de apoio automaticamente para nao interromper o material.');
          }
          setProductHtml(fullHtml);
        }
        setIsPreviewOpen(true);
      }
    } catch (error) {
      console.error("Content generation error:", error);
      setErrorMessage("Nao foi possivel finalizar o ebook agora. Tente novamente em alguns instantes.");
    } finally {
      setGeneratingContent(false);
      setCurrentWave(0);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([productHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedContent?.title || 'app'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${generatedContent?.title || 'Ebook'}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
              @media print {
                .no-print { display: none; }
                body { background: #f4f4f5 !important; color: #18181b !important; -webkit-print-color-adjust: exact; }
                .gamma-card { page-break-after: always; margin-bottom: 0 !important; border: none !important; box-shadow: none !important; border-radius: 0 !important; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 4rem !important; }
                .gamma-card-dark { background: #18181b !important; color: white !important; }
                .gamma-card-primary { background: #18181b !important; color: white !important; }
              }
              body { font-family: 'Inter', sans-serif; background: #f4f4f5; color: #18181b; }
              .content { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; padding: 2rem; }
              .gamma-card { background: white; border-radius: 1.5rem; padding: 3rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); border: 1px solid rgba(0,0,0,0.05); }
              .gamma-card-dark { background: #18181b; color: white; }
              .gamma-card-primary { background: linear-gradient(135deg, #18181b 0%, #27272a 100%); color: white; }
              h1, h2, h3 { color: inherit !important; }
              h1 { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.04em; }
              h2 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
              p, span, li { font-size: 1.125rem; line-height: 1.7; margin-bottom: 1.25rem; opacity: 0.9; color: inherit !important; }
              .gamma-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
              .gamma-feature { background: rgba(0,0,0,0.03); padding: 1.5rem; border-radius: 1rem; }
              .gamma-card-dark .gamma-feature { background: rgba(255,255,255,0.05); }
            </style>
          </head>
          <body>
            <div class="content">
              ${productHtml}
            </div>
            <script>
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 1000);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleSelectAppModel = (model: typeof APP_MODELS[0]) => {
    setGeneratedContent(model);
    setProductHtml('');
  };

  const handleFinish = () => {
    if (generatedContent) {
      const fullDescription = `
        Título: ${generatedContent.title}
        Subtítulo: ${generatedContent.subtitle}
        Descrição: ${generatedContent.description}
        Principais Funcionalidades/Módulos: ${generatedContent.structure.join(', ')}
        Bônus: ${generatedContent.bonus}
      `;
      onProductCreated(
        generatedContent.title, 
        selectedType, 
        fullDescription
      );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10 bg-black custom-scrollbar relative">
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col xl:flex-row animate-in fade-in zoom-in-95 duration-500">
          {/* Main Workspace */}
          <div className="flex-1 min-h-0 flex flex-col relative overflow-hidden">
            {/* Minimal Header */}
            <div className="h-14 shrink-0 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-black/40 backdrop-blur-md z-50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  {selectedType === 'app' ? <Smartphone className="w-4 h-4 text-primary" /> : <BookOpen className="w-4 h-4 text-primary" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] truncate">{generatedContent?.title || 'Preview'}</h3>
                  <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none mt-0.5 truncate">GENERATEFY STUDIO ENGINE v3.0</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors text-zinc-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewer Area */}
            <div className="flex-1 min-h-0 overflow-auto relative flex items-center justify-center bg-[#0a0a0a] p-3 sm:p-6 custom-scrollbar">
              {/* Subtle Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
              
              {selectedType === 'app' ? (
                <div className="relative h-[min(68vh,720px)] sm:h-[min(78vh,780px)] xl:h-[85vh] w-auto max-w-[92vw] aspect-[9/19] animate-in slide-in-from-bottom-8 duration-700">
                  {/* Premium Device Frame */}
                  <div className="h-full w-full bg-[#050505] rounded-[2.6rem] sm:rounded-[3.5rem] p-2 sm:p-3 border-[8px] sm:border-[12px] border-neutral-900 shadow-[0_0_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden flex flex-col">
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                      <div className="w-8 h-1 bg-zinc-800 rounded-full"></div>
                    </div>
                    
                    <iframe 
                      srcDoc={productHtml}
                      className="w-full h-full border-none rounded-[1.9rem] sm:rounded-[2.5rem]"
                      title="App Preview"
                    />
                  </div>
                  {/* External Buttons Simulation */}
                  <div className="hidden sm:block absolute top-28 -left-[14px] w-[3px] h-10 bg-neutral-800 rounded-l-md border-y border-white/5"></div>
                  <div className="hidden sm:block absolute top-44 -left-[14px] w-[3px] h-14 bg-neutral-800 rounded-l-md border-y border-white/5"></div>
                  <div className="hidden sm:block absolute top-60 -left-[14px] w-[3px] h-14 bg-neutral-800 rounded-l-md border-y border-white/5"></div>
                  <div className="hidden sm:block absolute top-40 -right-[14px] w-[3px] h-20 bg-neutral-800 rounded-r-md border-y border-white/5"></div>
                </div>
              ) : (
                <div className="w-full h-full overflow-y-auto p-4 md:p-12 lg:p-20 bg-zinc-900/10 custom-scrollbar selection:bg-primary/30">
                  <div className="max-w-[1000px] mx-auto min-h-screen relative animate-in slide-in-from-bottom-8 duration-700 pb-32">
                    <style>{`
                      .ebook-content { 
                        display: flex;
                        flex-direction: column;
                        gap: 24px;
                        padding: 24px 0;
                      }
                      
                      .gamma-card {
                        background: #ffffff;
                        border-radius: 24px;
                        padding: 48px;
                        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                        border: 1px solid rgba(0,0,0,0.05);
                        position: relative;
                        overflow: hidden;
                        color: #18181b;
                      }

                      .gamma-card-dark {
                        background: #09090b !important;
                        color: #ffffff !important;
                        border: 1px solid rgba(255,255,255,0.1);
                      }
                      
                      .gamma-card-primary {
                        background: linear-gradient(135deg, #18181b 0%, #27272a 100%) !important;
                        color: #ffffff !important;
                        border: 1px solid rgba(168,85,247,0.3);
                      }

                      .ebook-content h1, .ebook-content h2, .ebook-content h3 { color: inherit !important; font-family: 'Inter', sans-serif; }
                      .ebook-content h1 { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.04em; }
                      .ebook-content h2 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
                      .ebook-content h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
                      .ebook-content p, .ebook-content span, .ebook-content li { color: inherit !important; font-size: 1.125rem; line-height: 1.7; margin-bottom: 1.25rem; opacity: 0.9; }
                      
                      .gamma-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 24px;
                        margin-top: 24px;
                      }

                      .gamma-feature {
                        background: rgba(0,0,0,0.03);
                        padding: 24px;
                        border-radius: 16px;
                        border: 1px solid rgba(0,0,0,0.05);
                      }

                      .gamma-card-dark .gamma-feature {
                        background: rgba(255,255,255,0.03);
                        border: 1px solid rgba(255,255,255,0.05);
                      }

                      /* Page break for printing */
                      .gamma-card { page-break-after: always; }
                      .gamma-page { min-height: 760px; display: flex; flex-direction: column; justify-content: center; }
                      .page-kicker { font-size: 0.72rem; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.55; margin-bottom: 1.25rem; }
                      .ebook-list { display: grid; gap: 0.8rem; padding-left: 1.2rem; }
                      .cover-subtitle { font-size: 1.5rem !important; max-width: 760px; }
                      .page-footer { margin-top: auto; font-size: 0.85rem !important; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.55; }
                    `}</style>
                    <div className="ebook-content" dangerouslySetInnerHTML={{ __html: productHtml }} />
                    <div className="mt-32 pt-16 border-t border-zinc-100 text-zinc-500 text-[10px] italic text-center font-sans tracking-widest uppercase">
                      Documento Identificado • Generatefy Content Engine v3 • {new Date().getFullYear()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="w-full xl:w-[320px] h-auto xl:h-full max-h-[42vh] xl:max-h-none border-t xl:border-t-0 xl:border-l border-white/5 bg-zinc-950 p-4 sm:p-6 xl:p-8 flex flex-col gap-5 xl:gap-8 shadow-2xl z-[110]">
            <div className="space-y-1">
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Situação Operacional</h4>
              <div className="flex items-center gap-2 text-green-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Produto Validado</span>
              </div>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Configurações de Exportação</label>
                <div className="space-y-2">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 group hover:border-primary/40 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {selectedType === 'ebook' ? <FileText className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter">{selectedType === 'ebook' ? 'PDF HQ PRINT' : 'HTML5 EXPORT'}</p>
                      <p className="text-[8px] font-medium text-zinc-500 leading-none">Alta Fidelidade</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Estrutura Gerada</label>
                <div className="space-y-2">
                  {generatedContent?.structure?.slice(0, 4).map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 py-1">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-tight truncate">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <button 
                onClick={selectedType === 'ebook' ? downloadPdf : downloadHtml}
                className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group shadow-xl shadow-black"
              >
                <FileDown className="w-4 h-4 group-hover:bounce" />
                {selectedType === 'ebook' ? 'Exportar em PDF' : 'Baixar Arquivo HTML'}
              </button>

              <button 
                onClick={handleFinish}
                className="w-full py-5 bg-primary text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_50px_rgba(34,197,94,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                Avancar: Copy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Rocket className="w-3.5 h-3.5 animate-bounce" />
            Passo 02: Definição do Produto
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
            O que vamos <span className="text-primary italic">vender?</span>
          </h1>
          <p className="text-neutral-500 max-w-2xl text-sm font-medium">
            Escolha um modelo de Aplicativo pronto ou use a IA para criar um Ebook exclusivo para o seu nicho.
          </p>
        </header>

        {seedNiche && (
          <div className="rounded-[2rem] border border-primary/20 bg-primary/10 px-5 py-4 text-sm font-semibold text-primary">
            Nicho importado da mineração: <span className="text-white">{seedNiche.niche}</span>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm font-semibold flex items-start justify-between gap-4 text-amber-100">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
          <div className="space-y-10">
            <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-8 space-y-10 backdrop-blur-3xl shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                   <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Formato de Produto Neural</label>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {productTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id as ProductType);
                        setGeneratedContent(null);
                        setProductHtml('');
                      }}
                      className={cn(
                        "flex flex-col items-center p-8 rounded-[2rem] border transition-all duration-700 text-center group relative overflow-hidden",
                        selectedType === type.id 
                          ? "bg-primary border-primary shadow-[0_20px_50px_rgba(168,85,247,0.2)] scale-100" 
                          : "bg-white/[0.01] border-white/5 hover:border-white/10 scale-95 opacity-50 hover:opacity-100"
                      )}
                    >
                      {selectedType === type.id && (
                        <div className="absolute inset-x-0 top-0 h-1 bg-white/20 animate-pulse" />
                      )}
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 relative z-10",
                        selectedType === type.id ? "bg-black text-primary shadow-inner" : "bg-white/5 text-primary/40 group-hover:text-primary group-hover:bg-primary/5"
                      )}>
                        <type.icon className="w-6 h-6" />
                      </div>
                      <span className={cn("text-xs font-black uppercase tracking-widest mb-1.5 relative z-10", selectedType === type.id ? "text-black" : "text-white")}>{type.label}</span>
                      <span className={cn("text-[8px] font-black uppercase tracking-tighter leading-tight relative z-10 opacity-60", selectedType === type.id ? "text-black/60" : "text-neutral-600")}>{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedType === 'ebook' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Nicho Alvo Estratégico</label>
                      </div>
                      <input 
                        type="text"
                        placeholder="Ex: Emagrecimento para mães ocupadas"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all font-semibold placeholder:text-zinc-800 shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Mapeamento de Público Sniper</label>
                      </div>
                      <input 
                        type="text"
                        placeholder="Ex: Mulheres de 25-40 anos"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all font-semibold placeholder:text-zinc-800 shadow-inner"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={generateProduct}
                    disabled={loading || !niche}
                    className="w-full h-16 bg-primary text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-700 shadow-[0_20px_50px_rgba(168,85,247,0.2)] active:scale-95 disabled:opacity-30 group"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />}
                    Materializar Ignição
                  </button>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Ecossistema de Apps Neurais</label>
                  </div>
                  <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[440px] pr-3 custom-scrollbar">
                    {APP_MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleSelectAppModel(model)}
                        className={cn(
                          "w-full flex items-center gap-5 p-6 rounded-[2.5rem] border transition-all duration-500 text-left relative overflow-hidden group",
                          generatedContent?.id === model.id 
                            ? "bg-primary/5 border-primary shadow-2xl scale-[1.02]" 
                            : "bg-white/[0.01] border-white/5 hover:border-white/10 opacity-70 hover:opacity-100"
                        )}
                      >
                        {generatedContent?.id === model.id && (
                          <div className="absolute inset-0 bg-primary/5 blur-3xl animate-pulse" />
                        )}
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 relative z-10 border border-white/5 shadow-inner",
                          generatedContent?.id === model.id ? "bg-primary text-black" : "bg-white/5 text-primary/40 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20"
                        )}>
                          <model.icon className="w-6 h-6" />
                        </div>
                        <div className="relative z-10">
                          <p className="text-[11px] font-black text-white uppercase tracking-wider mb-1">{model.title}</p>
                          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tight opacity-80">{model.subtitle}</p>
                        </div>
                        {generatedContent?.id === model.id && (
                          <div className="ml-auto relative z-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(168,85,247,1)]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            {generatedContent ? (
              <div className="bg-card border border-primary/20 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                <div className="bg-primary/10 px-8 py-6 border-b border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Oferta Validada</span>
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                    {generatedContent.priceSuggestion}
                  </span>
                </div>
                
                <div className="p-8 md:p-10 space-y-8">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">{generatedContent.title}</h2>
                    <p className="text-primary italic font-medium text-sm">"{generatedContent.subtitle}"</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-neutral-400 text-[11px] leading-relaxed text-center px-4 font-medium">
                      {generatedContent.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {productHtml ? (
                      <button 
                        onClick={() => setIsPreviewOpen(true)}
                        className="w-full py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-primary hover:text-black transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar Produto Final
                      </button>
                    ) : (
                      <button 
                        onClick={materializeContent}
                        disabled={generatingContent}
                        className="w-full py-4 bg-amber-500 text-black rounded-2xl font-black uppercase tracking-widest text-[10px] flex flex-col items-center justify-center gap-1 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-amber-500/20"
                      >
                        <div className="flex items-center gap-3">
                          {generatingContent ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                          {selectedType === 'ebook' ? (generatingContent ? `Materializando paginas ${currentWave}/${EBOOK_WAVE_COUNT}...` : 'Gerar Ebook Completo') : (generatingContent ? `Montando App ${currentWave}/10...` : 'Gerar App Funcional')}
                        </div>
                        {generatingContent && (
                          <div className="w-48 h-1 bg-black/10 rounded-full mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-black/40 transition-all duration-500" 
                              style={{ width: `${(currentWave / (selectedType === 'app' ? 10 : EBOOK_WAVE_COUNT)) * 100}%` }} 
                            />
                          </div>
                        )}
                      </button>
                    )}
                    
                    <button 
                      onClick={handleFinish}
                      className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-primary transition-all group shadow-xl shadow-white/5"
                    >
                      PASSO SEGUINTE: ESCREVER COPY
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest text-center">Estrutura Interna</h3>
                    <div className="grid grid-cols-1 gap-2">
                       {generatedContent.structure.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 group hover:border-primary/20 transition-all">
                          <span className="w-5 h-5 rounded-lg bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary shrink-0">{i + 1}</span>
                          <span className="text-[10px] text-neutral-300 font-bold uppercase tracking-wide">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[600px] border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 opacity-30">
                <Plus className="w-12 h-12 text-neutral-700 mb-4" />
                <p className="text-sm font-black uppercase tracking-[0.4em] text-neutral-600">Aguardando Escolha...</p>
                <p className="text-[10px] text-neutral-800 font-bold uppercase mt-4 max-w-xs leading-relaxed">
                  {selectedType === 'ebook' ? 'Preencha os campos ao lado para validar sua oferta.' : 'Selecione um aplicativo lucrativo para começar.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
