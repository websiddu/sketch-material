var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/commands/adjust.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/path/index.js":
/*!******************************************!*\
  !*** ./node_modules/@skpm/path/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var sketchSpecifics = __webpack_require__(/*! ./sketch-specifics */ "./node_modules/@skpm/path/sketch-specifics.js")

// we only expose the posix implementation since Sketch only runs on macOS

var CHAR_FORWARD_SLASH = 47
var CHAR_DOT = 46

// Resolves . and .. elements in a path with directory names
function normalizeString(path, allowAboveRoot) {
  var res = ''
  var lastSegmentLength = 0
  var lastSlash = -1
  var dots = 0
  var code
  for (var i = 0; i <= path.length; i += 1) {
    if (i < path.length) code = path.charCodeAt(i)
    else if (code === CHAR_FORWARD_SLASH) break
    else code = CHAR_FORWARD_SLASH
    if (code === CHAR_FORWARD_SLASH) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (
          res.length < 2 ||
          lastSegmentLength !== 2 ||
          res.charCodeAt(res.length - 1) !== CHAR_DOT ||
          res.charCodeAt(res.length - 2) !== CHAR_DOT
        ) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/')
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = ''
                lastSegmentLength = 0
              } else {
                res = res.slice(0, lastSlashIndex)
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/')
              }
              lastSlash = i
              dots = 0
              continue
            }
          } else if (res.length === 2 || res.length === 1) {
            res = ''
            lastSegmentLength = 0
            lastSlash = i
            dots = 0
            continue
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += '/..'
          else res = '..'
          lastSegmentLength = 2
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i)
        else res = path.slice(lastSlash + 1, i)
        lastSegmentLength = i - lastSlash - 1
      }
      lastSlash = i
      dots = 0
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots
    } else {
      dots = -1
    }
  }
  return res
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root
  var base =
    pathObject.base || (pathObject.name || '') + (pathObject.ext || '')
  if (!dir) {
    return base
  }
  if (dir === pathObject.root) {
    return dir + base
  }
  return dir + sep + base
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = ''
    var resolvedAbsolute = false
    var cwd

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i -= 1) {
      var path
      if (i >= 0) {
        path = arguments[i]
      } else {
        if (cwd === undefined) {
          cwd = posix.dirname(sketchSpecifics.cwd())
        }
        path = cwd
      }

      path = sketchSpecifics.getString(path, 'path')

      // Skip empty entries
      if (path.length === 0) {
        continue
      }

      resolvedPath = path + '/' + resolvedPath
      resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute)

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath
      else return '/'
    } else if (resolvedPath.length > 0) {
      return resolvedPath
    } else {
      return '.'
    }
  },

  normalize: function normalize(path) {
    path = sketchSpecifics.getString(path, 'path')

    if (path.length === 0) return '.'

    var isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH
    var trailingSeparator =
      path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH

    // Normalize the path
    path = normalizeString(path, !isAbsolute)

    if (path.length === 0 && !isAbsolute) path = '.'
    if (path.length > 0 && trailingSeparator) path += '/'

    if (isAbsolute) return '/' + path
    return path
  },

  isAbsolute: function isAbsolute(path) {
    path = sketchSpecifics.getString(path, 'path')
    return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH
  },

  join: function join() {
    if (arguments.length === 0) return '.'
    var joined
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i]
      arg = sketchSpecifics.getString(arg, 'path')
      if (arg.length > 0) {
        if (joined === undefined) joined = arg
        else joined += '/' + arg
      }
    }
    if (joined === undefined) return '.'
    return posix.normalize(joined)
  },

  relative: function relative(from, to) {
    from = sketchSpecifics.getString(from, 'from path')
    to = sketchSpecifics.getString(to, 'to path')

    if (from === to) return ''

    from = posix.resolve(from)
    to = posix.resolve(to)

    if (from === to) return ''

    // Trim any leading backslashes
    var fromStart = 1
    for (; fromStart < from.length; fromStart += 1) {
      if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH) break
    }
    var fromEnd = from.length
    var fromLen = fromEnd - fromStart

    // Trim any leading backslashes
    var toStart = 1
    for (; toStart < to.length; toStart += 1) {
      if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH) break
    }
    var toEnd = to.length
    var toLen = toEnd - toStart

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen
    var lastCommonSep = -1
    var i = 0
    for (; i <= length; i += 1) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1)
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i)
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0
          }
        }
        break
      }
      var fromCode = from.charCodeAt(fromStart + i)
      var toCode = to.charCodeAt(toStart + i)
      if (fromCode !== toCode) break
      else if (fromCode === CHAR_FORWARD_SLASH) lastCommonSep = i
    }

    var out = ''
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; i += 1) {
      if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
        if (out.length === 0) out += '..'
        else out += '/..'
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep)
    else {
      toStart += lastCommonSep
      if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH) toStart += 1
      return to.slice(toStart)
    }
  },

  toNamespacedPath: function toNamespacedPath(path) {
    // Non-op on posix systems
    return path
  },

  dirname: function dirname(path) {
    path = sketchSpecifics.getString(path, 'path')
    if (path.length === 0) return '.'
    var code = path.charCodeAt(0)
    var hasRoot = code === CHAR_FORWARD_SLASH
    var end = -1
    var matchedSlash = true
    for (var i = path.length - 1; i >= 1; i -= 1) {
      code = path.charCodeAt(i)
      if (code === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          end = i
          break
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false
      }
    }

    if (end === -1) return hasRoot ? '/' : '.'
    if (hasRoot && end === 1) return '//'
    return path.slice(0, end)
  },

  basename: function basename(path, ext) {
    if (ext !== undefined)
      ext = sketchSpecifics.getString(ext, 'ext')
    path = sketchSpecifics.getString(path, 'path')

    var start = 0
    var end = -1
    var matchedSlash = true
    var i

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return ''
      var extIdx = ext.length - 1
      var firstNonSlashEnd = -1
      for (i = path.length - 1; i >= 0; i -= 1) {
        var code = path.charCodeAt(i)
        if (code === CHAR_FORWARD_SLASH) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1
            break
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false
            firstNonSlashEnd = i + 1
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1
              end = firstNonSlashEnd
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd
      else if (end === -1) end = path.length
      return path.slice(start, end)
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1
            break
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false
          end = i + 1
        }
      }

      if (end === -1) return ''
      return path.slice(start, end)
    }
  },

  extname: function extname(path) {
    path = sketchSpecifics.getString(path, 'path')
    var startDot = -1
    var startPart = 0
    var end = -1
    var matchedSlash = true
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i)
      if (code === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1
          break
        }
        continue
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false
        end = i + 1
      }
      if (code === CHAR_DOT) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i
        else if (preDotState !== 1) preDotState = 1
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1
      }
    }

    if (
      startDot === -1 ||
      end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    ) {
      return ''
    }
    return path.slice(startDot, end)
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new Error('pathObject should be an Object')
    }
    return _format('/', pathObject)
  },

  parse: function parse(path) {
    path = sketchSpecifics.getString(path, 'path')

    var ret = { root: '', dir: '', base: '', ext: '', name: '' }
    if (path.length === 0) return ret
    var code = path.charCodeAt(0)
    var isAbsolute = code === CHAR_FORWARD_SLASH
    var start
    if (isAbsolute) {
      ret.root = '/'
      start = 1
    } else {
      start = 0
    }
    var startDot = -1
    var startPart = 0
    var end = -1
    var matchedSlash = true
    var i = path.length - 1

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i)
      if (code === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1
          break
        }
        continue
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false
        end = i + 1
      }
      if (code === CHAR_DOT) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i
        else if (preDotState !== 1) preDotState = 1
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1
      }
    }

    if (
      startDot === -1 ||
      end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    ) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute)
          ret.base = ret.name = path.slice(1, end)
        else ret.base = ret.name = path.slice(startPart, end)
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot)
        ret.base = path.slice(1, end)
      } else {
        ret.name = path.slice(startPart, startDot)
        ret.base = path.slice(startPart, end)
      }
      ret.ext = path.slice(startDot, end)
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1)
    else if (isAbsolute) ret.dir = '/'

    return ret
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null,
}

