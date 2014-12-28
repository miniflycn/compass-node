var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine')
  , path = require('path');

describe('typography', function () {
  describe('vertical_rhythm', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/vertical_rhythm.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/vertical_rhythm.css');
          done();
        }
      });
    });
  });

  describe('force-wrap', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/force-wrap.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/force-wrap.css');
          done();
        }
      });
    });
  });

  describe('lists', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/lists.scss', {
        imagePath: path.join(__dirname, './images'),
        success: function (css) {
          compare(css.css, './test/css/lists.css');
          done();
        },
        error: function (error) {
          console.log(error)
        }
      });
    });
  });

  describe('replacement', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/replacement.scss', {
        imagePath: path.join(__dirname, './images'),
        success: function (css) {
          compareLine(css.css, './test/css/replacement.css');
          done();
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  });

});
