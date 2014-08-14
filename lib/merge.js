'use strict';

var merge = require('utils-merge');

module.exports = function (src, copy, props) {
  if (!props) return merge(src, copy);
  props.forEach(function (prop) {
    if (prop in copy) {
      src[prop] = copy[prop];
    }
  });
  return src;
};