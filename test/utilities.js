var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('utilities', function () {
  it('should xxx', function (done) {
    compass.render('./test/scss/utilities.scss', {
      success: function (css) {
        compareLine(css, './test/css/utilities.css');
        done();
      }
    });
  });

});
