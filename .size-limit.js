const externalSizes = {
  reactTransitionGroup: 4.3,
  styledSystem: 3.33,
}

const totalExternalSize = Object.values(externalSizes).reduce((acc, size) => acc + size, 0);

function getFullSize(emptySize) {
  return `${totalExternalSize + emptySize} kb`;
}

module.exports = [
  {
    path: 'build/index.js',
    name: 'Common JS',
    limit: getFullSize(21),
  },
  {
    path: 'build/Button/index.js',
    name: 'Button direct import (Common JS)',
    limit: getFullSize(0.2),
  },
  {
    path: 'build/es/index.js',
    name: 'ES Next',
    limit: getFullSize(21),
  },
  {
    path: 'build/esm/index.js',
    name: 'Button Treeshaking',
    import: '{ Button }',
    limit: getFullSize(9.6),
  },
  {
    path: 'build/esm/index.js',
    name: 'Input Treeshaking',
    import: '{ Input }',
    limit: getFullSize(9.5),
  },
  {
    path: 'build/esm/index.js',
    name: 'Avatar Treeshaking',
    import: '{ Avatar }',
    limit: getFullSize(9.5),
  },
  {
    path: 'build/esm/index.js',
    name: 'ES Module',
    limit: getFullSize(18),
  },
  {
    path: 'build/pablo.min.js',
    name: 'UMD Bundle',
    limit: getFullSize(15),
  },
]
