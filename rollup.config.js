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
    external: ['react', 'react-dom', 'styled-components'],
    output: {
      name: 'pablo',
      file: 'build/pablo.min.js',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDom',
        'styled-components': 'styledComponents',
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
