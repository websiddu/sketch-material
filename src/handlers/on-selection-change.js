import Utils from "../utils";
import { MDPanel } from "../panel/index";
import CONSTS from "../common/constants";

var Settings = require("sketch/settings");

export function onSelectionChanged(context) {
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary[CONSTS.layerSettingsPanelId];

  if (!browserWindow) {
    return;
  }

  const action = context.actionContext;
  const selection = action.newSelection;

  var selecitonLoop = selection.objectEnumerator(),
    sel;

  while ((sel = selecitonLoop.nextObject())) {
    var settingKeys = Settings.layerSettingForKey(sel, "keys");

    var settingsJSON = [];
    if (settingKeys) {
      var keys = settingKeys.slice(0, -1).split("|");

      for (var i = 0; i < keys.length; i++) {
        settingsJSON.push({
          key: keys[i],
          value: Settings.layerSettingForKey(sel, keys[i])
        });
      }

      log(settingsJSON);
    }

    browserWindow.windowObject.evaluateWebScript(
      `window.vm.$store.state.layerMetadata=${JSON.stringify(settingsJSON)};`
    );
  }
}
