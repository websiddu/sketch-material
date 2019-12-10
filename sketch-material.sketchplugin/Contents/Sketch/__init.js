var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/init.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/constants.js":
/*!*********************************!*\
  !*** ./src/common/constants.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  baseURL: "https://google-com-sketch-material.firebaseapp.com/",
  layerSettingsPanelId: "com.gsid.sketch.material.layer.settings",
  stylesPanelId: "com.gsid.sketch.material.styles.13121"
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
    console.log(data);
    var name = data.name;
    var selectedLayers = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].doc().selectedLayers();
    var existingSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName(name);
    var replaceColor, selectedSymbol;

    if (data.colorValue) {
      replaceColor = MSColor.colorWithRed_green_blue_alpha(data.colorValue.r / 255, data.colorValue.g / 255, data.colorValue.b / 255, data.colorValue.a);
      var prefix = "c/";
      var ColorName = data.colorName || prefix + data.colorHex + "/" + data.colorAlpha;
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeColorSymbol(replaceColor, data.colorHex, data.colorAlpha, ColorName);
      selectedSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName(ColorName);
    }

    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
          newSymbolRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(newSymbol),
          droppedElement = selectedLayers.firstLayer(),
          droppedEleRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(droppedElement);
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].current().removeLayer(droppedElement);
      newSymbol.setConstrainProportions(true);
      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].current().addLayers([newSymbol]);
      newSymbol.isSelected = true;
      newSymbol.select_byExpandingSelection(true, false);
      return;
    }

    var draggedLayer = selectedLayers.firstLayer();
    var draggedLayerRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(draggedLayer);
    var svgImporter = MSSVGImporter.svgImporter();
    var svgURL = NSURL.URLWithString(data.url);
    var svgString = NSString.stringWithContentsOfURL_encoding_error(svgURL, NSUTF8StringEncoding, null);
    console.log("-------------------------------2");
    var range = svgString.rangeOfString("</svg>");
    var path = '<path d="M0 0h24v24H0z" fill="none" />';
    var hasBoundingBox = svgString.rangeOfString("M0 0h24v24H0z");
    var mu = NSMutableString.stringWithString(svgString);

    if (hasBoundingBox.length == 0 && range.location != NSNotFound) {
      mu.insertString_atIndex(path, range.location);
    }

    svgString = NSString.stringWithString(mu);
    var svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
    var svgImporter = MSSVGImporter.svgImporter();
    svgImporter.prepareToImportFromData(svgData);
    var svgLayer = svgImporter.importAsLayer();
    svgLayer.setName(name);
    var svgRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(svgLayer);
    svgRect.setX(draggedLayerRect.x);
    svgRect.setY(draggedLayerRect.y);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].current().addLayers([svgLayer]);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].current().removeLayer(draggedLayer);

    if (data.colorValue && data.isGlif) {
      var subLayers = svgLayer.layers();
      var colorTHex = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToNSColor("#80868B", 1);
      var colorBlack = MSColor.colorWithRed_green_blue_alpha(colorTHex.r, colorTHex.g, colorTHex.b, 1);
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeColorSymbol(colorBlack, "#80868B", 1, "c/grey/600");
      var blackSymbol = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].findSymbolByName("c/grey/600");
      var blackSymbolInstance = blackSymbol.newSymbolInstance();
      blackSymbolInstance.setName("🎨 Color");
      var sRect = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRect(blackSymbolInstance);
      sRect.setHeight(24);
      sRect.setWidth(24);

      for (var j = 0; j < subLayers.count(); j++) {
        var layer = subLayers[j];

        if (layer.style().hasEnabledFill() == 0) {
          layer.removeFromParent();
        }
      }

      subLayers = svgLayer.layers();

      for (var j = 0; j < subLayers.count(); j++) {
        var layer = subLayers[j];
        layer.style().removeAllStyleFills();
        layer.hasClippingMask = true;
      }

      svgLayer.addLayers([blackSymbolInstance]);
    }

    if (name.indexOf("ic/") != 0) {
      name = "ic/" + name;
    }

    console.log("-------------------------------3");
    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(MSLayerArray.arrayWithLayer(svgLayer), name, true);
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
    var selection = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].selection();
    log(data);

    if (selection.count() <= 0) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].message("Select a layer first");
    } else {
      var selecitonLoop = selection.objectEnumerator(),
          sel;

      while (sel = selecitonLoop.nextObject()) {
        var keys = "";

        for (var i = 0; i < data.length; i++) {
          Settings.setLayerSettingForKey(sel, data[i].key, data[i].value);
          keys = keys + data[i].key + "|";
        }

        Settings.setLayerSettingForKey(sel, "keys", keys);
      } // Utils.doc().reloadInspector();

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

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _panel_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel/index */ "./src/panel/index.js");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/constants */ "./src/common/constants.js");


