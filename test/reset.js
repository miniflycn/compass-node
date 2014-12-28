var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('reset', function () {
  it('should xxx', function (done) {
    compass.render('./test/scss/reset.scss', {
      success: function (css) {
        compareLine(css.css, './test/css/reset.css');
        done();
      },
      error: function (error) {
        console.log(error);
      }
    })
  });

});
