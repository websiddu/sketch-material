var Settings = require("sketch/settings");
import CONSTS from '../../common/constants';

export default {
  hasComponentData(ele) {
    return Settings.layerSettingForKey(ele, 'component');
  },
  clearLayerMetaDataForKeys(ele, keys) {
    keys.forEach((key) => {
      // Settings.setLayerSettingForKey(ele, key, undefined);
      __command.setValue_forKey_onLayer(nil, key, ele);
    })
  },
  clearLayerMetaData(ele) {
    if (!ele.userInfo()) return;
    const settingsJSON = ele.userInfo()[CONSTS.pluginId] || [];
    const keys = Object.keys(settingsJSON);
    this.clearLayerMetaDataForKeys(ele, keys);
  },
  loadSettingsToWebview(selection, browserWindow) {
    var selecitonLoop = selection.objectEnumerator(),
      sel;

    while ((sel = selecitonLoop.nextObject())) {
      var settingsJSON = sel.userInfo()[CONSTS.pluginId] || [];

      const meta = Object.keys(settingsJSON).map((k) => {
        return {
          key: k,
          value: Settings.layerSettingForKey(sel, k)
        };
      });

      browserWindow.windowObject.evaluateWebScript(
        `window.vm.$store.state.layerMetadata=${JSON.stringify(meta)};`
      );
    }
  }

}
