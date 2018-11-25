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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/panels/settings.js");
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

/***/ "./src/components/color.js":
/*!*********************************!*\
  !*** ./src/components/color.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _setBorderColor = function _setBorderColor(layer, color) {
    var layerClass = layer.class();

    if (layerClass == "MSRectangleShape" || layerClass == "MSOvalShape" || layerClass == "MSTriangleShape" || layerClass == "MSStarShape" || layerClass == "MSPolygonShape") {
      var borders = layer.style().enabledBorders();

      if (borders.count() > 0 && borders.lastObject().fillType() == 0) {
        borders.lastObject().setColor(color);
      } else {
        var border = layer.style().addStylePartOfType(1);
        border.setFillType(0);
        border.setColor(color);
        border.setPosition(2);
        border.setThickness(1);
      }
    }
  };

  var _fillIcon = function _fillIcon(symbolInstance, color, rawColor) {
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeColorSymbol(color, rawColor.color, 1, "c/" + rawColor.name);
    var selectedSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName("c/" + rawColor.name);
    symbolInstance.overridePoints().forEach(function (overridePoint) {
      if (overridePoint.layerName() + "" == "🎨 Color") {
        symbolInstance.setValue_forOverridePoint_(selectedSymbol.symbolID(), overridePoint);
      }
    });
    symbolInstance.isSelected = true;
    symbolInstance.select_byExtendingSelection_showSelection(true, true, true);
  };

  var _setFillColor = function _setFillColor(layer, color, rawColor) {
    var layerClass = layer.class();

    if (layerClass == "MSSymbolInstance") {
      _fillIcon(layer, color, rawColor);
    }

    if (layerClass == "MSRectangleShape" || layerClass == "MSOvalShape" || layerClass == "MSTriangleShape" || layerClass == "MSStarShape" || layerClass == "MSPolygonShape") {
      var fills = layer.style().enabledFills();

      if (fills.count() > 0 && fills.lastObject().fillType() == 0) {
        fills.lastObject().setColor(color);
      } else {
        var fill = layer.style().addStylePartOfType(0);
        fill.setFillType(0);
        fill.setColor(color);
      }
    }

    if (layer.class() == "MSTextLayer") {
      layer.setTextColor(color);
    }
  };

  var _applyColor = function _applyColor(rawColor) {
    var doc = NSDocumentController.sharedDocumentController().currentDocument();
    var selection = doc.selectedLayers().layers();

    if (selection.count() <= 0) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a layer to apply color");
    } else {
      var selecitonLoop = selection.objectEnumerator();
      var sel;

      while (sel = selecitonLoop.nextObject()) {
        var nsColor;

        if (rawColor.color.startsWith("#") > 0) {
          nsColor = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToMSColor(rawColor.color);
        }

        if (rawColor.color.startsWith("rgba") > 0) {
          nsColor = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToMSColor(rawColor.color);
        }

        if (!nsColor) {
          _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Can't find the color!");
          return;
        }

        if (rawColor.type == "border") {
          _setBorderColor(sel, nsColor);
        } else {
          _setFillColor(sel, nsColor, rawColor);
        }
      }
    }
  };

  var _addGlobalColors = function _addGlobalColors(colors) {
    var MSColors = [];

    for (var i = 0; i < colors.length; i++) {
      if (typeof colors[i] == "string") {
        MSColors.push(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToMSColor(colors[i]));
      } else {
        MSColors.push(MSColor.colorWithRed_green_blue_alpha(colors[i].red, colors[i].green, colors[i].blue, colors[i].alpha));
      }
    }

    var app = NSApp.delegate();
    var assets = app.globalAssets();
    assets.setColors(MSColors);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().inspectorController().closeAnyColorPopover();
    app.refreshCurrentDocument();
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().reloadInspector();
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("✅ Colors added successfuly, Open color picker to see changes.");
  };

  var _addGlobalSymbols = function _addGlobalSymbols(colorGroups) {
    for (var group in colorGroups) {
      for (var clr in colorGroups[group]) {
        var color = colorGroups[group][clr];
        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeColorSymbol(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToMSColor(color.color), color.color, 1, "c/" + color.name);
      }
    }

    var app = NSApp.delegate();
    app.refreshCurrentDocument();
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().reloadInspector();
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("✅ Color symbols added to your symbols page");
  };

  var _pickColor = function _pickColor(webView, clr) {
    var btn = BCMagnifierButton.alloc().initWithFrame(NSZeroRect);
    coscript.pushAsCurrentCOScript();
    btn.setCOSJSTargetFunction(function (sender) {
      var pickColor = sender.color();
      var color = MSColor.colorWithRed_green_blue_alpha(pickColor.red(), pickColor.green(), pickColor.blue(), 1);
      var hexValue = "#" + color.immutableModelObject().hexValue();
      webView.windowScriptObject().evaluateWebScript("window.vm.$store.state." + clr + '= "' + hexValue + '";');
    });
    btn.performClick(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].context);
  };

  return {
    applyColor: _applyColor,
    addGlobalColors: _addGlobalColors,
    addGlobalSymbols: _addGlobalSymbols,
    pickColor: _pickColor
  };
});

/***/ }),

