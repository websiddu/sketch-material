// Panel.js
MD.extend({

  initFramework: function (context, frameworkName) {
    var pluginRoot = this.resources;
    // pluginRoot = "/Users/gsid/Library/Developer/Xcode/DerivedData/SketchMaterial-eahwwljnpwksktbwjkaseorocgxl/Build/Products/Debug";

    var mocha = [Mocha sharedRuntime];
    if (NSClassFromString(frameworkName) == null) {
      if (![mocha loadFrameworkWithName:frameworkName inDirectory:pluginRoot]) {
        log('An error ocurred while loading the SketchSlides Framework.');
        return;
      }
    }
    return ServiceManager.alloc().init();
  },

  createCocoaObject: function (methods, superclass) {
    var uniqueClassName = "MD.sketch_" + NSUUID.UUID().UUIDString();
    var classDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject);
    classDesc.registerClass();
    for (var selectorString in methods) {
      var selector = NSSelectorFromString(selectorString);
      [classDesc addInstanceMethodWithSelector:selector function:(methods[selectorString])];
    }
    return NSClassFromString(uniqueClassName).new();
  },

  addFirstMouseAcceptor: function (webView, contentView) {
    var button = this.createCocoaObject({
      'mouseDown:': function (evt) {
        // Remove this view. Subsequent events such the mouseUp event that will
        // probably immediately follow mouseDown or any other mouse events will
        // be handled as if this view is not here because it will not be here!
        this.removeFromSuperview();

        // Now send the same mouseDown event again as if the user had just
        // clicked. With the button gone, this will be handled by the WebView.
        NSApplication.sharedApplication().sendEvent(evt);
      },
    }, NSButton);

    button.setIdentifier('firstMouseAcceptor');
    button.setTransparent(true);
    button.setTranslatesAutoresizingMaskIntoConstraints(false);

    contentView.addSubview(button);

    var views = {
      button: button,
      webView: webView
    };

    // Match width of WebView.
    contentView.addConstraints([NSLayoutConstraint
            constraintsWithVisualFormat:'H:[button(==webView)]'
            options:NSLayoutFormatDirectionLeadingToTrailing
            metrics:null
            views:views]);

    // Match height of WebView.
    contentView.addConstraints([NSLayoutConstraint
            constraintsWithVisualFormat:'V:[button(==webView)]'
            options:NSLayoutFormatDirectionLeadingToTrailing
            metrics:null
            views:views]);

    // Match top of WebView.
    contentView.addConstraints([[NSLayoutConstraint
            constraintWithItem:button attribute:NSLayoutAttributeTop
            relatedBy:NSLayoutRelationEqual toItem:webView
            attribute:NSLayoutAttributeTop multiplier:1 constant:0]]);
  },

  MDPanel: function (options) {
    var self = this,
      threadDictionary,
      options = this.extend(options, {
        url: this.pluginSketch + "/panel/chips.html",
        width: 240,
        height: 316,
        floatWindow: false,
        hiddenClose: false,
        data: {},
        callback: function (data) { return data; }
      }),
      result = false;

    if (!options.remote) {
      options.url = encodeURI("file://" + options.url);
    }

    var frame = NSMakeRect(0, 0, options.width, (options.height + 32)),
      titleBgColor = NSColor.colorWithRed_green_blue_alpha(63 / 255, 81 / 255, 181 / 255, 1),
      contentBgColor = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1);

    if (options.identifier) {
      threadDictionary = NSThread.mainThread().threadDictionary();
      if(threadDictionary[options.identifier]) {
        COScript.currentCOScript().setShouldKeepAround_(true);
        return;
      }
    }

    var Panel = NSPanel.alloc().init();

    // var Panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(frame, 31, 2, 'YES');
    Panel.setTitleVisibility(NSWindowTitleHidden);
    Panel.setTitlebarAppearsTransparent(true);
    Panel.standardWindowButton(NSWindowCloseButton).setHidden(options.hiddenClose);
    Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
    Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
    Panel.setFrame_display(frame, true);
    Panel.setBackgroundColor(contentBgColor);
    Panel.setWorksWhenModal(true);

    if (options.floatWindow) {
      Panel.becomeKeyWindow();
      Panel.setLevel(NSFloatingWindowLevel);
      threadDictionary[options.identifier] = Panel;
      // Long-running script
      COScript.currentCOScript().setShouldKeepAround_(true);
    }

    var contentView = Panel.contentView(),
      webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, options.width, options.height));

    var windowObject = webView.windowScriptObject();

    contentView.setWantsLayer(true);
    contentView.layer().setFrame(contentView.frame());
    // contentView.layer().setCornerRadius(6);
    // contentView.layer().setMasksToBounds(true);

    webView.setBackgroundColor(contentBgColor);
    webView.setMainFrameURL_(options.url);
    contentView.addSubview(webView);

    var delegate = new MochaJSDelegate({
      "webView:didFinishLoadForFrame:": (function (webView, webFrame) {
        var MDAction = [
          "function MDAction(hash, data) {",
            "if(data){ window.MDData = encodeURI(JSON.stringify(data)); }",
            "window.location.hash = hash;",
          "}"
        ].join(""),
          DOMReady = [
            "$(", "function(){", "init(" + JSON.stringify(options.data) + ")", "}",");"
          ].join("");

        if (!options.remote) {
          windowObject.evaluateWebScript(MDAction);
          windowObject.evaluateWebScript(DOMReady);
        }

      }),
      "webView:didChangeLocationWithinPageForFrame:": (function (webView, webFrame) {
        var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

        if (request == "submit") {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("MDData")));
          options.callback(data);
          result = true;
          if (!options.floatWindow) {
            windowObject.evaluateWebScript("window.location.hash = 'close';");
          }
        }

        if (request == 'drag-end') {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("draggedIcon")));
          MD.Importer().convertSvgToSymbol(data);
          result = true;
        }

        if (request == 'changeLink') {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("currentLink")));
          MD.openURL(data);
        }

        if(request == 'applyStyles') {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("appliedStyles")));
          MD.Typography().applyTypographyStyles(data);
        }

        if(request == 'applyColor') {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("appliedColor")));
          MD.Color().applyColor(data);
        }

        if (request == 'onWindowDidBlur') {
          MD.addFirstMouseAcceptor(webView, contentView);
        }

        if (request == 'fetchUser') {
          MD.frameWork.userInfo(webView);
        }

        if (request == 'signIn') {
          MD.frameWork.signIn(webView);
        }

        if (request == 'signOut') {
          MD.frameWork.signOut(webView);
        }

        if (request == 'LogInSuccess') {
          MD['frameWork'] = MD.initFramework(MD.context, 'SketchMaterial');
          windowObject.evaluateWebScript("window.location.href = 'imagery';");
        }

        if (request == 'getSubFolders') {
          MD.frameWork.subFolders_webView('0B8xcNpJXhd2WMmg4cXc2aVpOV2c', webView);
        }

        if (request.startsWith('searchImages__')) {
          var search = JSON.parse(decodeURI(windowObject.valueForKey("currentSearch")));
          MD.frameWork.searchImages_nextPageToken_webView(search.query, search.pageToken, webView);
        }

        if(request.startsWith('loadImages__') > 0) {
          var folderId = request.replace('loadImages__', '');
          var folder = JSON.parse(decodeURI(windowObject.valueForKey("currentFolder")));
          MD.frameWork.getFiles_commitFunction_nextPageToken_webView(folder.folderId, 'saveImages', folder.pageToken, webView);
        }

        if(request == 'insertImage') {
          var photo = JSON.parse(decodeURI(windowObject.valueForKey("currentPhoto")));
          MD.Imagery().insertImages(photo);
        }

        if(request == 'feelingLucky') {
          var photos = JSON.parse(decodeURI(windowObject.valueForKey("shuffledPhotosObj")));
          MD.Imagery().insertImages(photos);
        }

        if(request.startsWith('loadFiles__') > 0) {
          var folderId = request.replace('loadFiles__', '');
          MD.frameWork.getFiles_webView(folderId, webView);
        }

        if(request == 'getLibraryFiles') {
          MD.Library().checkLoadedLibraries(webView);
          MD.frameWork.getFiles_commitFunction_webView('0B8xcNpJXhd2WQ3k4YUJ3MmFSWWs', 'saveLibraryFiles', webView);
        }

        if(request == 'downloadFile') {
          var file = JSON.parse(decodeURI(windowObject.valueForKey("downloadFile")));
          MD.Library().downloadFile(file);
        }

        if(request == 'downloadComplete') {
          var file = JSON.parse(decodeURI(windowObject.valueForKey("downloadFile")));
          MD.Library().handleDownloadComplete(file);
        }

        if(request == 'toggleFileState') {
          var file = JSON.parse(decodeURI(windowObject.valueForKey("toggleFileState")));
          MD.Library().toggleFileState(file);
        }

        if(request == 'removeFile') {
          var file = JSON.parse(decodeURI(windowObject.valueForKey("removeFile")));
          MD.Library().removeFile(file);
        }

        if (request == "close") {
          if (!options.floatWindow) {
            Panel.orderOut(nil);
            NSApp.stopModal();
          }
          else {
            Panel.close();
          }
        }

        if (request == "focus") {
          var point = Panel.currentEvent().locationInWindow(),
            y = NSHeight(Panel.frame()) - point.y - 32;
          windowObject.evaluateWebScript("lookupItemInput(" + point.x + ", " + y + ")");
        }
        windowObject.evaluateWebScript("window.location.hash = '';");
      })
    });



    webView.setFrameLoadDelegate_(delegate.getClassInstance());
    // NSButton already returns YES for -acceptsFirstMouse: so all we need to do
    // is handle the mouseDown event.
    if (options.floatWindow) {
      Panel.center();
      Panel.makeKeyAndOrderFront(nil);
    }

    var closeButton = Panel.standardWindowButton(NSWindowCloseButton);
    closeButton.setCOSJSTargetFunction(function (sender) {
      var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

      if (options.floatWindow && request == "submit") {
        data = JSON.parse(decodeURI(windowObject.valueForKey("MDData")));
        options.callback(data);
      }

      if (options.identifier) {
        threadDictionary.removeObjectForKey(options.identifier);
      }

      self.wantsStop = true;
      if (options.floatWindow) {
        Panel.close();
      }
      else {
        Panel.orderOut(nil);
        NSApp.stopModal();
      }

    });
    closeButton.setAction("callAction:");

    var titlebarView = contentView.superview().titlebarViewController().view(),
      titlebarContainerView = titlebarView.superview();
    closeButton.setFrameOrigin(NSMakePoint(8, 8));
    titlebarContainerView.setFrame(NSMakeRect(0, options.height, options.width, 32));
    titlebarView.setFrameSize(NSMakeSize(options.width, 32));
    titlebarView.setTransparent(true);
    titlebarView.setBackgroundColor(titleBgColor);
    titlebarContainerView.superview().setBackgroundColor(titleBgColor);

    if (!options.floatWindow) {
      NSApp.runModalForWindow(Panel);
    }

    MD.webView = webView;

    return result;
  },

  chipsPanel: function () {
    var self = this,
      data = {};

    // data.placements = (this.configs.spacings && this.configs.spacings.placements)? this.configs.spacings.placements: ["top", "left"];
    // if(this.configs.spacings && this.configs.spacings.byPercentage) data.byPercentage = this.configs.spacings.byPercentage;

    return this.MDPanel({
      url: this.pluginSketch + "/panel/chips.html",
      width: 800,
      height: 600,
      data: data,
      callback: function (data) {
        self.configs = self.setConfigs({
          chips: data
        });
      }
    });
  },
  tablePanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      url: this.pluginSketch + "/panel/table.html",
      width: 980,
      height: 700,
      data: data,
      identifier: 'com.websiddu.material.table',
      floatWindow: false,
      callback: function (data) {
        self.configs = self.setConfigs({
          table: data
        });
      }
    });
  },

  dialogsPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      url: this.baseUrl + "/dialogs",
      remote: true,
      width: 850,
      height: 680,
      data: data,
      identifier: 'com.websiddu.material.dialogs',
      floatWindow: false,
      callback: function (dataFromWebView) {
        MD.dialogsData = dataFromWebView;
      }
    });
  },

  menuPanel: function() {
    var self = this,
    data = {};

    return this.MDPanel({
      url: this.baseUrl + "/menu",
      remote: true,
      width: 850,
      height: 580,
      data: data,
      identifier: 'com.websiddu.material.menu',
      floatWindow: false,
      callback: function (dataFromWebView) {
        MD.menuData = dataFromWebView;
      }
    });
  },

  snackBarsPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      url: this.baseUrl + "/snackbars",
      // url: "http://localhost:8031/snackbars",
      remote: true,
      width: 850,
      height: 450,
      data: data,
      identifier: 'com.websiddu.material.snackbars',
      floatWindow: false,
      callback: function (dataFromWebView) {
        MD.snackbarsData = dataFromWebView;
      }
    });
  },

  librariesPanel: function (isAuthorized) {
    var self = this,
      data = {};

    var url = isAuthorized ? "libraries" : "login";

    return this.MDPanel({
      // url: "http://0.0.0.0:8031/color",
      // url: this.baseUrl + "/color",
      url: 'http://0.0.0.0:8031/' + url,
      remote: true,
      width: 376,
      height: 615,
      data: data,
      identifier: 'com.websiddu.material.libraries',
      floatWindow: true,
      callback: function (dataFromWebView) {
        MD.librariesData = dataFromWebView;
      }
    });
  },

  imageryPanel: function (isAuthorized) {
    var self = this,
      data = {};

    var url = isAuthorized ? "/imagery" : "/login";

    return this.MDPanel({
      url: 'http://0.0.0.0:8031' + url,
      // url: this.baseUrl + url,
      remote: true,
      width: 376,
      height: 615,
      data: data,
      identifier: 'com.websiddu.material.imagery',
      floatWindow: true,
      callback: function (dataFromWebView) {
        MD.imageryData = dataFromWebView;
      }
    });
  },

  colorPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      // url: "http://0.0.0.0:8031/color",
      url: this.baseUrl + "/color",
      // url: 'http://0.0.0.0:8080/',
      remote: true,
      width: 376,
      height: 615,
      data: data,
      identifier: 'com.websiddu.material.color',
      floatWindow: true,
      callback: function (dataFromWebView) {
        MD.colorData = dataFromWebView;
      }
    });
  },

  typographyPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      // url: "http://localhost:8031/styles",
      url: this.baseUrl + "/styles",
      remote: true,
      width: 500,
      height: 600,
      data: data,
      identifier: 'com.websiddu.material.typography',
      floatWindow: true,
      callback: function (dataFromWebView) {
        MD.typographyData = dataFromWebView;
      }
    });
  },


  formsPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      // url: "http://localhost:8031/forms",
      url: this.baseUrl + "/forms",
      remote: true,
      width: 1000,
      height: 650,
      data: data,
      identifier: 'com.websiddu.material.forms',
      floatWindow: false,
      callback: function (dataFromWebView) {
        MD.formsData = dataFromWebView;
      }
    });
  },


  importerPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      // url: this.pluginSketch + "/panel/importer/index.html",
      url: this.baseUrl + "/icons",
      remote: true,
      width: 300,
      height: 500,
      data: data,
      identifier: 'com.websiddu.material.icons',
      floatWindow: true,
      callback: function (data) {
        // self.configs = self.setConfigs({
        // table: data
        // });
      }
    });
  },

  resourcesPanel: function () {
    var self = this,
      data = {};

    this.MDPanel({
      url: this.pluginSketch + "/panel/resources/index.html",
      width: 600,
      height: 500,
      data: data,
      identifier: 'com.websiddu.material.resources',
      floatWindow: true,
      callback: function (data) {
        // self.configs = self.setConfigs({
        // table: data
        // });
      }
    });
  }

});
