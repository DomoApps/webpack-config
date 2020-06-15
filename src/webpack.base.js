'use strict';

const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loaders = require('./helpers/loaders');
const paths = require('./helpers/paths');

const bannerText = fs.readFileSync(paths.bannerText).toString();
const pkg = JSON.parse(fs.readFileSync(paths.packageJson));

module.exports = {
  context: paths.appSrc,

  stats: 'errors-only',

  entry: {
    main: ['./index.tsx']
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      actions: `${paths.appSrc}/actions/`,
      components: `${paths.appSrc}/components/`,
      assets: `${paths.appSrc}/assets/`,
      styles: `${paths.appSrc}/styles/`,
      models: `${paths.appSrc}/models/`,
      '~': paths.appSrc
    }
  },

  output: {
    path: paths.appDist,
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.BannerPlugin(bannerText),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      APP_NAME: JSON.stringify(pkg.name)
    }),
    new HtmlWebpackPlugin({
      title: 'Domo App',
      pkg: pkg,
      template: './index.ejs',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets',
        ignore: ['README.md']
      },
      { from: '*.png' }
    ]),
  ],

  module: {
    rules: [
      loaders.jsx,
      loaders.tsx,
      loaders.html,
      loaders.css,
      loaders.scss,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
      loaders.png,
      loaders.less,
    ]
  }
};