posix.posix = posix

module.exports = posix


/***/ }),

/***/ "./node_modules/@skpm/path/sketch-specifics.js":
/*!*****************************************************!*\
  !*** ./node_modules/@skpm/path/sketch-specifics.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! util */ "util")

module.exports.getString = function getString(path, argumentName) {
  if (!util.isString(path)) {
    // let's make a special case for NSURL
    if (util.getNativeClass(path) === 'NSURL') {
      return String(path.path().copy())
    }
    throw new Error(argumentName + ' should be a string. Got ' + typeof path + ' instead.')
  }
  return String(path)
}

module.exports.cwd = function cwd() {
  if (typeof __command !== 'undefined' && __command.script() && __command.script().URL()) {
    return String(__command.script().URL().path().copy())
  }
  return String(MSPluginManager.defaultPluginURL().path().copy())
}


/***/ }),

/***/ "./src/commands/adjust.js":
/*!********************************!*\
  !*** ./src/commands/adjust.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index */ "./src/utils/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");



var adjustContainer = function adjustContainer(settings, symbol, symbolMaster, options) {
  var pL = Number(JSON.parse(settings.paddingLeft));
  var pR = Number(JSON.parse(settings.paddingRight));
  var pT = Number(JSON.parse(settings.paddingTop));
  var pB = Number(JSON.parse(settings.paddingBottom));
  var h = Number(JSON.parse(settings.height));
  var mW = Number(JSON.parse(settings.maxWidth));
  var existingOverrides = symbol.overrides() || NSDictionary.dictionary();
  var overrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides);
  var key = overrides.allKeys().objectAtIndex(0);
  var text = overrides.objectForKey(key);
  var children = symbolMaster.children();

  for (var i = 0; i < children.count(); i++) {
    var layer = children[i];

    if (layer.class() == MSTextLayer) {
      var style = layer.style();
      var textL = _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].addText();
      textL.setStringValue(text);
      textL.setStyle(style);
      var textLRect = _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(textL);
      var symbolRect = _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(symbol);

      if (options.flex == 'height') {
        textL.setTextBehaviour(1);
        textLRect.setWidth(_utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(symbol).width - pL - pR);
        textL.adjustFrameToFit();
        var symbolNewHeight = _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(textL).height + pT + pB;
        symbolRect.setHeight(symbolNewHeight);
      }

      if (options.flex == 'width') {
        var w = _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(textL).width;
        symbolRect.setWidth(w + pL + pR);
      }

      break;
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var selection = _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].selection();

  if (selection.count() <= 0) {
    _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a layer first");
    return;
  }

  var selecitonLoop = selection.objectEnumerator(),
      sel;

  while (sel = selecitonLoop.nextObject()) {
    var selMaster = sel.symbolMaster();

    if (_utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].hasComponentData(selMaster)) {
      var settingsJSON = selMaster.userInfo()[_common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].pluginId] || [];
      var componentType = JSON.parse(settingsJSON['component']);
      log('❤️️️️️️️❤️❤️❤️❤️❤️❤️❤️❤️❤️');
      log(componentType);

      switch (componentType) {
        case 'BUTTON':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'width'
          });
          break;

        case 'CHIP':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'width'
          });
          break;

        case 'FAB':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'width'
          });
          break;

        case 'SNACKBAR':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'height'
          });
          break;
      }
    }
  }

  _utils_index__WEBPACK_IMPORTED_MODULE_0__["default"].doc().reloadInspector();
});

