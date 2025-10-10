import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/express/',
  plugins: [react()],
  server: {
    port: 5174, // Changed from 5173 to 5174
    strictPort: true,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
