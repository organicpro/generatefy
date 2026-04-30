
import { createClient } from '@supabase/supabase-js';

// Proteção para evitar crash se import.meta.env não estiver disponível
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : {};

// No Vite, variáveis de ambiente devem começar com VITE_
const supabaseUrl = (typeof window !== 'undefined') 
  ? window.location.origin + '/supabase-proxy' 
  : (env.VITE_SUPABASE_URL || 'https://tjmacxansodaebpqfinb.supabase.co');

console.log('[Supabase] Initializing with URL:', supabaseUrl);

const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbWFjeGFuc29kYWVicHFmaW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTE0NjcsImV4cCI6MjA4ODE2NzQ2N30.IlP_4zt7KwQsnK2noQ6DnsTHbWeV6lIiE3Q9BX5foEE';

export const isSupabaseConfigured = () => {
  return false; // Desativado para permitir acesso direto ao Firebase
};

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      fetch: (...args) => window.fetch(...args)
    }
  }
);
