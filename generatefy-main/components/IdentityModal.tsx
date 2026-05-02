
import React, { useState } from 'react';
import { X, UserCircle, Briefcase, Award, Save, CheckCircle2, ChevronDown, Key, AlertCircle, Loader2, Zap, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { UserIdentity } from '../types';
import { cn } from '../lib/utils';

interface IdentityModalProps {
  identity: UserIdentity;
  onSave: (identity: UserIdentity) => void;
  onClose: () => void;
  onLogout?: () => void;
}

export default function IdentityModal({ identity, onSave, onClose, onLogout }: IdentityModalProps) {
  const [formData, setFormData] = useState<UserIdentity>(identity);
  const [saved, setSaved] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(!!identity.apiKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | 'busy' | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [isTestingGroq, setIsTestingGroq] = useState(false);
  const [groqTestResult, setGroqTestResult] = useState<'success' | 'error' | null>(null);

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const testGroqKey = async () => {
    if (!formData.groqApiKey) return;
    setIsTestingGroq(true);
    setGroqTestResult(null);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${formData.groqApiKey}`
        }
      });
      if (response.ok) {
        setGroqTestResult('success');
      } else {
        setGroqTestResult('error');
      }
    } catch (e) {
      setGroqTestResult('error');
    } finally {
      setIsTestingGroq(false);
    }
  };

  const testApiKey = async () => {
    if (!formData.apiKey) return;
    setIsTesting(true);
    setTestResult(null);
    setTestError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: formData.apiKey });
      // Teste com o modelo Flash mais estável para 2026
      await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'Hi',
      });
      setTestResult('success');
    } catch (e: any) {
      console.error("Erro ao testar chave:", e);
      const errorStr = JSON.stringify(e).toLowerCase();
      const errorMsg = e.message?.toLowerCase() || "";
      
      if (
        errorStr.includes('401') || 
        errorStr.includes('403') || 
        errorStr.includes('invalid api key') || 
        errorStr.includes('unauthorized') ||
        errorMsg.includes('api key not valid')
      ) {
        setTestResult('error');
        setTestError('Chave inválida');
      } else if (errorStr.includes('503') || errorStr.includes('unavailable') || errorStr.includes('overloaded')) {
        setTestResult('busy');
        setTestError('Servidor Ocupado');
      } else {
        setTestResult('error');
        setTestError('Erro de conexão');
      }
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="bg-[#080808] w-full max-w-xl rounded-[2.5rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden relative group">
        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <div className="p-10 border-b border-white/[0.03] flex items-center justify-between bg-black/20 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.02] flex items-center justify-center border border-white/5 relative group-hover:border-primary/20 transition-all duration-700">
              <UserCircle className="w-6 h-6 text-primary" />
              <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Protocolo de Identidade</h2>
              <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.4em]">Neural Core Configuration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-zinc-600 hover:text-white transition-all bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                   Nome da Marca
                </label>
              </div>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Generatefy Agency"
                className="w-full bg-black/40 border border-white/[0.03] rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none transition-all font-semibold placeholder:text-zinc-800"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                   Nível de Operação
                </label>
              </div>
              <input 
                type="text" 
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                placeholder="Ex: Archictet Builder"
                className="w-full bg-black/40 border border-white/[0.03] rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none transition-all font-semibold placeholder:text-zinc-800"
              />
            </div>
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-3 text-[9px] font-black text-zinc-600 hover:text-primary uppercase tracking-[0.3em] transition-all group/btn"
            >
              <div className={cn("w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover/btn:border-primary/40 transition-all", showAdvanced && "bg-primary/10 border-primary/20")}>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-500", showAdvanced && "rotate-180 text-primary")} />
              </div>
              Arquitetura de Chaves Neurais
            </button>
            
            {showAdvanced && (
              <div className="p-8 bg-[#030303] border border-white/[0.03] rounded-[2rem] space-y-8 animate-in slide-in-from-top-4 duration-700 shadow-inner">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-amber-500/60">
                      <Key className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Chave Neural Google (v3)</span>
                    </div>
                    {formData.apiKey && (
                      <button 
                        onClick={testApiKey}
                        disabled={isTesting}
                        className={cn(
                          "px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border shadow-lg",
                          testResult === 'success' ? "bg-green-500/10 border-green-500 text-green-500" :
                          testResult === 'error' ? "bg-rose-500/10 border-rose-500 text-rose-500" :
                          testResult === 'busy' ? "bg-amber-500/10 border-amber-500 text-amber-500" :
                          "bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-white/20"
                        )}
                      >
                        {isTesting ? <Loader2 className="w-3 h-3 animate-spin" /> : 
                         testResult === 'success' ? 'Sincronizado' : 
                         testResult === 'error' ? (testError || 'Acesso Negado') : 
                         testResult === 'busy' ? 'Sobrecarga' : 'Verificar Conexão'}
                      </button>
                    )}
                  </div>
                  <input 
                    type="password" 
                    value={formData.apiKey || ''}
                    onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                    placeholder="AIzaSy... (Vazio para Rede Global)"
                    className="w-full bg-black border border-white/5 rounded-xl px-5 py-4 text-xs text-primary font-mono outline-none focus:border-primary/50 transition-all placeholder:text-zinc-900"
                  />
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[9px] text-zinc-600 leading-tight uppercase font-bold tracking-tight">
                      Usamos nossa infraestrutura compartilhada por padrão. Implemente sua <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline group-hover:text-primary transition-colors">Chave Neural</a> para prioridade absoluta e latência zero.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/[0.03] space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-emerald-500/60">
                      <Cpu className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Nó de Overclock Groq (Reserva)</span>
                    </div>
                    {formData.groqApiKey && (
                      <button 
                        onClick={testGroqKey}
                        disabled={isTestingGroq}
                        className={cn(
                          "px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border shadow-lg",
                          groqTestResult === 'success' ? "bg-green-500/10 border-green-500 text-green-500" :
                          groqTestResult === 'error' ? "bg-rose-500/10 border-rose-500 text-rose-500" :
                          "bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-white/20"
                        )}
                      >
                        {isTestingGroq ? <Loader2 className="w-3 h-3 animate-spin" /> : 
                         groqTestResult === 'success' ? 'Pronto' : 
                         groqTestResult === 'error' ? 'Falhou' : 'Inicializar Nó'}
                      </button>
                    )}
                  </div>
                  <input 
                    type="password" 
                    value={formData.groqApiKey || ''}
                    onChange={(e) => setFormData({...formData, groqApiKey: e.target.value})}
                    placeholder="gsk_... (Failover support)"
                    className="w-full bg-black border border-white/5 rounded-xl px-5 py-4 text-xs text-emerald-500 font-mono outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-900"
                  />
                  <p className="text-[8px] text-zinc-700 leading-tight uppercase tracking-widest font-black text-center">
                    Auto-Failover habilitado. A Groq assume em <span className="text-emerald-500">10ms</span> se a rede principal oscilar.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-6 bg-primary text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-transparent hover:text-white border-2 border-primary transition-all duration-700 shadow-[0_20px_60px_rgba(168,85,247,0.3)] group/save relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/save:translate-x-full transition-transform duration-1000" />
            {saved ? <CheckCircle2 className="w-5 h-5 relative z-10" /> : <Save className="w-5 h-5 relative z-10" />}
            <span className="relative z-10">{saved ? 'Protocolo Confirmado' : 'Consolidar Identidade'}</span>
          </button>

          {onLogout && (
            <button 
              onClick={onLogout}
              className="w-full py-4 text-zinc-800 hover:text-rose-500 text-[8px] font-black uppercase tracking-[0.5em] transition-all duration-500 mt-2"
            >
              Terminar Sessão Neural
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
