'use strict';
var fs = require('fs')
  , path = require('path');

function _getFile(p, name) {
  if (name.indexOf('.scss') === name.length - 5) {
    return path.join(p, name);
  } else {
    return path.join(p, name + '.scss');
  }
}

function Scss(context, includePaths) {
  this.context = undefined;
  this.includePaths = includePaths;
  this.imported = {};
  this.isImport = true;
  this.init(context);
}
Scss.prototype = {
  constructor: Scss,
  init: function (context) {
    var self = this, includePath, filePath;
    // AST ?
    context = context.replace(/@import\s+?('|")(.+?)\1\;/g, function (all, quo, module) {
      for (var i = 0, l = self.includePaths.length; i < l; i++) {
        includePath = self.includePaths[i];
        if (
          fs.existsSync(filePath = _getFile(includePath, module)) || 
            fs.existsSync(filePath = _getFile(includePath, '_' + module))
          ) {
          if (self.imported[module]) {
            return '';
          } else {
            self.imported[module] = true;
            return fs.readFileSync(filePath);
          }
        }
      }
      self.isImport = false;
    });
    self.isImport ? (this.context = context) :
      self.init(context);
  },
  getContext: function () {
    return this.context;
  }
}

module.exports = Scss;