/***/ "./src/components/components.js":
/*!**************************************!*\
  !*** ./src/components/components.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_global_archive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/global/archive */ "./src/utils/global/archive.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _convertImgToLayer = function _convertImgToLayer(layerData) {
    var url = _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].baseURL + layerData.data;
    var componentNSUrl = NSURL.URLWithString(url);
    var componentData = NSData.dataWithContentsOfURL(componentNSUrl);
    var component = _utils_global_archive__WEBPACK_IMPORTED_MODULE_2__["default"].sketchObjectFromArchiveData(componentData);
    var selectedLayers = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].doc().selectedLayers();
    var droppedElement = selectedLayers.firstLayer();
    var droppedEleRect = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getRect(droppedElement);
    _utils__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(component.layers, function (e) {
      var layer = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].mutableSketchObject(e);
      layer.setObjectID(MSModelObjectCommon.generateObjectID());
      var newLayerRect = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getRect(layer);
      newLayerRect.setX(droppedEleRect.x);
      newLayerRect.setY(droppedEleRect.y);
      _utils__WEBPACK_IMPORTED_MODULE_1__["default"].current().addLayers([layer]);
      _utils__WEBPACK_IMPORTED_MODULE_1__["default"].current().removeLayer(droppedElement);
    });
    var symbolKeys = Object.keys(component.symbols);

    for (var i = 0; i < symbolKeys.length; i++) {
      var symbol = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].mutableSketchObject(component.symbols[symbolKeys[i]]);
      symbol.setObjectID(symbolKeys[i]);
      var existingSymbol = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].findSymbolById(symbol.objectID());

      if (!existingSymbol) {
        _utils__WEBPACK_IMPORTED_MODULE_1__["default"].addSymbolToDoc(symbol);
      }
    }

    var styleKeys = Object.keys(component.sharedStyles);

    for (var i = 0; i < styleKeys.length; i++) {
      var style = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].mutableSketchObject(component.sharedStyles[styleKeys[i]]);
      style.setObjectID(styleKeys[i]);
      var existingSharedStyle = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getSharedStyleById(style.objectID());

      if (!existingSharedStyle) {
        _utils__WEBPACK_IMPORTED_MODULE_1__["default"].addSharedStyleObjectToDoc(style);
      }
    }
  };

  return {
    convertImgToLayer: _convertImgToLayer
  };
});

/***/ }),

/***/ "./src/components/data.js":
/*!********************************!*\
  !*** ./src/components/data.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  shuffle: function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex; // While there remain elements to shuffle...

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1; // And swap it with the current element.

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  applyFakeData: function applyFakeData(fakedata) {
    var selection = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].selection();

    if (selection.count() <= 0) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a text layer first");
    } else {
      var selecitonLoop = selection.objectEnumerator();
      var shuffle = this.shuffle(fakedata.data);
      var i = 0,
          sel;

      while (sel = selecitonLoop.nextObject()) {
        if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].is(sel, MSTextLayer)) {
          if (i > shuffle.length) i = 0;
          sel.setStringValue(shuffle[i]);
          i++;
        }
      }
    }
  }
});

/***/ }),

