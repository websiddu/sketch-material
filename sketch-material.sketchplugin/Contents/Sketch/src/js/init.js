var MD = {
  init: function (context, command, args) {

    var commandOptions = '' + args;

    this.prefs = NSUserDefaults.standardUserDefaults();
    this.context = context;

    this.version = this.context.plugin.version() + "";
    this.MDVersion = this.prefs.stringForKey("MDVersion") + "" || 0;

    this.baseUrl = "https://sketch-material.firebaseapp.com";

    this.extend(context);
    this.pluginRoot = this.scriptPath
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent()
      .stringByDeletingLastPathComponent();
    this.pluginSketch = this.pluginRoot + "/Contents/Sketch/scripts";
    this.resources = this.pluginRoot + '/Contents/Resources';

    coscript.setShouldKeepAround(false);


    if (command && command == "init") {
      // this.menu();
      // this.checkUpdate();
      return false;
    }

    this.document = context.document;
    this.documentData = this.document.documentData();
    this.UIMetadata = context.document.mutableUIMetadata();
    this.window = this.document.window();
    this.pages = this.document.pages();
    this.page = this.document.currentPage();
    this.artboard = this.page.currentArtboard();
    this.current = this.artboard || this.page;

    this.configs = this.getConfigs();


    if (command) {
      switch (command) {
        case "importer":
          var panel = this.importerPanel();
          // this.Importer().import(args);
          break;
        case "generate-button":
          this.Button().generateButtons(args);
          break;
        case "generate-chips":
          this.Chip().generateChips();
          break;
        case "generate-dialogs":
          this.Dialog().generateDialogs();
          break;
        case "generate-snackbars":
          this.SnackBar().generateSnackBars();
          break;
        case "generate-table":
          this.Table().generateTable();
          break;
        case "apply-elevation":
          this.Elevation().applyElevation(args);
          break;
        case "generate-tooltip":
          this.Tooltip().generateTooltip();
          break;
        case "typography":
          this.Typography().showTypographyPanel();
        break;
        case "forms":
          this.Forms().generateForms();
        break;
        case "settings":
          this.settingsPanel();
          break;
        case "export":
          this.export();
          break;
      }
    }
  },
  extend: function(options, target) {
    var target = target || this;

    for (var key in options) {
      target[key] = options[key];
    }
    return target;
  }
};


