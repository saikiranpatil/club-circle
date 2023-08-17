import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:80',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api\/v1/, '') // Optional, if your server doesn't expect the '/api/v1' prefix
      }
    },
  },
  plugins: [react()],
})
