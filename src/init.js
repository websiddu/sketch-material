import { MDPanel } from "./panel/index";
import CONSTS from "./common/constants";

export default function(context) {
  const commandId = context.command.identifier();

  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary[CONSTS.stylesPanelId];

  if (browserWindow) {
    browserWindow.windowObject.evaluateWebScript(
      `window.vm.$router.push({path: '/m2/${commandId}'})`
    );
    return;
  }

  const options = {
    identifier: CONSTS.stylesPanelId,
    width: 320,
    height: 524,
    url: CONSTS.baseURL + "m2/" + commandId
  };

  var panel = new MDPanel(options);
  threadDictionary[CONSTS.stylesPanelId] = panel;
}
