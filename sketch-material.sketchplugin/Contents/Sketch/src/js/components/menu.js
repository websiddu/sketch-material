// menu.js
MD['Menu'] = function () {

  var screen, width, hasIcon, symbolName = 'MD/Menu/';


  var _importMenuSymbols = function() {
    MD.import('menus');
  }

  var _updateOverrides = function(instance, symbolMaster, overridesFieldNames, field) {
    var layerIDs = MD.getLayerIDsOfOverrides(instance, symbolMaster, overridesFieldNames);

    var values = instance.overrides();
    if (!values) { values = NSMutableDictionary.dictionary(); }
    var existingOverrides = values;
    var mutableOverrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides)
    var keys = Object.keys(layerIDs);
    var i = 0;
    for(k = 0; k < keys.length; k++) {
      var key = keys[k];
      if(key == 'text') {
        i = 0;
      }
      if(key == 'shortcut') {
        i = 1;
      }
      mutableOverrides.setObject_forKey(field[i], layerIDs[key]);
    }
    instance.overrides = mutableOverrides;
  };

  var _buildMenu = function() {


    symbolName = symbolName +
      (MD.menuData.screen == 'mobile' ? 'Mobile/' : 'Desktop/') +
      (MD.menuData.hasIcon == 'yes' ? 'Icon/' : '') +
      (MD.menuData.isDense == 'dense' ? 'Dense' : 'Normal');

    var menuItemsGroup = MD.addGroup(),
      menuBg = MD.addShape();

    menuItemsGroup.setName('menu');
    var menuSymbol = MD.findSymbolByName(symbolName);
    var menuItems = [];
    var y = 8;

    for(var i = 0; i < MD.menuData.items.length; i++) {
      var item = MD.menuData.items[i];
      if(item[0]) {
        var menuItem = menuSymbol.newSymbolInstance();
        var menuItemRect = MD.getRect(menuItem);

        if(item[0] == '-') {
          var dividerSymbol = MD.findSymbolByName('MD/Menu/Divider');
          menuItem = dividerSymbol.newSymbolInstance();
          var divHeight = (MD.menuData.isDense == 'dense' ? 8 : 16);
          menuItemRect = MD.getRect(menuItem);
          menuItemRect.setHeight(divHeight);
          menuItemRect.setY(y);
          y = y + divHeight;
        } else {
          var overridesFieldNames = ['text', 'shortcut'];
          _updateOverrides(menuItem, menuSymbol, overridesFieldNames, item);
          menuItemRect.setY(y);
          y = y + (MD.menuData.isDense == 'dense' ? 32 : 48);
        }

        menuItemRect.setConstrainProportions(false);
        menuItemRect.setWidth(56 * parseInt(MD.menuData.width));
        menuItems.push(menuItem);
      }
    }

    menuItemsGroup.addLayers([menuBg]);
    menuItemsGroup.addLayers(menuItems);
    menuItemsGroup.resizeToFitChildrenWithOption(0);

    var menuGroupRect = MD.getRect(menuItemsGroup);
    var menuBgRect = MD.getRect(menuBg);

    menuBgRect.setWidth(menuGroupRect.width)
    menuBgRect.setHeight(menuGroupRect.height + 8);
    menuBg.setStyle(MD.sharedLayerStyle('MD/Menu/BG'));
    menuBg.layers().firstObject().setCornerRadiusFromComponents("2");
    menuBgRect.setConstrainProportions(false);
    menuGroupRect.setConstrainProportions(false);

    menuItemsGroup.resizeToFitChildrenWithOption(0);

    MD.current.addLayers([menuItemsGroup]);

    menuGroupRect.setX(MD.getCenterOfViewPort().x - (menuGroupRect.width * 0.5));
    menuGroupRect.setY(MD.getCenterOfViewPort().y - (menuGroupRect.height * 0.5));
  }

  var _generateMenu = function() {
    if (MD.menuPanel()) {
      _importMenuSymbols();
      _buildMenu();
    }
  }

  return {
    generateMenu: _generateMenu
  }

};

