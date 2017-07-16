MD['Tooltip'] = function () {


  // Functions
  var _generateTooltip,
    _makeTooltip;

  // Globals
  var self = MD,
    selection = MD.context.selection,
    TIP_STYLES = {};


  _getTipStyles = function(l) {
    var layout = l < 33 ? 's' : l > 33 && l < 100 ? 'm' : 'l';

    var width = layout == 'm' ? 115 : layout == 'l' ? 320 : 0;

    var tipTextStyle, tipBgStyle, marginTop, marginRight, marginBottom, marginLeft;


    if (layout == 's') {
      tipTextStyle = '…inktip-text-mini';
      tipBgStyle = '…inktip-bg-mini';
      marginTop = 5;
      marginLeft = 8; marginRight = 8;
      marginBottom = 6;
    } else {
      tipTextStyle = '…inktip-text';
      tipBgStyle = '…inktip-bg';
      marginTop = 12;
      marginLeft = 16; marginRight = 16;
      marginBottom = 13;
    }

    TIP_STYLES = {
      width: width,
      tipTextStyle: tipTextStyle,
      tipBgStyle: tipBgStyle,
      marginTop: marginTop,
      marginBottom: marginBottom,
      marginLeft: marginLeft,
      marginRight: marginRight
    }

  }

  _makeTooltip = function (target, layout) {
    var tipGroup = MD.addGroup('tip'),
      tipBg = MD.addShape(),
      tipText = MD.addText(),
      tipContentLength = target.stringValue().length();

    _getTipStyles(tipContentLength);

    target.setStyle(MD.sharedTextStyle(TIP_STYLES.tipTextStyle));
    tipBg.setStyle(MD.sharedLayerStyle(TIP_STYLES.tipBgStyle));

    target.textBehaviour = 1;

    var targetRect = MD.getRect(target);

    if (TIP_STYLES.width != 0) {
      targetRect.setWidth(TIP_STYLES.width);
      target.textBehaviour = 1;
      target.layerStyleDidChange();
      target.adjustFrameToFit();
    }

    var tipBgRect = MD.getRect(tipBg);

    targetRect = MD.getRect(target);

    tipBgRect.setX(targetRect.x);
    tipBgRect.setY(targetRect.y);

    tipBgRect.setWidth(targetRect.width + TIP_STYLES.marginRight + TIP_STYLES.marginLeft);
    tipBgRect.setHeight(targetRect.height + TIP_STYLES.marginTop + TIP_STYLES.marginBottom);

    tipBg.layers().firstObject().setCornerRadiusFromComponents("2")

    targetRect.setX(targetRect.x + TIP_STYLES.marginRight);
    targetRect.setY(targetRect.y + TIP_STYLES.marginTop);

    tipGroup.addLayers([tipBg, target]);
    tipGroup.resizeToFitChildrenWithOption(0);
    MD.current.addLayers([tipGroup]);

    target.select_byExpandingSelection(false, false);
    tipGroup.select_byExpandingSelection(true, true);
    tipGroup.setName('inktip');

    MD.current.removeLayer(target);

  }

  /* Generate the tooltip based on selected layer
   *
   *
   */
  _generateTooltip = function () {
    // Import the ink tip layer and text styles
    MD.import('inktip');

    if (selection.count() <= 0) {
      MD.message("Select a text layer to make tooltip");
      return false;
    }

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      _makeTooltip(target, 'm');
    }

  }

  return {
    generateTooltip: _generateTooltip
  }
};
