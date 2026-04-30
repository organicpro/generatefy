
import React, { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Database, Send, RefreshCw, AlertCircle, Settings } from 'lucide-react';

const FirebaseDemo: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const configured = isFirebaseConfigured();

  const fetchData = async () => {
    if (!configured || !db) return;
    setLoading(true);
    setError(null);
    
    // Timeout de 10 segundos para não ficar carregando infinitamente
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout: O Firebase demorou muito para responder.")), 10000)
    );

    try {
      const q = query(collection(db, "testes"), orderBy("timestamp", "desc"), limit(5));
      const fetchPromise = getDocs(q);
      
      const querySnapshot = await Promise.race([fetchPromise, timeoutPromise]) as any;
      const items = querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      setData(items);
    } catch (err: any) {
      console.error("Erro ao buscar dados:", err);
      if (err.message?.includes("permission-denied")) {
        setError("Acesso Negado: Verifique se você configurou as 'Regras' do Firestore para 'allow read, write: if true;'.");
      } else if (err.message?.includes("Timeout")) {
        setError("O Firebase não respondeu a tempo. Verifique se você criou o banco 'Firestore Database' no console.");
      } else {
        setError(`Erro: ${err.message || "Não foi possível conectar ao Firestore."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !db) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "testes"), {
        texto: inputValue,
        timestamp: Date.now()
      });
      setInputValue('');
      await fetchData();
    } catch (err: any) {
      console.error("Erro ao salvar:", err);
      setError("Falha ao salvar. Verifique as permissões do Firestore.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (configured) fetchData();
  }, [configured]);

  if (!configured) {
    return (
      <div className="p-8 max-w-2xl mx-auto bg-zinc-900/50 rounded-2xl border border-orange-500/20 backdrop-blur-xl text-center">
        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Settings className="w-8 h-8 text-orange-500 animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Configuração Necessária</h2>
        <p className="text-zinc-400 mb-8">
          Para começar a usar o Firebase em 5 minutos, você precisa colar suas chaves de API no arquivo:
          <br />
          <code className="text-orange-400 bg-black/40 px-2 py-1 rounded mt-2 inline-block">/lib/firebase.ts</code>
        </p>
        <div className="bg-black/40 p-4 rounded-xl text-left text-xs text-zinc-500 space-y-2 border border-white/5">
          <p className="font-bold text-zinc-300 uppercase">Onde achar as chaves?</p>
          <p>1. Console do Firebase &gt; Configurações do Projeto</p>
          <p>2. Role até "Seus Aplicativos" e copie o objeto <code className="text-orange-300">firebaseConfig</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-zinc-900/50 rounded-2xl border border-white/10 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Database className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Firebase Firestore</h2>
          <p className="text-sm text-zinc-400">Exemplo de integração em tempo real</p>
        </div>
      </div>

      <form onSubmit={handleAddData} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite algo para salvar no banco..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Salvar
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Últimos Registros</h3>
          <button onClick={fetchData} className="text-xs text-orange-500 hover:underline">Atualizar</button>
        </div>
        
        {data.length === 0 && !loading && (
          <div className="text-center py-8 text-zinc-500 border border-dashed border-white/5 rounded-xl">
            Nenhum dado encontrado.
          </div>
        )}

        {data.map((item) => (
          <div key={item.id} className="p-4 bg-black/20 border border-white/5 rounded-xl flex justify-between items-center">
            <span className="text-zinc-200">{item.texto}</span>
            <span className="text-[10px] text-zinc-500 font-mono">
              {new Date(item.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <h4 className="text-xs font-bold text-zinc-400 mb-2 uppercase">Próximos Passos:</h4>
        <ul className="text-xs text-zinc-500 space-y-1 list-disc pl-4">
          <li>Configure suas chaves no arquivo <code className="text-orange-400">/lib/firebase.ts</code></li>
          <li>Ative o <code className="text-orange-400">Firestore</code> no Console do Firebase</li>
          <li>Defina as regras para <code className="text-orange-400">allow read, write: if true;</code> (apenas para testes!)</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseDemo;
