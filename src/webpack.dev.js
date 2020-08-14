'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const paths = require('./helpers/paths');
const ip = require('ip');
const { Proxy } = require('@domoinc/ryuu-proxy');
const portfinder = require('portfinder-sync');

const BASE_PORT = 3000;
const port = portfinder.getPort(BASE_PORT);

module.exports = (env) => {
  const manifestPath = path.join(paths.appSrc, env.manifest);

  const appContextId = (typeof env.proxy !== 'undefined') ? env.proxy.appContextId : undefined;

  const domoProxy = Proxy !== null ? new Proxy({ manifest: require(manifestPath), appContextId }) : null;

  return merge.smartStrategy({ entry: 'prepend', })(
    require('./webpack.base'),
    {
      mode: 'development',
      devtool: 'source-map',

      output: {
        devtoolModuleFilenameTemplate: info =>
          path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        hotUpdateChunkFilename: 'hot/hot-update.js', // https://github.com/webpack/webpack-dev-server/issues/79#issuecomment-244596129
        hotUpdateMainFilename: 'hot/hot-update.json' // was 404 hot-update.json not found before this ^^^
      },

      plugins: [
        new webpack.DefinePlugin({ ON_DEV: true }),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
          tsconfig: paths.tsconfig,
          eslint: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'Webpack build', excludeWarnings: true }),
      ],

      devServer: {
        contentBase: false,
        inline: true,
        hot: true,
        noInfo: true,
        clientLogLevel: 'error',
        stats: { colors: true },
        host: '0.0.0.0',
        port,
        before: domoProxy !== null ? (app) => { app.use(domoProxy.express()) } : undefined,
        after: (app) => {
          const address = ip.address();
          console.log(`Available externally at http://${address}:${port}`);
        }
      }
    }
  )
};