/***/ }),

/***/ "./src/common/constants.js":
/*!*********************************!*\
  !*** ./src/common/constants.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  pluginId: "com.google.material2.active",
  // baseURL: 'https://google-com-sketch-material.firebaseapp.com/',
  baseURL: 'http://localhost:8082/',
  layerSettingsPanelId: 'com.gsid.sketch.material.layer.settings',
  stylesPanelId: 'com.gsid.sketch.material.styles.13121'
});

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/array */ "./src/utils/modules/array.js");
/* harmony import */ var _modules_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/class */ "./src/utils/modules/class.js");
/* harmony import */ var _modules_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/color */ "./src/utils/modules/color.js");
/* harmony import */ var _modules_doc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/doc */ "./src/utils/modules/doc.js");
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/dom */ "./src/utils/modules/dom.js");
/* harmony import */ var _modules_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/styles */ "./src/utils/modules/styles.js");
/* harmony import */ var _modules_symbol__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/symbol */ "./src/utils/modules/symbol.js");
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/ui */ "./src/utils/modules/ui.js");
/* harmony import */ var _modules_path__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/path */ "./src/utils/modules/path.js");
/* harmony import */ var _modules_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/settings */ "./src/utils/modules/settings.js");










var Utils = Object.assign({}, _modules_array__WEBPACK_IMPORTED_MODULE_0__["default"], _modules_class__WEBPACK_IMPORTED_MODULE_1__["default"], _modules_color__WEBPACK_IMPORTED_MODULE_2__["default"], _modules_doc__WEBPACK_IMPORTED_MODULE_3__["default"], _modules_dom__WEBPACK_IMPORTED_MODULE_4__["default"], _modules_styles__WEBPACK_IMPORTED_MODULE_5__["default"], _modules_symbol__WEBPACK_IMPORTED_MODULE_6__["default"], _modules_ui__WEBPACK_IMPORTED_MODULE_7__["default"], _modules_path__WEBPACK_IMPORTED_MODULE_8__["default"], _modules_settings__WEBPACK_IMPORTED_MODULE_9__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./src/utils/modules/array.js":
/*!************************************!*\
  !*** ./src/utils/modules/array.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ "./src/utils/modules/class.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  find: function find(format, container, returnArray) {
    if (!format || !format.key || !format.match) {
      return false;
    }

    var predicate = NSPredicate.predicateWithFormat(format.key, format.match),
        container = container || this.current,
        items;

    if (container.pages) {
      items = container.pages();
    } else if (_class__WEBPACK_IMPORTED_MODULE_0__["default"].is(container, MSSharedStyleContainer) || _class__WEBPACK_IMPORTED_MODULE_0__["default"].is(container, MSSharedTextStyleContainer)) {
      items = container.objectsSortedByName();
    } else if (container.children) {
      items = container.children();
    } else {
      items = container;
    }

    var queryResult = items.filteredArrayUsingPredicate(predicate);
    if (returnArray) return queryResult;

    if (queryResult.count() == 1) {
      return queryResult[0];
    } else if (queryResult.count() > 0) {
      return queryResult;
    } else {
      return false;
    }
  },
  forEach: function forEach(collection, iterator) {
    for (var i = 0; i < collection.count(); i++) {
      var item = collection.objectAtIndex(i);
      var returnValue = iterator(item, i, collection);

      if (returnValue === false) {
        break;
      }
    }
  },
  map: function map(collection, transform) {
    var result = [];
    this.forEach(collection, function (item, i, collection) {
      result.push(transform(item, i, collection));
    });
    return result;
  },
  mapObject: function mapObject(collection, transform) {
    var results = {};
    this.forEach(collection, function (item, i, collection) {
      var result = transform(item, i, collection);
      var key = result[0];
      var value = result[1];
      results[key] = value;
    });
    return results;
  },
  ["find"]: function find(collection, predicate) {
    var result;
    this.forEach(collection, function (item, i, collection) {
      if (predicate(item, i, collection)) {
        result = item;
        return false;
      }
    });
    return result;
  },
  filter: function filter(collection, predicate) {
    var result = [];
    this.forEach(collection, function (item, i, collection) {
      if (predicate(item, i, collection)) {
        result.push(item);
      }
    });
    return result;
  }
});

/***/ }),

