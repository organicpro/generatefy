
import React, { useState } from 'react';
import { 
  Play, BookOpen, CheckCircle2, Clock, 
  Lock, ChevronRight, Star, Trophy, 
  Search, Filter, PlayCircle, FileText,
  GraduationCap, Zap, Sparkles, Layout,
  ArrowRight, Rocket, Check, MousePointer2,
  Target, MessageSquare, Palette, Globe,
  ShieldCheck, BarChart3, ZapIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article';
  completed: boolean;
  locked?: boolean;
  description: string;
  content?: {
    subtitle?: string;
    sections: {
      title: string;
      items?: string[];
      text?: string;
      type: 'list' | 'text' | 'checklist';
    }[];
  };
}

interface Module {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
  progress: number;
}

const ACADEMY_DATA: Module[] = [
  {
    id: 'm0',
    title: 'MÓDULO 0',
    subtitle: 'CONFIGURAÇÃO DE ELITE',
    progress: 100,
    lessons: [
      {
        id: 'l_api',
        title: 'Configurando sua Chave API Própria (Recomendado)',
        duration: '10 min',
        type: 'article',
        completed: true,
        description: 'Aprenda a turbinar a velocidade da sua IA e garantir uma conexão exclusiva usando sua própria chave gratuita.',
        content: {
          subtitle: 'Tenha o poder total da Generatefy com velocidade máxima.',
          sections: [
            {
              title: 'POR QUE USAR SUA PRÓPRIA CHAVE?',
              text: 'A Generatefy fornece uma chave gratuita para todos começarem imediatamente. Ao configurar sua própria chave gratuita, você garante uma conexão exclusiva e ultra-rápida, permitindo que a IA responda instantaneamente e seu fluxo de trabalho seja sempre fluido.',
              type: 'text'
            },
            {
              title: 'PASSO 1: ACESSANDO O PERFIL',
              text: 'No menu lateral esquerdo, clique no ícone de "Perfil" (o círculo com um bonequinho). Isso abrirá a janela de Identidade Profissional.',
              type: 'text'
            },
            {
              title: 'PASSO 2: OBTENDO A CHAVE NO GOOGLE',
              items: [
                'Acesse o console da Groq (console.groq.com/keys).',
                'Faça login com sua conta Google.',
                'Clique no botão "Get API Key" no menu lateral.',
                'Clique em "Create API key in new project".',
                'Copie o codigo que comeca com "gsk_...".'
              ],
              type: 'list'
            },
            {
              title: 'PASSO 3: COLANDO NO GENERATEFY',
              items: [
                'Volte para a Generatefy e clique em "Chave API Própria" dentro do seu Perfil.',
                'Cole o codigo no campo "Chave Neural Groq".',
                'Clique no botão "Testar" para garantir que está funcionando.',
                'Clique em "Salvar Configurações".'
              ],
              type: 'list'
            }
          ]
        }
      },
      {
        id: 'l_identity',
        title: 'Sua Identidade de Consultor',
        duration: '5 min',
        type: 'article',
        completed: true,
        description: 'Como o seu perfil influencia a qualidade dos sites e das abordagens geradas pela IA.',
        content: {
          subtitle: 'A IA trabalha melhor quando sabe quem você é.',
          sections: [
            {
              title: 'PERSONALIZAÇÃO DE RESULTADOS',
              text: 'Ao preencher seu nome e especialidade no perfil, a IA da Generatefy passa a escrever textos e abordagens como se fosse você. Isso aumenta a autoridade perante o cliente.',
              type: 'text'
            },
            {
              title: 'PASSO A PASSO',
              items: [
                'Abra seu Perfil no menu lateral.',
                'No campo "Sua Marca / Nome", coloque o nome da sua agência ou seu nome profissional.',
                'Em "Especialidade", defina seu foco (ex: Especialista em Sites para Dentistas).',
                'Salve as alterações.'
              ],
              type: 'list'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'm1',
    title: 'MÓDULO 1',
    subtitle: 'O BUILDER NEURAL',
    progress: 100,
    lessons: [
      { 
        id: 'l1', 
        title: 'Criando Sites do Zero via Chat', 
        duration: '12 min', 
        type: 'article', 
        completed: true, 
        description: 'Como usar o chat para construir estruturas complexas em segundos.',
        content: {
          subtitle: 'Converse com a IA e veja a mágica acontecer.',
          sections: [
            {
              title: 'PASSO 1: O COMANDO MESTRE',
              text: 'Vá na aba "Chat" (ícone de balão). Digite o que você precisa. Dica para leigos: Imagine que está pedindo para um funcionário muito inteligente.',
              type: 'text'
            },
            {
              title: 'ESTRUTURA IDEAL DE PEDIDO',
              items: [
                'O que é: "Crie uma landing page para uma academia de Crossfit".',
                'Cores: "Use tons de preto e laranja neon".',
                'Seções: "Preciso de preços, depoimentos e um botão para o WhatsApp".',
                'Diferencial: "Destaque que a primeira aula é grátis".'
              ],
              type: 'list'
            },
            {
              title: 'PASSO 2: REFINAMENTO',
              text: 'Se o site não ficou 100% como você queria, não apague! Apenas diga no chat: "Troque a cor do fundo para azul" ou "Aumente o tamanho do título principal". A IA entende o contexto e altera apenas o necessário.',
              type: 'text'
            }
          ]
        }
      },
      { 
        id: 'l2', 
        title: 'Editor Visual: O Toque Final', 
        duration: '15 min', 
        type: 'article', 
        completed: true, 
        description: 'Aprenda a editar qualquer elemento do site clicando diretamente nele.',
        content: {
          subtitle: 'Personalização sem código para resultados profissionais.',
          sections: [
            {
              title: 'PASSO 1: ENTRANDO NO EDITOR',
              text: 'Após gerar o site no chat, clique no ícone de "Editor Visual" (o layout de grade) no menu lateral.',
              type: 'text'
            },
            {
              title: 'PASSO 2: EDITANDO CONTEÚDO',
              items: [
                'Texto: Clique em qualquer texto e digite o que quiser.',
                'Imagens: Clique na imagem para trocar por uma foto sua ou pedir para a IA gerar uma nova.',
                'Botões: Clique no botão para mudar o link (ex: colocar seu número de WhatsApp).'
              ],
              type: 'list'
            },
            {
              title: 'PASSO 3: REGENERAR SEÇÕES',
              text: 'Se uma parte específica do site (ex: o rodapé) não te agradou, selecione ela e clique em "Regenerar". Você pode dar um comando novo apenas para aquele bloco.',
              type: 'text'
            },
            {
              title: 'PASSO 4: CÓDIGO E DOWNLOAD',
              text: 'Para usuários avançados, clique no ícone de "Código" para editar o HTML manualmente. Você também pode clicar em "Baixar" para salvar o arquivo do site no seu computador.',
              type: 'text'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'm2',
    title: 'MÓDULO 2',
    subtitle: 'PROSPECÇÃO LUCRATIVA',
    progress: 45,
    lessons: [
      { 
        id: 'l3', 
        title: 'Lead Finder: Encontrando Clientes Reais', 
        duration: '12 min', 
        type: 'article', 
        completed: true, 
        description: 'Como usar o radar da Generatefy para encontrar empresas que estão perdendo dinheiro por não terem um site.',
        content: {
          subtitle: 'Minere clientes prontos para comprar.',
          sections: [
            {
              title: 'PASSO 1: CONFIGURANDO A BUSCA',
              text: 'Vá na aba "Lead Finder" (ícone de radar). No campo de busca, coloque o nicho e a cidade. Ex: "Advogados em Curitiba".',
              type: 'text'
            },
            {
              title: 'PASSO 2: FILTRANDO OPORTUNIDADES',
              items: [
                'Olhe a coluna "Site". Se estiver vazio, essa empresa NÃO tem site.',
                'Esses são seus melhores clientes: eles precisam de você agora.',
                'Clique no ícone de "Coração" ou "Salvar" para enviar esse lead para sua lista de projetos.'
              ],
              type: 'list'
            }
          ]
        }
      },
      { 
        id: 'l4', 
        title: 'Abordagem Irresistível via IA', 
        duration: '10 min', 
        type: 'article', 
        completed: false, 
        description: 'Como gerar mensagens de vendas que convertem desconhecidos em clientes pagantes.',
        content: {
          subtitle: 'Venda sem parecer um vendedor chato.',
          sections: [
            {
              title: 'PASSO 1: SELECIONANDO O ALVO',
              text: 'Vá na aba "Abordagem" (ícone de mensagem). Selecione o lead que você salvou no passo anterior.',
              type: 'text'
            },
            {
              title: 'PASSO 2: GERANDO O SCRIPT',
              items: [
                'Escolha o canal: WhatsApp, E-mail ou Direct.',
                'Escolha o tom: "Amigável" costuma funcionar melhor para o primeiro contato.',
                'A IA criará uma mensagem personalizada citando o nome da empresa do cliente.'
              ],
              type: 'list'
            },
            {
              title: 'DICA DE OURO',
              text: 'Antes de enviar a mensagem, gere um rascunho de site para o cliente no Builder. Mande o link do rascunho na mensagem. Ver o site pronto faz o cliente fechar muito mais rápido!',
              type: 'text'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'm3',
    title: 'MÓDULO 3',
    subtitle: 'DESIGN & CRIATIVOS',
    progress: 0,
    lessons: [
      { 
        id: 'l5', 
        title: 'Post Studio: Artes em Segundos', 
        duration: '15 min', 
        type: 'article', 
        completed: false, 
        description: 'Crie posts profissionais para o Instagram do seu cliente sem precisar de designers.',
        content: {
          subtitle: 'Agregue valor ao seu serviço de criação de sites.',
          sections: [
            {
              title: 'PASSO 1: O TEMA DO POST',
              text: 'Acesse o "Post Studio" (ícone de imagem). Digite o que você quer criar. Ex: "Post sobre os benefícios da limpeza de pele".',
              type: 'text'
            },
            {
              title: 'PASSO 2: GERAÇÃO E EDIÇÃO',
              items: [
                'A IA gera a imagem e o texto do post.',
                'Use a ferramenta de "Remover Fundo" se quiser colocar a foto de um produto real do cliente.',
                'Baixe a arte e a legenda pronta para postar.'
              ],
              type: 'list'
            }
          ]
        }
      }
    ]
  }
];

const Academy: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [view, setView] = useState<'home' | 'lesson'>('home');

  const handleStartJourney = () => {
    setSelectedLesson(ACADEMY_DATA[0].lessons[0]);
    setView('lesson');
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  };

  if (view === 'lesson' && selectedLesson) {
    return (
      <div className="flex flex-col h-full bg-background text-foreground overflow-y-auto custom-scrollbar">
        {/* Lesson Header */}
        <div className="p-8 border-b border-white/5 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setView('home')}
              className="text-neutral-500 hover:text-primary transition-colors mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Voltar para Academy
            </button>
            
            <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">{selectedLesson.title}</h1>
            <p className="text-neutral-500 text-lg italic">{selectedLesson.content?.subtitle || selectedLesson.description}</p>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="max-w-4xl mx-auto p-8 md:p-12 space-y-12 pb-32">
          {selectedLesson.content?.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-xl font-black tracking-widest uppercase text-primary">{section.title}</h2>
              
              {section.type === 'text' && (
                <p className="text-neutral-400 leading-relaxed text-lg">{section.text}</p>
              )}

              {section.type === 'checklist' && (
                <div className="space-y-4">
                  {section.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary/20 transition-colors">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-neutral-300 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'list' && (
                <div className="space-y-6">
                  {section.items?.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <span className="text-primary font-black text-xl">{i + 1}.</span>
                      <p className="text-neutral-300 text-lg leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                 <CheckCircle2 className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Status da Aula</p>
                 <p className="font-bold text-white">{selectedLesson.completed ? 'Aula Concluída' : 'Pendente'}</p>
               </div>
            </div>
            <button className={cn(
              "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
              selectedLesson.completed 
                ? "bg-white/5 text-neutral-500 border border-white/10" 
                : "bg-primary text-black shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:scale-105"
            )}>
              {selectedLesson.completed ? 'Concluído' : 'Marcar como Concluído'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <div className="pt-20 pb-12 px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <ZapIcon className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Plataforma de Elite</span>
        </div>
        <h1 className="text-6xl font-black tracking-tighter uppercase">GENERATEFY <span className="text-primary">ACADEMY</span></h1>
        <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-medium">
          O centro de conhecimento definitivo para escalar seu negócio digital com o ecossistema Generatefy.
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full px-8 space-y-24 pb-32">
        {/* Main Banner */}
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-primary via-primary/50 to-background p-[1px]">
          <div className="bg-card/80 backdrop-blur-xl rounded-[39px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Aprenda com quem domina o mercado</span>
              </div>
              
              <h2 className="text-6xl font-black tracking-tighter leading-[0.9]">Guia Mestre de <br /> <span className="text-primary">Generatefy Engine</span></h2>
              
              <p className="text-neutral-400 text-xl leading-relaxed">
                Domine a inteligência artificial para criar sites, prospectar clientes e escalar sua agência digital.
              </p>

              <button 
                onClick={handleStartJourney}
                className="bg-primary text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,255,0.2)]"
              >
                COMEÇAR JORNADA <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full max-w-sm aspect-square rounded-[48px] bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Rocket className="w-32 h-32 text-primary group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Layout className="w-8 h-8 text-primary/40" />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="absolute top-20 right-12 w-1 h-1 rounded-full bg-primary/60" />
              <div className="absolute bottom-20 left-16 w-1 h-1 rounded-full bg-primary/40" />
            </div>
          </div>
        </div>

        {/* Modules */}
        {ACADEMY_DATA.map((module) => (
          <div key={module.id} className="space-y-10">
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-6">
              <h3 className="text-4xl font-black tracking-tighter uppercase">{module.title}</h3>
              <span className="text-primary font-black text-xs uppercase tracking-widest">{module.subtitle}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {module.lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className={cn(
                    "bg-card border border-white/5 rounded-[40px] p-10 space-y-8 group transition-all relative overflow-hidden",
                    lesson.locked ? "opacity-50" : "hover:border-primary/30 hover:-translate-y-2 cursor-pointer"
                  )}
                  onClick={() => !lesson.locked && handleSelectLesson(lesson)}
                >
                  {lesson.locked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                      <Lock className="w-8 h-8 text-neutral-500" />
                    </div>
                  )}

                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                    {lesson.type === 'video' ? (
                      <PlayCircle className="w-6 h-6 text-primary" />
                    ) : (
                      <FileText className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">{lesson.title}</h4>
                    <p className="text-neutral-500 text-sm italic leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                      {lesson.type === 'video' ? 'ASSISTIR VÍDEO' : 'LER ARTIGO'}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all">
                      <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-black" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">
          {[
            { label: 'Aulas Totais', value: '12', icon: BookOpen },
            { label: 'Horas de Conteúdo', value: '4.5h', icon: Clock },
            { label: 'Alunos Ativos', value: '1.2k', icon: Star },
            { label: 'Certificados', value: '850', icon: Trophy },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center space-y-2">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-50" />
              <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academy;
