var path = require('path')
  , sizeOf = require('image-size');

function imageWidth(arg, done) {
  var image = path.join(this.imagePath, arg)
    , dimensions = this.dimensions[image]
    , self = this;
  if (dimensions) {
    done(dimensions.width + 'px');
  } else {
    sizeOf(image, function (err, dimensions) {
      if (err) return console.error(err);
      self.dimensions[image] = dimensions;
      done(dimensions.width + 'px');
    });
  }
}

function imageHeight(arg, done) {
  var image = path.join(this.imagePath, arg)
    , dimensions = this.dimensions[image]
    , self = this;
  if (dimensions) {
    done(dimensions.height + 'px');
  } else {
    sizeOf(image, function (err, dimensions) {
      if (err) return console.error(err);
      self.dimensions[image] = dimensions;
      done(dimensions.height + 'px');
    });
  }
}

function unquote(arg) {
  return arg.replace(/^"|"$/g, '');
}

return module.exports = {
  imageWidth: imageWidth,
  imageHeight: imageHeight,
  unquote: unquote
}