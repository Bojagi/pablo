const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/app',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['mjs', '.ts', '.js', '.json', '.tsx', '.jsx', '.css'],
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
};
