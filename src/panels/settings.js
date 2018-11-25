import {
  MDPanel
} from '../ui/panel';
import CONSTS from '../common/constants';
import Utils from '../utils';

export default function () {

  let threadDictionary = NSThread.mainThread().threadDictionary();
  let browserWindow = threadDictionary[CONSTS.layerSettingsPanelId];

  if (!browserWindow) {
    const options = {
      identifier: CONSTS.layerSettingsPanelId,
      width: 300,
      height: 300,
      url: CONSTS.baseURL + "metadata"
    };

    var panel = new MDPanel(options);
    threadDictionary[CONSTS.layerSettingsPanelId] = panel;
    browserWindow = threadDictionary[CONSTS.layerSettingsPanelId];
  }

  let selection = Utils.selection();


  // First argument is a delay in seconds.
  coscript.scheduleWithInterval_jsFunction(0.5, function () {
    Utils.loadSettingsToWebview(selection, browserWindow);
  });


}
