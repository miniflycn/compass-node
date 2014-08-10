'use strict';

var fs = require('fs')
  , path = require('path')
  , merge = require('./merge')
  , eachAsync = require('each-async')
  , sprite = require('./sprite');

var tokens = [
  ['comment', /^\/\/(.*)/],
  ['import', (/^@import +('|")([\w\-\/\\\.]+)\1\;/)],
  ['sprite', (/^@import +('|")([\w\-\/\\\.\*]+)\1\;/)],
  ['mixin', /^@include +([\w\-]+)\((.+)\)/],
  ['variable', /^$([\w\-]+) *: +([^\n]+)\;/]
];

function _getFile(includePaths, name) {
  var p, filePath;
  for (var i = 0, l = includePaths.length; i < l; i++) {
    p = includePaths[i];
    if (
      fs.existsSync(filePath = _getScss(p, name)) || 
        fs.existsSync(filePath = _getScss(p, '_' + name))
      ) {
      return filePath;
    }
  }
}

function _getScss(p, name) {
  if (name.indexOf('.scss') === name.length - 5) {
    return path.join(p, name);
  } else {
    return path.join(p, name + '.scss');
  }
}

function Scss(context, opts) {
  this.context = undefined;
  this.callback = undefined;
  this.opts = opts;
  this.includePaths = opts.includePaths || [];
  this.imagePath = opts.imagePath;
  this.spriteDist = opts.spriteDist;
  this.imports = opts.imports || {};
  this.clearLines = [];
  this.deps = [];
  var self = this;
  process.nextTick(function () {
    self.init(context);
  });
}
Scss.prototype = {
  constructor: Scss,
  init: function (context) {
    this.context = context.trim().split(/\r?\n/);
    this.tokenize(this.context);
  },
  tokenize: function () {
    var captures, self = this;
    eachAsync(
      this.context,
      function (str, n, done) {
        str = str.trim();
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
  import: function (captures, n, done) {
    var file = _getFile(this.includePaths, captures[2])
      , self = this;
    if (file) {
      if (!this.imports[file]) {
        new Scss(
          fs.readFileSync(file, { encoding: 'utf8' }), 
          merge({ imports: this.imports }, this.opts)
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
    } else {
      // TODO: import compass
    }
  },
  sprite: function (captures, n, done) {
    var self = this;
    sprite({
      imagePath: this.imagePath,
      images: captures[2],
      dist: this.spriteDist
    }, function (name, poses) {
      var mapName = '$' + name[0] + '-sprite-map'
        , prefix = ['@mixin ' + name[0] + '-sprite($name) {']
        , file, fileName, fileNames = [];
      for (file in poses) {
        fileName = path.basename(file, '.png');
        fileNames.push(fileNames);
        prefix.push([
          '    ' + mapName + '-' + fileName + ': (',
            'x: ' + poses[file].x + ', ',
            'y: ' + poses[file].y + ', ',
            'width: ' + poses[file].width + ', ',
            'height: ' + poses[file].height,
          ');'
        ].join(''));
      }

      prefix.push([
        '    $cur-coordinate: ' + mapName + '-' + '#{$name};',
        "    background: url('" + name.join('-') + '.png' + "') no-repeat;",
        '    background-position: -#{map-get($cur-coordinate, x)} -#{map-get($cur-coordinate, y)};',
        '    width: map-get($cur-coordinate, width)',
        '    width: map-get($cur-coordinate, height)'
      ].join('\n'));


      prefix.push('}');
      self.deps.push(prefix.join('\n'));
      done();
    });
    this.clearLines.push(n);
    return true;
  },
  comment: function () {
    // Nothing to do
  },
  mixin: function () {
    // Nothing to do
  },
  variable: function () {
    // Nothing to do
  },
  done: function (cb) {
    this.callback = cb;
  }
};

return module.exports = Scss;