const postcssBasePlugins = [
  require('autoprefixer')
];

const postcssProdPlugins = [
  require('cssnano')({
    mergeRules: false,
    zindex: false,
    reduceIdents: false,
    mergeIdents: false,
    safe: true
  })
];

const postcssPlugins = postcssBasePlugins
  .concat(process.env.NODE_ENV ? postcssProdPlugins : []);

module.exports = () => {
  return postcssPlugins;
}