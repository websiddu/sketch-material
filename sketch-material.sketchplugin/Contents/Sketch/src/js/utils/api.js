// api.js
MD.extend({
  is: function (layer, theClass) {
    if (!layer) return false;
    var klass = layer.class();
    return klass === theClass;
  },
  addGroup: function () {
    return MSLayerGroup.new();
  },
  addShape: function () {
    var shape = MSRectangleShape.alloc().initWithFrame(NSMakeRect(0, 0, 100, 100));
    return MSShapeGroup.shapeWithPath(shape);
  },
  addText: function (container, string) {
    var text = MSTextLayer.new();
    text.setStringValue(string || 'Text');
    return text;
  },
  removeLayer: function (layer) {
    var container = layer.parentGroup();
    if (container) container.removeLayer(layer);
  },
  setRadius: function (layer, radius) {
    layer.layers().firstObject().setCornerRadiusFromComponents(radius);
  },
  getGroupRect: function (group) {
    var rect = group.groupBoundsForLayers();
    return {
      x: Math.round(rect.x()),
      y: Math.round(rect.y()),
      width: Math.round(rect.width()),
      height: Math.round(rect.height()),
      maxX: Math.round(rect.x() + rect.width()),
      maxY: Math.round(rect.y() + rect.height()),
      setX: function (x) { rect.setX(x); this.x = x; this.maxX = this.x + this.width; },
      setY: function (y) { rect.setY(y); this.y = y; this.maxY = this.y + this.height; },
      setWidth: function (width) { rect.setWidth(width); this.width = width; this.maxX = this.x + this.width; },
      setHeight: function (height) { rect.setHeight(height); this.height = height; this.maxY = this.y + this.height; }
    };
  },
  getRect: function (layer) {
    var rect = layer.frame();
    return {
      x: Math.round(rect.x()),
      y: Math.round(rect.y()),
      width: Math.round(rect.width()),
      height: Math.round(rect.height()),
      maxX: Math.round(rect.x() + rect.width()),
      maxY: Math.round(rect.y() + rect.height()),
      setX: function (x) { rect.setX(x); this.x = x; this.maxX = this.x + this.width; },
      setY: function (y) { rect.setY(y); this.y = y; this.maxY = this.y + this.height; },
      setWidth: function (width) { rect.setWidth(width); this.width = width; this.maxX = this.x + this.width; },
      setHeight: function (height) { rect.setHeight(height); this.height = height; this.maxY = this.y + this.height; },
      setConstrainProportions: function(val) { rect.setConstrainProportions(val); }
    };
  },
  getCenterOfViewPort: function () {

    var midX, midY;

    if(MD.artboard) {
      midX = MD.getRect(MD.artboard).width/2;
      midY = MD.getRect(MD.artboard).height/2;
    } else {
      var contentDrawView = MD.document.currentView();
      midX = Math.round((contentDrawView.frame().size.width/2 - contentDrawView.horizontalRuler().baseLine())/contentDrawView.zoomValue());
      midY = Math.round((contentDrawView.frame().size.height / 2 - contentDrawView.verticalRuler().baseLine()) / contentDrawView.zoomValue());
    }

    return {
      x: midX,
      y: midY
    }
  },
  toNopPath: function (str) {
    return this.toJSString(str).replace(/[\/\\\?]/g, " ");
  },
  toHTMLEncode: function (str) {
    return this.toJSString(str)
      .replace(/\</g, "&lt;")
      .replace(/\>/g, '&gt;')
      .replace(/\'/g, "&#39;")
      .replace(/\"/g, "&quot;")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
      .replace(/\ud83c|\ud83d/g, "")
      ;
    // return str.replace(/\&/g, "&amp;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\</g, "&lt;").replace(/\>/g, '&gt;');
  },
  emojiToEntities: function (str) {
    var emojiRanges = [
      "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
      "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
      "\ud83d[\ude80-\udeff]"  // U+1F680 to U+1F6FF
    ];
    return str.replace(
      new RegExp(emojiRanges.join("|"), "g"),
      function (match) {
        var c = encodeURIComponent(match).split("%"),
          h = ((parseInt(c[1], 16) & 0x0F))
            + ((parseInt(c[2], 16) & 0x1F) << 12)
            + ((parseInt(c[3], 16) & 0x3F) << 6)
            + (parseInt(c[4], 16) & 0x3F);
        return "&#" + h.toString() + ";";
      });
  },
  toSlug: function (str) {
    return this.toJSString(str)
      .toLowerCase()
      .replace(/(<([^>]+)>)/ig, "")
      .replace(/[\/\+\|]/g, " ")
      .replace(new RegExp("[\\!@#$%^&\\*\\(\\)\\?=\\{\\}\\[\\]\\\\\\\,\\.\\:\\;\\']", "gi"), '')
      .replace(/\s+/g, '-')
      ;
  },
  toJSString: function (str) {
    return new String(str).toString();
  },
  toJSNumber: function (str) {
    return Number(this.toJSString(str));
  },
  pointToJSON: function (point) {
    return {
      x: parseFloat(point.x),
      y: parseFloat(point.y)
    };
  },
  rectToJSON: function (rect, referenceRect) {
    if (referenceRect) {
      return {
        x: Math.round(rect.x() - referenceRect.x()),
        y: Math.round(rect.y() - referenceRect.y()),
        width: Math.round(rect.width()),
        height: Math.round(rect.height())
      };
    }

    return {
      x: Math.round(rect.x()),
      y: Math.round(rect.y()),
      width: Math.round(rect.width()),
      height: Math.round(rect.height())
    };
  },
  colorToJSON: function (color) {
    return {
      r: Math.round(color.red() * 255),
      g: Math.round(color.green() * 255),
      b: Math.round(color.blue() * 255),
      a: color.alpha(),
      "color-hex": color.immutableModelObject().stringValueWithAlpha(false) + " " + Math.round(color.alpha() * 100) + "%",
      "argb-hex": "#" + this.toHex(color.alpha() * 255) + color.immutableModelObject().stringValueWithAlpha(false).replace("#", ""),
      "css-rgba": "rgba(" + [
        Math.round(color.red() * 255),
        Math.round(color.green() * 255),
        Math.round(color.blue() * 255),
        (Math.round(color.alpha() * 100) / 100)
      ].join(",") + ")",
      "ui-color": "(" + [
        "r:" + (Math.round(color.red() * 100) / 100).toFixed(2),
        "g:" + (Math.round(color.green() * 100) / 100).toFixed(2),
        "b:" + (Math.round(color.blue() * 100) / 100).toFixed(2),
        "a:" + (Math.round(color.alpha() * 100) / 100).toFixed(2)
      ].join(" ") + ")"
    };
  },
  colorStopToJSON: function (colorStop) {
    return {
      color: this.colorToJSON(colorStop.color()),
      position: colorStop.position()
    };
  },
  gradientToJSON: function (gradient) {
    var stopsData = [],
      stop, stopIter = gradient.stops().objectEnumerator();
    while (stop = stopIter.nextObject()) {
      stopsData.push(this.colorStopToJSON(stop));
    }

    return {
      type: GradientTypes[gradient.gradientType()],
      from: this.pointToJSON(gradient.from()),
      to: this.pointToJSON(gradient.to()),
      colorStops: stopsData
    };
  },
  shadowToJSON: function (shadow) {
    return {
      type: shadow instanceof MSStyleShadow ? "outer" : "inner",
      offsetX: shadow.offsetX(),
      offsetY: shadow.offsetY(),
      blurRadius: shadow.blurRadius(),
      spread: shadow.spread(),
      color: this.colorToJSON(shadow.color())
    };
  },
  getRadius: function (layer) {
    return (layer.layers && this.is(layer.layers().firstObject(), MSRectangleShape)) ? layer.layers().firstObject().fixedRadius() : 0;
  },
  getBorders: function (style) {
    var bordersData = [],
      border, borderIter = style.borders().objectEnumerator();
    while (border = borderIter.nextObject()) {
      if (border.isEnabled()) {
        var fillType = FillTypes[border.fillType()],
          borderData = {
            fillType: fillType,
            position: BorderPositions[border.position()],
            thickness: border.thickness()
          };

        switch (fillType) {
          case "color":
            borderData.color = this.colorToJSON(border.color());
            break;

          case "gradient":
            borderData.gradient = this.gradientToJSON(border.gradient());
            break;

          default:
            continue;
        }

        bordersData.push(borderData);
      }
    }

    return bordersData;
  },
  getFills: function (style) {
    var fillsData = [],
      fill, fillIter = style.fills().objectEnumerator();
    while (fill = fillIter.nextObject()) {
      if (fill.isEnabled()) {
        var fillType = FillTypes[fill.fillType()],
          fillData = {
            fillType: fillType
          };

        switch (fillType) {
          case "color":
            fillData.color = this.colorToJSON(fill.color());
            break;

          case "gradient":
            fillData.gradient = this.gradientToJSON(fill.gradient());
            break;

          default:
            continue;
        }

        fillsData.push(fillData);
      }
    }

    return fillsData;
  },
  getShadows: function (style) {
    var shadowsData = [],
      shadow, shadowIter = style.shadows().objectEnumerator();
    while (shadow = shadowIter.nextObject()) {
      if (shadow.isEnabled()) {
        shadowsData.push(this.shadowToJSON(shadow));
      }
    }

    shadowIter = style.innerShadows().objectEnumerator();
    while (shadow = shadowIter.nextObject()) {
      if (shadow.isEnabled()) {
        shadowsData.push(this.shadowToJSON(shaxdow));
      }
    }

    return shadowsData;
  },
  getOpacity: function (style) {
    return style.contextSettings().opacity()
  },
  getStyleName: function (layer) {
    var styles = (this.is(layer, MSTextLayer)) ? this.document.documentData().layerTextStyles() : this.document.documentData().layerStyles(),
      layerStyle = layer.style(),
      sharedObjectID = layerStyle.sharedObjectID(),
      style;

    styles = styles.objectsSortedByName();

    if (styles.count() > 0) {
      style = this.find({ key: "(objectID != NULL) && (objectID == %@)", match: sharedObjectID }, styles);
    }

    if (!style) return "";
    return this.toJSString(style.name());
  },
  updateContext: function () {
    this.context.document = NSDocumentController.sharedDocumentController().currentDocument();
    this.context.selection = this.context.document.selectedLayers();

    return this.context;
  },
  openURL: function(url){
    var nsurl = NSURL.URLWithString(url);
    NSWorkspace.sharedWorkspace().openURL(nsurl)
  }
});
