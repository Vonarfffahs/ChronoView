/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // local Nest app
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,
    port: 5173,
  },
});
