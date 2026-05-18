import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  base: '/Mobile-DVR/',
optimizeDeps: {
  exclude: ['lucide-react'],
},
build: {
  outDir: 'dist' // or 'build' if customized
}
});