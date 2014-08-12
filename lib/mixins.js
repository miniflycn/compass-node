var tools = require('./tools');

function prettyBullets(captures, n, done) {
  var arg = captures[2].replace(/^"|"$/g, '')
    , self = this;
  tools.imageWidth.call(self, arg, function (width) {
    tools.imageHeight.call(self, arg, function (height) {
      self.context[n] = 
        self.context[n].replace(captures[0], [
          '',
          'margin-left: 0;',
          'li {',
          '    padding-left: 14px;',
          '    background: image-url("' + arg + '") no-repeat (14px - ' + width + ') / 2 (18px - ' + height + ') / 2;',
          '    list-style-type: none;',
          '}'
        ].join('\n'));
        done();
    });
  });
  return true;
}

return module.exports = {
  'pretty-bullets': prettyBullets
}