
import { generateGroqText } from "./groqService";

const ThinkingLevel = { HIGH: 'high' };

class GroqCompatAI {
  constructor(private options: { apiKey?: string }) {}

  models = {
    generateContent: async ({ contents, config }: any) => {
      const prompt = typeof contents === 'string'
        ? contents
        : Array.isArray(contents)
          ? contents.map((item) => item?.parts?.map((part: any) => part?.text || '').join('\n') || '').join('\n')
          : String(contents || '');

      const text = await generateGroqText({
        prompt,
        system: config?.systemInstruction,
        customApiKey: this.options.apiKey,
        temperature: config?.temperature ?? 0.3,
        maxTokens: config?.maxOutputTokens || 8192,
        json: config?.responseMimeType === 'application/json',
      });

      return { text };
    },
  };
}

async function callWithFallback(ai: any, _modelName: string, prompt: string, instruction: string, _budget?: number): Promise<any> {
  return ai.models.generateContent({
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      systemInstruction: instruction,
      temperature: 0.25,
      maxOutputTokens: 16384,
    },
  });
}

const MASTER_TEMPLATE = `
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generatefy Elite | Premium Design System</title>
    <meta name="description" content="Design de alta performance e conversão.">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Montserrat:wght@300;400;600;700;800&family=Outfit:wght@300;400;600;700;800&family=Syne:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;600;800&display=swap" rel="stylesheet">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-black': '#0A0A0A',
                        'brand-white': '#FFFFFF',
                        'brand-bone': '#F5F5F5',
                        'brand-gold': '#C5A059',
                    },
                    fontFamily: {
                        sans: ['Inter', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
                        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
                        mono: ['Space Grotesk', 'JetBrains Mono', 'monospace'],
                        // Custom Font Sets
                        'montserrat': ['Montserrat', 'sans-serif'],
                        'syne': ['Syne', 'sans-serif'],
                        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
                        'baskerville': ['Libre Baskerville', 'serif'],
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                        'reveal': 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        reveal: {
                            '0%': { transform: 'translateY(100%)' },
                            '100%': { transform: 'translateY(0)' },
                        }
                    }
                }
            }
        }
    </script>

    <style>
        :root { 
            --bg: #FFFFFF; 
            --text: #0A0A0A; 
            --accent: #C5A059;
            --secondary: #F5F5F5;
        }
        
        html, body { 
            background-color: var(--bg); 
            color: var(--text); 
            margin: 0; 
            padding: 0; 
            overflow-x: hidden;
        }

        /* Premium Typography */
        .text-reveal {
            animation: textReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        @keyframes textReveal {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }

        /* Glassmorphism 2.0 */
        .glass-nav {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .dark .glass-nav {
            background: rgba(10, 10, 10, 0.7);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Bento Grid 2.0 */
        .bento-card {
            background: var(--secondary);
            border: 1px solid rgba(0,0,0,0.03);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .bento-card:hover {
            transform: translateY(-8px) scale(1.01);
            box-shadow: 0 30px 60px rgba(0,0,0,0.08);
            border-color: var(--accent);
        }
        .bento-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(197, 160, 89, 0.1) 0%, transparent 80%);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .bento-card:hover::after { opacity: 1; }

        /* Cinematic Effects */
        .noise-overlay {
            position: fixed;
            inset: 0;
            z-index: 5;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.02;
            pointer-events: none;
        }

        .grainy-gradient {
            background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
            position: relative;
        }
        .grainy-gradient::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.03;
            mix-blend-mode: overlay;
        }

        /* SPA Mode */
        body.spa-mode .page-section { display: none; }
        body.spa-mode .page-section.active { display: block; animation: pageFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes pageFadeIn { 
            from { opacity: 0; transform: scale(0.99) translateY(5px); } 
            to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        
        .custom-cursor {
            width: 8px;
            height: 8px;
            background: var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.15s ease-out;
            display: none;
        }
        .custom-cursor-outline {
            width: 40px;
            height: 40px;
            border: 1px solid var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease-out;
            display: none;
        }
        @media (min-width: 768px) {
            .custom-cursor, .custom-cursor-outline { display: block; }
        }

        .photo-mask {
            mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
        }

        .section-divider {
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent);
        }

        /* Elite Polish Utilities */
        .elite-polish {
            position: relative;
            overflow: hidden;
        }
        .elite-polish::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at center, rgba(197, 160, 89, 0.05) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }
        .text-balance { text-wrap: balance; }
        .tracking-tightest { letter-spacing: -0.05em; }
        .leading-tightest { line-height: 1.1; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }
    </style>
</head>
<body class="bg-brand-white text-brand-black font-sans antialiased selection:bg-brand-black selection:text-brand-white">

    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 glass-nav py-2" data-ryze-id="navbar">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#" onclick="navigateTo('home')" class="text-xl font-serif font-bold tracking-tight text-brand-black" data-ryze-id="logo">
                BRAND<span class="text-brand-gold">.</span>
            </a>
            
            <div class="hidden md:flex items-center space-x-10 text-sm font-medium tracking-widest uppercase">
                <a href="javascript:void(0)" onclick="navigateTo('home')" class="hover:text-brand-gold transition-colors">Início</a>
                <a href="javascript:void(0)" onclick="navigateTo('servicos')" class="hover:text-brand-gold transition-colors">Serviços</a>
                <a href="javascript:void(0)" onclick="navigateTo('processo')" class="hover:text-brand-gold transition-colors">Processo</a>
                <a href="javascript:void(0)" onclick="navigateTo('sobre')" class="hover:text-brand-gold transition-colors">Sobre</a>
                <a href="javascript:void(0)" onclick="navigateTo('faq')" class="hover:text-brand-gold transition-colors">FAQ</a>
                <a href="javascript:void(0)" onclick="navigateTo('contato')" class="bg-brand-black text-brand-white px-6 py-3 rounded-full hover:bg-neutral-800 transition-all">Contato</a>
            </div>

            <div class="flex items-center gap-6">
                <button class="relative group" onclick="toggleCart()" data-ryze-id="cart-trigger">
                    <i data-lucide="shopping-bag" class="w-6 h-6 text-brand-black group-hover:text-brand-gold transition-colors"></i>
                    <span class="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">2</span>
                </button>
                <button class="md:hidden text-brand-black" onclick="toggleMobileMenu()">
                    <i data-lucide="menu"></i>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-black/5 p-6 flex flex-col space-y-4 text-center uppercase text-xs font-bold tracking-widest">
            <a href="javascript:void(0)" onclick="navigateTo('home'); toggleMobileMenu()" class="py-2">Início</a>
            <a href="javascript:void(0)" onclick="navigateTo('servicos'); toggleMobileMenu()" class="py-2">Serviços</a>
            <a href="javascript:void(0)" onclick="navigateTo('processo'); toggleMobileMenu()" class="py-2">Processo</a>
            <a href="javascript:void(0)" onclick="navigateTo('sobre'); toggleMobileMenu()" class="py-2">Sobre</a>
            <a href="javascript:void(0)" onclick="navigateTo('faq'); toggleMobileMenu()" class="py-2">FAQ</a>
            <a href="javascript:void(0)" onclick="navigateTo('contato'); toggleMobileMenu()" class="py-2">Contato</a>
        </div>
    </nav>

    <div id="page-content">
        <!-- Hero Section -->
        <section id="home" class="page-section active relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-bone" data-ryze-id="hero-section">
            <div class="absolute inset-0 z-0">
                <div class="absolute inset-0 bg-gradient-to-r from-brand-bone via-brand-bone/80 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=2070" alt="Hero Background" class="w-full h-full object-cover object-center opacity-40">
            </div>

            <div class="max-w-7xl mx-auto px-6 relative z-20">
                <div class="max-w-3xl">
                    <span class="inline-block py-1 px-3 rounded-full border border-brand-black/10 text-[10px] uppercase tracking-[0.2em] mb-6">
                        Premium Experience
                    </span>
                    <h1 class="text-4xl sm:text-6xl md:text-8xl font-serif leading-[1.1] mb-8 break-words">
                        DESIGN QUE <br>
                        <span class="italic text-brand-gold">TRANSFORMA</span>.
                    </h1>
                    <p class="text-base md:text-xl text-neutral-600 mb-10 max-w-xl leading-relaxed">
                        Criamos soluções digitais de alto impacto que elevam sua marca ao próximo nível de sofisticação e performance.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="javascript:void(0)" onclick="navigateTo('servicos')" class="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-brand-white transition-all duration-200 bg-brand-black rounded-full hover:bg-neutral-800">
                            Explorar Mais
                            <i data-lucide="arrow-right" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <i data-lucide="chevron-down" class="text-brand-black"></i>
            </div>
        </section>

        <!-- Features/Services Section -->
        <section id="servicos" class="page-section py-32 bg-brand-white" data-ryze-id="features-section">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div class="max-w-2xl">
                        <span class="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Nossa Expertise</span>
                        <h2 class="text-5xl md:text-7xl font-serif leading-tight">Soluções que <span class="italic">Redefinem</span> o Mercado.</h2>
                    </div>
                    <p class="text-neutral-500 max-w-sm pb-2">Combinamos visão artística com precisão técnica para criar produtos digitais que não apenas funcionam, mas encantam.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="group p-12 rounded-[3rem] bg-brand-bone bento-card border border-transparent hover:border-brand-gold/20" data-ryze-id="feature-1">
                        <div class="w-16 h-16 bg-brand-black text-brand-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                            <i data-lucide="layers" class="w-8 h-8"></i>
                        </div>
                        <h3 class="text-3xl font-serif mb-6">Design Visionário</h3>
                        <p class="text-neutral-600 leading-relaxed text-lg">Interfaces que antecipam necessidades e criam conexões emocionais profundas com seu público.</p>
                        <div class="mt-10 pt-10 border-t border-black/5 flex justify-between items-center">
                            <span class="text-xs font-bold uppercase tracking-widest">Saber Mais</span>
                            <i data-lucide="arrow-up-right" class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all"></i>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="group p-12 rounded-[3rem] bg-brand-black text-brand-white bento-card relative overflow-hidden" data-ryze-id="feature-2">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl"></div>
                        <div class="w-16 h-16 bg-brand-gold text-brand-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                            <i data-lucide="code" class="w-8 h-8"></i>
                        </div>
                        <h3 class="text-3xl font-serif mb-6">Engenharia de Elite</h3>
                        <p class="text-neutral-400 leading-relaxed text-lg">Arquiteturas robustas e escaláveis, construídas com as tecnologias mais avançadas do mundo.</p>
                        <div class="mt-10 pt-10 border-t border-white/10 flex justify-between items-center">
                            <span class="text-xs font-bold uppercase tracking-widest text-brand-gold">Saber Mais</span>
                            <i data-lucide="arrow-up-right" class="w-5 h-5 text-brand-gold"></i>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div class="group p-12 rounded-[3rem] bg-brand-bone bento-card border border-transparent hover:border-brand-gold/20" data-ryze-id="feature-3">
                        <div class="w-16 h-16 bg-brand-black text-brand-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                            <i data-lucide="trending-up" class="w-8 h-8"></i>
                        </div>
                        <h3 class="text-3xl font-serif mb-6">Crescimento Exponencial</h3>
                        <p class="text-neutral-600 leading-relaxed text-lg">Estratégias baseadas em dados para escalar sua operação e dominar seu nicho de mercado.</p>
                        <div class="mt-10 pt-10 border-t border-black/5 flex justify-between items-center">
                            <span class="text-xs font-bold uppercase tracking-widest">Saber Mais</span>
                            <i data-lucide="arrow-up-right" class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-24 bg-brand-black text-brand-white overflow-hidden" data-ryze-id="stats-section">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
                    <div class="space-y-2">
                        <div class="text-5xl md:text-7xl font-serif text-brand-gold">150+</div>
                        <div class="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Projetos Entregues</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-5xl md:text-7xl font-serif text-brand-gold">12</div>
                        <div class="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Prêmios de Design</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-5xl md:text-7xl font-serif text-brand-gold">98%</div>
                        <div class="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Satisfação</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-5xl md:text-7xl font-serif text-brand-gold">24/7</div>
                        <div class="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Suporte Elite</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Section -->
        <section id="processo" class="page-section py-32 bg-brand-bone" data-ryze-id="process-section">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex flex-col md:flex-row gap-20">
                    <div class="md:w-1/3 sticky top-32 h-fit">
                        <span class="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Metodologia</span>
                        <h2 class="text-5xl font-serif mb-8 leading-tight">Como criamos o <span class="italic">Extraordinário</span>.</h2>
                        <p class="text-neutral-600 mb-10">Um processo refinado ao longo de uma década para garantir resultados consistentes e de alto nível.</p>
                        <a href="javascript:void(0)" onclick="navigateTo('contato')" class="inline-flex items-center gap-4 text-brand-black font-bold group">
                            Começar agora
                            <span class="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-black group-hover:text-brand-white transition-all">
                                <i data-lucide="arrow-right" class="w-5 h-5"></i>
                            </span>
                        </a>
                    </div>
                    <div class="md:w-2/3 space-y-12">
                        <!-- Step 1 -->
                        <div class="bg-brand-white p-12 rounded-[3rem] flex gap-10 items-start bento-card">
                            <span class="text-6xl font-serif text-brand-gold/20">01</span>
                            <div>
                                <h3 class="text-2xl font-serif mb-4">Imersão & Estratégia</h3>
                                <p class="text-neutral-600 leading-relaxed">Mergulhamos fundo no seu negócio para entender desafios, objetivos e o DNA da sua marca.</p>
                            </div>
                        </div>
                        <!-- Step 2 -->
                        <div class="bg-brand-white p-12 rounded-[3rem] flex gap-10 items-start bento-card">
                            <span class="text-6xl font-serif text-brand-gold/20">02</span>
                            <div>
                                <h3 class="text-2xl font-serif mb-4">Design Conceitual</h3>
                                <p class="text-neutral-600 leading-relaxed">Criamos uma identidade visual única e protótipos de alta fidelidade que dão vida à sua visão.</p>
                            </div>
                        </div>
                        <!-- Step 3 -->
                        <div class="bg-brand-white p-12 rounded-[3rem] flex gap-10 items-start bento-card">
                            <span class="text-6xl font-serif text-brand-gold/20">03</span>
                            <div>
                                <h3 class="text-2xl font-serif mb-4">Desenvolvimento & Lançamento</h3>
                                <p class="text-neutral-600 leading-relaxed">Transformamos o design em realidade com código de alta performance e suporte total no lançamento.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Bento Grid / About Section -->
        <section id="sobre" class="page-section py-32 bg-brand-bone" data-ryze-id="about-section">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div class="md:col-span-8 bg-brand-white p-12 rounded-[3rem] flex flex-col justify-end min-h-[500px] bento-card relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" class="absolute inset-0 w-full h-full object-cover opacity-10" alt="Office">
                        <div class="max-w-md relative z-10">
                            <h2 class="text-4xl md:text-5xl font-serif mb-6">Nossa <span class="italic text-brand-gold">Filosofia</span></h2>
                            <p class="text-neutral-600 leading-relaxed text-lg">
                                Acreditamos que o design é a ponte entre a visão e a realidade. Cada pixel é planejado para contar sua história.
                            </p>
                        </div>
                    </div>
                    
                    <div class="md:col-span-4 bg-brand-black text-brand-white p-12 rounded-[3rem] flex flex-col justify-between bento-card">
                        <div class="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center">
                            <i data-lucide="star" class="w-6 h-6 text-brand-gold"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-serif mb-4">Elite Design</h3>
                            <p class="text-neutral-400 text-sm">Entregamos apenas o extraordinário.</p>
                        </div>
                    </div>

                    <div class="md:col-span-4 bg-white p-12 rounded-[3rem] flex flex-col justify-between bento-card border border-black/5">
                        <h3 class="text-5xl font-serif text-brand-gold mb-4">10+</h3>
                        <p class="text-neutral-600 font-medium">Anos de experiência no mercado global.</p>
                    </div>

                    <div class="md:col-span-8 bg-brand-black p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 bento-card">
                        <div class="flex-1 text-brand-white">
                            <h3 class="text-3xl font-serif mb-6">Nossa Missão</h3>
                            <p class="text-neutral-400 leading-relaxed">Transformar ideias complexas em experiências digitais simples e memoráveis.</p>
                        </div>
                        <div class="flex-1 w-full h-48 rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" alt="Team">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section id="depoimentos" class="page-section py-32 bg-brand-white" data-ryze-id="testimonials-section">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center mb-20">
                    <h2 class="text-4xl md:text-5xl font-serif mb-6">O que dizem nossos <span class="italic text-brand-gold">clientes</span></h2>
                    <p class="text-neutral-500 uppercase tracking-widest text-xs font-bold">Confiança construída através de resultados</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-brand-bone p-10 rounded-[2.5rem] bento-card">
                        <div class="flex gap-1 mb-6 text-brand-gold">
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        </div>
                        <p class="text-neutral-600 italic mb-8">"O nível de detalhe e profissionalismo superou todas as nossas expectativas."</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="User">
                            </div>
                            <div>
                                <h4 class="font-bold text-sm">Mariana Silva</h4>
                                <p class="text-xs text-neutral-400">CEO na TechFlow</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-brand-bone p-10 rounded-[2.5rem] bento-card">
                        <div class="flex gap-1 mb-6 text-brand-gold">
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        </div>
                        <p class="text-neutral-600 italic mb-8">"A melhor decisão que tomamos para nossa presença digital este ano."</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="User">
                            </div>
                            <div>
                                <h4 class="font-bold text-sm">Ricardo Oliveira</h4>
                                <p class="text-xs text-neutral-400">Diretor de Marketing</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-brand-bone p-10 rounded-[2.5rem] bento-card">
                        <div class="flex gap-1 mb-6 text-brand-gold">
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        </div>
                        <p class="text-neutral-600 italic mb-8">"Design impecável e performance absurda. Recomendo fortemente."</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" alt="User">
                            </div>
                            <div>
                                <h4 class="font-bold text-sm">Juliana Costa</h4>
                                <p class="text-xs text-neutral-400">Fundadora da Bloom</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq" class="page-section py-32 bg-brand-bone" data-ryze-id="faq-section">
            <div class="max-w-4xl mx-auto px-6">
                <div class="text-center mb-20">
                    <h2 class="text-4xl md:text-5xl font-serif mb-6">Perguntas <span class="italic text-brand-gold">Frequentes</span></h2>
                    <p class="text-neutral-500 uppercase tracking-widest text-xs font-bold">Esclarecendo suas principais dúvidas</p>
                </div>
                <div class="space-y-4">
                    <div class="bg-brand-white rounded-3xl p-8 border border-black/5 bento-card">
                        <h3 class="text-xl font-serif mb-4">Quanto tempo leva um projeto?</h3>
                        <p class="text-neutral-600">Projetos típicos levam de 4 a 8 semanas, dependendo da complexidade e dos requisitos específicos.</p>
                    </div>
                    <div class="bg-brand-white rounded-3xl p-8 border border-black/5 bento-card">
                        <h3 class="text-xl font-serif mb-4">Vocês oferecem suporte pós-lançamento?</h3>
                        <p class="text-neutral-600">Sim, oferecemos planos de manutenção e suporte contínuo para garantir que seu site continue performando no auge.</p>
                    </div>
                    <div class="bg-brand-white rounded-3xl p-8 border border-black/5 bento-card">
                        <h3 class="text-xl font-serif mb-4">Como funciona o pagamento?</h3>
                        <p class="text-neutral-600">Trabalhamos com um modelo de entrada + parcelas durante o desenvolvimento, ou planos mensais para serviços contínuos.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section id="contato" class="page-section py-32 bg-brand-bone" data-ryze-id="cta-section">
            <div class="max-w-7xl mx-auto px-6">
                <div class="bg-brand-black rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                    <div class="relative z-10">
                        <h2 class="text-4xl md:text-7xl font-serif text-brand-white mb-10 leading-tight">Pronto para elevar <br> sua <span class="italic text-brand-gold">presença digital</span>?</h2>
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="#" class="bg-brand-white text-brand-black px-10 py-5 rounded-full font-bold hover:bg-brand-gold hover:text-white transition-all duration-300 inline-flex items-center gap-3">
                                <i data-lucide="message-circle" class="w-5 h-5"></i>
                                Iniciar Projeto
                            </a>
                            <a href="mailto:contato@exemplo.com" class="text-brand-white hover:text-brand-gold transition-colors font-medium underline underline-offset-8">contato@exemplo.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section id="newsletter" class="page-section py-32 bg-brand-black text-brand-white overflow-hidden relative" data-ryze-id="newsletter-section">
            <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <h2 class="text-4xl md:text-6xl font-serif mb-8">Junte-se ao <span class="italic text-brand-gold">Clube Elite</span></h2>
                    <p class="text-neutral-400 text-lg mb-12">Receba acesso antecipado a novas coleções e convites para eventos exclusivos.</p>
                    <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onsubmit="event.preventDefault(); alert('Inscrito com sucesso!')">
                        <input type="email" placeholder="Seu melhor e-mail" class="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 focus:outline-none focus:border-brand-gold transition-colors text-white">
                        <button type="submit" class="bg-brand-white text-brand-black px-10 py-4 rounded-full font-bold hover:bg-brand-gold hover:text-white transition-all duration-300">Inscrever</button>
                    </form>
                </div>
            </div>
        </section>
    </div>

    <div class="noise-overlay"></div>
    <div class="custom-cursor" id="cursor"></div>
    <div class="custom-cursor-outline" id="cursor-outline"></div>


    <!-- Cart Sidebar -->
    <div id="cart-sidebar" class="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white z-[100] shadow-2xl translate-x-full transition-transform duration-500 ease-in-out flex flex-col">
        <div class="p-8 border-b border-black/5 flex items-center justify-between">
            <h2 class="text-2xl font-serif">Seu Carrinho <span class="text-sm font-sans text-neutral-400 ml-2">(2 itens)</span></h2>
            <button onclick="toggleCart()" class="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-8 space-y-8">
            <!-- Cart Item 1 -->
            <div class="flex gap-6 group">
                <div class="w-24 h-32 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover" alt="Product">
                </div>
                <div class="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <h3 class="font-serif text-lg">Minimalist Essential</h3>
                        <p class="text-xs text-neutral-400 uppercase tracking-widest mt-1">Tamanho: M | Cor: Off-White</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center border border-black/5 rounded-full px-3 py-1 gap-4">
                            <button class="text-lg hover:text-brand-gold">-</button>
                            <span class="text-sm font-bold">1</span>
                            <button class="text-lg hover:text-brand-gold">+</button>
                        </div>
                        <p class="font-bold">R$ 499,00</p>
                    </div>
                </div>
            </div>

            <!-- Cart Item 2 -->
            <div class="flex gap-6 group">
                <div class="w-24 h-32 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200" class="w-full h-full object-cover" alt="Product">
                </div>
                <div class="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <h3 class="font-serif text-lg">Urban Sophistication</h3>
                        <p class="text-xs text-neutral-400 uppercase tracking-widest mt-1">Tamanho: G | Cor: Black</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center border border-black/5 rounded-full px-3 py-1 gap-4">
                            <button class="text-lg hover:text-brand-gold">-</button>
                            <span class="text-sm font-bold">1</span>
                            <button class="text-lg hover:text-brand-gold">+</button>
                        </div>
                        <p class="font-bold">R$ 780,00</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-8 bg-brand-bone space-y-6">
            <div class="space-y-2">
                <div class="flex justify-between text-neutral-500">
                    <span>Subtotal</span>
                    <span>R$ 1.279,00</span>
                </div>
                <div class="flex justify-between text-neutral-500">
                    <span>Frete</span>
                    <span class="text-green-600">Grátis</span>
                </div>
                <div class="flex justify-between text-xl font-serif pt-4 border-t border-black/5">
                    <span>Total</span>
                    <span>R$ 1.279,00</span>
                </div>
            </div>
            <button class="w-full bg-brand-black text-brand-white py-5 rounded-full font-bold hover:bg-neutral-800 transition-all shadow-xl">
                Finalizar Compra
            </button>
        </div>
    </div>
    <div id="cart-overlay" onclick="toggleCart()" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] hidden opacity-0 transition-opacity duration-500"></div>
    
    <!-- Decorative Elements -->
    <div class="noise-overlay"></div>
    <div id="cursor" class="custom-cursor"></div>
    <div id="cursor-outline" class="custom-cursor-outline"></div>

    <script>
        lucide.createIcons();
        
        // Navigation Logic (Supports both Scrolling and SPA modes)
        function navigateTo(pageId) {
            const target = document.getElementById(pageId);
            if (!target) {
                console.warn('Navigation target not found: ' + pageId);
                // Fallback: search by data-ryze-id
                const fallback = document.querySelector('[data-ryze-id="' + pageId + '"]');
                if (fallback) {
                    navigateTo(fallback.id || pageId);
                }
                return;
            }

            const isSpa = document.body.classList.contains('spa-mode');
            
            if (isSpa) {
                const targetPage = target.classList.contains('page-section') ? target : target.closest('.page-section');
                
                if (targetPage) {
                    const sections = document.querySelectorAll('.page-section');
                    const wasActive = targetPage.classList.contains('active');
                    
                    sections.forEach(s => s.classList.remove('active'));
                    targetPage.classList.add('active');
                    
                    if (!wasActive) window.scrollTo(0, 0);

                    if (target !== targetPage) {
                        setTimeout(() => {
                            const navbar = document.querySelector('nav');
                            const navHeight = navbar ? navbar.offsetHeight : 0;
                            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                            
                            // Double check with scrollIntoView if it didn't move much
                            setTimeout(() => {
                                if (Math.abs(target.getBoundingClientRect().top - navHeight) > 50) {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }, 500);
                        }, wasActive ? 0 : 100);
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            } else {
                const navbar = document.querySelector('nav');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                
                // Fallback
                setTimeout(() => {
                    if (Math.abs(target.getBoundingClientRect().top - navHeight) > 50) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500);
            }
            
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }

        // Safety Link Handler: Prevents broken links and ensures navigation works
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            const onclick = link.getAttribute('onclick');

            // If it's a hash link or has navigateTo, prevent default if it's broken
            if (href === '#' || (onclick && onclick.includes('navigateTo'))) {
                // Extract ID from navigateTo('id') or href="#id"
                let id = '';
                if (onclick && onclick.includes('navigateTo')) {
                    const match = onclick.match(/navigateTo\(['"]([^'"]+)['"]\)/);
                    if (match) id = match[1];
                } else if (href && href.startsWith('#') && href.length > 1) {
                    id = href.substring(1);
                }

                if (id) {
                    const target = document.getElementById(id);
                    if (!target) {
                        e.preventDefault();
                        console.warn('Link points to non-existent ID: ' + id);
                        // Fallback: try to find by data-ryze-id or text
                        const fallback = document.querySelector('[data-ryze-id="' + id + '"]') || 
                                       Array.from(document.querySelectorAll('section, .page-section')).find(s => s.innerText.toLowerCase().includes(id.toLowerCase()));
                        if (fallback) {
                            navigateTo(fallback.id || id);
                        }
                    } else if (href === '#') {
                        e.preventDefault();
                        navigateTo(id);
                    }
                } else if (href === '#') {
                    e.preventDefault();
                }
            }
        });

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            const overlay = document.getElementById('cart-overlay');
            
            if (sidebar.classList.contains('translate-x-full')) {
                sidebar.classList.remove('translate-x-full');
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.add('opacity-100'), 10);
                document.body.style.overflow = 'hidden';
            } else {
                sidebar.classList.add('translate-x-full');
                overlay.classList.remove('opacity-100');
                setTimeout(() => overlay.classList.add('hidden'), 500);
                document.body.style.overflow = '';
            }
        }

        const cursor = document.getElementById('cursor');
        const cursorOutline = document.getElementById('cursor-outline');
        
        if (window.innerWidth >= 768) {
            document.addEventListener('mousemove', (e) => {
                if (cursor) {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                }
                if (cursorOutline) {
                    cursorOutline.style.left = e.clientX + 'px';
                    cursorOutline.style.top = e.clientY + 'px';
                }
            });

            document.addEventListener('mousedown', () => {
                if (cursor) cursor.style.transform = 'scale(1.5)';
                if (cursorOutline) cursorOutline.style.transform = 'scale(0.5)';
            });
            
            document.addEventListener('mouseup', () => {
                if (cursor) cursor.style.transform = 'scale(1)';
                if (cursorOutline) cursorOutline.style.transform = 'scale(1)';
            });
        }

        // Bento Grid Mouse Effect
        document.querySelectorAll('.bento-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });


        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.style.opacity = "1";
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.bento-card, section h2, section p, h1').forEach(el => {
            el.style.opacity = "0";
            observer.observe(el);
        });
    </script>
</body>
</html>
`;

