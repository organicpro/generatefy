
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, History, Send, MessageSquare, Plus, Clock, 
  ShieldCheck, LayoutGrid, Target, DollarSign, Menu, X, Home,
  ChevronRight, Layers, Box, Trash2, BrainCircuit, Palette, Radar, FolderOpen, GraduationCap,
  Zap, HelpCircle, UserCircle, Loader2, Image as ImageIcon, Crown, Moon, Sun, Ghost, Database
} from 'lucide-react';
import { GenerationStatus, AppView, VisualPreset } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  onGenerate: (description: string) => void;
  onReset: () => void;
  status: GenerationStatus;
  history: string[];
  isCooldown?: boolean;
  onClearContext?: () => void;
  hasContext?: boolean;
  currentView: AppView;
  setView: (view: AppView) => void;
  onOpenIdentity: () => void;
  activePreset?: string;
  onPresetChange?: (preset: string) => void;
  workflowStep: number;
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

const Sidebar: React.FC<SidebarProps> = ({ 
  onGenerate, onReset, status, history, isCooldown, onClearContext,
  hasContext, currentView, setView, onOpenIdentity, activePreset, onPresetChange, workflowStep
}) => {
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && status !== GenerationStatus.GENERATING && !isCooldown) {
      onGenerate(description);
      setDescription('');
      if (currentView !== 'builder') setView('builder');
      setIsOpen(false);
    }
  };

  const NavItem = ({ view, icon: Icon, label, badge, onClick, tourId }: { view?: AppView | 'chat', icon: any, label: string, badge?: string, onClick?: () => void, tourId?: string }) => {
    const isActive = view && currentView === view;
    return (
      <button
        onClick={onClick ? onClick : () => { 
          if (view === 'chat') onReset();
          else if (view) setView(view); 
          setIsOpen(false); 
        }}
        data-tour={tourId}
        className={cn(
          "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden",
          isActive 
            ? "bg-white/[0.03] text-white shadow-[0_0_20px_rgba(168,85,247,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5" 
            : "text-zinc-500 hover:text-white hover:bg-white/[0.01]",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        {isActive && (
          <div className="absolute inset-0 bg-primary/5 blur-2xl animate-pulse" />
        )}
        <div className={cn(
          "p-2 rounded-xl transition-all duration-500 relative z-10",
          isActive ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "bg-transparent text-zinc-500 group-hover:text-primary/70"
        )}>
          <Icon className={cn("w-4 h-4", isActive ? "scale-110" : "group-hover:scale-110")} />
        </div>
        {!isCollapsed && (
          <div className="flex flex-1 items-center justify-between overflow-hidden animate-in fade-in slide-in-from-left-2 duration-500 relative z-10">
            <span className={cn(
              "font-black text-[10px] uppercase tracking-[0.2em] truncate",
              isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
            )}>{label}</span>
            {badge && (
              <span className={cn(
                "text-[7px] px-2 py-0.5 rounded-lg font-black border animate-in zoom-in duration-500", 
                isActive ? "bg-primary text-black border-primary" : "bg-white/5 text-zinc-700 border-white/5"
              )}>
                {badge}
              </span>
            )}
          </div>
        )}
        {isActive && !isCollapsed && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-primary rounded-l-full shadow-[0_0_20px_rgba(168,85,247,1)]" />
        )}
      </button>
    );
  };

  const isGenerating = status === GenerationStatus.GENERATING;

  return (
    <>
      <div className="lg:hidden fixed top-6 left-6 z-[70]">
        <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside 
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 flex flex-col h-screen transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) lg:translate-x-0 overflow-visible",
          !isOpen ? "-translate-x-full" : "translate-x-0",
          isCollapsed ? "w-[80px]" : "w-[280px]",
          "bg-zinc-950/80 backdrop-blur-xl border-r border-white/5"
        )}
      >
        {/* Toggle Button - Tactical Handle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-[100] flex items-center justify-center transition-all duration-500",
            "w-8 h-8 rounded-full border border-white/10 bg-zinc-950 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-primary/20 group",
            "right-0 translate-x-1/2"
          )}
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <ChevronRight className={cn("w-4 h-4 text-primary transition-transform duration-500 relative z-10", !isCollapsed && "rotate-180")} />
        </button>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Section */}
          <div className="p-6 pb-8 flex items-center justify-center shrink-0">
            <div className={cn("flex items-center gap-3 transition-all duration-500", isCollapsed ? "flex-col" : "flex-row")}>
              <div className="relative group cursor-pointer" onClick={onReset}>
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 group-hover:scale-125 transition-transform duration-700" />
                <GeneratefyLogo className={cn("relative z-10 transition-all duration-500", isCollapsed ? "w-8 h-8" : "w-12 h-12")} />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700">
                  <div className="flex items-baseline leading-none">
                    <span className="font-black text-xl text-white tracking-tighter uppercase">Generatefy</span>
                    <span className="font-black text-[9px] text-primary tracking-[0.4em] ml-2">CORE</span>
                  </div>
                  <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-1.5 opacity-60">Engine Automata v3.0</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Navigation */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-10">
          <div>
            {!isCollapsed && <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] px-5 mb-6 opacity-40">Menu de Operação</p>}
            <div className="space-y-1">
              <NavItem view="product-creator" icon={Zap} label="Criar Oferta" badge={workflowStep === 1 ? "LIVE" : undefined} />
              <NavItem view="builder" icon={LayoutGrid} label="Landing Page" badge={workflowStep === 2 ? "LIVE" : undefined} />
              <NavItem view="outreach" icon={MessageSquare} label="Scripts Copy" badge={workflowStep === 3 ? "LIVE" : undefined} />
              <NavItem view="finder" icon={Target} label="Lead Finder" badge={workflowStep === 4 ? "LIVE" : undefined} />
              <NavItem view="bulk-sender" icon={Send} label="Engine de Conversão" badge={workflowStep === 5 ? "LIVE" : undefined} />
            </div>
          </div>

          <div>
            {!isCollapsed && <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] px-5 mb-6 opacity-40">Preferências</p>}
            <div className="space-y-1">
              <NavItem view="projects" icon={FolderOpen} label="Projetos Salvos" />
              <NavItem onClick={onOpenIdentity} icon={UserCircle} label="Configuração" />
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="p-6 border-t border-white/5 flex items-center justify-center bg-white/[0.01]">
          <div className={cn("flex items-center gap-4 transition-all duration-500", isCollapsed ? "flex-col" : "flex-row")}>
             <div className="relative">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(168,85,247,1)]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping" />
             </div>
             {!isCollapsed && (
               <div className="flex flex-col">
                 <span className="text-[8px] font-black text-white uppercase tracking-[0.1em]">Motor Online</span>
                 <span className="text-[6px] font-bold text-zinc-600 uppercase tracking-[0.1em]">Latência 24ms</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  </aside>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-500" />}
    </>
  );
};

export default Sidebar;
