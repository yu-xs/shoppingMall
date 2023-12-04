// import { fileURLToPath } from 'node:fs';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://m.mi.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path: any) => path.replace(/^\/api/, ''),

        headers: {
          referer: 'https://m.mi.com/', //referer
          origin: 'https://m.mi.com/'
        }
      },
    },
  },
});