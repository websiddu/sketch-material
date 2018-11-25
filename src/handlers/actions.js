import CONSTS from "../common/constants";
import FrameWork from '../utils/global/load-framework'

var Settings = require("sketch/settings");



export function onStartup(context) {
  let frameWork = FrameWork.initFramework('SketchMaterial');
  if (SketchMaterialManager) {
    let sketchManager = SketchMaterialManager.alloc().init();
    sketchManager.setContext(context);
  }
}

export function onSelectionChanged(context) {

  // log(context.actionContext);

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
    let settingsJSON = [],
      meta = [];
    if (sel.userInfo()) {
      settingsJSON = sel.userInfo()[CONSTS.pluginId] || [];
      meta = Object.keys(settingsJSON).map((k) => {
        return {
          key: k,
          value: Settings.layerSettingForKey(sel, k)
        };
      });
    }

    browserWindow.windowObject.evaluateWebScript(
      `window.vm.$store.state.layerMetadata=${JSON.stringify(meta)};`
    );
  }
}


export function onPaste(context) {

}
