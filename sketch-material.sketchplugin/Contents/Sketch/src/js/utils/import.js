MD.extend({

  /**
   *
   *
   * @param {any} component
   */
  import: function (component, args, values) {
    if (component) {
      switch (component) {
        case "chips":
          this.importChipStylesAndSymbols();
          break;
        case "dialogs":
          this.importDialogStylesAndSymbols();
          break;
        case "snackbars":
          this.importSnackBarStylesAndSymbols();
          break;
        case "tables":
          this.importTableStylesAndSymbols();
          break;
        case "inktip":
          this.importInkTipStyles();
          break;
        case "button":
          this.importButtonStyles();
          break;
        case 'elevation':
          this.importElevationStyles(args);
          break;
        case "forms":
          this.importFormFieldsSymbols(args);
          break;
        case "form-styles":
          this.importFormStyles();
          break;
        case "export":
          this.export();
          break;
      }
    }
  },

  importFormFieldsSymbols: function(symbolName) {
    this.importSymbols('forms', symbolName, false);
  },

  importFormStyles: function() {
    var styles = {
      layerStyles: ['Forms/Light/Line'],
      textStyles: ['Forms/Light/Label']
    };

    var formsPath = this.resources + '/forms.sketch';
    var formsUrl = NSURL.fileURLWithPath(formsPath);

    MD.importSharedStyles(formsUrl, [], true);
  },

  importSnackBarStylesAndSymbols: function() {
    var styles = {
      layerStyles: ['…toast-bg'],
      textStyles: ['…toast-content', '…toast-button']
    }

    var toastPath = this.resources + '/toasts.sketch';
    var toastUrl = NSURL.fileURLWithPath(toastPath);

    // this.importSymbols('toasts', ['dialog/actions'], false);
    this.importSharedStyles(toastUrl, styles);
  },

  importDialogStylesAndSymbols: function () {
    var styles = {
      layerStyles: ['…dialog-bg-light', '…button-flat-bg'],
      textStyles: ['…dialog-title', '…dialog-content', '…button-text-primary']
    }

    var dialogsPath = this.resources + '/dialogs.sketch';
    var dialogsUrl = NSURL.fileURLWithPath(dialogsPath);
    this.importSharedStyles(dialogsUrl, styles);
    this.importSymbols('dialogs', ['dialog/actions'], false);
  },

  importChipStylesAndSymbols: function () {
    this.importSymbols('chips', ['mat/chip/icon/light/remove', 'mat/chip/icon/dark/remove'])
  },

  importTableStylesAndSymbols: function () {
    this.importSymbols('icons', ['Forms/checkbox/unchecked/16']);
    this.importSymbols('tables', ['…table-pagination']);
  },

  importButtonStyles: function () {
    var buttonsPath = this.resources + '/buttons.sketch';
    var buttonsUrl = NSURL.fileURLWithPath(buttonsPath);
    var styles = {
      layerStyles: ['…button-flat-bg', '…button-flat-pressed-bg', '…button-raised-bg', '…button-raised-pressed-bg', '…button-raised-disabled-bg', '…button-flat-disabled-bg'],
      textStyles: ['…button-text-primary', '…button-text-light', '…button-text-disabled']
    }
    this.importSharedStyles(buttonsUrl, styles);
  },

  /**
   * Imports a shared style to the document if its not already present.
   *
   * @param {string} name - Layer style name of the elevation that you want to import
   */
  importElevationStyles: function (name) {
    var shadowsPath = this.resources + '/elevation.sketch';
    var elevationUrl = NSURL.fileURLWithPath(shadowsPath);
    var styles = {
      layerStyles: [name],
    }
    this.importSharedStyles(elevationUrl, styles);
  },

  importInkTipStyles: function () {
    var filePath = this.resources + '/' + 'tooltips' + '.sketch',
      filePathUrl = NSURL.fileURLWithPath(filePath);

    var styles = {
      layerStyles: ['…inktip-bg', '…inktip-bg-mini'],
      textStyles: ['…inktip-text', '…inktip-text-mini']
    }

    this.importSharedStyles(filePathUrl, styles);
  },

  /**
   * Return an object with removing the existing text and layer styles from a list.
   * This will avoid re-importing the style again from the source file.
   *
   * @param {object} styles
   */
  removeExistingStyleNamesFromList: function (styles) {
    var layerStyles = this.documentData.layerStyles(),
      textStyles = this.documentData.layerTextStyles(),
      result = {
        layerStyles: [],
        textStyles: []
      };

    if (styles.layerStyles) {
      for (var i = 0; i < styles.layerStyles.length; i++) {
        var style = this.find({
          key: "(name != NULL) && (name == %@)",
          match: styles.layerStyles[i]
        }, layerStyles);
        if (!style) {
          result.layerStyles.push(styles.layerStyles[i]);
        }
      }
    }

    if (styles.textStyles) {
      for (var i = 0; i < styles.textStyles.length; i++) {
        var style = this.find({
          key: "(name != NULL) && (name == %@)",
          match: styles.textStyles[i]
        }, textStyles);
        if (!style) {
          result.textStyles.push(styles.textStyles[i]);
        }
      }
    }

    return result;
  },

  /**
   * Imports the different sketch resources to the document
   *
   * @param {NSURL} url
   */
  importResources: function (url, values) {

    var symbolsToBeImported = [];
    for (var i = 0; i < values.length; i++) {
      if (!this.findSymbolByName(values[i])) {
        symbolsToBeImported.push(values[i]);
      }
    }

    if (symbolsToBeImported.length <= 0) {
      return;
    }

    var sourceDoc = MSDocument.new();
    var newDoc = sourceDoc.readFromURL_ofType_error(url, "com.bohemiancoding.sketch.drawing", nil);
    var symbolsPage = this.document.documentData().symbolsPageOrCreateIfNecessary();

    if (newDoc) {
      var sourceSymbols = sourceDoc.documentData().allSymbols();
      var addCount = 0;

      var loopSymbolMasters = sourceDoc.documentData().allSymbols().objectEnumerator();
      var symbolMaster;
      while (symbolMaster = loopSymbolMasters.nextObject()) {
          if (this.findInJsArray(symbolMaster.name(), symbolsToBeImported)) {
              MD.importSingleSymbol(symbolMaster, symbolsPage);
          }
      }
    }
  },


archiveDataFromSketchObject: function(object, options) {
  if (options && options.includeDependencies) {
    if (!options.document) {
      throw 'Options must include "document" when "includeDependencies" is true';
    }
    const documentData = options.document.documentData();
    const reader = MSPasteboardLayersReaderWriter.new();
    const symbols = reader.usedSymbolsInContainer_document(
      MSLayerArray.arrayWithLayer(object),
      documentData
    );
    object = NSDictionary.dictionaryWithDictionary({
      layers: [object.immutableModelObject()],
      symbols: symbols
    });
  }

  const immutableObject = object.immutableModelObject();
  return MSJSONDataArchiver.new().archivedDataWithRootObject_error(immutableObject, null);
},

sketchObjectFromArchiveData: function(archiveData) {
  if (archiveData.bytes) {
    /*
    var unarchiver = MSJSONDataUnarchiver.alloc().initForReadingWithData(archiveData);
    var object = unarchiver.decodeRoot();
    */
    var jsonString = NSString.alloc().initWithData_encoding(archiveData, NSUTF8StringEncoding);
    var object = MSJSONDataUnarchiver.unarchiveObjectWithString_asVersion_corruptionDetected_error(
      jsonString,
      999,
      null,
      null
    );

    if (object) {
      if (object.className() == 'MSArchiveHeader') {
        return object.root();
      } else {
        return object;
      }
    } else {
      return MSKeyedUnarchiver.unarchiveObjectWithData(archiveData);
    }

  } else {
    // Object has already been unarchived.
    return archiveData;
  }
},



  importSingleSymbol: function (symbol, symbolsPage) {

      var clonedSymbol = symbol.copy();
      var rect = clonedSymbol.rect();

      var targetSymbols = this.document.documentData().allSymbols();

      if (this.findSymbol(targetSymbols, symbol)) {
        return;
      }

      var symbolChildren = symbol.children();

      var loopChildren = symbolChildren.objectEnumerator();
      var child;

      while (child = loopChildren.nextObject()) {
        if (child.class() == "MSSymbolInstance") {
          MD.importSingleSymbol(child.symbolMaster(), symbolsPage);
        }
        MD.fixStyles(child);
      }

      targetSymbols = this.document.documentData().allSymbols();

      if (targetSymbols.length > 0) {
        var lastTargetSymbol = targetSymbols[targetSymbols.count() - 1];
        var lastTargetSymbolRect = lastTargetSymbol.rect();
        rect.origin.x = 0;
        rect.origin.y = lastTargetSymbolRect.origin.y + lastTargetSymbolRect.size.height + 25;
        symbol.rect = rect;
      } else {
        rect.origin.x = 0;
        rect.origin.y = rect.origin.y + rect.size.height + 25;
        symbol.rect = rect;
      }


    symbolsPage.addLayers([symbol]);

  },

  fixStyles: function(layer) {
    if(layer.class() == 'MSTextLayer') {

      var sharedStyle = layer.sharedObject();

      log("shared style....");

      if(sharedStyle) {
        var sharedStyleName = sharedStyle.name();
        layer.setStyle(MD.sharedTextStyle(sharedStyleName));
      }
    }
  },

  /**
   * Imports the shared styles to the document
   *
   * @param {NSURL} url
   * @param {object} styles a javascript obj containing layerStyles and textStyles
   */
  importSharedStyles: function (url, styles, all) {

    styles = this.removeExistingStyleNamesFromList(styles);

    if ((styles.layerStyles.length < 1 && styles.textStyles.length < 1) && !all) {
      return;
    }

    var sourceDoc = MSDocument.new(),
      newDoc = sourceDoc.readFromURL_ofType_error(url, "com.bohemiancoding.sketch.drawing", nil),
      name = '';

    if (newDoc) {
      var layerStyles = sourceDoc.documentData().layerStyles(),
        textStyles = sourceDoc.documentData().layerTextStyles();

      var docLayerStyles = this.documentData.layerStyles(),
        docTextStyles = this.documentData.layerTextStyles();

      if(all) {
        var layerStyleCount = layerStyles.numberOfSharedStyles();

        for(var i = 0; i < layerStyleCount; i++) {
          var style = layerStyles.sharedStyleAtIndex(i);
          var findLayerStyle = this.find({
            key: "(name != NULL) && (name == %@)",
            match: style.name()
          }, docLayerStyles);

          if(findLayerStyle == 0) {
            docLayerStyles.addSharedStyleWithName_firstInstance(style.name(), style.style());
          }
        }

        var textStyleStyleCount = textStyles.numberOfSharedStyles();
        for(var i = 0; i < textStyleStyleCount; i++) {
          var style = textStyles.sharedStyleAtIndex(i);

          var findTextStyle = this.find({
            key: "(name != NULL) && (name == %@)",
            match: style.name()
          }, docTextStyles);

          // log(style.name() + " — " + style.objectID());

          if(findTextStyle == 0) {
            docTextStyles.addSharedStyleWithName_firstInstance(style.name(), style.style());
          }
        }
        return;
      }

      // Check if there are any layer styles to be copied
      if (styles.layerStyles) {
        for (var i = 0; i < styles.layerStyles.length; i++) {
          var style = this.find({
            key: "(name != NULL) && (name == %@)",
            match: styles.layerStyles[i]
          }, layerStyles);
          this.documentData.layerStyles().addSharedStyleWithName_firstInstance(styles.layerStyles[i], style.style());
        }
      }

      // Check if there are any text styles to be copied
      if (styles.textStyles) {
        for (var i = 0; i < styles.textStyles.length; i++) {
          var style = this.find({
            key: "(name != NULL) && (name == %@)",
            match: styles.textStyles[i]
          }, textStyles);
          this.documentData.layerTextStyles().addSharedStyleWithName_firstInstance(styles.textStyles[i], style.style());
        }
      }

    }
  },

  /**
   *
   */
  importSymbols: function (name, values, isRemote) {
    var symbolFilePath = this.resources + '/' + name + '.sketch';
    var symbolFilePathUrl = NSURL.fileURLWithPath(symbolFilePath);

    var sourceDoc = MSDocument.new();
    var newDoc = sourceDoc.readFromURL_ofType_error(symbolFilePathUrl, "com.bohemiancoding.sketch.drawing", nil);

    var urlData;

    if (isRemote && !newDoc) {
      symbolFilePath = "http://localhost:8080/static/sketch/" + this.resources  + '/' + name + '.sketch';
      symbolFilePathUrl = NSURL.URLWithString(symbolFilePath);
      urlData = NSData.dataWithContentsOfURL(symbolFilePathUrl);

      if (urlData) {
        var filePath = this.resources + '/' + name + '.sketch';
        urlData.writeToFile_atomically(filePath, true);
        symbolFilePath = this.resources + '/' + name + '.sketch';
      }
    }

    this.importResources(symbolFilePathUrl, values);
  }

});
