import MochaJSDelegate from "../utils/global/mocha-js-delegate";
import firstMouseAcceptor from "../utils/global/first-mouse";
import Icons from "../components/icons";
import Colors from "../components/color";
import Type from "../components/type";
import Elevation from "../components/elevations";
import FakeData from "../components/data";
import Metadata from "../components/metadata";
import Components from '../components/components';

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
      frame = NSMakeRect(0, 0, options.width, options.height + 24),
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

    // threadDictionary[this.options.identifier] = this;

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

    this.webView = webView;
    this.windowObject = windowObject;

    const delegate = new MochaJSDelegate({
      "webView:didChangeLocationWithinPageForFrame:": function (
        webView,
        webFrame
      ) {
        const request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

        if (request) {

          if (request == "onWindowDidBlur") {
            firstMouseAcceptor(webView, contentView);
          }

          const sketchData = JSON.parse(
            decodeURI(windowObject.valueForKey("_sketch_data"))
          );

          if (request == "drag-end") {
            Icons.convertSvgToSymbol(sketchData);
          }

          if (request == 'componentDragFinish') {
            Components().convertImgToLayer(sketchData);
          }

          if (request == "applyColor") {
            Colors().applyColor(sketchData);
          }

          if (request == "addGlobalSymbols") {
            Colors().addGlobalSymbols(sketchData);
          }

          if (request == "addGlobalColors") {
            Colors().addGlobalColors(sketchData);
          }

          if (request == "pickColor") {
            Colors().pickColor(webView, sketchData);
          }

          if (request == "applyStyles") {
            Type.applyTypographyStyles(sketchData);
          }

          if (request == "applyFakeData") {
            FakeData.applyFakeData(sketchData);
          }

          if (request == "applyElevations") {
            Elevation.applyElevation(sketchData);
          }

          if (request == "updateLayerMetadata") {
            Metadata.updateLayerMetadata(sketchData);
          }
        }

        windowObject.evaluateWebScript("window.location.hash = '';");
      }
    });

    webView.setFrameLoadDelegate_(delegate.getClassInstance());

    closeButton.setCOSJSTargetFunction(function (sender) {
      self.wantsStop = true;
      Panel.close();

      if (options.identifier) {
        threadDictionary.removeObjectForKey(options.identifier);
        fiber.cleanup();
      }
    });
    closeButton.setAction("callAction:");

    closeButton.setFrameOrigin(NSMakePoint(8, 0));
    titlebarContainerView.setFrame(
      NSMakeRect(0, options.height, options.width, 24)
    );
    titlebarView.setFrameSize(NSMakeSize(options.width, 24));
    titlebarView.setTransparent(true);
    titlebarView.setBackgroundColor(titleBgColor);
    titlebarContainerView.superview().setBackgroundColor(titleBgColor);
  }
}
