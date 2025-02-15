import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./",  // Ensure relative path for Netlify
  build: {
    outDir: "dist",  // Ensure output goes to the correct folder
  },
  optimizeDeps: {
    include: ["slick-carousel"],
  },
});