/***/ "./src/components/elevations.js":
/*!**************************************!*\
  !*** ./src/components/elevations.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  applyElevation: function applyElevation(elevation) {
    var selection = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].selection();
    var name = "Elevation/" + elevation;

    if (elevation.name) {
      name = "Elevation/" + elevation.name;
    }

    var elevationName = name;

    if (selection.count() <= 0) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a layer to apply the elevation");
      return false;
    }

    var style = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].createAndGetSharedLayerStyleFromJson(elevationName, elevation);

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      target.sharedStyle = style;
    }

    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().reloadInspector();
  }
});

/***/ }),

/***/ "./src/components/icons.js":
/*!*********************************!*\
  !*** ./src/components/icons.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  convertSvgToSymbol: function convertSvgToSymbol(data) {
    var name = data.name;
    var selectedLayers = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().selectedLayers();
    var existingSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName(name);
    var replaceColor, selectedSymbol;

    if (data.colorValue) {
      replaceColor = MSColor.colorWithRed_green_blue_alpha(data.colorValue.r / 255, data.colorValue.g / 255, data.colorValue.b / 255, data.colorValue.a);
      var prefix = "c/";
      var ColorName = data.colorName || prefix + data.colorHex + "/" + data.colorAlpha;
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeColorSymbol(replaceColor, data.colorHex, data.colorAlpha, ColorName);
      selectedSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName(name);
    }

    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
          newSymbolRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(newSymbol),
          droppedElement = selectedLayers.firstLayer(),
          droppedEleRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(droppedElement);
      newSymbol.setConstrainProportions(true);
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].current().addLayers([newSymbol]);
      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].current().removeLayer(droppedElement);
      return;
    }

    if (data.colorValue && data.isGlif) {
      var colorTHex = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToNSColor("#80868B", 1);
      var colorBlack = MSColor.colorWithRed_green_blue_alpha(colorTHex.r, colorTHex.g, colorTHex.b, 1);
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeColorSymbol(colorBlack, "#80868B", 1, "c/grey/600");
      var blackSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName("c/grey/600");
      var blackSymbolInstance = blackSymbol.newSymbolInstance();
      blackSymbolInstance.setName("🎨 Color");
      var sRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(blackSymbolInstance);
      sRect.setHeight(24);
      sRect.setWidth(24);
      var draggedLayer = selectedLayers.firstLayer();
      var subLayers = draggedLayer.layers();

      for (var j = 0; j < subLayers.count(); j++) {
        var layer = subLayers[j];

        if (layer.style().hasEnabledFill() == 0) {
          layer.removeFromParent();
        }
      }

      subLayers = draggedLayer.layers();

      for (var j = 0; j < subLayers.count(); j++) {
        var layer = subLayers[j];
        layer.style().removeAllStyleFills();
        layer.hasClippingMask = true;
      }

      draggedLayer.addLayers([blackSymbolInstance]);
    }

    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(selectedLayers, name, true);
    var symbolInstanceRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(symbolInstance);
    symbolInstanceRect.setConstrainProportions(true);
    symbolInstance.overridePoints().forEach(function (overridePoint) {
      if (overridePoint.layerName() + "" == "🎨 Color") {
        symbolInstance.setValue_forOverridePoint_(selectedSymbol.symbolID(), overridePoint);
      }
    });
  }
});

/***/ }),

/***/ "./src/components/metadata.js":
/*!************************************!*\
  !*** ./src/components/metadata.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");


var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

/* harmony default export */ __webpack_exports__["default"] = ({
  updateLayerMetadata: function updateLayerMetadata(data) {
    log(data);
    var selection = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].selection();

    if (selection.count() <= 0) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a layer first");
    } else {
      var selecitonLoop = selection.objectEnumerator(),
          sel,
          keys = Object.keys(data);

      while (sel = selecitonLoop.nextObject()) {
        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].clearLayerMetaData(sel);

        for (var i = 0; i < keys.length; i++) {
          Settings.setLayerSettingForKey(sel, keys[i], data[keys[i]]);
        }
      }

      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().reloadInspector();
    }
  }
});

/***/ }),