/***/ "./src/utils/modules/class.js":
/*!************************************!*\
  !*** ./src/utils/modules/class.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  is: function is(layer, theClass) {
    if (!layer) return false;
    var klass = layer.class();
    return klass === theClass;
  },
  mutableSketchObject: function mutableSketchObject(immutableSketchObject) {
    if (immutableSketchObject && immutableSketchObject.class) {
      var immutableClass = immutableSketchObject.class();

      if (immutableClass.mutableClass) {
        var mutableClass = immutableClass.mutableClass();
        return mutableClass.new().initWithImmutableModelObject(immutableSketchObject);
      }
    }
  }
});

/***/ }),

/***/ "./src/utils/modules/color.js":
/*!************************************!*\
  !*** ./src/utils/modules/color.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  hexToNSColor: function hexToNSColor(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: this.toHex(result[1]) / 255,
      g: this.toHex(result[2]) / 255,
      b: this.toHex(result[3]) / 255,
      a: alpha || 1
    } : null;
  },
  toHex: function toHex(c) {
    var hex = parseInt(c, 16);
    return hex.length == 1 ? "0" + hex : hex;
  },
  hexToMSColor: function hexToMSColor(hex) {
    var r = parseInt(hex.substring(1, 3), 16) / 255,
        g = parseInt(hex.substring(3, 5), 16) / 255,
        b = parseInt(hex.substring(5, 7), 16) / 255,
        a = 1;
    return MSColor.colorWithRed_green_blue_alpha(r, g, b, a);
  },
  rgbaToMSColor: function rgbaToMSColor(rgba) {
    rgba = rgba.replace("rgba(", "").replace(")", "");
    rgba = rgba.split(",");
    var r = parseFloat(rgba[0]) / 255,
        g = parseFloat(rgba[1]) / 255,
        b = parseFloat(rgba[2]) / 255,
        a = parseFloat(rgba[3]);
    return MSColor.colorWithRed_green_blue_alpha(r, g, b, a);
  },
  cssColorToMSColor: function cssColorToMSColor(color) {
    if (color.type == "hex") {
      return this.hexToMSColor(color.value);
    }

    if (color.type == "rgba") {
      return this.rgbaToMSColor(color.value);
    }
  }
});

/***/ }),

