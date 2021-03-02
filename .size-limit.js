module.exports = [
  {
    path: 'build/index.js',
    name: 'Common JS',
    limit: '35 kb',
  },
  {
    path: 'build/Button/index.js',
    name: 'Button direct import (Common JS)',
    limit: '5.1 kb',
  },
  {
    path: 'build/es/index.js',
    name: 'ES Next',
    limit: '35 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Button Treeshaking',
    import: '{ Button }',
    limit: '24.5 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Input Treeshaking',
    import: '{ Input }',
    limit: '24.5 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'Avatar Treeshaking',
    import: '{ Avatar }',
    limit: '24.5 kb',
  },
  {
    path: 'build/esm/index.js',
    name: 'ES Module',
    limit: '30 kb',
  },
  {
    path: 'build/pablo.min.js',
    name: 'UMD Bundle',
    limit: '28 kb',
  },
]
