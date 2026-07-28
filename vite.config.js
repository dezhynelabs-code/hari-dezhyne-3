import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Set base to './' for relative asset loading on Hostinger (works on any domain or subdirectory)
  base: './',

  build: {
    outDir: 'dist',
    // Generate sourcemaps only in development (keep prod bundle clean)
    sourcemap: false,
    // Raise chunk size warning limit slightly
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libraries into their own chunk for better caching
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'icons-vendor':  ['react-icons'],
        },
        // Hash file names so Hostinger CDN cache is always busted on deploy
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash].[ext]',
      },
    },
  },
})
