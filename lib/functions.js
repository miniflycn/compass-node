'use strict';
var funReg = /([\w\-]+)\((.+)\)/
  , tools = require('./tools');

function _make(factory) {
  return function (captures, n, done, self) {
    var arg = captures[2]
      , nextCaptures = funReg.exec(arg)
      , fun;

    if (nextCaptures) {
      if (fun = tools[nextCaptures[1]]) {
        arg = fun(nextCaptures[2]);
      }
    }
    function replace(to) {
      self.context[n] = 
        self.context[n].replace(captures[0], to);
      done();
    }
    if (factory.length > 1) {
      factory.call(self, arg, replace);
      return true;
    } else {
      factory.call(self, arg);
      return false;
    }
  }
}

return module.exports = {
  'image_width': _make(tools.imageWidth),
  'image-width': _make(tools.imageWidth),
  'image_height': _make(tools.imageHeight),
  'image-height': _make(tools.imageHeight)
};