var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('typography', function () {
  describe('vertical_rhythm', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/vertical_rhythm.scss', {
        success: function (css) {
          compareLine(css, './test/css/vertical_rhythm.css');
          done();
        }
      });
    });
  });

});
