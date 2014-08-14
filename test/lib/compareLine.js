'use strict';
var fs = require('fs');

function compareLine(css, file) {
  css = css.replace(/(\r?\n)+$/, '').split('\n');
  file = fs.readFileSync(file, { encoding: 'utf8' }).replace(/\r?\n$/, '').split(/\r?\n/);
  css.forEach(function (line, i) {
    line.should.equal(file[i]);
  });
}

return module.exports = compareLine;