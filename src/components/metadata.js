import Utils from "../utils";
var Settings = require("sketch/settings");

export default {
  updateLayerMetadata(data) {
    log(data);
    var selection = Utils.selection();

    if (selection.count() <= 0) {
      Utils.message("Select a layer first");
    } else {
      var selecitonLoop = selection.objectEnumerator(),
        sel, keys = Object.keys(data);

      while ((sel = selecitonLoop.nextObject())) {
        Utils.clearLayerMetaData(sel);
        for (let i = 0; i < keys.length; i++) {
          Settings.setLayerSettingForKey(sel, keys[i], data[keys[i]]);
        }
      }

      Utils.doc().reloadInspector();
    }
  }
};
