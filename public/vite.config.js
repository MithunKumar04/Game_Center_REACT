import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  base: "./",  // Ensure relative path for Netlify
  build: {
    outDir: "dist",  // Ensure output goes to the correct folder
  },
  optimizeDeps: {
    include: ["slick-carousel"],
  },
})
