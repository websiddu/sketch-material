import Utils from "../utils";

export default {
  convertSvgToSymbol(data) {
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

      selectedSymbol = Utils.findSymbolByName(name);
    }

    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
        newSymbolRect = Utils.getRect(newSymbol),
        droppedElement = selectedLayers.firstLayer(),
        droppedEleRect = Utils.getRect(droppedElement);

      newSymbol.setConstrainProportions(true);

      Utils.current().addLayers([newSymbol]);
      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);
      Utils.current().removeLayer(droppedElement);

      return;
    }

    if (data.colorValue && data.isGlif) {
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

    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(
      selectedLayers,
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
