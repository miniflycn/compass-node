var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('layout', function () {
  describe('layout', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/layout.scss', {
        success: function (css) {
          compareLine(css, './test/css/layout.css');
          done();
        }
      });
    });
  });

  describe('stretching', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/stretching.scss', {
        success: function (css) {
          compareLine(css, './test/css/stretching.css');
          done();
        }
      });
    });
  });
});
