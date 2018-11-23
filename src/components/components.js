import CONST from '../common/constants';

import Utils from "../utils";
import Archive from "../utils/global/archive";

export default function () {

  let _convertImgToLayer = function (layerData) {

    let url = CONST.baseURL + layerData.data;
    var componentNSUrl = NSURL.URLWithString(url);
    const componentData = NSData.dataWithContentsOfURL(componentNSUrl);
    const component = Archive.sketchObjectFromArchiveData(componentData);

    var selectedLayers = Utils.doc().selectedLayers();
    let droppedElement = selectedLayers.firstLayer();
    let droppedEleRect = Utils.getRect(droppedElement);


    Utils.forEach(component.layers, function (e) {
      var layer = Utils.mutableSketchObject(e)
      layer.setObjectID(MSModelObjectCommon.generateObjectID());
      let newLayerRect = Utils.getRect(layer);
      newLayerRect.setX(droppedEleRect.x);
      newLayerRect.setY(droppedEleRect.y);
      Utils.current().addLayers([layer]);
      Utils.current().removeLayer(droppedElement);
    });

    const symbolKeys = Object.keys(component.symbols);

    for (var i = 0; i < symbolKeys.length; i++) {
      let symbol = Utils.mutableSketchObject(component.symbols[symbolKeys[i]]);
      symbol.setObjectID(symbolKeys[i]);
      var existingSymbol = Utils.findSymbolById(symbol.objectID());
      if (!existingSymbol) {
        Utils.addSymbolToDoc(symbol);
      }
    }

    const styleKeys = Object.keys(component.sharedStyles);
    for (var i = 0; i < styleKeys.length; i++) {
      let style = Utils.mutableSketchObject(component.sharedStyles[styleKeys[i]]);
      style.setObjectID(styleKeys[i]);
      var existingSharedStyle = Utils.getSharedStyleById(style.objectID());
      if (!existingSharedStyle) {
        Utils.addSharedStyleObjectToDoc(style);
      }
    }
  }

  return {
    convertImgToLayer: _convertImgToLayer
  };

}
