// snackbar.js
MD['SnackBar'] = function () {
  var _generateSnackBar, _buildSnackBars, _importSnackbarSymbols;

  var SB_STYLES = {
    button: '…toast-button',
    content: '…toast-content',
    bg: '…toast-bg',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
    width: 360,
  }



  _buildSnackBars = function() {

    var content = MD.addText(),
      button = MD.addText(),
      bg = MD.addShape(),
      group = MD.addGroup();

      content.setStyle(MD.sharedTextStyle(SB_STYLES.content));
      button.setStyle(MD.sharedTextStyle(SB_STYLES.button));
      bg.setStyle(MD.sharedLayerStyle(SB_STYLES.bg));

      content.setStringValue(MD.snackbarsData.content);
      button.setStringValue(MD.snackbarsData.button);

      content.setTextBehaviour_mayAdjustFrame(1, false);
      content.canResize();
      content.adjustFrameToFit();

      content.setName('toast-content');
      button.setName('toast-button');

      var contentRect = MD.getRect(content),
        buttonRect = MD.getRect(button),
        bgRect = MD.getRect(bg);

      if(MD.snackbarsData.screen == 'desktop') {
        SB_STYLES.paddingTop = 14;
        SB_STYLES.paddingBottom = 14;
        bg.layers().firstObject().setCornerRadiusFromComponents("2");
      }

      contentRect.setWidth(MD.snackbarsData.contentWidth);
      buttonRect.setWidth(MD.snackbarsData.buttonWidth);
      bgRect.setWidth(MD.snackbarsData.width);

      content.adjustFrameToFit();

      contentRect = MD.getRect(content);

      contentRect.setY(SB_STYLES.paddingTop);
      contentRect.setX(SB_STYLES.paddingLeft);

      buttonRect.setX(MD.snackbarsData.width - MD.snackbarsData.buttonWidth - SB_STYLES.paddingRight);

      bgRect.setHeight(SB_STYLES.paddingTop + SB_STYLES.paddingBottom + contentRect.height);

      var buttonX = ((bgRect.height - SB_STYLES.paddingTop - SB_STYLES.paddingBottom) - buttonRect.height)/2

      buttonRect.setY(SB_STYLES.paddingTop + buttonX);

      if(MD.snackbarsData.hideButton) {
        group.addLayers([bg, content]);
      } else {
        group.addLayers([bg, content, button]);
      }

      var groupRect = MD.getRect(group);
      groupRect.setConstrainProportions(false);

      button.hasFixedTop = true;
      button.hasFixedRight = true;
      content.hasFixedTop = true;
      content.hasFixedLeft = true;

      group.resizeToFitChildrenWithOption(0);
      group.setName('toast')

      MD.current.addLayers([group]);

      groupRect.setX(MD.getCenterOfViewPort().x - (bgRect.width * 0.5));
      groupRect.setY(MD.getCenterOfViewPort().y - (bgRect.height * 0.5));

  }

  _importSnackbarSymbols = function() {
    MD.import('snackbars');
  }

  _generateSnackBars = function() {
    if (MD.snackBarsPanel()) {
      _importSnackbarSymbols();
      _buildSnackBars();
    }
  }

  return {
    generateSnackBars: _generateSnackBars
  }

};
