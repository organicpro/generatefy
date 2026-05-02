export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  html: string;
  featured?: boolean;
}

export const TEMPLATES: Template[] = [
  {
    id: 'elite-specialist',
    name: 'Elite Specialist',
    category: 'Especialista',
    featured: true,
    description: 'Landing page premium com efeito de profundidade, foto flutuante e design de alto nível.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #050505; color: white; }
        .text-glow { text-shadow: 0 0 30px rgba(255,255,255,0.1); }
        .bg-mesh {
            background-image: 
                radial-gradient(at 0% 0%, rgba(242, 125, 38, 0.05) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(0, 255, 255, 0.05) 0px, transparent 50%);
        }
        .photo-mask {
            mask-image: linear-gradient(to bottom, black 60%, transparent 95%);
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 95%);
        }
    </style>
</head>
<body class="antialiased overflow-x-hidden bg-mesh">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="text-xl font-black tracking-tighter uppercase">GENERATEFY <span class="text-primary italic">STUDIO</span></div>
            <div class="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                <a href="#" class="hover:text-white transition-colors">Início</a>
                <a href="#" class="hover:text-white transition-colors">Metodologia</a>
                <a href="#" class="hover:text-white transition-colors">Resultados</a>
            </div>
            <button class="bg-white text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all active:scale-95">Agendar Mentoria</button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div class="space-y-10">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    <span class="text-[10px] font-black uppercase tracking-widest text-neutral-400">Vagas limitadas para Abril</span>
                </div>
                <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-glow">
                    TRANSFORME <br/> SEU <span class="text-primary italic">LEGADO</span> EM <br/> AUTORIDADE.
                </h1>
                <p class="text-lg text-neutral-500 max-w-md leading-relaxed font-medium">
                    O método definitivo para especialistas que desejam escalar seu faturamento através de um posicionamento de elite no digital.
                </p>
                <div class="flex flex-col sm:flex-row gap-6 pt-4">
                    <button class="bg-primary text-background px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">Quero ser um Especialista de Elite</button>
                    <div class="flex items-center gap-4">
                        <div class="flex -space-x-3">
                            <img src="https://i.pravatar.cc/100?u=1" class="w-12 h-12 rounded-full border-4 border-[#050505]" />
                            <img src="https://i.pravatar.cc/100?u=2" class="w-12 h-12 rounded-full border-4 border-[#050505]" />
                            <img src="https://i.pravatar.cc/100?u=3" class="w-12 h-12 rounded-full border-4 border-[#050505]" />
                        </div>
                        <div class="text-[10px] font-black uppercase tracking-widest text-neutral-600">+500 mentorados</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Image Container -->
        <div class="absolute bottom-0 right-0 w-full lg:w-1/2 h-full pointer-events-none z-20 flex items-end justify-center lg:justify-end pr-0 lg:pr-20">
            <div class="relative w-full h-[80%] md:h-[90%] max-w-2xl">
                <!-- Background Glow -->
                <div class="absolute inset-0 bg-primary/20 blur-[120px] rounded-full translate-y-20"></div>
                
                <!-- The Person - Absolute Positioned -->
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                    alt="Especialista"
                    class="absolute bottom-0 right-0 w-full h-full object-contain object-bottom photo-mask filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
            </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-30"></div>
    </section>

    <!-- Social Proof -->
    <section class="py-20 border-y border-white/5 bg-white/[0.02]">
        <div class="max-w-7xl mx-auto px-8">
            <div class="flex flex-wrap justify-between items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <div class="text-2xl font-black tracking-tighter">FORBES</div>
                <div class="text-2xl font-black tracking-tighter">EXAME</div>
                <div class="text-2xl font-black tracking-tighter">INFOMONEY</div>
                <div class="text-2xl font-black tracking-tighter">VALOR</div>
                <div class="text-2xl font-black tracking-tighter">G1</div>
            </div>
        </div>
    </section>
</body>
</html>
    `
  },
  {
    id: 'psychologist-elite',
    name: 'Serenity Mind',
    category: 'Psicologia',
    featured: true,
    description: 'Landing page completa e sofisticada para psicólogos, com seções de sobre, serviços, depoimentos e FAQ.',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .bg-warm { background-color: #FDFCF8; }
        .text-sage { color: #5A6355; }
        .bg-sage { background-color: #5A6355; }
        .border-sage { border-color: #5A6355; }
    </style>
</head>
<body class="bg-warm text-stone-800 antialiased overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-warm/80 backdrop-blur-md border-b border-sage/10">
        <div class="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
            <div class="serif text-2xl font-medium tracking-tight text-sage italic">Dra. Helena Mendes</div>
            <div class="hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-bold text-stone-500">
                <a href="#inicio" class="hover:text-sage transition-colors">Início</a>
                <a href="#sobre" class="hover:text-sage transition-colors">Sobre</a>
                <a href="#servicos" class="hover:text-sage transition-colors">Serviços</a>
                <a href="#depoimentos" class="hover:text-sage transition-colors">Depoimentos</a>
                <a href="#contato" class="hover:text-sage transition-colors">Contato</a>
            <button class="bg-sage text-white px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow-lg shadow-sage/20">Agendar Consulta</button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="inicio" class="pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div class="space-y-8 text-center lg:text-left">
                <div class="inline-block px-4 py-1.5 border border-sage/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-sage font-bold">Psicoterapia Individual & Casal</div>
                <h1 class="serif text-4xl md:text-7xl lg:text-8xl leading-[0.9] text-stone-900 break-words">Encontre o seu <span class="italic text-sage">equilíbrio</span> interno.</h1>
                <p class="text-base md:text-lg text-stone-500 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">Um espaço seguro e acolhedor para explorar sua jornada de autoconhecimento, superação e saúde mental duradoura.</p>
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                    <button class="w-full sm:w-auto bg-sage text-white px-8 py-4 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-xl shadow-sage/30">Começar Jornada</button>
                    <div class="flex items-center gap-3">
                        <div class="flex -space-x-3">
                            <img src="https://i.pravatar.cc/100?u=1" class="w-10 h-10 rounded-full border-2 border-warm" />
                            <img src="https://i.pravatar.cc/100?u=2" class="w-10 h-10 rounded-full border-2 border-warm" />
                            <img src="https://i.pravatar.cc/100?u=3" class="w-10 h-10 rounded-full border-2 border-warm" />
                        </div>
                        <span class="text-[10px] font-bold text-sage uppercase tracking-widest">+500 Vidas Transformadas</span>
                    </div>
                </div>
            </div>
            <div class="relative mt-12 lg:mt-0">
                <div class="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-10 -left-5 lg:-left-10 bg-white p-6 lg:p-8 rounded-3xl shadow-2xl max-w-[200px] lg:max-w-[240px] -rotate-3">
                    <div class="serif text-4xl text-sage italic mb-2">"</div>
                    <p class="text-sm italic text-stone-600 leading-relaxed">A jornada de mil milhas começa com um único passo em direção a si mesmo.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="sobre" class="bg-white py-32 px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div class="order-2 lg:order-1">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-4 pt-0 lg:pt-12">
                        <img src="https://images.unsplash.com/photo-1516534775068-ba3e84529519?auto=format&fit=crop&q=80&w=600" class="rounded-3xl shadow-lg w-full" />
                        <div class="bg-sage p-8 rounded-3xl text-white">
                            <div class="serif text-4xl mb-2">12+</div>
                            <div class="text-[10px] uppercase tracking-widest font-bold opacity-70">Anos de Experiência</div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-stone-100 p-8 rounded-3xl text-stone-900">
                            <div class="serif text-4xl mb-2">2k+</div>
                            <div class="text-[10px] uppercase tracking-widest font-bold opacity-70">Sessões Realizadas</div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1499728603263-13736abce01c?auto=format&fit=crop&q=80&w=600" class="rounded-3xl shadow-lg w-full" />
                    </div>
                </div>
            </div>
            <div class="order-1 lg:order-2 space-y-8 text-center lg:text-left">
                <div class="text-sage font-bold text-[10px] uppercase tracking-[0.4em]">A Profissional</div>
                <h2 class="serif text-5xl lg:text-6xl text-stone-900 leading-tight">Dra. Helena Mendes, <br/><span class="italic text-sage">Psicóloga Clínica</span></h2>
                <p class="text-stone-500 leading-relaxed">Sou mestre em Psicologia Clínica pela USP, com especialização em Terapia Cognitivo-Comportamental. Minha missão é oferecer um suporte empático e técnico para que você possa enfrentar seus desafios e florescer.</p>
                <ul class="space-y-4 text-left inline-block lg:block">
                    <li class="flex items-center gap-4 text-sm text-stone-600">
                        <div class="w-5 h-5 rounded-full bg-sage/10 flex items-center justify-center text-sage">✓</div>
                        Especialista em Ansiedade e Depressão
                    </li>
                    <li class="flex items-center gap-4 text-sm text-stone-600">
                        <div class="w-5 h-5 rounded-full bg-sage/10 flex items-center justify-center text-sage">✓</div>
                        Atendimento Humanizado e Ético
                    </li>
                    <li class="flex items-center gap-4 text-sm text-stone-600">
                        <div class="w-5 h-5 rounded-full bg-sage/10 flex items-center justify-center text-sage">✓</div>
                        Sessões Presenciais e Online
                    </li>
                </ul>
                <div class="pt-4">
                    <button class="border-b-2 border-sage text-sage font-bold text-xs uppercase tracking-widest pb-2 hover:opacity-70 transition-opacity">Agendar Agora</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="servicos" class="py-32 px-8 max-w-7xl mx-auto">
        <div class="text-center mb-20 space-y-4">
            <div class="text-sage font-bold text-[10px] uppercase tracking-[0.4em]">Especialidades</div>
            <h2 class="serif text-5xl lg:text-6xl text-stone-900">Como posso te <span class="italic text-sage">ajudar</span>?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div class="group p-10 bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100">
                <div class="w-16 h-16 bg-warm rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sage group-hover:text-white transition-colors duration-500">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <h3 class="serif text-2xl mb-4">Ansiedade</h3>
                <p class="text-stone-500 text-sm leading-relaxed mb-6">Desenvolva ferramentas práticas para gerenciar o estresse, as preocupações excessivas e reencontrar a calma no dia a dia.</p>
                <a href="#" class="text-sage text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Saiba Mais →</a>
            </div>
            <div class="group p-10 bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100">
                <div class="w-16 h-16 bg-warm rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sage group-hover:text-white transition-colors duration-500">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 class="serif text-2xl mb-4">Relacionamentos</h3>
                <p class="text-stone-500 text-sm leading-relaxed mb-6">Melhore a comunicação, resolva conflitos e construa conexões mais profundas e saudáveis com as pessoas ao seu redor.</p>
                <a href="#" class="text-sage text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Saiba Mais →</a>
            </div>
            <div class="group p-10 bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100">
                <div class="w-16 h-16 bg-warm rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sage group-hover:text-white transition-colors duration-500">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="serif text-2xl mb-4">Autoestima</h3>
                <p class="text-stone-500 text-sm leading-relaxed mb-6">Fortaleça sua autoconfiança, aprenda a se valorizar e construa uma imagem positiva e resiliente de si mesmo.</p>
                <a href="#" class="text-sage text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Saiba Mais →</a>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-warm">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div class="space-y-4 text-center md:text-left">
                    <div class="text-sage font-bold text-[10px] uppercase tracking-[0.4em]">Conhecimento</div>
                    <h2 class="serif text-5xl lg:text-6xl text-stone-900">Artigos & <span class="italic text-sage">Reflexões</span></h2>
                </div>
                <button class="text-sage font-bold text-xs uppercase tracking-widest border-b-2 border-sage pb-2">Ver todos os artigos</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="group cursor-pointer">
                    <div class="aspect-[16/9] rounded-[30px] overflow-hidden mb-8">
                        <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="text-sage text-[10px] font-bold uppercase tracking-widest mb-4">Saúde Mental • 5 min leitura</div>
                    <h3 class="serif text-3xl text-stone-900 mb-4 group-hover:text-sage transition-colors">Como lidar com a ansiedade em tempos de incerteza</h3>
                    <p class="text-stone-500 leading-relaxed">Pequenas práticas diárias que podem ajudar a acalmar a mente e focar no presente...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-[16/9] rounded-[30px] overflow-hidden mb-8">
                        <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="text-sage text-[10px] font-bold uppercase tracking-widest mb-4">Relacionamentos • 8 min leitura</div>
                    <h3 class="serif text-3xl text-stone-900 mb-4 group-hover:text-sage transition-colors">A importância da comunicação assertiva no casal</h3>
                    <p class="text-stone-500 leading-relaxed">Entenda como expressar suas necessidades sem gerar conflitos desnecessários...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="depoimentos" class="bg-stone-900 py-32 px-8 text-white overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div class="text-center lg:text-left">
                    <div class="text-sage font-bold text-[10px] uppercase tracking-[0.4em] mb-6">Depoimentos</div>
                    <h2 class="serif text-5xl lg:text-6xl leading-tight mb-8">Histórias de <span class="italic text-sage">transformação</span> real.</h2>
                    <p class="text-stone-400 text-lg leading-relaxed mb-12">A maior recompensa do meu trabalho é ver meus pacientes reencontrando o brilho nos olhos e a paz de espírito.</p>
                    <div class="flex justify-center lg:justify-start gap-4">
                        <button class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">←</button>
                        <button class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">→</button>
                    </div>
                </div>
                <div class="relative mt-12 lg:mt-0">
                    <div class="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-[40px] border border-white/10">
                        <div class="serif text-6xl text-sage italic mb-8">"</div>
                        <p class="text-xl italic leading-relaxed mb-8">"A Dra. Helena me ajudou a passar por um dos momentos mais difíceis da minha vida. Sua abordagem calma e suas ferramentas práticas fizeram toda a diferença na minha recuperação."</p>
                        <div class="flex items-center gap-4">
                            <img src="https://i.pravatar.cc/100?u=4" class="w-12 h-12 rounded-full" />
                            <div>
                                <div class="font-bold text-sm">Mariana Silva</div>
                                <div class="text-[10px] uppercase tracking-widest text-stone-500">Paciente há 1 ano</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 space-y-4">
                <div class="text-sage font-bold text-[10px] uppercase tracking-[0.4em]">O Consultório</div>
                <h2 class="serif text-5xl lg:text-6xl text-stone-900">Um ambiente de <span class="italic text-sage">paz</span>.</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="aspect-square rounded-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div class="aspect-square rounded-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div class="aspect-square rounded-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div class="aspect-square rounded-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-32 px-8 max-w-3xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="serif text-5xl text-stone-900">Dúvidas Frequentes</h2>
        </div>
        <div class="space-y-6">
            <div class="border-b border-stone-200 pb-6">
                <button class="flex justify-between items-center w-full text-left group">
                    <span class="font-bold text-lg group-hover:text-sage transition-colors">Como funciona a primeira sessão?</span>
                    <span class="text-2xl text-stone-300 group-hover:text-sage">+</span>
                </button>
                <div class="mt-4 text-stone-500 text-sm leading-relaxed">A primeira sessão é um momento de acolhimento e escuta, onde entenderemos suas demandas e como a terapia pode te ajudar.</div>
            </div>
            <div class="border-b border-stone-200 pb-6">
                <button class="flex justify-between items-center w-full text-left group">
                    <span class="font-bold text-lg group-hover:text-sage transition-colors">Qual a duração das sessões?</span>
                    <span class="text-2xl text-stone-300 group-hover:text-sage">+</span>
                </button>
                <div class="mt-4 text-stone-500 text-sm leading-relaxed">As sessões individuais têm duração média de 50 minutos, ocorrendo geralmente uma vez por semana.</div>
            </div>
            <div class="border-b border-stone-200 pb-6">
                <button class="flex justify-between items-center w-full text-left group">
                    <span class="font-bold text-lg group-hover:text-sage transition-colors">Vocês atendem convênios?</span>
                    <span class="text-2xl text-stone-300 group-hover:text-sage">+</span>
                </button>
                <div class="mt-4 text-stone-500 text-sm leading-relaxed">Trabalhamos com sistema de reembolso para a maioria dos convênios. Entre em contato para saber como solicitar.</div>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-8 bg-sage text-white text-center">
        <div class="max-w-4xl mx-auto space-y-10">
            <h2 class="serif text-6xl leading-tight">Pronto para começar sua <span class="italic opacity-80">jornada</span> de cura?</h2>
            <p class="text-white/70 text-lg max-w-xl mx-auto">Dê o primeiro passo hoje. Agende uma conversa inicial e descubra como a terapia pode transformar sua vida.</p>
            <button class="bg-white text-sage px-12 py-5 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-2xl">Agendar Minha Consulta</button>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contato" class="bg-warm border-t border-sage/10 pt-20 pb-10 px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
            <div class="col-span-2 space-y-6">
                <div class="serif text-3xl font-medium text-sage italic">Dra. Helena Mendes</div>
                <p class="text-stone-500 max-w-xs text-sm leading-relaxed">Cuidando da sua saúde mental com ética, empatia e base científica.</p>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-sage/5 flex items-center justify-center text-sage hover:bg-sage hover:text-white transition-all">In</a>
                    <a href="#" class="w-10 h-10 rounded-full bg-sage/5 flex items-center justify-center text-sage hover:bg-sage hover:text-white transition-all">Ig</a>
                </div>
            </div>
            <div class="space-y-6">
                <div class="text-[10px] uppercase font-bold tracking-widest text-stone-400">Links</div>
                <div class="flex flex-col gap-4 text-sm font-medium text-stone-600">
                    <a href="#" class="hover:text-sage transition-colors">Sobre Mim</a>
                    <a href="#" class="hover:text-sage transition-colors">Especialidades</a>
                    <a href="#" class="hover:text-sage transition-colors">Blog</a>
                    <a href="#" class="hover:text-sage transition-colors">Agendamento</a>
                </div>
            </div>
            <div class="space-y-6">
                <div class="text-[10px] uppercase font-bold tracking-widest text-stone-400">Contato</div>
                <div class="flex flex-col gap-4 text-sm font-medium text-stone-600">
                    <p>Av. Paulista, 1000 - SP</p>
                    <p>(11) 99999-9999</p>
                    <p>contato@helenamendes.com.br</p>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto pt-10 border-t border-sage/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">© 2026 Dra. Helena Mendes. Todos os direitos reservados.</div>
            <div class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Design by Generatefy Studio</div>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'nutritionist-elite',
    name: 'Vibrant Health',
    category: 'Nutrição',
    featured: true,
    description: 'Landing page completa e energética para nutricionistas, com planos, metodologia e resultados.',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; }
        .bg-lime-glow { background: radial-gradient(circle at 50% 50%, #d9f99d 0%, #bef264 100%); }
        .text-gradient { background: linear-gradient(to right, #bef264, #65a30d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
</head>
<body class="bg-stone-50 text-stone-900 antialiased overflow-x-hidden">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div class="p-6 flex justify-between items-center max-w-7xl mx-auto">
            <div class="text-2xl font-extrabold tracking-tighter flex items-center gap-2">
                <div class="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center text-white">V</div>
                VIBRANT
            </div>
            <nav class="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                <a href="#inicio" class="hover:text-lime-500 transition-colors">Início</a>
                <a href="#metodo" class="hover:text-lime-500 transition-colors">Método</a>
                <a href="#planos" class="hover:text-lime-500 transition-colors">Planos</a>
                <a href="#resultados" class="hover:text-lime-500 transition-colors">Resultados</a>
            </nav>
            <button class="bg-black text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-lime-400 hover:text-black transition-all shadow-xl shadow-black/10">Agendar Consulta</button>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="inicio" class="max-w-7xl mx-auto px-6 pt-40 pb-20">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 rounded-full text-[10px] font-black text-lime-700 uppercase tracking-widest mb-8">
                    <span class="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
                    Nutrição Baseada em Ciência
                </div>
                <h1 class="text-5xl md:text-8xl font-extrabold leading-[0.85] tracking-tighter mb-8 break-words uppercase">
                    COMER BEM É <span class="text-lime-500">VIVER</span> MELHOR.
                </h1>
                <p class="text-lg md:text-xl text-stone-500 mb-10 max-w-md font-light leading-relaxed">
                    Transforme sua relação com a comida através de uma nutrição consciente, sem restrições e personalizada para seus objetivos.
                </p>
                <div class="flex flex-col sm:flex-row gap-6">
                    <button class="w-full sm:w-auto bg-lime-400 text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-lime-400/30">Começar Agora</button>
                    <div class="flex items-center gap-4">
                        <div class="flex -space-x-3">
                            <img src="https://i.pravatar.cc/100?u=10" class="w-12 h-12 rounded-full border-4 border-white" />
                            <img src="https://i.pravatar.cc/100?u=11" class="w-12 h-12 rounded-full border-4 border-white" />
                        </div>
                        <div class="text-xs font-bold uppercase tracking-widest text-stone-400">Junte-se a <br/>+2.000 alunos</div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <div class="aspect-square rounded-[60px] overflow-hidden shadow-2xl relative z-10 rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -top-10 -right-10 w-64 h-64 bg-lime-200 rounded-full blur-3xl opacity-50"></div>
                <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-lime-400 rounded-full blur-3xl opacity-30"></div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <div class="max-w-7xl mx-auto px-6 mb-32">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-12 rounded-[40px] shadow-sm border border-stone-100">
            <div class="text-center">
                <div class="text-5xl font-black text-lime-500 mb-2">98%</div>
                <div class="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Satisfação</div>
            </div>
            <div class="text-center">
                <div class="text-5xl font-black text-stone-900 mb-2">+10t</div>
                <div class="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Peso Perdido</div>
            </div>
            <div class="text-center">
                <div class="text-5xl font-black text-stone-900 mb-2">24h</div>
                <div class="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Suporte</div>
            </div>
            <div class="text-center">
                <div class="text-5xl font-black text-stone-900 mb-2">+50</div>
                <div class="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Receitas</div>
            </div>
        </div>
    </div>

    <!-- Methodology -->
    <section id="metodo" class="bg-stone-900 py-32 px-6 text-white overflow-hidden">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div class="space-y-8">
                <div class="text-lime-400 font-bold text-[10px] uppercase tracking-[0.4em]">Metodologia</div>
                <h2 class="text-6xl font-extrabold leading-tight tracking-tighter">Nutrição sem <br/><span class="text-lime-400 italic">terrorismo</span> alimentar.</h2>
                <p class="text-stone-400 text-lg leading-relaxed">Meu método foca em reeducação alimentar sustentável. Nada de dietas malucas ou restrições severas. O foco é saúde, prazer e performance.</p>
                <div class="space-y-6">
                    <div class="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <div class="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-black font-black">01</div>
                        <div>
                            <h4 class="font-bold mb-2">Análise Bioquímica</h4>
                            <p class="text-sm text-stone-500">Avaliamos seus exames para entender exatamente o que seu corpo precisa.</p>
                        </div>
                    </div>
                    <div class="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <div class="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-black font-black">02</div>
                        <div>
                            <h4 class="font-bold mb-2">Plano Flexível</h4>
                            <p class="text-sm text-stone-500">Cardápios que se adaptam à sua rotina, não o contrário.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000" class="rounded-[60px] shadow-2xl opacity-80" />
                <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
            </div>
        </div>
    </section>

    <!-- Plans -->
    <section id="planos" class="py-32 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-20">
            <h2 class="text-6xl font-extrabold tracking-tighter">Escolha seu <span class="text-lime-500">Plano</span></h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
            <div class="p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm hover:shadow-2xl transition-all">
                <div class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Individual</div>
                <div class="text-4xl font-black mb-6">R$ 297<span class="text-sm text-stone-400 font-normal">/mês</span></div>
                <ul class="space-y-4 mb-10 text-sm text-stone-500">
                    <li class="flex items-center gap-3">✓ Consulta Mensal</li>
                    <li class="flex items-center gap-3">✓ Plano Alimentar</li>
                    <li class="flex items-center gap-3">✓ Suporte via WhatsApp</li>
                </ul>
                <button class="w-full py-4 bg-stone-100 rounded-2xl font-bold hover:bg-lime-400 transition-colors">Selecionar</button>
            </div>
            <div class="p-10 bg-black text-white rounded-[40px] shadow-2xl scale-105 relative overflow-hidden">
                <div class="absolute top-6 right-6 bg-lime-400 text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Popular</div>
                <div class="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 text-lime-400">Performance</div>
                <div class="text-4xl font-black mb-6">R$ 497<span class="text-sm text-stone-500 font-normal">/mês</span></div>
                <ul class="space-y-4 mb-10 text-sm text-stone-400">
                    <li class="flex items-center gap-3">✓ Consulta Quinzenal</li>
                    <li class="flex items-center gap-3">✓ Plano + Suplementação</li>
                    <li class="flex items-center gap-3">✓ App Exclusivo</li>
                    <li class="flex items-center gap-3">✓ Bioimpedância</li>
                </ul>
                <button class="w-full py-4 bg-lime-400 text-black rounded-2xl font-bold hover:scale-105 transition-transform">Selecionar</button>
            </div>
            <div class="p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm hover:shadow-2xl transition-all">
                <div class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Elite</div>
                <div class="text-4xl font-black mb-6">R$ 897<span class="text-sm text-stone-400 font-normal">/mês</span></div>
                <ul class="space-y-4 mb-10 text-sm text-stone-500">
                    <li class="flex items-center gap-3">✓ Acompanhamento Semanal</li>
                    <li class="flex items-center gap-3">✓ Personal Chef Guide</li>
                    <li class="flex items-center gap-3">✓ Concierge 24/7</li>
                </ul>
                <button class="w-full py-4 bg-stone-100 rounded-2xl font-bold hover:bg-lime-400 transition-colors">Selecionar</button>
            </div>
        </div>
    </section>

    <!-- Results/Testimonials -->
    <section id="resultados" class="py-32 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-lime-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">Resultados Reais</div>
                <h2 class="text-6xl font-extrabold tracking-tighter">Vidas <span class="text-lime-500 italic">Transformadas</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-10 bg-stone-50 rounded-[40px] border border-stone-100">
                    <div class="text-lime-500 text-4xl mb-6 font-black">"</div>
                    <p class="text-lg font-medium leading-relaxed mb-8 text-stone-600">"Perdi 15kg em 4 meses sem passar fome. O plano flexível mudou minha vida e minha disposição."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-lime-200"></div>
                        <div>
                            <div class="font-bold">Ana Clara</div>
                            <div class="text-[10px] uppercase text-stone-400 font-bold">Empresária</div>
                        </div>
                    </div>
                </div>
                <div class="p-10 bg-stone-50 rounded-[40px] border border-stone-100">
                    <div class="text-lime-500 text-4xl mb-6 font-black">"</div>
                    <p class="text-lg font-medium leading-relaxed mb-8 text-stone-600">"Finalmente entendi como me alimentar para ter performance no treino. Resultados incríveis!"</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-lime-200"></div>
                        <div>
                            <div class="font-bold">Marcos V.</div>
                            <div class="text-[10px] uppercase text-stone-400 font-bold">Atleta Amador</div>
                        </div>
                    </div>
                </div>
                <div class="p-10 bg-stone-50 rounded-[40px] border border-stone-100">
                    <div class="text-lime-500 text-4xl mb-6 font-black">"</div>
                    <p class="text-lg font-medium leading-relaxed mb-8 text-stone-600">"O suporte é sensacional. As receitas são fáceis e deliciosas. Não parece que estou em dieta."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-lime-200"></div>
                        <div>
                            <div class="font-bold">Juliana S.</div>
                            <div class="text-[10px] uppercase text-stone-400 font-bold">Advogada</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-6 bg-stone-50">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div class="space-y-4">
                    <div class="text-lime-500 font-bold text-[10px] uppercase tracking-[0.4em]">Conteúdo</div>
                    <h2 class="text-6xl font-extrabold tracking-tighter">Dicas & <span class="text-lime-500 italic">Receitas</span></h2>
                </div>
                <button class="bg-black text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-lime-400 hover:text-black transition-all">Ver Blog</button>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="group cursor-pointer">
                    <div class="aspect-video rounded-[40px] overflow-hidden mb-8">
                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="text-lime-500 text-[10px] font-bold uppercase tracking-widest mb-4">Receitas • 5 min</div>
                    <h3 class="text-3xl font-bold mb-4 group-hover:text-lime-500 transition-colors">5 Cafés da manhã proteicos para começar o dia</h3>
                    <p class="text-stone-500 leading-relaxed">Opções práticas e deliciosas que vão te manter saciado por mais tempo...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video rounded-[40px] overflow-hidden mb-8">
                        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="text-lime-500 text-[10px] font-bold uppercase tracking-widest mb-4">Saúde • 8 min</div>
                    <h3 class="text-3xl font-bold mb-4 group-hover:text-lime-500 transition-colors">A verdade sobre os suplementos alimentares</h3>
                    <p class="text-stone-500 leading-relaxed">Entenda quando eles são realmente necessários e como escolher os melhores...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-32 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <h2 class="text-6xl font-extrabold tracking-tighter">Nosso <span class="text-lime-500 italic">Espaço</span></h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" class="rounded-3xl aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600" class="rounded-3xl aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600" class="rounded-3xl aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" class="rounded-3xl aspect-square object-cover" />
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-32 px-6 max-w-3xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-5xl font-extrabold tracking-tighter">Dúvidas Frequentes</h2>
        </div>
        <div class="space-y-6">
            <div class="border-b border-stone-200 pb-6">
                <h4 class="font-bold text-lg mb-2">O plano alimentar é difícil de seguir?</h4>
                <p class="text-stone-500 text-sm">Não! O plano é construído com base nos alimentos que você já gosta e na sua rotina de tempo.</p>
            </div>
            <div class="border-b border-stone-200 pb-6">
                <h4 class="font-bold text-lg mb-2">Preciso comprar suplementos caros?</h4>
                <p class="text-stone-500 text-sm">A base é comida de verdade. Suplementos são sugeridos apenas se houver necessidade real e se couber no seu orçamento.</p>
            </div>
            <div class="border-b border-stone-200 pb-6">
                <h4 class="font-bold text-lg mb-2">Como funciona o suporte via WhatsApp?</h4>
                <p class="text-stone-500 text-sm">Você terá um canal direto para tirar dúvidas sobre substituições, rótulos ou qualquer dificuldade no dia a dia.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-6 bg-lime-400 text-black text-center">
        <div class="max-w-4xl mx-auto space-y-10">
            <h2 class="text-4xl md:text-6xl font-extrabold tracking-tighter text-black break-words uppercase">SUA MELHOR VERSÃO <br/> COMEÇA <span class="italic">AGORA</span>.</h2>
            <p class="text-black/60 text-lg md:text-xl max-w-xl mx-auto font-medium">Não espere a segunda-feira. Vamos construir juntos um plano que funciona para você e para sua rotina.</p>
            <button class="bg-black text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl hover:scale-105 transition-transform shadow-2xl shadow-black/20">Quero Começar Hoje</button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-stone-50 pt-32 pb-10 px-6 border-t border-stone-200">
        <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
            <div class="col-span-2">
                <div class="text-3xl font-black tracking-tighter mb-6">VIBRANT</div>
                <p class="text-stone-500 max-w-xs mb-8">Redefinindo a nutrição moderna através da ciência e do prazer de comer.</p>
                <div class="flex gap-4">
                    <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-lime-400 transition-colors cursor-pointer">Ig</div>
                    <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-lime-400 transition-colors cursor-pointer">Tw</div>
                </div>
            </div>
            <div>
                <h4 class="font-bold mb-6 uppercase text-[10px] tracking-widest text-stone-400">Navegação</h4>
                <ul class="space-y-4 text-sm font-bold text-stone-600">
                    <li><a href="#" class="hover:text-lime-500">Sobre</a></li>
                    <li><a href="#" class="hover:text-lime-500">Metodologia</a></li>
                    <li><a href="#" class="hover:text-lime-500">Planos</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-6 uppercase text-[10px] tracking-widest text-stone-400">Contato</h4>
                <ul class="space-y-4 text-sm font-bold text-stone-600">
                    <li>contato@vibrant.com</li>
                    <li>(11) 98888-8888</li>
                </ul>
            </div>
        </div>
        <div class="max-w-7xl mx-auto pt-10 border-t border-stone-200 flex justify-between items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            <div>© 2026 Vibrant Health.</div>
            <div>Powered by Generatefy Studio</div>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'barbershop-elite',
    name: 'The Gentleman',
    category: 'Barbearia',
    featured: true,
    description: 'Landing page completa e robusta para barbearias premium, com serviços, equipe, preços e galeria.',
    thumbnail: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0A0A0A; }
        .display { font-family: 'Anton', sans-serif; }
        .text-gold { color: #C5A059; }
        .bg-gold { background-color: #C5A059; }
        .border-gold { border-color: #C5A059; }
        .bg-dark { background-color: #0A0A0A; }
    </style>
</head>
<body class="text-white antialiased overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div class="p-8 flex justify-between items-center max-w-7xl mx-auto">
            <div class="display text-3xl tracking-widest">THE <span class="text-gold">GENTLEMAN</span></div>
            <div class="hidden md:flex gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-white/50">
                <a href="#inicio" class="hover:text-gold transition-colors">Início</a>
                <a href="#servicos" class="hover:text-gold transition-colors">Serviços</a>
                <a href="#precos" class="hover:text-gold transition-colors">Preços</a>
                <a href="#equipe" class="hover:text-gold transition-colors">Equipe</a>
            </div>
            <button class="border border-gold text-gold px-8 py-3 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gold hover:text-black transition-all">Agendar</button>
        </div>
    </nav>

    <!-- Hero -->
    <header id="inicio" class="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover opacity-40 scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
        
        <div class="relative z-10 text-center px-6">
            <div class="text-gold text-xs uppercase font-bold tracking-[0.5em] mb-8">Estilo • Atitude • Tradição</div>
            <h1 class="display text-[12vw] md:text-[15vw] leading-[0.8] mb-12 uppercase break-words">Corte de <br/> <span class="text-gold">Elite</span></h1>
            <div class="flex flex-col sm:flex-row justify-center gap-8">
                <button class="w-full sm:w-auto bg-gold text-black px-12 py-5 font-bold uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-gold/20">Reservar Horário</button>
                <button class="w-full sm:w-auto border border-white/20 px-12 py-5 font-bold uppercase text-sm hover:bg-white hover:text-black transition-all">Nossos Serviços</button>
            </div>
        </div>
    </header>

    <!-- Services -->
    <section id="servicos" class="py-32 px-8 max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div class="max-w-xl">
                <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">O que fazemos</div>
                <h2 class="display text-6xl lg:text-7xl uppercase leading-tight">Mestres da <br/><span class="text-gold italic">Navalha</span></h2>
            </div>
            <p class="text-white/40 max-w-xs text-sm leading-relaxed uppercase tracking-widest">Combinamos técnicas tradicionais com o estilo moderno para criar o visual perfeito para você.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-1 px-1 bg-white/5 border border-white/5">
            <div class="bg-[#0A0A0A] p-16 text-center group hover:bg-gold transition-all duration-500">
                <div class="text-gold group-hover:text-black text-5xl mb-8 font-black">01</div>
                <h3 class="display text-3xl mb-6 uppercase group-hover:text-black">Cabelo</h3>
                <p class="text-xs text-white/40 group-hover:text-black/60 leading-relaxed uppercase tracking-widest mb-8">Cortes clássicos e modernos executados com precisão cirúrgica.</p>
                <div class="w-12 h-1px bg-gold/20 mx-auto group-hover:bg-black/20"></div>
            </div>
            <div class="bg-[#0A0A0A] p-16 text-center group hover:bg-gold transition-all duration-500">
                <div class="text-gold group-hover:text-black text-5xl mb-8 font-black">02</div>
                <h3 class="display text-3xl mb-6 uppercase group-hover:text-black">Barba</h3>
                <p class="text-xs text-white/40 group-hover:text-black/60 leading-relaxed uppercase tracking-widest mb-8">Toalha quente e navalha para um acabamento impecável e relaxante.</p>
                <div class="w-12 h-1px bg-gold/20 mx-auto group-hover:bg-black/20"></div>
            </div>
            <div class="bg-[#0A0A0A] p-16 text-center group hover:bg-gold transition-all duration-500">
                <div class="text-gold group-hover:text-black text-5xl mb-8 font-black">03</div>
                <h3 class="display text-3xl mb-6 uppercase group-hover:text-black">Tratamento</h3>
                <p class="text-xs text-white/40 group-hover:text-black/60 leading-relaxed uppercase tracking-widest mb-8">Hidratação e cuidados especiais para seu cabelo e couro cabeludo.</p>
                <div class="w-12 h-1px bg-gold/20 mx-auto group-hover:bg-black/20"></div>
            </div>
        </div>
    </section>

    <!-- Pricing -->
    <section id="precos" class="bg-white text-black py-32 px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
            <div>
                <h2 class="display text-7xl uppercase mb-12">Menu de <br/><span class="text-gold italic">Serviços</span></h2>
                <div class="space-y-8">
                    <div class="flex justify-between items-end border-b border-black/10 pb-4">
                        <div>
                            <h4 class="font-bold uppercase tracking-widest">Corte Clássico</h4>
                            <p class="text-[10px] text-black/40 uppercase tracking-widest">Tesoura ou Máquina</p>
                        </div>
                        <div class="text-2xl font-black">R$ 80</div>
                    </div>
                    <div class="flex justify-between items-end border-b border-black/10 pb-4">
                        <div>
                            <h4 class="font-bold uppercase tracking-widest">Barba Completa</h4>
                            <p class="text-[10px] text-black/40 uppercase tracking-widest">Toalha Quente + Navalha</p>
                        </div>
                        <div class="text-2xl font-black">R$ 60</div>
                    </div>
                    <div class="flex justify-between items-end border-b border-black/10 pb-4">
                        <div>
                            <h4 class="font-bold uppercase tracking-widest">Combo VIP</h4>
                            <p class="text-[10px] text-black/40 uppercase tracking-widest">Cabelo + Barba + Sobrancelha</p>
                        </div>
                        <div class="text-2xl font-black">R$ 130</div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover rounded-[40px] shadow-2xl" />
                <div class="absolute -bottom-10 -right-10 bg-gold p-10 rounded-3xl shadow-2xl rotate-3">
                    <div class="display text-4xl text-black uppercase">15% OFF</div>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-black/60">Na primeira visita</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team -->
    <section id="equipe" class="py-32 px-8 max-w-7xl mx-auto">
        <div class="text-center mb-20">
            <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Nossa Equipe</div>
            <h2 class="display text-6xl uppercase">Os Especialistas</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-12">
            <div class="group">
                <div class="aspect-[3/4] overflow-hidden rounded-3xl mb-6 border border-white/5">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 class="display text-2xl uppercase text-gold">Ricardo "Razor"</h4>
                <p class="text-[10px] uppercase tracking-widest text-white/40">Master Barber • 10 anos exp</p>
            </div>
            <div class="group">
                <div class="aspect-[3/4] overflow-hidden rounded-3xl mb-6 border border-white/5">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 class="display text-2xl uppercase text-gold">Lucas Silva</h4>
                <p class="text-[10px] uppercase tracking-widest text-white/40">Especialista em Barba</p>
            </div>
            <div class="group">
                <div class="aspect-[3/4] overflow-hidden rounded-3xl mb-6 border border-white/5">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h4 class="display text-2xl uppercase text-gold">André Santos</h4>
                <p class="text-[10px] uppercase tracking-widest text-white/40">Cortes Modernos</p>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-32 px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Depoimentos</div>
                <h2 class="display text-6xl uppercase">O que dizem os <span class="text-gold italic">Cavalheiros</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-12">
                <div class="p-12 border border-black/5 rounded-3xl">
                    <div class="text-gold text-4xl mb-8 font-black">"</div>
                    <p class="text-lg italic leading-relaxed mb-8">"O melhor corte da cidade. O ambiente é sensacional e o atendimento é de primeira classe."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gold/20"></div>
                        <div>
                            <div class="font-bold uppercase tracking-widest text-xs">Carlos M.</div>
                            <div class="text-[10px] uppercase text-black/40">Cliente VIP</div>
                        </div>
                    </div>
                </div>
                <div class="p-12 border border-black/5 rounded-3xl">
                    <div class="text-gold text-4xl mb-8 font-black">"</div>
                    <p class="text-lg italic leading-relaxed mb-8">"A toalha quente e o cuidado com a barba são diferenciais que não encontro em outro lugar."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gold/20"></div>
                        <div>
                            <div class="font-bold uppercase tracking-widest text-xs">Roberto F.</div>
                            <div class="text-[10px] uppercase text-black/40">Cliente Mensalista</div>
                        </div>
                    </div>
                </div>
                <div class="p-12 border border-black/5 rounded-3xl">
                    <div class="text-gold text-4xl mb-8 font-black">"</div>
                    <p class="text-lg italic leading-relaxed mb-8">"Equipe extremamente profissional. Saio sempre renovado e com a autoestima lá em cima."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gold/20"></div>
                        <div>
                            <div class="font-bold uppercase tracking-widest text-xs">Felipe S.</div>
                            <div class="text-[10px] uppercase text-black/40">Cliente Fiel</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="galeria" class="py-32 px-8 bg-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Nosso Ambiente</div>
                <h2 class="display text-6xl uppercase">Galeria de <span class="text-gold italic">Estilo</span></h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="aspect-square overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="aspect-square overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="aspect-square overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1599351431247-f10b21ce9634?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div class="aspect-square overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1512690196252-741d2fd36ad0?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section id="blog" class="py-32 px-8 bg-[#0A0A0A]">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div class="max-w-xl">
                    <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Blog</div>
                    <h2 class="display text-6xl uppercase">Dicas de <span class="text-gold italic">Cavalheiro</span></h2>
                </div>
                <button class="border border-gold text-gold px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-gold hover:text-black transition-all">Ver Tudo</button>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1599351431247-f10b21ce9634?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <h3 class="display text-3xl uppercase mb-4 group-hover:text-gold transition-colors">Como manter sua barba impecável em casa</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Dicas essenciais de hidratação e alinhamento para o dia a dia...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1512690196252-741d2fd36ad0?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <h3 class="display text-3xl uppercase mb-4 group-hover:text-gold transition-colors">Tendências de cortes masculinos para 2026</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Do clássico ao moderno, veja o que está em alta nesta temporada...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-32 px-8 max-w-4xl mx-auto">
        <div class="text-center mb-20">
            <h2 class="display text-5xl uppercase">Dúvidas Frequentes</h2>
        </div>
        <div class="space-y-8">
            <div class="border-b border-black/10 pb-8">
                <h4 class="display text-2xl uppercase text-gold mb-4">Preciso agendar ou posso chegar na hora?</h4>
                <p class="text-sm text-white/40 uppercase tracking-widest leading-relaxed">Trabalhamos preferencialmente com agendamento para garantir sua melhor experiência, mas atendemos por ordem de chegada conforme disponibilidade.</p>
            </div>
            <div class="border-b border-black/10 pb-8">
                <h4 class="display text-2xl uppercase text-gold mb-4">Quais formas de pagamento aceitam?</h4>
                <p class="text-sm text-white/40 uppercase tracking-widest leading-relaxed">Aceitamos todos os cartões de crédito, débito, PIX e dinheiro.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-8 bg-gold text-black text-center">
        <div class="max-w-4xl mx-auto space-y-10">
            <h2 class="display text-7xl uppercase leading-[0.9]">Não é apenas um corte. <br/> É uma <span class="italic">experiência</span>.</h2>
            <p class="text-black/60 text-sm uppercase tracking-[0.2em] font-bold max-w-xl mx-auto">Reserve seu horário e descubra por que somos a escolha dos cavalheiros mais exigentes da cidade.</p>
            <button class="bg-black text-white px-12 py-6 font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-2xl">Agendar Agora</button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black border-t border-white/5 pt-32 pb-10 px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-32">
            <div class="col-span-2">
                <div class="display text-4xl tracking-widest mb-8">THE <span class="text-gold">GENTLEMAN</span></div>
                <p class="text-white/40 max-w-xs text-sm leading-relaxed uppercase tracking-widest mb-12">Onde a tradição encontra o estilo moderno. Mais que uma barbearia, um estilo de vida.</p>
                <div class="flex gap-6">
                    <a href="#" class="text-gold hover:text-white transition-colors">Instagram</a>
                    <a href="#" class="text-gold hover:text-white transition-colors">Facebook</a>
                    <a href="#" class="text-gold hover:text-white transition-colors">WhatsApp</a>
                </div>
            </div>
            <div>
                <h5 class="display text-xl uppercase mb-8 text-gold">Horários</h5>
                <ul class="text-[10px] uppercase tracking-widest text-white/40 space-y-4">
                    <li class="flex justify-between"><span>Seg - Sex</span> <span>09:00 - 20:00</span></li>
                    <li class="flex justify-between"><span>Sábado</span> <span>09:00 - 18:00</span></li>
                    <li class="flex justify-between"><span>Domingo</span> <span>Fechado</span></li>
                </ul>
            </div>
            <div>
                <h5 class="display text-xl uppercase mb-8 text-gold">Localização</h5>
                <p class="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed">
                    Rua dos Barbeiros, 123<br/>
                    Centro, São Paulo - SP<br/>
                    CEP: 01010-010
                </p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto pt-10 border-t border-white/5 flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
            <div>© 2026 The Gentleman.</div>
            <div>Crafted by Generatefy Studio</div>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'law-firm-elite',
    name: 'Mendes & Associados',
    category: 'Advocacia',
    description: 'Landing page prestigiosa e sóbria para escritórios de advocacia, com áreas de atuação, equipe e blog.',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', sans-serif; background-color: #F5F2ED; color: #1A1A1A; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .border-gold { border-color: #C5A059; }
        .text-gold { color: #C5A059; }
        .bg-gold { background-color: #C5A059; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <div class="bg-[#1A1A1A] text-white py-2 px-8 text-[10px] uppercase tracking-[0.2em] font-medium flex justify-between items-center">
        <span>Excelência Jurídica desde 1998</span>
        <div class="flex gap-6">
            <span>(11) 3333-4444</span>
            <span>contato@mendes.adv.br</span>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-[#F5F2ED]/90 backdrop-blur-md border-b border-black/5">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="serif text-3xl font-semibold tracking-tight">MENDES <span class="font-light italic text-gold">&</span> ASSOCIADOS</div>
            <div class="hidden lg:flex gap-10 text-[10px] uppercase font-bold tracking-widest text-black/60">
                <a href="#inicio" class="hover:text-gold transition-colors">Início</a>
                <a href="#areas" class="hover:text-gold transition-colors">Áreas de Atuação</a>
                <a href="#equipe" class="hover:text-gold transition-colors">Sócios</a>
                <a href="#contato" class="hover:text-gold transition-colors">Contato</a>
            </div>
            <button class="bg-[#1A1A1A] text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-gold hover:text-black transition-all">Consulta Jurídica</button>
        </div>
    </nav>

    <!-- Hero -->
    <section id="inicio" class="relative min-h-[90vh] flex items-center px-8">
        <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
            <div class="space-y-10 relative z-10">
                <div class="w-20 h-1 bg-gold"></div>
                <h1 class="serif text-5xl md:text-8xl leading-[0.9] font-medium break-words">Justiça com <br/><span class="italic text-gold">integridade</span> e rigor técnico.</h1>
                <p class="text-base md:text-lg text-black/60 max-w-md leading-relaxed font-light">Defendendo seus interesses com a sofisticação e a dedicação que casos complexos exigem.</p>
                <div class="flex flex-col sm:flex-row gap-6">
                    <button class="w-full sm:w-auto bg-[#1A1A1A] text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-2xl">Nossas Áreas</button>
                    <button class="w-full sm:w-auto border border-black/10 px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">O Escritório</button>
                </div>
            </div>
            <div class="relative">
                <div class="aspect-[4/5] rounded-t-full overflow-hidden shadow-2xl border-8 border-white">
                    <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-10 -left-10 bg-white p-12 shadow-2xl max-w-xs">
                    <div class="serif text-5xl text-gold italic mb-4">25+</div>
                    <p class="text-[10px] uppercase font-bold tracking-widest text-black/40 leading-relaxed">Anos de atuação ininterrupta nos tribunais superiores.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Areas of Practice -->
    <section id="areas" class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Expertise</div>
                    <h2 class="serif text-6xl leading-tight">Áreas de <span class="italic text-gold">Atuação</span> Especializada</h2>
                </div>
                <p class="text-black/40 max-w-xs text-sm leading-relaxed">Oferecemos soluções jurídicas personalizadas para empresas e indivíduos em diversas esferas do direito.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-12">
                <div class="group p-12 border border-black/5 hover:border-gold transition-all duration-500">
                    <div class="serif text-4xl text-gold/20 group-hover:text-gold transition-colors mb-8">01</div>
                    <h3 class="serif text-3xl mb-6">Direito Empresarial</h3>
                    <p class="text-sm text-black/50 leading-relaxed mb-8">Consultoria estratégica para fusões, aquisições e estruturação societária de alta complexidade.</p>
                    <div class="w-10 h-px bg-gold/30 group-hover:w-full transition-all duration-500"></div>
                </div>
                <div class="group p-12 border border-black/5 hover:border-gold transition-all duration-500">
                    <div class="serif text-4xl text-gold/20 group-hover:text-gold transition-colors mb-8">02</div>
                    <h3 class="serif text-3xl mb-6">Direito Civil</h3>
                    <p class="text-sm text-black/50 leading-relaxed mb-8">Proteção patrimonial, sucessões e resolução de conflitos com foco na preservação de interesses.</p>
                    <div class="w-10 h-px bg-gold/30 group-hover:w-full transition-all duration-500"></div>
                </div>
                <div class="group p-12 border border-black/5 hover:border-gold transition-all duration-500">
                    <div class="serif text-4xl text-gold/20 group-hover:text-gold transition-colors mb-8">03</div>
                    <h3 class="serif text-3xl mb-6">Direito Tributário</h3>
                    <p class="text-sm text-black/50 leading-relaxed mb-8">Planejamento fiscal inteligente e contencioso administrativo e judicial especializado.</p>
                    <div class="w-10 h-px bg-gold/30 group-hover:w-full transition-all duration-500"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Partners -->
    <section id="equipe" class="py-32 px-8 max-w-7xl mx-auto">
        <div class="text-center mb-24">
            <h2 class="serif text-6xl">Sócios <span class="italic text-gold">Fundadores</span></h2>
        </div>
        <div class="grid md:grid-cols-2 gap-20">
            <div class="group">
                <div class="aspect-[4/5] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <h4 class="serif text-3xl">Dr. Alberto Mendes</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">Sócio Sênior • Direito Empresarial</p>
                    </div>
                    <div class="text-gold text-xs italic">USP / Harvard Law</div>
                </div>
            </div>
            <div class="group">
                <div class="aspect-[4/5] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <h4 class="serif text-3xl">Dra. Beatriz Rocha</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">Sócia Sênior • Direito Civil</p>
                    </div>
                    <div class="text-gold text-xs italic">PUC-SP / Sorbonne</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-32 px-8 bg-[#1A1A1A] text-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Confiança</div>
                <h2 class="serif text-6xl">O que dizem nossos <span class="italic text-gold">clientes</span></h2>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="p-12 bg-white/5 border border-white/10 rounded-sm">
                    <div class="serif text-5xl text-gold italic mb-8">"</div>
                    <p class="text-lg italic leading-relaxed mb-8 text-white/80">"A equipe do Mendes & Associados demonstrou um profissionalismo exemplar em um caso societário extremamente complexo. A estratégia foi brilhante."</p>
                    <div class="font-bold text-sm uppercase tracking-widest">Ricardo Oliveira</div>
                    <div class="text-[10px] text-gold uppercase tracking-widest mt-1">CEO, TechCorp Brasil</div>
                </div>
                <div class="p-12 bg-white/5 border border-white/10 rounded-sm">
                    <div class="serif text-5xl text-gold italic mb-8">"</div>
                    <p class="text-lg italic leading-relaxed mb-8 text-white/80">"Encontrei no escritório não apenas advogados, mas parceiros estratégicos que entendem profundamente os desafios do mercado imobiliário."</p>
                    <div class="font-bold text-sm uppercase tracking-widest">Ana Paula Costa</div>
                    <div class="text-[10px] text-gold uppercase tracking-widest mt-1">Diretora Jurídica, Horizon Group</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Process Section -->
    <section class="py-32 px-8 bg-[#F5F2ED]">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Metodologia</div>
                <h2 class="serif text-6xl">Nosso <span class="italic text-gold">Processo</span></h2>
            </div>
            <div class="grid md:grid-cols-4 gap-8">
                <div class="space-y-6">
                    <div class="serif text-4xl text-gold">01.</div>
                    <h4 class="serif text-2xl">Análise</h4>
                    <p class="text-xs text-black/50 leading-relaxed uppercase tracking-widest">Estudo detalhado dos fatos e documentos do caso.</p>
                </div>
                <div class="space-y-6">
                    <div class="serif text-4xl text-gold">02.</div>
                    <h4 class="serif text-2xl">Estratégia</h4>
                    <p class="text-xs text-black/50 leading-relaxed uppercase tracking-widest">Desenvolvimento de tese jurídica personalizada.</p>
                </div>
                <div class="space-y-6">
                    <div class="serif text-4xl text-gold">03.</div>
                    <h4 class="serif text-2xl">Execução</h4>
                    <p class="text-xs text-black/50 leading-relaxed uppercase tracking-widest">Ação diligente nos tribunais e órgãos competentes.</p>
                </div>
                <div class="space-y-6">
                    <div class="serif text-4xl text-gold">04.</div>
                    <h4 class="serif text-2xl">Resultado</h4>
                    <p class="text-xs text-black/50 leading-relaxed uppercase tracking-widest">Busca incessante pela melhor solução jurídica.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Conhecimento</div>
                    <h2 class="serif text-6xl">Artigos & <span class="italic text-gold">Insights</span></h2>
                </div>
                <button class="border border-gold text-gold px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-gold hover:text-black transition-all">Ver Todos os Artigos</button>
            </div>
            <div class="grid md:grid-cols-2 gap-16">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
                        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                    </div>
                    <h3 class="serif text-3xl mb-4 group-hover:text-gold transition-colors">As novas diretrizes do Direito Digital em 2026</h3>
                    <p class="text-sm text-black/50 leading-relaxed">Uma análise profunda sobre os impactos da IA na legislação brasileira...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
                        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                    </div>
                    <h3 class="serif text-3xl mb-4 group-hover:text-gold transition-colors">Planejamento sucessório: Proteção e Longevidade</h3>
                    <p class="text-sm text-black/50 leading-relaxed">Como estruturar a sucessão familiar de forma segura e eficiente...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-32 px-8 max-w-4xl mx-auto">
        <div class="text-center mb-20">
            <h2 class="serif text-5xl">Perguntas Frequentes</h2>
        </div>
        <div class="space-y-8">
            <div class="border-b border-black/10 pb-8">
                <h4 class="serif text-2xl mb-4">Como funciona a primeira consulta?</h4>
                <p class="text-sm text-black/60 leading-relaxed">Realizamos uma análise preliminar do caso para identificar as melhores estratégias jurídicas e viabilidade do pleito.</p>
            </div>
            <div class="border-b border-black/10 pb-8">
                <h4 class="serif text-2xl mb-4">O escritório atua em todo o território nacional?</h4>
                <p class="text-sm text-black/60 leading-relaxed">Sim, possuímos estrutura para atuar em todas as instâncias e tribunais do país, com foco especial nos tribunais superiores.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-8 bg-[#F5F2ED] text-center border-t border-black/5">
        <div class="max-w-4xl mx-auto space-y-10">
            <h2 class="serif text-6xl">Sua causa merece <br/><span class="italic text-gold">excelência</span> jurídica.</h2>
            <p class="text-black/60 text-sm uppercase tracking-widest font-medium max-w-xl mx-auto">Entre em contato hoje para uma avaliação estratégica do seu caso com nossos especialistas.</p>
            <button class="bg-[#1A1A1A] text-white px-12 py-6 text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all shadow-2xl">Agendar Consulta Estratégica</button>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contato" class="bg-[#1A1A1A] text-white pt-32 pb-10 px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-4 gap-20 mb-32">
                <div class="col-span-2 space-y-10">
                    <div class="serif text-4xl font-semibold tracking-tight">MENDES <span class="font-light italic text-gold">&</span> ASSOCIADOS</div>
                    <p class="text-white/40 max-w-sm text-sm leading-relaxed">Comprometidos com a excelência jurídica e a defesa intransigente dos direitos de nossos clientes.</p>
                    <div class="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
                        <a href="#" class="hover:text-gold transition-colors">LinkedIn</a>
                        <a href="#" class="hover:text-gold transition-colors">Instagram</a>
                        <a href="#" class="hover:text-gold transition-colors">Twitter</a>
                    </div>
                </div>
                <div class="space-y-8">
                    <h5 class="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">Escritório</h5>
                    <p class="text-sm text-white/60 leading-relaxed">
                        Av. Brigadeiro Faria Lima, 4500<br/>
                        Itaim Bibi, São Paulo - SP<br/>
                        CEP: 04538-132
                    </p>
                </div>
                <div class="space-y-8">
                    <h5 class="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">Contato</h5>
                    <p class="text-sm text-white/60 leading-relaxed">
                        (11) 3333-4444<br/>
                        contato@mendes.adv.br
                    </p>
                </div>
            </div>
            <div class="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] uppercase font-bold tracking-[0.5em] text-white/20">
                <div>© 2026 Mendes & Associados. Todos os direitos reservados.</div>
                <div>Design by Generatefy Studio</div>
            </div>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'saas-elite',
    name: 'FlowState AI',
    category: 'Software',
    description: 'Landing page moderna e de alta conversão para produtos SaaS, com recursos, preços e integração.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #050505; color: #FFFFFF; }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .text-gradient { background: linear-gradient(to right, #FFFFFF, #666666); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glow { box-shadow: 0 0 80px rgba(255, 255, 255, 0.05); }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="font-black text-xl tracking-tighter">FLOWSTATE</div>
        <div class="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/50">
            <a href="#recursos" class="hover:text-white transition-colors">Recursos</a>
            <a href="#precos" class="hover:text-white transition-colors">Preços</a>
            <a href="#blog" class="hover:text-white transition-colors">Blog</a>
        </div>
        <button class="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Get Started</button>
    </nav>

    <!-- Hero -->
    <section class="pt-60 pb-40 px-8 text-center relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
        <div class="max-w-4xl mx-auto relative z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest mb-12">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                v2.0 is now live
            </div>
            <h1 class="text-5xl md:text-9xl font-extrabold tracking-tighter leading-[0.85] mb-12 text-gradient break-words">
                WORK AT THE <br/> SPEED OF THOUGHT.
            </h1>
            <p class="text-lg md:text-xl text-white/40 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                The AI-powered workspace that unifies your team's knowledge, tasks, and creative process in one seamless flow.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-6">
                <button class="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">Start for Free</button>
                <button class="w-full sm:w-auto glass px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">Book a Demo</button>
            </div>
        </div>
        
        <!-- Dashboard Preview -->
        <div class="mt-32 max-w-6xl mx-auto glass rounded-[40px] p-4 glow">
            <div class="aspect-video rounded-[32px] overflow-hidden bg-white/5 relative">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-80" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section id="recursos" class="py-40 px-8 max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8">
            <div class="glass p-12 rounded-[40px] space-y-8">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="text-3xl font-bold tracking-tight">Lightning Fast</h3>
                <p class="text-white/40 leading-relaxed">Built for speed. No loading states, no friction. Just pure productivity at your fingertips.</p>
            </div>
            <div class="glass p-12 rounded-[40px] space-y-8">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 class="text-3xl font-bold tracking-tight">Enterprise Secure</h3>
                <p class="text-white/40 leading-relaxed">Your data is encrypted and private. We adhere to the highest security standards in the industry.</p>
            </div>
            <div class="glass p-12 rounded-[40px] space-y-8">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 class="text-3xl font-bold tracking-tight">Team Sync</h3>
                <p class="text-white/40 leading-relaxed">Collaborate in real-time with your entire team. See changes as they happen, anywhere in the world.</p>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-40 px-8 text-center">
        <div class="max-w-4xl mx-auto glass p-24 rounded-[60px] relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
            <h2 class="text-5xl md:text-7xl font-extrabold tracking-tighter mb-12 relative z-10">READY TO UNLOCK <br/> YOUR FLOW?</h2>
            <button class="bg-white text-black px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform relative z-10">Get Started for Free</button>
            <p class="mt-8 text-white/30 text-sm relative z-10">No credit card required. 14-day free trial.</p>
        </div>
    </section>

    <!-- Pricing -->
    <section id="precos" class="py-40 px-8 max-w-7xl mx-auto">
        <div class="text-center mb-24">
            <h2 class="text-5xl md:text-7xl font-extrabold tracking-tighter text-gradient">SIMPLE PRICING.</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
            <div class="glass p-12 rounded-[40px] flex flex-col">
                <div class="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Starter</div>
                <div class="text-5xl font-bold mb-8">$0<span class="text-sm text-white/20 font-normal">/mo</span></div>
                <ul class="space-y-4 mb-12 text-sm text-white/50 flex-1">
                    <li class="flex items-center gap-3">✓ Up to 3 users</li>
                    <li class="flex items-center gap-3">✓ 5GB Storage</li>
                    <li class="flex items-center gap-3">✓ Basic AI features</li>
                </ul>
                <button class="w-full py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all">Start for Free</button>
            </div>
            <div class="glass p-12 rounded-[40px] flex flex-col border-white/20 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-white text-black text-[8px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Most Popular</div>
                <div class="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Pro</div>
                <div class="text-5xl font-bold mb-8">$29<span class="text-sm text-white/20 font-normal">/mo</span></div>
                <ul class="space-y-4 mb-12 text-sm text-white/50 flex-1">
                    <li class="flex items-center gap-3">✓ Unlimited users</li>
                    <li class="flex items-center gap-3">✓ 100GB Storage</li>
                    <li class="flex items-center gap-3">✓ Advanced AI Flow</li>
                    <li class="flex items-center gap-3">✓ Priority Support</li>
                </ul>
                <button class="w-full py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-transform">Get Started</button>
            </div>
            <div class="glass p-12 rounded-[40px] flex flex-col">
                <div class="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Enterprise</div>
                <div class="text-5xl font-bold mb-8">Custom</div>
                <ul class="space-y-4 mb-12 text-sm text-white/50 flex-1">
                    <li class="flex items-center gap-3">✓ Custom integrations</li>
                    <li class="flex items-center gap-3">✓ Dedicated support</li>
                    <li class="flex items-center gap-3">✓ Advanced security</li>
                </ul>
                <button class="w-full py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all">Contact Sales</button>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-40 px-8 bg-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <h2 class="text-5xl md:text-7xl font-extrabold tracking-tighter text-gradient">LOVED BY TEAMS.</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="glass p-12 rounded-[40px] space-y-8">
                    <p class="text-xl text-white/60 leading-relaxed italic">"FlowState changed how we build products. The speed is unmatched."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-white/10"></div>
                        <div>
                            <div class="font-bold">Sarah Chen</div>
                            <div class="text-xs text-white/30">Product Lead at Vercel</div>
                        </div>
                    </div>
                </div>
                <div class="glass p-12 rounded-[40px] space-y-8">
                    <p class="text-xl text-white/60 leading-relaxed italic">"Finally a tool that actually feels like it was built for the modern web."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-white/10"></div>
                        <div>
                            <div class="font-bold">Alex Rivera</div>
                            <div class="text-xs text-white/30">Founder of Linear</div>
                        </div>
                    </div>
                </div>
                <div class="glass p-12 rounded-[40px] space-y-8">
                    <p class="text-xl text-white/60 leading-relaxed italic">"The AI features are actually useful, not just marketing fluff."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-white/10"></div>
                        <div>
                            <div class="font-bold">James Wilson</div>
                            <div class="text-xs text-white/30">CTO at Stripe</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Integrations -->
    <section class="py-40 px-8">
        <div class="max-w-7xl mx-auto glass p-24 rounded-[60px] text-center">
            <h2 class="text-4xl font-bold mb-12">WORKS WITH YOUR STACK</h2>
            <div class="flex flex-wrap justify-center gap-12 opacity-30 grayscale">
                <span class="text-2xl font-black">SLACK</span>
                <span class="text-2xl font-black">GITHUB</span>
                <span class="text-2xl font-black">NOTION</span>
                <span class="text-2xl font-black">FIGMA</span>
                <span class="text-2xl font-black">DISCORD</span>
                <span class="text-2xl font-black">LINEAR</span>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-40 px-8 max-w-4xl mx-auto">
        <div class="text-center mb-24">
            <h2 class="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div class="space-y-8">
            <div class="glass p-8 rounded-3xl">
                <h4 class="text-xl font-bold mb-4">Is there a free trial?</h4>
                <p class="text-white/40 leading-relaxed">Yes, we offer a 14-day free trial on all paid plans. No credit card required to start.</p>
            </div>
            <div class="glass p-8 rounded-3xl">
                <h4 class="text-xl font-bold mb-4">Can I cancel anytime?</h4>
                <p class="text-white/40 leading-relaxed">Absolutely. You can cancel your subscription at any time from your dashboard settings.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-40 px-8 text-center">
        <div class="max-w-5xl mx-auto glass p-32 rounded-[80px] relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
            <h2 class="text-6xl md:text-8xl font-extrabold tracking-tighter mb-16 relative z-10">READY TO CHANGE <br/> THE WAY YOU WORK?</h2>
            <div class="flex flex-col sm:flex-row justify-center gap-8 relative z-10">
                <button class="bg-white text-black px-16 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">Get Started for Free</button>
                <button class="glass px-16 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">Talk to an Expert</button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 px-8 border-t border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div class="font-black text-2xl tracking-tighter">FLOWSTATE</div>
            <div class="flex gap-12 text-[10px] uppercase font-bold tracking-widest text-white/30">
                <a href="#" class="hover:text-white transition-colors">Privacy</a>
                <a href="#" class="hover:text-white transition-colors">Terms</a>
                <a href="#" class="hover:text-white transition-colors">Security</a>
                <a href="#" class="hover:text-white transition-colors">Status</a>
            </div>
            <div class="text-[10px] uppercase font-bold tracking-widest text-white/20">© 2026 FlowState AI. All rights reserved.</div>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'real-estate-elite',
    name: 'Horizon Estates',
    category: 'Imobiliária',
    description: 'Landing page luxuosa e imersiva para imobiliárias de alto padrão, com listagens, filtros e tour virtual.',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #000000; color: #FFFFFF; }
        .serif { font-family: 'Playfair Display', serif; }
        .bg-card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="serif text-3xl font-medium tracking-tight">HORIZON</div>
        <div class="hidden md:flex gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-white/60">
            <a href="#propriedades" class="hover:text-white transition-colors">Propriedades</a>
            <a href="#sobre" class="hover:text-white transition-colors">Sobre</a>
            <a href="#contato" class="hover:text-white transition-colors">Contato</a>
        </div>
        <button class="border border-white/20 px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all">Agendar Visita</button>
    </nav>

    <!-- Hero -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative z-10 text-center max-w-5xl px-6">
            <h1 class="serif text-5xl md:text-9xl leading-[0.9] mb-12 break-words">Encontre o seu <br/><span class="italic">refúgio</span> extraordinário.</h1>
            <div class="flex flex-col md:flex-row justify-center gap-8">
                <div class="bg-white/10 backdrop-blur-xl p-6 rounded-2xl flex-1 border border-white/10">
                    <div class="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 text-center">Localização</div>
                    <div class="text-lg font-medium text-center">São Paulo, SP</div>
                </div>
                <div class="bg-white/10 backdrop-blur-xl p-6 rounded-2xl flex-1 border border-white/10">
                    <div class="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 text-center">Tipo</div>
                    <div class="text-lg font-medium text-center">Coberturas & Mansões</div>
                </div>
                <button class="w-full md:w-auto bg-white text-black px-12 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">Buscar Agora</button>
            </div>
        </div>
    </section>

    <!-- Featured Properties -->
    <section id="propriedades" class="py-40 px-8 max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-24">
            <div class="max-w-xl">
                <div class="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Destaques</div>
                <h2 class="serif text-6xl">Propriedades <span class="italic">Exclusivas</span></h2>
            </div>
            <a href="#" class="text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-2 hover:text-white/60 transition-all">Ver Todas</a>
        </div>
        <div class="grid md:grid-cols-2 gap-12">
            <div class="group cursor-pointer">
                <div class="aspect-[16/10] overflow-hidden rounded-[40px] mb-8 relative">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div class="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Jardins, SP</div>
                </div>
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="serif text-3xl mb-2">Villa Contemporânea</h3>
                        <p class="text-white/40 text-sm uppercase tracking-widest font-medium">4 Suítes • 600m² • 6 Vagas</p>
                    </div>
                    <div class="serif text-3xl">R$ 12.5M</div>
                </div>
            </div>
            <div class="group cursor-pointer">
                <div class="aspect-[16/10] overflow-hidden rounded-[40px] mb-8 relative">
                    <img src="https://images.unsplash.com/photo-1600607687940-4e7a6a353029?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div class="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Itaim Bibi, SP</div>
                </div>
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="serif text-3xl mb-2">Sky Penthouse</h3>
                        <p class="text-white/40 text-sm uppercase tracking-widest font-medium">3 Suítes • 450m² • 4 Vagas</p>
                    </div>
                    <div class="serif text-3xl">R$ 8.9M</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Process -->
    <section class="py-40 px-8 bg-stone-900 text-white">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-32 items-end mb-32">
                <div class="max-w-xl">
                    <div class="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Metodologia</div>
                    <h2 class="serif text-7xl leading-tight">Como damos <br/><span class="italic">vida</span> à sua visão.</h2>
                </div>
                <p class="text-white/40 text-lg leading-relaxed font-light">Um processo estruturado que equilibra rigor técnico com liberdade criativa, garantindo que cada detalhe seja uma extensão da sua identidade.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-20">
                <div class="space-y-8">
                    <div class="serif text-4xl italic">01. Diálogo</div>
                    <p class="text-white/40 text-sm leading-relaxed">Entendemos seus desejos, rotina e aspirações para criar um briefing que seja a base sólida do projeto.</p>
                </div>
                <div class="space-y-8">
                    <div class="serif text-4xl italic">02. Conceito</div>
                    <p class="text-white/40 text-sm leading-relaxed">Traduzimos o briefing em formas, materiais e luz, criando uma narrativa visual única para o espaço.</p>
                </div>
                <div class="space-y-8">
                    <div class="serif text-4xl italic">03. Execução</div>
                    <p class="text-white/40 text-sm leading-relaxed">Acompanhamento técnico rigoroso para garantir que a materialização do projeto seja fiel à intenção original.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="sobre" class="py-40 px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <div class="space-y-12">
                <div class="text-black/40 text-[10px] uppercase font-bold tracking-[0.4em]">Nossa História</div>
                <h2 class="serif text-7xl leading-[0.9]">Excelência em <br/><span class="italic">curadoria</span> imobiliária.</h2>
                <p class="text-xl text-black/60 leading-relaxed font-light">Com mais de duas décadas de experiência no mercado de luxo, a Horizon Estates nasceu do desejo de conectar pessoas extraordinárias a lugares extraordinários.</p>
                <div class="grid grid-cols-2 gap-12">
                    <div>
                        <div class="serif text-5xl mb-2">R$ 2B+</div>
                        <div class="text-[10px] uppercase font-bold tracking-widest text-black/40">Em Vendas</div>
                    </div>
                    <div>
                        <div class="serif text-5xl mb-2">150+</div>
                        <div class="text-[10px] uppercase font-bold tracking-widest text-black/40">Imóveis Únicos</div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <div class="aspect-[4/5] rounded-[60px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -top-10 -right-10 bg-black text-white p-12 rounded-[40px] shadow-2xl max-w-xs rotate-3">
                    <p class="serif text-2xl italic leading-relaxed">"Não vendemos metros quadrados, vendemos o cenário para os melhores momentos da sua vida."</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-40 px-8 bg-black text-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-32">
                <div class="text-white/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Depoimentos</div>
                <h2 class="serif text-7xl">O que dizem nossos <span class="italic">clientes</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-card p-12 rounded-[40px]">
                    <div class="serif text-5xl text-white/20 mb-8">"</div>
                    <p class="text-lg font-light leading-relaxed mb-12">"A Horizon entendeu exatamente o que buscávamos. O processo foi discreto, ágil e superou todas as expectativas."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-white/10"></div>
                        <div>
                            <div class="font-bold text-sm">Eduardo M.</div>
                            <div class="text-[10px] uppercase tracking-widest text-white/40">Empresário</div>
                        </div>
                    </div>
                </div>
                <div class="bg-card p-12 rounded-[40px]">
                    <div class="serif text-5xl text-white/20 mb-8">"</div>
                    <p class="text-lg font-light leading-relaxed mb-12">"Curadoria impecável. Cada imóvel visitado era uma obra de arte. Encontramos nossa casa dos sonhos em tempo recorde."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-white/10"></div>
                        <div>
                            <div class="font-bold text-sm">Letícia R.</div>
                            <div class="text-[10px] uppercase tracking-widest text-white/40">Arquiteta</div>
                        </div>
                    </div>
                </div>
                <div class="bg-card p-12 rounded-[40px]">
                    <div class="serif text-5xl text-white/20 mb-8">"</div>
                    <p class="text-lg font-light leading-relaxed mb-12">"O atendimento personalizado e o conhecimento profundo do mercado de luxo fazem da Horizon a melhor imobiliária do país."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-white/10"></div>
                        <div>
                            <div class="font-bold text-sm">Marcos V.</div>
                            <div class="text-[10px] uppercase tracking-widest text-white/40">Investidor</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-40 px-8 max-w-4xl mx-auto">
        <div class="text-center mb-24">
            <h2 class="serif text-5xl text-white">Perguntas Frequentes</h2>
        </div>
        <div class="space-y-8">
            <div class="bg-card p-8 rounded-3xl">
                <h4 class="serif text-2xl mb-4">Como funciona o processo de compra?</h4>
                <p class="text-white/40 leading-relaxed">Nossa equipe acompanha você desde a seleção do imóvel até a assinatura da escritura, garantindo total segurança jurídica e discrição.</p>
            </div>
            <div class="bg-card p-8 rounded-3xl">
                <h4 class="serif text-2xl mb-4">Vocês trabalham com imóveis internacionais?</h4>
                <p class="text-white/40 leading-relaxed">Sim, possuímos parcerias exclusivas em Miami, Lisboa e Dubai para clientes que buscam diversificação de patrimônio.</p>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-[#F8F9FA] text-black">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-black/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Mercado Imobiliário</div>
                    <h2 class="serif text-6xl">Tendências & <span class="italic">Análises</span></h2>
                </div>
                <button class="border border-black text-black px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all">Ver Blog</button>
            </div>
            <div class="grid md:grid-cols-2 gap-16">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="serif text-3xl mb-4 group-hover:text-black transition-colors">O futuro das mansões inteligentes em 2026</h3>
                    <p class="text-sm text-black/40 leading-relaxed">Como a tecnologia está redefinindo o conceito de luxo e conveniência...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1600607687940-467f5b637a53?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="serif text-3xl mb-4 group-hover:text-black transition-colors">Investir em imóveis de alto padrão: Guia Prático</h3>
                    <p class="text-sm text-black/40 leading-relaxed">Por que o mercado de luxo continua sendo o porto seguro dos investidores...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section class="py-32 px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <div class="text-black/40 text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Nossa Equipe</div>
                <h2 class="serif text-6xl">Especialistas em <span class="italic">Luxo</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-12">
                <div class="text-center space-y-6">
                    <div class="aspect-square rounded-full overflow-hidden max-w-[200px] mx-auto border-4 border-black/5">
                        <img src="https://i.pravatar.cc/300?u=1" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 class="serif text-2xl">Roberto Mendes</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">CEO & Founder</p>
                    </div>
                </div>
                <div class="text-center space-y-6">
                    <div class="aspect-square rounded-full overflow-hidden max-w-[200px] mx-auto border-4 border-black/5">
                        <img src="https://i.pravatar.cc/300?u=2" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 class="serif text-2xl">Juliana Silva</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">Diretora Comercial</p>
                    </div>
                </div>
                <div class="text-center space-y-6">
                    <div class="aspect-square rounded-full overflow-hidden max-w-[200px] mx-auto border-4 border-black/5">
                        <img src="https://i.pravatar.cc/300?u=3" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 class="serif text-2xl">André Santos</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">Especialista em Investimentos</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-60 px-8 text-center relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        <div class="relative z-10 max-w-4xl mx-auto space-y-16">
            <h2 class="serif text-7xl md:text-9xl leading-[0.9]">PRONTO PARA O SEU <br/><span class="italic">PRÓXIMO</span> CAPÍTULO?</h2>
            <div class="flex flex-col sm:flex-row justify-center gap-8">
                <button class="bg-white text-black px-16 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">Falar com um Consultor</button>
                <button class="border border-white/20 backdrop-blur-md px-16 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all">Ver Catálogo Completo</button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contato" class="py-32 px-8 border-t border-white/10">
        <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-20">
            <div class="col-span-2 space-y-10">
                <div class="serif text-4xl">HORIZON</div>
                <p class="text-white/40 max-w-sm text-sm leading-relaxed">Curadoria especializada em imóveis extraordinários para quem não aceita o comum.</p>
                <div class="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
                    <a href="#" class="hover:text-white transition-colors">Instagram</a>
                    <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" class="hover:text-white transition-colors">WhatsApp</a>
                </div>
            </div>
            <div class="space-y-8">
                <h5 class="text-[10px] uppercase font-bold tracking-widest text-white/40">Escritórios</h5>
                <p class="text-sm text-white/60 leading-relaxed">São Paulo • Rio de Janeiro • Miami</p>
            </div>
            <div class="space-y-8">
                <h5 class="text-[10px] uppercase font-bold tracking-widest text-white/40">Contato</h5>
                <p class="text-sm text-white/60 leading-relaxed">contato@horizonestates.com.br<br/>+55 11 99999-0000</p>
            </div>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'personal-trainer-elite',
    name: 'Elite Performance',
    category: 'Fitness',
    featured: true,
    description: 'Landing page de alta performance para personal trainers, com foco em resultados, planos e transformação.',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #000; color: #fff; }
        .display { font-family: 'Anton', sans-serif; }
        .text-neon { color: #CCFF00; }
        .bg-neon { background-color: #CCFF00; }
        .border-neon { border-color: #CCFF00; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="display text-2xl tracking-tighter">ELITE<span class="text-neon">PERF</span></div>
        <div class="hidden md:flex gap-10 text-[10px] uppercase font-bold tracking-widest text-white/50">
            <a href="#metodo" class="hover:text-neon transition-colors">Método</a>
            <a href="#resultados" class="hover:text-neon transition-colors">Resultados</a>
            <a href="#planos" class="hover:text-neon transition-colors">Planos</a>
        </div>
        <button class="bg-neon text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Consultoria</button>
    </nav>

    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div class="relative z-10 text-center px-6">
            <div class="text-neon text-xs uppercase font-bold tracking-[0.5em] mb-8">Treinamento de Elite</div>
            <h1 class="display text-[12vw] md:text-[15vw] leading-[0.8] mb-12 uppercase break-words">SUPERE SEUS <br/> <span class="text-neon">LIMITES</span></h1>
            <div class="flex flex-col sm:flex-row justify-center gap-6">
                <button class="w-full sm:w-auto bg-neon text-black px-12 py-5 font-bold uppercase text-sm hover:scale-105 transition-transform">Começar Agora</button>
                <button class="w-full sm:w-auto border border-white/20 px-12 py-5 font-bold uppercase text-sm hover:bg-white hover:text-black transition-all">Ver Resultados</button>
            </div>
        </div>
    </section>

    <section id="metodo" class="py-32 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-10">
            <div class="text-neon text-[10px] uppercase font-bold tracking-[0.4em]">Metodologia</div>
            <h2 class="display text-6xl uppercase leading-tight">Ciência aplicada ao <br/><span class="text-neon italic">movimento</span></h2>
            <p class="text-white/40 text-lg leading-relaxed">Não é apenas sobre levantar peso. É sobre biomecânica, fisiologia e consistência. Meu método é desenhado para transformar seu corpo e sua mente.</p>
            <div class="grid grid-cols-2 gap-8">
                <div>
                    <div class="display text-4xl text-neon mb-2">01</div>
                    <div class="text-[10px] uppercase font-bold tracking-widest text-white/60">Avaliação 360º</div>
                </div>
                <div>
                    <div class="display text-4xl text-neon mb-2">02</div>
                    <div class="text-[10px] uppercase font-bold tracking-widest text-white/60">Periodização</div>
                </div>
            </div>
        </div>
        <div class="relative">
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000" class="rounded-[40px] shadow-2xl" />
            <div class="absolute -bottom-10 -right-10 bg-neon text-black p-10 rounded-3xl shadow-2xl rotate-3">
                <div class="display text-4xl uppercase">100%</div>
                <p class="text-[10px] font-bold uppercase tracking-widest opacity-60">Foco em Resultado</p>
            </div>
        </div>
    </section>

    <section id="planos" class="py-32 px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <h2 class="display text-7xl uppercase">Escolha seu <span class="text-neon">Nível</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-12 border border-black/10 rounded-[40px] hover:shadow-2xl transition-all">
                    <div class="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-4">Online</div>
                    <div class="display text-5xl mb-8">R$ 197<span class="text-sm font-normal">/mês</span></div>
                    <ul class="space-y-4 mb-12 text-sm font-medium text-black/60">
                        <li>✓ Treino Personalizado</li>
                        <li>✓ App de Acompanhamento</li>
                        <li>✓ Suporte via Chat</li>
                    </ul>
                    <button class="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase text-xs tracking-widest">Assinar</button>
                </div>
                <div class="p-12 bg-black text-white rounded-[40px] shadow-2xl scale-105 relative overflow-hidden">
                    <div class="absolute top-6 right-6 bg-neon text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Elite</div>
                    <div class="text-[10px] uppercase font-bold tracking-widest text-neon mb-4">Presencial</div>
                    <div class="display text-5xl mb-8">R$ 597<span class="text-sm font-normal text-white/40">/mês</span></div>
                    <ul class="space-y-4 mb-12 text-sm font-medium text-white/60">
                        <li>✓ 3x por semana</li>
                        <li>✓ Avaliação Física Mensal</li>
                        <li>✓ Guia Nutricional</li>
                        <li>✓ Suporte 24/7</li>
                    </ul>
                    <button class="w-full py-4 bg-neon text-black rounded-2xl font-bold uppercase text-xs tracking-widest">Assinar</button>
                </div>
                <div class="p-12 border border-black/10 rounded-[40px] hover:shadow-2xl transition-all">
                    <div class="text-[10px] uppercase font-bold tracking-widest text-black/40 mb-4">VIP</div>
                    <div class="display text-5xl mb-8">R$ 997<span class="text-sm font-normal">/mês</span></div>
                    <ul class="space-y-4 mb-12 text-sm font-medium text-black/60">
                        <li>✓ Diário e Exclusivo</li>
                        <li>✓ Acompanhamento em Casa</li>
                        <li>✓ Planejamento de Atleta</li>
                    </ul>
                    <button class="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase text-xs tracking-widest">Assinar</button>
                </div>
            </div>
        </div>
    </section>

    <section id="resultados" class="py-32 px-8 bg-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-neon text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Resultados Reais</div>
                <h2 class="display text-7xl uppercase">Transformações</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white/5 p-8 rounded-[40px]">
                    <p class="text-lg italic mb-8">"Perdi 12kg em 3 meses e recuperei minha disposição. O acompanhamento é impecável."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-neon"></div>
                        <div>
                            <div class="font-bold">Ricardo S.</div>
                            <div class="text-[10px] uppercase text-white/40">Empresário</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/5 p-8 rounded-[40px]">
                    <p class="text-lg italic mb-8">"O melhor investimento que fiz na minha saúde. Treinos intensos e resultados visíveis."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-neon"></div>
                        <div>
                            <div class="font-bold">Juliana P.</div>
                            <div class="text-[10px] uppercase text-white/40">Advogada</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/5 p-8 rounded-[40px]">
                    <p class="text-lg italic mb-8">"Foco total na técnica. Minha performance no esporte mudou completamente."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-neon"></div>
                        <div>
                            <div class="font-bold">Felipe T.</div>
                            <div class="text-[10px] uppercase text-white/40">Atleta Amador</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-32 px-8 bg-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-neon text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Ambiente</div>
                <h2 class="display text-6xl italic">Onde a Mágica <span class="text-neon">Acontece</span></h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="aspect-square overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
                <div class="aspect-square overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
                <div class="aspect-square overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
                <div class="aspect-square overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-[#0A0A0A]">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-neon text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Conteúdo</div>
                    <h2 class="display text-6xl italic">Dicas de <span class="text-neon">Performance</span></h2>
                </div>
                <button class="border border-neon text-neon px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-neon hover:text-black transition-all">Ver Blog</button>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-3xl">
                        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="display text-3xl italic mb-4 group-hover:text-neon transition-colors">A importância do descanso no ganho de massa</h3>
                    <p class="text-sm text-white/40 leading-relaxed">Entenda por que o sono é tão importante quanto o treino...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-3xl">
                        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="display text-3xl italic mb-4 group-hover:text-neon transition-colors">Nutrição básica para iniciantes na academia</h3>
                    <p class="text-sm text-white/40 leading-relaxed">Como montar seu prato para ter energia e resultados...</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-black">
        <div class="max-w-3xl mx-auto">
            <h2 class="display text-5xl uppercase mb-16 text-center">Dúvidas <span class="text-neon">Frequentes</span></h2>
            <div class="space-y-8">
                <div class="border-b border-white/10 pb-8">
                    <h3 class="text-lg font-bold mb-4">Como funciona a consultoria online?</h3>
                    <p class="text-white/40">Você recebe seu treino via app, com vídeos explicativos e suporte direto comigo para ajustes semanais.</p>
                </div>
                <div class="border-b border-white/10 pb-8">
                    <h3 class="text-lg font-bold mb-4">Preciso de equipamentos para treinar em casa?</h3>
                    <p class="text-white/40">Não necessariamente. Adaptamos o treino de acordo com o que você tem disponível ou focamos em calistenia.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 text-center bg-neon text-black">
        <div class="max-w-4xl mx-auto">
            <h2 class="display text-7xl md:text-9xl uppercase leading-[0.8] mb-12">SEU NOVO CORPO <br/> COMEÇA <span class="italic">AGORA</span></h2>
            <button class="bg-black text-white px-16 py-6 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform">Agendar Avaliação</button>
        </div>
    </section>

    <footer class="py-20 px-8 border-t border-white/10 text-center">
        <div class="display text-4xl mb-8">ELITE<span class="text-neon">PERF</span></div>
        <div class="flex justify-center gap-8 text-[10px] uppercase font-bold tracking-widest text-white/40 mb-12">
            <a href="#" class="hover:text-white transition-colors">Instagram</a>
            <a href="#" class="hover:text-white transition-colors">YouTube</a>
            <a href="#" class="hover:text-white transition-colors">WhatsApp</a>
        </div>
        <div class="text-[8px] uppercase tracking-[0.5em] text-white/20">© 2026 Elite Performance. Design by Generatefy Studio</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'dental-clinic-elite',
    name: 'Odonto Premium',
    category: 'Saúde',
    description: 'Landing page clínica e sofisticada para dentistas, com serviços, tecnologia e agendamento online.',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; background-color: #fff; color: #1a1a1a; }
        .text-blue-premium { color: #0047AB; }
        .bg-blue-premium { background-color: #0047AB; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="text-2xl font-extrabold tracking-tighter text-blue-premium">ODONTO<span class="text-stone-900">PREMIUM</span></div>
            <div class="hidden md:flex gap-10 text-[10px] uppercase font-bold tracking-widest text-stone-400">
                <a href="#servicos" class="hover:text-blue-premium transition-colors">Serviços</a>
                <a href="#tecnologia" class="hover:text-blue-premium transition-colors">Tecnologia</a>
                <a href="#contato" class="hover:text-blue-premium transition-colors">Contato</a>
            </div>
            <button class="bg-blue-premium text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">Agendar Consulta</button>
        </div>
    </nav>

    <section class="pt-40 pb-32 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-8">
            <div class="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-[10px] font-bold text-blue-premium uppercase tracking-widest">Estética & Saúde Bucal</div>
            <h1 class="text-7xl font-extrabold leading-[0.9] tracking-tighter">O sorriso que você <br/><span class="text-blue-premium">sempre sonhou</span>.</h1>
            <p class="text-lg text-stone-500 max-w-md leading-relaxed">Tecnologia de ponta e atendimento humanizado para transformar sua autoestima através de um sorriso perfeito.</p>
            <div class="flex gap-6">
                <button class="bg-blue-premium text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-premium/20">Ver Tratamentos</button>
                <button class="bg-stone-100 text-stone-900 px-10 py-5 rounded-2xl font-bold text-lg">Nossa Clínica</button>
            </div>
        </div>
        <div class="relative">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" class="rounded-[40px] shadow-2xl" />
            <div class="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-stone-100">
                <div class="text-blue-premium text-4xl font-black mb-1">99%</div>
                <div class="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Pacientes Satisfeitos</div>
            </div>
        </div>
    </section>

    <section id="servicos" class="py-32 px-8 bg-stone-50">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <h2 class="text-5xl font-extrabold tracking-tighter">Especialidades <span class="text-blue-premium">Premium</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-premium mb-8">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Lentes de Contato</h3>
                    <p class="text-stone-500 text-sm leading-relaxed">Transformação total do sorriso com lâminas ultrafinas de porcelana.</p>
                </div>
                <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-premium mb-8">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Implantes</h3>
                    <p class="text-stone-500 text-sm leading-relaxed">Recupere sua função mastigatória e estética com segurança e precisão.</p>
                </div>
                <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-premium mb-8">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Invisalign</h3>
                    <p class="text-stone-500 text-sm leading-relaxed">Alinhamento dentário invisível, confortável e muito mais rápido.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-blue-premium text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Depoimentos</div>
                <h2 class="text-5xl font-extrabold tracking-tighter">Histórias de <span class="text-blue-premium">Sucesso</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-stone-50 p-10 rounded-[40px]">
                    <p class="text-stone-600 mb-8 leading-relaxed">"O atendimento é impecável e as lentes de contato ficaram super naturais. Recomendo a todos!"</p>
                    <div class="font-bold">Ana Paula S.</div>
                </div>
                <div class="bg-stone-50 p-10 rounded-[40px]">
                    <p class="text-stone-600 mb-8 leading-relaxed">"Fiz meu tratamento com Invisalign e o resultado foi muito mais rápido do que eu imaginava."</p>
                    <div class="font-bold">Carlos Eduardo</div>
                </div>
                <div class="bg-stone-50 p-10 rounded-[40px]">
                    <p class="text-stone-600 mb-8 leading-relaxed">"Clínica moderna e equipe muito atenciosa. Me senti segura desde a primeira consulta."</p>
                    <div class="font-bold">Mariana L.</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-stone-50">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-4xl font-extrabold tracking-tighter mb-16 text-center">Perguntas <span class="text-blue-premium">Frequentes</span></h2>
            <div class="space-y-6">
                <div class="bg-white p-8 rounded-3xl shadow-sm">
                    <h3 class="font-bold mb-2">Aceitam convênios médicos?</h3>
                    <p class="text-stone-500 text-sm">Trabalhamos com sistema de reembolso e alguns convênios selecionados. Entre em contato para verificar.</p>
                </div>
                <div class="bg-white p-8 rounded-3xl shadow-sm">
                    <h3 class="font-bold mb-2">Qual o tempo médio de um implante?</h3>
                    <p class="text-stone-500 text-sm">O processo varia de 3 a 6 meses, dependendo da cicatrização óssea de cada paciente.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 text-center bg-blue-premium text-white">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-6xl md:text-8xl font-extrabold tracking-tighter mb-12 leading-[0.9]">Pronto para sorrir <br/> com confiança?</h2>
            <button class="bg-white text-blue-premium px-16 py-6 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform">Marcar minha consulta</button>
        </div>
    </section>

    <footer class="py-20 px-8 border-t border-stone-100 text-center">
        <div class="text-2xl font-extrabold tracking-tighter text-blue-premium mb-8">ODONTO<span class="text-stone-900">PREMIUM</span></div>
        <p class="text-stone-400 text-sm mb-12">Av. das Nações, 5000 - Edifício Corporate, Sala 1201 - SP</p>
        <div class="text-[10px] uppercase tracking-[0.5em] text-stone-300">© 2026 Odonto Premium. Design by Generatefy Studio</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'architecture-elite',
    name: 'Studio Minimal',
    category: 'Arquitetura',
    featured: true,
    description: 'Landing page editorial e minimalista para estúdios de arquitetura e design de interiores.',
    thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #F9F9F9; color: #111; }
        .serif { font-family: 'Playfair Display', serif; }
        .line { height: 1px; background: #111; width: 0; transition: width 0.6s ease; }
        .group:hover .line { width: 100%; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="serif text-2xl font-bold tracking-tighter">STUDIO<span class="italic font-normal">MINIMAL</span></div>
        <div class="hidden md:flex gap-16 text-[10px] uppercase font-bold tracking-[0.3em]">
            <a href="#projetos" class="hover:opacity-50 transition-opacity">Projetos</a>
            <a href="#estudio" class="hover:opacity-50 transition-opacity">O Estúdio</a>
            <a href="#contato" class="hover:opacity-50 transition-opacity">Contato</a>
        </div>
    </nav>

    <section class="relative h-screen flex items-center px-12">
        <div class="max-w-4xl">
            <h1 class="serif text-[10vw] leading-[0.85] mb-12">Arquitetura <br/> que <span class="italic">respira</span>.</h1>
            <p class="text-xl font-light max-w-md leading-relaxed opacity-60">Criamos espaços que transcendem o tempo através do minimalismo, luz natural e materiais puros.</p>
        </div>
        <div class="absolute right-0 top-0 w-1/3 h-full overflow-hidden hidden lg:block">
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
        </div>
    </section>

    <section id="projetos" class="py-40 px-12">
        <div class="grid md:grid-cols-2 gap-24">
            <div class="group cursor-pointer">
                <div class="aspect-[16/10] overflow-hidden mb-8">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <h3 class="serif text-3xl mb-2">Casa do Lago</h3>
                        <p class="text-[10px] uppercase tracking-widest opacity-40">Residencial • 2025</p>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="group cursor-pointer pt-24">
                <div class="aspect-[16/10] overflow-hidden mb-8">
                    <img src="https://images.unsplash.com/photo-1600607687940-4e7a6a353029?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div class="flex justify-between items-end">
                    <div>
                        <h3 class="serif text-3xl mb-2">Edifício Horizonte</h3>
                        <p class="text-[10px] uppercase tracking-widest opacity-40">Comercial • 2024</p>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-12 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-32 items-center">
                <div>
                    <div class="text-[10px] uppercase font-bold tracking-[0.4em] mb-8">Reconhecimento</div>
                    <h2 class="serif text-6xl mb-12">O que dizem sobre <br/><span class="italic">nossa visão</span>.</h2>
                    <div class="space-y-12">
                        <div class="border-l-2 border-black pl-8">
                            <p class="text-xl font-light italic mb-4">"O Studio Minimal transformou nossa casa em um santuário de paz. A atenção aos detalhes é extraordinária."</p>
                            <div class="text-[10px] uppercase font-bold tracking-widest">Família Albuquerque</div>
                        </div>
                        <div class="border-l-2 border-black pl-8">
                            <p class="text-xl font-light italic mb-4">"Profissionalismo e estética impecável. O projeto do nosso escritório superou todas as expectativas."</p>
                            <div class="text-[10px] uppercase font-bold tracking-widest">CEO, Tech Horizon</div>
                        </div>
                    </div>
                </div>
                <div class="space-y-12">
                    <h3 class="serif text-4xl mb-8">FAQ</h3>
                    <div class="space-y-8">
                        <div>
                            <h4 class="font-bold text-sm uppercase tracking-widest mb-2">Como funciona o processo criativo?</h4>
                            <p class="text-sm opacity-60 leading-relaxed">Iniciamos com uma imersão no seu estilo de vida, seguida de estudos preliminares e detalhamento técnico rigoroso.</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm uppercase tracking-widest mb-2">Atendem projetos fora da cidade?</h4>
                            <p class="text-sm opacity-60 leading-relaxed">Sim, realizamos projetos em todo o território nacional e internacional, com gestão remota de alta precisão.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-60 px-12 text-center">
        <h2 class="serif text-[8vw] leading-none mb-16">Vamos criar algo <br/> <span class="italic">atemporal</span>?</h2>
        <button class="border border-black px-16 py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">Iniciar Projeto</button>
    </section>

    <footer class="py-20 px-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
        <div class="serif text-2xl font-bold">STUDIO<span class="italic font-normal">MINIMAL</span></div>
        <div class="text-[10px] uppercase tracking-[0.5em] opacity-20">© 2026 Studio Minimal. Crafted by Generatefy Studio</div>
        <div class="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
            <a href="#" class="hover:opacity-50 transition-opacity">Instagram</a>
            <a href="#" class="hover:opacity-50 transition-opacity">Behance</a>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'yoga-wellness-elite',
    name: 'Zen Flow',
    category: 'Bem-estar',
    featured: true,
    description: 'Landing page serena e orgânica para estúdios de yoga e práticas de bem-estar.',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #F5F5F0; color: #4A4A40; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .bg-zen { background-color: #E8E8E0; }
        .text-zen { color: #5A5A40; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="serif text-3xl italic text-zen">Zen Flow</div>
        <div class="hidden md:flex gap-12 text-[10px] uppercase font-bold tracking-widest opacity-60">
            <a href="#praticas" class="hover:text-zen transition-colors">Práticas</a>
            <a href="#horarios" class="hover:text-zen transition-colors">Horários</a>
            <a href="#contato" class="hover:text-zen transition-colors">Contato</a>
        </div>
        <button class="bg-zen text-zen px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zen/50 transition-all">Começar Agora</button>
    </nav>

    <section class="pt-40 pb-32 px-8 max-w-5xl mx-auto text-center space-y-12">
        <div class="text-zen text-[10px] uppercase font-bold tracking-[0.4em]">Encontre sua Paz</div>
        <h1 class="serif text-7xl md:text-9xl leading-tight">Respire. <br/> <span class="italic">Conecte-se</span>. <br/> Floresça.</h1>
        <p class="text-lg font-light max-w-xl mx-auto leading-relaxed opacity-70">Um refúgio urbano dedicado ao equilíbrio do corpo, mente e espírito através do Yoga e Meditação.</p>
        <div class="flex justify-center gap-8">
            <button class="bg-zen text-zen px-12 py-5 rounded-full font-bold text-sm hover:scale-105 transition-transform">Ver Práticas</button>
        </div>
    </section>

    <section id="praticas" class="py-32 px-8 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div class="space-y-6">
            <div class="aspect-[3/4] rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
            </div>
            <h3 class="serif text-3xl text-center">Hatha Yoga</h3>
        </div>
        <div class="space-y-6 pt-20">
            <div class="aspect-[3/4] rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
            </div>
            <h3 class="serif text-3xl text-center">Vinyasa Flow</h3>
        </div>
        <div class="space-y-6">
            <div class="aspect-[3/4] rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
            </div>
            <h3 class="serif text-3xl text-center">Meditação</h3>
        </div>
    </section>

    <section class="py-32 px-8 bg-zen/20">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-20">
                <h2 class="serif text-6xl">Palavras de <span class="italic">Luz</span></h2>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-6">
                    <p class="serif text-2xl italic leading-relaxed">"As aulas no Zen Flow mudaram minha relação com o estresse. Encontrei um equilíbrio que não achava ser possível."</p>
                    <div class="text-[10px] uppercase font-bold tracking-widest opacity-40">— Beatriz M.</div>
                </div>
                <div class="space-y-6">
                    <p class="serif text-2xl italic leading-relaxed">"Um ambiente acolhedor e instrutores que realmente se importam com nossa jornada individual."</p>
                    <div class="text-[10px] uppercase font-bold tracking-widest opacity-40">— Ricardo F.</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <div class="text-zen text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Nosso Espaço</div>
                <h2 class="serif text-6xl italic">Um Refúgio de <span class="italic">Serenidade</span></h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="aspect-[3/4] rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1545208393-21602d13b520?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
                <div class="aspect-[3/4] rounded-full overflow-hidden pt-12">
                    <img src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
                <div class="aspect-[3/4] rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
                <div class="aspect-[3/4] rounded-full overflow-hidden pt-12">
                    <img src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-[#F5F5F0]">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-zen text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Sabedoria</div>
                    <h2 class="serif text-6xl italic">Jornada Interior</h2>
                </div>
                <button class="border border-zen text-zen px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-zen hover:text-white transition-all">Ver Blog</button>
            </div>
            <div class="grid md:grid-cols-2 gap-16">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-[40px]">
                        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="serif text-3xl italic mb-4 group-hover:text-zen transition-colors">A arte do Pranayama: Respirando com consciência</h3>
                    <p class="text-sm opacity-60 leading-relaxed">Como o controle da respiração pode transformar seu estado mental...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-[40px]">
                        <img src="https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="serif text-3xl italic mb-4 group-hover:text-zen transition-colors">Meditação para mentes inquietas: Guia Prático</h3>
                    <p class="text-sm opacity-60 leading-relaxed">Dicas simples para começar a meditar mesmo com a rotina agitada...</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8">
        <div class="max-w-3xl mx-auto">
            <h2 class="serif text-5xl text-center mb-16">Dúvidas Comuns</h2>
            <div class="space-y-12">
                <div>
                    <h3 class="serif text-2xl mb-4">Nunca pratiquei yoga, posso começar?</h3>
                    <p class="text-sm opacity-60 leading-relaxed">Com certeza. Temos turmas específicas para iniciantes onde focamos nos fundamentos e na segurança de cada movimento.</p>
                </div>
                <div>
                    <h3 class="serif text-2xl mb-4">Quais materiais preciso levar?</h3>
                    <p class="text-sm opacity-60 leading-relaxed">Disponibilizamos todos os materiais necessários (mats, blocos, cintos). Você só precisa vir com roupas confortáveis.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 text-center bg-zen text-zen">
        <div class="max-w-3xl mx-auto">
            <h2 class="serif text-7xl mb-12 italic">Sua jornada de autodescoberta começa aqui.</h2>
            <button class="border border-zen px-16 py-6 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zen/20 transition-all">Agendar Aula Experimental</button>
        </div>
    </section>

    <footer class="py-20 px-8 border-t border-zen text-center">
        <div class="serif text-4xl italic text-zen mb-8">Zen Flow</div>
        <p class="text-sm opacity-50 mb-12">Rua da Calma, 108 - Vila Madalena, SP</p>
        <div class="text-[10px] uppercase tracking-[0.5em] opacity-30">© 2026 Zen Flow. Design by Generatefy Studio</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'beauty-salon-elite',
    name: 'Lumière Studio',
    category: 'Beleza',
    description: 'Landing page editorial e luxuosa para salões de beleza de alto padrão, com serviços, equipe e galeria.',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', sans-serif; background-color: #0A0A0A; color: #FFFFFF; }
        .serif { font-family: 'Playfair Display', serif; }
        .text-rose { color: #E5C1C1; }
        .bg-rose { background-color: #E5C1C1; }
        .border-rose { border-color: #E5C1C1; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="serif text-3xl font-medium tracking-tighter">LUMIÈRE</div>
        <div class="hidden md:flex gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-white/60">
            <a href="#servicos" class="hover:text-rose transition-colors">Serviços</a>
            <a href="#equipe" class="hover:text-rose transition-colors">Equipe</a>
            <a href="#depoimentos" class="hover:text-rose transition-colors">Depoimentos</a>
        </div>
        <button class="border border-rose text-rose px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-rose hover:text-black transition-all">Agendar</button>
    </nav>

    <!-- Hero -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover opacity-50 scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
        <div class="relative z-10 text-center px-8">
            <div class="text-rose text-xs uppercase font-bold tracking-[0.5em] mb-8">Beleza • Arte • Sofisticação</div>
            <h1 class="serif text-[12vw] leading-[0.8] mb-12 italic">Sua beleza em <br/> <span class="not-italic">evidência.</span></h1>
            <button class="bg-rose text-black px-12 py-5 font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-rose/20">Descobrir Experiência</button>
        </div>
    </section>

    <!-- Services -->
    <section id="servicos" class="py-40 px-8 max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-32 items-end mb-32">
            <div class="max-w-xl">
                <div class="text-rose text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Nossos Serviços</div>
                <h2 class="serif text-7xl leading-tight">A arte de <br/><span class="text-rose italic">transformar</span></h2>
            </div>
            <p class="text-white/40 text-lg leading-relaxed font-light">Combinamos as técnicas mais avançadas do mundo com um atendimento personalizado para realçar sua identidade única.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-1">
            <div class="group relative aspect-[3/4] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div class="absolute bottom-10 left-10">
                    <h3 class="serif text-3xl mb-2">Hairstyle</h3>
                    <p class="text-[10px] uppercase tracking-widest text-rose font-bold">Corte & Coloração</p>
                </div>
            </div>
            <div class="group relative aspect-[3/4] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div class="absolute bottom-10 left-10">
                    <h3 class="serif text-3xl mb-2">Makeup</h3>
                    <p class="text-[10px] uppercase tracking-widest text-rose font-bold">Editorial & Social</p>
                </div>
            </div>
            <div class="group relative aspect-[3/4] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div class="absolute bottom-10 left-10">
                    <h3 class="serif text-3xl mb-2">Estética</h3>
                    <p class="text-[10px] uppercase tracking-widest text-rose font-bold">Cuidados Faciais</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team -->
    <section id="equipe" class="py-40 px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-32">
                <div class="text-rose text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Especialistas</div>
                <h2 class="serif text-7xl italic">Mestres da Beleza</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-24">
                <div class="space-y-8">
                    <div class="aspect-[4/5] overflow-hidden rounded-[60px]">
                        <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex justify-between items-end">
                        <h4 class="serif text-4xl">Isabella Lumière</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">Founder & Creative Director</p>
                    </div>
                </div>
                <div class="space-y-8 pt-24">
                    <div class="aspect-[4/5] overflow-hidden rounded-[60px]">
                        <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex justify-between items-end">
                        <h4 class="serif text-4xl">Marcus Viana</h4>
                        <p class="text-[10px] uppercase tracking-widest text-black/40 font-bold">Master Colorist</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="depoimentos" class="py-40 px-8 bg-black text-white">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-32 items-center">
                <div class="serif text-6xl leading-tight italic">"O Lumière não é apenas um salão, é onde eu reencontro minha melhor versão."</div>
                <div class="space-y-12">
                    <div class="border-l-2 border-rose pl-12">
                        <p class="text-xl font-light italic mb-6">"Atendimento impecável e técnica inigualável. Isabella tem um olhar artístico que transforma qualquer visual."</p>
                        <div class="text-[10px] uppercase tracking-widest font-bold text-rose">Sophia Albuquerque</div>
                    </div>
                    <div class="border-l-2 border-rose pl-12">
                        <p class="text-xl font-light italic mb-6">"O ambiente é acolhedor e luxuoso. Saio sempre me sentindo renovada e confiante."</p>
                        <div class="text-[10px] uppercase tracking-widest font-bold text-rose">Mariana Costa</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-rose text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Tendências</div>
                    <h2 class="serif text-6xl italic">Inspiração & <span class="italic">Cuidado</span></h2>
                </div>
                <button class="border border-black text-black px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all">Ver Blog</button>
            </div>
            <div class="grid md:grid-cols-2 gap-16">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-[60px]">
                        <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="serif text-3xl italic mb-4 group-hover:text-rose transition-colors">Cronograma Capilar: O guia definitivo para fios saudáveis</h3>
                    <p class="text-sm text-black/40 leading-relaxed">Como recuperar a saúde do seu cabelo em 4 semanas com passos simples...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-[60px]">
                        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="serif text-3xl italic mb-4 group-hover:text-rose transition-colors">Maquiagem Editorial: Tendências para a próxima estação</h3>
                    <p class="text-sm text-black/40 leading-relaxed">As cores e texturas que vão dominar as passarelas e o seu dia a dia...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-40 px-8 max-w-4xl mx-auto">
        <div class="text-center mb-24">
            <h2 class="serif text-5xl italic">Dúvidas Frequentes</h2>
        </div>
        <div class="space-y-12">
            <div class="border-b border-white/10 pb-12">
                <h4 class="serif text-2xl mb-4">Como funciona o agendamento?</h4>
                <p class="text-white/40 leading-relaxed">Você pode agendar diretamente pelo nosso site ou via WhatsApp. Recomendamos antecedência de 48h para garantir seu horário preferido.</p>
            </div>
            <div class="border-b border-white/10 pb-12">
                <h4 class="serif text-2xl mb-4">Vocês trabalham com eventos?</h4>
                <p class="text-white/40 leading-relaxed">Sim, possuímos pacotes exclusivos para noivas, formandas e eventos corporativos, com atendimento VIP no local ou no estúdio.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-40 px-8 text-center bg-rose text-black">
        <div class="max-w-4xl mx-auto space-y-12">
            <h2 class="serif text-8xl leading-[0.8] italic">Sua beleza merece <br/> o extraordinário.</h2>
            <button class="bg-black text-white px-16 py-6 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform">Agendar Minha Experiência</button>
        </div>
    </section>

    <footer class="py-20 px-8 border-t border-white/5 text-center">
        <div class="serif text-4xl mb-8">LUMIÈRE</div>
        <div class="flex justify-center gap-12 text-[10px] uppercase font-bold tracking-widest text-white/30 mb-12">
            <a href="#" class="hover:text-rose transition-colors">Instagram</a>
            <a href="#" class="hover:text-rose transition-colors">Facebook</a>
            <a href="#" class="hover:text-rose transition-colors">WhatsApp</a>
        </div>
        <div class="text-[8px] uppercase tracking-[0.5em] text-white/20">© 2026 Lumière Studio. Crafted by Generatefy Studio</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'pet-shop-elite',
    name: 'Paws & Co',
    category: 'Pet Shop',
    description: 'Landing page divertida e profissional para pet shops e clínicas veterinárias, com serviços, planos e agendamento.',
    thumbnail: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #F8F9FA; }
        .display { font-family: 'Fredoka', sans-serif; }
        .text-orange { color: #FF7A45; }
        .bg-orange { background-color: #FF7A45; }
        .bg-cream { background-color: #FFF9F5; }
    </style>
</head>
<body class="antialiased text-slate-900 overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="display text-3xl text-orange font-bold">PAWS<span class="text-slate-900">&CO</span></div>
            <div class="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
                <a href="#servicos" class="hover:text-orange transition-colors">Serviços</a>
                <a href="#planos" class="hover:text-orange transition-colors">Planos</a>
                <a href="#contato" class="hover:text-orange transition-colors">Contato</a>
            </div>
            <button class="bg-orange text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-orange/20">Agendar Banho</button>
        </div>
    </nav>

    <!-- Hero -->
    <section class="pt-40 pb-20 px-8 bg-cream relative overflow-hidden">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div class="space-y-10 relative z-10">
                <div class="inline-block px-4 py-2 bg-orange/10 rounded-full text-orange text-xs font-bold uppercase tracking-widest">Amor em cada detalhe</div>
                <h1 class="display text-7xl md:text-8xl leading-[0.9] font-bold text-slate-900">Onde seu pet se sente <span class="text-orange">em casa.</span></h1>
                <p class="text-xl text-slate-500 leading-relaxed max-w-md">Oferecemos os melhores cuidados, mimos e atenção que seu melhor amigo merece. Do banho à saúde, estamos aqui.</p>
                <div class="flex gap-6">
                    <button class="bg-orange text-white px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-orange/30">Ver Serviços</button>
                    <button class="bg-white text-slate-900 px-12 py-5 rounded-2xl font-bold text-lg border border-slate-100 hover:bg-slate-50 transition-all">Nossa Clínica</button>
                </div>
            </div>
            <div class="relative">
                <div class="aspect-square rounded-[80px] overflow-hidden shadow-2xl relative z-10 rotate-3">
                    <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 flex items-center gap-4">
                    <div class="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white font-bold">★</div>
                    <div>
                        <div class="font-bold">4.9/5 Estrelas</div>
                        <div class="text-[10px] uppercase text-slate-400 font-bold">Baseado em 500+ avaliações</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section id="servicos" class="py-32 px-8 max-w-7xl mx-auto">
        <div class="text-center mb-24">
            <h2 class="display text-6xl font-bold mb-6">Tudo o que eles <span class="text-orange">amam</span></h2>
            <p class="text-slate-500 max-w-xl mx-auto">Uma gama completa de serviços para garantir a felicidade e o bem-estar do seu pet.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-50 group">
                <div class="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="display text-3xl font-bold mb-4">Banho & Tosa</h3>
                <p class="text-slate-500 leading-relaxed mb-8">Produtos hipoalergênicos e profissionais especializados em todas as raças.</p>
                <div class="text-orange font-bold text-xs uppercase tracking-widest">Saiba Mais →</div>
            </div>
            <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-50 group">
                <div class="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 class="display text-3xl font-bold mb-4">Veterinária</h3>
                <p class="text-slate-500 leading-relaxed mb-8">Consultas preventivas, vacinação e exames com equipamentos de ponta.</p>
                <div class="text-orange font-bold text-xs uppercase tracking-widest">Saiba Mais →</div>
            </div>
            <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-slate-50 group">
                <div class="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </div>
                <h3 class="display text-3xl font-bold mb-4">Hotel Pet</h3>
                <p class="text-slate-500 leading-relaxed mb-8">Um espaço seguro e divertido para seu pet ficar enquanto você viaja.</p>
                <div class="text-orange font-bold text-xs uppercase tracking-widest">Saiba Mais →</div>
            </div>
        </div>
    </section>

    <!-- Plans -->
    <section id="planos" class="py-32 px-8 bg-slate-900 text-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <h2 class="display text-6xl font-bold mb-6">Planos de <span class="text-orange">Cuidado</span></h2>
                <p class="text-slate-400">Economize e garanta o melhor para seu pet o ano todo.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white/5 p-12 rounded-[40px] border border-white/10">
                    <div class="text-orange text-xs font-bold uppercase tracking-widest mb-4">Essencial</div>
                    <div class="display text-5xl font-bold mb-8">R$ 149<span class="text-sm font-normal text-slate-500">/mês</span></div>
                    <ul class="space-y-4 mb-12 text-slate-400 text-sm">
                        <li>✓ 2 Banhos por mês</li>
                        <li>✓ 1 Tosa Higiênica</li>
                        <li>✓ 10% OFF em Produtos</li>
                    </ul>
                    <button class="w-full py-4 bg-white/10 rounded-2xl font-bold hover:bg-orange transition-colors">Assinar</button>
                </div>
                <div class="bg-orange p-12 rounded-[40px] shadow-2xl scale-105 relative overflow-hidden">
                    <div class="absolute top-6 right-6 bg-white text-orange text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Recomendado</div>
                    <div class="text-white/80 text-xs font-bold uppercase tracking-widest mb-4">Premium</div>
                    <div class="display text-5xl font-bold mb-8 text-white">R$ 249<span class="text-sm font-normal text-white/60">/mês</span></div>
                    <ul class="space-y-4 mb-12 text-white/80 text-sm">
                        <li>✓ 4 Banhos por mês</li>
                        <li>✓ Tosa Completa</li>
                        <li>✓ Consulta Vet Inclusa</li>
                        <li>✓ 20% OFF em Produtos</li>
                    </ul>
                    <button class="w-full py-4 bg-white text-orange rounded-2xl font-bold hover:scale-105 transition-transform">Assinar</button>
                </div>
                <div class="bg-white/5 p-12 rounded-[40px] border border-white/10">
                    <div class="text-orange text-xs font-bold uppercase tracking-widest mb-4">VIP</div>
                    <div class="display text-5xl font-bold mb-8 text-white">R$ 399<span class="text-sm font-normal text-slate-500">/mês</span></div>
                    <ul class="space-y-4 mb-12 text-slate-400 text-sm">
                        <li>✓ Banhos Ilimitados</li>
                        <li>✓ Tosa Ilimitada</li>
                        <li>✓ Check-up Semestral</li>
                        <li>✓ Leva e Traz Grátis</li>
                    </ul>
                    <button class="w-full py-4 bg-white/10 rounded-2xl font-bold hover:bg-orange transition-colors">Assinar</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <h2 class="display text-6xl font-bold">Amigos <span class="text-orange">Felizes</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-cream p-12 rounded-[40px] border border-orange/10">
                    <p class="text-lg italic mb-8">"O melhor pet shop que já levei o Thor. Ele volta sempre cheiroso e muito feliz!"</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-orange/20"></div>
                        <div>
                            <div class="font-bold">Carla Lima</div>
                            <div class="text-[10px] uppercase text-slate-400 font-bold">Dona do Thor (Golden)</div>
                        </div>
                    </div>
                </div>
                <div class="bg-cream p-12 rounded-[40px] border border-orange/10">
                    <p class="text-lg italic mb-8">"A equipe veterinária é muito atenciosa e competente. Confio de olhos fechados."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-orange/20"></div>
                        <div>
                            <div class="font-bold">João Pedro</div>
                            <div class="text-[10px] uppercase text-slate-400 font-bold">Dono da Luna (Persa)</div>
                        </div>
                    </div>
                </div>
                <div class="bg-cream p-12 rounded-[40px] border border-orange/10">
                    <p class="text-lg italic mb-8">"O hotel pet salvou minhas férias. Recebi fotos e vídeos todos os dias!"</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-orange/20"></div>
                        <div>
                            <div class="font-bold">Beatriz S.</div>
                            <div class="text-[10px] uppercase text-slate-400 font-bold">Dona do Max (Beagle)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="py-32 px-8 bg-cream">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div class="max-w-xl">
                    <div class="text-orange text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Dicas Pet</div>
                    <h2 class="display text-6xl font-bold">Patinhas & <span class="text-orange">Curiosidades</span></h2>
                </div>
                <button class="border-2 border-orange text-orange px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-orange hover:text-white transition-all rounded-full">Ver Blog</button>
            </div>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-[40px]">
                        <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="display text-3xl font-bold mb-4 group-hover:text-orange transition-colors">Como preparar seu pet para a primeira tosa</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Dicas para reduzir a ansiedade e tornar o momento tranquilo...</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-video overflow-hidden mb-8 rounded-[40px]">
                        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 class="display text-3xl font-bold mb-4 group-hover:text-orange transition-colors">Alimentação Natural: Vale a pena para seu cão?</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Os prós e contras de mudar a dieta do seu melhor amigo...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-32 px-8 max-w-4xl mx-auto">
        <div class="text-center mb-20">
            <h2 class="display text-5xl font-bold">Dúvidas Frequentes</h2>
        </div>
        <div class="space-y-8">
            <div class="border-b border-slate-100 pb-8">
                <h4 class="display text-2xl font-bold text-orange mb-4">Como funciona o serviço de Leva e Traz?</h4>
                <p class="text-slate-500 leading-relaxed">Buscamos seu pet em casa com segurança e o levamos de volta após o serviço, em veículos adaptados e climatizados.</p>
            </div>
            <div class="border-b border-slate-100 pb-8">
                <h4 class="display text-2xl font-bold text-orange mb-4">Quais vacinas são obrigatórias para o Hotel?</h4>
                <p class="text-slate-500 leading-relaxed">Para a segurança de todos, exigimos V10/V8, Raiva e Gripe em dia, além de vermifugação e controle de ectoparasitas.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 px-8 bg-orange text-white text-center">
        <div class="max-w-4xl mx-auto space-y-12">
            <h2 class="display text-7xl font-bold leading-[0.9]">Seu pet merece <br/> esse carinho.</h2>
            <button class="bg-white text-orange px-16 py-6 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">Agendar Agora</button>
        </div>
    </section>

    <footer id="contato" class="py-20 px-8 bg-slate-900 text-white text-center">
        <div class="display text-4xl font-bold text-orange mb-8">PAWS<span class="text-white">&CO</span></div>
        <p class="text-slate-400 mb-12">Rua das Patas, 456 - Pinheiros, São Paulo - SP</p>
        <div class="text-[10px] uppercase tracking-[0.5em] text-white/20">© 2026 Paws & Co. Design by Generatefy Studio</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'psychologist-elite-2',
    name: 'Mindful Space',
    category: 'Psicologia',
    description: 'Design minimalista e moderno focado em mindfulness e terapia cognitiva, com estética clean e tons suaves.',
    thumbnail: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; }
        .bg-zen { background-color: #F8F9FA; }
        .text-indigo-soft { color: #5C6BC0; }
        .bg-indigo-soft { background-color: #5C6BC0; }
    </style>
</head>
<body class="bg-zen text-slate-900 antialiased overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="text-2xl font-bold tracking-tighter">MINDFUL<span class="text-indigo-soft">SPACE</span></div>
            <div class="hidden md:flex gap-10 text-xs font-semibold uppercase tracking-widest">
                <a href="#inicio" class="hover:text-indigo-soft transition-colors">Início</a>
                <a href="#metodo" class="hover:text-indigo-soft transition-colors">Método</a>
                <a href="#jornada" class="hover:text-indigo-soft transition-colors">Jornada</a>
                <a href="#contato" class="hover:text-indigo-soft transition-colors text-indigo-soft">Agendar</a>
            </div>
        </div>
    </nav>

    <section id="inicio" class="pt-48 pb-32 px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div class="space-y-10">
                <h1 class="text-7xl md:text-8xl font-bold leading-[0.85] tracking-tighter">Respire. <br/> <span class="text-indigo-soft">Reconecte.</span> <br/> Evolua.</h1>
                <p class="text-xl text-slate-500 max-w-md leading-relaxed">Terapia moderna focada em resultados reais através da atenção plena e autoconhecimento profundo.</p>
                <div class="flex gap-4">
                    <button class="bg-indigo-soft text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-soft/30 transition-all">Iniciar Terapia</button>
                    <button class="border-2 border-slate-200 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all">Saiba Mais</button>
                </div>
            </div>
            <div class="relative">
                <div class="aspect-square rounded-[60px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-10 -right-10 bg-white p-10 rounded-[40px] shadow-2xl max-w-xs">
                    <div class="flex gap-1 mb-4">
                        <div class="w-2 h-2 rounded-full bg-indigo-soft"></div>
                        <div class="w-2 h-2 rounded-full bg-indigo-soft opacity-40"></div>
                        <div class="w-2 h-2 rounded-full bg-indigo-soft opacity-20"></div>
                    </div>
                    <p class="text-sm font-medium text-slate-600 italic">"A clareza mental é o primeiro passo para a liberdade emocional."</p>
                </div>
            </div>
        </div>
    </section>

    <section id="metodo" class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center max-w-3xl mx-auto mb-24 space-y-4">
                <h2 class="text-5xl font-bold tracking-tight">Abordagem Contemporânea</h2>
                <p class="text-slate-500">Unimos ciência e sensibilidade para criar um plano terapêutico único para você.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-12 rounded-[40px] bg-zen hover:bg-indigo-soft hover:text-white transition-all group">
                    <div class="w-12 h-12 bg-indigo-soft/10 rounded-2xl mb-8 group-hover:bg-white/20 transition-colors"></div>
                    <h3 class="text-2xl font-bold mb-4">Cognitivo Comportamental</h3>
                    <p class="opacity-60">Foco em padrões de pensamento e mudanças práticas no dia a dia.</p>
                </div>
                <div class="p-12 rounded-[40px] bg-zen hover:bg-indigo-soft hover:text-white transition-all group">
                    <div class="w-12 h-12 bg-indigo-soft/10 rounded-2xl mb-8 group-hover:bg-white/20 transition-colors"></div>
                    <h3 class="text-2xl font-bold mb-4">Mindfulness & Presença</h3>
                    <p class="opacity-60">Técnicas de atenção plena para redução de ansiedade e estresse.</p>
                </div>
                <div class="p-12 rounded-[40px] bg-zen hover:bg-indigo-soft hover:text-white transition-all group">
                    <div class="w-12 h-12 bg-indigo-soft/10 rounded-2xl mb-8 group-hover:bg-white/20 transition-colors"></div>
                    <h3 class="text-2xl font-bold mb-4">Psicologia Positiva</h3>
                    <p class="opacity-60">Foco nas virtudes e no florescimento do potencial humano.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-slate-50">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <h2 class="text-5xl font-bold tracking-tight">Depoimentos</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-12 rounded-[40px] shadow-sm">
                    <p class="text-lg italic text-slate-600 mb-8">"A terapia com o Mindful Space mudou minha perspectiva sobre a ansiedade. Hoje me sinto muito mais no controle das minhas emoções."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-indigo-soft/20"></div>
                        <div>
                            <div class="font-bold">Carla S.</div>
                            <div class="text-xs text-slate-400">Paciente há 6 meses</div>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-12 rounded-[40px] shadow-sm">
                    <p class="text-lg italic text-slate-600 mb-8">"Um ambiente acolhedor e profissional. Sinto que finalmente encontrei um lugar onde posso ser eu mesma sem julgamentos."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-indigo-soft/20"></div>
                        <div>
                            <div class="font-bold">Marcos R.</div>
                            <div class="text-xs text-slate-400">Paciente há 1 ano</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">Dúvidas Frequentes</h2>
        <div class="space-y-8">
            <div class="border-b border-slate-100 pb-6">
                <h4 class="font-bold text-lg mb-2">Como agendar a primeira sessão?</h4>
                <p class="text-slate-500">Basta clicar no botão de agendamento e escolher o melhor horário para você.</p>
            </div>
            <div class="border-b border-slate-100 pb-6">
                <h4 class="font-bold text-lg mb-2">As sessões são online ou presenciais?</h4>
                <p class="text-slate-500">Oferecemos ambas as modalidades, garantindo flexibilidade para sua rotina.</p>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-indigo-soft text-white text-center">
        <div class="max-w-4xl mx-auto space-y-10">
            <h2 class="text-6xl font-bold leading-tight tracking-tighter">Sua jornada de <br/> cura começa aqui.</h2>
            <button class="bg-white text-indigo-soft px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">Agendar Conversa Inicial</button>
        </div>
    </section>

    <footer class="py-20 px-8 bg-slate-900 text-white text-center">
        <div class="text-2xl font-bold mb-8">MINDFUL<span class="text-indigo-soft">SPACE</span></div>
        <p class="opacity-40 text-sm">© 2026 Mindful Space. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'nutritionist-elite-2',
    name: 'Vibrant Health',
    category: 'Nutrição',
    description: 'Template focado em performance e energia, com cores vibrantes e foco em resultados esportivos e bem-estar.',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .text-lime { color: #C0FF00; }
        .bg-lime { background-color: #C0FF00; }
    </style>
</head>
<body class="bg-black text-white antialiased overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="text-2xl font-black italic tracking-tighter">VIBRANT<span class="text-lime">FUEL</span></div>
            <button class="bg-lime text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-tighter hover:scale-105 transition-transform">Agendar Agora</button>
        </div>
    </nav>

    <section class="pt-48 pb-32 px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-10">
                    <div class="inline-block px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-lime">Performance & Saúde</div>
                    <h1 class="text-8xl md:text-9xl font-black italic leading-[0.8] tracking-tighter">COMIDA <br/> É <span class="text-lime">PODER.</span></h1>
                    <p class="text-xl text-white/60 max-w-md">Transforme seu corpo e sua mente através de uma nutrição estratégica e sem restrições absurdas.</p>
                    <div class="flex gap-6">
                        <button class="bg-lime text-black px-12 py-6 rounded-2xl font-black text-lg hover:rotate-2 transition-transform">QUERO RESULTADOS</button>
                    </div>
                </div>
                <div class="relative">
                    <div class="aspect-[3/4] rounded-[60px] overflow-hidden border-4 border-lime/20">
                        <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute -top-10 -right-10 bg-lime text-black p-8 rounded-full w-40 h-40 flex flex-col items-center justify-center rotate-12">
                        <span class="text-4xl font-black">-15kg</span>
                        <span class="text-[10px] font-bold uppercase">Média de Alunos</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white text-black rounded-t-[80px]">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <h2 class="text-6xl font-black italic leading-none tracking-tighter">MÉTODO <br/> <span class="text-lime bg-black px-4">VIBRANT</span></h2>
                <p class="max-w-md text-black/60 font-medium">Esqueça as dietas de gaveta. Criamos um ecossistema de nutrição focado no seu estilo de vida.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-10 bg-black text-white rounded-[40px] space-y-6">
                    <div class="text-5xl font-black text-lime">01</div>
                    <h3 class="text-2xl font-bold italic">Bio-Individualidade</h3>
                    <p class="opacity-60">Análise profunda do seu metabolismo e rotina.</p>
                </div>
                <div class="p-10 bg-black text-white rounded-[40px] space-y-6">
                    <div class="text-5xl font-black text-lime">02</div>
                    <h3 class="text-2xl font-bold italic">Suporte 24/7</h3>
                    <p class="opacity-60">Acompanhamento via app para tirar todas as suas dúvidas.</p>
                </div>
                <div class="p-10 bg-black text-white rounded-[40px] space-y-6">
                    <div class="text-5xl font-black text-lime">03</div>
                    <h3 class="text-2xl font-bold italic">Foco em Performance</h3>
                    <p class="opacity-60">Nutrição desenhada para você render mais no treino e no trabalho.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-black text-white">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
                <h2 class="text-6xl font-black italic tracking-tighter">RESULTADOS <span class="text-lime">REAIS</span></h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-10 bg-white/5 rounded-[40px] border border-white/10">
                    <p class="text-lg italic mb-8 opacity-60">"Minha energia nos treinos dobrou depois que comecei o acompanhamento. O plano é super fácil de seguir!"</p>
                    <div class="font-bold">Felipe M.</div>
                </div>
                <div class="p-10 bg-white/5 rounded-[40px] border border-white/10">
                    <p class="text-lg italic mb-8 opacity-60">"Finalmente consegui emagrecer sem passar fome. A nutri entende perfeitamente minha rotina corrida."</p>
                    <div class="font-bold">Beatriz L.</div>
                </div>
                <div class="p-10 bg-white/5 rounded-[40px] border border-white/10">
                    <p class="text-lg italic mb-8 opacity-60">"O suporte via app é o diferencial. Sinto que tenho uma guia 24h por dia."</p>
                    <div class="font-bold">Gustavo P.</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white text-black">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-5xl font-black italic text-center mb-16">FAQ</h2>
            <div class="space-y-8">
                <div class="border-b border-black/10 pb-6">
                    <h4 class="font-bold text-xl mb-2">Preciso de suplementos?</h4>
                    <p class="opacity-60">Apenas se houver necessidade real identificada nos seus exames.</p>
                </div>
                <div class="border-b border-black/10 pb-6">
                    <h4 class="font-bold text-xl mb-2">Como funciona o app?</h4>
                    <p class="opacity-60">Lá você terá seu plano, lista de compras e chat direto para dúvidas.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-lime text-black text-center">
        <h2 class="text-7xl font-black italic mb-10">VAMOS NESSA?</h2>
        <button class="bg-black text-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-transform">QUERO MEU PLANO</button>
    </section>

    <footer class="py-20 px-8 bg-black text-white text-center">
        <div class="text-2xl font-black italic mb-8">VIBRANT<span class="text-lime">FUEL</span></div>
        <div class="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
            <a href="#">E-mail</a>
        </div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'barber-elite-2',
    name: 'Urban Blade',
    category: 'Barbearia',
    description: 'Estilo industrial e urbano, focado em um público jovem e moderno. Visual escuro com detalhes em neon.',
    thumbnail: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        body { font-family: 'Inter', sans-serif; }
        .neon-border { border: 1px solid #00FF00; box-shadow: 0 0 15px rgba(0, 255, 0, 0.2); }
        .text-neon { color: #00FF00; text-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
        .bg-neon { background-color: #00FF00; }
    </style>
</head>
<body class="bg-[#0A0A0A] text-white antialiased overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div class="font-bebas text-4xl tracking-widest">URBAN<span class="text-neon">BLADE</span></div>
            <div class="hidden md:flex gap-8 font-bebas text-xl tracking-widest">
                <a href="#servicos" class="hover:text-neon transition-colors">Serviços</a>
                <a href="#galeria" class="hover:text-neon transition-colors">Galeria</a>
                <a href="#contato" class="hover:text-neon transition-colors">Contato</a>
            </div>
            <button class="bg-neon text-black px-6 py-2 font-bebas text-xl tracking-widest hover:scale-105 transition-transform">RESERVAR</button>
        </div>
    </nav>

    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1512690196252-751d3948f4ec?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-30" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
        </div>
        <div class="relative z-10 text-center space-y-6 px-4 md:px-8">
            <h1 class="font-bebas text-6xl md:text-[15vw] leading-none tracking-tighter break-words">CORTE <span class="text-neon">AFIADO</span></h1>
            <p class="text-lg md:text-xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-60">Estilo Urbano • Atitude • Precisão</p>
            <div class="pt-10">
                <button class="bg-neon text-black px-8 md:px-12 py-4 font-bebas text-2xl md:text-3xl tracking-widest hover:shadow-[0_0_30px_rgba(0,255,0,0.4)] transition-all">AGENDAR AGORA</button>
            </div>
        </div>
    </section>

    <section id="servicos" class="py-20 md:py-32 px-4 md:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div class="space-y-8">
                    <h2 class="font-bebas text-5xl md:text-7xl tracking-widest break-words">O QUE <span class="text-neon">FAZEMOS</span></h2>
                    <div class="space-y-6">
                        <div class="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer">
                            <div>
                                <h3 class="font-bebas text-3xl group-hover:text-neon transition-colors">Corte Urban</h3>
                                <p class="text-sm opacity-40">Degradê, tesoura ou máquina.</p>
                            </div>
                            <span class="font-bebas text-3xl text-neon">R$ 60</span>
                        </div>
                        <div class="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer">
                            <div>
                                <h3 class="font-bebas text-3xl group-hover:text-neon transition-colors">Barba de Respeito</h3>
                                <p class="text-sm opacity-40">Toalha quente e navalha.</p>
                            </div>
                            <span class="font-bebas text-3xl text-neon">R$ 45</span>
                        </div>
                        <div class="flex justify-between items-end border-b border-white/10 pb-4 group cursor-pointer">
                            <div>
                                <h3 class="font-bebas text-3xl group-hover:text-neon transition-colors">Combo Master</h3>
                                <p class="text-sm opacity-40">Corte + Barba + Hidratação.</p>
                            </div>
                            <span class="font-bebas text-3xl text-neon">R$ 95</span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1599351431247-f10b21816381?auto=format&fit=crop&q=80&w=600" class="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                    <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600" class="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 mt-12" />
                </div>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <h2 class="font-bebas text-5xl md:text-7xl tracking-widest text-center mb-12 md:mb-20 break-words">QUEM <span class="text-neon bg-black px-4">CONFIA</span></h2>
            <div class="grid md:grid-cols-2 gap-6 md:gap-8">
                <div class="p-8 md:p-12 border-2 border-black rounded-2xl">
                    <p class="text-lg md:text-xl font-bold italic mb-8">"Melhor degradê da cidade. O ambiente é foda e a cerveja tá sempre gelada."</p>
                    <div class="font-bebas text-2xl">PEDRO HENRIQUE</div>
                </div>
                <div class="p-8 md:p-12 border-2 border-black rounded-2xl">
                    <p class="text-lg md:text-xl font-bold italic mb-8">"Atendimento de primeira. Os caras são artistas da navalha."</p>
                    <div class="font-bebas text-2xl">JOÃO VITOR</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8 bg-[#0A0A0A] text-white">
        <div class="max-w-3xl mx-auto">
            <h2 class="font-bebas text-5xl md:text-6xl tracking-widest text-center mb-12 md:mb-16">DÚVIDAS</h2>
            <div class="space-y-8">
                <div class="border-b border-white/10 pb-6">
                    <h4 class="font-bebas text-2xl md:text-3xl text-neon mb-2">Precisa agendar?</h4>
                    <p class="opacity-40 text-sm md:text-base">Sim, trabalhamos com horário marcado para garantir sua melhor experiência.</p>
                </div>
                <div class="border-b border-white/10 pb-6">
                    <h4 class="font-bebas text-2xl md:text-3xl text-neon mb-2">Aceita cartão?</h4>
                    <p class="opacity-40 text-sm md:text-base">Aceitamos todos os cartões de crédito, débito e PIX.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8 bg-neon text-black text-center">
        <h2 class="font-bebas text-6xl md:text-8xl tracking-tighter mb-10 break-words">ESTÁ ESPERANDO O QUÊ?</h2>
        <button class="bg-black text-white px-10 md:px-16 py-5 md:py-6 font-bebas text-3xl md:text-4xl tracking-widest hover:scale-105 transition-transform">RESERVAR CADEIRA</button>
    </section>

    <footer class="py-20 px-8 border-t border-white/5 text-center">
        <div class="font-bebas text-4xl tracking-widest mb-8">URBAN<span class="text-neon">BLADE</span></div>
        <p class="opacity-40 text-sm tracking-widest uppercase mb-12">Rua do Grafite, 123 • Vila Madalena • SP</p>
        <div class="text-[10px] opacity-20 uppercase tracking-[0.5em]">© 2026 Urban Blade. No Rules. Just Style.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'law-firm-elite-2',
    name: 'Vanguarda Jurídica',
    category: 'Advocacia',
    description: 'Design moderno e tecnológico para escritórios de advocacia inovadores, com foco em agilidade e resultados.',
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0F172A; color: #F8FAFC; }
        .display { font-family: 'Space Grotesk', sans-serif; }
        .text-accent { color: #38BDF8; }
        .bg-accent { background-color: #38BDF8; }
        .border-accent { border-color: #38BDF8; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div class="display text-2xl font-bold tracking-tight">VANGUARDA<span class="text-accent">JUR</span></div>
            <div class="hidden md:flex gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400">
                <a href="#atuacao" class="hover:text-accent transition-colors">Atuação</a>
                <a href="#equipe" class="hover:text-accent transition-colors">Equipe</a>
                <a href="#contato" class="hover:text-accent transition-colors">Contato</a>
            </div>
            <button class="bg-accent text-slate-900 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Consultoria Online</button>
        </div>
    </nav>

    <section class="relative min-h-screen flex items-center pt-20 px-4 md:px-8 overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div class="space-y-8 md:space-y-12 relative z-10">
                <div class="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                    <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-accent">Direito Digital & Inovação</span>
                </div>
                <h1 class="display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter break-words">Justiça na era <br/> <span class="text-accent">exponencial.</span></h1>
                <p class="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg font-light">Protegemos seus interesses com a agilidade que o mundo moderno exige. Tecnologia a serviço do Direito.</p>
                <div class="flex flex-wrap gap-4 md:gap-6">
                    <button class="bg-accent text-slate-900 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-accent/20 transition-all">Falar com Especialista</button>
                    <button class="px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-lg border border-slate-700 hover:bg-slate-800 transition-all">Nossas Áreas</button>
                </div>
            </div>
            <div class="relative mt-12 lg:mt-0">
                <div class="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 bg-slate-800 p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl max-w-[200px] md:max-w-xs">
                    <div class="display text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
                    <div class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Taxa de Êxito em Casos Digitais</div>
                </div>
            </div>
        </div>
    </section>

    <section id="atuacao" class="py-20 md:py-40 px-4 md:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-12 md:gap-32 items-end mb-20 md:mb-32">
                <div class="max-w-xl">
                    <div class="text-accent text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Expertise</div>
                    <h2 class="display text-5xl md:text-6xl font-bold leading-tight break-words">Soluções para o <br/> <span class="text-accent">agora.</span></h2>
                </div>
                <p class="text-slate-400 text-lg leading-relaxed font-light">Especialistas em lidar com os desafios jurídicos complexos da nova economia, desde startups até grandes corporações tecnológicas.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-6 md:gap-8">
                <div class="p-8 md:p-12 bg-slate-800/50 rounded-[40px] border border-white/5 hover:border-accent/50 transition-all group">
                    <div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h3 class="display text-2xl md:text-3xl font-bold mb-6">Cibersegurança</h3>
                    <p class="text-slate-400 leading-relaxed mb-8">Proteção de dados, LGPD e resposta a incidentes críticos de segurança.</p>
                    <div class="text-accent font-bold text-xs uppercase tracking-widest">Ver Detalhes →</div>
                </div>
                <div class="p-8 md:p-12 bg-slate-800/50 rounded-[40px] border border-white/5 hover:border-accent/50 transition-all group">
                    <div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 class="display text-2xl md:text-3xl font-bold mb-6">Propriedade Intelectual</h3>
                    <p class="text-slate-400 leading-relaxed mb-8">Registro de marcas, patentes e proteção de software no ambiente global.</p>
                    <div class="text-accent font-bold text-xs uppercase tracking-widest">Ver Detalhes →</div>
                </div>
                <div class="p-8 md:p-12 bg-slate-800/50 rounded-[40px] border border-white/5 hover:border-accent/50 transition-all group">
                    <div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 class="display text-2xl md:text-3xl font-bold mb-6">Venture Capital</h3>
                    <p class="text-slate-400 leading-relaxed mb-8">Assessoria em rodadas de investimento e estruturação societária de startups.</p>
                    <div class="text-accent font-bold text-xs uppercase tracking-widest">Ver Detalhes →</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 bg-slate-800/30">
        <div class="max-w-7xl mx-auto">
            <h2 class="display text-5xl font-bold text-center mb-24">Reconhecimento</h2>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="p-12 bg-slate-900 rounded-[40px] border border-white/5">
                    <p class="text-xl text-slate-400 italic mb-8">"A Vanguarda Jurídica foi essencial na nossa rodada de Series A. Entendem o ritmo das startups como ninguém."</p>
                    <div class="font-bold text-accent">CEO, TechFlow Solutions</div>
                </div>
                <div class="p-12 bg-slate-900 rounded-[40px] border border-white/5">
                    <p class="text-xl text-slate-400 italic mb-8">"Segurança jurídica impecável em um caso complexo de propriedade intelectual internacional."</p>
                    <div class="font-bold text-accent">Diretor Jurídico, Global Inov</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 max-w-3xl mx-auto">
        <h2 class="display text-4xl font-bold text-center mb-16 uppercase tracking-widest">FAQ</h2>
        <div class="space-y-8">
            <div class="border-b border-white/5 pb-6">
                <h4 class="display text-xl font-bold mb-2 text-accent">Atendem em todo o Brasil?</h4>
                <p class="text-slate-400">Sim, nossa estrutura é 100% digital, permitindo atendimento ágil em qualquer localidade.</p>
            </div>
            <div class="border-b border-white/5 pb-6">
                <h4 class="display text-xl font-bold mb-2 text-accent">Como funciona a primeira consulta?</h4>
                <p class="text-slate-400">Realizamos uma triagem inicial por vídeo para entender a complexidade do seu caso.</p>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-40 px-4 md:px-8 bg-slate-900">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="display text-5xl md:text-7xl font-bold mb-12 italic break-words">Justiça que acompanha <br/> o seu ritmo.</h2>
            <button class="bg-accent text-slate-900 px-10 md:px-16 py-5 md:py-6 rounded-full font-bold text-lg md:text-xl uppercase tracking-widest hover:scale-105 transition-transform">Agendar Consulta Agora</button>
        </div>
    </section>

    <footer class="py-20 px-8 border-t border-white/5 text-center">
        <div class="display text-3xl font-bold mb-8">VANGUARDA<span class="text-accent">JUR</span></div>
        <p class="text-slate-500 text-sm uppercase tracking-widest mb-12">Av. Paulista, 2000 • 15º Andar • São Paulo - SP</p>
        <div class="text-[8px] uppercase tracking-[0.5em] text-slate-600">© 2026 Vanguarda Jurídica. Inovação em cada processo.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'saas-elite-2',
    name: 'Nexus OS',
    category: 'SaaS',
    description: 'Landing page brutalista e de alta energia para produtos de software modernos, com animações dinâmicas e design arrojado.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FFFFFF; color: #000000; }
        .display { font-family: 'Anton', sans-serif; }
        .bg-neon { background-color: #00FF00; }
        .text-neon { color: #00FF00; }
        .border-brutal { border: 4px solid #000000; }
        .shadow-brutal { box-shadow: 8px 8px 0px #000000; }
        .shadow-brutal-hover:hover { box-shadow: 12px 12px 0px #00FF00; transform: translate(-4px, -4px); }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 bg-white border-b-4 border-black px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div class="display text-3xl md:text-4xl tracking-tighter">NEXUS<span class="text-neon" style="-webkit-text-stroke: 2px black;">OS</span></div>
        <div class="hidden md:flex gap-12 text-xs font-black uppercase tracking-tighter">
            <a href="#features" class="hover:underline underline-offset-8 decoration-4 decoration-neon">Recursos</a>
            <a href="#pricing" class="hover:underline underline-offset-8 decoration-4 decoration-neon">Preços</a>
            <a href="#docs" class="hover:underline underline-offset-8 decoration-4 decoration-neon">Docs</a>
        </div>
        <button class="bg-neon border-brutal px-6 md:px-8 py-2 md:py-3 text-[10px] md:text-xs font-black uppercase tracking-tighter shadow-brutal hover:bg-black hover:text-white transition-all">Get Started</button>
    </nav>

    <section class="pt-40 md:pt-48 pb-20 md:pb-24 px-4 md:px-8 border-b-4 border-black">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div class="space-y-8 md:space-y-12">
                <h1 class="display text-6xl md:text-[12vw] lg:text-[8vw] leading-[0.8] uppercase break-words">BUILD <br/> <span class="bg-neon px-4">FASTER</span> <br/> THAN EVER.</h1>
                <p class="text-xl md:text-2xl font-bold leading-tight max-w-md">The only operating system your business needs to scale without limits. Brutally efficient.</p>
                <div class="flex flex-wrap gap-6">
                    <button class="bg-black text-white px-10 md:px-12 py-5 md:py-6 text-lg md:text-xl font-black uppercase shadow-brutal hover:bg-neon hover:text-black transition-all">Start Building Now</button>
                </div>
            </div>
            <div class="relative mt-12 lg:mt-0">
                <div class="border-brutal bg-white p-4 shadow-brutal rotate-3">
                    <div class="bg-black aspect-video flex items-center justify-center">
                        <div class="text-neon display text-4xl md:text-6xl animate-pulse">SYSTEM_ONLINE</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="bg-black py-8 overflow-hidden border-b-4 border-black">
        <div class="flex whitespace-nowrap animate-marquee">
            <div class="flex gap-20 items-center px-10">
                <span class="display text-6xl text-white uppercase">Fast as Hell</span>
                <span class="text-neon text-6xl">★</span>
                <span class="display text-6xl text-white uppercase">Secure by Design</span>
                <span class="text-neon text-6xl">★</span>
                <span class="display text-6xl text-white uppercase">Scale to Infinity</span>
                <span class="text-neon text-6xl">★</span>
            </div>
            <div class="flex gap-20 items-center px-10">
                <span class="display text-6xl text-white uppercase">Fast as Hell</span>
                <span class="text-neon text-6xl">★</span>
                <span class="display text-6xl text-white uppercase">Secure by Design</span>
                <span class="text-neon text-6xl">★</span>
                <span class="display text-6xl text-white uppercase">Scale to Infinity</span>
                <span class="text-neon text-6xl">★</span>
            </div>
        </div>
    </div>

    <section id="features" class="py-20 md:py-32 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-1">
            <div class="border-brutal p-8 md:p-12 shadow-brutal-hover transition-all bg-white">
                <div class="display text-6xl md:text-8xl mb-8">01</div>
                <h3 class="display text-3xl md:text-4xl mb-6 uppercase">Real-time Sync</h3>
                <p class="text-lg font-bold">Every byte synchronized across all devices in less than 10ms. No lag. No excuses.</p>
            </div>
            <div class="border-brutal p-8 md:p-12 shadow-brutal-hover transition-all bg-neon">
                <div class="display text-6xl md:text-8xl mb-8">02</div>
                <h3 class="display text-3xl md:text-4xl mb-6 uppercase">Edge Compute</h3>
                <p class="text-lg font-bold">Run your code at the edge of the network. Closer to your users, faster than light.</p>
            </div>
            <div class="border-brutal p-8 md:p-12 shadow-brutal-hover transition-all bg-white">
                <div class="display text-6xl md:text-8xl mb-8">03</div>
                <h3 class="display text-3xl md:text-4xl mb-6 uppercase">AI Native</h3>
                <p class="text-lg font-bold">Built-in intelligence that learns from your data to automate the boring stuff.</p>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8 bg-neon text-black">
        <div class="max-w-7xl mx-auto">
            <h2 class="display text-5xl md:text-7xl uppercase mb-12 md:mb-20 break-words">TRUSTED BY <br/> THE BOLD.</h2>
            <div class="grid md:grid-cols-2 gap-6 md:gap-8">
                <div class="border-brutal p-8 md:p-12 bg-white shadow-brutal">
                    <p class="text-xl md:text-2xl font-black italic mb-8">"Nexus OS is the backbone of our infrastructure. We scaled 10x without a single minute of downtime."</p>
                    <div class="display text-2xl">CTO @ HYPERDRIVE</div>
                </div>
                <div class="border-brutal p-8 md:p-12 bg-white shadow-brutal">
                    <p class="text-xl md:text-2xl font-black italic mb-8">"The edge compute capabilities are insane. Our latency dropped by 80% overnight."</p>
                    <div class="display text-2xl">LEAD ENG @ NEON_LABS</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white text-black">
        <div class="max-w-3xl mx-auto">
            <h2 class="display text-6xl uppercase text-center mb-16">QUESTIONS?</h2>
            <div class="space-y-8">
                <div class="border-b-4 border-black pb-6">
                    <h4 class="display text-2xl mb-2 uppercase">Is it open source?</h4>
                    <p class="font-bold">The core engine is open source. The enterprise OS is proprietary.</p>
                </div>
                <div class="border-b-4 border-black pb-6">
                    <h4 class="display text-2xl mb-2 uppercase">Pricing for startups?</h4>
                    <p class="font-bold">We have a generous free tier and a 90% discount for early-stage startups.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="py-20 px-8 bg-black text-white text-center">
        <div class="display text-6xl mb-8">NEXUS<span class="text-neon">OS</span></div>
        <p class="font-black uppercase tracking-widest text-white/40 mb-12">Built for the bold. No compromises.</p>
        <div class="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">© 2026 Nexus OS. All rights reserved.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'real-estate-elite-2',
    name: 'Urban Living',
    category: 'Imobiliária',
    description: 'Landing page limpa e minimalista focada no estilo de vida urbano, com layout em grade e foco em curadoria de imóveis.',
    thumbnail: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; background-color: #F5F5F5; color: #1A1A1A; }
        .text-muted { color: #888888; }
        .bg-dark { background-color: #1A1A1A; }
        .border-light { border-color: #E5E5E5; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-light px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div class="text-xl md:text-2xl font-bold tracking-tighter uppercase">Urban<span class="font-light">Living</span></div>
        <div class="hidden md:flex gap-12 text-[10px] uppercase font-bold tracking-widest text-muted">
            <a href="#curadoria" class="hover:text-black transition-colors">Curadoria</a>
            <a href="#bairros" class="hover:text-black transition-colors">Bairros</a>
            <a href="#contato" class="hover:text-black transition-colors">Contato</a>
        </div>
        <button class="bg-dark text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">Anunciar Imóvel</button>
    </nav>

    <section class="pt-40 md:pt-48 pb-20 md:pb-24 px-4 md:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
                <div class="space-y-8 md:space-y-12">
                    <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter break-words">Onde a cidade <br/> encontra o <span class="font-light italic">lar.</span></h1>
                    <p class="text-lg md:text-xl text-muted leading-relaxed max-w-md">Uma curadoria exclusiva de imóveis que definem o novo morar urbano. Design, localização e estilo de vida.</p>
                    <div class="flex gap-4">
                        <button class="bg-dark text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold hover:shadow-2xl transition-all">Ver Coleção</button>
                        <button class="border border-light px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold hover:bg-white transition-all">Nossa História</button>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-12 lg:mt-0">
                    <div class="aspect-[3/4] rounded-[40px] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                    </div>
                    <div class="aspect-[3/4] rounded-[40px] overflow-hidden mt-12">
                        <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="curadoria" class="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6">
                <h2 class="text-4xl md:text-5xl font-bold tracking-tight break-words">Destaques da Semana</h2>
                <a href="#" class="text-[10px] uppercase font-bold tracking-widest text-muted hover:text-black transition-colors">Ver todos os imóveis →</a>
            </div>
            <div class="grid md:grid-cols-3 gap-8 md:gap-12">
                <div class="group cursor-pointer">
                    <div class="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 md:mb-8">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold mb-2">Loft Industrial</h3>
                            <p class="text-sm text-muted">Vila Madalena, SP</p>
                        </div>
                        <div class="text-lg md:text-xl font-bold">R$ 1.2M</div>
                    </div>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 md:mb-8">
                        <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold mb-2">Penthouse Minimal</h3>
                            <p class="text-sm text-muted">Ipanema, RJ</p>
                        </div>
                        <div class="text-lg md:text-xl font-bold">R$ 4.5M</div>
                    </div>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 md:mb-8">
                        <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold mb-2">Garden House</h3>
                            <p class="text-sm text-muted">Savassi, BH</p>
                        </div>
                        <div class="text-lg md:text-xl font-bold">R$ 2.8M</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-dark text-white">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-5xl font-bold tracking-tight text-center mb-20">Experiências Urbanas</h2>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="p-12 border border-white/10 rounded-[40px]">
                    <p class="text-xl font-light leading-relaxed mb-8 opacity-60">"Encontrei o loft dos meus sonhos em menos de uma semana. A curadoria da Urban Living é realmente diferenciada."</p>
                    <div class="font-bold uppercase tracking-widest text-[10px]">Mariana C. • Designer</div>
                </div>
                <div class="p-12 border border-white/10 rounded-[40px]">
                    <p class="text-xl font-light leading-relaxed mb-8 opacity-60">"O processo de venda do meu imóvel foi extremamente profissional e transparente. Recomendo fortemente."</p>
                    <div class="font-bold uppercase tracking-widest text-[10px]">Ricardo T. • Arquiteto</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 uppercase tracking-tighter">Dúvidas</h2>
        <div class="space-y-8">
            <div class="border-b border-light pb-6">
                <h4 class="font-bold mb-2">Como funciona a curadoria?</h4>
                <p class="text-muted">Selecionamos apenas imóveis com alto padrão de design, localização estratégica e potencial de valorização.</p>
            </div>
            <div class="border-b border-light pb-6">
                <h4 class="font-bold mb-2">Vocês atendem em quais cidades?</h4>
                <p class="text-muted">Atualmente focamos em São Paulo, Rio de Janeiro e Belo Horizonte.</p>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white text-center">
        <h2 class="text-7xl font-bold tracking-tighter mb-10">PRONTO PARA <br/> MUDAR?</h2>
        <button class="bg-dark text-white px-16 py-6 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all">Falar com Consultor</button>
    </section>

    <footer class="py-20 px-8 border-t border-light text-center">
        <div class="text-2xl font-bold mb-8 uppercase">Urban<span class="font-light">Living</span></div>
        <div class="flex justify-center gap-12 text-[10px] uppercase font-bold tracking-widest text-muted mb-12">
            <a href="#" class="hover:text-black transition-colors">Instagram</a>
            <a href="#" class="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" class="hover:text-black transition-colors">WhatsApp</a>
        </div>
        <div class="text-[8px] uppercase tracking-[0.5em] text-muted">© 2026 Urban Living. Curadoria Imobiliária de Alto Padrão.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'fitness-elite-2',
    name: 'Iron Core',
    category: 'Fitness',
    description: 'Landing page industrial e bruta para personal trainers e academias focadas em força e performance extrema.',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #111111; color: #FFFFFF; }
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .text-orange-main { color: #FF4D00; }
        .bg-orange-main { background-color: #FF4D00; }
        .border-orange-main { border-color: #FF4D00; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3); color: transparent; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 flex justify-between items-center">
        <div class="font-bebas text-3xl md:text-4xl tracking-widest">IRON<span class="text-orange-main">CORE</span></div>
        <button class="bg-orange-main text-white px-6 md:px-8 py-2 font-bebas text-xl md:text-2xl tracking-widest hover:scale-105 transition-transform">JOIN THE CREW</button>
    </nav>

    <section class="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-40 grayscale" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
        </div>
        <div class="relative z-10 text-center space-y-4 max-w-full">
            <h1 class="font-bebas text-7xl md:text-[20vw] leading-none tracking-tighter break-words">NO <span class="text-orange-main">EXCUSES</span></h1>
            <p class="text-lg md:text-xl font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-60">Strength • Grit • Transformation</p>
            <div class="pt-10">
                <button class="bg-orange-main text-white px-10 md:px-16 py-5 md:py-6 font-bebas text-3xl md:text-4xl tracking-widest hover:shadow-[0_0_50px_rgba(255,77,0,0.4)] transition-all">START YOUR JOURNEY</button>
            </div>
        </div>
        <div class="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none">
            <div class="font-bebas text-[10vh] md:text-[15vh] text-stroke uppercase inline-block animate-marquee">TRAIN HARD • PUSH LIMITS • NO EXCUSES • TRAIN HARD • PUSH LIMITS • NO EXCUSES •</div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div class="space-y-8 md:space-y-12">
                <h2 class="font-bebas text-6xl md:text-8xl leading-none tracking-widest break-words">THE <span class="text-orange-main">METHOD</span></h2>
                <div class="space-y-6 md:space-y-8">
                    <div class="flex gap-6 md:gap-8 items-start">
                        <div class="font-bebas text-4xl md:text-5xl text-orange-main">01</div>
                        <div>
                            <h3 class="font-bebas text-2xl md:text-3xl tracking-widest mb-2">RAW STRENGTH</h3>
                            <p class="text-white/40 leading-relaxed text-sm md:text-base">Focus on compound movements and progressive overload to build a solid foundation.</p>
                        </div>
                    </div>
                    <div class="flex gap-6 md:gap-8 items-start">
                        <div class="font-bebas text-4xl md:text-5xl text-orange-main">02</div>
                        <div>
                            <h3 class="font-bebas text-2xl md:text-3xl tracking-widest mb-2">MENTAL GRIT</h3>
                            <p class="text-white/40 leading-relaxed text-sm md:text-base">We don't just train your body; we forge your mind to overcome any obstacle.</p>
                        </div>
                    </div>
                    <div class="flex gap-6 md:gap-8 items-start">
                        <div class="font-bebas text-4xl md:text-5xl text-orange-main">03</div>
                        <div>
                            <h3 class="font-bebas text-2xl md:text-3xl tracking-widest mb-2">ELITE RECOVERY</h3>
                            <p class="text-white/40 leading-relaxed text-sm md:text-base">Strategic rest and nutrition protocols to ensure you're always ready for the next battle.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-12 lg:mt-0">
                <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=600" class="rounded-2xl grayscale" />
                <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600" class="rounded-2xl grayscale mt-12" />
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-[#1A1A1A]">
        <div class="max-w-7xl mx-auto">
            <h2 class="font-bebas text-7xl tracking-widest text-center mb-20">VOICES FROM <span class="text-orange-main">THE PIT</span></h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-10 border border-white/5 bg-black">
                    <p class="text-lg italic mb-8 opacity-40">"O treino mais insano que já fiz. Resultados visíveis em 4 semanas."</p>
                    <div class="font-bebas text-2xl">MARCO A.</div>
                </div>
                <div class="p-10 border border-white/5 bg-black">
                    <p class="text-lg italic mb-8 opacity-40">"Ambiente focado. Aqui não tem espaço para moleza."</p>
                    <div class="font-bebas text-2xl">JULIA S.</div>
                </div>
                <div class="p-10 border border-white/5 bg-black">
                    <p class="text-lg italic mb-8 opacity-40">"A metodologia de força mudou meu jogo completamente."</p>
                    <div class="font-bebas text-2xl">BRUNO R.</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="font-bebas text-6xl tracking-widest text-center mb-16">INTEL</h2>
        <div class="space-y-8">
            <div class="border-b border-white/5 pb-6">
                <h4 class="font-bebas text-3xl text-orange-main mb-2">Iniciantes são bem-vindos?</h4>
                <p class="opacity-40">Sim, adaptamos a carga e intensidade para qualquer nível.</p>
            </div>
            <div class="border-b border-white/5 pb-6">
                <h4 class="font-bebas text-3xl text-orange-main mb-2">Tem estacionamento?</h4>
                <p class="opacity-40">Sim, temos convênio gratuito para alunos.</p>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-orange-main text-white text-center">
        <h2 class="font-bebas text-8xl tracking-tighter mb-10">ARE YOU READY?</h2>
        <button class="bg-black text-white px-16 py-6 font-bebas text-4xl tracking-widest hover:scale-105 transition-transform">JOIN NOW</button>
    </section>

    <footer class="py-20 px-8 border-t border-white/5 text-center">
        <div class="font-bebas text-4xl tracking-widest mb-8">IRON<span class="text-orange-main">CORE</span></div>
        <div class="text-[10px] opacity-20 uppercase tracking-[0.5em]">© 2026 Iron Core. Forged in Fire.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'dental-clinic-elite-2',
    name: 'Smile Design',
    category: 'Saúde',
    description: 'Landing page minimalista e sofisticada para clínicas odontológicas focadas em estética e tecnologia avançada.',
    thumbnail: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #FFFFFF; color: #1A1A1A; }
        .serif { font-family: 'Playfair Display', serif; }
        .text-soft-blue { color: #A5C9CA; }
        .bg-soft-blue { background-color: #A5C9CA; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div class="text-lg md:text-xl font-bold tracking-tighter uppercase">Smile<span class="font-light">Design</span></div>
        <button class="border border-black px-6 md:px-8 py-2 md:py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Agendar Consulta</button>
    </nav>

    <section class="pt-40 md:pt-48 pb-20 md:pb-32 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div class="space-y-8 md:space-y-12">
                <h1 class="serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight break-words">O sorriso que <br/> você sempre <br/> <span class="italic">sonhou.</span></h1>
                <p class="text-lg md:text-xl text-slate-500 leading-relaxed max-w-md font-light">Tecnologia de ponta e um olhar artístico para transformar sua saúde bucal e sua autoconfiança.</p>
                <div class="flex gap-6">
                    <button class="bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-bold hover:shadow-2xl transition-all">Conheça o Método</button>
                </div>
            </div>
            <div class="relative mt-12 lg:mt-0">
                <div class="aspect-square rounded-full overflow-hidden border-8 border-slate-50">
                    <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-slate-50 max-w-[180px] md:max-w-xs">
                    <div class="text-soft-blue text-3xl md:text-4xl font-bold mb-2">10k+</div>
                    <div class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Sorrisos Transformados</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-slate-50">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24">
                <h2 class="serif text-5xl mb-6">Nossas Especialidades</h2>
                <p class="text-slate-500 max-w-xl mx-auto">Excelência em cada detalhe para garantir o melhor resultado estético e funcional.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-12">
                <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                    <h3 class="serif text-3xl mb-6">Lentes de Contato</h3>
                    <p class="text-slate-500 leading-relaxed">Transformação completa do sorriso com lâminas ultrafinas de porcelana.</p>
                </div>
                <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                    <h3 class="serif text-3xl mb-6">Invisalign</h3>
                    <p class="text-slate-500 leading-relaxed">Alinhamento dentário discreto e confortável com a tecnologia líder mundial.</p>
                </div>
                <div class="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
                    <h3 class="serif text-3xl mb-6">Implantes</h3>
                    <p class="text-slate-500 leading-relaxed">Reabilitação oral avançada com materiais de alta biocompatibilidade.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <h2 class="serif text-5xl text-center mb-20">Experiências</h2>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="p-12 bg-slate-50 rounded-[40px]">
                    <p class="text-xl serif italic mb-8">"O atendimento é impecável e o resultado das minhas lentes ficou super natural. Recomendo a todos."</p>
                    <div class="font-bold uppercase tracking-widest text-[10px]">Ana Paula M.</div>
                </div>
                <div class="p-12 bg-slate-50 rounded-[40px]">
                    <p class="text-xl serif italic mb-8">"Tecnologia de ponta. Fiz meu tratamento com Invisalign e foi muito mais rápido do que eu esperava."</p>
                    <div class="font-bold uppercase tracking-widest text-[10px]">Lucas F.</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="serif text-4xl text-center mb-16">Dúvidas</h2>
        <div class="space-y-8">
            <div class="border-b border-slate-100 pb-6">
                <h4 class="font-bold mb-2">Aceitam convênio?</h4>
                <p class="text-slate-500">Trabalhamos com sistema de reembolso e alguns convênios premium. Consulte-nos.</p>
            </div>
            <div class="border-b border-slate-100 pb-6">
                <h4 class="font-bold mb-2">Quanto tempo dura o tratamento?</h4>
                <p class="text-slate-500">Cada caso é único. Realizamos um planejamento digital completo na primeira consulta.</p>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8 bg-slate-50 text-center">
        <h2 class="serif text-4xl md:text-6xl mb-10 break-words">Seu novo sorriso <br/> começa hoje.</h2>
        <button class="bg-black text-white px-10 md:px-16 py-5 md:py-6 rounded-full font-bold hover:shadow-2xl transition-all">Agendar Avaliação</button>
    </section>

    <footer class="py-20 px-8 border-t border-slate-100 text-center">
        <div class="text-xl font-bold mb-8 uppercase">Smile<span class="font-light">Design</span></div>
        <div class="text-[8px] uppercase tracking-[0.5em] text-slate-400">© 2026 Smile Design. A arte de sorrir.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'architecture-elite-2',
    name: 'Vértice Arquitetura',
    category: 'Arquitetura',
    description: 'Landing page arrojada e geométrica para escritórios de arquitetura que focam em inovação e estruturas marcantes.',
    thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Space Grotesk', sans-serif; background-color: #000000; color: #FFFFFF; }
        .text-outline { -webkit-text-stroke: 1px white; color: transparent; }
        .bg-grid { background-image: radial-gradient(circle, #333 1px, transparent 1px); background-size: 40px 40px; }
    </style>
</head>
<body class="antialiased bg-grid overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 px-4 md:px-8 py-6 md:py-10 flex justify-between items-center mix-blend-difference">
        <div class="text-2xl md:text-3xl font-bold tracking-tighter">VÉRTICE</div>
        <div class="flex gap-6 md:gap-12 text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">
            <a href="#projetos" class="hover:opacity-50 transition-opacity">Projetos</a>
            <a href="#contato" class="hover:opacity-50 transition-opacity">Contato</a>
        </div>
    </nav>

    <section class="relative min-h-screen flex items-center px-4 md:px-8 pt-32 md:pt-0">
        <div class="max-w-7xl mx-auto w-full">
            <div class="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                <div class="space-y-8 md:space-y-12">
                    <h1 class="text-7xl md:text-[12vw] lg:text-[10vw] leading-[0.8] font-bold uppercase tracking-tighter break-words">FORM <br/> <span class="text-outline">FOLLOWS</span> <br/> FUTURE.</h1>
                    <p class="text-lg md:text-xl font-light tracking-widest uppercase opacity-40 max-w-md">Arquitetura disruptiva para um world em constante evolução.</p>
                    <button class="border border-white px-10 md:px-16 py-4 md:py-6 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">Explorar Projetos</button>
                </div>
                <div class="relative aspect-square mt-12 lg:mt-0">
                    <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover grayscale" />
                    <div class="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 w-48 h-48 md:w-64 md:h-64 border border-white/20 flex items-center justify-center backdrop-blur-xl">
                        <div class="text-center">
                            <div class="text-4xl md:text-6xl font-bold">15</div>
                            <div class="text-[8px] uppercase tracking-widest opacity-40">Prêmios Internacionais</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="projetos" class="py-40 px-8 border-t border-white/10">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-1">
                <div class="group relative aspect-video overflow-hidden border border-white/10">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div class="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors"></div>
                    <div class="absolute bottom-10 left-10">
                        <h3 class="text-4xl font-bold uppercase mb-2">Nexus Tower</h3>
                        <p class="text-[10px] uppercase tracking-widest opacity-60">Comercial • Dubai</p>
                    </div>
                </div>
                <div class="group relative aspect-video overflow-hidden border border-white/10">
                    <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div class="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors"></div>
                    <div class="absolute bottom-10 left-10">
                        <h3 class="text-4xl font-bold uppercase mb-2">Void House</h3>
                        <p class="text-[10px] uppercase tracking-widest opacity-60">Residencial • Berlin</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-40 px-4 md:px-8 bg-white text-black">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-16 md:mb-24 break-words">CLIENTS <br/> <span class="text-outline" style="-webkit-text-stroke: 1px black;">VOICES</span></h2>
            <div class="grid md:grid-cols-2 gap-1">
                <div class="p-8 md:p-12 border border-black">
                    <p class="text-xl md:text-2xl font-light tracking-widest uppercase mb-8">"Transformaram nossa visão em uma reality arquitetônica impressionante. Inovação pura."</p>
                    <div class="text-[10px] font-bold tracking-[0.5em]">DEVELOPER GROUP</div>
                </div>
                <div class="p-8 md:p-12 border border-black">
                    <p class="text-xl md:text-2xl font-light tracking-widest uppercase mb-8">"O Void House é uma obra de arte. Espaço, luz e forma em perfeita harmonia."</p>
                    <div class="text-[10px] font-bold tracking-[0.5em]">PRIVATE CLIENT</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold uppercase tracking-[0.5em] text-center mb-16">FAQ</h2>
        <div class="space-y-12">
            <div class="border-b border-white/10 pb-8">
                <h4 class="text-xl font-bold uppercase tracking-widest mb-4">Processo Criativo?</h4>
                <p class="opacity-40 font-light leading-relaxed">Utilizamos design computacional avançado e prototipagem 3D para explorar formas não convencionais.</p>
            </div>
            <div class="border-b border-white/10 pb-8">
                <h4 class="text-xl font-bold uppercase tracking-widest mb-4">Projetos Internacionais?</h4>
                <p class="opacity-40 font-light leading-relaxed">Sim, operamos globalmente com parceiros locais para garantir a execução técnica impecável.</p>
            </div>
        </div>
    </section>

    <section class="py-40 px-8 bg-white text-black text-center">
        <h2 class="text-8xl font-bold uppercase tracking-tighter mb-12 italic">Let's build <br/> the future.</h2>
        <button class="border-4 border-black px-16 py-8 text-xl font-bold uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all">Start Project</button>
    </section>

    <footer class="py-20 px-8 border-t border-white/10 text-center">
        <div class="text-3xl font-bold tracking-tighter mb-8">VÉRTICE</div>
        <div class="text-[8px] uppercase tracking-[0.5em] opacity-20">© 2026 Vértice Arquitetura. Estruturando o amanhã.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'wellness-elite-2',
    name: 'Aura Wellness',
    category: 'Bem-estar',
    description: 'Landing page etérea e imersiva para estúdios de meditação e práticas holísticas de alto padrão.',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0F110C; color: #E0D8D0; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .atmosphere {
            background: radial-gradient(circle at 50% -20%, #2D3528 0%, transparent 70%),
                        radial-gradient(circle at 0% 80%, #1A1D16 0%, transparent 50%);
        }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
    </style>
</head>
<body class="antialiased atmosphere min-h-screen overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 px-4 md:px-8 py-6 md:py-12 flex justify-between items-center">
        <div class="serif text-2xl md:text-3xl italic tracking-widest">Aura</div>
        <button class="glass px-6 md:px-8 py-2 md:py-3 rounded-full text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-white/10 transition-all">Reservar Sessão</button>
    </nav>

    <section class="relative pt-48 md:pt-64 pb-20 md:pb-32 px-4 md:px-8 flex flex-col items-center text-center">
        <div class="max-w-4xl space-y-8 md:space-y-12">
            <h1 class="serif text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tighter break-words">Encontre seu <br/> <span class="italic">silêncio.</span></h1>
            <p class="text-base md:text-lg font-light tracking-widest uppercase opacity-40 max-w-xl mx-auto leading-relaxed">Uma jornada imersiva de reconexão através da meditação profunda e sons terapêuticos.</p>
            <div class="pt-8 md:pt-12">
                <div class="w-px h-24 md:h-32 bg-gradient-to-b from-white/40 to-transparent mx-auto"></div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-32 items-center">
            <div class="relative aspect-[3/4] rounded-full overflow-hidden glass p-4">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover rounded-full opacity-60" />
            </div>
            <div class="space-y-12">
                <h2 class="serif text-6xl italic">A Arte da Presença</h2>
                <div class="space-y-8">
                    <div class="glass p-10 rounded-[40px]">
                        <h3 class="serif text-3xl mb-4">Sound Healing</h3>
                        <p class="opacity-40 font-light leading-relaxed">Frequências harmônicas que equilibram o sistema nervoso e induzem estados profundos de relaxamento.</p>
                    </div>
                    <div class="glass p-10 rounded-[40px]">
                        <h3 class="serif text-3xl mb-4">Breathwork</h3>
                        <p class="opacity-40 font-light leading-relaxed">Técnicas ancestrais de respiração para liberar bloqueios emocionais e expandir a consciência.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white/5">
        <div class="max-w-7xl mx-auto">
            <h2 class="serif text-5xl italic text-center mb-20">Ecos de Paz</h2>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="glass p-12 rounded-[60px]">
                    <p class="text-2xl serif italic mb-8 opacity-60">"A Aura é meu refúgio semanal. As sessões de Sound Healing me ajudaram a recuperar o sono e a clareza mental."</p>
                    <div class="text-[10px] uppercase tracking-[0.4em]">Helena V.</div>
                </div>
                <div class="glass p-12 rounded-[60px]">
                    <p class="text-2xl serif italic mb-8 opacity-60">"Um espaço sagrado no meio da cidade. A energia aqui é indescritível."</p>
                    <div class="text-[10px] uppercase tracking-[0.4em]">Gabriel M.</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="serif text-4xl italic text-center mb-16">Perguntas</h2>
        <div class="space-y-12">
            <div class="border-b border-white/5 pb-8">
                <h4 class="serif text-2xl italic mb-4">Preciso ter experiência?</h4>
                <p class="opacity-40 font-light leading-relaxed">Não. Nossas sessões são desenhadas para acolher desde iniciantes até praticantes avançados.</p>
            </div>
            <div class="border-b border-white/5 pb-8">
                <h4 class="serif text-2xl italic mb-4">O que devo vestir?</h4>
                <p class="opacity-40 font-light leading-relaxed">Roupas confortáveis que permitam o movimento livre e o relaxamento total.</p>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-48 px-4 md:px-8 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-white/5 blur-[120px] rounded-full translate-y-1/2"></div>
        <div class="relative z-10 space-y-8 md:space-y-12">
            <h2 class="serif text-5xl md:text-7xl italic break-words">Respire. <br/> Recomece.</h2>
            <button class="glass px-10 md:px-16 py-4 md:py-6 rounded-full text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">Iniciar Jornada</button>
        </div>
    </section>

    <footer class="py-20 px-8 text-center">
        <div class="serif text-3xl italic tracking-widest mb-8">Aura</div>
        <div class="text-[8px] uppercase tracking-[0.5em] opacity-20">© 2026 Aura Wellness. Respire profundamente.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'beauty-elite-2',
    name: 'Maison de Beauté',
    category: 'Beleza',
    description: 'Landing page clássica e luxuosa para salões de beleza e spas que buscam uma estética parisiense e refinada.',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Montserrat', sans-serif; background-color: #FDFBF7; color: #2C2C2C; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .bg-gold { background-color: #C5A059; }
        .text-gold { color: #C5A059; }
        .border-gold { border-color: #C5A059; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-stone-100 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div class="serif text-xl md:text-3xl tracking-tighter uppercase">Maison <span class="italic">de Beauté</span></div>
        <button class="bg-gold text-white px-6 md:px-10 py-2 md:py-3 text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">Agendar</button>
    </nav>

    <section class="pt-40 md:pt-48 pb-20 md:pb-32 px-4 md:px-8">
        <div class="max-w-7xl mx-auto text-center space-y-8 md:space-y-12">
            <h1 class="serif text-5xl md:text-7xl lg:text-9xl font-light leading-none break-words">A essência da <br/> <span class="italic">sofisticação.</span></h1>
            <p class="text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] opacity-60 max-w-xl mx-auto">Onde a tradição francesa encontra a beleza contemporânea.</p>
            <div class="grid grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto pt-8 md:pt-12">
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600" class="aspect-[3/4] object-cover rounded-full" />
                <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600" class="aspect-[3/4] object-cover rounded-full mt-8 md:mt-12" />
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600" class="aspect-[3/4] object-cover rounded-full" />
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-stone-50">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div class="space-y-12">
                <h2 class="serif text-6xl">Nossos Rituais</h2>
                <div class="space-y-8">
                    <div class="flex justify-between items-end border-b border-stone-200 pb-4">
                        <div>
                            <h3 class="serif text-3xl">Haute Coiffure</h3>
                            <p class="text-xs opacity-60 uppercase tracking-widest mt-2">Corte e Estilização</p>
                        </div>
                        <span class="serif text-2xl">€ 120</span>
                    </div>
                    <div class="flex justify-between items-end border-b border-stone-200 pb-4">
                        <div>
                            <h3 class="serif text-3xl">Balayage Signature</h3>
                            <p class="text-xs opacity-60 uppercase tracking-widest mt-2">Coloração Artística</p>
                        </div>
                        <span class="serif text-2xl">€ 280</span>
                    </div>
                    <div class="flex justify-between items-end border-b border-stone-200 pb-4">
                        <div>
                            <h3 class="serif text-3xl">Soin du Visage</h3>
                            <p class="text-xs opacity-60 uppercase tracking-widest mt-2">Tratamento Facial</p>
                        </div>
                        <span class="serif text-2xl">€ 150</span>
                    </div>
                </div>
            </div>
            <div class="bg-white p-20 rounded-t-full border border-stone-100 shadow-sm">
                <p class="serif text-3xl italic leading-relaxed text-center">"A beleza começa no momento em que você decide ser você mesma."</p>
                <div class="text-center mt-8 text-[10px] uppercase tracking-widest opacity-40">— Coco Chanel</div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <h2 class="serif text-5xl text-center mb-20 italic">Depoimentos</h2>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="p-12 border border-stone-100 rounded-full aspect-square flex flex-col items-center justify-center text-center">
                    <p class="serif text-2xl italic mb-8 max-w-xs">"O melhor salão que já frequentei. O atendimento é digno da realeza e o resultado é sempre impecável."</p>
                    <div class="text-[10px] uppercase tracking-widest font-bold">Sophie L.</div>
                </div>
                <div class="p-12 border border-stone-100 rounded-full aspect-square flex flex-col items-center justify-center text-center">
                    <p class="serif text-2xl italic mb-8 max-w-xs">"Um refúgio de paz e beleza. Saio daqui sempre renovada e com a autoestima lá em cima."</p>
                    <div class="text-[10px] uppercase tracking-widest font-bold">Isabella R.</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="serif text-4xl text-center mb-16 uppercase tracking-widest">Questions</h2>
        <div class="space-y-8">
            <div class="border-b border-stone-100 pb-6">
                <h4 class="serif text-2xl mb-2">Trabalham com noivas?</h4>
                <p class="text-sm opacity-60">Sim, temos pacotes exclusivos de 'Jour de Mariée' com atendimento personalizado.</p>
            </div>
            <div class="border-b border-stone-100 pb-6">
                <h4 class="serif text-2xl mb-2">Quais produtos utilizam?</h4>
                <p class="text-sm opacity-60">Utilizamos apenas as melhores marcas francesas e internacionais de luxo.</p>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-48 px-4 md:px-8 bg-gold text-white text-center">
        <h2 class="serif text-5xl md:text-8xl font-light italic mb-10 md:mb-12 break-words">Revele sua <br/> melhor versão.</h2>
        <button class="bg-white text-gold px-10 md:px-16 py-4 md:py-6 text-xs font-bold uppercase tracking-[0.5em] hover:scale-105 transition-transform">Agendar Ritual</button>
    </section>

    <footer class="py-20 px-8 border-t border-stone-100 text-center">
        <div class="serif text-3xl tracking-tighter uppercase mb-8">Maison <span class="italic">de Beauté</span></div>
        <div class="text-[8px] uppercase tracking-[0.5em] opacity-40">© 2026 Maison de Beauté. Elegância atemporal.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'pet-shop-elite-2',
    name: 'Pet Palace',
    category: 'Pet Shop',
    description: 'Landing page moderna e clean para centros de estética animal e hotéis pet de luxo.',
    thumbnail: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; background-color: #FFFFFF; color: #1F2937; }
        .bg-primary-pet { background-color: #7C3AED; }
        .text-primary-pet { color: #7C3AED; }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        <div class="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
            <span class="bg-primary-pet text-white p-1.5 md:p-2 rounded-xl text-sm md:text-base">PP</span>
            PetPalace
        </div>
        <button class="bg-primary-pet text-white px-6 md:px-8 py-2 md:py-3 rounded-2xl font-bold hover:shadow-lg transition-all text-sm md:text-base">Agendar Banho</button>
    </nav>

    <section class="pt-40 md:pt-48 pb-20 md:pb-32 px-4 md:px-8">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div class="space-y-8 md:space-y-10">
                <div class="inline-block bg-purple-100 text-primary-pet px-4 md:px-6 py-2 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest">O melhor para seu melhor amigo</div>
                <h1 class="text-5xl md:text-7xl font-bold leading-none tracking-tight break-words">Cuidado real para seu <span class="text-primary-pet">pet.</span></h1>
                <p class="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">Estética animal de alto padrão, hotelaria 5 estrelas e atendimento veterinário especializado em um só lugar.</p>
                <div class="flex flex-wrap gap-4">
                    <button class="bg-gray-900 text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all text-sm md:text-base">Nossos Serviços</button>
                    <button class="border-2 border-gray-100 px-8 md:px-10 py-3 md:py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all text-sm md:text-base">Ver Galeria</button>
                </div>
            </div>
            <div class="relative mt-12 lg:mt-0">
                <div class="aspect-square bg-purple-50 rounded-[40px] md:rounded-[60px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4 max-w-[220px] md:max-w-xs">
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">✓</div>
                    <div>
                        <div class="font-bold text-sm md:text-base">Atendimento VIP</div>
                        <div class="text-xs md:text-sm text-gray-400">100% Personalizado</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-gray-50">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-10 rounded-[40px] border border-gray-100">
                    <div class="text-4xl mb-6">🛁</div>
                    <h3 class="text-2xl font-bold mb-4">Spa & Estética</h3>
                    <p class="text-gray-500 leading-relaxed">Banhos terapêuticos, tosas específicas e hidratação profunda com produtos premium.</p>
                </div>
                <div class="bg-white p-10 rounded-[40px] border border-gray-100">
                    <div class="text-4xl mb-6">🏨</div>
                    <h3 class="text-2xl font-bold mb-4">Hotel Boutique</h3>
                    <p class="text-gray-500 leading-relaxed">Suítes climatizadas, monitoramento 24h e atividades recreativas diárias.</p>
                </div>
                <div class="bg-white p-10 rounded-[40px] border border-gray-100">
                    <div class="text-4xl mb-6">🩺</div>
                    <h3 class="text-2xl font-bold mb-4">Veterinária</h3>
                    <p class="text-gray-500 leading-relaxed">Consultas preventivas, exames e especialidades para garantir a saúde do seu pet.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 bg-white">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-5xl font-bold text-center mb-20 tracking-tight">Tutores <span class="text-primary-pet">Felizes</span></h2>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-12 bg-purple-50 rounded-[40px] border border-purple-100">
                    <p class="text-xl italic mb-8 opacity-60">"O Thor ama vir para o banho aqui. Ele volta sempre cheiroso e muito calmo. O cuidado é visível."</p>
                    <div class="font-bold">Camila & Thor</div>
                </div>
                <div class="p-12 bg-purple-50 rounded-[40px] border border-purple-100">
                    <p class="text-xl italic mb-8 opacity-60">"O hotel é maravilhoso. Viajo tranquila sabendo que a Luna está sendo bem cuidada e se divertindo."</p>
                    <div class="font-bold">Juliana & Luna</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 px-8 max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 tracking-tight">Dúvidas Frequentes</h2>
        <div class="space-y-8">
            <div class="border-b border-gray-100 pb-6">
                <h4 class="font-bold text-lg mb-2">Precisa de vacinação em dia?</h4>
                <p class="text-gray-500">Sim, para a segurança de todos os pets, exigimos a carteira de vacinação atualizada.</p>
            </div>
            <div class="border-b border-gray-100 pb-6">
                <h4 class="font-bold text-lg mb-2">Como funciona o hotel?</h4>
                <p class="text-gray-500">Temos suítes individuais e áreas de lazer monitoradas. Você recebe fotos e vídeos diários.</p>
            </div>
        </div>
    </section>

    <section class="py-20 md:py-32 px-4 md:px-8 bg-primary-pet text-white text-center">
        <h2 class="text-5xl md:text-7xl font-bold tracking-tight mb-10 break-words">Seu pet merece <br/> esse carinho.</h2>
        <button class="bg-white text-primary-pet px-10 md:px-16 py-4 md:py-6 rounded-2xl font-bold text-lg md:text-xl hover:scale-105 transition-transform">Agendar Agora</button>
    </section>

    <footer class="py-20 px-8 border-t border-gray-100 text-center">
        <div class="text-2xl font-bold tracking-tight mb-8">PetPalace</div>
        <div class="text-[10px] uppercase tracking-[0.5em] text-gray-400">© 2026 Pet Palace. Amor em cada detalhe.</div>
    </footer>
</body>
</html>
    `
  },
  {
    id: 'creator-academy-elite',
    name: 'Creator Academy',
    category: 'Educação',
    featured: true,
    description: 'Plataforma de ensino premium com design dark, módulos estruturados e estética high-end.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    html: `
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&family=Outfit:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #00ffff;
            --bg: #07090e;
            --card: #0f1117;
        }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg); color: white; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .text-glow { text-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
        .bg-glow { box-shadow: 0 0 40px rgba(0, 255, 255, 0.15); }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .gradient-border { position: relative; border-radius: 24px; background: linear-gradient(to bottom right, rgba(0, 255, 255, 0.2), transparent); padding: 1px; }
        .gradient-border-inner { background: var(--bg); border-radius: 23px; height: 100%; width: 100%; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #1a1d24; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
    </style>
</head>
<body class="antialiased overflow-x-hidden">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                    <svg viewBox="0 0 24 24" class="w-5 h-5 text-black fill-current"><path d="M12 2L4 7V17L12 22L20 17V7L12 2Z"/></svg>
                </div>
                <span class="font-black text-xl tracking-tighter uppercase">Creator<span class="text-primary">Academy</span></span>
            </div>
            <nav class="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                <a href="#modulos" class="hover:text-primary transition-colors">Módulos</a>
                <a href="#" class="hover:text-primary transition-colors">Comunidade</a>
                <a href="#" class="hover:text-primary transition-colors">Suporte</a>
            </nav>
            <button class="bg-primary text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Entrar</button>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-40 pb-20 px-6 relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        
        <div class="max-w-7xl mx-auto text-center mb-16">
            <h1 class="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                Creator <span class="text-primary italic text-glow">Academy</span>
            </h1>
            <p class="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                O centro de conhecimento definitivo para escalar seu negócio digital com inteligência artificial e estratégias de elite.
            </p>
        </div>

        <!-- Featured Card -->
        <div class="max-w-5xl mx-auto">
            <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div class="relative bg-[#0d1117] border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
                    <div class="flex-1 space-y-8 relative z-10">
                        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                            <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            Domine o Mercado Digital
                        </div>
                        <h2 class="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
                            Guia Mestre de <br/> <span class="text-primary">TikTok Shop</span>
                        </h2>
                        <p class="text-neutral-400 text-sm leading-relaxed max-w-md">
                            Explore as diretrizes oficiais e os atalhos validados para construir um ecossistema de vendas lucrativo e escalável.
                        </p>
                        <button class="bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-colors group/btn">
                            Começar Jornada
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </button>
                    </div>
                    <div class="w-full md:w-1/2 aspect-square relative">
                        <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl"></div>
                        <div class="relative w-full h-full glass rounded-3xl flex items-center justify-center border-white/10">
                            <svg viewBox="0 0 24 24" class="w-32 h-32 text-primary fill-current opacity-80 animate-float"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modules Section -->
    <section id="modulos" class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
            
            <!-- Module 1 -->
            <div class="mb-24">
                <div class="flex items-baseline gap-4 mb-12 border-b border-white/5 pb-6">
                    <h2 class="text-3xl md:text-5xl font-black tracking-tighter uppercase">Módulo 1</h2>
                    <span class="text-primary text-xs md:text-sm font-bold uppercase tracking-[0.3em]">Passos Iniciais</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Card 1 -->
                    <div class="group bg-[#0d1117] border border-white/5 rounded-[32px] p-8 hover:border-primary/30 transition-all duration-500">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold mb-4 uppercase tracking-tight">Passos Iniciais</h3>
                        <p class="text-neutral-500 text-xs leading-relaxed mb-8">Tudo o que você precisa saber para começar do jeito certo no ecossistema.</p>
                        <div class="flex items-center justify-between pt-6 border-t border-white/5">
                            <span class="text-[10px] font-black text-primary uppercase tracking-widest">Ler Artigo</span>
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="group bg-[#0d1117] border border-white/5 rounded-[32px] p-8 hover:border-primary/30 transition-all duration-500">
                        <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-neutral-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold mb-4 uppercase tracking-tight">Afiliação TikTok</h3>
                        <p class="text-neutral-500 text-xs leading-relaxed mb-8">Passo a passo detalhado para sua primeira afiliação e configuração de conta.</p>
                        <div class="flex items-center justify-between pt-6 border-t border-white/5">
                            <span class="text-[10px] font-black text-neutral-500 uppercase tracking-widest group-hover:text-primary">Ler Artigo</span>
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="group bg-[#0d1117] border border-white/5 rounded-[32px] p-8 hover:border-primary/30 transition-all duration-500">
                        <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-neutral-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold mb-4 uppercase tracking-tight">Regras & Restrições</h3>
                        <p class="text-neutral-500 text-xs leading-relaxed mb-8">Evite bloqueios e penalidades conhecendo as diretrizes oficiais da plataforma.</p>
                        <div class="flex items-center justify-between pt-6 border-t border-white/5">
                            <span class="text-[10px] font-black text-neutral-500 uppercase tracking-widest group-hover:text-primary">Ler Artigo</span>
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Module 2 -->
            <div>
                <div class="flex items-baseline gap-4 mb-12 border-b border-white/5 pb-6">
                    <h2 class="text-3xl md:text-5xl font-black tracking-tighter uppercase">Módulo 2</h2>
                    <span class="text-primary text-xs md:text-sm font-bold uppercase tracking-[0.3em]">IA & Conteúdo</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Card 1 -->
                    <div class="group bg-[#0d1117] border border-white/5 rounded-[32px] p-8 hover:border-primary/30 transition-all duration-500">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold mb-4 uppercase tracking-tight">Avatares com IA</h3>
                        <p class="text-neutral-500 text-xs leading-relaxed mb-8">Use inteligência artificial para criar apresentadores humanos e realistas para seus vídeos.</p>
                        <div class="flex items-center justify-between pt-6 border-t border-white/5">
                            <span class="text-[10px] font-black text-primary uppercase tracking-widest">Ler Artigo</span>
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="group bg-[#0d1117] border border-white/5 rounded-[32px] p-8 hover:border-primary/30 transition-all duration-500">
                        <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-neutral-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold mb-4 uppercase tracking-tight">Vídeos UGC Criador</h3>
                        <p class="text-neutral-500 text-xs leading-relaxed mb-8">Aprenda a criar roteiros e vídeos que vendem usando nossa ferramenta exclusiva.</p>
                        <div class="flex items-center justify-between pt-6 border-t border-white/5">
                            <span class="text-[10px] font-black text-neutral-500 uppercase tracking-widest group-hover:text-primary">Ler Artigo</span>
                            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 px-6 border-t border-white/5 bg-black/20">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex items-center gap-2">
                <div class="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <svg viewBox="0 0 24 24" class="w-4 h-4 text-black fill-current"><path d="M12 2L4 7V17L12 22L20 17V7L12 2Z"/></svg>
                </div>
                <span class="font-black text-sm tracking-tighter uppercase">Creator<span class="text-primary">Academy</span></span>
            </div>
            <div class="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.4em]">
                © 2026 Generatefy Studio. Todos os direitos reservados.
            </div>
            <div class="flex gap-6">
                <a href="#" class="text-neutral-500 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="#" class="text-neutral-500 hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            </div>
        </div>
    </footer>
</body>
</html>
    `
  }
];
