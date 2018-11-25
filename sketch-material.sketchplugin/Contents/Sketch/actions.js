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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/handlers/actions.js");
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
  pluginId: "com.google.material2.active",
  // baseURL: 'https://google-com-sketch-material.firebaseapp.com/',
  baseURL: 'http://localhost:8082/',
  layerSettingsPanelId: 'com.gsid.sketch.material.layer.settings',
  stylesPanelId: 'com.gsid.sketch.material.styles.13121'
});

/***/ }),

/***/ "./src/handlers/actions.js":
/*!*********************************!*\
  !*** ./src/handlers/actions.js ***!
  \*********************************/
/*! exports provided: onStartup, onSelectionChanged, onPaste */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStartup", function() { return onStartup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSelectionChanged", function() { return onSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onPaste", function() { return onPaste; });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");
/* harmony import */ var _utils_global_load_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/global/load-framework */ "./src/utils/global/load-framework.js");



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

function onStartup(context) {
  var frameWork = _utils_global_load_framework__WEBPACK_IMPORTED_MODULE_1__["default"].initFramework('SketchMaterial');

  if (SketchMaterialManager) {
    var sketchManager = SketchMaterialManager.alloc().init();
    sketchManager.setContext(context);
  }
}
function onSelectionChanged(context) {
  // log(context.actionContext);
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary[_common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].layerSettingsPanelId];

  if (!browserWindow) {
    return;
  }

  var action = context.actionContext;
  var selection = action.newSelection;
  var selecitonLoop = selection.objectEnumerator(),
      sel;

  while (sel = selecitonLoop.nextObject()) {
    var settingsJSON = [],
        meta = [];

    if (sel.userInfo()) {
      settingsJSON = sel.userInfo()[_common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].pluginId] || [];
      meta = Object.keys(settingsJSON).map(function (k) {
        return {
          key: k,
          value: Settings.layerSettingForKey(sel, k)
        };
      });
    }

    browserWindow.windowObject.evaluateWebScript("window.vm.$store.state.layerMetadata=".concat(JSON.stringify(meta), ";"));
  }
}
function onPaste(context) {}

/***/ }),

/***/ "./src/utils/global/load-framework.js":
/*!********************************************!*\
  !*** ./src/utils/global/load-framework.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  initFramework: function initFramework(frameworkName) {
    var pluginRoot;
    pluginRoot = "/Users/gsid/Library/Developer/Xcode/DerivedData/SketchMaterial-dcfonlecjckrqcaaituorzhlrpgo/Build/Products/Debug/";
    var mocha = Mocha.sharedRuntime();

    if (NSClassFromString(frameworkName) == null) {
      if (!mocha.loadFrameworkWithName_inDirectory(frameworkName, pluginRoot)) {
        log('An error ocurred while loading the SketchMaterial Framework.');
        return;
      }
    }
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
  } else {
    exports[key](context);
  }
}
that['onStartup'] = __skpm_run.bind(this, 'onStartup');
that['onStartup'] = __skpm_run.bind(this, 'onStartup');
that['onSelectionChanged'] = __skpm_run.bind(this, 'onSelectionChanged');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=actions.js.map