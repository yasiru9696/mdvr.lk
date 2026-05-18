import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Mobile-DVR/',
optimizeDeps: {
  exclude: ['lucide-react'],
},
build: {
  outDir: 'dist' // or 'build' if customized
}
});
