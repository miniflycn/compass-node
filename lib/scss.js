'use strict';

var fs = require('fs')
  , path = require('path')
  , merge = require('./merge')
  , eachAsync = require('each-series')
  , sprite = require('./sprite')
  , functions = require('./functions')
  , mixins = require('./mixins')
  , tools = require('./tools')
  , find = require('./find');

var tokens = [
  ['comment', /^\/\/(.*)/],
  ['import', (/^@import +('|")([\w\-\/\\\.]+)\1\;/)],
  ['sprite', (/^@import +('|")([\w\-\/\\\.\*]+)\1\;/)],
  ['mixin', /@include +([\w\-]+)\((.*)\)/],
  ['fun', /([\w\-]+)\((.*)\)/],
  ['variable', /^\$([\w\-]+) *: +([^\;]+)\;/]
];

/**
 * _getFile
 * @private
 */
function _getFile(includePaths, name) {
  var p, filePath, names = name.split('/');
  name = names.pop();
  for (var i = 0, l = includePaths.length; i < l; i++) {
    p = path.join(includePaths[i], names.join('/'));
    if (
      fs.existsSync(filePath = _getScss(p, name)) || 
        fs.existsSync(filePath = _getScss(p, '_' + name))
      ) {
      return filePath;
    }
  }
}

/**
 * _getScss
 * @private
 */
function _getScss(p, name) {
  if (name.indexOf('.scss') === name.length - 5) {
    return path.join(p, name);
  } else {
    return path.join(p, name + '.scss');
  }
}

function _getMatchLength(res) {
  return res ? res.length : 0;
}

/**
 * Scss
 * @param {String} context
 * @param {Object} opts
 * @param {Object} [pOpts]
 */
function Scss(context, opts, pOpts) {
  pOpts = pOpts || {};
  this.context = undefined;
  this.callback = undefined;
  this.opts = opts;
  this.includePaths = opts.includePaths || [];
  this.imagePath = opts.imagePath;
  this.spriteDist = opts.spriteDist;
  this.imports = pOpts.imports || {};
  // merge the custom functions
  this.variables = pOpts.variables || {};
  merge(tools, opts.functions);
  this.functions = merge(opts.functions || {}, functions);
  this.clearLines = [];
  this.deps = [];
  this.dimensions = {};
  this.isBlock = 0;
  var self = this;
  setImmediate(function () {
    self.init(context);
  });
}
Scss.prototype = {
  constructor: Scss,
  /**
   * init
   * @param {String} context
   */
  init: function (context) {
    this.context = context.trim().split(/\r?\n/);
    this.tokenize(this.context);
  },
  /**
   * checkBlock
   * @param {String}
   */
  checkBlock: function (line) {
    var openNum = _getMatchLength(line.match(/{/g))
      , closeNum = _getMatchLength(line.match(/}/g));
    this.isBlock = this.isBlock + openNum - closeNum;
  },
  /**
   * tokenize
   */
  tokenize: function () {
    var captures, self = this;
    eachAsync(
      this.context,
      function (str, n, done) {
        str = str.trim();
        self.checkBlock(str);
        for (var i = 0, l = tokens.length; i < l; i++) {
          if (captures = tokens[i][1].exec(str)) {
            // need async
            if (self[tokens[i][0]](captures, n, done)) {
              return;
            }
            break;
          }
        }
        done();
      },
      function () {
        self.clearLines.forEach(function (line) {
          self.context[line] = '';
        });
        self.context = self.deps.concat(self.context).join('\n');
        self.callback && self.callback(self.context);
      }
    )
  },
  /**
   * import
   * @param {Array} captures
   * @param {String} n the line which match import
   * @param {Function} done
   */
  import: function (captures, n, done) {
    var file = _getFile(this.includePaths, captures[2])
      , self = this;
    if (file) {
      // global import
      if (!this.isBlock) {
        if (!this.imports[file]) {
          var opts = merge({}, this.opts)
            , includePaths = opts.includePaths.slice(0);
          includePaths[0] = path.dirname(file);
          merge(opts, { includePaths: includePaths });
          new Scss(
            fs.readFileSync(file, { encoding: 'utf8' }),
            opts,
            { imports: this.imports, variables: this.variables }
          ).done(function (context) {
            self.deps.push(context);
            done();
          });
          this.imports[file] = true;
          // mark which line need clear
          this.clearLines.push(n);
          return true;
        } else {
          // mark which line need clear
          this.clearLines.push(n);
        }
      // nested import
      } else {
        // TODO need to implement local variable
        var opts = merge({}, this.opts)
          , includePaths = opts.includePaths.slice(0);
        includePaths[0] = path.dirname(file);
        merge(opts, { includePaths: includePaths });
        new Scss(
          fs.readFileSync(file, { encoding: 'utf8' }),
          opts,
          { imports: this.imports, variables: this.variables }
        ).done(function (context) {
          self.context[n] = context;
          done();
        });
        return true;
      }
    } else {
      // fix position
      self.deps.push(captures.input);
      this.clearLines.push(n);
    }
  },
  /**
   * sprite
   * @param {Array} captures
   * @param {String} n the line which match sprite
   * @param {Function} done
   */
  sprite: function (captures, n, done) {
    var self = this;
    sprite({
      imagePath: this.imagePath,
      images: captures[2],
      dist: this.spriteDist
    }, function (name, poses) {
      var nameIndex = name.length - 2
        , dim = '$' + name[nameIndex] + '-sprite-dimensions'
        , prefix = [
          '@mixin ' + name[nameIndex] + '-sprite($name) {',
          dim + ' : false !default;'
      ] , file, fileName, fileNames = [];
      for (file in poses) {
        fileName = path.basename(file, '.png');
        fileNames.push(fileName);
        prefix.push([
          '    @if $name == ' + fileName + '{ ',
          "        background: url('" + name.join('-') + '.png' + "') no-repeat " + (poses[file].x ? '-' + poses[file].x + 'px' : poses[file].x) + " " + (poses[file].y ? '-' + poses[file].y + 'px' : poses[file].y) + ";",
          '        @if ' + dim + ' == true {',
          '            width: ' + poses[file].width + 'px;',
          '            height: ' + poses[file].height + 'px;',
          '        }',
          '    }'
        ].join('\n'));
      }
      prefix.push('}');
      prefix.push('@mixin all-' + name[nameIndex] + '-sprites {');
      fileNames.forEach(function (fileName) {
        prefix.push([
          '    .' + name[nameIndex] + '-' + fileName + ' {',
          '        @include ' + name[nameIndex] + '-sprite(' + fileName + ');',
          '    }'
        ].join('\n'));
      });
      prefix.push('}');
      self.deps.push(prefix.join('\n'));
      done();
    });
    this.clearLines.push(n);
    return true;
  },
  /**
   * comment
   * it must be ignored
   */
  comment: function () {
    // Nothing to do
  },
  /**
   * mixin
   * @param {Array} captures
   * @param {String} n the line which match mixin
   * @param {Function} done
   */
  mixin: function (captures, n, done) {
    var self = this;
    find.call(this, captures[1], captures[2], function (value) {
      if (value !== false) {
        self.context[n] = 
          self.context[n].replace(captures[0], value);
        done();
      } else {
        done();
      }
    }, mixins, '@include ');
    return true;
  },
  /**
   * fun
   * @param {Array} captures
   * @param {String} n the line which match function
   * @param {Function} done
   */
  fun: function (captures, n, done) {
    var self = this;
    find.call(this, captures[1], captures[2], function (value) {
      if (value !== false) {
        self.context[n] = 
          self.context[n].replace(captures[0], value);
        done();
      } else {
        done();
      }
    }, this.functions);
    return true;
  },
  /**
   * variable
   * @param {Array} captures
   * @param {String} n the line which match variable
   * @param {Function} done
   */
  variable: function (captures, n, done) {
    // set variable
    this.variables[captures[1]] = captures[2];
  },
  /**
   * done
   * @param {Function} cb
   */
  done: function (cb) {
    this.callback = cb;
  }
};

module.exports = Scss;