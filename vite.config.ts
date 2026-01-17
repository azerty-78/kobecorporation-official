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
    // Optimisation CSS pour garantir des couleurs identiques
    cssCodeSplit: true,
    cssMinify: 'esbuild', // Utiliser esbuild pour la minification CSS (plus fiable)
    // Optimisation des assets et code splitting
    rollupOptions: {
      output: {
        // Organisation des fichiers générés
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        // Optimisation du code splitting
        manualChunks: {
          // Séparer les dépendances vendor
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Séparer les icônes (peuvent être volumineuses)
          'icons': ['@heroicons/react'],
        },
      },
    },
    // Réduire la taille des chunks
    chunkSizeWarningLimit: 1000,
    // Désactiver la sourcemap en production pour éviter les différences
    sourcemap: false,
  },
  // Configuration pour servir les assets statiques
  publicDir: 'public',
  // Configuration CSS pour garantir la cohérence
  css: {
    devSourcemap: false, // Désactiver les sourcemaps CSS en dev aussi pour cohérence
    postcss: './postcss.config.js',
  },
})
