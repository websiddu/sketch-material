import DocUtils from './doc';
import DomUtils from './dom';

export default {
  findSymbolByName(symbolName) {
    var targetSymbols = DocUtils.doc()
      .documentData()
      .allSymbols();
    for (var j = 0; j < targetSymbols.count(); j++) {
      var targetSymbol = targetSymbols.objectAtIndex(j);
      if (targetSymbol.name().isEqualToString(symbolName)) {
        return targetSymbol;
      }
    }
    return false;
  },
  makeColorSymbol: function(color, colorHex, colorAlpha, name) {
    if (this.findSymbolByName(name)) {
      return;
    }

    DocUtils.doc()
      .documentData()
      .symbolsPageOrCreateIfNecessary();

    var colorBg = DomUtils.addShape();
    var colorBgRect = DomUtils.getRect(colorBg);

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

    DocUtils.current().addLayers(layers);

    if (MSSymbolCreator.canCreateSymbolFromLayers(layers)) {
      var symbolName = name;
      var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(
        layers,
        symbolName,
        true
      );
      var symbolInstanceRect = DomUtils.getRect(symbolInstance);
      symbolInstanceRect.setConstrainProportions(true);
      symbolInstance.removeFromParent();
    }
  }
};
