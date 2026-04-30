
import React from 'react';
import { FolderOpen, Calendar, Trash2, ArrowUpRight, Box, Clock, Layout, Search, Plus, Play, Edit3 } from 'lucide-react';
import { SavedProject } from '../types';
import { cn } from '../lib/utils';

interface ProjectManagerProps {
  projects: SavedProject[];
  onLoadProject: (project: SavedProject) => void;
  onDeleteProject: (id: string) => void;
  onClearAll?: () => void;
  onNewProject: () => void;
}

export default function ProjectManager({ projects, onLoadProject, onDeleteProject, onClearAll, onNewProject }: ProjectManagerProps) {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="w-full h-full flex flex-col bg-black overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-16 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 pb-20">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] md:text-[10px] font-black tracking-widest uppercase">
                <FolderOpen className="w-3.5 h-3.5" />
                Project Repository
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">Meus <span className="text-primary italic">Projetos.</span></h1>
              <p className="text-neutral-500 max-w-xl text-xs md:text-sm font-medium">
                Acesse e gerencie todos os seus sites salvos. Retome edições ou exporte códigos finalizados.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              {projects.length > 0 && onClearAll && (
                <button 
                  onClick={() => { if(confirm('Limpar todos os projetos locais e sincronizar?')) onClearAll() }}
                  className="px-6 py-4 bg-white/5 hover:bg-destructive/10 text-neutral-500 hover:text-destructive rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all border border-white/5"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar Tudo
                </button>
              )}
              <button 
                onClick={onNewProject}
                className="px-8 py-4 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
              >
                <Plus className="w-4 h-4" />
                Novo Projeto
              </button>
            </div>
          </header>

          {projects.length === 0 ? (
            <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-neutral-700 flex items-center justify-center">
                <Box className="w-8 h-8 md:w-10 md:h-10 text-neutral-700" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-500">Nenhum projeto salvo ainda</p>
                <button onClick={onNewProject} className="text-[10px] text-primary font-bold uppercase hover:underline">Começar agora</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="group bg-card/40 border border-white/5 rounded-3xl p-6 hover:border-primary/40 hover:bg-card transition-all duration-500 flex flex-col h-full relative overflow-hidden shadow-2xl"
                >
                  {/* Overlay de Hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black text-neutral-500 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                        <Clock className="w-3 h-3 text-primary" />
                        {formatDate(project.timestamp)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8 flex-1 relative z-10">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight line-clamp-1">{project.name}</h3>
                    <p className="text-[10px] md:text-xs text-neutral-500 leading-relaxed line-clamp-2 italic font-medium">
                      "{project.description}"
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/5 relative z-10">
                    <button 
                      onClick={() => onLoadProject(project)}
                      className="flex-1 flex items-center justify-center py-3.5 bg-primary text-background rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-2" /> Retomar Edição
                    </button>
                    <button 
                      onClick={() => { if(confirm('Excluir este projeto permanentemente?')) onDeleteProject(project.id) }}
                      className="w-12 flex items-center justify-center bg-white/5 hover:bg-destructive/10 text-neutral-600 hover:text-destructive rounded-xl transition-all border border-white/5 active:scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