/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var commandId = context.command.identifier();
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary[_common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].stylesPanelId];

  if (browserWindow) {
    browserWindow.windowObject.evaluateWebScript("window.vm.$router.push({path: '/m2/".concat(commandId, "'})"));
    return;
  }

  var options = {
    identifier: _common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].stylesPanelId,
    width: 320,
    height: 524,
    url: _common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].baseURL + "m2/" + commandId
  };
  var panel = new _panel_index__WEBPACK_IMPORTED_MODULE_0__["MDPanel"](options);
  threadDictionary[_common_constants__WEBPACK_IMPORTED_MODULE_1__["default"].stylesPanelId] = panel;
});

/***/ }),

/***/ "./src/panel/first-mouse.js":
/*!**********************************!*\
  !*** ./src/panel/first-mouse.js ***!
  \**********************************/
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
  contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views('H:[button(==webView)]', NSLayoutFormatDirectionLeadingToTrailing, null, views));
  contentView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views('V:[button(==webView)]', NSLayoutFormatDirectionLeadingToTrailing, null, views));
  contentView.addConstraints(NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(button, NSLayoutAttributeTop, NSLayoutRelationEqual, webView, NSLayoutAttributeTop, 1, 0));
};

/***/ }),

/***/ "./src/panel/index.js":
/*!****************************!*\
  !*** ./src/panel/index.js ***!
  \****************************/
/*! exports provided: MDPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDPanel", function() { return MDPanel; });
/* harmony import */ var _mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mocha-js-delegate */ "./src/panel/mocha-js-delegate.js");
/* harmony import */ var _mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _first_mouse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./first-mouse */ "./src/panel/first-mouse.js");
/* harmony import */ var _first_mouse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_first_mouse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/icons */ "./src/components/icons.js");
/* harmony import */ var _components_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/color */ "./src/components/color.js");
/* harmony import */ var _components_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/type */ "./src/components/type.js");
/* harmony import */ var _components_elevations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/elevations */ "./src/components/elevations.js");
/* harmony import */ var _components_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/data */ "./src/components/data.js");
/* harmony import */ var _components_metadata__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/metadata */ "./src/components/metadata.js");
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
      Panel.center();
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
      var delegate = new _mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0___default.a({
        "webView:didChangeLocationWithinPageForFrame:": function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
          var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

          if (request) {
            var sketchData = JSON.parse(decodeURI(windowObject.valueForKey("_sketch_data")));

            if (request == "onWindowDidBlur") {
              _first_mouse__WEBPACK_IMPORTED_MODULE_1___default()(webView, contentView);
            }

            if (request == "iconDragEnd") {
              _components_icons__WEBPACK_IMPORTED_MODULE_2__["default"].convertSvgToSymbol(sketchData);
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

/***/ "./src/panel/mocha-js-delegate.js":
/*!****************************************!*\
  !*** ./src/panel/mocha-js-delegate.js ***!
  \****************************************/
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








var Utils = Object.assign({}, _modules_array__WEBPACK_IMPORTED_MODULE_0__["default"], _modules_class__WEBPACK_IMPORTED_MODULE_1__["default"], _modules_color__WEBPACK_IMPORTED_MODULE_2__["default"], _modules_doc__WEBPACK_IMPORTED_MODULE_3__["default"], _modules_dom__WEBPACK_IMPORTED_MODULE_4__["default"], _modules_styles__WEBPACK_IMPORTED_MODULE_5__["default"], _modules_symbol__WEBPACK_IMPORTED_MODULE_6__["default"], _modules_ui__WEBPACK_IMPORTED_MODULE_7__["default"]);
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
  getSharedLayerStyleByName: function getSharedLayerStyleByName(name) {
    var sharedStyles = _doc__WEBPACK_IMPORTED_MODULE_1__["default"].doc().documentData().allLayerStyles();
    var style = _array__WEBPACK_IMPORTED_MODULE_3__["default"].find({
      key: "(name != NULL) && (name == %@)",
      match: name
    }, sharedStyles);
    style = !style || _class__WEBPACK_IMPORTED_MODULE_0__["default"].is(style, MSSharedStyle) ? style : style[0];
    return style;
  },
  addSharedStylesToDoc: function addSharedStylesToDoc(name, style, type) {
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
      this.addSharedStylesToDoc(name, style, "text");
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
      this.addSharedStylesToDoc(name, style, "layer");
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

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__init.js.map