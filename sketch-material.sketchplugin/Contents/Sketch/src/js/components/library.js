MD['Library'] = function () {

  var libraryController = AppController.sharedInstance().librariesController();
  var identifier = MSAssetLibrariesPreferencePane.identifier();
  var paneCtrl =  MSPreferencesController.sharedController();

  var _showLibrariesPanel = function() {
    MD['frameWork'] = MD.initFramework(MD.context, 'SketchMaterial');
    MD.frameWork.setWebView(MD.webView);
    var isAuthorized = MD.frameWork.isAuthorized();
    MD.librariesPanel(isAuthorized);
  }

  var _reloadPane = function() {
    paneCtrl.switchToPaneWithIdentifier(identifier);
    var libPane = paneCtrl.currentPreferencePane();
    libPane.tableView().reloadData();
    paneCtrl.close();
  }

  var _checkLoadedLibraries = function(webView) {
    var userLibraries = libraryController.userLibraries();

    var userLibrariesJson = [];

    for(var i = 0; i < userLibraries.count(); i++) {
      var userLibrary = userLibraries[i];
      var url = userLibrary.locationOnDisk();
      var name = userLibrary.name();
      var enabled = userLibrary.enabled();
      var libraryId = userLibrary.libraryID();

      userLibrariesJson.push({
        libraryId: "" + libraryId,
        name: "" + name,
        url: "" + url,
        enabled: enabled
      });
    }

    var windowObject = webView.windowScriptObject();
    windowObject.evaluateWebScript("vm.$store.commit('saveUserLibraryResults', '" + JSON.stringify(userLibrariesJson) + "');");
  }

  var _loadLibrary = function(fileName) {
    var path = MD.resources + '/libraries/' + fileName;
    var myLibUrl = NSURL.fileURLWithPath_(path);
    libraryController.addAssetLibraryAtURL_(myLibUrl);
    _reloadPane();
  }

  var _downloadFile = function(file) {
    MD.frameWork.downloadDriveFile_path_webView(file.id, MD.resources + '/libraries/' + file.name, MD.webView);
  }

  var _handleDownloadComplete = function(file) {
    _loadLibrary(file.name);
  }

  var _toggleFileState = function(file) {
    var userLibraries = libraryController.userLibraries();
    var libId = file.libraryId;
    var foundFile = null;

    for(var i = 0; i < userLibraries.count(); i++) {
      if("" + userLibraries[i].libraryID() == libId) {
        foundFile = userLibraries[i];
        break;
      }
    }

    if(foundFile) {
      foundFile.enabled = !file.enabled;
    }

    _reloadPane();

  }

  var _removeFile = function(file) {
    var userLibraries = libraryController.userLibraries();
    var libId = file.libraryId;
    var foundFile = null;

    for(var i = 0; i < userLibraries.count(); i++) {
      if("" + userLibraries[i].libraryID() == libId) {
        foundFile = userLibraries[i];
        break;
      }
    }

    if(foundFile) {
      libraryController.removeAssetLibrary(foundFile);
    }

    _reloadPane();

  }

  return {
    loadLibrary: _loadLibrary,
    showLibrariesPanel: _showLibrariesPanel,
    downloadFile: _downloadFile,
    handleDownloadComplete: _handleDownloadComplete,
    checkLoadedLibraries: _checkLoadedLibraries,
    toggleFileState: _toggleFileState,
    removeFile: _removeFile
  }
}
