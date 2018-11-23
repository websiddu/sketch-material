import CONSTS from "../common/constants";

var Settings = require("sketch/settings");

import Swizzle from '../utils/global/swizzle';

export function onSelectionChanged(context) {

  log(context.actionContext);





  // var threadDictionary = NSThread.mainThread().threadDictionary();
  // var browserWindow = threadDictionary[CONSTS.layerSettingsPanelId];

  // if (!browserWindow) {
  //   return;
  // }

  // const action = context.actionContext;
  // const selection = action.newSelection;

  // var selecitonLoop = selection.objectEnumerator(),
  //   sel;


  // // Swizzle.appendMethod_with('MSOverrideViewController_applyOverrideToSelectedLayers', function (context, args) {
  // //   log("Should work!!!!!");
  // // })

  // while ((sel = selecitonLoop.nextObject())) {
  //   var settingsJSON = sel.userInfo()[CONSTS.pluginId] || [];

  //   const meta = Object.keys(settingsJSON).map((k) => {
  //     return {
  //       key: k,
  //       value: settingsJSON[k].replace(/"/g, '')
  //     };
  //   });

  //   log(meta);

  //   browserWindow.windowObject.evaluateWebScript(
  //     `window.vm.$store.state.layerMetadata=${JSON.stringify(meta)};`
  //   );
  // }
}
