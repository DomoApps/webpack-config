const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./helpers/paths');

module.exports = (env) => merge.smart(require('./webpack.base'), {
  mode: 'development',

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(js|css|jsx|ts|tsx)($|\?)/i, // provide for .ts, .tsx and .jsx files as well
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.tsconfig,
      eslint: true,
      async: false,
    }),
  ]
});