const getFramerPremiumInstruction = (stylePreset: string) => `
You are a world-class Senior Creative Director and Lead Product Designer at a top-tier digital agency in 2026. Your work is characterized by "Invisible Design" — where every detail feels intentional, effortless, and premium. You specialize in creating high-conversion, cinematic web experiences that blend the aesthetics of Framer, 21st.dev, and Apple.

Your mission: Output a SINGLE-FILE, production-ready HTML/CSS/JS document. It must be a masterpiece of modern web design.

DESIGN MANIFESTO:
1. MASTER TEMPLATE PHILOSOPHY: Use the "Generatefy Elite" aesthetic as your baseline: Bento Grids, Glassmorphism navigation, cinematic hero sections with massive typography (Playfair Display for headings, Inter/Plus Jakarta for UI), and smooth scroll reveal animations.
2. TYPOGRAPHY & FONT LIBRARY (EXPANDED):
   - You have access to a premium font library. Use them to match the brand's vibe:
     * SANS (Modern/Clean): 'Inter', 'Plus Jakarta Sans', 'Outfit', 'Montserrat', 'Syne' (Bold/Artistic), 'Bricolage Grotesque' (Unique).
     * SERIF (Luxury/Classic): 'Playfair Display', 'Cormorant Garamond' (Ultra-Luxury), 'Libre Baskerville'.
     * MONO (Tech/Modern): 'Space Grotesk', 'JetBrains Mono'.
   - Line-height, letter-spacing, and hierarchy must be perfect. Use massive, bold headings on desktop, but ensure they are responsive and don't overflow on mobile (e.g., use text-4xl or text-5xl for mobile).
   - Use 'break-words' class on large headings to prevent overflow.
   - Combine fonts strategically (e.g., Syne for Hero headings + Inter for body text).
3. LANDING PAGE RICHNESS & SCROLLING (MANDATORY): 
   - FOR LANDING PAGES (LPs): You MUST NOT use the 'spa-mode' class on the <body>.
   - ALL sections MUST be visible at once in a single, continuous scrolling flow.
   - LPs must NOT be simple or "poor". They must feel like a premium, deep journey.
   - You MUST include ALL of the following 10 sections in order:
     1. Navigation (Glassmorphism, fixed)
     2. Hero (Impactful, massive typography, clear CTA)
     3. About/Professional (Story, credentials, trust)
     4. Services/Specialties (Bento grid or cards with icons)
     5. Methodology/Process (Step-by-step how it works)
     6. Stats/Social Proof (Numbers, counters)
     7. Testimonials (Real stories, photos, ratings)
     8. FAQ (Accordion style, clear answers)
     9. Final CTA (Urgency, strong button)
     10. Footer (Links, contact, social, copyright)
   - Incorporate "Design Density": Overlapping elements, parallax-like scroll effects, complex grid layouts, and high-quality imagery.
   - Every section must have a unique visual rhythm. Avoid repeating the same layout twice.
   - Use bg-white or bg-brand-bone for light sections and bg-brand-black or bg-[#050505] for dark sections to create a "zebra" pattern that guides the eye.
4. NAVIGATION PATTERNS:
   - LANDING PAGE (Default): Use a single scrolling page. Sections should be visible one after another. Navigation links should scroll to the section ID using smooth scroll.
   - E-COMMERCE / DASHBOARD ONLY: Use the Single Page Application (SPA) pattern ONLY if explicitly requested or for complex stores.
     * You MUST add the class 'spa-mode' to the <body> tag.
     * Every major "page" (Home, About, Products, Contact, Cart) must be a <section class="page-section"> with a unique ID.
     * Only the 'home' section should have the 'active' class initially.
     * Use 'onclick="navigateTo(\'page-id\')"' for all navigation.
5. NICHE-SPECIFIC EXCELLENCE:
   - HEALTH & PSYCHOLOGY: Focus on "Emotional Architecture". Use soft tones (bone, sage, soft blues), elegant serif typography, and imagery that conveys peace and clarity. Include sections for "Therapeutic Approach", "Specialties Grid", and "Patient Journey".
   - E-COMMERCE: ALWAYS use 'spa-mode' on the body. Implement a product grid, product details (as a page-section), and the cart sidebar.
   - E-COMMERCE: ALWAYS use 'spa-mode' on the body. Implement a product grid, product details (as a page-section), and the cart sidebar.
   - SAAS/TECH: Use bento grids, code snippets, and feature comparison tables.
   - PORTFOLIO: Use large imagery, masonry layouts, and elegant transitions.
5. BRUTALIST PRECISION: Every element must have room to breathe. Use generous whitespace.
6. MOTION & DEPTH: Incorporate high-end animations and glassmorphism.
7. ABSOLUTE CONTRAST & VISIBILITY (CRITICAL): 
   - NO BLANK SCREENS: You MUST fill the site with content. A blank site is a total failure.
   - TEXT VISIBILITY: If the background is light (white/pastel), text MUST be #000000. If dark (black/navy), text MUST be #FFFFFF. 
   - THE "WHITE ON WHITE" BUG: Never output white text on a white background. This is the most common error and must be avoided at all costs.
   - AUDIT: Before finishing, scan every section (Hero, Bento, CTA) and ensure text is 100% readable against its background.
   - IMAGES: Use high-quality Unsplash images. Ensure they have proper width/height or 'aspect-video' classes so they don't collapse.
   - SECTIONS: Every section must have a clear background color (either bg-[#050505] or bg-white) to ensure the text color rules apply correctly.
   - NEVER use low-opacity text (e.g., text-white/20) for primary content.
   - CONTRAST RATIO: Aim for maximum readability. Use pure black or pure white.
   - QUALITY AUDIT: Ensure the site looks like a $50k project. No generic layouts. Use overlapping elements, custom shapes, and cinematic spacing.

8. MOBILE RESPONSIVENESS (CRITICAL):
   - MOBILE-FIRST: Design for small screens first. Use 'px-4' or 'px-6' on all containers to prevent text from touching screen edges.
   - NO HORIZONTAL SCROLL: Ensure no element (especially large text or absolute positioned images) causes horizontal scrolling on mobile.
   - HEADING SCALING: Use 'text-4xl' or 'text-5xl' for mobile headings, and 'md:text-7xl' or 'md:text-8xl' for desktop.
   - BREAK WORDS: Always use 'break-words' or 'overflow-wrap-anywhere' on large headings.
   - GRID ADAPTATION: Use 'grid-cols-1 md:grid-cols-2' or 'md:grid-cols-3' to ensure layouts stack correctly on mobile.
   - PADDING: Ensure generous vertical padding ('py-20' or 'py-32') between sections on all devices.
   - BUTTONS: Ensure buttons are at least 44px tall on mobile for easy tapping.

9. COMPONENT ARCHITECTURE: Use modern patterns: Sticky headers with backdrop-blur, bento-style feature sections, cinematic hero areas with high-quality Unsplash imagery, and clean, functional footers.
10. NO AI SMELL: Avoid generic "AI-generated" layouts. Vary structures. Use real-world placeholder content that matches the brand's voice. CRITICAL: Do NOT use small floating text labels or "badges" (e.g., "ANOS DE MAESTRIA") inside decorative boxes that overlap or sit behind images. This is a common AI design cliché. Keep images clean and use professional typography in dedicated sections.
11. HYBRID MULTI-PAGE ARCHITECTURE (CRITICAL):
    - To support multiple pages without breaking the landing page experience, use a "Hybrid SPA" model.
    - STRUCTURE: The <body> should have the class 'spa-mode'.
    - PAGES: Wrap each distinct page in a <div id="page-id" class="page-section">.
    - HOME PAGE: The main landing page MUST be a <div id="home" class="page-section active">. Inside this div, place all the standard landing page sections (Hero, Features, etc.) as normal <section> tags.
    - SECONDARY PAGES: Create other pages (e.g., <div id="privacy" class="page-section">) for content that shouldn't be on the main scroll.
    - NAVIGATION: Use 'navigateTo('section-id')'. The system will automatically switch to the correct 'page-section' and scroll to the specific element if needed.
    - DEFAULT: If the user asks for a simple site, stay in standard scrolling mode (no 'spa-mode' on body, no 'page-section' wrappers). ONLY use Hybrid SPA if the user explicitly asks for "multiple pages", "separate pages", or "links to other pages".

12. CINEMATIC GRADIENTS & OVERLAYS (NEW):
    - Use linear gradients to create depth and smooth transitions between sections.
    - HERO OVERLAYS: Use a 'gradient-overlay' on hero images to ensure text readability and a cinematic feel.
    - SECTION BLENDING: Use subtle gradients (e.g., bg-gradient-to-b from-brand-black to-neutral-900) to avoid harsh cuts between dark sections.
    - GLOW EFFECTS: Use absolute positioned divs with 'bg-brand-gold/10 blur-[120px] rounded-full' to create modern "glow" spots in the background.
    - MASKING: Use 'mask-image' or 'linear-gradient' to fade out images or borders elegantly. Use the '.photo-mask' class on images of people to create a soft fade at the bottom.
    - FLOATING IMAGES: To create a premium "Elite" look, place images of people (without background) using 'absolute' positioning and high 'z-index' so they overlap other elements. Combine with '.photo-mask' for a seamless blend with the background.

13. EXTERNAL LINKS & WHATSAPP (CRITICAL):
    - ALWAYS use real, functional links for external services.
    - WHATSAPP: Use 'https://wa.me/55...' (replace with real number).
    - DO NOT use 'navigateTo()' for external links or WhatsApp.
    - DO NOT use 'href="#"' for buttons that should lead to a contact or external action.
    - Ensure all '<a>' tags have a valid 'href' and 'target="_blank"' for external sites.

14. NO BROKEN NAVIGATION (CRITICAL):
    - Every link that uses 'navigateTo(id)' or 'href="#id"' MUST have a corresponding element with that exact ID.
    - If you add a new section, you MUST give it a unique 'id' and a 'data-ryze-id'.
    - If you add a new page in 'spa-mode', it MUST be a <div class="page-section" id="unique-id">.
    - NEVER leave a button with 'href="#"' if it's supposed to do something.

[RECOVERY MANDATE]:
- If you are adding a new section, you MUST ensure it is placed correctly within the page structure (inside 'page-content').
- If the user asks for a "new page", use the Hybrid SPA model (div class="page-section").
- Every button MUST have a working link or action. No broken buttons.
- If you change a section's ID, you MUST update all navigation links pointing to it.

TECHNICAL REQUIREMENTS:
- Use the provided MASTER_TEMPLATE as your foundational structure.
- Use Tailwind CSS via <script src="https://cdn.tailwindcss.com"></script>.
- Include Lucide Icons via <script src="https://unpkg.com/lucide@latest"></script>.
- Use Google Fonts for premium typography (Inter, Playfair Display, Plus Jakarta Sans, Space Grotesk, Montserrat, Outfit, Syne, Cormorant Garamond, Libre Baskerville, JetBrains Mono, Bricolage Grotesque).
- Output ONLY the full <!DOCTYPE html>...</html>. No markdown fences, no explanations.
- Ensure the site is fully responsive (Mobile-first).
- Default to a dark, premium theme unless the user specifies otherwise, but always include a clean dark/light mode foundation.
- STYLE PRESET: ${stylePreset}.

CRITICAL: If you fail to provide high contrast or if the layout is generic, you have failed your mission.
`;