/***/ "./src/utils/modules/doc.js":
/*!**********************************!*\
  !*** ./src/utils/modules/doc.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/utils/modules/array.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  doc: function doc() {
    var document = NSDocumentController.sharedDocumentController().currentDocument();
    return document;
  },
  current: function current() {
    var doc = this.doc(),
        page = doc.currentPage(),
        artboard = page.currentArtboard();
    return artboard || page;
  },
  selection: function selection() {
    return this.doc().selectedLayers().layers();
  },
  allLayers: function allLayers() {
    return this.current().children();
  },
  getDocumentSymbols: function getDocumentSymbols() {
    var symbols = this.doc().documentData().allSymbols();
    return _array__WEBPACK_IMPORTED_MODULE_0__["default"].mapObject(symbols, function (symbol) {
      return [symbol.symbolID(), symbol];
    });
  }
});

/***/ }),

/***/ "./src/utils/modules/dom.js":
/*!**********************************!*\
  !*** ./src/utils/modules/dom.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  getRect: function getRect(layer) {
    var rect = layer.frame();
    return {
      x: Math.round(rect.x()),
      y: Math.round(rect.y()),
      width: Math.round(rect.width()),
      height: Math.round(rect.height()),
      maxX: Math.round(rect.x() + rect.width()),
      maxY: Math.round(rect.y() + rect.height()),
      setX: function setX(x) {
        rect.setX(x);
        this.x = x;
        this.maxX = this.x + this.width;
      },
      setY: function setY(y) {
        rect.setY(y);
        this.y = y;
        this.maxY = this.y + this.height;
      },
      setWidth: function setWidth(width) {
        rect.setWidth(width);
        this.width = width;
        this.maxX = this.x + this.width;
      },
      setHeight: function setHeight(height) {
        rect.setHeight(height);
        this.height = height;
        this.maxY = this.y + this.height;
      },
      setConstrainProportions: function setConstrainProportions(val) {
        rect.setConstrainProportions(val);
      }
    };
  },
  addGroup: function addGroup() {
    return MSLayerGroup.new();
  },
  addShape: function addShape() {
    return MSShapeGroup.shapeWithRect(NSMakeRect(0, 0, 100, 100));
  },
  addText: function addText(container, string) {
    var text = MSTextLayer.new();
    text.setStringValue(string || "Text");
    return text;
  },
  removeLayer: function removeLayer(layer) {
    var container = layer.parentGroup();
    if (container) container.removeLayer(layer);
  }
});

/***/ }),

