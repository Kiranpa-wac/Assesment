// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://core-skill-test.webc.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/employee-portal/api/v1'),
      },
    },
  },
});