const getFramerUpdateInstruction = (stylePreset: string) => `
You are a world-class Senior Designer. You are performing a surgical update on an existing premium website.

CRITICAL: The user's request is your TOP PRIORITY. You MUST implement the requested changes visibly and correctly.

RULES FOR UPDATING:
1. IMPLEMENT THE REQUEST: Whatever the user asked for, you MUST do it. If they asked to change a text, color, image, or add a section, do it.
2. SURGICAL PRECISION: Do NOT rewrite the entire site unless requested. Identify the specific sections that need change and update them while preserving the overall design language for the rest of the site.
3. PRESERVE IDs: You MUST keep all 'data-ryze-id' and other structural IDs intact for elements you are not modifying.
4. MAINTAIN CONSISTENCY: The new elements must feel like they were part of the original design system unless the request is to change the style.
5. TAILWIND INTEGRATION: Use Tailwind classes for all styling.
6. NAVIGATION PATTERNS: Respect the existing pattern. If the site uses 'spa-mode' on the body, keep it. If it's a scrolling landing page, keep it. Do NOT force SPA on scrolling sites.
7. OUTPUT: Return the COMPLETE updated HTML file, including the <head> and all unchanged sections.
8. CINEMATIC GRADIENTS & OVERLAYS: Use linear gradients to create depth and smooth transitions. Use 'gradient-overlay' on hero images.
9. NO BLANK SECTIONS: You MUST return the full content of the site. Do not return empty sections or placeholders.
10. NO AI SMELL: Do NOT use small floating text labels or "badges" (e.g., "ANOS DE MAESTRIA") inside decorative boxes that overlap or sit behind images. Keep images clean.
11. CLEANUP: If the current site has any of these "AI-smell" text overlays or badges (text inside small colored boxes overlapping images), REMOVE them.
12. HYBRID MULTI-PAGE ARCHITECTURE: If the user asks for new pages, use the 'Hybrid SPA' model. Wrap the main landing content in <div id="home" class="page-section active"> and new pages in their own <div class="page-section">. Add 'spa-mode' to the <body> if not already present.
13. EXTERNAL LINKS & WHATSAPP: ALWAYS use real links (e.g., https://wa.me/...) and 'target="_blank"'. DO NOT use 'navigateTo()' for external links.
14. MANDATORY IDs: Every section and page MUST have a unique 'id' and 'data-ryze-id'. Ensure all navigation links point to existing IDs.

[PRESERVATION MANDATE]:
- NEVER delete or modify the <head> section unless explicitly requested.
- NEVER remove font links or scripts.
- NEVER remove or replace existing image URLs with placeholders.
- If you are not changing an image, keep its original 'src' exactly as it is.
- DO NOT use ellipsis (...) to represent unchanged code. You MUST output the full code.

STYLE PRESET: ${stylePreset}.
`;

