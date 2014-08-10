var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine')
  , path = require('path');

describe('sprite', function () {
  it('should xxx', function (done) {
    compass.render('./test/sprite/sprites.scss', {
      imagePath: path.join(__dirname, './images'),
      spriteDist: __dirname,
      success: function (css) {
        compareLine(css, './test/sprite/sprites.css');
        done();
      },
      error: function (error) {
        console.log(error);
      }
    })
  });

});
