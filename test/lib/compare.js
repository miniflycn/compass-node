'use strict';
var fs = require('fs');

function compare(css, file) {
  css = css.replace(/\r?\n$/, '');
  css.should.equal(fs.readFileSync(file, { encoding: 'utf8' }).replace(/\r?\n$/, '').replace(/\r/g, ''));
}

return module.exports = compare;