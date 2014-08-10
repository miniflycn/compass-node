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

  // describe('sprite', function () {
  //   it('should xxx', function (done) {
  //     new Scss(
  //       fs.readFileSync(path.join(__dirname, './sprite/sprites.scss'), { encoding: 'utf8' }), 
  //       {
  //         includePaths: [path.join(__dirname, './sprite')],
  //         imagePath: path.join(__dirname, './images'),
  //         spriteDist: __dirname
  //       }
  //     ).done(function (context) {
  //       console.log(context);
  //       done();
  //     });
  //   });
  // });
});