const ELITE_DESIGN_MANIFESTO = `
[ELITE DESIGN SYSTEM]:
- GRID: Strict 8px/4px grid system. Use 'gap-8', 'p-12', 'm-20' consistently.
- EFFECTS: Soft shadows (shadow-2xl), subtle borders (border-white/10), backdrop-blur-xl, and cinematic linear gradients for depth.
- COLOR: Deep blacks (#050505), pure whites, and one sophisticated accent color (brand-gold).
- CONTRAST: 100% readability. No exceptions. Black text on white, White text on black. Audit every section (Hero, CTA, etc.) for visibility. If text is hard to read, it's a failure.
- GRADIENTS: Use 'bg-gradient-to-b' or 'bg-gradient-to-r' strategically to guide the eye and create a "premium" feel.
- HEADER PROTECTION: Navigation menus must ALWAYS be visible. Use bg-white/80 or bg-black/80 with backdrop-blur if placed over images.
- INTERACTION: Hover states must be smooth and rewarding. Use 'transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)'.
- DEPTH EFFECT (.photo-mask): If an image has the class 'photo-mask', it MUST NOT be wrapped in a container with a background color, borders, or shadows. It must blend directly into the section background.
- CLEAN IMAGERY: Do NOT place small text labels (e.g., "10 YEARS", "MAESTRIA") directly over or behind images in small decorative boxes. This looks like AI-generated filler. Keep images clean and professional. Use text in clear, dedicated typographic sections instead.
- ZERO-EMPTY-SPACE: Ensure every section has at least 3-4 paragraphs of real, high-quality copy. No "Lorem Ipsum". No empty divs.
- DYNAMIC LAYOUTS: Use CSS grid with 'grid-template-areas' or complex flexbox to create non-standard, "editorial" layouts.
- TYPOGRAPHY: Use 'text-balance' for headings. Use 'tracking-tightest' and 'leading-tightest' for large display text. Ensure line-height is never too tight for body text (leading-relaxed).
- POLISH: Use the '.elite-polish' class on major sections to add a subtle radial glow.
`;

