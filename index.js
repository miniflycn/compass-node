var sass = require('node-sass')
  , fs = require('fs')
  , path = require('path')
  , merge = require('./lib/merge');

/**
 * render(file, opts)
 * @param {String} file
 * @param {Object} opts
 *    @param {String} [opts.data]
 *    @param {Function} [opts.success]
 *    @param {Function} [opts.error]
 */
function render(file, opts) {
  opts = opts || {};
  var data = opts.data || fs.readFileSync(file)
    , includePaths = [path.dirname(file), path.join(__dirname, 'frameworks/stylesheets')]
    , css = opts.css || 'css'
    , font = opts.font || 'font'
    , image = opts.httpImagesPath || '/images'
    , param = {
      includePaths: includePaths
    };

  param.data = [
    '$compass-font-path : "' + font + '";',
    '$compass-stylesheet-path : "' + css + '";',
    '$compass-image-path : "' + image + '";',
    '@import "compass-prefix";',
    data
  ].join('\n'); 
  opts.includePaths &&
    [].splice.apply(param.includePaths, [1, 0].concat(opts.includePaths));

  sass.render(merge(param, opts, [
    'success',
    'error',
    'imagePath',
    'outputStyle',
    'precision',
    'sourceComments',
    'sourceMap',
    'stats'
  ]));
}

module.exports = {
  render: render
};