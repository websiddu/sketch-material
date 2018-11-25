import Utils from "../utils/index";
import CONSTS from '../common/constants';

const adjustContainer = function (settings, symbol, symbolMaster, options) {

  let pL = Number(JSON.parse(settings.paddingLeft));
  let pR = Number(JSON.parse(settings.paddingRight));
  let pT = Number(JSON.parse(settings.paddingTop));
  let pB = Number(JSON.parse(settings.paddingBottom));
  let h = Number(JSON.parse(settings.height));
  let mW = Number(JSON.parse(settings.maxWidth));

  let existingOverrides = symbol.overrides() || NSDictionary.dictionary();
  var overrides = NSMutableDictionary.dictionaryWithDictionary(
    existingOverrides
  );
  var key = overrides.allKeys().objectAtIndex(0);
  var text = overrides.objectForKey(key);

  var children = symbolMaster.children();
  for (var i = 0; i < children.count(); i++) {
    var layer = children[i];
    if (layer.class() == MSTextLayer) {
      let style = layer.style();
      let textL = Utils.addText();
      textL.setStringValue(text);
      textL.setStyle(style);
      let textLRect = Utils.getRect(textL);
      let symbolRect = Utils.getRect(symbol);

      if (options.flex == 'height') {
        textL.setTextBehaviour(1);
        textLRect.setWidth(Utils.getRect(symbol).width - pL - pR);
        textL.adjustFrameToFit();
        let symbolNewHeight = Utils.getRect(textL).height + pT + pB;
        symbolRect.setHeight(symbolNewHeight);
      }

      if (options.flex == 'width') {
        let w = Utils.getRect(textL).width;
        symbolRect.setWidth(w + pL + pR);
      }

      break;
    }
  }
}

export default function () {
  const selection = Utils.selection();

  if (selection.count() <= 0) {
    Utils.message("Select a layer first");
    return;
  }

  var selecitonLoop = selection.objectEnumerator(),
    sel;

  while ((sel = selecitonLoop.nextObject())) {
    let selMaster = sel.symbolMaster();

    if (Utils.hasComponentData(selMaster)) {
      let settingsJSON = selMaster.userInfo()[CONSTS.pluginId] || [];
      let componentType = JSON.parse(settingsJSON['component']);

      log('❤️️️️️️️❤️❤️❤️❤️❤️❤️❤️❤️❤️');
      log(componentType);

      switch (componentType) {
        case 'BUTTON':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'width'
          });
          break;
        case 'CHIP':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'width'
          });
          break;
        case 'FAB':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'width'
          });
          break;
        case 'SNACKBAR':
          adjustContainer(settingsJSON, sel, selMaster, {
            flex: 'height'
          })
          break;
      }
    }
  }

  Utils.doc().reloadInspector();

}
