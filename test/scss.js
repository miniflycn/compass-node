var Scss = require('../lib/scss')
  , fs = require('fs')
  , path = require('path')
  , compareLine = require('./lib/compareLine');

describe('scss', function () {
  it('should xxx', function () {
    compareLine(
      new Scss(
        fs.readFileSync(path.join(__dirname, './scss/import.scss'), { encoding: 'utf8' }), 
        [path.join(__dirname, './scss')]
      ).getContext(),
      './test/scss/reset.scss'
    );
  });
});
