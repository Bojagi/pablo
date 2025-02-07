export default [
  {
    path: 'dist/index.cjs',
    name: 'Common JS',
    limit: '40 kb',
    running: false,
  },
  { 
    path: 'dist/Button/index.cjs',
    name: 'Button direct import (Common JS)',
    limit: '11.5 kb',
    running: false,
  },
  {
    path: 'dist/index.js',
    name: 'Button Treeshaking',
    running: false,
    import: '{ Button, PabloThemeProvider }',
    limit: '10 kb',
  },
  {
    path: 'dist/index.js',
    name: 'Input Treeshaking',
    import: '{ Input }',
    limit: '7 kb',
    running: false,
  },
  {
    path: 'dist/index.js',
    name: 'Tooltip Treeshaking',
    import: '{ Tooltip }',
    limit: '10 kb',
    running: false,
  },
  {
    path: 'dist/index.js',
    name: 'ES Module',
    limit : '34 kb',
    running: false,
    import: '*',
  }
]
