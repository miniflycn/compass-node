var tools = require('./tools');

function prettyBullets(args, done) {
  var arg = args[0].replace(/^"|"$/g, '')
    , self = this;
  tools['image-width'].call(self, [arg], function (width) {
    tools['image-height'].call(self, [arg], function (height) {
      done([
        '',
        'margin-left: 0;',
        'li {',
        '    padding-left: 14px;',
        '    background: image-url("' + arg + '") no-repeat (14px - ' + width + ') / 2 (18px - ' + height + ') / 2;',
        '    list-style-type: none;',
        '}'
      ].join('\n'));
    });
  });
}

function replaceTextWithDimensions(args, done) {
  var self = this
    , img = args[0].replace(/^"|"$/g, '')
    , x = !!args[1] || '50%'
    , y = !!args[2] || '50%'
    , inline = !!args[3] || false;

  tools['image-width'].call(self, [img], function (width) {
    tools['image-height'].call(self, [img], function (height) {
      inline ?
        done([
          '',
          'text-indent: -119988px;',
          'overflow: hidden;',
          'text-align: left;',
          'background-image: ' + tools['inline-image'].call(self, [img]) + ';',
          'background-repeat: no-repeat;',
          'background-position: ' + x + ' ' + y + ';',
          'width: ' + width + ';',
          'height: ' + height + ';'
        ].join('\n')) :
          done([
            '',
            '@include replace-text(' + args[0] + ', ' + x + ', ' + y + ');',
            'width: ' + width + ';',
            'height: ' + height + ';'
          ].join('\n'));
    });
  });
}

module.exports = {
  'pretty-bullets': prettyBullets,
  'replace-text-with-dimensions': replaceTextWithDimensions
}