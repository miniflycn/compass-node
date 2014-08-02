var sass = require('node-sass')
  , fs = require('fs')
  , path = require('path');

function render(file, opts) {
  var data = fs.readFileSync(file)
    , dirname = path.dirname(file);
  sass.render({
    data: data,
    includePaths: [
      dirname,
      path.join(__dirname, 'frameworks/stylesheets')
    ],
    success: opts.success,
    error: opts.error
  });
}

module.exports = {
  render: render
};