// chip.js
MD['Chip'] = function () {

  // Functions
  var _generateChips;

  // System variables
  var self = MD,
    selection = MD.selection;

  // Position
  var x = 0,
    y = 0;

  // Stings
  var chipsString, configSting;

  // Groups
  var parentGroup;

  // Components
  var chips, config;

  // Chip styles
  var chipStyles = function (layout) {
    var pickedStyle;

    switch (layout) {
      case "layout1":
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg", MD.hexToNSColor('E0E0E0', 1)),
          text: MD.sharedTextStyle("…chip-text", MD.hexToNSColor('535353', 1)),
          symbol: 'dark'
        }
        break;
      case 'layout2':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-hover", MD.hexToNSColor('BDBDBD', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout3':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-pressed", MD.hexToNSColor('BDBDBD', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout4':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-focused", MD.hexToNSColor('757575', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout5':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-primary", MD.hexToNSColor('4184F3', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout6':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-primary-focus", MD.hexToNSColor('3266D5', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
        break;
      default:
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg", MD.hexToNSColor('E0E0E0', 1)),
          text: MD.sharedTextStyle("…chip-text", MD.hexToNSColor('535353', 1)),
          symbol: 'light'
        }
      break;
    }

    return pickedStyle;

  };

  _importChipSymbols = function () {
    MD.import('chips');
  }

  _importValues = function () {
    chips = MD.configs.chips.string.split(',');
    config = MD.configs.chips.config.split('|')
  }

  _addGroup = function () {
    parentGroup = MD.addGroup();
    parentGroup.setName('chips');
  }

  _generateAllChips = function () {
    for (var i = 0; i < chips.length; i++) {
      chip = _generateChip(chips[i], x, y, config[0]);
      x = x + MD.getRect(chip).width + 8;
      parentGroup.addLayers([chip]);
      parentGroup.resizeToFitChildrenWithOption(0);
    }
  }

  _addGroupsToDoc = function () {
    parentGroup.resizeToFitChildrenWithOption(0);
    parentGroup.setConstrainProportions(false);
    var parentGroupRect = MD.getRect(parentGroup);
    parentGroupRect.setX(MD.getCenterOfViewPort().x - (parentGroupRect.width * 0.5));
    parentGroupRect.setY(MD.getCenterOfViewPort().y - (parentGroupRect.height * 0.5));

    MD.current.addLayers([parentGroup]);
  }

  _generateChips = function () {
    if (MD.chipsPanel()) {
      _importChipSymbols();
      _importValues();
      _addGroup();
      _generateAllChips();
      _addGroupsToDoc();
    }
  }

  _generateChip =  function (string, x, y, layout) {
    var group = MD.addGroup(string),
      text = MD.addText(),
      bg = MD.addShape(),
      rect = MD.getRect(bg),
      close = MD.addGroup(),
      textRect = MD.getRect(text);

    group.setName('chip / ' + string);

    text.setStringValue(string);
    text.setName(string);

    text.setStyle(chipStyles(layout).text);
    bg.setStyle(chipStyles(layout).bg);

    var stringWidth = MD.getRect(text).width;

    rect.setX(x);
    rect.setY(y);
    rect.setHeight(32);
    rect.setWidth(12 + stringWidth  + 4 + 24 + 4);
    bg.layers().firstObject().setCornerRadiusFromComponents("100")

    textRect.setX(x + 12);
    textRect.setY(y + 8.5);

    var closeButton = MD.findSymbolByName('mat/chip/icon/'+ chipStyles(layout).symbol + '/remove');
    var button = closeButton.newSymbolInstance();

    MD.getRect(button).setX(x + 12 + stringWidth + 4);
    MD.getRect(button).setY(y + 4);

    group.addLayers([bg, text, button]);

    group.resizeToFitChildrenWithOption(0);

    return group;
  }


  return {
    generateChips: _generateChips
  }

};

