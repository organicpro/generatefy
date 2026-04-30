
import React, { useState } from 'react';
import { Layout, Search, Filter, ArrowRight, CheckCircle2, Sparkles, Zap, Crown, Star } from 'lucide-react';
import { TEMPLATES, Template } from '../constants/templates';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TemplatesProps {
  onSelect: (template: Template) => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelect }) => {
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  const categories = ['Todos', ...Array.from(new Set(TEMPLATES.map(t => t.category)))];

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesFilter = filter === 'Todos' || t.category === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                         t.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#07090e]">
      {/* Header */}
      <div className="p-8 border-b border-white/5 bg-black/20 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest"
            >
              <Crown className="w-3 h-3" />
              Elite Templates
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black tracking-tighter text-white"
            >
              MODELOS DE <span className="text-primary italic">ELITE</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neutral-500 max-w-md text-sm leading-relaxed"
            >
              Comece com uma base de alto nível. Designs inspirados no Framer, otimizados para conversão e performance.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all w-full sm:w-64"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-8 py-4 border-b border-white/5 bg-black/10">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * idx }}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                filter === cat 
                  ? "bg-primary text-background shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-neutral-500 hover:text-white hover:bg-white/10 border border-white/5"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, idx) => (
              <motion.div 
                layout
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.05 * idx }}
                className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col"
              >
                {/* Preview Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                     <button 
                      onClick={() => onSelect(template)}
                      className="w-full bg-primary text-background py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95"
                     >
                       Usar este Modelo
                       <Zap className="w-3 h-3 fill-current" />
                     </button>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                      {template.category}
                    </span>
                    {template.featured && (
                      <span className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 flex items-center gap-1">
                        <Star className="w-2 h-2 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">{template.name}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed mb-6">
                      {template.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      Responsivo
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      <Sparkles className="w-3 h-3 text-primary" />
                      SEO Ready
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTemplates.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Search className="w-8 h-8 text-neutral-700" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nenhum modelo encontrado</h3>
            <p className="text-neutral-500 max-w-xs mx-auto text-sm">
              Tente ajustar sua busca ou filtro para encontrar o que procura.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Templates;
