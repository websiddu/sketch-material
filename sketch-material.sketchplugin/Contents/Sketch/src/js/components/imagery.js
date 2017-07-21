MD['Imagery'] = function () {

  var _showImageryPanel = function() {
    MD['frameWork'] = MD.initFramework(MD.context, 'SketchMaterial');
    MD.frameWork.setWebView(MD.webView);
    var isAuthorized = MD.frameWork.isAuthorized();
    MD.imageryPanel(isAuthorized);
  }

  return {
    showImageryPanel: _showImageryPanel,
  }
}
