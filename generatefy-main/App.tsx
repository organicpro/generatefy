
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import VoxenMoonChat from './components/ui/voxen-moon-chat';
import PublishModal from './components/PublishModal';
import NicheExplorer from './components/NicheExplorer';
import OpportunityMarket from './components/OpportunityMarket';
import IntelligenceCenter from './components/IntelligenceCenter';
import LeadProspector from './components/LeadProspector';
import ProjectManager from './components/ProjectManager';
import OutreachGenerator from './components/OutreachGenerator';
import TutorialOverlay from './components/TutorialOverlay';
import IdentityModal from './components/IdentityModal';
import PostStudio from './components/PostStudio';
import WorkflowStepper from './components/WorkflowStepper';
import Templates from './components/Templates';
import Academy from './components/Academy';
import GuidedTour from './components/GuidedTour';
import FirebaseDemo from './components/FirebaseDemo';
import ProductCreator from './components/ProductCreator';
import BulkSender from './components/BulkSender';
import Auth from './components/Auth';
import GroupFinder from './components/GroupFinder';
import NicheMining, { MinedNicheSelection } from './components/NicheMining';
import RevenueDashboard from './components/RevenueDashboard';
import { db, auth, isFirebaseConfigured } from './lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { generateWebsite } from './services/geminiService';
import { GenerationStatus, AppView, SavedProject, UserIdentity } from './types';
import { Template } from './constants/templates';
import { cn } from './lib/utils';

const TUTORIAL_KEY = 'ryze_tutorial_completed';
const TOUR_COMPLETED_KEY = 'ryze_tour_v1_completed';
const LOCAL_PROJECTS_KEY = 'ryze_saved_projects_v1';
const IDENTITY_KEY = 'ryze_user_identity_v1';

