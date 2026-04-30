
import React from 'react';
import { Target, Layout, MessageSquare, Search, Send, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkflowStepperProps {
  currentStep: number;
}

export default function WorkflowStepper({ currentStep }: WorkflowStepperProps) {
  const steps = [
    { id: 1, label: 'Produto Neural', icon: Target },
    { id: 2, label: 'Design Central', icon: Layout },
    { id: 3, label: 'Scripts de Copy', icon: MessageSquare },
    { id: 4, label: 'Fonte de Leads', icon: Search },
    { id: 5, label: 'Engine de Conversão', icon: Send },
  ];

  return (
    <div className="w-full bg-[#050505]/60 backdrop-blur-3xl border-b border-white/[0.03] px-6 py-4 flex items-center justify-center shrink-0 z-20 overflow-hidden relative">
      {/* Subtle Lighting Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.02]" />
      
      <div className="flex items-center gap-0 max-w-7xl w-full justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 relative group min-w-[60px] sm:min-w-[80px] md:min-w-[120px]">
                {/* Step Circle with Glow */}
                <div 
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center border-2 transition-all duration-1000 relative overflow-hidden shrink-0",
                    isActive ? "bg-primary border-primary shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-110" : 
                    isCompleted ? "bg-white/5 border-primary/40 text-primary" : 
                    "bg-white/5 border-white/10 text-zinc-400"
                  )}
                >
                  {isActive && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                  {isCompleted ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5 animate-in zoom-in-50 duration-500" />
                  ) : (
                    <Icon className={cn("w-4 h-4 md:w-5 md:h-5 transition-transform duration-500", isActive ? "text-black group-hover:scale-125" : "group-hover:text-primary group-hover:scale-110")} />
                  )}
                </div>

                {/* Label with Modern Typography */}
                <div className="flex flex-col items-center gap-0.5 text-center px-1 h-8 justify-start">
                  <span 
                    className={cn(
                      "inline-block text-[7px] font-black uppercase tracking-[0.3em] transition-all duration-700 whitespace-nowrap",
                      isActive ? "text-primary translate-y-0 opacity-100" : "text-zinc-500 opacity-60 group-hover:opacity-100"
                    )}
                  >
                    Fase 0{step.id}
                  </span>
                  <span 
                    className={cn(
                      "inline-block text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-700 leading-tight break-words max-w-[80px] md:max-w-[120px]",
                      isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                
                {isActive && (
                  <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" />
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="w-6 sm:w-12 lg:w-24 h-[2px] bg-white/5 rounded-full relative overflow-hidden shrink-0 -translate-y-4 md:-translate-y-5">
                  <div 
                    className={cn(
                      "absolute inset-y-0 left-0 bg-primary transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(168,85,247,0.5)]",
                      isCompleted ? "w-full" : "w-0"
                    )} 
                  />
                  {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[progress-pulse_2s_infinite] h-full" />
                  )}
                  {!isCompleted && !isActive && (
                    <div className="absolute inset-x-0 h-full bg-white/5" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        @keyframes progress-pulse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