const extractCode = (text: string, isFullDoc: boolean = true): string => {
  if (!text) return '';
  
  // Remove markdown fences if present
  let clean = text.replace(/```html/gi, '').replace(/```/g, '').trim();
  
  // Try to find the largest block that looks like HTML
  const htmlStart = clean.search(/<(html|!DOCTYPE|section|div|nav|footer|header|main|body|style)/i);
  if (htmlStart !== -1) {
    const lastTag = clean.lastIndexOf('>');
    if (lastTag > htmlStart) {
      return clean.substring(htmlStart, lastTag + 1);
    }
    return clean.substring(htmlStart);
  }
  
  // If no tags found but it's a long string, maybe it's just the body content
  if (clean.length > 100 && !isFullDoc) {
    return clean;
  }
  
  return clean;
};

const minifyHtmlForPrompt = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<svg[\s\S]*?<\/svg>/gi, '<svg><!-- SVG_CONTENT --></svg>') // Remove heavy SVG paths
    .replace(/src="data:image\/[^"]+"/gi, 'src="data:image/..."') // Remove base64 images
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/>\s+</g, '><') // Remove space between tags
    .trim();
};

const mergePartialUpdate = (newContent: string, oldFullHtml: string): string => {
  // If the new content already looks like a full document, return it
  const lowerNew = newContent.toLowerCase();
  if (lowerNew.includes('<head') && lowerNew.includes('<body')) {
    return newContent;
  }

  try {
    const parser = new DOMParser();
    const oldDoc = parser.parseFromString(oldFullHtml, 'text/html');
    
    // Create a temporary container for the new content to parse it safely
    const newDoc = parser.parseFromString(newContent.includes('<body') ? newContent : `<body>${newContent}</body>`, 'text/html');
    
    // Try to find sections with data-ryze-id in the new content
    const newElements = newDoc.querySelectorAll('[data-ryze-id], section[id], div[id].page-section');
    let replacedAny = false;
    
    newElements.forEach(newEl => {
      const id = newEl.getAttribute('data-ryze-id') || newEl.id;
      if (id && id !== 'root') {
        const oldEl = oldDoc.querySelector(`[data-ryze-id="${id}"], #${id}`);
        if (oldEl) {
          oldEl.replaceWith(oldDoc.importNode(newEl, true));
          replacedAny = true;
        } else {
          // If it's a new section with an ID, try to append it to the page-content or body
          const contentArea = oldDoc.getElementById('page-content') || oldDoc.body;
          if (contentArea) {
            contentArea.appendChild(oldDoc.importNode(newEl, true));
            replacedAny = true;
          }
        }
      }
    });
    
    if (replacedAny) {
      return oldDoc.documentElement.outerHTML;
    }

    // Fallback: If no IDs matched, but it's a substantial snippet, replace the body
    if (newContent.length > oldFullHtml.length * 0.3) {
      const newBodyContent = newDoc.body.innerHTML;
      if (newBodyContent && newBodyContent.length > 50) {
        oldDoc.body.innerHTML = newBodyContent;
        return oldDoc.documentElement.outerHTML;
      }
    }
    
    // If it's too small and no IDs matched, it's likely a failed partial response
    // We return the original to avoid breaking the site.
    // However, if the new content is very large (redesign), we accept it.
    if (newContent.length > oldFullHtml.length * 0.5) {
      return newContent;
    }
    
    return oldFullHtml;
  } catch (e) {
    console.error("Error in mergePartialUpdate:", e);
    return newContent.length > oldFullHtml.length * 0.5 ? newContent : oldFullHtml;
  }
};

