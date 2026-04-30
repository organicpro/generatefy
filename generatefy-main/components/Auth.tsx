
import React, { useState } from 'react';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Sparkles, Mail, Lock, Loader2, ArrowRight, Database, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthProps {
}

export default function Auth({ }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error("Erro de autenticação:", error);
      if (error.code === "auth/operation-not-allowed") {
        setMessage("Erro: O login por E-mail/Senha não está ativado no Console do Firebase.");
      } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setMessage("E-mail ou senha incorretos.");
      } else if (error.message === "Failed to fetch") {
        setMessage("Erro de conexão. Verifique suas chaves de API.");
      } else {
        setMessage(`Erro: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="w-full max-w-md bg-card border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20 mb-6">
            <Database className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-2">Generatefy <span className="text-primary italic">Engine.</span></h1>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
            Acesso Restrito ao Consultor
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2 flex items-center gap-2">
              <Mail className="w-3 h-3" /> E-mail
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:border-primary/40 outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2 flex items-center gap-2">
              <Lock className="w-3 h-3" /> Senha
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:border-primary/40 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {message && (
            <div className={cn(
              "text-[10px] font-bold text-center uppercase tracking-widest p-3 rounded-xl border flex items-center justify-center gap-2",
              "text-rose-500 bg-rose-500/5 border-rose-500/10"
            )}>
              <ShieldAlert className="w-3 h-3" />
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl bg-primary text-background shadow-primary/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            Entrar no App
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <p className="text-[8px] text-neutral-700 font-bold uppercase tracking-[0.2em]">Problemas com login?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.location.reload()} 
                className="text-[9px] text-neutral-500 hover:text-white transition-colors"
              >
                Recarregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
