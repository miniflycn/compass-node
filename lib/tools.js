var path = require('path')
  , sizeOf = require('image-size')
  , Datauri = require('datauri');

/**
 * imageWidth
 * @param {String} args[0] image path
 * @param {Function} done
 */
function imageWidth(args, done) {
  var arg = args[0]
    , image = path.join(this.imagePath, arg)
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

/**
 * imageHeight
 * @param {String} args[0] image path
 * @param {Function} done
 */
function imageHeight(args, done) {
  var arg = args[0]
    , image = path.join(this.imagePath, arg)
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

/**
 * inlineImage
 * @param {String} args[0] image path
 */
function inlineImage(args) {
  var arg = unquote(args)
    , image = path.join(this.imagePath, arg)
    , self = this;

  return "url('" + new Datauri(image).content + "')";
}

/**
 * unquote
 * @param {String} args[0] anything string need unquote
 */
function unquote(args) {
  var arg = args[0];
  return arg.replace(/^"|"$/g, '');
}

/**
 * variable
 * @param {String} key
 */
function variable(key) {
  var value = this.variables[key];
  return value ? value : '$' + key;
}

module.exports = {
  'image-width': imageWidth,
  'image-height': imageHeight,
  'image_width': imageWidth,
  'image_height': imageHeight,
  'inline-image': inlineImage,
  'unquote': unquote,
  'variable': variable
}