
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  const hmrPort = Number(env.VITE_HMR_PORT || process.env.VITE_HMR_PORT || 24679);
  
  return {
    plugins: [react()],
    server: {
      hmr: {
        port: hmrPort,
      },
    },
    resolve: {
      alias: {
        // Impede que bibliotecas tentem usar o node-fetch no navegador
        'node-fetch': 'identity-obj-proxy',
        'node-fetch-native': 'identity-obj-proxy',
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