/***/ "./src/utils/modules/path.js":
/*!***********************************!*\
  !*** ./src/utils/modules/path.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skpm_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @skpm/path */ "./node_modules/@skpm/path/index.js");
/* harmony import */ var _skpm_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_skpm_path__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  getPluginCachePath: function getPluginCachePath() {
    var cachePath = String(NSFileManager.defaultManager().URLsForDirectory_inDomains_(NSCachesDirectory, NSUserDomainMask)[0].path());
    var pluginCacheKey = String(__command.pluginBundle().identifier()); // TODO: escape if needed
    // return path.join(cachePath, pluginCacheKey);

    return '/Users/gsid/work/projects/side/sketch-material/internal/gen/public/static/l/gm';
  },
  mkdirpSync: function mkdirpSync(path, mode) {
    mode = mode || 511;
    var err = MOPointer.alloc().init();
    var fileManager = NSFileManager.defaultManager();
    fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, true, {
      NSFilePosixPermissions: mode
    }, err);

    if (err.value() !== null) {
      throw new Error(err.value());
    }
  }
});

/***/ }),

/***/ "./src/utils/modules/settings.js":
/*!***************************************!*\
  !*** ./src/utils/modules/settings.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/constants */ "./src/common/constants.js");
var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");


/* harmony default export */ __webpack_exports__["default"] = ({
  hasComponentData: function hasComponentData(ele) {
    return Settings.layerSettingForKey(ele, 'component');
  },
  clearLayerMetaDataForKeys: function clearLayerMetaDataForKeys(ele, keys) {
    keys.forEach(function (key) {
      // Settings.setLayerSettingForKey(ele, key, undefined);
      __command.setValue_forKey_onLayer(nil, key, ele);
    });
  },
  clearLayerMetaData: function clearLayerMetaData(ele) {
    if (!ele.userInfo()) return;
    var settingsJSON = ele.userInfo()[_common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].pluginId] || [];
    var keys = Object.keys(settingsJSON);
    this.clearLayerMetaDataForKeys(ele, keys);
  },
  loadSettingsToWebview: function loadSettingsToWebview(selection, browserWindow) {
    var selecitonLoop = selection.objectEnumerator(),
        sel;

    while (sel = selecitonLoop.nextObject()) {
      var settingsJSON = sel.userInfo()[_common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].pluginId] || [];
      var meta = Object.keys(settingsJSON).map(function (k) {
        return {
          key: k,
          value: Settings.layerSettingForKey(sel, k)
        };
      });
      browserWindow.windowObject.evaluateWebScript("window.vm.$store.state.layerMetadata=".concat(JSON.stringify(meta), ";"));
    }
  }
});

/***/ }),

/***/ "./src/utils/modules/styles.js":
/*!*************************************!*\
  !*** ./src/utils/modules/styles.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ "./src/utils/modules/class.js");
/* harmony import */ var _doc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./doc */ "./src/utils/modules/doc.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/utils/modules/dom.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array */ "./src/utils/modules/array.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color */ "./src/utils/modules/color.js");





