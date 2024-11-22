module.exports = (api) => {
  const useESModules = api.env(['esm', 'rollup']);
  const modernJS = api.env(['esm', 'es']);
  
  const basePresets = modernJS
    ? [
        [
          '@babel/env',
          {
            modules: useESModules ? false : 'commonjs',
          },
        ],
      ]
    : [
        [
          '@babel/env',
          {
            modules: useESModules ? false : 'commonjs',
            targets: {
              browsers: ['last 2 versions'],
            },
          },
        ],
      ];

  const returnValue = {
    presets: [...basePresets, '@babel/typescript', '@babel/react'],
    plugins: [
      [
        '@babel/plugin-transform-typescript',
        {
          isTSX: true,
        },
      ],
      'babel-plugin-styled-components',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-optional-chaining',
    ],
  };

  if (!api.env(['rollup', 'test'])) {
    returnValue.plugins.push(['babel-plugin-add-import-extension', { extension: useESModules ? 'js' : 'cjs' }]

    );
  }

  return returnValue;
};
