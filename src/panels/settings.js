import {
  MDPanel
} from '../ui/panel';
import CONSTS from '../common/constants';

export default function () {

  var threadDictionary = NSThread.mainThread().threadDictionary();
  var browserWindow = threadDictionary[CONSTS.layerSettingsPanelId];

  if (!browserWindow) {
    const options = {
      identifier: CONSTS.layerSettingsPanelId,
      width: 300,
      height: 300,
      url: CONSTS.baseURL + "metadata"
    };

    var panel = new MDPanel(options);
    threadDictionary[CONSTS.layerSettingsPanelId] = panel;
  }
}