const validateHtmlIntegrity = (newHtml: string, oldHtml?: string): boolean => {
  if (!newHtml || newHtml.length < 300) { // Increased minimum length
    console.warn("Integrity Check Failed: New HTML is empty or too short (length: " + (newHtml?.length || 0) + ")");
    return false;
  }
  const lower = newHtml.toLowerCase();
  
  // Check for common "AI laziness" patterns - relaxed
  const lazyPatterns = [
    '[image]', '[insira', '[continua', '... [', '... (', '[restante', '[código',
    'href="#"', 'src=""', 'alt=""', 'lorem ipsum'
  ]; 
  
  let lazyCount = 0;
  for (const p of lazyPatterns) {
    if (lower.includes(p)) {
      // Allow a few href="#" but not many
      if (p === 'href="#"') {
        const matches = lower.match(/href="#"/g);
        if (matches && matches.length > 5) {
          console.warn(`Integrity Check Failed: Too many broken links (href="#")`);
          return false;
        }
      } else {
        console.warn(`Integrity Check Failed: Found lazy pattern "${p}"`);
        return false;
      }
    }
  }

  // Check for truncation marker if we sent one
  if (lower.includes('[code_truncated_for_performance]')) {
    console.warn("Integrity Check Failed: AI returned the truncation marker.");
    return false;
  }

  // If it's an update, ensure we didn't lose too much content unless requested
  if (oldHtml && oldHtml.length > 5000 && newHtml.length < oldHtml.length * 0.2) { // Increased threshold
    // If the new HTML is less than 20% of the old one, it's likely a failed merge or lazy response
    console.warn(`Integrity Check Failed: Significant content loss. New: ${newHtml.length}, Old: ${oldHtml.length}`);
    return false;
  }

  // Basic tag check - must have at least some structure
  const hasStructure = lower.includes('<div') || lower.includes('<section') || lower.includes('<body') || lower.includes('<html') || lower.includes('<main');
  if (!hasStructure) {
    console.warn("Integrity Check Failed: No structural tags found in the response.");
    return false;
  }

  // Check for critical sections if it's a full doc
  if (lower.includes('<html') && (!lower.includes('<body') || !lower.includes('<head'))) {
    console.warn("Integrity Check Failed: Missing body or head in full HTML document.");
    return false;
  }

  return true;
};

