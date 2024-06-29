import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
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
