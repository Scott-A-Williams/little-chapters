import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages serves this project from /little-chapters/
  base: '/little-chapters/',

  server: {
    port: 3000,
    host: true
  },

  build: {
    sourcemap: true,
    target: 'esnext'
  }
});
