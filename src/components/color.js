import Utils from "../utils";

export default function() {
  var _setBorderColor = function(layer, color) {
    var layerClass = layer.class();
    if (
      layerClass == "MSRectangleShape" ||
      layerClass == "MSOvalShape" ||
      layerClass == "MSTriangleShape" ||
      layerClass == "MSStarShape" ||
      layerClass == "MSPolygonShape"
    ) {
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

  var _fillIcon = function(symbolInstance, color, rawColor) {
    Utils.makeColorSymbol(color, rawColor.color, 1, "c/" + rawColor.name);

    var selectedSymbol = Utils.findSymbolByName("c/" + rawColor.name);

    symbolInstance.overridePoints().forEach(function(overridePoint) {
      if (overridePoint.layerName() + "" == "🎨 Color") {
        symbolInstance.setValue_forOverridePoint_(
          selectedSymbol.symbolID(),
          overridePoint
        );
      }
    });

    symbolInstance.isSelected = true;
    symbolInstance.select_byExtendingSelection_showSelection(true, true, true);
  };

  var _setFillColor = function(layer, color, rawColor) {
    var layerClass = layer.class();

    if (layerClass == "MSSymbolInstance") {
      _fillIcon(layer, color, rawColor);
    }

    if (
      layerClass == "MSRectangleShape" ||
      layerClass == "MSOvalShape" ||
      layerClass == "MSTriangleShape" ||
      layerClass == "MSStarShape" ||
      layerClass == "MSPolygonShape"
    ) {
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

  var _applyColor = function(rawColor) {
    var doc = NSDocumentController.sharedDocumentController().currentDocument();
    var selection = doc.selectedLayers().layers();

    if (selection.count() <= 0) {
      Utils.message("Select a layer to apply color");
    } else {
      var selecitonLoop = selection.objectEnumerator();
      var sel;
      while ((sel = selecitonLoop.nextObject())) {
        var nsColor;

        if (rawColor.color.startsWith("#") > 0) {
          nsColor = Utils.hexToMSColor(rawColor.color);
        }

        if (rawColor.color.startsWith("rgba") > 0) {
          nsColor = Utils.rgbaToMSColor(rawColor.color);
        }

        if (!nsColor) {
          Utils.message("Can't find the color!");
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

  var _addGlobalColors = function(colors) {
    var MSColors = [];
    for (var i = 0; i < colors.length; i++) {
      if (typeof colors[i] == "string") {
        MSColors.push(Utils.hexToMSColor(colors[i]));
      } else {
        MSColors.push(
          MSColor.colorWithRed_green_blue_alpha(
            colors[i].red,
            colors[i].green,
            colors[i].blue,
            colors[i].alpha
          )
        );
      }
    }
    var app = NSApp.delegate();
    var assets = app.globalAssets();
    assets.setColors(MSColors);
    Utils.doc()
      .inspectorController()
      .closeAnyColorPopover();
    app.refreshCurrentDocument();
    Utils.doc().reloadInspector();

    Utils.message(
      "✅ Colors added successfuly, Open color picker to see changes."
    );
  };

  var _addGlobalSymbols = function(colorGroups) {
    for (var group in colorGroups) {
      for (var clr in colorGroups[group]) {
        var color = colorGroups[group][clr];
        Utils.makeColorSymbol(
          Utils.hexToMSColor(color.color),
          color.color,
          1,
          "c/" + color.name
        );
      }
    }

    var app = NSApp.delegate();
    app.refreshCurrentDocument();
    Utils.doc().reloadInspector();

    Utils.message("✅ Color symbols added to your symbols page");
  };

  var _pickColor = function(webView, clr) {
    var btn = BCMagnifierButton.alloc().initWithFrame(NSZeroRect);
    coscript.pushAsCurrentCOScript();
    btn.setCOSJSTargetFunction(function(sender) {
      var pickColor = sender.color();
      var color = MSColor.colorWithRed_green_blue_alpha(
        pickColor.red(),
        pickColor.green(),
        pickColor.blue(),
        1
      );
      var hexValue = "#" + color.immutableModelObject().hexValue();
      webView
        .windowScriptObject()
        .evaluateWebScript(
          "window.vm.$store.state." + clr + '= "' + hexValue + '";'
        );
    });
    btn.performClick(Utils.context);
  };

  return {
    applyColor: _applyColor,
    addGlobalColors: _addGlobalColors,
    addGlobalSymbols: _addGlobalSymbols,
    pickColor: _pickColor
  };
}
