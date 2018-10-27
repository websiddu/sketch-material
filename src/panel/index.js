import MochaJSDelegate from "./mocha-js-delegate";
import firstMouseAcceptor from './first-mouse';
import Icons from '../components/icons';
import Colors from '../components/color'

export class MDPanel {
  constructor(options) {
    const defaultOptions = {
      url: "https://google.com",
      width: 320,
      height: 512,
      identifier: "com.google.material.gsid"
    };

    this.options = Object.assign({}, defaultOptions, options);
    this.initilize(this.options);
  }

  initilize(options) {
    const Panel = NSPanel.alloc().init(),
      colorWhite = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1),
      frame = NSMakeRect(0, 0, options.width, options.height + 32),
      titleBgColor = colorWhite,
      contentBgColor = colorWhite,
      threadDictionary = NSThread.mainThread().threadDictionary(),
      fiber = coscript.createFiber(),
      webViewRect = NSMakeRect(0, 0, this.options.width, this.options.height),
      contentView = Panel.contentView(),
      webView = WebView.alloc().initWithFrame(webViewRect),
      closeButton = Panel.standardWindowButton(NSWindowCloseButton),
      titlebarView = contentView
        .superview()
        .titlebarViewController()
        .view(),
      titlebarContainerView = titlebarView.superview();

    threadDictionary[this.options.identifier] = Panel;

    Panel.setTitleVisibility(NSWindowTitleHidden);
    Panel.setTitlebarAppearsTransparent(true);
    Panel.standardWindowButton(NSWindowCloseButton).setHidden(false);
    Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
    Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
    Panel.setFrame_display(frame, true);
    Panel.setBackgroundColor(contentBgColor);
    Panel.setWorksWhenModal(true);

    Panel.center();
    Panel.makeKeyAndOrderFront(nil);

    Panel.becomeKeyWindow();
    Panel.setLevel(NSFloatingWindowLevel);

    contentView.setWantsLayer(true);
    contentView.layer().setFrame(contentView.frame());

    webView.setBackgroundColor(contentBgColor);
    webView.setMainFrameURL_(options.url);
    contentView.addSubview(webView);
    const windowObject = webView.windowScriptObject();

    const delegate = new MochaJSDelegate({
      "webView:didChangeLocationWithinPageForFrame:": function(
        webView,
        webFrame
      ) {
        const request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

        if (request == 'onWindowDidBlur') {
          firstMouseAcceptor(webView, contentView);
        }

        if(request == 'drag-end') {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("draggedIcon")));
          Icons.convertSvgToSymbol(data);
        }

        if (request == 'applyColor') {
          var data = JSON.parse(decodeURI(windowObject.valueForKey("appliedColor")));
          Colors().applyColor(data);
        }

        windowObject.evaluateWebScript("window.location.hash = '';");
      }
    });

    webView.setFrameLoadDelegate_(delegate.getClassInstance());

    closeButton.setCOSJSTargetFunction(function(sender) {
      self.wantsStop = true;
      Panel.close();

      if (options.identifier) {
        threadDictionary.removeObjectForKey(options.identifier);
        fiber.cleanup();
      }
    });
    closeButton.setAction("callAction:");

    closeButton.setFrameOrigin(NSMakePoint(8, 8));
    titlebarContainerView.setFrame(
      NSMakeRect(0, options.height, options.width, 32)
    );
    titlebarView.setFrameSize(NSMakeSize(options.width, 32));
    titlebarView.setTransparent(true);
    titlebarView.setBackgroundColor(titleBgColor);
    titlebarContainerView.superview().setBackgroundColor(titleBgColor);


  }
}
