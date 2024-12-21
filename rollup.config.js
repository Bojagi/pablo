import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.tsx', '.ts', '.json'];

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@emotion/cache', '@emotion/sheet', 'stylis'],
    output: {
      name: 'pablo',
      file: 'build/pablo.min.js',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDom',
        '@emotion/react': '@emotion/react',
        '@emotion/styled': '@emotion/styled',
        '@emotion/cache': '@emotion/cache',
        '@emotion/sheet': '@emotion/sheet',
        'stylis': 'stylis',
      },
    },
    plugins: [
      resolve({
        jsnext: true,
        extensions,
      }),
      babel({
        babelHelpers: 'bundled',
        include: ['src/**/*'],
        extensions,
      }),
      commonjs(),
      terser(),
    ],
  },
];