/***/ "./src/components/type.js":
/*!********************************!*\
  !*** ./src/components/type.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  applyTypographyStyles: function applyTypographyStyles(style) {
    var selection = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].selection();

    if (selection.count() <= 0) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a text layer to apply style");
    } else {
      style.color = {
        red: style.color_red,
        blue: style.color_blue,
        green: style.color_green,
        alpha: style.color_alpha
      };
      var style = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].createAndGetSharedTextStyleFromJson(style.name, style),
          selecitonLoop = selection.objectEnumerator(),
          sel;

      while (sel = selecitonLoop.nextObject()) {
        sel.sharedStyle = style;
      }

      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().reloadInspector();
    }
  }
});

/***/ }),

/***/ "./src/panels/settings.js":
/*!********************************!*\
  !*** ./src/panels/settings.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/panel */ "./src/ui/panel.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary[_common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].layerSettingsPanelId];

  if (!browserWindow) {
    var options = {
      identifier: _common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].layerSettingsPanelId,
      width: 300,
      height: 300,
      url: _common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].baseURL + "metadata"
    };
    var panel = new _ui_panel__WEBPACK_IMPORTED_MODULE_0__["MDPanel"](options);
    threadDictionary[_common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].layerSettingsPanelId] = panel;
    browserWindow = threadDictionary[_common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].layerSettingsPanelId];
  }

  var selection = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].selection(); // First argument is a delay in seconds.

  coscript.scheduleWithInterval_jsFunction(0.5, function () {
    _utils__WEBPACK_IMPORTED_MODULE_2__["default"].loadSettingsToWebview(selection, browserWindow);
  });
});

/***/ }),

/***/ "./src/ui/panel.js":
/*!*************************!*\
  !*** ./src/ui/panel.js ***!
  \*************************/
/*! exports provided: MDPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDPanel", function() { return MDPanel; });
/* harmony import */ var _utils_global_mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global/mocha-js-delegate */ "./src/utils/global/mocha-js-delegate.js");
/* harmony import */ var _utils_global_mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_global_mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_global_first_mouse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/global/first-mouse */ "./src/utils/global/first-mouse.js");
/* harmony import */ var _utils_global_first_mouse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_global_first_mouse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/icons */ "./src/components/icons.js");
/* harmony import */ var _components_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/color */ "./src/components/color.js");
/* harmony import */ var _components_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/type */ "./src/components/type.js");
/* harmony import */ var _components_elevations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/elevations */ "./src/components/elevations.js");
/* harmony import */ var _components_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/data */ "./src/components/data.js");
/* harmony import */ var _components_metadata__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/metadata */ "./src/components/metadata.js");
/* harmony import */ var _components_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/components */ "./src/components/components.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }










