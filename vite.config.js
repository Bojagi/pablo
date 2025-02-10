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
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './vitestSetup.js', // assuming the test folder is in the root of our project
    },
  })

export default config;
