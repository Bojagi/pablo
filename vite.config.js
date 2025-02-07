import { getExternals, getLibEntries } from './buildUtils/viteHelpers';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const config = defineConfig({
    plugins: [
      react(),
    ],
    build: {
      minify: false,
      terserOptions: {
        compress: false,
        mangle: false,
      },
      lib: {
        entry: getLibEntries(),
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: getExternals(['react/jsx-runtime']),
      },
    },
  })

export default config;