var MDPanel =
/*#__PURE__*/
function () {
  function MDPanel(options) {
    _classCallCheck(this, MDPanel);

    var defaultOptions = {
      url: "https://google.com",
      width: 320,
      height: 512,
      identifier: "com.google.material.gsid"
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.initilize(this.options);
  }

  _createClass(MDPanel, [{
    key: "initilize",
    value: function initilize(options) {
      var Panel = NSPanel.alloc().init(),
          colorWhite = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1),
          frame = NSMakeRect(0, 0, options.width, options.height + 24),
          titleBgColor = colorWhite,
          contentBgColor = colorWhite,
          threadDictionary = NSThread.mainThread().threadDictionary(),
          fiber = coscript.createFiber(),
          webViewRect = NSMakeRect(0, 0, this.options.width, this.options.height),
          contentView = Panel.contentView(),
          webView = WebView.alloc().initWithFrame(webViewRect),
          closeButton = Panel.standardWindowButton(NSWindowCloseButton),
          titlebarView = contentView.superview().titlebarViewController().view(),
          titlebarContainerView = titlebarView.superview(); // threadDictionary[this.options.identifier] = this;

      Panel.setTitleVisibility(NSWindowTitleHidden);
      Panel.setTitlebarAppearsTransparent(true);
      Panel.standardWindowButton(NSWindowCloseButton).setHidden(false);
      Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
      Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
      Panel.setFrame_display(frame, true);
      Panel.setBackgroundColor(contentBgColor);
      Panel.setWorksWhenModal(true);
      var mainWindowFrame = NSApp.mainWindow().frame();
      var mainWindowWidth = Number(mainWindowFrame.size.width);
      var mainWindowHeight = Number(mainWindowFrame.size.height);
      var frameOrgin = NSMakePoint(mainWindowWidth - 240 - this.options.width, mainWindowHeight - 100 - this.options.height);
      Panel.setFrameOrigin(frameOrgin);
      Panel.makeKeyAndOrderFront(nil);
      Panel.becomeKeyWindow();
      Panel.setLevel(NSFloatingWindowLevel);
      contentView.setWantsLayer(true);
      contentView.layer().setFrame(contentView.frame());
      webView.setBackgroundColor(contentBgColor);
      webView.setMainFrameURL_(options.url);
      contentView.addSubview(webView);
      var windowObject = webView.windowScriptObject();
      this.webView = webView;
      this.windowObject = windowObject;
      var delegate = new _utils_global_mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0___default.a({
        "webView:didChangeLocationWithinPageForFrame:": function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
          var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

          if (request) {
            if (request == "onWindowDidBlur") {
              _utils_global_first_mouse__WEBPACK_IMPORTED_MODULE_1___default()(webView, contentView);
            }

            var sketchData = JSON.parse(decodeURI(windowObject.valueForKey("_sketch_data")));

            if (request == "drag-end") {
              _components_icons__WEBPACK_IMPORTED_MODULE_2__["default"].convertSvgToSymbol(sketchData);
            }

            if (request == 'componentDragFinish') {
              Object(_components_components__WEBPACK_IMPORTED_MODULE_8__["default"])().convertImgToLayer(sketchData);
            }

            if (request == "applyColor") {
              Object(_components_color__WEBPACK_IMPORTED_MODULE_3__["default"])().applyColor(sketchData);
            }

            if (request == "addGlobalSymbols") {
              Object(_components_color__WEBPACK_IMPORTED_MODULE_3__["default"])().addGlobalSymbols(sketchData);
            }

            if (request == "addGlobalColors") {
              Object(_components_color__WEBPACK_IMPORTED_MODULE_3__["default"])().addGlobalColors(sketchData);
            }

            if (request == "pickColor") {
              Object(_components_color__WEBPACK_IMPORTED_MODULE_3__["default"])().pickColor(webView, sketchData);
            }

            if (request == "applyStyles") {
              _components_type__WEBPACK_IMPORTED_MODULE_4__["default"].applyTypographyStyles(sketchData);
            }

            if (request == "applyFakeData") {
              _components_data__WEBPACK_IMPORTED_MODULE_6__["default"].applyFakeData(sketchData);
            }

            if (request == "applyElevations") {
              _components_elevations__WEBPACK_IMPORTED_MODULE_5__["default"].applyElevation(sketchData);
            }

            if (request == "updateLayerMetadata") {
              _components_metadata__WEBPACK_IMPORTED_MODULE_7__["default"].updateLayerMetadata(sketchData);
            }
          }

          windowObject.evaluateWebScript("window.location.hash = '';");
        }
      });
      webView.setFrameLoadDelegate_(delegate.getClassInstance());
      closeButton.setCOSJSTargetFunction(function (sender) {
        self.wantsStop = true;
        Panel.close();

        if (options.identifier) {
          threadDictionary.removeObjectForKey(options.identifier);
          fiber.cleanup();
        }
      });
      closeButton.setAction("callAction:");
      closeButton.setFrameOrigin(NSMakePoint(8, 0));
      titlebarContainerView.setFrame(NSMakeRect(0, options.height, options.width, 24));
      titlebarView.setFrameSize(NSMakeSize(options.width, 24));
      titlebarView.setTransparent(true);
      titlebarView.setBackgroundColor(titleBgColor);
      titlebarContainerView.superview().setBackgroundColor(titleBgColor);
    }
  }]);

  return MDPanel;
}();

/***/ }),

/***/ "./src/utils/global/archive.js":
/*!*************************************!*\
  !*** ./src/utils/global/archive.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_doc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/doc */ "./src/utils/modules/doc.js");
/* harmony import */ var _modules_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/array */ "./src/utils/modules/array.js");