/* harmony default export */ __webpack_exports__["default"] = ({
  getSharedTextStyleByName: function getSharedTextStyleByName(name) {
    var sharedStyles = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().allTextStyles();
    var style = _array__WEBPACK_IMPORTED_MODULE_3__["default"].find({
      key: "(name != NULL) && (name == %@)",
      match: name
    }, sharedStyles);
    style = !style || _class__WEBPACK_IMPORTED_MODULE_0__["default"].is(style, MSSharedStyle) ? style : style[0];
    return style;
  },
  getSharedStyleById: function getSharedStyleById(id) {
    var documentData = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData();
    var style = documentData.layerStyleWithID(id) || documentData.textStyleWithID(id);
    return style;
  },
  getSharedLayerStyleByName: function getSharedLayerStyleByName(name) {
    var sharedStyles = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().allLayerStyles();
    var style = _array__WEBPACK_IMPORTED_MODULE_3__["default"].find({
      key: "(name != NULL) && (name == %@)",
      match: name
    }, sharedStyles);
    style = !style || _class__WEBPACK_IMPORTED_MODULE_0__["default"].is(style, MSSharedStyle) ? style : style[0];
    return style;
  },
  addSharedStyleObjectToDoc: function addSharedStyleObjectToDoc(style) {
    var container = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().layerStyles();

    if (style.style().hasTextStyle()) {
      container = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().layerTextStyles();
    }

    container.addSharedObject(style);
  },
  addSharedStylesToDocByName: function addSharedStylesToDocByName(name, style, type) {
    var container = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().layerTextStyles();

    if (type == "layer") {
      container = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().layerStyles();
    }

    var s = MSSharedStyle.alloc().initWithName_style(name, style);
    container.addSharedObject(s);
  },
  createAndGetSharedTextStyleFromJson: function createAndGetSharedTextStyleFromJson(name, json) {
    var style = this.getSharedTextStyleByName(name);

    if (style == 0 && json.color) {
      var color = MSColor.colorWithRed_green_blue_alpha(json.color.red, json.color.green, json.color.blue, json.color.alpha),
          fontFamily = json.font || "Roboto",
          lineHeight = json.lineHeight || 15,
          fontSize = json.size || 13,
          leading = json.leading || 0,
          alignment = json.alignment || 0,
          spacing = json.spacing || 0,
          paragraphSpacing = json.paragraphSpacing || 0,
          textTransform = json.textTransform || 0,
          strikethrough = json.strikethrough || 0,
          underline = json.underline || 0,
          text = this.addText(this.page);
      text.setFontPostscriptName(fontFamily);
      text.setLeading(leading);
      text.setLineHeight(lineHeight);
      text.setFontSize(fontSize);
      text.setTextAlignment(alignment);
      text.setTextColor(color);
      text.textAlignment = alignment;
      text.setCharacterSpacing(spacing);
      text.addAttribute_value("MSAttributedStringTextTransformAttribute", textTransform);
      var paragraphStyle = text.paragraphStyle();
      paragraphStyle.setParagraphSpacing(paragraphSpacing);
      text.addAttribute_value("NSParagraphStyle", paragraphStyle);
      text.addAttribute_value("NSStrikethrough", strikethrough);
      text.addAttribute_value("NSUnderline", underline);
      style = text.style();
      this.addSharedStylesToDocByName(name, style, "text");
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].removeLayer(text);
    }

    return this.getSharedTextStyleByName(name);
  },
  applyFillsToStyle: function applyFillsToStyle(style, fills) {
    for (var i = 0; i < fills.length; i++) {
      var fill = fills[i];
      var color = _color__WEBPACK_IMPORTED_MODULE_4__["default"].cssColorToMSColor(fill.color);
      var styleFill = style.addStylePartOfType(0);
      styleFill.setFillType(fill.type);
      styleFill.color = color;
      styleFill.isEnabled = true;
    }
  },
  applyShadowsToStyle: function applyShadowsToStyle(style, shadows) {
    for (var i = 0; i < shadows.length; i++) {
      var shadow = shadows[i];
      var color = _color__WEBPACK_IMPORTED_MODULE_4__["default"].cssColorToMSColor(shadow.color);
      var styleShadow = style.addStylePartOfType(2);
      styleShadow.offsetX = shadow.x;
      styleShadow.offsetY = shadow.y;
      styleShadow.color = color;
      styleShadow.blurRadius = shadow.blur;
      styleShadow.spread = shadow.spread;
      styleShadow.isEnabled = true;
    }
  },
  applyBordersToStyle: function applyBordersToStyle(style, borders) {
    for (var i = 0; i < borders.length; i++) {
      var border = borders[i];
      var color = _color__WEBPACK_IMPORTED_MODULE_4__["default"].cssColorToMSColor(border.color);
      var styleBorder = style.addStylePartOfType(1);
      styleBorder.color = color;
      styleBorder.thickness = border.thickness;
      styleBorder.position = border.position;
    }
  },
  createAndGetSharedLayerStyleFromJson: function createAndGetSharedLayerStyleFromJson(name, json) {
    var style = this.getSharedLayerStyleByName(name);

    if (style == 0) {
      style = MSStyle.alloc().init();
      if (json.fills) this.applyFillsToStyle(style, json.fills);
      if (json.shadows) this.applyShadowsToStyle(style, json.shadows);
      if (json.borders) this.applyBordersToStyle(style, json.borders);
      style.contextSettings().setOpacity(1);
      this.addSharedStylesToDocByName(name, style, "layer");
    }

    return this.getSharedLayerStyleByName(name);
  }
});

