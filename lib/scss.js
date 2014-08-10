'use strict';

var fs = require('fs')
  , path = require('path')
  , merge = require('./merge');

var tokens = [
  ['comment', /^\/\/(.*)/],
  ['import', (/^@import +('|")([\w\-\/\\\.]+)\1\;/)],
  ['spirte', (/^@import +('|")([\w\-\/\\\.\*]+)\1\;/)],
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
  this.opts = opts;
  this.includePaths = opts.includePaths || [];
  this.imports = opts.imports || {};
  this.clearLines = [];
  this.deps = [];
  this.init(context);
}
Scss.prototype = {
  constructor: Scss,
  init: function (context) {
    this.context = context.trim().split(/\r?\n/);
    this.tokenize(this.context);
  },
  tokenize: function () {
    var captures, self = this;
    this.context.forEach(function (str, n) {
      str = str.trim();
      for (var i = 0, l = tokens.length; i < l; i++) {
        if (captures = tokens[i][1].exec(str)) {
          self[tokens[i][0]](captures, n);
          break;
        }
      }
    });
    self.clearLines.forEach(function (line) {
      self.context[line] = '';
    });
    this.context = this.deps.concat(this.context).join('\n');
  },
  import: function (captures, n) {
    var file = _getFile(this.includePaths, captures[2]);
    if (file) {
      if (!this.imports[file]) {
        var scss = new Scss(
          fs.readFileSync(file, { encoding: 'utf8' }), 
          merge({ imports: this.imports }, this.opts)
        );
        this.deps.push(scss.getContext());
        this.imports[file] = true;
      }
      // mark which line need clear
      this.clearLines.push(n);
    } else {
      // TODO: import compass
    }
  },
  spirte: function (captures, n) {
    // TODO: image spirte
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
  getContext: function () {
    return this.context;
  }
};

return module.exports = Scss;