var SKETCH_47_JSON_FORMAT_VERSION = 95;
/* harmony default export */ __webpack_exports__["default"] = ({
  stringFromData: function stringFromData(data) {
    return NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);
  },
  dataFromString: function dataFromString(string) {
    return NSString.stringWithString(string).dataUsingEncoding(NSUTF8StringEncoding);
  },
  wrapArchiveDataInHeader: function wrapArchiveDataInHeader(archiveData) {
    var archiveJSONString = this.stringFromData(archiveData);
    var archiveJSData = JSON.parse(archiveJSONString);
    var headerJSData = this.createArchiveHeaderJSData();
    headerJSData.root = archiveJSData;
    var archiveWithHeaderJSONString = JSON.stringify(headerJSData);
    return this.dataFromString(archiveWithHeaderJSONString);
  },
  createArchiveHeaderJSData: function createArchiveHeaderJSData() {
    // Creating a header directly with MSArchiveHeader.new()
    // results in a header with no properties --- not what we
    // want. Instead, export a stub object and use the header
    // from that.
    var object = MSImmutableLayer.new();
    var archiveWithHeaderData = MSJSONDataArchiver.archivedDataWithHeaderAndRootObject(object);
    var archiveWithHeaderJSONString = this.stringFromData(archiveWithHeaderData);
    var archiveWithHeaderJSData = JSON.parse(archiveWithHeaderJSONString);
    delete archiveWithHeaderJSData.root;
    return archiveWithHeaderJSData;
  },
  // Unarchive with a known version of the JSON format.
  sketchObjectFromArchiveJSONUsingFormatVersion: function sketchObjectFromArchiveJSONUsingFormatVersion(jsonString, formatVersion) {
    return MSJSONDataUnarchiver.unarchiveObjectWithString_asVersion_corruptionDetected_error(jsonString, formatVersion, null, null);
  },
  recurseThroughLayers: function recurseThroughLayers(root, fn) {
    var _this = this;

    fn(root);

    if (root.layers && root.layers()) {
      root.layers().forEach(function (l) {
        return _this.recurseThroughLayers(l, fn);
      });
    }
  },
  getSharedStylesFromContainer: function getSharedStylesFromContainer(layer) {
    var layerStyledUsed = {};
    this.recurseThroughLayers(layer, function (l) {
      var sharedObject = l.sharedObject();

      if (sharedObject) {
        layerStyledUsed["" + l.sharedStyleID()] = sharedObject.immutableModelObject();
      }
    });
    return layerStyledUsed;
  },
  archiveDataFromSketchObject: function archiveDataFromSketchObject(object, options) {
    var _this2 = this;

    if (options && options.includeDependencies) {
      if (!options.document) {
        throw 'Options must include "document" when "includeDependencies" is true';
      }

      var documentData = options.document.documentData();
      var symbols = MSPasteboardLayersBase.usedSymbolsInContainer_document(MSLayerArray.arrayWithLayer(object), documentData);
      var sharedStyles = {}; // In Sketch 48 the symbols are returned as a set of
      // ids, but what we need is a map of those ids to the
      // symbols themselves.

      if (symbols.class().isSubclassOfClass(NSSet)) {
        var symbolsDict = NSMutableDictionary.new();
        var documentSymbols = _modules_doc__WEBPACK_IMPORTED_MODULE_0__["default"].getDocumentSymbols();
        _modules_array__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(symbols.allObjects(), function (symbolID) {
          var symbol = documentSymbols[symbolID].immutableModelObject();
          symbolsDict.setObject_forKey(symbol, symbolID);

          var styles = _this2.getSharedStylesFromContainer(documentSymbols[symbolID]);

          sharedStyles = Object.assign(sharedStyles, styles);
        });
        symbols = symbolsDict;
      }

      object = NSDictionary.dictionaryWithDictionary({
        layers: [object.immutableModelObject()],
        symbols: symbols,
        sharedStyles: sharedStyles
      });
    }

    var immutableObject = object.immutableModelObject();
    var archiver = MSJSONDataArchiver.new();
    archiver.setArchiveObjectIDs(true);
    var archiveData = archiver.archivedDataWithRootObject_error(immutableObject, null);
    return this.wrapArchiveDataInHeader(archiveData);
  },
  sketchObjectFromArchiveData: function sketchObjectFromArchiveData(archiveData) {
    if (archiveData && archiveData.class().isSubclassOfClass(NSData)) {
      var jsonString = this.stringFromData(archiveData); // The default format version to use is the one exported
      // by Sketch 47. This is the last version for which we
      // did not store the format version so we would know
      // what to use when unarchiving. This is not exact
      // because of course customers do not always upgrade at
      // the same time, but because of backwards compatibility
      // going back several format versions, it is fine.

      var formatVersion = SKETCH_47_JSON_FORMAT_VERSION;
      var jsData;

      try {
        jsData = JSON.parse(jsonString);
      } catch (err) {
        jsData = null; // No-op.
      }

      if (!jsData) {
        // Format is not JSON, use the keyed unarchiver.
        return MSKeyedUnarchiver.unarchiveObjectWithData_asVersion_corruptionDetected_error(archiveData, formatVersion, null, null);
      }

      if (jsData._class === 'MSArchiveHeader') {
        // If there is a wrapping header, take the format
        // version from it.
        formatVersion = jsData.version; // Also unwrap the archive data from the header
        // because the header throws Sketch off even though it
        // contains the correct version information.

        jsData = jsData.root;
      }

      return this.sketchObjectFromArchiveJSONUsingFormatVersion(JSON.stringify(jsData), formatVersion);
    } else {
      // Object has already been unarchived.
      return archiveData;
    }
  }
});

