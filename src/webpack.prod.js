'use strict';

const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const paths = require('./helpers/paths');

module.exports = (env) => merge.smart(require('./webpack.base'), {
  mode: 'production',

  output: {
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].js.map',
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },

  devtool: 'source-map',

  stats: 'normal',

  optimization: {
    splitChunks: {
        chunks: 'all',
    },
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.tsconfig,
      eslint: true,
      async: false,
      reportFiles: [
        '!**/*.spec.{ts,tsx}',
        '!**/*.stories.tsx',
        '**/*.{ts,tsx}',
      ]
    }),
    new CopyWebpackPlugin([
      { from: env.manifest, to: 'manifest.json' },
    ]),
  ],
  // this config only gets used for serving prod build
  devServer: {
    contentBase: './src/',
    noInfo: false,
    hot: false,
    inline: false
  }
});

