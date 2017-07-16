MD['Importer'] = function () {

  var _import = function () {

  }

  var _convertSvgToSymbol = function (data) {

    var name = data.name;

    var selectedLayers = MD.document.selectedLayers();
    var symbolsPage = MD.document.documentData().symbolsPageOrCreateIfNecessary();
    var existingSymbol = MD.findSymbolByName(name);

    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
        newSymbolRect = MD.getRect(newSymbol),
        droppedElement = selectedLayers.firstLayer(),
        droppedEleRect = MD.getRect(droppedElement);

      MD.current.addLayers([newSymbol]);

      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);

      MD.current.removeLayer(droppedElement);
      return;
    }
    //avatars_and_widgets
    //alphabet_logos
    //internal_logos
    //non_material_product_logos
    //product_logos

    if (data.colorValue != '#000000' && data.isGlif ) {
      var colorHex = MD.hexToNSColor('#000000', 1)
      var color = MSColor.colorWithRed_green_blue_alpha(colorHex.r, colorHex.g, colorHex.b, 1);

      var replaceColorHex = MD.hexToNSColor(data.colorValue, 1);
      var replaceColor = MSColor.colorWithRed_green_blue_alpha(replaceColorHex.r, replaceColorHex.g, replaceColorHex.b, 1);

      var draggedLayer = selectedLayers.firstLayer();

      var layers = MD.find({ key: "(style.firstEnabledFill != NULL) && (style.firstEnabledFill.fillType == 0) && (style.firstEnabledFill.color == %@)", match: color }, draggedLayer);

      if (layers) {
        if (MD.is(layers, MSShapeGroup)) {
          var arr = NSArray.arrayWithObject(layers);
          layers = arr;
        }
        for (var i = 0; i < layers.count(); i++) {
          var layer = layers.objectAtIndex(i);
          var fill = layer.style().fills().firstObject();
          fill.color = replaceColor;
        }
      }
    }

    MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(selectedLayers, name, true);
  }


  return {
    import: _import,
    convertSvgToSymbol: _convertSvgToSymbol
  }
}