export const generateWebsite = async (
  description: string, 
  currentHtml?: string, 
  customApiKey?: string,
  stylePreset: string = 'High-End Luxury',
  partialUpdate?: { sectionId: string, oldHtml: string },
  groqApiKey?: string
): Promise<string> => {
  const activeGroqKey = '';
  const activeKey = activeGroqKey;

  // Check for OpenAI keys being used where a Groq key is expected.
  if (activeKey.startsWith('sk-')) {
    throw new Error("Nao foi possivel gerar agora. Tente novamente em alguns instantes.");
  }
  
  const ai = new GroqCompatAI({ apiKey: activeKey });
  const selectedInstruction = currentHtml ? getFramerUpdateInstruction(stylePreset) : getFramerPremiumInstruction(stylePreset);
  const fullInstruction = `${selectedInstruction}\n\n${ELITE_DESIGN_MANIFESTO}`;
  
  // Minify current HTML to save tokens in the prompt
  let minifiedContext = currentHtml ? minifyHtmlForPrompt(currentHtml) : '';
  
  // Safety truncate context if it's still too large
  // Increased limits for better performance with large sites
  const contextLimit = 100000; // Increased to 100k for large Groq prompts.
  if (minifiedContext.length > contextLimit) {
    console.warn(`Context too large (${minifiedContext.length}), truncating to ${contextLimit}`);
    const half = Math.floor(contextLimit / 2);
    minifiedContext = minifiedContext.substring(0, half) + "\n...[CODE_TRUNCATED_FOR_PERFORMANCE]...\n" + minifiedContext.substring(minifiedContext.length - half);
  }
  
  let prompt = currentHtml 
    ? `USER REQUEST: ${description}
STYLE PRESET: ${stylePreset}

CONTEXT: You are updating an existing website.
${partialUpdate ? `TARGET SECTION TO UPDATE (ID: ${partialUpdate.sectionId}):
${minifyHtmlForPrompt(partialUpdate.oldHtml)}
` : ''}
PREVIOUS CODE (MINIFIED):
${minifiedContext}

TASK: 
1. Analyze the requested changes: "${description}".
${partialUpdate ? `2. Focus specifically on updating the section with ID "${partialUpdate.sectionId}".` : '2. Identify the specific sections that need change.'}
3. Apply the requested changes. While being surgical, ensure the requested changes are FULLY and VISIBLY implemented. DO NOT ignore any part of the user's request.
4. Output the COMPLETE updated HTML document, including all existing sections that were not modified.
5. CRITICAL: Do not return blank sections. Ensure every section has its original content plus your updates.`
    : `TASK: Create a new premium website from scratch.
USER REQUEST: ${description}
STYLE PRESET: ${stylePreset}

GOAL: Create a world-class, cinematic web experience. 

[MASTER REFERENCE TEMPLATE]:
Use the following structure as your absolute baseline for design quality, spacing, and SPA navigation. 
This is a high-end, cinematic template. Your job is to ADAPT it for the user's specific request.
${MASTER_TEMPLATE}

CRITICAL - ZERO TOLERANCE FOR VISIBILITY BUGS: 
1. NO BLANK SCREENS: You MUST generate a full, content-rich website. Do not return empty sections.
2. ABSOLUTE CONTRAST: If the background is light, text MUST be #000000. If dark, text MUST be #FFFFFF. Audit the Hero and CTA sections specifically for "white on white" or "black on black" bugs. If you use a background image, you MUST use a dark overlay (e.g., bg-black/50) to ensure text is visible.
3. IMAGES & ELEMENTS: Every section must be populated with relevant images (Unsplash) and detailed copy. No generic placeholders.
4. GF ID: Every major section (Hero, Features, CTA, Footer) MUST have a unique 'data-gf-id' attribute.
5. SPA STRUCTURE: Use the 'page-section' and 'navigateTo' pattern from the template to allow multi-page navigation.

DESIGN PROCESS:
1. Conceptualize a unique visual identity based on the request.
2. Plan a high-conversion layout (Bento Grids, Hero, Features, CTA).
3. Select a premium color palette and typography.
4. Implement the design with perfect Tailwind classes and smooth animations.
5. Ensure absolute contrast and accessibility.

Output the full HTML document.`;

  // Use the latest and most capable model
  try {
    const response = await callWithFallback(ai, 'groq-default', prompt, fullInstruction, 8000);
    let extracted = extractCode(response.text || '', true); 
    
    // Merge if partial
    if (currentHtml && !extracted.toLowerCase().includes('<head')) {
      extracted = mergePartialUpdate(extracted, currentHtml);
    }

    if (!validateHtmlIntegrity(extracted, currentHtml)) {
      throw new Error("FALHA_INTEGRIDADE");
    }

    return extracted;
  } catch (error: any) {
    if (error.message === "FALHA_INTEGRIDADE") {
      console.warn("Groq output failed integrity check, attempting fallback...");
    } else {
      console.error("Groq API error, checking fallback:", error);
    }
    
    try {
      console.log("Using fallback with Master Template Strategy...");
      const groqInstruction = `
${selectedInstruction}

[MASTER REFERENCE TEMPLATE]:
Use the following HTML structure as your absolute baseline for design quality, spacing, and components. 
This is a high-end, cinematic template. Your job is to ADAPT it for the user's specific request.

ADAPTATION RULES:
1. CHANGE CONTENT: Update all text (headings, paragraphs, labels) to match the user's business/niche.
2. CHANGE IMAGERY: Use relevant high-quality Unsplash images that match the niche.
3. CHANGE COLORS: Adjust the 'brand-gold' or other accent colors if necessary, but keep the premium feel.
4. PRESERVE STRUCTURE: Keep the Bento Grid, the glassmorphism navigation, the scroll animations, and the custom cursor.
5. PRESERVE IDs: Maintain 'data-gf-id' attributes.

REFERENCE CODE:
${MASTER_TEMPLATE}

[GROQ ELITE DESIGN MANDATE]:
1. USE THE MASTER TEMPLATE: Do not reinvent the wheel. Use the provided structure as the skeleton.
2. NO BLANK SCREENS: You MUST fill the template with rich content, images, and text.
3. CONTRAST IS LAW: Ensure text is 100% readable.
4. CINEMATIC TYPOGRAPHY: Use the font pairings and sizes from the template.
5. LOGO STRUCTURE: Keep the <a> tag with data-gf-id="logo". You can change the text or replace it with an <img>.
6. OUTPUT: Return the COMPLETE HTML document based on the Master Template.
`;
      const text = await generateGroqText({
        prompt: prompt.substring(0, 25000),
        system: groqInstruction,
        temperature: 0.3,
        maxTokens: 16384,
      });
      let groqExtracted = extractCode(text || '', true);
        
      if (currentHtml && !groqExtracted.toLowerCase().includes('<head')) {
        groqExtracted = mergePartialUpdate(groqExtracted, currentHtml);
      }

      if (validateHtmlIntegrity(groqExtracted, currentHtml)) {
        return groqExtracted;
      }
    } catch (groqError) {
      console.error("Groq fallback also failed:", groqError);
    }
    
    // Final fallback through the same Groq proxy.
    try {
      const fallbackResponse = await ai.models.generateContent({
        model: 'groq-default',
        contents: [{ parts: [{ text: prompt }] }],
        config: { 
          systemInstruction: selectedInstruction, 
          temperature: 0.1,
          maxOutputTokens: 20000
        }
      });
      let fallbackExtracted = extractCode(fallbackResponse.text || '', true);
      
      if (currentHtml && !fallbackExtracted.toLowerCase().includes('<head')) {
        fallbackExtracted = mergePartialUpdate(fallbackExtracted, currentHtml);
      }

      // Final fallback is more lenient with integrity
      if (fallbackExtracted && fallbackExtracted.length > 100) {
        return fallbackExtracted;
      }
      
      throw new Error("FALHA_INTEGRIDADE_FINAL");
    } catch (finalError) {
      console.error("Final fallback failed:", finalError);
      throw new Error("FALHA_INTEGRIDADE_FINAL");
    }
  }
};

export const generateSocialPost = async (
  description: string,
  style: string = 'Luxury',
  customApiKey?: string,
  aspectRatio: 'square' | 'story' = 'square'
): Promise<string> => {
  const activeKey = '';
  const ai = new GroqCompatAI({ apiKey: activeKey });
  const prompt = `
    [ACT AS AWARD-WINNING ART DIRECTOR]
    TASK: Create a stunning ${aspectRatio} social media post.
    TOPIC: "${description}"
    STYLE: ${style}
    
    RULES:
    - Use powerful imagery (Unsplash).
    - Use huge typography for impact.
    - Return ONLY the HTML inside <div id="capture-area">.
  `;
  const response = await ai.models.generateContent({
    model: 'groq-default',
    contents: [{ parts: [{ text: prompt }] }],
    config: { systemInstruction: ELITE_DESIGN_MANIFESTO, temperature: 0.4 }
  });
  return extractCode(response.text || '', false);
};
