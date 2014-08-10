var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine')
  , path = require('path');

describe('image_size', function () {
  it('should xxx', function (done) {
    compass.render('./test/scss/image_size.scss', {
      imagePath: path.join(__dirname, './images'),
      success: function (css) {
        compareLine(css, './test/css/image_size.css');
        done();
      },
      error: function (error) {
        console.log(error);
      }
    })
  });

});
