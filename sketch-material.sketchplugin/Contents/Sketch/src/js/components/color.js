MD['Color'] = function () {

  var _showColorPanel;

  var _setBorderColor = function(layer, color) {
    if (layer.class() == "MSShapeGroup") {
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
  }

  var _setFillColor = function(layer, color) {
      if (layer.class() == "MSShapeGroup") {
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
  }

  _showColorPanel = function() {
    MD.colorPanel();
  }

  _applyColor = function(rawColor) {

    var doc = NSDocumentController.sharedDocumentController().currentDocument();
    var selection = doc.selectedLayers().layers();

    if (selection.count() <= 0) {
      MD.message("Select a layer to apply color");
    } else {
      var selecitonLoop = selection.objectEnumerator();
      while(sel = selecitonLoop.nextObject()) {
        var nsColor;

        if(rawColor.color.startsWith("#") > 0) {
          nsColor = MD.hexToMSColor(rawColor.color);
        }

        if (rawColor.color.startsWith("rgba") > 0) {
          nsColor = MD.rgbaToMSColor(rawColor.color);
        }

        if(!nsColor) {
          MD.message("Can't find the color!");
          return;
        }

        if(rawColor.type == 'border') {
          _setBorderColor(sel, nsColor);
        } else {
          _setFillColor(sel, nsColor)
        }
      }
    }
  }

  return {
    showColorPanel: _showColorPanel,
    applyColor: _applyColor
  }
}
