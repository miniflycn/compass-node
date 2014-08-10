var Scss = require('../lib/scss')
  , fs = require('fs')
  , path = require('path')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('scss', function () {
  describe('import', function () {
    it('should xxx', function (done) {
      new Scss(
        fs.readFileSync(path.join(__dirname, './scss/import.scss'), { encoding: 'utf8' }), 
        {
          includePaths: [path.join(__dirname, './scss')]
        }
      ).done(function (context) {
        compareLine(context, './test/scss/reset.scss');
        done();
      });
    });
  });
});
