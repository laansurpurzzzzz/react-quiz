// https://vitejs.dev/config/
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: './build',
  },
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      src: '/src',
    },
  },
  root: './',
  server: {
    watch: {
      usePolling: true,
    },
    open: true,
  },
});
