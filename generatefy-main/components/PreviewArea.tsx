
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Tablet, Rocket, Save, Cpu, CheckCircle, Wand2, Layout, X, Loader2, Image as ImageIcon, Link as LinkIcon, Upload, Camera, Search, ChevronRight, Check, MousePointer2, Sparkles, Code, Copy, Download, Undo2, Trash2, ChevronUp, ChevronDown, Layers } from 'lucide-react';
import { GenerationStatus } from '../types';
import { cn } from '../lib/utils';

interface PreviewAreaProps {
  html: string;
  status: GenerationStatus;
  errorMessage?: string;
  onPublish: () => void;
  onSave: () => void;
  onRetry?: () => void;
  onOpenIdentity?: () => void;
  isUsingCustomKey?: boolean;
  isSaving?: boolean;
  saveSuccess?: boolean;
  onRegenerateSection?: (sectionId: string, oldHtml: string, prompt: string) => void;
  onManualHtmlUpdate?: (newHtml: string, skipIframeReload?: boolean) => void;
  onUndo?: () => void;
  canUndo?: boolean;
  onNextStep?: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const SUGGESTED_IMAGES = [
  { id: 'tech', label: 'TECNOLOGIA', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { id: 'business', label: 'NEGÓCIOS', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
  { id: 'aesthetic', label: 'ESTÉTICA', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
  { id: 'darklux', label: 'DARK LUX', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80' },
];

const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  html, status, errorMessage, onPublish, onSave, onRetry, onOpenIdentity, isUsingCustomKey, isSaving, saveSuccess, onRegenerateSection, onManualHtmlUpdate, onUndo, canUndo, onNextStep 
}) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [selectedSection, setSelectedSection] = useState<{ 
    id: string, 
    html: string, 
    isImageTarget?: boolean, 
    isTextTarget?: boolean, 
    isVideoTarget?: boolean,
    isLinkTarget?: boolean,
    isLogoTarget?: boolean,
    elementId?: string, 
    currentText?: string,
    currentColor?: string,
    currentBgColor?: string,
    currentFontSize?: string,
    currentFontFamily?: string,
    currentHref?: string,
    currentVideoSrc?: string,
    isDepth?: boolean,
    maskColor?: string
  } | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isDepth, setIsDepth] = useState(false);
  const [maskColor, setMaskColor] = useState('#000000');
  const [videoUrl, setVideoUrl] = useState('');
  const [logoText, setLogoText] = useState('');
  const [textValue, setTextValue] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [regenPrompt, setRegenPrompt] = useState('');
  const [customColor, setCustomColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('transparent');
  const [activeColorTab, setActiveColorTab] = useState<'text' | 'bg'>('text');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [editableCode, setEditableCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [sections, setSections] = useState<{ id: string, name: string }[]>([]);
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastSentHtml = useRef('');
  const isInternalUpdate = useRef(false);

  // Extrair seções do HTML para o Gerenciador de Seções
  useEffect(() => {
    if (!html) {
      setSections([]);
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const sectionElements = doc.querySelectorAll('[data-gf-id]');
      
      const extractedSections: { id: string, name: string }[] = [];
      sectionElements.forEach(el => {
        const id = el.getAttribute('data-gf-id');
        if (id && id !== 'root' && id !== 'navbar' && id !== 'footer') {
          // Tentar encontrar um nome amigável
          let name = id.replace(/-section$/, '').replace(/-/g, ' ');
          name = name.charAt(0).toUpperCase() + name.slice(1);
          
          // Se for uma seção genérica, tentar pegar o H2
          if (name.toLowerCase().includes('section')) {
            const h2 = el.querySelector('h2');
            if (h2 && h2.innerText.trim()) {
              name = h2.innerText.trim().substring(0, 25);
            }
          }
          
          extractedSections.push({ id, name });
        }
      });
      
      setSections(extractedSections);
    } catch (e) {
      console.error("Erro ao extrair seções:", e);
    }
  }, [html]);

  const removeSection = (sectionId: string) => {
    if (!iframeRef.current || !sectionId) return;
    
    try {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'GF_REMOVE_ELEMENT', 
        elementId: sectionId 
      }, '*');
    } catch (e) {
      console.error("Erro ao remover seção:", e);
    }
  };

  const removeElement = (elementId: string) => {
    if (!iframeRef.current || !elementId) return;
    
    try {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'GF_REMOVE_ELEMENT', 
        elementId: elementId 
      }, '*');
      setSelectedSection(null);
    } catch (e) {
      console.error("Erro ao remover elemento:", e);
    }
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    if (!iframeRef.current || !sectionId) return;
    
