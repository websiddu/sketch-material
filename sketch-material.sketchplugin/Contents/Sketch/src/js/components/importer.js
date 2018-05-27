MD["Importer"] = function() {
  var _import = function() {};

  var _convertSvgToSymbol = function(data) {
    var name = data.name;
    var selectedLayers = MD.document.selectedLayers();
    var symbolsPage = MD.document
      .documentData()
      .symbolsPageOrCreateIfNecessary();
    var existingSymbol = MD.findSymbolByName(name);
    var replaceColor, selectedSymbol;


    if(data.colorValue) {
      replaceColor = MSColor.colorWithRed_green_blue_alpha(
        data.colorValue.r / 255,
        data.colorValue.g / 255,
        data.colorValue.b / 255,
        data.colorValue.a
      );

      MD.makeColorSymbol(
        replaceColor,
        data.colorHex,
        data.colorAlpha,
        "c/" + data.colorHex + "/" + data.colorAlpha
      );

      selectedSymbol = MD.findSymbolByName("c/" + data.colorHex + "/" + data.colorAlpha);
    }


    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
        newSymbolRect = MD.getRect(newSymbol),
        droppedElement = selectedLayers.firstLayer(),
        droppedEleRect = MD.getRect(droppedElement);

      newSymbol.setConstrainProportions(true);

      MD.current.addLayers([newSymbol]);
      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);
      MD.current.removeLayer(droppedElement);

      if(data.isGlif) {
        newSymbol.overridePoints().forEach(function(overridePoint) {
          if(overridePoint.layerName() + '' == '🎨 Color') {
            newSymbol.setValue_forOverridePoint_(selectedSymbol.symbolID(), overridePoint);
          }
        });
      }

      return;
    }

    if (data.colorValue && data.isGlif) {
      var colorTHex = MD.hexToNSColor("#000000", 1);
      var colorBlack = MSColor.colorWithRed_green_blue_alpha(
        colorTHex.r,
        colorTHex.g,
        colorTHex.b,
        1
      );

      MD.makeColorSymbol(colorBlack, "#000000", 1, "c/#000000/1");
      blackSymbol = MD.findSymbolByName('c/#000000/1');
      var blackSymbolInstance = blackSymbol.newSymbolInstance();
      blackSymbolInstance.setName('🎨 Color')
      var sRect = MD.getRect(blackSymbolInstance);
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

    var symbolInstanceRect = MD.getRect(symbolInstance);
    symbolInstanceRect.setConstrainProportions(true);

    symbolInstance.overridePoints().forEach(function(overridePoint) {
      if(overridePoint.layerName() + '' == '🎨 Color') {
        symbolInstance.setValue_forOverridePoint_(selectedSymbol.symbolID(), overridePoint);
      }
    });

  };

  return {
    import: _import,
    convertSvgToSymbol: _convertSvgToSymbol
  };
};
