import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import autoExternal from 'rollup-plugin-auto-external';
import resolve from 'rollup-plugin-node-resolve';

const PKG_ROOT_PATH = process.cwd();
const PKG_JSON = require(path.join(PKG_ROOT_PATH, 'package.json'));

export default {
  input: './src/index.js',
  external: ['fs', 'path'],
  output: [
    { file: PKG_JSON.main, format: 'cjs', sourcemap: true, exports: 'named' },
    { file: PKG_JSON.module, format: 'es', sourcemap: true, exports: 'named' },
  ],
  plugins: [
    autoExternal(),
    resolve(),
    commonjs({ ignore: ['conditional-runtime-dependency'] }),
    sourceMaps(),
  ]
};