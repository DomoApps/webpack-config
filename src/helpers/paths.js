'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  packageJson: resolveApp('package.json'),
  bannerText: resolveApp('BANNER.txt'),
  tsconfig: resolveApp('tsconfig.json'),
};
