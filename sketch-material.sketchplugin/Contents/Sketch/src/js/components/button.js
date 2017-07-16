MD['Button'] = function () {

  // Globals
  var self = MD,
    selection = MD.context.selection;

  // Functions
  var _generateButtons;

  _getStyles = function (buttonType) {
    var textStyle = '…button-text-primary', padding = 8;

    if (buttonType[0] == 'raised') {
      textStyle = "…button-text-light";
      padding = 16;
    }

    if (buttonType[1] == 'disabled') {
      textStyle = "…button-text-disabled";
    }

    buttonType[1] = buttonType[1] ? "-" + buttonType[1] : '';

    return {
      bgStyle: '…button-' + buttonType[0] + buttonType[1] + '-bg',
      textStyle: textStyle,
      marginRight: padding,
      marginLeft: padding,
      marginTop: 10,
      marginBottom: 10
    }
  }

  _makeButtons = function (target, buttonType) {
    var BUTTON_STYLES = _getStyles(buttonType);

    var buttonGroup = MD.addGroup('button'),
      buttonBg = MD.addShape(),
      buttonText = MD.addText();

    target.setStyle(MD.sharedTextStyle(BUTTON_STYLES.textStyle));
    buttonBg.setStyle(MD.sharedLayerStyle(BUTTON_STYLES.bgStyle));

    var text = target.stringValue();
    buttonGroup.setName('button–' + text.toLowerCase().split(' ').join(''))
    target.setStringValue(text.toUpperCase());

    var buttonBgRect = MD.getRect(buttonBg);

    targetRect = MD.getRect(target);

    buttonBgRect.setX(targetRect.x);
    buttonBgRect.setY(targetRect.y);

    buttonBgRect.setWidth(targetRect.width + BUTTON_STYLES.marginRight + BUTTON_STYLES.marginLeft);
    buttonBgRect.setHeight(targetRect.height + BUTTON_STYLES.marginTop + BUTTON_STYLES.marginBottom);

    buttonBg.layers().firstObject().setCornerRadiusFromComponents("2")

    targetRect.setX(targetRect.x + BUTTON_STYLES.marginRight);
    targetRect.setY(targetRect.y + BUTTON_STYLES.marginTop);

    buttonGroup.addLayers([buttonBg, target]);
    buttonGroup.resizeToFitChildrenWithOption(0);

    target.select_byExpandingSelection(false, false);
    buttonGroup.select_byExpandingSelection(true, true);

    MD.current.addLayers([buttonGroup]);

    MD.current.removeLayer(target);

  }

  _generateButtons = function (type) {
    var buttonType = type.split(',');
    MD.import('button');

    if (selection.count() <= 0) {
      MD.message("Select a text layer to make button");
      return false;
    }

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      _makeButtons(target, buttonType);
    }
  }

  return {
    generateButtons: _generateButtons
  }
};
