import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import svgLoader from 'vite-svg-loader';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const port = process.env.port ? Number(process.env.port) : 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      cache: true,
      fix: true,
    }),
    svgLoader({
      defaultImport: 'component',
      svgo: true,
    }),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx?$/],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/styles/global.scss";`,
      },
    },
  },

  server: {
    port: port,
    hmr: true,
  },

  build: {
    minify: true,
  },
});
