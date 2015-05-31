var compass = require('../')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('css3', function () {
  describe('background-clip', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/background-clip.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/background-clip.css');
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
          compareLine(css.css, './test/css/border-radius.css');
          done();
        }
      });
    });
  });

  // #issue compact is not exist?
  // describe('box-shadow', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/box-shadow.scss', {
  //       success: function (css) {
  //         compareLine(css.css, './test/css/box-shadow.css');
  //         done();
  //       },
  //       error: function (error) {
  //         console.log(error)
  //       }
  //     });
  //   });
  // });

  describe('box-sizeing', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/box-sizeing.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/box-sizeing.css');
          done();
        }
      });
    });
  });

  describe('box', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/box.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/box.css');
          done();
        }
      });
    });
  });

  // #issue compact is not exist, too
  // describe('columns', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/columns.scss', {
  //       success: function (css) {
  //         compareLine(css.css, './test/css/columns.css');
  //         done();
  //       }
  //     });
  //   });
  // });

  // // grayscale didn't implement
  // describe('filters', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/filters.scss', {
  //       success: function (css) {
  //         compareLine(css.css, './test/css/filters.css');
  //         done();
  //       }
  //     });
  //   });
  // });

  describe('fonts', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/fonts.scss', {
        css: '/tmp/',
        font: '/tmp/fonts/',
        success: function (css) {
          compareLine(css.css, './test/css/fonts.css');
          done();
        }
      });
    });
  });

  // // TODO gradients(CSS3)
  // // describe('gradients', function () {
  // //   it('should xxx', function (done) {
  // //     compass.render('./test/scss/gradients.scss', {
  // //       success: function (css) {
  // //         compare(css, './test/css/gradients.css');
  // //         done();
  // //       },
  // //       error: function (error) {
  // //         console.log(error);
  // //       }
  // //     });
  // //   });
  // // });

  // // TODO grid-background

  describe('hyphenation', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/hyphenation.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/hyphenation.css');
          done();
        }
      });
    });
  });

  describe('images', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/images.scss', {
        httpImagesPath: '/images/',
        success: function (css) {
          compareLine(css.css, './test/css/images.css');
          done();
        }
      });
    });
  });

  describe('opacity', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/opacity.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/opacity.css');
          done();
        }
      });
    });
  });

  // // TODO pie(CSS3)

  describe('regions', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/regions.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/regions.css');
          done();
        }
      });
    });
  });

  // #issue compact
  // describe('text-shadow', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/text-shadow.scss', {
  //       success: function (css) {
  //         compareLine(css.css, './test/css/text-shadow.css');
  //         done();
  //       }
  //     });
  //   });
  // });

  describe('transform', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/transform.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/transform.css');
          done();
        }
      });
    });
  });

  // #issue compact
  // describe('transition', function () {
  //   it('should xxx', function (done) {
  //     compass.render('./test/scss/transition.scss', {
  //       success: function (css) {
  //         compareLine(css.css, './test/css/transition.css');
  //         done();
  //       }
  //     });
  //   });
  // });

  describe('user-interface', function () {
    it('should xxx', function (done) {
      compass.render('./test/scss/user-interface.scss', {
        success: function (css) {
          compareLine(css.css, './test/css/user-interface.css');
          done();
        }
      });
    });
  });

});
