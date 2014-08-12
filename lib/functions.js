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
    function replace(to) {
      self.context[n] = 
        self.context[n].replace(captures[0], to);
      done();
    }
    return factory.call(self, captures, replace);
  };
}

var image_width = _make(function (captures, done) {
  var image = path.join(this.imagePath, captures[2])
    , dimensions = this.dimensions[image]
    , self = this;
  if (dimensions) {
    process.nextTick(function () {
      done(dimensions.width + 'px');
    });
  } else {
    sizeOf(image, function (err, dimensions) {
      if (err) return console.error(err);
      self.dimensions[image] = dimensions;
      done(dimensions.width + 'px');
    });
  }
  return true;
}), image_height = _make(function (captures, done) {
  var image = path.join(this.imagePath, captures[2])
    , dimensions = this.dimensions[image]
    , self = this;
  if (dimensions) {
    process.nextTick(function () {
      done(dimensions.height + 'px');
    });
  } else {
    sizeOf(image, function (err, dimensions) {
      if (err) return console.error(err);
      self.dimensions[image] = dimensions;
      done(dimensions.height + 'px');
    });
  }
  return true;
});

return module.exports = {
  'image_width': image_width,
  'image-width': image_width,
  'image_height': image_height,
  'image-height': image_height
};