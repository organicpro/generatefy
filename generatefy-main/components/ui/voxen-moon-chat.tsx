
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import BackgroundGradient from "./background-gradient";
import {
  ArrowUp,
  Paperclip,
  Loader2,
  Sparkles,
  Target,
  DollarSign,
  LayoutGrid,
  ChevronRight,
  Terminal,
  MousePointer2,
  Radar,
  MessageSquare,
  Database
} from "lucide-react";
import { AppView } from "../../types";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`; // reset first
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

const GeneratefyLogo = ({ className }: { className?: string }) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" className="stroke-primary/40" strokeWidth="0.5" />
      <path d="M12 7V12L16 14" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" className="fill-white animate-ping" />
    </svg>
  </div>
);

interface VoxenMoonChatProps {
  onGenerate: (desc: string) => void;
  isGenerating: boolean;
  onNavigate: (view: AppView) => void;
  onImportHtml?: (html: string) => void;
}

export default function VoxenMoonChat({ onGenerate, isGenerating, onNavigate, onImportHtml }: VoxenMoonChatProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  const handleSend = () => {
    if (message.trim() && !isGenerating) {
      onGenerate(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && onImportHtml) {
        onImportHtml(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-x-hidden bg-[#020202]">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03)_0%,transparent_70%)]" />
      </div>

      <BackgroundGradient />

      {/* Modern Header Interface */}
      <header className="w-full h-20 md:h-24 px-8 md:px-12 flex items-center justify-between z-20 sticky top-0 bg-black/20 backdrop-blur-md border-b border-white/[0.02]">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 shadow-2xl">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,1)] relative">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
              </div>
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] leading-none">Núcleo Neural v3.0</span>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <button onClick={() => onNavigate('projects')} className="group flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-all">
             <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Hub de Estúdio
           </button>
        </div>
      </header>

      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 px-6 py-12 md:py-24">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 w-full max-w-5xl">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.02] border border-white/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase mx-auto shadow-2xl backdrop-blur-sm">
            <Terminal className="w-3 h-3" />
            Infraestrutura Neural para Sistemas de Elite
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.8] break-words">
              Digital <span className="text-primary italic relative">
                Alchemy.
                <div className="absolute -bottom-2 left-0 w-full h-[4px] bg-primary/20 blur-sm"></div>
              </span>
            </h1>
            <p className="text-[10px] md:text-xs text-zinc-500 font-medium max-w-xl mx-auto leading-relaxed px-4 opacity-60 uppercase tracking-widest">
              Transforme ideias brutas em ecossistemas lucrativos com design cinematográfico. 
              A tecnologia <b>Generatefy Core</b> sincroniza cada estágio da sua operação digital.
            </p>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-12 md:mt-20 space-y-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300" data-tour="tour-input">
          <div className="relative glass-card border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] focus-within:border-primary/40 focus-within:shadow-[0_0_80px_rgba(168,85,247,0.1)] transition-all duration-700 overflow-hidden group bg-zinc-950/40 backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
            
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Descreva o ecossistema que deseja materializar..."
              className={cn(
                "w-full px-6 py-6 md:px-10 md:py-8 resize-none border-none bg-transparent",
                "text-base md:text-lg lg:text-xl text-white leading-tight font-black",
                "focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-800",
                "min-h-[80px] md:min-h-[100px] custom-scrollbar"
              )}
            />

            <div className="flex items-center justify-between px-8 py-5 md:px-12 md:py-8 bg-black/40 border-t border-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-zinc-600 hover:text-white rounded-2xl h-12 w-12 shrink-0 transition-all border border-white/5 hover:border-primary/20 hover:bg-primary/5 shadow-inner"
                  title="Banco de Dados Neural"
                >
                  <Database className="w-5 h-5" />
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".html" 
                  className="hidden" 
                />
                
                <div className="h-6 w-px bg-white/5 mx-2 hidden sm:block" />
                <div className="hidden lg:flex flex-col">
                  <span className="text-[7px] font-black uppercase tracking-[0.3em] text-zinc-700">Nível de Automação</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400">Enterprise Edition</span>
                </div>
              </div>

              <Button
                onClick={handleSend}
                disabled={!message.trim() || isGenerating}
                className={cn(
                  "h-14 md:h-16 px-8 md:px-16 rounded-[1.25rem] transition-all duration-700 font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px] border shadow-2xl group",
                  message.trim() && !isGenerating
                    ? "bg-primary border-primary text-black hover:bg-transparent hover:text-white hover:border-white/20 shadow-[0_20px_50px_rgba(168,85,247,0.3)]"
                    : "bg-white/5 text-zinc-800 border-white/5 cursor-not-allowed"
                )}
              >
                {isGenerating ? (
                   <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline">Materializar Ignição</span>
                    <span className="sm:hidden">Ignição</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 px-4">
            <button 
              onClick={() => onNavigate('product-creator')}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.02] rounded-[2.5rem] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-700 group relative overflow-hidden shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 shrink-0 border border-white/5 group-hover:border-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate">Criar Oferta</p>
                <p className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.3em] truncate">Neural Engine</p>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('builder')}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.02] rounded-[2.5rem] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-700 group shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 shrink-0 border border-white/5 group-hover:border-primary/20">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate">Vendas Studio</p>
                <p className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.3em] truncate">Visual Hub</p>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('outreach')}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.02] rounded-[2.5rem] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-700 group shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 shrink-0 border border-white/5 group-hover:border-primary/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate">Abordagem Elite</p>
                <p className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.3em] truncate">Copy Lab</p>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('bulk-sender')}
              className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.02] rounded-[2.5rem] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-700 group shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 shrink-0 border border-white/5 group-hover:border-primary/20">
                <Radar className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate">Mass Trafic</p>
                <p className="text-[7px] text-zinc-600 font-bold uppercase tracking-[0.3em] truncate">Radar Hub</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
