var Scss = require('../lib/scss')
  , fs = require('fs')
  , path = require('path')
  , compare = require('./lib/compare')
  , compareLine = require('./lib/compareLine');

describe('scss', function () {
  describe('import', function () {
    it('should xxx', function (done) {
      new Scss(
        fs.readFileSync(path.join(__dirname, './engine/import.scss'), { encoding: 'utf8' }), 
        {
          includePaths: [path.join(__dirname, './engine')]
        }
      ).done(function (context) {
        compareLine(context, './test/engine/import-should.scss');
        done();
      });
    });
  });

  describe('nested import', function () {
    it('should xxx', function (done) {
      new Scss(
        fs.readFileSync(path.join(__dirname, './engine/nested-import.scss'), { encoding: 'utf8' }), 
        {
          includePaths: [path.join(__dirname, './engine')]
        }
      ).done(function (context) {
        compareLine(context, './test/engine/nested-import-should.scss');
        done();
      });
    });
  });

  describe('variables', function () {
    it('should xxx', function (done) {
      new Scss(
        fs.readFileSync(path.join(__dirname, './engine/interpolated-variables.scss'), { encoding: 'utf8' }),
        {
          includePaths: [path.join(__dirname, './engine')],
          functions: {
            'test': function (args) {
              return '"hello"';
            },
            'display-block': function (args) {
              var arg = args[0];
              return arg + '-block';
            }
          }
        }
      ).done(function (context) {
        compareLine(context, './test/engine/interpolated-variables-should.scss');
        done();
      })
    });
  })

  describe('custom function', function () {
    it('should xxx', function (done) {
      new Scss(
        fs.readFileSync(path.join(__dirname, './engine/custom-function.scss'), { encoding: 'utf8' }),
        {
          includePaths: [path.join(__dirname, './engine')],
          functions: {
            'test': function (args) {
              return '"hello"';
            },
            'display-block': function (args) {
              var arg = args[0];
              return arg + '-block';
            }
          }
        }
      ).done(function (context) {
        compareLine(context, './test/engine/custom-function-should.scss');
        done();
      })
    });
  });

  describe('mixin', function () {
    var mixins = require('../lib/mixins');
    // my custom mixin
    mixins['font-mixin'] = function (args, done) {
      var weight = args[0]
        , size = args[1]
        , lineHeight = args[2]
        , family = args[3];
      done('font: ' + weight + ' ' + size + '/' + lineHeight + ' ' + family);
    }

    it('should xxx', function (done) {
      new Scss(
        fs.readFileSync(path.join(__dirname, './engine/mixin.scss'), { encoding: 'utf8' }),
        {
          includePaths: [path.join(__dirname, './engine')]
        }
      ).done(function (context) {
        compareLine(context, './test/engine/mixin-should.scss');
        done();
      })
    });
  })
});
