// dialog.js
MD['Dialog'] = function () {
  var _generateDialogs, _importDialogSymbols, _buildDialog, _makeButton;

  var DIALOG_STYLES = {
    title: '…dialog-title',
    content: '…dialog-content',
    background: '…dialog-bg-light',
    width: 280,
    actionsBgHeight: 52,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 22,
    gapBetweenTitleAndContent: 14,
    gapBetweenContentAndFooter: 17,
    buttonTextStyle: '…button-text-primary',
    buttonBgStyle: '…button-flat-bg'
  }

  _makeButton = function (text) {
    var buttonGroup = MD.addGroup(),
      buttonBg = MD.addShape(),
      buttonText = MD.addText();

    buttonText.setStringValue(text);

    buttonText.setStyle(MD.sharedTextStyle(DIALOG_STYLES.buttonTextStyle));
    buttonBg.setStyle(MD.sharedLayerStyle(DIALOG_STYLES.buttonBgStyle));

    // Rect
    var buttonBgRect = MD.getRect(buttonBg),
      buttonTextRect = MD.getRect(buttonText),
      buttonGroupRect = MD.getRect(buttonGroup);

    buttonBgRect.setWidth(8 + 8 + buttonTextRect.width);
    buttonBgRect.setHeight(36);
    buttonTextRect.setX(8);
    buttonTextRect.setY(10);

    buttonGroup.addLayers([buttonBg, buttonText]);
    buttonGroup.setName(text);

    buttonGroup.resizeToFitChildrenWithOption(0);

    return buttonGroup;
  }

  _buildDialog = function () {

    var scrollOrigin = MD.page.scrollOrigin();

    var dialogTitle = MD.addText(),
      dialogContent = MD.addText(),
      dialogBg = MD.addShape(),
      dialogGroup = MD.addGroup();

    dialogTitle.setStyle(MD.sharedTextStyle(DIALOG_STYLES.title));
    dialogContent.setStyle(MD.sharedTextStyle(DIALOG_STYLES.content));
    dialogBg.setStyle(MD.sharedLayerStyle(DIALOG_STYLES.background));

    dialogTitle.setStringValue(MD.dialogsData.dTitle);
    dialogContent.setStringValue(MD.dialogsData.dBody);

    if (MD.dialogsData.screen == 'desktop') {
      DIALOG_STYLES.width = '640';
    }

    dialogTitle.setName('dialog-title');
    dialogContent.setName('dialog-content');
    dialogTitle.setTextBehaviour_mayAdjustFrame(1, true);
    dialogContent.setTextBehaviour_mayAdjustFrame(1, false);

    dialogTitle.adjustFrameToFit()

    dialogTitle.canResize();
    dialogContent.canResize();

    dialogBg.layers().firstObject().setCornerRadiusFromComponents("2");

    // Get rects
    var dialogTitleRect = MD.getRect(dialogTitle),
      dialogContentRect = MD.getRect(dialogContent),
      dialogBgRect = MD.getRect(dialogBg);

    dialogTitleRect.setWidth(DIALOG_STYLES.width - DIALOG_STYLES.paddingLeft - DIALOG_STYLES.paddingRight);
    dialogContentRect.setWidth(DIALOG_STYLES.width - DIALOG_STYLES.paddingLeft - DIALOG_STYLES.paddingRight);

    dialogTitleRect.setX(DIALOG_STYLES.paddingLeft);
    dialogTitleRect.setY(DIALOG_STYLES.paddingTop);

    dialogTitle.adjustFrameToFit();
    dialogContent.adjustFrameToFit();

    dialogContentRect.setX(DIALOG_STYLES.paddingLeft);
    dialogContentRect.setY(DIALOG_STYLES.paddingTop +  MD.getRect(dialogTitle).height + DIALOG_STYLES.gapBetweenTitleAndContent);

    dialogGroup.resizeToFitChildrenWithOption(0);

    dialogBgRect.setWidth(DIALOG_STYLES.width);

    var btn1 = _makeButton(MD.dialogsData.dButtonOne);
    var btn2 = _makeButton(MD.dialogsData.dButtonTwo);

    var dialogActionsGroup = MD.addGroup();
    var dialogActionsBg = MD.addShape();
    var dialogActionsBgRect = MD.getRect(dialogActionsBg);
    var dialogActionsGroupRect = MD.getRect(dialogActionsGroup);

    dialogActionsBgRect.setWidth(DIALOG_STYLES.width);
    dialogActionsBgRect.setHeight(DIALOG_STYLES.actionsBgHeight);

    var btn1Rect = MD.getRect(btn1),
      btn2Rect = MD.getRect(btn2);

    var btnWidth = btn1Rect.width + btn2Rect.width + 8 + 8 + 8;

    if (btnWidth > DIALOG_STYLES.width) {
      btn1Rect.setX(DIALOG_STYLES.width - 8 - btn1Rect.width);
      btn1Rect.setY(6);

      btn2Rect.setX(DIALOG_STYLES.width - 8 - btn2Rect.width);
      btn2Rect.setY(12 + 6 + btn1Rect.height);

      dialogActionsBgRect.setHeight(48 * 2);

    } else {
      btn1Rect.setX(DIALOG_STYLES.width - 8 - btn1Rect.width);
      btn1Rect.setY(8);

      btn2Rect.setX(DIALOG_STYLES.width - 8 - btn1Rect.width - 8 - btn2Rect.width);
      btn2Rect.setY(8);
    }


    dialogTitle.hasFixedTop = true;
    dialogTitle.hasFixedLeft = true;
    dialogTitle.hasFixedRight = true;

    dialogContent.hasFixedTop = true;
    dialogContent.hasFixedLeft = true;
    dialogContent.hasFixedRight = true;

    btn1.hasFixedRight = true;
    btn1.hasFixedBottom = true;
    btn1.hasFixedWidth = true;
    btn1.hasFixedHeight = true;

    btn2.hasFixedRight = true;
    btn2.hasFixedBottom = true;
    btn2.hasFixedWidth = true;
    btn2.hasFixedHeight = true;

    dialogActionsBg.hasFixedBottom = true;
    dialogActionsBg.hasFixedHeight = true;


    dialogActionsGroupRect.setConstrainProportions(false);

    dialogActionsGroup.hasFixedHeight = true;

    dialogActionsGroup.addLayers([dialogActionsBg, btn1, btn2]);
    dialogActionsGroup.resizeToFitChildrenWithOption(0);
    dialogActionsGroup.setName('dialog-actions');

    dialogActionsGroupRect.setX(0);

    dialogActionsBgY = DIALOG_STYLES.paddingTop + MD.getRect(dialogTitle).height + DIALOG_STYLES.gapBetweenTitleAndContent + MD.getRect(dialogContent).height + DIALOG_STYLES.gapBetweenContentAndFooter;

    dialogActionsGroupRect.setY(dialogActionsBgY);

    if (MD.dialogsData.hideTitle) {
      dialogGroup.addLayers([dialogBg, dialogActionsGroup, dialogContent]);
    } else {
      dialogGroup.addLayers([dialogBg, dialogActionsGroup, dialogTitle, dialogContent]);
    }

    dialogGroup.resizeToFitChildrenWithOption(0);

    dialogBgRect.setHeight(MD.getRect(dialogGroup).height);

    if (btnWidth > DIALOG_STYLES.width) {
      dialogBgRect.setHeight(MD.getRect(dialogGroup).height + 8);
    }

    if (MD.dialogsData.hideTitle) {
      dialogBgRect.setHeight(MD.getRect(dialogGroup).height - 36);
      dialogBgRect.setY(36);
    }

    dialogGroup.resizeToFitChildrenWithOption(0);

    dialogGroup.setName('dialog');
    MD.current.addLayers([dialogGroup]);

    var dialogGroupRect = MD.getRect(dialogGroup);

    dialogGroupRect.setConstrainProportions(false);

    dialogGroupRect.setX(MD.getCenterOfViewPort().x - (dialogBgRect.width * 0.5));
    dialogGroupRect.setY(MD.getCenterOfViewPort().y - (dialogBgRect.height * 0.5));

  }

  _importDialogSymbols = function () {
    log("--------0")
    MD.import('dialogs');
    log("--------1")
  }

  _generateDialogs = function () {
    if (MD.dialogsPanel()) {
      _importDialogSymbols();
      _buildDialog();
    }
  }

  return {
    generateDialogs: _generateDialogs
  }

};

