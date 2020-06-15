'use strict';
const path = require('path');
const paths = require('./helpers/paths');
const defaults = require('./helpers/environment-defaults');

module.exports = (env = {}) => {
  const newEnv = Object.assign({}, defaults, env);

  if (env.prod) {
    return require(`./webpack.prod`)(newEnv);
  } else if (env.test) {
    return require('./webpack.test')(newEnv);
  } else {
    return require('./webpack.dev')(newEnv);
  }
};
