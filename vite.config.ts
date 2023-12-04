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
    // middleware: [
    //   createProxyMiddleware('/api', {
    //     target: 'https://m.mi.com',
    //     changeOrigin: true,
    //     onProxyReq: (proxyReq: any, req: any, res: any) => {
    //       proxyReq.setHeader('Referer', 'https://m.mi.com/?spmref=MiShop_M.cms_19106.3814597.1&scmref=cms.0.0.0.0.0.0.0');
    //     },
    //   }),
    // ],
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