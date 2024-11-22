export default [
  {
    path: 'build/index.cjs',
    name: 'Common JS',
    limit: '40 kb',
    running: false,
  },
  { 
    path: 'build/Button/index.cjs',
    name: 'Button direct import (Common JS)',
    limit: '10 kb',
    running: false,
  },
  {
    path: 'build/es/index.cjs',
    name: 'ES Next',
    limit: '40 kb',
    running: false,
  },
  {
    path: 'build/esm/index.js',
    name: 'Button Treeshaking',
    running: false,
    import: '{ Button, PabloThemeProvider }',
    limit: '10 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Input Treeshaking',
    import: '{ Input }',
    limit: '7 kb',
    running: false,
  },
  {
    path: 'build/esm/index.js',
    name: 'Avatar Treeshaking',
    import: '{ Avatar }',
    limit: '6 kb',
    running: false,
  },
  {
    path: 'build/esm/index.js',
    name: 'ES Module',
    limit : '34 kb',
    running: false,
    import: '*',
  },
  {
    path: 'build/pablo.min.js',
    name: 'UMD Bundle',
    limit: '32 kb',
    running: false,
  },
]
