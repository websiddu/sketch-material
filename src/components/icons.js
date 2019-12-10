import Utils from "../utils";

export default {
  convertSvgToSymbol(data) {
    console.log(data);

    var name = data.name;
    var selectedLayers = Utils.doc().selectedLayers();
    var existingSymbol = Utils.findSymbolByName(name);
    var replaceColor, selectedSymbol;

    if (data.colorValue) {
      replaceColor = MSColor.colorWithRed_green_blue_alpha(
        data.colorValue.r / 255,
        data.colorValue.g / 255,
        data.colorValue.b / 255,
        data.colorValue.a
      );

      var prefix = "c/";

      var ColorName =
        data.colorName || prefix + data.colorHex + "/" + data.colorAlpha;

      Utils.makeColorSymbol(
        replaceColor,
        data.colorHex,
        data.colorAlpha,
        ColorName
      );

      selectedSymbol = Utils.findSymbolByName(ColorName);
    }

    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
        newSymbolRect = Utils.getRect(newSymbol),
        droppedElement = selectedLayers.firstLayer(),
        droppedEleRect = Utils.getRect(droppedElement);

      Utils.current().removeLayer(droppedElement);

      newSymbol.setConstrainProportions(true);

      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);
      Utils.current().addLayers([newSymbol]);
      newSymbol.isSelected = true;
      newSymbol.select_byExpandingSelection(true, false);
      return;
    }

    var draggedLayer = selectedLayers.firstLayer();
    var draggedLayerRect = Utils.getRect(draggedLayer);

    var svgImporter = MSSVGImporter.svgImporter();
    var svgURL = NSURL.URLWithString(data.url);

    var svgString = NSString.stringWithContentsOfURL_encoding_error(
      svgURL,
      NSUTF8StringEncoding,
      null
    );

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
    var svgRect = Utils.getRect(svgLayer);

    svgRect.setX(draggedLayerRect.x);
    svgRect.setY(draggedLayerRect.y);
    Utils.current().addLayers([svgLayer]);
    Utils.current().removeLayer(draggedLayer);

    if (data.colorValue && data.isGlif) {
      var subLayers = svgLayer.layers();
      var colorTHex = Utils.hexToNSColor("#80868B", 1);
      var colorBlack = MSColor.colorWithRed_green_blue_alpha(
        colorTHex.r,
        colorTHex.g,
        colorTHex.b,
        1
      );

      Utils.makeColorSymbol(colorBlack, "#80868B", 1, "c/grey/600");
      const blackSymbol = Utils.findSymbolByName("c/grey/600");
      const blackSymbolInstance = blackSymbol.newSymbolInstance();
      blackSymbolInstance.setName("🎨 Color");
      var sRect = Utils.getRect(blackSymbolInstance);
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

    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(
      MSLayerArray.arrayWithLayer(svgLayer),
      name,
      true
    );

    var symbolInstanceRect = Utils.getRect(symbolInstance);
    symbolInstanceRect.setConstrainProportions(true);

    symbolInstance.overridePoints().forEach(function(overridePoint) {
      if (overridePoint.layerName() + "" == "🎨 Color") {
        symbolInstance.setValue_forOverridePoint_(
          selectedSymbol.symbolID(),
          overridePoint
        );
      }
    });
  }
};
