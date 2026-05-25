
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Download, Sparkles, Loader2, Image as ImageIcon, Crown, Zap, Leaf, Flame, Smartphone, Square, ArrowRight, RotateCcw, PenTool, Layers, Wand2, Moon, AlertTriangle, XCircle, CheckCircle, Save } from 'lucide-react';
import { generateSocialPost } from '../services/geminiService';
import { UserIdentity } from '../types';
import { toPng } from 'html-to-image';
import { cn } from '../lib/utils';

interface PostStudioProps {
  identity: UserIdentity;
  onSave?: (html: string, description: string) => void;
  isSaving?: boolean;
  saveSuccess?: boolean;
}

type StylePreset = 'Luxury' | 'Tech' | 'Minimalist' | 'Vibrant' | 'DarkPro' | 'Brutalism';
type AspectRatio = 'square' | 'story';

export default function PostStudio({ identity, onSave, isSaving, saveSuccess }: PostStudioProps) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [postHtml, setPostHtml] = useState<string>('');
  const [activeStyle, setActiveStyle] = useState<StylePreset>('Luxury');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('square');
  const [studioError, setStudioError] = useState<{msg: string, type: 'quota' | 'key' | 'generic'} | null>(null);
  const [scale, setScale] = useState(0.5);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    if (!boardRef.current) return;
    const padding = 80;
    const availableWidth = boardRef.current.offsetWidth - padding;
    const availableHeight = boardRef.current.offsetHeight - padding;
    const targetWidth = 1080;
    const targetHeight = aspectRatio === 'square' ? 1080 : 1920;
    const scaleW = availableWidth / targetWidth;
    const scaleH = availableHeight / targetHeight;
    const newScale = Math.min(scaleW, scaleH);
    if (newScale > 0.05) setScale(newScale);
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [aspectRatio, postHtml]);

  const handleGenerate = async () => {
    if (loading || !description.trim()) return;
    setLoading(true);
    setStudioError(null);
    setPostHtml('');
    try {
      const htmlSnippet = await generateSocialPost(description, activeStyle, identity.groqApiKey || identity.apiKey, aspectRatio);
      
      if (htmlSnippet && htmlSnippet.trim().length > 5) {
        const height = aspectRatio === 'square' ? '1080px' : '1920px';
        const wrappedSnippet = htmlSnippet.includes('id="capture-area"') 
          ? htmlSnippet 
          : `<div id="capture-area" class="w-full h-full relative overflow-hidden bg-black flex flex-col">${htmlSnippet}</div>`;

        const head = `
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,900;1,900&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; -webkit-font-smoothing: antialiased; }
            html, body { width: 1080px; height: ${height}; overflow: hidden; background: #000; font-family: 'Plus Jakarta Sans', sans-serif; }
            #capture-area { width: 1080px; height: ${height}; position: relative; overflow: hidden; }
            .grain { position: absolute; inset: 0; pointer-events: none; z-index: 50; opacity: 0.05; background-image: url("https://grainy-gradients.vercel.app/noise.svg"); filter: contrast(150%) brightness(100%); }
            h1, .display { font-family: 'Playfair Display', serif; line-height: 0.9; }
            ::-webkit-scrollbar { display: none; }
          </style>
        `;
        const finalHtml = `<!DOCTYPE html><html><head>${head}</head><body><div class="grain"></div>${wrappedSnippet}</body></html>`;
        setPostHtml(finalHtml);
      }
    } catch (e: any) {
      setStudioError({ msg: "Falha na renderização criativa.", type: 'generic' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!postHtml || !iframeRef.current) return;
    setLoading(true);
    try {
      const iframeDoc = iframeRef.current.contentDocument;
      if (!iframeDoc) return;
      const target = iframeDoc.querySelector('#capture-area') || iframeDoc.body;
      await new Promise(r => setTimeout(r, 1200));
      const dataUrl = await toPng(target as HTMLElement, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: aspectRatio === 'square' ? 1080 : 1920,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `elite-post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err: any) {
      alert("Erro na exportação HD.");
    } finally {
      setLoading(false);
    }
  };

  const styleConfigs = [
    { id: 'Luxury', icon: Crown, label: 'Luxury', color: 'text-amber-500' },
    { id: 'Tech', icon: Zap, label: 'Futurism', color: 'text-cyan-400' },
    { id: 'DarkPro', icon: Moon, label: 'Dark Mode', color: 'text-indigo-400' },
    { id: 'Minimalist', icon: Leaf, label: 'Clean', color: 'text-emerald-400' },
    { id: 'Vibrant', icon: Flame, label: 'Impact', color: 'text-orange-500' },
    { id: 'Brutalism', icon: Layers, label: 'Artistic', color: 'text-rose-500' },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#050505] overflow-hidden">
      <header className="h-16 md:h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm md:text-lg font-black text-white tracking-tighter uppercase italic">Generatefy <span className="text-primary not-italic">Design Studio</span></h1>
            <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest leading-none">Creative Render Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-neutral-900/50 p-1 rounded-2xl border border-white/5">
          <button onClick={() => setAspectRatio('square')} className={cn("px-4 py-2 rounded-xl flex items-center gap-2 transition-all", aspectRatio === 'square' ? "bg-primary text-background" : "text-neutral-500 hover:text-white")}><Square className="w-4 h-4" /><span className="text-[10px] font-black uppercase hidden sm:inline">Feed 1:1</span></button>
          <button onClick={() => setAspectRatio('story')} className={cn("px-4 py-2 rounded-xl flex items-center gap-2 transition-all", aspectRatio === 'story' ? "bg-primary text-background" : "text-neutral-500 hover:text-white")}><Smartphone className="w-4 h-4" /><span className="text-[10px] font-black uppercase hidden sm:inline">Story 9:16</span></button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <aside className="w-full lg:w-[400px] border-r border-white/5 p-6 space-y-8 overflow-y-auto bg-black/20 shrink-0 custom-scrollbar">
          {studioError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500"><XCircle className="w-4 h-4" /><p className="text-[10px] font-black uppercase tracking-widest">{studioError.msg}</p></div>
          )}

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2">1. DNA Visual</label>
            <div className="grid grid-cols-3 gap-2">
              {styleConfigs.map((style) => (
                <button key={style.id} onClick={() => setActiveStyle(style.id as StylePreset)} className={cn("flex flex-col items-center justify-center gap-2 p-3 h-20 rounded-2xl border transition-all active:scale-95", activeStyle === style.id ? "bg-primary/5 border-primary" : "bg-white/[0.02] border-white/5")}><style.icon className={cn("w-4 h-4", activeStyle === style.id ? style.color : "text-neutral-700")} /><span className={cn("text-[8px] font-black uppercase", activeStyle === style.id ? "text-white" : "text-neutral-600")}>{style.label}</span></button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2">2. Briefing da Arte</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="O que deseja comunicar hoje?" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-primary/40 outline-none h-40 resize-none transition-all placeholder:text-neutral-800" />
          </div>

          <button onClick={handleGenerate} disabled={loading || !description.trim()} className="w-full py-5 bg-primary text-background rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/30 disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            {loading ? "Renderizando..." : "Gerar Arte de Elite"}
          </button>

          {postHtml && (
            <div className="pt-4 space-y-4 animate-in fade-in">
               <button onClick={handleDownload} disabled={loading} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 transition-all hover:bg-primary active:scale-95 shadow-2xl disabled:opacity-50"><Download className="w-5 h-5" />{loading ? "Processando..." : "Baixar Versão HD (.png)"}</button>
            </div>
          )}
        </aside>

        <main ref={boardRef} className="flex-1 bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative overflow-hidden transition-all duration-700 ease-out flex-shrink-0" style={{ width: 1080, height: aspectRatio === 'square' ? '1080px' : '1920px', transform: `scale(${scale})`, transformOrigin: 'center center', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)' }}>
            {postHtml ? (
              <iframe ref={iframeRef} srcDoc={postHtml} className="w-full h-full border-none pointer-events-none block" sandbox="allow-scripts allow-same-origin" title="Post Content" />
            ) : (
              <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center text-center p-20 gap-6 border border-white/5"><ImageIcon className="w-16 h-16 text-neutral-800 animate-pulse" /><div className="space-y-2"><p className="text-lg font-black text-neutral-700 uppercase tracking-[0.3em]">Canvas Vazio</p><p className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">Insira o briefing para iniciar</p></div></div>
            )}
            {loading && (
              <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center animate-in fade-in"><div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-6" /><p className="text-sm font-black text-white uppercase tracking-[0.4em] animate-pulse">Neural Rendering...</p></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