    try {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'GF_MOVE_ELEMENT', 
        elementId: sectionId,
        direction: direction
      }, '*');
    } catch (e) {
      console.error("Erro ao mover seção:", e);
    }
  };

  // Calcula escala dinâmica considerando largura e altura para evitar cortes
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const padding = 60; // Margem de segurança maior
      const availableWidth = containerRef.current.offsetWidth - padding;
      const availableHeight = containerRef.current.offsetHeight - padding;
      
      let targetWidth = 1200; 
      let targetHeight = 800;

      if (device === 'tablet') {
        targetWidth = 768;
        targetHeight = 1024;
      } else if (device === 'mobile') {
        targetWidth = 380;
        targetHeight = 800;
      }

      const scaleW = availableWidth / targetWidth;
      const scaleH = availableHeight / targetHeight;
      
      // Permitimos que qualquer dispositivo escale para baixo para caber na tela (evita o "muito zoom")
      const newScale = Math.min(scaleW, scaleH, 1);
      setScale(newScale);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [device]);

  useEffect(() => {
    if (status === GenerationStatus.GENERATING) {
      lastSentHtml.current = '';
      isInternalUpdate.current = false;
    }
  }, [status]);

  useEffect(() => {
    if (!html) return;
    const timer = setTimeout(() => {
      if (!iframeRef.current) return;
      if (html !== lastSentHtml.current) {
          if (isInternalUpdate.current) {
              isInternalUpdate.current = false;
              return;
          }
          injectHtmlIntoIframe(html);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [html, status]);

  const injectHtmlIntoIframe = (rawHtml: string) => {
    if (!iframeRef.current || !rawHtml) return;
    
    const editorStyles = `
      <style id="gf-editor-styles">
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        html, body { margin: 0; padding: 0; min-height: 100%; }
        [contenteditable="true"] { outline: none !important; transition: background 0.2s; cursor: text; min-height: 1.2em; min-width: 8px; pointer-events: auto !important; }
        [contenteditable="true"]:hover { background: rgba(0, 255, 255, 0.08); border-radius: 4px; }
        .photo-mask {
            mask-image: linear-gradient(to bottom, black 60%, transparent 95%);
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 95%);
        }
        
        /* Definitive Hover Styles - Simplified to avoid layout/z-index issues */
        .gf-hover-active { 
          outline: 3px solid #00ffff !important; 
          outline-offset: -3px !important; 
          cursor: pointer !important;
          transition: outline 0.1s ease !important;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3) !important;
        }

        .gf-selected-active {
          outline: 4px solid #f27d26 !important;
          outline-offset: -4px !important;
          box-shadow: 0 0 20px rgba(242, 125, 38, 0.4) !important;
          z-index: 1000 !important;
        }
        
        img, video, iframe, [data-gf-bg-target], [contenteditable="true"], a, button, [data-gf-id] { pointer-events: auto !important; }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      </style>
    `;

    const editorScript = `
      <script id="gf-editor-scripts">
        function sync() { 
          window.parent.postMessage({ type: 'GF_HTML_SYNC', html: document.documentElement.outerHTML }, '*'); 
        }
        
        function setup() {
          // 1. Tag images
          document.querySelectorAll('img').forEach((img, i) => { 
            if (!img.id) img.id = 'gf-img-' + i; 
            img.setAttribute('data-gf-el-id', img.id);
            img.style.pointerEvents = 'auto';
          });

          // 1.1 Tag videos and video-iframes
          document.querySelectorAll('video, iframe[data-gf-video-target="true"]').forEach((vid, i) => {
            if (!vid.id) vid.id = 'gf-vid-' + i;
            vid.setAttribute('data-gf-el-id', vid.id);
            vid.setAttribute('data-gf-video-target', 'true');
            vid.style.pointerEvents = 'auto';
          });
          
          // 2. Tag backgrounds (more efficiently)
          document.querySelectorAll('section, div, header, footer').forEach((el, i) => {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundImage;
            if ((bg && bg !== 'none' && bg.includes('url')) || (el.style.backgroundImage && el.style.backgroundImage.includes('url'))) {
              if (!el.id) el.id = 'gf-bg-' + i;
              el.setAttribute('data-gf-el-id', el.id);
              el.setAttribute('data-gf-bg-target', 'true');
              el.style.pointerEvents = 'auto';
            }
          });

          // 3. Tag text
          document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, b, strong, em, button, a, li, div').forEach((el, i) => {
             // Only tag divs if they have direct text content and aren't too large, or if they are clearly text containers
             const isTextTag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'B', 'STRONG', 'EM', 'BUTTON', 'A', 'LI'].includes(el.tagName);
             const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === 3 && node.textContent.trim().length > 0);
             
             if (!el.closest('svg') && !el.closest('script') && !el.closest('style')) { 
               if (isTextTag || hasDirectText) {
                 if (!el.id) el.id = 'gf-txt-' + i;
                 el.setAttribute('data-gf-el-id', el.id);
                 el.setAttribute('contenteditable', 'true'); 
                 el.setAttribute('spellcheck', 'false'); 
                 el.style.pointerEvents = 'auto';
               }
             }
          });
          
          sync();
        }

        function findEditableTargetAt(x, y) {
          const elements = document.elementsFromPoint(x, y);
          if (!elements || elements.length === 0) return null;

          // Priority list for selection - we want to find the most specific (deepest) match for high priority items
          const priorities = [
            '[data-gf-id="logo"]',
            '[contenteditable="true"]',
            'img',
            'video',
            'iframe[data-gf-video-target]',
            '[data-gf-bg-target]',
            '[data-gf-id]'
          ];

          for (const selector of priorities) {
            for (const el of elements) {
              const match = el.closest(selector);
              if (match) {
                return match;
              }
            }
          }
          return null;
        }

        let lastHovered = null;
        document.addEventListener('mousemove', (e) => {
          const target = findEditableTargetAt(e.clientX, e.clientY);
          if (lastHovered && lastHovered !== target) {
            lastHovered.classList.remove('gf-hover-active');
          }
          if (target) {
            target.classList.add('gf-hover-active');
            lastHovered = target;
          }
        }, true);

        document.addEventListener('click', (e) => {
          let gfTarget = findEditableTargetAt(e.clientX, e.clientY);
          if (!gfTarget) gfTarget = e.target.closest('img, video, iframe[data-gf-video-target], [data-gf-bg-target], [contenteditable="true"], [data-gf-id]');
          
          if (!gfTarget) return;

          e.preventDefault(); e.stopPropagation();

          // Logo handling
          const logo = gfTarget.closest('[data-gf-id="logo"]');
          if (logo) {
            window.parent.postMessage({ 
              type: 'GF_SECTION_SELECT', 
              id: 'logo', 
              html: logo.outerHTML, 
              isLogo: true, 
              elementId: logo.id || logo.querySelector('img, span, a')?.id || 'logo',
              currentText: logo.innerText,
              currentHref: logo.getAttribute('href') || logo.querySelector('a')?.getAttribute('href')
            }, '*');
            return;
          }

          // Text handling
          const txt = gfTarget.hasAttribute('contenteditable') ? gfTarget : gfTarget.closest('[contenteditable="true"]');
          if (txt) {
            const section = txt.closest('[data-gf-id]');
            const isLink = txt.tagName === 'A' || !!txt.closest('a') || txt.tagName === 'BUTTON' || txt.classList.contains('btn') || txt.classList.contains('button');
            const linkEl = txt.tagName === 'A' ? txt : txt.closest('a');
            const style = window.getComputedStyle(txt);
            window.parent.postMessage({ 
              type: 'GF_SECTION_SELECT', 
              id: section ? section.getAttribute('data-gf-id') : 'root', 
              html: section ? section.outerHTML : '', 
              isText: true, 
              isLink: isLink,
              elementId: txt.id,
              currentText: txt.innerText,
              currentColor: style.color,
              currentBgColor: style.backgroundColor,
              currentFontSize: style.fontSize,
              currentFontFamily: style.fontFamily,
              currentHref: linkEl ? linkEl.getAttribute('href') : ''
            }, '*');
            return;
          }

          // Media handling
          const img = gfTarget.tagName === 'IMG' ? gfTarget : gfTarget.closest('img');
          const vid = (gfTarget.tagName === 'VIDEO' || (gfTarget.tagName === 'IFRAME' && gfTarget.hasAttribute('data-gf-video-target'))) ? gfTarget : gfTarget.closest('video, iframe[data-gf-video-target]');
          const bgTarget = gfTarget.hasAttribute('data-gf-bg-target') ? gfTarget : gfTarget.closest('[data-gf-bg-target]');
          
          if (img || bgTarget || vid) {
            const finalTarget = img || bgTarget || vid;
            const section = finalTarget.closest('[data-gf-id]');
            const isDepth = finalTarget.classList.contains('photo-mask');
            const maskColor = finalTarget.getAttribute('data-mask-color') || '#000000';
            window.parent.postMessage({ 
              type: 'GF_SECTION_SELECT', 
              id: section ? section.getAttribute('data-gf-id') : 'root', 
              html: section ? section.outerHTML : '', 
              isImage: !!(img || bgTarget),
              isVideo: !!vid,
              elementId: finalTarget.id,
              currentVideoSrc: vid ? (vid.src || vid.querySelector('source')?.src || '') : '',
              isDepth: isDepth,
              maskColor: maskColor
            }, '*');
            return;
          }

          // Section handling
          const section = gfTarget.closest('[data-gf-id]');
          if (section) {
            window.parent.postMessage({ 
              type: 'GF_SECTION_SELECT', 
              id: section.getAttribute('data-gf-id'), 
              html: section.outerHTML
            }, '*');
          }
        }, true);

        setup();
        setInterval(setup, 3000);
        document.addEventListener('input', (e) => { if (e.target.hasAttribute('contenteditable')) sync(); });
        
        window.addEventListener('message', (event) => {
          if (event.data.type === 'GF_SELECT_ELEMENT') {
            document.querySelectorAll('.gf-selected-active').forEach(el => el.classList.remove('gf-selected-active'));
            const el = document.getElementById(event.data.elementId) || document.querySelector(\'[data-gf-el-id="\' + event.data.elementId + \'"]\');
            if (el) el.classList.add('gf-selected-active');
          }

          if (event.data.type === 'GF_REMOVE_ELEMENT') {
            const id = event.data.elementId;
            const el = document.getElementById(id) || 
                       document.querySelector('[data-gf-el-id="' + id.replace(/"/g, '\\"') + '"]') || 
                       document.querySelector('[data-gf-id="' + id.replace(/"/g, '\\"') + '"]');
            if (el) {
              el.remove();
              sync();
            }
          }

          if (event.data.type === 'RYZE_MOVE_ELEMENT') {
            const id = event.data.elementId;
            const el = document.getElementById(id) || document.querySelector('[data-ryze-id="' + id.replace(/"/g, '\\"') + '"]');
            if (el) {
              if (event.data.direction === 'up') {
                const prev = el.previousElementSibling;
                if (prev && prev.hasAttribute('data-ryze-id') && prev.getAttribute('data-ryze-id') !== 'navbar') {
                  el.parentNode.insertBefore(el, prev);
                }
              } else {
                const next = el.nextElementSibling;
                if (next && next.hasAttribute('data-ryze-id') && next.getAttribute('data-ryze-id') !== 'footer') {
                  if (next.nextElementSibling) {
                    el.parentNode.insertBefore(el, next.nextElementSibling);
                  } else {
                    el.parentNode.appendChild(el);
                  }
                }
              }
              sync();
            }
          }

          if (event.data.type === 'GF_UPDATE_ELEMENT') {
            let el = document.getElementById(event.data.elementId) || document.querySelector(\'[data-gf-el-id="\' + event.data.elementId + \'"]\') || document.querySelector(\'[data-gf-id="\' + event.data.elementId + \'"]\');
            
            if (el) {
              if (event.data.isLogoUpdate) {
                if (event.data.logoType === 'text') {
                  el.innerHTML = event.data.newText || 'BRAND';
                  el.setAttribute('contenteditable', 'true');
                } else {
                  el.innerHTML = \'<img src="\' + event.data.newSrc + \'" style="height: 40px; width: auto;" id="\' + el.id + \'-img">\';
                  el.removeAttribute('contenteditable');
                }
              } else if (event.data.newVideoSrc) {
                let finalSrc = event.data.newVideoSrc;
                const isYouTube = finalSrc.includes(\'youtube.com\') || finalSrc.includes(\'youtu.be\');
                
                if (isYouTube) {
                  const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
                  const match = finalSrc.match(regExp);
                  if (match && match[2].length === 11) {
                    finalSrc = \'https://www.youtube.com/embed/\' + match[2] + \'?autoplay=1&mute=1&loop=1&playlist=\' + match[2] + \'&controls=0&showinfo=0&rel=0\';
                  }
                }

                if (isYouTube) {
                  const iframe = document.createElement(\'iframe\');
                  iframe.id = el.id;
                  iframe.setAttribute(\'data-ryze-video-target\', \'true\');
                  iframe.src = finalSrc;
                  iframe.frameBorder = \'0\';
                  iframe.allow = \'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\';
                  iframe.allowFullscreen = true;
                  iframe.className = el.className;
                  iframe.style.cssText = el.style.cssText;
                  iframe.style.width = \'100%\';
                  iframe.style.height = \'100%\';
                  iframe.style.minHeight = el.offsetHeight > 0 ? el.offsetHeight + \'px\' : \'300px\';
                  el.parentNode.replaceChild(iframe, el);
                } else {
                  const video = document.createElement(\'video\');
                  video.id = el.id;
                  video.src = finalSrc;
                  video.autoplay = true;
                  video.loop = true;
                  video.muted = true;
                  video.playsInline = true;
                  video.className = el.className;
                  video.style.cssText = el.style.cssText;
                  video.style.objectFit = \'cover\';
                  el.parentNode.replaceChild(video, el);
                }
              } else {
                if (event.data.newSrc) {
                  if (el.tagName === \'IMG\') el.src = event.data.newSrc;
                  else if (el.tagName === \'VIDEO\' || el.tagName === \'IFRAME\') {
                    const img = document.createElement(\'img\');
                    img.id = el.id;
                    img.src = event.data.newSrc;
                    img.className = el.className;
                    img.style.cssText = el.style.cssText;
                    img.style.objectFit = \'cover\';
                    el.parentNode.replaceChild(img, el);
                  }
                  else el.style.backgroundImage = \'url(\' + event.data.newSrc + \')\';
                }
                if (event.data.isDepth !== undefined) {
                  const section = el.closest(\'section, div[data-gf-id]\');
                  if (event.data.isDepth) {
                    el.classList.add(\'photo-mask\');
                    // Backup and remove framing styles for a better mask effect
                    if (!el.hasAttribute(\'data-gf-orig-radius\')) {
                      el.setAttribute(\'data-gf-orig-radius\', el.style.borderRadius || window.getComputedStyle(el).borderRadius);
                    }
                    if (!el.hasAttribute(\'data-gf-orig-shadow\')) {
                      el.setAttribute(\'data-gf-orig-shadow\', el.style.boxShadow || window.getComputedStyle(el).boxShadow);
                    }
                    el.style.borderRadius = \'0\';
                    el.style.boxShadow = \'none\';

                    // Surgical parent cleanup: remove backgrounds/borders from immediate wrappers only
                    let p = el.parentElement;
                    let depth = 0;
                    while (p && p !== section && depth < 3) {
                      // Stop if this parent seems to be a layout container rather than a frame
                      const hasOtherImages = p.querySelectorAll(\'img\').length > 1;
                      const hasSignificantText = p.innerText.trim().length > 50;
                      const isNamedSection = p.hasAttribute(\'data-gf-id\') && p.getAttribute(\'data-gf-id\') !== \'root\';
                      
                      if (hasOtherImages || hasSignificantText || isNamedSection) break;

                      const pStyle = window.getComputedStyle(p);
                      if (pStyle.backgroundColor !== \'transparent\' && pStyle.backgroundColor !== \'rgba(0, 0, 0, 0)\') {
                        if (!p.hasAttribute(\'data-gf-orig-bg\')) p.setAttribute(\'data-gf-orig-bg\', p.style.backgroundColor || pStyle.backgroundColor);
                        p.style.backgroundColor = \'transparent\';
                      }
                      if (pStyle.borderWidth !== \'0px\' || (pStyle.boxShadow !== \'none\' && pStyle.boxShadow !== \'\') || pStyle.borderRadius !== \'0px\' || pStyle.outlineWidth !== \'0px\') {
                        if (!p.hasAttribute(\'data-gf-orig-border\')) p.setAttribute(\'data-gf-orig-border\', p.style.border || pStyle.border);
                        if (!p.hasAttribute(\'data-gf-orig-shadow\')) p.setAttribute(\'data-gf-orig-shadow\', p.style.boxShadow || pStyle.boxShadow);
                        if (!p.hasAttribute(\'data-gf-orig-radius\')) p.setAttribute(\'data-gf-orig-radius\', p.style.borderRadius || pStyle.borderRadius);
                        if (!p.hasAttribute(\'data-gf-orig-outline\')) p.setAttribute(\'data-gf-orig-outline\', p.style.outline || pStyle.outline);
                        p.style.border = \'none\';
                        p.style.boxShadow = \'none\';
                        p.style.borderRadius = \'0\';
                        p.style.outline = \'none\';
                      }
                      // Also clear padding if it\'s creating a frame
                      if (pStyle.padding !== \'0px\') {
                        if (!p.hasAttribute(\'data-gf-orig-padding\')) p.setAttribute(\'data-gf-orig-padding\', p.style.padding || pStyle.padding);
                        p.style.padding = \'0\';
                      }
                      p = p.parentElement;
                      depth++;
                    }
                  } else {
                    el.classList.remove(\'photo-mask\');
                    el.style.maskImage = \'\';
                    el.style.webkitMaskImage = \'\';
                    
                    // Restore framing styles
                    const origRadius = el.getAttribute(\'data-gf-orig-radius\');
                    if (origRadius) {
                      el.style.borderRadius = origRadius;
                      el.removeAttribute(\'data-gf-orig-radius\');
                    }
                    const origShadow = el.getAttribute(\'data-gf-orig-shadow\');
                    if (origShadow) {
                      el.style.boxShadow = origShadow;
                      el.removeAttribute(\'data-gf-orig-shadow\');
                    }

                    // Restore parent styles
                    let p = el.parentElement;
                    let depth = 0;
                    while (p && p !== section && depth < 3) {
                      const pOrigBg = p.getAttribute(\'data-gf-orig-bg\');
                      if (pOrigBg) {
                        p.style.backgroundColor = pOrigBg;
                        p.removeAttribute(\'data-gf-orig-bg\');
                      }
                      const pOrigBorder = p.getAttribute(\'data-gf-orig-border\');
                      if (pOrigBorder) {
                        p.style.border = pOrigBorder;
                        p.removeAttribute(\'data-gf-orig-border\');
                      }
                      const pOrigShadow = p.getAttribute(\'data-gf-orig-shadow\');
                      if (pOrigShadow) {
                        p.style.boxShadow = pOrigShadow;
                        p.removeAttribute(\'data-gf-orig-shadow\');
                      }
                      const pOrigRadius = p.getAttribute(\'data-gf-orig-radius\');
                      if (pOrigRadius) {
                        p.style.borderRadius = pOrigRadius;
                        p.removeAttribute(\'data-gf-orig-radius\');
                      }
                      const pOrigOutline = p.getAttribute(\'data-gf-orig-outline\');
                      if (pOrigOutline) {
                        p.style.outline = pOrigOutline;
                        p.removeAttribute(\'data-gf-orig-outline\');
                      }
                      const pOrigPadding = p.getAttribute(\'data-gf-orig-padding\');
                      if (pOrigPadding) {
                        p.style.padding = pOrigPadding;
                        p.removeAttribute(\'data-gf-orig-padding\');
                      }
                      p = p.parentElement;
                      depth++;
                    }
                  }
                }
                if (event.data.maskColor) {
                  el.setAttribute(\'data-mask-color\', event.data.maskColor);
                }
                if (event.data.newText !== undefined) el.innerText = event.data.newText;
                if (event.data.newColor) el.style.color = event.data.newColor;
                if (event.data.newBgColor) el.style.backgroundColor = event.data.newBgColor;
                if (event.data.newFontSize) el.style.fontSize = event.data.newFontSize;
                if (event.data.newFontFamily) el.style.fontFamily = event.data.newFontFamily;
                if (event.data.newHref !== undefined) {
                  let url = event.data.newHref.trim();
                  
                  // WhatsApp Link Normalization
                  if (url && !url.startsWith('http') && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                    if (url.startsWith('wa.me/') || /^\d+$/.test(url.replace(/\D/g, ''))) {
                      const phone = url.replace(/\D/g, '');
                      url = 'https://wa.me/' + phone;
                    } else if (url.includes('.') && !url.includes(' ')) {
                      url = 'https://' + url;
                    }
                  }

                  let target = el.tagName === \'A\' ? el : el.closest(\'a\');
                  if (target) {
                    target.setAttribute(\'href\', url);
                    if (url.startsWith('http')) target.setAttribute(\'target\', \'_blank\');
                  } else if (url) {
                    // If it's a button or clickable div, wrap it in an <a> tag
                    const wrapper = document.createElement(\'a\');
                    wrapper.href = url;
                    if (url.startsWith('http')) wrapper.target = \'_blank\';
                    wrapper.style.textDecoration = \'none\';
                    wrapper.style.display = \'inline-block\';
                    if (el.style.display === \'block\' || window.getComputedStyle(el).display === \'block\') {
                      wrapper.style.display = \'block\';
                    }
                    el.parentNode.insertBefore(wrapper, el);
                    wrapper.appendChild(el);
                  }
                }
              }
            }
            sync();
          }
        });
      </script>
    `;

    lastSentHtml.current = rawHtml;
    let processedHtml = rawHtml;
    const hasHtmlTag = processedHtml.toLowerCase().includes('<html');
    const hasHeadTag = processedHtml.toLowerCase().includes('<head');
    
    if (!hasHtmlTag) {
      processedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            ${editorStyles}
            ${editorScript}
          </head>
          <body class="bg-white">
            ${processedHtml}
          </body>
        </html>
      `;
    } else if (hasHeadTag) {
      processedHtml = processedHtml.replace(/<\/head>/i, `${editorStyles}${editorScript}</head>`);
    } else if (processedHtml.toLowerCase().includes('<body')) {
      processedHtml = processedHtml.replace(/<body/i, `<head>${editorStyles}${editorScript}</head><body`);
    } else {
      // Fallback injection
      processedHtml = `${editorStyles}${editorScript}${processedHtml}`;
    }
    
    iframeRef.current.srcdoc = processedHtml;
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'GF_SECTION_SELECT') {
        setSelectedSection({ 
          id: event.data.id, 
          html: event.data.html, 
          isImageTarget: event.data.isImage, 
          isTextTarget: event.data.isText,
          isVideoTarget: event.data.isVideo,
          isLinkTarget: event.data.isLink,
          isLogoTarget: event.data.isLogo,
          elementId: event.data.elementId,
          currentText: event.data.currentText,
          currentColor: event.data.currentColor,
          currentBgColor: event.data.currentBgColor,
          currentFontSize: event.data.currentFontSize,
          currentFontFamily: event.data.currentFontFamily,
          currentHref: event.data.currentHref,
          currentVideoSrc: event.data.currentVideoSrc,
          isDepth: event.data.isDepth,
          maskColor: event.data.maskColor
        });
        if (event.data.isImage) {
          setIsDepth(!!event.data.isDepth);
          setMaskColor(event.data.maskColor || '#000000');
        }
        if (event.data.isVideo) {
          setVideoUrl(event.data.currentVideoSrc || '');
        }
        if (event.data.isLogo) {
          setLogoText(event.data.currentText || '');
          setLinkUrl(event.data.currentHref || '');
        }
        if (event.data.isText) {
          setTextValue(event.data.currentText || '');
          if (event.data.currentColor) setCustomColor(event.data.currentColor);
          if (event.data.currentBgColor) setBgColor(event.data.currentBgColor);
          if (event.data.currentFontSize) setFontSize(event.data.currentFontSize);
          if (event.data.currentFontFamily) setFontFamily(event.data.currentFontFamily);
        }
        if (event.data.isLink && event.data.currentHref) {
          setLinkUrl(event.data.currentHref);
        } else {
          setLinkUrl('');
        }
      }
      if (event.data.type === 'GF_HTML_SYNC') {
        isInternalUpdate.current = true;
        lastSentHtml.current = event.data.html;
        onManualHtmlUpdate?.(event.data.html, true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onManualHtmlUpdate]);

  useEffect(() => {
    if (selectedSection?.elementId && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'RYZE_SELECT_ELEMENT', 
        elementId: selectedSection.elementId 
      }, '*');
    } else if (!selectedSection && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'RYZE_SELECT_ELEMENT', 
        elementId: null 
      }, '*');
    }
  }, [selectedSection]);

  const handleApplyLogo = (type: 'text' | 'image', value: string) => {
    if (!selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      isLogoUpdate: true,
      logoType: type,
      newSrc: type === 'image' ? value : undefined,
      newText: type === 'text' ? value : undefined
    }, '*');
    if (type === 'text') setLogoText(value);
    else setImageUrl(value);
  };

  const handleApplyImage = (url: string) => {
    if (!url || !selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      newSrc: url,
      isDepth: isDepth,
      maskColor: maskColor
    }, '*');
    setSelectedSection(null);
    setImageUrl('');
  };

  const handleUpdateImageStyle = (depth: boolean, color: string) => {
    if (!selectedSection?.elementId || !iframeRef.current) return;
    setIsDepth(depth);
    setMaskColor(color);
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      isDepth: depth,
      maskColor: color
    }, '*');
  };

  const handleApplyVideo = (url: string) => {
    if (!url || !selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      newVideoSrc: url 
    }, '*');
    setSelectedSection(null);
    setVideoUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { if (typeof reader.result === 'string') handleApplyImage(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyColor = (color: string) => {
    if (!color || !selectedSection?.elementId || !iframeRef.current) return;
    
    if (activeColorTab === 'text') {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'RYZE_UPDATE_ELEMENT', 
        elementId: selectedSection.elementId, 
        newColor: color 
      }, '*');
      setCustomColor(color);
    } else {
      iframeRef.current.contentWindow?.postMessage({ 
        type: 'RYZE_UPDATE_ELEMENT', 
        elementId: selectedSection.elementId, 
        newBgColor: color 
      }, '*');
      setBgColor(color);
    }
  };

  const handleApplyText = (text: string) => {
    if (!selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      newText: text 
    }, '*');
    setTextValue(text);
  };

  const handleApplyFont = (font: string) => {
    if (!selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      newFontFamily: font 
    }, '*');
    setFontFamily(font);
  };

  const handleApplyFontSize = (size: string) => {
    if (!selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      newFontSize: size 
    }, '*');
    setFontSize(size);
  };

  const handleApplyLink = (url: string) => {
    if (!selectedSection?.elementId || !iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage({ 
      type: 'RYZE_UPDATE_ELEMENT', 
      elementId: selectedSection.elementId, 
      newHref: url 
    }, '*');
    setLinkUrl(url);
  };

  const handleRegenerate = async () => {
    if (!selectedSection || !regenPrompt.trim() || !onRegenerateSection) return;
    setIsRegenerating(true);
    try {
      await onRegenerateSection(selectedSection.id, selectedSection.html, regenPrompt);
      setSelectedSection(null);
      setRegenPrompt('');
    } catch (e) {
      console.error("Regen error:", e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editableCode || html);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([editableCode || html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generatefy-site.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyManualCode = () => {
    onManualHtmlUpdate?.(editableCode);
    setShowCode(false);
  };

  useEffect(() => {
    if (showCode) {
      setEditableCode(html);
    }
  }, [showCode, html]);

  return (
    <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden relative h-full">
      {/* Toolbar */}
      <div className="h-16 md:h-20 bg-background/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-3 md:px-6 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/[0.03] p-1 rounded-2xl border border-white/5">
            <button onClick={() => setDevice('desktop')} className={cn("p-2.5 rounded-xl transition-all", device === 'desktop' ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-neutral-500 hover:text-white")}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setDevice('tablet')} className={cn("p-2.5 rounded-xl transition-all", device === 'tablet' ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-neutral-500 hover:text-white")}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setDevice('mobile')} className={cn("p-2.5 rounded-xl transition-all", device === 'mobile' ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-neutral-500 hover:text-white")}><Smartphone className="w-4 h-4" /></button>
          </div>
          
          <button 
            onClick={() => setShowSectionManager(!showSectionManager)} 
            className={cn(
              "flex px-3 md:px-4 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all items-center gap-2 border",
              showSectionManager ? "bg-primary text-background border-primary" : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
            )}
            title="Gerenciar Seções do Site"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Seções</span>
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {canUndo && (
            <button 
              onClick={onUndo} 
              className="flex px-3 md:px-4 py-2.5 bg-white/5 border border-white/10 text-neutral-400 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all items-center gap-2"
              title="Desfazer Alteração"
            >
              <Undo2 className="w-4 h-4" />
              <span className="hidden sm:inline">Desfazer</span>
            </button>
          )}
          <button 
            onClick={() => setShowCode(true)} 
            disabled={!html} 
            className={cn(
              "flex px-3 md:px-4 py-2.5 bg-white/5 border border-white/10 text-neutral-400 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all items-center gap-2",
              !html && "opacity-20 pointer-events-none"
            )}
            title="Ver Código HTML"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Código</span>
          </button>
          <button 
            onClick={onSave} 
            disabled={isSaving || !html} 
            className={cn(
              "flex px-3 md:px-5 py-2.5 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all items-center gap-2", 
              !html ? "opacity-20 pointer-events-none" : "", 
              saveSuccess ? "border-green-500 bg-green-500/10 text-green-500" : "border-white/10 text-neutral-500 hover:text-white"
            )}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">{saveSuccess ? "Salvo" : "Salvar"}</span>
          </button>
          <button onClick={onPublish} disabled={!html} className={cn("px-4 md:px-8 py-2.5 bg-primary text-background rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2", !html && "opacity-20 pointer-events-none")}>
             <Rocket className="w-4 h-4" /> <span className="hidden xs:inline">Publicar Site</span><span className="xs:hidden">Publicar</span>
          </button>
          
          {onNextStep && (
            <button 
              onClick={onNextStep} 
              className="px-4 md:px-8 py-2.5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white"
            >
              <ChevronRight className="w-4 h-4" /> 
              <span className="hidden xs:inline">Passo 3: Criar Abordagem</span>
              <span className="xs:hidden">Abordagem</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div ref={containerRef} className="flex-1 p-2 md:p-4 flex items-start justify-center bg-black/40 overflow-auto custom-scrollbar relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
        
        {/* Section Manager Sidebar */}
        <div className={cn(
          "absolute left-0 top-0 bottom-0 w-72 bg-background/95 backdrop-blur-xl border-r border-white/5 z-40 transition-transform duration-500 ease-in-out flex flex-col",
          showSectionManager ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-black uppercase tracking-widest text-[10px]">Gerenciador de Seções</h3>
            <button onClick={() => setShowSectionManager(false)} className="text-neutral-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {sections.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-neutral-600 text-[10px] uppercase tracking-widest leading-relaxed">Nenhuma seção editável encontrada.</p>
              </div>
            ) : (
              sections.map((section, index) => (
                <div 
                  key={section.id} 
                  className={cn(
                    "group bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.06] hover:border-white/10",
                    selectedSection?.id === section.id && "border-primary/30 bg-primary/5"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold text-[11px] truncate max-w-[140px]">{section.name}</span>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => moveSection(section.id, 'up')} 
                        disabled={index === 0}
                        className="p-1.5 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => moveSection(section.id, 'down')} 
                        disabled={index === sections.length - 1}
                        className="p-1.5 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const el = iframeRef.current?.contentDocument?.querySelector(`[data-ryze-id="${section.id}"]`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          // Simular clique para selecionar
                          iframeRef.current?.contentWindow?.postMessage({ 
                            type: 'RYZE_SELECT_ELEMENT', 
                            elementId: section.id 
                          }, '*');
                        }
                      }}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      Focar
                    </button>
                    <button 
                      onClick={() => removeSection(section.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"
                      title="Remover Seção"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-6 border-t border-white/5 bg-black/20">
            <p className="text-neutral-600 text-[8px] uppercase tracking-widest leading-relaxed text-center">
              DICA: Arraste para reordenar ou use a lixeira para remover elementos indesejados.
            </p>
          </div>
        </div>

        <div 
          className={cn(
            "bg-white transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] origin-top", 
            device === 'desktop' ? 'w-[1200px] h-fit min-h-[850px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shrink-0 mb-20' : 
            device === 'tablet' ? 'w-[768px] h-[1024px] rounded-[3.5rem] border-[12px] border-[#111] overflow-hidden shrink-0 mb-10' : 
            'w-[380px] h-[800px] rounded-[4rem] border-[14px] border-[#111] overflow-hidden shrink-0 mb-10'
          )}
          style={{ 
            transform: `scale(${scale})`,
            marginTop: '40px'
          }}
        >
          {status === GenerationStatus.GENERATING ? (
            <div className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 overflow-hidden">
              {/* Background Neural Grid Simulation */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-x-0 h-[1px] top-1/4 bg-primary/20 blur-[2px]"></div>
                <div className="absolute inset-x-0 h-[1px] top-2/4 bg-primary/20 blur-[2px]"></div>
                <div className="absolute inset-x-0 h-[1px] top-3/4 bg-primary/20 blur-[2px]"></div>
                <div className="absolute inset-y-0 w-[1px] left-1/4 bg-primary/20 blur-[2px]"></div>
                <div className="absolute inset-y-0 w-[1px] left-2/4 bg-primary/20 blur-[2px]"></div>
                <div className="absolute inset-y-0 w-[1px] left-3/4 bg-primary/20 blur-[2px]"></div>
              </div>

              {/* Main Core Loader */}
              <div className="relative mb-12">
                {/* Advanced Multi-ring Loader */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/10 relative flex items-center justify-center">
                  <div className="absolute inset-0 w-full h-full border-t-2 border-primary rounded-full animate-[spin_2s_linear_infinite]"></div>
                  <div className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] border-r-2 border-primary/40 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border-b-2 border-primary/20 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
                  
                  {/* Glowing Core */}
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(34,197,94,0.15)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                    <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary relative z-10 animate-pulse" />
                    {/* Scanning Line Effect */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-primary shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>

                {/* Satellite Points */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-ping delay-75"></div>
                  <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-ping delay-300"></div>
                  <div className="absolute left-0 top-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-ping delay-700"></div>
                  <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-ping delay-1000"></div>
                </div>
              </div>

              {/* Status Text with Dynamic Feedback */}
              <div className="space-y-4 max-w-sm relative z-10 transition-all duration-700">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] animate-pulse">Integrando Neural Sync</span>
                  <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div className="h-full bg-primary/80 w-1/3 animate-[progress_10s_ease-in-out_infinite]"></div>
                  </div>
                </div>
                
                <h3 className="text-white text-xs font-black uppercase tracking-widest leading-relaxed">
                  Construindo Estrutura de Alta Conversão
                </h3>
                
                <div className="flex flex-wrap justify-center gap-2 opacity-40">
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">SEO optimized</span>
                  <span className="text-[8px] font-bold text-zinc-500 px-2">•</span>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Responsive UI</span>
                  <span className="text-[8px] font-bold text-zinc-500 px-2">•</span>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Asset Mapping</span>
                </div>
              </div>

              <style>{`
                @keyframes scan {
                  0%, 100% { top: 0; opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
                @keyframes progress {
                  0% { width: 5%; }
                  30% { width: 45%; }
                  60% { width: 75%; }
                  90% { width: 95%; }
                  100% { width: 100%; }
                }
              `}</style>
            </div>
          ) : status === GenerationStatus.ERROR ? (
            <div className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <div className="space-y-4 max-w-md">
                <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Falha na Sincronização Neural</h3>
                <p className="text-neutral-500 text-[9px] md:text-[11px] font-medium leading-relaxed">
                  {errorMessage || "Ocorreu um erro ao processar sua solicitação. A IA pode ter retornado um código incompleto ou houve uma falha na conexão."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    onClick={onRetry}
                    className="flex-1 px-6 py-3 bg-primary text-background rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                  >
                    Tentar Novamente
                  </button>
                  <button 
                    onClick={onUndo || onRetry}
                    className="flex-1 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    {canUndo ? "Desfazer e Voltar" : "Restaurar Versão Anterior"}
                  </button>
                </div>
              </div>
            </div>
          ) : !html ? (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6 md:space-y-8 animate-in fade-in duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] md:rounded-[2.5rem] bg-black/5 flex items-center justify-center border border-black/5">
                <MousePointer2 className="w-6 h-6 md:w-8 md:h-8 text-neutral-300" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-xl font-black text-black tracking-tight leading-none uppercase">Editor pronto para ação</h3>
                <p className="text-xs md:text-sm text-neutral-400 font-medium max-w-sm leading-relaxed mx-auto px-4">
                  Descreva o que você quer criar no chat para começar a renderização.
                </p>
              </div>
              <div className="flex gap-2">
                 <div className="h-1.5 w-8 rounded-full bg-primary/20" />
                 <div className="h-1.5 w-1.5 rounded-full bg-primary/10" />
                 <div className="h-1.5 w-1.5 rounded-full bg-primary/10" />
              </div>
            </div>
          ) : (
            <iframe ref={iframeRef} className="w-full h-full border-none bg-transparent block pointer-events-auto" title="Preview" />
          )}

          {/* HTML Code Viewer Overlay */}
          {showCode && (
            <div className="absolute inset-0 z-[70] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
              <div className="bg-[#0c1117] w-full max-w-5xl h-full max-h-[80vh] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col scale-in">
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Código Fonte HTML</h3>
                      <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Acesso direto à estrutura do seu site</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleDownloadHtml}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-neutral-400 hover:text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                      title="Baixar Arquivo HTML"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Baixar</span>
                    </button>
                    <button 
                      onClick={handleCopyCode}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                        copySuccess ? "bg-green-500 text-white" : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
                      )}
                    >
                      {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copySuccess ? "Copiado" : "Copiar"}
                    </button>
                    <button 
                      onClick={handleApplyManualCode}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105"
                    >
                      <Rocket className="w-4 h-4" />
                      Aplicar Mudanças
                    </button>
                    <button onClick={() => setShowCode(false)} className="p-3 bg-white/5 text-neutral-500 hover:text-white rounded-xl transition-all"><X className="w-5 h-5" /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden p-6 md:p-8 bg-black/20 flex flex-col">
                  <textarea 
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    spellCheck={false}
                    className="flex-1 w-full bg-transparent text-[11px] md:text-xs font-mono text-neutral-400 leading-relaxed whitespace-pre-wrap break-all selection:bg-primary/30 outline-none resize-none custom-scrollbar"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Image/Color Selector Overlay */}
          {selectedSection && (
            <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
               <div className="bg-[#0c1117] w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col scale-in">
                <div className="p-6 md:p-8 pb-4 md:pb-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                       {selectedSection.isLogoTarget ? <Layout className="w-5 h-5 md:w-6 md:h-6" /> : selectedSection.isImageTarget ? <Camera className="w-5 h-5 md:w-6 md:h-6" /> : <MousePointer2 className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-widest leading-none mb-1">
                        {selectedSection.isLogoTarget ? "Editor de Logo" : selectedSection.isVideoTarget ? "Editor de Vídeo" : selectedSection.isImageTarget ? "Mídia Inteligente" : "Estilo de Texto"}
                      </h3>
                      <p className="text-[7px] md:text-[8px] font-bold text-neutral-500 uppercase tracking-widest">
                        {selectedSection.isLogoTarget ? "Texto ou Imagem" : selectedSection.isVideoTarget ? "MP4 ou YouTube" : selectedSection.isImageTarget ? "Injeção Instantânea" : "Dica: Clique duplo no texto para abrir este painel"}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSection(null)} className="p-2 md:p-3 bg-white/5 text-neutral-500 hover:text-white rounded-xl transition-all"><X className="w-4 h-4 md:w-5 md:h-5" /></button>
                </div>
                
                <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  {selectedSection.isLogoTarget ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">Tipo de Logo</p>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => handleApplyLogo('text', logoText || 'BRAND')}
                            className={cn(
                              "py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all",
                              !imageUrl ? "bg-primary text-background border-primary" : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                            )}
                          >
                            Texto
                          </button>
                          <button 
                            onClick={() => handleApplyLogo('image', imageUrl || SUGGESTED_IMAGES[0].url)}
                            className={cn(
                              "py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all",
                              imageUrl ? "bg-primary text-background border-primary" : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                            )}
                          >
                            Imagem
                          </button>
                        </div>
                      </div>

                      {imageUrl ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {SUGGESTED_IMAGES.map((img) => (
                              <button key={img.id} onClick={() => handleApplyLogo('image', img.url)} className="group relative h-20 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border border-white/5 transition-all">
                                <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={img.label}/>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30"><span className="text-[8px] md:text-[10px] font-black text-white tracking-widest uppercase">{img.label}</span></div>
                              </button>
                            ))}
                            <button onClick={() => fileInputRef.current?.click()} className="h-20 md:h-24 rounded-xl md:rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 md:gap-2 text-neutral-500 hover:text-primary hover:border-primary/40 transition-all bg-white/[0.02]">
                               <Upload className="w-4 h-4 md:w-5 md:h-5" />
                               <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Upload</span>
                               <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (file) {
                                   const reader = new FileReader();
                                   reader.onloadend = () => { if (typeof reader.result === 'string') handleApplyLogo('image', reader.result); };
                                   reader.readAsDataURL(file);
                                 }
                               }} className="hidden" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-[8px] font-black text-primary uppercase tracking-widest">Texto da Logo</p>
                          <input 
                            type="text" 
                            value={logoText} 
                            onChange={(e) => handleApplyLogo('text', e.target.value)} 
                            className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 px-6 text-[11px] md:text-xs text-white outline-none focus:border-primary/40 transition-all" 
                          />
                        </div>
                      )}

                      <div className="space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">Link da Logo</p>
                        <input 
                          type="text" 
                          value={linkUrl} 
                          onChange={(e) => handleApplyLink(e.target.value)} 
                          placeholder="#home"
                          className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 px-6 text-[11px] md:text-xs text-white outline-none focus:border-primary/40 transition-all" 
                        />
                      </div>

                      <button 
                        onClick={() => setSelectedSection(null)}
                        className="w-full py-4 bg-primary text-background rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Concluir
                      </button>

                      <button 
                        onClick={() => {
                          if (selectedSection.elementId) {
                            removeElement(selectedSection.elementId);
                          }
                        }}
                        className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remover este Elemento
                      </button>
                    </div>
                  ) : selectedSection.isVideoTarget ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">URL do Vídeo (MP4)</p>
                        <div className="relative">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                          <input 
                            type="text" 
                            value={videoUrl} 
                            onChange={(e) => setVideoUrl(e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyVideo(videoUrl)}
                            placeholder="https://exemplo.com/video.mp4" 
                            className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-12 text-[11px] md:text-xs text-white outline-none focus:border-primary/40 transition-all" 
                          />
                          {videoUrl && (
                            <button 
                              onClick={() => setVideoUrl('')}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg text-neutral-500 hover:text-white transition-all"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <p className="text-[7px] text-neutral-500 uppercase tracking-widest">
                          Dica: Use links diretos para arquivos .mp4 para melhor performance.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleApplyVideo(videoUrl)}
                        className="w-full py-4 bg-primary text-background rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Aplicar Vídeo
                      </button>

                      <button 
                        onClick={() => {
                          if (selectedSection.elementId) {
                            removeElement(selectedSection.elementId);
                          }
                        }}
                        className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remover este Vídeo
                      </button>
                    </div>
                  ) : selectedSection.isImageTarget ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">Estilo de Elite</p>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", isDepth ? "bg-primary/20 text-primary" : "bg-white/5 text-neutral-500")}>
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Efeito Profundidade</p>
                              <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Flutuante + Máscara Suave</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleUpdateImageStyle(!isDepth, maskColor)}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-all duration-300",
                              isDepth ? "bg-primary" : "bg-neutral-800"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                              isDepth ? "left-7" : "left-1"
                            )} />
                          </button>
                        </div>

                        {isDepth && (
                          <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[8px] font-black text-primary uppercase tracking-widest">Cor do Degradê (Fundo)</p>
                            <div className="flex items-center gap-3">
                              <input 
                                type="color" 
                                value={maskColor} 
                                onChange={(e) => handleUpdateImageStyle(isDepth, e.target.value)}
                                className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                              />
                              <input 
                                type="text" 
                                value={maskColor} 
                                onChange={(e) => handleUpdateImageStyle(isDepth, e.target.value)}
                                className="flex-1 bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white font-mono uppercase"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">Substituir Imagem</p>
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {SUGGESTED_IMAGES.map((img) => (
                          <button key={img.id} onClick={() => handleApplyImage(img.url)} className="group relative h-20 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border border-white/5 transition-all">
                            <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={img.label}/>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30"><span className="text-[8px] md:text-[10px] font-black text-white tracking-widest uppercase">{img.label}</span></div>
                          </button>
                        ))}
                        <button onClick={() => fileInputRef.current?.click()} className="h-20 md:h-24 rounded-xl md:rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 md:gap-2 text-neutral-500 hover:text-primary hover:border-primary/40 transition-all bg-white/[0.02]">
                           <Upload className="w-4 h-4 md:w-5 md:h-5" />
                           <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Upload</span>
                           <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </button>
                      </div>
                    </div>
                      
                      <div className="space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">URL da Imagem</p>
                        <div className="relative">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleApplyImage(imageUrl)} placeholder="Link da imagem..." className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-12 text-[11px] md:text-xs text-white outline-none focus:border-cyan-500/40 transition-all" />
                          {imageUrl && (
                            <button 
                              onClick={() => setImageUrl('')}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg text-neutral-500 hover:text-white transition-all"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">Transformar em Vídeo</p>
                        <div className="relative">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                          <input 
                            type="text" 
                            value={videoUrl} 
                            onChange={(e) => setVideoUrl(e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyVideo(videoUrl)}
                            placeholder="Link do vídeo (.mp4)..." 
                            className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-6 text-[11px] md:text-xs text-white outline-none focus:border-primary/40 transition-all" 
                          />
                        </div>
                        <button 
                          onClick={() => handleApplyVideo(videoUrl)}
                          disabled={!videoUrl.trim()}
                          className="w-full py-3 bg-white/5 text-white border border-white/10 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-30"
                        >
                          Substituir por Vídeo
                        </button>

                        <button 
                          onClick={() => {
                            if (selectedSection.elementId) {
                              removeElement(selectedSection.elementId);
                            }
                          }}
                          className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remover esta Imagem
                        </button>
                      </div>
                    </div>
                  ) : selectedSection.isTextTarget ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest">Conteúdo do Texto</p>
                        <textarea 
                          value={textValue} 
                          onChange={(e) => handleApplyText(e.target.value)} 
                          className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 px-6 text-[11px] md:text-xs text-white outline-none focus:border-primary/40 transition-all min-h-[80px] resize-none" 
                        />
                      </div>

                      {selectedSection.isLinkTarget && (
                        <div className="space-y-3">
                          <p className="text-[8px] font-black text-primary uppercase tracking-widest">Destino do Link</p>
                          <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                            <input 
                              type="text" 
                              value={linkUrl} 
                              onChange={(e) => handleApplyLink(e.target.value)} 
                              placeholder="https://exemplo.com ou #contato" 
                              className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-6 text-[11px] md:text-xs text-white outline-none focus:border-primary/40 transition-all" 
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-[8px] font-black text-primary uppercase tracking-widest">Tamanho da Fonte</p>
                          <span className="text-[10px] font-mono text-white/40">{fontSize}</span>
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="range" 
                            min="8" 
                            max="120" 
                            value={parseInt(fontSize) || 16} 
                            onChange={(e) => handleApplyFontSize(e.target.value + 'px')}
                            className="flex-1 accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={fontSize} 
                            onChange={(e) => handleApplyFontSize(e.target.value)}
                            className="w-16 bg-black/40 border border-white/10 rounded-lg py-1 px-2 text-[10px] text-white text-center outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-[8px] font-black text-primary uppercase tracking-widest">Tipografia do Elemento</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: 'Inter', family: '"Inter", sans-serif' },
                            { name: 'Jakarta', family: '"Plus Jakarta Sans", sans-serif' },
                            { name: 'Outfit', family: '"Outfit", sans-serif' },
                            { name: 'Space', family: '"Space Grotesk", sans-serif' },
                            { name: 'Playfair', family: '"Playfair Display", serif' },
                            { name: 'Anton', family: '"Anton", sans-serif' },
                            { name: 'Unbounded', family: '"Unbounded", sans-serif' },
                            { name: 'Mono', family: '"JetBrains Mono", monospace' },
                            { name: 'Cormorant', family: '"Cormorant Garamond", serif' },
                            { name: 'Syne', family: '"Syne", sans-serif' }
                          ].map((f) => (
                            <button 
                              key={f.name}
                              onClick={() => handleApplyFont(f.family)}
                              className={cn(
                                "py-3 px-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                                fontFamily.includes(f.name) || fontFamily.includes(f.family.split(',')[0].replace(/"/g, '')) 
                                  ? "bg-primary text-background border-primary" 
                                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                              )}
                              style={{ fontFamily: f.family }}
                            >
                              {f.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                          <button 
                            onClick={() => setActiveColorTab('text')}
                            className={cn(
                              "flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                              activeColorTab === 'text' ? "bg-primary text-background" : "text-neutral-500 hover:text-white"
                            )}
                          >
                            Cor do Texto
                          </button>
                          <button 
                            onClick={() => setActiveColorTab('bg')}
                            className={cn(
                              "flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                              activeColorTab === 'bg' ? "bg-primary text-background" : "text-neutral-500 hover:text-white"
                            )}
                          >
                            Cor de Fundo
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-3">
                            {['#000000', '#ffffff', '#00ffff', '#f27d26', '#ff4444', '#00ff00', '#8e9299', '#5a5a40', 'transparent'].map((color) => (
                              <button 
                                key={color} 
                                onClick={() => handleApplyColor(color)}
                                className={cn(
                                  "w-10 h-10 rounded-full border border-white/10 transition-all hover:scale-110 flex items-center justify-center overflow-hidden",
                                  (activeColorTab === 'text' ? customColor === color : bgColor === color) && "ring-2 ring-primary ring-offset-2 ring-offset-[#0c1117]"
                                )}
                                style={{ backgroundColor: color === 'transparent' ? 'transparent' : color }}
                              >
                                {color === 'transparent' && <div className="w-full h-full bg-[repeating-conic-gradient(#808080_0%_25%,#ffffff_0%_50%)] bg-[length:10px_10px]" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: activeColorTab === 'text' ? customColor : bgColor }} />
                            <input 
                              type="text" 
                              value={activeColorTab === 'text' ? customColor : bgColor} 
                              onChange={(e) => handleApplyColor(e.target.value)} 
                              placeholder="#HEX..." 
                              className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 pr-6 text-[11px] md:text-xs text-white outline-none focus:border-cyan-500/40 transition-all" 
                            />
                          </div>
                          <input 
                            type="color" 
                            value={(activeColorTab === 'text' ? customColor : bgColor).startsWith('#') ? (activeColorTab === 'text' ? customColor : bgColor) : '#000000'} 
                            onChange={(e) => handleApplyColor(e.target.value)}
                            className="w-12 h-12 bg-transparent border-none cursor-pointer"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedSection(null)}
                        className="w-full py-4 bg-primary text-background rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Concluir
                      </button>

                      <button 
                        onClick={() => {
                          if (selectedSection.elementId) {
                            removeElement(selectedSection.elementId);
                          }
                        }}
                        className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remover este Texto
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Wand2 className="w-3 h-3" /> Inteligência de Seção
                        </p>
                        <p className="text-[9px] text-neutral-400 leading-relaxed uppercase">
                          Você selecionou uma seção estrutural. Descreva como deseja alterá-la e a IA fará o trabalho pesado.
                        </p>
                      </div>
                      <div className="relative">
                        <Wand2 className="absolute left-4 top-4 w-4 h-4 text-primary/40" />
                        <textarea 
                          value={regenPrompt}
                          onChange={(e) => setRegenPrompt(e.target.value)}
                          placeholder="Ex: Mude as cores para azul, adicione mais um card de serviço..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-[11px] text-white outline-none focus:border-primary/40 transition-all min-h-[100px] resize-none"
                        />
                      </div>
                      <button 
                        onClick={handleRegenerate}
                        disabled={isRegenerating || !regenPrompt.trim()}
                        className="w-full py-5 bg-primary text-background rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isRegenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {isRegenerating ? "Regenerando..." : "Aplicar Mudanças com IA"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
