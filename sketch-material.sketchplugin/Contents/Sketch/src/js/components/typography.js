MD['Typography'] = function () {

  var _showTypographyPanel;

  _showTypographyPanel = function() {
    MD.typographyPanel();
  }

  _applyTypographyStyles = function(style) {

    var doc = NSDocumentController.sharedDocumentController().currentDocument();
    var selection = doc.selectedLayers().layers();

    if (selection.count() <= 0) {
      MD.message("Select a text layer to apply style");
    } else {

      var typoPath = MD.resources + '/typography.sketch';
      var typoUrl = NSURL.fileURLWithPath(typoPath);

      var styleString = 'Material/Light/' + style.name;

      var styles = {
        layerStyles: [],
        textStyles: [styleString]
      }

      MD.importSharedStyles(typoUrl, styles);
      var selecitonLoop = selection.objectEnumerator();

      while(sel = selecitonLoop.nextObject()) {
        sel.setStyle(MD.sharedTextStyle(styleString));
      }

    }

  }

  return {
    showTypographyPanel: _showTypographyPanel,
    applyTypographyStyles: _applyTypographyStyles
  }
}