/***/ }),

/***/ "./src/utils/global/first-mouse.js":
/*!*****************************************!*\
  !*** ./src/utils/global/first-mouse.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var createCocoaObject = function createCocoaObject(methods, superclass) {
  var uniqueClassName = 'MD.sketch_' + NSUUID.UUID().UUIDString();
  var classDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject);
  classDesc.registerClass();

  for (var selectorString in methods) {
    var selector = NSSelectorFromString(selectorString);
    classDesc.addInstanceMethodWithSelector_function(selector, methods[selectorString]);
  }

  return NSClassFromString(uniqueClassName).new();
};

module.exports = function (webView, contentView) {
  var button = createCocoaObject({
    'mouseDown:': function mouseDown(evt) {
      this.removeFromSuperview();
      NSApplication.sharedApplication().sendEvent(evt);
    }
  }, NSButton);
  button.setIdentifier('firstMouseAcceptor');
  button.setTransparent(true);
  button.setTranslatesAutoresizingMaskIntoConstraints(false);
  contentView.addSubview(button);
  var views = {
    button: button,
    webView: webView
  };
  contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views('V:[button(==webView)]', NSLayoutFormatDirectionLeadingToTrailing, null, views));
  contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views('H:[button(==webView)]', NSLayoutFormatDirectionLeadingToTrailing, null, views));
  contentView.addConstraints([NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(button, NSLayoutAttributeTop, NSLayoutRelationEqual, webView, NSLayoutAttributeTop, 1, 0)]);
};

/***/ }),

/***/ "./src/utils/global/mocha-js-delegate.js":
/*!***********************************************!*\
  !*** ./src/utils/global/mocha-js-delegate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString();
  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject);
  delegateClassDesc.registerClass(); // Storage Handlers

  var handlers = {}; // Define interface

  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = selectorString in handlers;
    var selector = NSSelectorFromString(selectorString);
    handlers[selectorString] = func;
    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */

    if (!handlerHasBeenSet) {
      var args = [];
      var regex = /:/g;

      while (regex.exec(selectorString)) {
        args.push("arg" + args.length);
      }

      var dynamicFunction = eval("(function (" + args.join(", ") + ") { return handlers[selectorString].apply(this, arguments); })");
      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
    }
  };

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString];
  };

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString];
  };

  this.getAllHandlers = function () {
    return handlers;
  };

  this.getClass = function () {
    return NSClassFromString(uniqueClassName);
  };

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new();
  }; // Convenience


  if (_typeof(selectorHandlerDict) === "object") {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
    }
  }
};

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

//# sourceMappingURL=settings.js.map