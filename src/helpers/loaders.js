'use strict';

const postcssInit = require('./postcss');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          modules: false,
        }
      ],
      "@babel/react",
      "@babel/typescript",
    ],
    plugins: [
      "@babel/proposal-class-properties",
      "@babel/proposal-nullish-coalescing-operator",
      "@babel/proposal-object-rest-spread",
      "@babel/proposal-optional-chaining",
      "react-hot-loader/babel",
    ],
  }
};

exports.tsx = {
  test: /\.ts(x?)$/,
  exclude: /node_modules/,
  use: [
    babelLoader,
  ]
};

exports.jsx = {
  test: /\.js(x?)$/,
  exclude: /node_modules/,
  use: [
    babelLoader,
  ]
};

exports.html = {
  test: /\.html$/,
  loader: 'raw-loader',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}

exports.scss = {
  test: /\.(sass|scss)$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: 2,
        localIdentName: '[name]-[local]-[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: postcssInit
      }
    },
    { loader: 'sass-loader' }
  ]
};

exports.less = {
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ],
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);
exports.png = makeUrlLoader(/\.png$/);

function makeUrlLoader(pattern) {
  return {
    test: pattern,
    loader: 'url-loader'
  };
}
