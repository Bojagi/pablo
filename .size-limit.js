module.exports = [
  {
    path: 'build/index.js',
    name: 'Common JS',
    limit: '40 kb',
  },
  { 
    path: 'build/Button/index.js',
    name: 'Button direct import (Common JS)',
    limit: '8 kb',
  },
  {
    path: 'build/es/index.js',
    name: 'ES Next',
    limit: '40 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Button Treeshaking',
    import: '{ Button }',
    limit: '29 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Input Treeshaking',
    import: '{ Input }',
    limit: '29 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Avatar Treeshaking',
    import: '{ Avatar }',
    limit: '29 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'ES Module',
    limit : '34 kb',
  },
  {
    path: 'build/pablo.min.js',
    name: 'UMD Bundle',
    limit: '32 kb',
  },
]
