var sass = require('node-sass')
  , fs = require('fs')
  , path = require('path');

/**
 * render(file, opts)
 * @param {String} file
 * @param {Object} opts
 *    @param {String} opts.context
 */
function render(file, opts) {
  var context = (opts && opts.context) ? 
    opts.context :
      '@import "compass-prefix";\n' + fs.readFileSync(file)   
    , dirname = path.dirname(file);
  sass.render({
    data: context,
    includePaths: [
      dirname,
      path.join(__dirname, 'frameworks/stylesheets')
    ],
    imagePath: './images',
    success: opts.success,
    error: opts.error
  });
}

module.exports = {
  render: render
};