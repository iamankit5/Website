import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Essential for Vercel static deployments
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    rollupOptions: {
      external: []
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(jsx?)$/,
    exclude: []
  }
})