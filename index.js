var sass = require('node-sass')
  , fs = require('fs')
  , path = require('path')
  , merge = require('./lib/merge')
  , Scss = require('./lib/scss');

function _fixPath(path) {
  if (!/\/$/.test(path)) {
    return path + '/';
  } else {
    return path;
  }
}

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
  var data = opts.data || fs.readFileSync(file, { encoding: 'utf8' })
    , includePaths = [path.dirname(file)]
    , css = opts.css || 'css'
    , font = opts.font || 'font'
    , imagePath = opts.imagePath || '/images'
    , image = opts.httpImagesPath || '/images'
    , spriteDist = opts.spriteDist || '/images'
    , param = {
      includePaths: [path.join(__dirname, 'frameworks/stylesheets')]
    };

  new Scss(data, {
    includePaths: opts.includePaths ? 
      includePaths.concat(opts.includePaths) : 
        includePaths,
    spriteDist: spriteDist,
    imagePath: imagePath
  }).done(function (data) {
    param.data = [
      '$compass-font-path : "' + _fixPath(font) + '";',
      '$compass-stylesheet-path : "' + _fixPath(css) + '";',
      '$compass-image-path : "' + _fixPath(image) + '";',
      '@import "compass-prefix";',
      data
    ].join('\n'); 

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
  });
}

module.exports = {
  render: render,
  version: require('./package').version
};