const App: React.FC = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [htmlHistory, setHtmlHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [lastDescription, setLastDescription] = useState<string>('');
  const [cooldown, setCooldown] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('niche-mining');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [activePreset, setActivePreset] = useState('High-End Luxury');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [identity, setIdentity] = useState<UserIdentity>({ 
    name: '', specialty: 'Especialista Digital', experience: '5+ anos', apiKey: '' 
  });
  const [workflowStep, setWorkflowStep] = useState<number>(1); 
  const [currentProduct, setCurrentProduct] = useState<{name: string, type: string, description: string} | null>(null);
  const [minedNiche, setMinedNiche] = useState<MinedNicheSelection | null>(null);
  const lastIframeHtml = useRef('');

  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_PROJECTS_KEY);
    if (localData) try { setSavedProjects(JSON.parse(localData)); } catch (e) { console.error(e); }

    const localIdentity = localStorage.getItem(IDENTITY_KEY);
    if (localIdentity) try { setIdentity(JSON.parse(localIdentity)); } catch (e) { console.error(e); }

    // Firebase Auth Listener
    let unsubscribeFirebase: (() => void) | undefined;
    if (isFirebaseConfigured() && auth) {
      unsubscribeFirebase = onAuthStateChanged(auth, (user) => {
        setFirebaseUser(user);
      });
    }

    return () => {
      if (unsubscribeFirebase) unsubscribeFirebase();
    };
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem(TUTORIAL_KEY);
    const isTourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);
    
    if (!isTutorialCompleted) setShowTutorial(true);
    else if (!isTourCompleted) setShowTour(true);

    if (!firebaseUser) return;
    const loadCloudData = async () => {
      // Tentar carregar do Firebase
      if (isFirebaseConfigured() && db && firebaseUser) {
        try {
          const q = query(
            collection(db, "projects"), 
            where("user_id", "==", firebaseUser.uid),
            limit(20)
          );
          const querySnapshot = await getDocs(q);
          const firebaseProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
          
          // Ordenar em memória para evitar a necessidade de um índice composto no Firebase
          const sortedProjects = firebaseProjects.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          
          if (sortedProjects.length > 0) {
            setSavedProjects(sortedProjects as any);
            localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(sortedProjects));
          }
        } catch (e) {
          console.error("Erro ao carregar do Firebase:", e);
        }
      }

      // Carregar perfil do Firebase (se houver coleção de perfis)
      // Por enquanto mantemos local ou carregamos de uma coleção 'profiles' no Firestore
    };
    loadCloudData();
  }, [firebaseUser]);

  const getCleanHtml = useCallback((html: string, isForAI: boolean = false) => {
    if (!html) return '';
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 1. Tratar efeitos de profundidade (Depth Effect)
      const elementsWithOrig = doc.querySelectorAll('[data-gf-orig-bg], [data-gf-orig-shadow], [data-gf-orig-border], [data-gf-orig-radius], [data-gf-orig-padding], [data-gf-orig-outline]');
      
      elementsWithOrig.forEach(el => {
        const htmlEl = el as HTMLElement;
        
        if (isForAI) {
          // Para a IA, revertemos para o estado original para não confundir o modelo com fundos transparentes e bordas zeradas
          const origBg = htmlEl.getAttribute('data-gf-orig-bg');
          const origShadow = htmlEl.getAttribute('data-gf-orig-shadow');
          const origBorder = htmlEl.getAttribute('data-gf-orig-border');
          const origRadius = htmlEl.getAttribute('data-gf-orig-radius');
          const origPadding = htmlEl.getAttribute('data-gf-orig-padding');
          const origOutline = htmlEl.getAttribute('data-gf-orig-outline');

          if (origBg) htmlEl.style.backgroundColor = origBg;
          if (origShadow) htmlEl.style.boxShadow = origShadow;
          if (origBorder) htmlEl.style.border = origBorder;
          if (origRadius) htmlEl.style.borderRadius = origRadius;
          if (origPadding) htmlEl.style.padding = origPadding;
          if (origOutline) htmlEl.style.outline = origOutline;
        }
        
        // Sempre removemos os atributos técnicos de backup
        htmlEl.removeAttribute('data-gf-orig-bg');
        htmlEl.removeAttribute('data-gf-orig-shadow');
        htmlEl.removeAttribute('data-gf-orig-border');
        htmlEl.removeAttribute('data-gf-orig-radius');
        htmlEl.removeAttribute('data-gf-orig-padding');
        htmlEl.removeAttribute('data-gf-orig-outline');
      });

      // 2. Limpar máscaras de imagem apenas se for para a IA
      if (isForAI) {
        doc.querySelectorAll('.photo-mask').forEach(img => {
          const htmlImg = img as HTMLElement;
          htmlImg.classList.remove('photo-mask');
          htmlImg.style.maskImage = '';
          htmlImg.style.webkitMaskImage = '';
        });
      }

      // 3. Remover todos os atributos data-gf e editor-specific
      const allElements = doc.querySelectorAll('*');
      allElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeAttribute('contenteditable');
        htmlEl.removeAttribute('spellcheck');
        
        // Remover todos os atributos que começam com data-gf (exceto o ID estrutural)
        const attrs = Array.from(htmlEl.attributes);
        attrs.forEach(attr => {
          if (attr.name.startsWith('data-gf-') && attr.name !== 'data-gf-id') {
            htmlEl.removeAttribute(attr.name);
          }
        });
        
        htmlEl.removeAttribute('data-bg-managed-by');
        htmlEl.removeAttribute('data-mask-color');
      });

      // 4. Remover scripts e estilos do editor
      doc.getElementById('gf-editor-styles')?.remove();
      doc.getElementById('gf-editor-scripts')?.remove();

      let clean = '';
      if (html.toLowerCase().includes('<html')) {
        clean = doc.documentElement.outerHTML;
      } else {
        clean = doc.body.innerHTML;
      }

      // Limpeza final de espaços e normalização
      clean = clean.replace(/\s{2,}/g, ' ').trim();

      // Garantir que o script do Tailwind esteja presente
      if (!clean.includes('cdn.tailwindcss.com')) {
        if (clean.includes('<head>')) {
          clean = clean.replace('</head>', '  <script src="https://cdn.tailwindcss.com"></script>\n</head>');
        } else if (clean.includes('<body')) {
          clean = clean.replace('<body', '<script src="https://cdn.tailwindcss.com"></script>\n<body');
        } else {
          clean = '<script src="https://cdn.tailwindcss.com"></script>\n' + clean;
        }
      }

      return clean;
    } catch (e) {
      console.error("Erro ao limpar HTML:", e);
      return html.replace(/data-ryze-(?!id)[^=]+="[^"]*"/gi, '').trim();
    }
  }, []);

  const handleSaveProject = useCallback(async () => {
    if (!generatedHtml) return;
    setSaveStatus('saving');
    
    const projectId = currentProjectId || crypto.randomUUID();
    // Para salvar ou exportar, NÃO limpamos o efeito de profundidade (isForAI = false)
    const cleanHtml = getCleanHtml(generatedHtml, false);
    
    const newProject: SavedProject = {
      id: projectId,
      name: lastDescription.substring(0, 30) || 'Projeto Sem Nome',
      html: cleanHtml,
      description: lastDescription,
      history: history,
      timestamp: Date.now()
    };

    try {
      const updatedProjects = currentProjectId 
        ? savedProjects.map(p => p.id === currentProjectId ? newProject : p)
        : [newProject, ...savedProjects];
      
      setSavedProjects(updatedProjects);
      localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(updatedProjects));
      setCurrentProjectId(projectId);

      // Salvar no Firebase
      if (isFirebaseConfigured() && db && firebaseUser) {
        try {
          // Usamos setDoc com o ID do projeto para evitar duplicatas e garantir que o usuário só edite o dele
          await setDoc(doc(db, "projects", projectId), {
            ...newProject,
            firebase_timestamp: serverTimestamp(),
            user_id: firebaseUser.uid
          });
          console.log("Projeto salvo no Firebase com sucesso!");
        } catch (e) {
          console.error("Erro ao salvar no Firebase:", e);
        }
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error("Erro ao salvar projeto:", err);
      setSaveStatus('idle');
    }
  }, [generatedHtml, currentProjectId, lastDescription, history, savedProjects, firebaseUser]);

  const handleTemplateSelect = useCallback((template: Template) => {
    setGeneratedHtml(template.html);
    setHtmlHistory([template.html]);
    setLastDescription(`Iniciado a partir do modelo: ${template.name}`);
    setHistory([`Modelo ${template.name} selecionado.`]);
    setCurrentView('builder');
    setCurrentProjectId(null); // Novo projeto a partir de modelo
  }, []);

  const handleGenerate = useCallback(async (description: string) => {
    const activeApiKey = identity.groqApiKey?.trim() || identity.apiKey?.trim();
    
    // Cooldown apenas se não tiver chave própria (para evitar abusos na chave do sistema)
    if (cooldown && !activeApiKey) return;
    
    const previousHtml = generatedHtml;
    setStatus(GenerationStatus.GENERATING);
    setError('');
    setLastDescription(description);
    
    if (!activeApiKey) setCooldown(true);
    setCurrentView('builder');
    
    try {
      // Add a small delay to simulate "thinking" and ensure UI transitions smoothly
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Para a IA, limpamos o efeito de profundidade (isForAI = true) para evitar erros de integridade
      const cleanContext = getCleanHtml(generatedHtml, true);
      const html = await generateWebsite(description, cleanContext || undefined, activeApiKey || undefined, activePreset, undefined, identity.groqApiKey);
      const lowerHtml = (html || "").toLowerCase();
      if (html && (lowerHtml.includes('</html>') || lowerHtml.includes('</body>') || lowerHtml.includes('<div') || lowerHtml.includes('<section'))) {
        setGeneratedHtml(html);
        setHtmlHistory(prev => {
          const newHistory = [...prev, html];
          if (newHistory.length > 20) return newHistory.slice(1);
          return newHistory;
        });
        setHistory(prev => [...prev, description]);
        setStatus(GenerationStatus.IDLE);
      } else {
        throw new Error("O código retornado pela IA está incompleto ou mal formatado. Tente descrever seu pedido com mais detalhes.");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      
      let errorMessage = 'Erro na geração neural.';
      
      // Extract the most meaningful error message
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.error?.message) {
        errorMessage = err.error.message;
      }

      if (errorMessage === "FALHA_INTEGRIDADE" || errorMessage === "FALHA_INTEGRIDADE_FINAL") {
        errorMessage = "A IA gerou um código incompleto ou mal formatado. Isso pode acontecer se o pedido for muito complexo. Tente fazer pedidos menores ou mais específicos.";
      } else {
        const lowerError = errorMessage.toLowerCase();
        const isQuotaError = lowerError.includes('429') || lowerError.includes('quota') || lowerError.includes('resource_exhausted');
        
        if (lowerError.includes('groq_api_key')) {
          errorMessage = "Nao foi possivel gerar agora. Tente novamente em alguns instantes.";
        } else if (isQuotaError) {
          errorMessage = "O limite de uso da inteligência artificial foi atingido. Aguarde alguns minutos e tente novamente.";
        } else if (lowerError.includes('token') || lowerError.includes('limit') || lowerError.includes('context')) {
          errorMessage = "O site está muito grande para esta alteração. Tente remover algumas seções ou fazer pedidos mais específicos.";
        } else if (lowerError.includes('api key') || lowerError.includes('invalid_argument') || lowerError.includes('unauthorized')) {
          errorMessage = "Nao foi possivel gerar agora. Tente novamente em alguns instantes.";
        } else if (lowerError.includes('safety') || lowerError.includes('blocked')) {
          errorMessage = "O pedido foi bloqueado pelos filtros de segurança da IA. Tente reformular sua solicitação.";
        }
      }
      
      if (errorMessage === "API_KEY_MISSING") {
        errorMessage = "Nao foi possivel gerar agora. Tente novamente em alguns instantes.";
      }
      
      setError(errorMessage);
      setStatus(GenerationStatus.ERROR);
      if (previousHtml) setGeneratedHtml(previousHtml);
    } finally {
      if (!activeApiKey) setTimeout(() => setCooldown(false), 5000); // Reduced cooldown
    }
  }, [cooldown, identity.apiKey, identity.groqApiKey, activePreset, generatedHtml]);

  const handleWorkflowNext = (step?: number) => {
    const nextStep = step ?? workflowStep + 1;
    if (nextStep > 6) return;
    
    setWorkflowStep(nextStep);
    
    const stepToView: Record<number, AppView> = {
      1: 'niche-mining',
      2: 'product-creator',
      3: 'revenue',
      4: 'outreach',
      5: 'finder',
      6: 'bulk-sender'
    };
    
    setCurrentView(stepToView[nextStep] || 'product-creator');
  };

  const handleManualHtmlUpdate = useCallback((newHtml: string, skipSync: boolean = false) => {
    if (newHtml && newHtml.toLowerCase().includes('</html>')) {
      setGeneratedHtml(newHtml);
      if (!skipSync) {
        setHtmlHistory(prev => {
          if (prev[prev.length - 1] === newHtml) return prev;
          const newHistory = [...prev, newHtml];
          if (newHistory.length > 20) return newHistory.slice(1);
          return newHistory;
        });
      }
    }
    if (skipSync) lastIframeHtml.current = newHtml;
  }, []);

  const handleUndo = useCallback(() => {
    if (htmlHistory.length <= 1) return;
    const newHistory = [...htmlHistory];
    newHistory.pop(); // Remove current state
    const prevState = newHistory[newHistory.length - 1];
    setGeneratedHtml(prevState);
    setHtmlHistory(newHistory);
    setStatus(GenerationStatus.SUCCESS);
    setError('');
  }, [htmlHistory]);

  const handleImportHtml = useCallback((html: string) => {
    if (!html) return;
    setGeneratedHtml(html);
    setHtmlHistory([html]);
    setLastDescription('Projeto Importado');
    setStatus(GenerationStatus.SUCCESS);
    setCurrentView('builder');
    setHistory(prev => [...prev, 'HTML Importado']);
  }, []);

  const handleRegenerateSection = useCallback(async (sectionId: string, oldHtml: string, prompt: string) => {
    const activeApiKey = identity.groqApiKey?.trim() || identity.apiKey?.trim();
    const prev = generatedHtml;
    setStatus(GenerationStatus.GENERATING);
    setError('');
    try {
      const cleanContext = getCleanHtml(generatedHtml);
      const fullHtml = await generateWebsite(prompt, cleanContext, activeApiKey || undefined, activePreset, { sectionId, oldHtml }, identity.groqApiKey);
      const lowerHtml = (fullHtml || "").toLowerCase();
      if (fullHtml && (lowerHtml.includes('</html>') || lowerHtml.includes('</body>') || lowerHtml.includes('<div'))) {
        setGeneratedHtml(fullHtml);
        setHtmlHistory(prev => {
          const newHistory = [...prev, fullHtml];
          if (newHistory.length > 20) return newHistory.slice(1);
          return newHistory;
        });
        setHistory(prev => [...prev, `Update: ${prompt}`]);
        setStatus(GenerationStatus.SUCCESS);
      } else {
        throw new Error("Falha na integridade do código gerado.");
      }
    } catch (err: any) {
      let errorMessage = err.message || 'Erro no Update';
      
      if (errorMessage.toLowerCase().includes('token') || errorMessage.toLowerCase().includes('limit')) {
        errorMessage = "Limite de tokens excedido. Tente uma alteração menor nesta seção.";
      }

      if (errorMessage === "API_KEY_MISSING") {
        errorMessage = "Nao foi possivel gerar agora. Tente novamente em alguns instantes.";
      }
      setError(errorMessage);
      setStatus(GenerationStatus.ERROR);
      setGeneratedHtml(prev);
    }
  }, [generatedHtml, identity.apiKey, identity.groqApiKey, activePreset]);

  const handleReset = () => { setCurrentView('niche-mining'); setWorkflowStep(1); setStatus(GenerationStatus.IDLE); setGeneratedHtml(''); setHistory([]); setLastDescription(''); setCooldown(false); setCurrentProjectId(null); setCurrentProduct(null); setMinedNiche(null); };

  const handleLogout = async () => {
    if (auth) {
      try {
        await auth.signOut();
        setFirebaseUser(null);
        setSavedProjects([]);
        localStorage.removeItem(LOCAL_PROJECTS_KEY);
        setIsIdentityModalOpen(false);
        setCurrentView('niche-mining');
      } catch (err) {
        console.error("Erro ao sair:", err);
      }
    } else {
      setIsIdentityModalOpen(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'chat': return <VoxenMoonChat 
        onGenerate={(prompt) => {
          setWorkflowStep(1);
          handleGenerate(prompt);
        }} 
        isGenerating={status === GenerationStatus.GENERATING} 
        onNavigate={(view) => {
          if (view === 'product-creator') setWorkflowStep(1);
          setCurrentView(view);
        }} 
        onImportHtml={handleImportHtml} 
      />;
      case 'builder': return <PreviewArea 
        html={generatedHtml} 
        status={status} 
        errorMessage={error} 
        onPublish={() => setIsPublishModalOpen(true)} 
        onSave={handleSaveProject} 
        onRetry={() => handleGenerate(lastDescription)} 
        onOpenIdentity={() => setIsIdentityModalOpen(true)} 
        isUsingCustomKey={false} 
        isSaving={saveStatus === 'saving'} 
        saveSuccess={saveStatus === 'success'} 
        onRegenerateSection={handleRegenerateSection} 
        onManualHtmlUpdate={handleManualHtmlUpdate}
        onUndo={handleUndo}
        canUndo={htmlHistory.length > 1}
        onNextStep={() => handleWorkflowNext(2)}
      />;
      case 'niches': return <NicheExplorer onSelectNiche={handleGenerate} />;
      case 'opportunities': return <OpportunityMarket onSelect={handleGenerate} />;
      case 'intelligence': return <IntelligenceCenter currentProjectDesc={lastDescription} identity={identity} />;
      case 'prospector': return <LeadProspector onSelectLead={handleGenerate} customApiKey={identity.groqApiKey || identity.apiKey} />;
      case 'projects': return <ProjectManager 
        projects={savedProjects} 
        onLoadProject={(p: SavedProject) => { 
          setGeneratedHtml(p.html); 
          setHtmlHistory([p.html]);
          setLastDescription(p.description); 
          setHistory(p.history || []); 
          setCurrentProjectId(p.id); 
          setStatus(GenerationStatus.SUCCESS); 
          setCurrentView('builder'); 
        }} 
        onDeleteProject={async (id: string) => { 
          const newList = savedProjects.filter(p => p.id !== id); 
          setSavedProjects(newList); 
          localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(newList)); 
          
          if (isFirebaseConfigured() && db && firebaseUser) {
            try {
              await deleteDoc(doc(db, "projects", id));
            } catch (e) {
              console.error("Erro ao deletar do Firebase:", e);
            }
          }
        }} 
        onClearAll={async () => {
          setSavedProjects([]);
          localStorage.removeItem(LOCAL_PROJECTS_KEY);
          
          if (isFirebaseConfigured() && db && firebaseUser) {
            try {
              // Deletar todos os projetos do usuário no Firebase
              const q = query(collection(db, "projects"), where("user_id", "==", firebaseUser.uid));
              const querySnapshot = await getDocs(q);
              const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
              await Promise.all(deletePromises);
            } catch (e) {
              console.error("Erro ao limpar Firebase:", e);
            }
          }
        }}
        onNewProject={handleReset} 
      />;
      case 'niche-mining': return <NicheMining onSelect={(selection) => {
        setMinedNiche(selection);
        setCurrentProduct(null);
        setGeneratedHtml('');
        setHtmlHistory([]);
        setCurrentProjectId(null);
        setLastDescription(selection.description || selection.niche);
        setWorkflowStep(2);
        setCurrentView('product-creator');
      }} />;
      case 'product-creator': return <ProductCreator identity={identity} seedNiche={minedNiche} onOpenIdentity={() => setIsIdentityModalOpen(true)} onProductCreated={(name, type, desc) => {
        setCurrentProduct({ name, type, description: desc });
        setLastDescription(desc);
        setGeneratedHtml('');
        setHtmlHistory([]);
        setCurrentProjectId(null);
        setStatus(GenerationStatus.IDLE);
        setError('');
        setWorkflowStep(3);
        setCurrentView('revenue');
        setHistory(prev => [...prev, `Oferta configurada: ${name} (${type}).`]);
      }} />;
      case 'revenue': return <RevenueDashboard
        currentProduct={currentProduct}
        currentProjectDesc={currentProduct?.description || lastDescription}
        identity={identity}
        onNext={() => handleWorkflowNext(4)}
      />;
      case 'outreach': return <OutreachGenerator 
        currentProjectDesc={currentProduct?.description || lastDescription} 
        identity={identity} 
        onNext={() => handleWorkflowNext(4)}
      />;
      case 'finder': return <GroupFinder 
        niche={currentProduct?.description || lastDescription} 
        identity={identity} 
        onNext={() => handleWorkflowNext(5)}
      />;
      case 'bulk-sender': return <BulkSender currentProjectDesc={currentProduct?.description || lastDescription} identity={identity} />;
      case 'templates': return <Templates onSelect={handleTemplateSelect} />;
      case 'academy': return <Academy />;
      default: return <VoxenMoonChat onGenerate={handleGenerate} isGenerating={status === GenerationStatus.GENERATING} onNavigate={setCurrentView} onImportHtml={handleImportHtml} />;
    }
  };

  useEffect(() => {
    switch (currentView) {
      case 'niche-mining': setWorkflowStep(1); break;
      case 'product-creator': setWorkflowStep(2); break;
      case 'builder': setWorkflowStep(2); break;
      case 'revenue': setWorkflowStep(3); break;
      case 'outreach': setWorkflowStep(4); break;
      case 'finder': setWorkflowStep(5); break;
      case 'bulk-sender': setWorkflowStep(6); break;
      default: break;
    }
  }, [currentView]);

  const isAuthenticated = firebaseUser;

  if (!isAuthenticated && isFirebaseConfigured()) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen w-full bg-[#030303] overflow-hidden relative font-sans selection:bg-primary/30">
      {/* Global Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>
      <div className="fixed inset-0 pointer-events-none z-[101] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-[0.2]" />

      <GuidedTour active={showTour} onClose={() => { setShowTour(false); localStorage.setItem(TOUR_COMPLETED_KEY, 'true'); }} />
      {isPublishModalOpen && <PublishModal html={getCleanHtml(generatedHtml)} onClose={() => setIsPublishModalOpen(false)} />}
      {isIdentityModalOpen && <IdentityModal identity={identity} onSave={(id: UserIdentity) => { 
        setIdentity(id); 
        localStorage.setItem(IDENTITY_KEY, JSON.stringify(id));
      }} onClose={() => setIsIdentityModalOpen(false)} onLogout={handleLogout} />}
      {showTutorial && <TutorialOverlay onClose={() => { setShowTutorial(false); localStorage.setItem(TUTORIAL_KEY, 'true'); setShowTour(true); }} />}
      
      <Sidebar 
        onGenerate={handleGenerate} 
        onReset={handleReset} 
        status={status} 
        history={history} 
        isCooldown={cooldown} 
        currentView={currentView} 
        setView={setCurrentView} 
        onOpenIdentity={() => setIsIdentityModalOpen(true)} 
        hasContext={!!generatedHtml} 
        workflowStep={workflowStep}
      />
      
      <main className="flex-1 flex flex-col relative min-w-0 h-full overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/2 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row relative z-10 overflow-hidden">
          <WorkflowStepper currentStep={workflowStep} onSelectStep={handleWorkflowNext} />
          
          <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar" data-tour="tour-welcome">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 min-h-full">
              {renderCurrentView()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
