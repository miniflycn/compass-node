var tokens = [
  ['function', /([\w\-]+)\((.+)\)/],
  ['variable', /\$([\w\-]+)/]
], TOOLS = require('./tools');

// TODO: must use another way to get Arguments
function _makeArgs(value, sep) {
  return value.split(sep);
}

function _getSparator(value) {
  var res = value.match(/ *, */);
  return res ? res[0] : ',';
}

function _isString(value) {
  return /^["'].+["']$/.test(value);
}

/**
 * find
 * @param {String} name function or mixin's name
 * @param {String} value arguments for function or mixin
 * @param {Function} done
 * @param {Object} tools
 * @param {String} prefix
 */

function find(name, value, done, tools, prefix) {
  tools = tools || TOOLS;
  var self = this
    , foo = tools[name]
    , separator = _getSparator(value)
    , args = _makeArgs(value, separator)
    , length = args.length
    , token, captures;

  function _makeArgFix(i) {
    return function (arg) {
      args[i] = arg;
      if (!(--length)) 
        return _argFinish();
    }
  }

  function _argFinish() {
    if (foo) {
      foo.length > 1 ?
        foo.call(self, args, done) :
          done(foo.call(self, args));
    } else {
      done(
        (prefix ? prefix : '') +
        name + '(' + args.join(separator) + ')'
      );
    }
  }

  // value just a string
  // nothing to do
  if (_isString(value)) {
    return _argFinish();
  } else {
    args.forEach(function (arg, j) {
      var _finish = _makeArgFix(j);
      for (var i = 0, l = tokens.length; i < l; i++) {
        token = tokens[i];
        // capture
        if (captures = token[1].exec(arg)) {
          // need find another time
          if (token[0] == 'function') {
            return find.call(self, captures[1], captures[2], _finish, foo ? undefined : self.functions);
          // just a variable
          } else {
            return _finish(TOOLS.variable.call(self, captures[1]));
          }
        }
      }
      // it may be a string
      return _finish(arg);
    });
  }
}

return module.exports = find;