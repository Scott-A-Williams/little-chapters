import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/little-chapters/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    sourcemap: true,
    target: 'esnext'
  }
});
