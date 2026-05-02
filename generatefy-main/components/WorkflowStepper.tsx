import React from 'react';
import { ArrowDown, Check, MessageSquare, Radar, Search, Send, Target } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkflowStepperProps {
  currentStep: number;
  onSelectStep?: (step: number) => void;
}

export default function WorkflowStepper({ currentStep, onSelectStep }: WorkflowStepperProps) {
  const steps = [
    { id: 1, label: 'Mineracao', description: 'Nichos quentes e sinais de mercado', icon: Radar },
    { id: 2, label: 'Oferta', description: 'Produto, promessa e contexto', icon: Target },
    { id: 3, label: 'Copy', description: 'Mensagem e abordagem comercial', icon: MessageSquare },
    { id: 4, label: 'Leads', description: 'Fontes, grupos e lista valida', icon: Search },
    { id: 5, label: 'Disparo', description: 'WhatsApp, fila e execucao', icon: Send },
  ];

  return (
    <aside className="w-full lg:w-[280px] shrink-0 bg-[#050505]/70 backdrop-blur-3xl border-b lg:border-b-0 lg:border-r border-white/[0.04] p-4 lg:p-5 z-20 overflow-y-auto custom-scrollbar">
      <div className="lg:sticky lg:top-0">
        <div className="mb-5 px-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[8px] font-black uppercase tracking-[0.25em] text-primary">
            <ArrowDown className="w-3 h-3" />
            Fluxo vertical
          </div>
          <h2 className="mt-4 text-xl font-black text-white tracking-tight leading-none">
            Jornada de execucao
          </h2>
          <p className="mt-2 text-[10px] text-zinc-500 leading-relaxed font-medium">
            Siga de cima para baixo: mineracao, oferta, copy, leads e disparo final.
          </p>
        </div>

        <div className="relative space-y-3">
          <div className="absolute left-5 top-9 bottom-9 w-px bg-white/[0.06]" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep?.(step.id)}
                className={cn(
                  "w-full relative flex items-stretch gap-3 rounded-3xl p-2 text-left transition-all duration-500 group",
                  isActive
                    ? "bg-white/[0.04] border border-primary/30 shadow-[0_20px_60px_rgba(168,85,247,0.08)]"
                    : "bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.08]"
                )}
              >
                <div
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-500 shrink-0",
                    isActive
                      ? "bg-primary text-black border-primary shadow-[0_0_28px_rgba(168,85,247,0.35)]"
                      : isCompleted
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-black/40 text-zinc-500 border-white/10 group-hover:text-zinc-200"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 animate-in zoom-in-50 duration-500" />
                  ) : (
                    <Icon className="w-4 h-4 transition-transform duration-500 group-hover:scale-110" />
                  )}
                </div>

                <div className="relative z-10 min-w-0 py-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[8px] font-black uppercase tracking-[0.28em]",
                        isActive ? "text-primary" : "text-zinc-600"
                      )}
                    >
                      Etapa 0{step.id}
                    </span>
                    {isActive && (
                      <span className="text-[7px] px-2 py-0.5 rounded-full bg-primary text-black font-black uppercase tracking-widest">
                        Agora
                      </span>
                    )}
                  </div>
                  <h3
                    className={cn(
                      "mt-1 text-sm font-black uppercase tracking-[0.12em]",
                      isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="mt-1 text-[10px] leading-relaxed text-zinc-600 group-hover:text-zinc-500">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[27px] top-[52px] h-[14px] w-px transition-all duration-700",
                      isCompleted ? "bg-primary shadow-[0_0_12px_rgba(168,85,247,0.5)]" : "bg-white/[0.06]"
                    )}
                  />
                )}

                {isActive && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-transparent pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-3xl border border-white/[0.05] bg-black/30 p-4">
          <p className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-600">Atalho seguro</p>
          <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
            A etapa de disparo continua usando o mesmo motor e as mesmas configuracoes que ja validamos.
          </p>
        </div>
      </div>
    </aside>
  );
}
