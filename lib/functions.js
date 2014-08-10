'use strict';
var path = require('path')
  , sizeOf = require('image-size')
  , funReg = /([\w\-]+)\((.+)\)/
  , tools = {
  'unquote': function (arg) {
    return arg.replace(/^"|"$/g, '');
  }
};

function _make(factory) {
  return function (captures, n, done, self) {
    var arg = captures[2]
      , nextCaptures = funReg.exec(arg)
      , fun;
    if (nextCaptures) {
      if (fun = tools[nextCaptures[1]]) {
        captures[2] = fun(nextCaptures[2]);
      }
    }
    return factory(captures, n, done, self);
  };
}

return module.exports = {
  'image_width': _make(function (captures, n, done, self) {
    var image = path.join(self.imagePath, captures[2]);
    if (self.dimensions[image]) {
      self.context[n] = 
        self.context[n].replace(captures[0], dimensions.width + 'px');
      process.nextTick(function () {
        done();
      });
    } else {
      sizeOf(image, function (err, dimensions) {
        if (err) return console.error(err);
        self.dimensions[image] = dimensions;
        self.context[n] = 
          self.context[n].replace(captures[0], dimensions.width + 'px');
        done();
      });
    }
    return true;
  }),
  'image_height': _make(function (captures, n, done, self) {
    var image = path.join(self.imagePath, captures[2]), dimensions;
    if (dimensions = self.dimensions[image]) {
      self.context[n] = 
        self.context[n].replace(captures[0], dimensions.height + 'px');
      process.nextTick(function () {
        done();
      });
    } else {
      sizeOf(image, function (err, dimensions) {
        if (err) return console.error(err);
        self.dimensions[image] = dimensions;
        self.context[n] = 
          self.context[n].replace(captures[0], dimensions.height + 'px');
        done();
      });
    }
    return true;
  })
};