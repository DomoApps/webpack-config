const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: 'webpack-config',
  displayName: 'webpack-config',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  }
};
