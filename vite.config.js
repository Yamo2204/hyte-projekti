import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        intro: resolve(__dirname, 'intro.html'),
        home: resolve(__dirname, 'index.html'),
        bmi: resolve(__dirname, 'bmi.html'),
      },
    },
  },
  // Public base path could be set here too:
  //base: '/~ullamu/hyte/',
  base: './',
});