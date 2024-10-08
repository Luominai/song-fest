import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png'],
  build: {
    outDir: '../server/dist',
    emptyOutDir: true, // also necessary
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
})
