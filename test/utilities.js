var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('utilities', function () {
  describe('utilities', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/utilities.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/utilities.css');
          done();
        }
      });
    });
  });

  describe('legacy_clearfix', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/legacy_clearfix.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/legacy_clearfix.css');
          done();
        }
      });
    });
  });

  describe('print', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/print.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/print.css');
          done();
        }
      });
    });
  });
});
