import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        bmi: resolve(__dirname, 'bmi.html'),
        items: resolve(__dirname, 'items-page.html'),
        diary: resolve(__dirname, 'diary.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
  // Public base path could be set here too:
  //base: '/~ullamu/hyte/',
  base: './',
});