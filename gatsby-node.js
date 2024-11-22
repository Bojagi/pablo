import path from 'path';

exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      // ⚠ Note the '..' in the path because the docz gatsby project lives in the `.docz` directory
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, '../src/'),
        '@docsUtils': path.resolve(__dirname, '../docsUtils/'),
      },
    },
  });
};
