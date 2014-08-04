var compass = require('../')
  , fs = require('fs');

function compare(css, file) {
  css = css.replace(/\r?\n$/, '');
  css.should.equal(fs.readFileSync(file, { encoding: 'utf8' }).replace(/\r?\n$/, '').replace(/\r/g, ''));
}

function compareLine(css, file) {
  css = css.replace(/\r?\n$/, '').split('\n');
  file = fs.readFileSync(file, { encoding: 'utf8' }).replace(/\r?\n$/, '').split(/\r?\n/);
  css.forEach(function (line, i) {
    line.should.equal(file[i]);
  });
}

describe('css3', function () {
  describe('background-clip', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/background-clip.scss', {
        success: function (css) {
          compareLine(css, './test/css/background-clip.css');
          done();
        },
        error: function (error) {
          console.log(error);
        }
      })
    });
  });

  describe('border-radius', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/border-radius.scss', {
        success: function (css) {
          compareLine(css, './test/css/border-radius.css');
          done();
        }
      });
    });
  });

  describe('box-shadow', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/box-shadow.scss', {
        success: function (css) {
          compareLine(css, './test/css/box-shadow.css');
          done();
        },
        error: function (error) {
          console.log(error)
        }
      });
    });
  });

  describe('box-sizeing', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/box-sizeing.scss', {
        success: function (css) {
          compareLine(css, './test/css/box-sizeing.css');
          done();
        }
      });
    });
  });

  describe('box', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/box.scss', {
        success: function (css) {
          compareLine(css, './test/css/box.css');
          done();
        }
      });
    });
  });

  describe('columns', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/columns.scss', {
        success: function (css) {
          compareLine(css, './test/css/columns.css');
          done();
        }
      });
    });
  });

  // grayscale didn't implement
  describe('filters', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/filters.scss', {
        success: function (css) {
          compareLine(css, './test/css/filters.css');
          done();
        }
      });
    });
  });

  describe('fonts', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/fonts.scss', {
        success: function (css) {
          compareLine(css, './test/css/fonts.css');
          done();
        }
      });
    });
  });

  describe('force-wrap', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/force-wrap.scss', {
        success: function (css) {
          compareLine(css, './test/css/force-wrap.css');
          done();
        }
      });
    });
  });

  // TODO gradients(CSS3)
  // describe('gradients', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/gradients.scss', {
  //       success: function (css) {
  //         compareLine(css, './test/css/gradients.css');
  //         done();
  //       },
  //       error: function (error) {
  //         console.log(error);
  //       }
  //     });
  //   });
  // });

  // TODO grid-background

  describe('hyphenation', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/hyphenation.scss', {
        success: function (css) {
          compareLine(css, './test/css/hyphenation.css');
          done();
        }
      });
    });
  });

  // TODO image_size

  // TODO images
  // describe('images', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/images.scss', {
  //       success: function (css) {
  //         compareLine(css, './test/css/images.css');
  //         done();
  //       }
  //     });
  //   });
  // });

  // TODO layout

  describe('legacy_clearfix', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/legacy_clearfix.scss', {
        success: function (css) {
          compareLine(css, './test/css/legacy_clearfix.css');
          done();
        }
      });
    });
  });

  // TODO lists

  describe('opacity', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/opacity.scss', {
        success: function (css) {
          compareLine(css, './test/css/opacity.css');
          done();
        }
      });
    });
  });

  // TODO pie(CSS3)

  // TODO print

  describe('regions', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/regions.scss', {
        success: function (css) {
          compareLine(css, './test/css/regions.css');
          done();
        }
      });
    });
  });

  // TODO replacement

  // TODO reset

  // TODO sprites

  // TODO stretching

  describe('text-shadow', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/text-shadow.scss', {
        success: function (css) {
          compareLine(css, './test/css/text-shadow.css');
          done();
        }
      });
    });
  });

  // TODO transform(CSS3)

  // TODO transition(CSS3)

  describe('transition', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/transition.scss', {
        success: function (css) {
          compareLine(css, './test/css/transition.css');
          done();
        }
      });
    });
  });

  describe('user-interface', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/user-interface.scss', {
        success: function (css) {
          compareLine(css, './test/css/user-interface.css');
          done();
        }
      });
    });
  });

  // TODO utilities

  // TODO vertical_rhythm

});
