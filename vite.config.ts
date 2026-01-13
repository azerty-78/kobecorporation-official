import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration pour les assets
  build: {
    assetsDir: 'assets',
    // Inline les petits assets (< 4kb) pour réduire les requêtes HTTP
    assetsInlineLimit: 4096,
    // Optimisation des assets
    rollupOptions: {
      output: {
        // Organisation des fichiers générés
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  // Configuration pour servir les assets statiques
  publicDir: 'public',
})
