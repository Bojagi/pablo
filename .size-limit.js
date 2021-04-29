module.exports = [
  {
    path: 'build/index.js',
    name: 'Common JS',
    limit: '36 kb',
  },
  { 
    path: 'build/Button/index.js',
    name: 'Button direct import (Common JS)',
    limit: '5.75 kb',
  },
  {
    path: 'build/es/index.js',
    name: 'ES Next',
    limit: '37 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Button Treeshaking',
    import: '{ Button }',
    limit: '26 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Input Treeshaking',
    import: '{ Input }',
    limit: '26 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Avatar Treeshaking',
    import: '{ Avatar }',
    limit: '26 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'ES Module',
    limit : '32 kb',
  },
  {
    path: 'build/pablo.min.js',
    name: 'UMD Bundle',
    limit: '30 kb',
  },
]