/***/ }),

/***/ "./src/utils/modules/symbol.js":
/*!*************************************!*\
  !*** ./src/utils/modules/symbol.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _doc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./doc */ "./src/utils/modules/doc.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/utils/modules/dom.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  findSymbolByName: function findSymbolByName(symbolName) {
    var targetSymbols = _doc__WEBPACK_IMPORTED_MODULE_0__["default"].doc().documentData().allSymbols();

    for (var j = 0; j < targetSymbols.count(); j++) {
      var targetSymbol = targetSymbols.objectAtIndex(j);

      if (targetSymbol.name().isEqualToString(symbolName)) {
        return targetSymbol;
      }
    }

    return false;
  },
  findSymbolById: function findSymbolById(symbolId) {
    return _doc__WEBPACK_IMPORTED_MODULE_0__["default"].doc().documentData().symbolWithID(symbolId);
  },
  addSymbolToDoc: function addSymbolToDoc(symbol) {
    var symbolDoc = _doc__WEBPACK_IMPORTED_MODULE_0__["default"].doc().documentData().symbolsPageOrCreateIfNecessary();
    symbolDoc.addLayer(symbol);
  },
  makeColorSymbol: function makeColorSymbol(color, colorHex, colorAlpha, name) {
    if (this.findSymbolByName(name)) {
      return;
    }

    _doc__WEBPACK_IMPORTED_MODULE_0__["default"].doc().documentData().symbolsPageOrCreateIfNecessary();
    var colorBg = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].addShape();
    var colorBgRect = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getRect(colorBg);
    colorBgRect.setHeight(10);
    colorBgRect.setWidth(10);

    if (colorBg.class() == "MSShapeGroup") {
      var fills = colorBg.style().enabledFills();

      if (fills.count() > 0 && fills.lastObject().fillType() == 0) {
        fills.lastObject().setColor(color);
      } else {
        var fill = colorBg.style().addStylePartOfType(0);
        fill.setFillType(0);
        fill.setColor(color);
      }
    }

    var layers = MSLayerArray.arrayWithLayers([colorBg]);
    _doc__WEBPACK_IMPORTED_MODULE_0__["default"].current().addLayers(layers);

    if (MSSymbolCreator.canCreateSymbolFromLayers(layers)) {
      var symbolName = name;
      var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layers, symbolName, true);
      var symbolInstanceRect = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getRect(symbolInstance);
      symbolInstanceRect.setConstrainProportions(true);
      symbolInstance.removeFromParent();
    }
  }
});

/***/ }),

/***/ "./src/utils/modules/ui.js":
/*!*********************************!*\
  !*** ./src/utils/modules/ui.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _doc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./doc */ "./src/utils/modules/doc.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  message: function message(_message) {
    _doc__WEBPACK_IMPORTED_MODULE_0__["default"].doc().showMessage(_message);
  }
});

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=adjust.js.map