
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, X, Sparkles, MousePointer2, Radar, MessageSquare, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface TourStep {
  target: string;
  title: string;
  content: string;
  icon: any;
}

const TOUR_STEPS: TourStep[] = [
  {
    target: 'tour-welcome',
    title: 'Bem-vindo ao Generatefy Engine!',
    content: 'Eu sou sua inteligência assistente. Vou te mostrar como transformar ideias em um negócio digital lucrativo em menos de 2 minutos.',
    icon: Sparkles,
  },
  {
    target: 'tour-input',
    title: 'Sua Varinha Mágica',
    content: 'É aqui que a mágica acontece. Basta digitar o que você quer criar. Exemplo: "Um site para uma padaria artesanal" ou "Posts para minha barbearia".',
    icon: MousePointer2,
  },
  {
    target: 'tour-sidebar',
    title: 'Menu de Navegação',
    content: 'Aqui você alterna entre criar seu site, encontrar clientes ou gerar mensagens de venda.',
    icon: LayoutGrid,
  },
  {
    target: 'tour-prospector',
    title: 'Encontre Clientes Reais',
    content: 'Com esta ferramenta, nós rastreamos negócios reais no Google Maps que precisam de um site novo. É a sua mina de ouro.',
    icon: Radar,
  },
  {
    target: 'tour-outreach',
    title: 'Máquina de Abordagem',
    content: 'Depois de achar o cliente, nós criamos a mensagem perfeita de WhatsApp ou E-mail para você fechar a venda com facilidade.',
    icon: MessageSquare,
  },
  {
    target: 'tour-finish',
    title: 'Pronto para Decolar!',
    content: 'Agora o controle é seu. Comece descrevendo seu primeiro projeto abaixo e veja a mágica acontecer!',
    icon: CheckCircle2,
  }
];

interface GuidedTourProps {
  onClose: () => void;
  active: boolean;
}

export default function GuidedTour({ active, onClose }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0, isVisible: false });

  useEffect(() => {
    if (!active) return;

    const updateSpotlight = () => {
      const step = TOUR_STEPS[currentStep];
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      
      if (el) {
        const rect = el.getBoundingClientRect();
        setCoords({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          isVisible: true
        });
        
        // Garante que o elemento em destaque esteja visível
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Se for o passo de boas vindas ou fim (center), desativamos o spotlight específico
        setCoords(prev => ({ ...prev, isVisible: false }));
      }
    };

    const timer = setTimeout(updateSpotlight, 150);
    window.addEventListener('resize', updateSpotlight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSpotlight);
    };
  }, [currentStep, active]);

  if (!active) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none flex flex-col items-center justify-end p-4 md:p-8">
      {/* Overlay com Spotlight dinâmico móvel */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-[2px] transition-all duration-700 pointer-events-auto"
        style={{
          clipPath: !coords.isVisible 
            ? 'none' 
            : `polygon(0% 0%, 0% 100%, ${coords.left}px 100%, ${coords.left}px ${coords.top}px, ${coords.left + coords.width}px ${coords.top}px, ${coords.left + coords.width}px ${coords.top + coords.height}px, ${coords.left}px ${coords.top + coords.height}px, ${coords.left}px 100%, 100% 100%, 100% 0%)`
        }}
      />

      {/* Painel de Instruções FIXO na base */}
      <div className="w-full max-w-2xl pointer-events-auto animate-in slide-in-from-bottom-10 duration-500 delay-150">
        <div className="bg-card/90 backdrop-blur-2xl border border-primary/30 rounded-[2.5rem] p-6 md:p-8 shadow-[0_-20px_80px_rgba(0,255,255,0.15)] relative overflow-hidden group">
          {/* Luz de fundo decorativa */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Ícone Animado */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] bg-primary/20 flex items-center justify-center text-primary border border-primary/20 animate-pulse shrink-0">
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-between gap-4">
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-none">
                  {step.title}
                </h3>
                <button 
                  onClick={onClose} 
                  className="hidden md:block p-2 text-neutral-600 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[13px] md:text-sm text-neutral-400 leading-relaxed font-medium">
                {step.content}
              </p>
            </div>

            {/* Controles */}
            <div className="flex flex-col items-center md:items-end gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button 
                    onClick={handlePrev}
                    className="p-3 rounded-2xl bg-white/5 text-neutral-400 hover:text-white border border-white/5 transition-all active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <button 
                  onClick={handleNext}
                  className="px-8 py-4 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? 'Finalizar' : 'Entendi'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Indicador de passos */}
              <div className="flex gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1 rounded-full transition-all duration-500", 
                      i === currentStep ? "w-6 bg-primary" : "w-1.5 bg-white/10"
                    )} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
