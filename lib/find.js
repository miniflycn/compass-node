var tokens = [
  ['function', /([\w\-]+)\((.+)\)/],
  ['variable', /\$([\w\-]+)/]
], TOOLS = require('./tools');

function _makeArgs(value) {
  return value.split(/ *, */);
}

function find(name, value, done, tools) {
  tools = tools || TOOLS;
  var self = this
    , foo = tools[name]
    , token, captures;
  function _finish(result) {
    result === false ?
      done(false) :
        foo.length > 1 ?
          foo.call(self, _makeArgs(result), done) :
            done(foo.call(self, _makeArgs(result)));
  }

  if (foo) {
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i];
      // capture
      if (captures = token[1].exec(value)) {
        // need find another time
        if (token[0] == 'function') {
          return find.call(self, captures[1], captures[2], _finish);
        // just a variable
        } else {
          return _finish(tools.variable(captures[1]));
        }
      }
    }
    // it may be a value
    return _finish(value);
  } else {
    done(false);
  }
}

return module.exports = find;