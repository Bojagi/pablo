module.exports = {
  presets: [
    '@babel/typescript',
    '@babel/react',
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    'babel-plugin-styled-components',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining'
  ],
};
