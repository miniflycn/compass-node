compass-node
============

Install
-------

> $ npm install compass-node

Usage
-----

```javascript
var compass = require('compass-node');

compass.render('./test.scss', {
  success: function (css) {
    // the result string
    console.log(css);
  }
});
```
