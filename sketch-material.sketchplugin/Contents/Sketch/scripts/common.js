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



MD.extend({
    prefix: "MDConfig",
    getConfigs: function(container){
        var configsData;
        if(container){
            configsData = this.command.valueForKey_onLayer(this.prefix, container);
        }
        else{
            configsData = this.UIMetadata.objectForKey(this.prefix);
        }

        return JSON.parse(configsData);
    },
     setConfigs: function(newConfigs, container){
        var configsData;
        newConfigs.timestamp = new Date().getTime();
        if(container){
            configsData = this.extend(newConfigs, this.getConfigs(container) || {});
            this.command.setValue_forKey_onLayer(JSON.stringify(configsData), this.prefix, container);
        }
        else{
            configsData = this.extend(newConfigs, this.getConfigs() || {});
            this.UIMetadata.setObject_forKey (JSON.stringify(configsData), this.prefix);
        }
        var saveDoc = this.addShape();
        this.page.addLayers([saveDoc]);
        this.removeLayer(saveDoc);
        return configsData;
    },
    removeConfigs: function(container){
        if(container){
            this.command.setValue_forKey_onLayer(null, prefix, container);
        }
        else{
            configsData = this.UIMetadata.setObject_forKey (null, this.prefix);
        }

    }
});

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

// help.js
MD.extend({
    mathHalf: function(number){
        return Math.round( number / 2 );
    },
    convertUnit: function(length, isText, percentageType){
        if(percentageType && this.artboard){
            var artboardRect = this.getRect( this.artboard );
            if (percentageType == "width") {
                 return Math.round((length / artboardRect.width) * 1000) / 10 + "%";

            }
            else if(percentageType == "height"){
                return Math.round((length / artboardRect.height) * 1000) / 10 + "%";
            }
        }

        var length = Math.round( length / this.configs.scale * 10 ) / 10,
            units = this.configs.unit.split("/"),
            unit = units[0];

        if( units.length > 1 && isText){
            unit = units[1];
        }

        return length + unit;
    },
    toHex:function(c) {
        var hex = parseInt(c, 16);
        return hex.length == 1 ? "0" + hex :hex;
    },
    hexToNSColor: function (hex, alpha) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: this.toHex(result[1])/255,
            g: this.toHex(result[2])/255,
            b: this.toHex(result[3])/255,
            a: alpha || 1
        } : null;
    },
    hexToRgb:function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: this.toHex(result[1]),
            g: this.toHex(result[2]),
            b: this.toHex(result[3])
        } : null;
    },
    isIntersect: function(targetRect, layerRect){
        return !(
            targetRect.maxX <= layerRect.x ||
            targetRect.x >= layerRect.maxX ||
            targetRect.y >= layerRect.maxY ||
            targetRect.maxY <= layerRect.y
        );
    },
    getDistance: function(targetRect, containerRect){
        var containerRect = containerRect || this.getRect(this.current);

        return {
            top: (targetRect.y - containerRect.y),
            right: (containerRect.maxX - targetRect.maxX),
            bottom: (containerRect.maxY - targetRect.maxY),
            left: (targetRect.x - containerRect.x),
        }
    },
    message: function(message){
        this.document.showMessage(message);
    },
    findInJsArray: function (val, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val) {
                return true;
            }
        }
        return false;
    },
    findSymbolByName: function (symbolName) {
        var targetSymbols = this.documentData.allSymbols();
        for (var j = 0; j < targetSymbols.count(); j++) {
            var targetSymbol = targetSymbols.objectAtIndex(j);
            if (targetSymbol.name().isEqualToString(symbolName)) {
                return targetSymbol;
            }
        }
        return false;
    },
    findSymbol: function (targetSymbols, clonedSymbol) {
        for (var j = 0; j < targetSymbols.count(); j++) {
            var targetSymbol = targetSymbols.objectAtIndex(j);
            if (clonedSymbol.name().isEqualToString(targetSymbol.name())) {
                return true;
            }
        }
        return false;
    },
    find: function(format, container, returnArray){
        if(!format || !format.key  || !format.match){
            return false;
        }
        var predicate = NSPredicate.predicateWithFormat(format.key,format.match),
            container = container || this.current,
            items;

        if(container.pages){
            items = container.pages();
        }
        else if( this.is( container, MSSharedStyleContainer ) || this.is( container, MSSharedTextStyleContainer ) ){
            items = container.objectsSortedByName();
        }
        else if( container.children ){
            items = container.children();
        }
        else{
            items = container;
        }

        var queryResult = items.filteredArrayUsingPredicate(predicate);

        if(returnArray) return queryResult;

        if (queryResult.count() == 1){
            return queryResult[0];
        } else if (queryResult.count() > 0){
            return queryResult;
        } else {
            return false;
        }
    },
    clearAllMarks: function(){
        var layers = this.page.children().objectEnumerator();
        while(layer = layers.nextObject()) {
            if(this.is(layer, MSLayerGroup) && this.regexNames.exec(layer.name())){
                this.removeLayer(layer)
            }
        }
    },
    toggleHidden: function(){
        var isHidden = (this.configs.isHidden)? false : !Boolean(this.configs.isHidden);
        this.configs = this.setConfigs({isHidden: isHidden});

        var layers = this.page.children().objectEnumerator();

        while(layer = layers.nextObject()) {
            if(this.is(layer, MSLayerGroup) && this.regexNames.exec(layer.name())){
                layer.setIsVisible(!isHidden);
            }
        }
    },
    toggleLocked: function(){
        var isLocked = (this.configs.isLocked)? false : !Boolean(this.configs.isLocked);
        this.configs = this.setConfigs({isLocked: isLocked});

        var layers = this.page.children().objectEnumerator();

        while(layer = layers.nextObject()) {
            if(this.is(layer, MSLayerGroup) && this.regexNames.exec(layer.name())){
                layer.setIsLocked(isLocked);
            }
        }
    },
    isImmutableSketchObject: function(sketchObject) {
        return !!(
            sketchObject &&
            sketchObject.class().mutableClass &&
            sketchObject.class().mutableClass() &&
            sketchObject.class().mutableClass() !== sketchObject.class()
        );
    },
    mutableSketchObject: function(immutableSketchObject) {
        if (immutableSketchObject && immutableSketchObject.class) {
            const immutableClass = immutableSketchObject.class();
            if (immutableClass.mutableClass) {
            const mutableClass = immutableClass.mutableClass();
            return mutableClass.new().initWithImmutableModelObject(
                immutableSketchObject
            );
            }
        }
    },

    $forEach: function(collection, iterator) {
        for (var i = 0; i < collection.count(); i++) {
        const item = collection.objectAtIndex(i);
        const returnValue = iterator(item, i, collection);
        if (returnValue === false) {
            break;
        }
        }
    },

    $map: function(collection, transform) {
        const result = [];
        $.forEach(collection, function(item, i, collection) {
        result.push(transform(item, i, collection));
        });
        return result;
    },

    $mapObject: function(collection, transform) {
        const results = {};
        $.forEach(collection, function(item, i, collection) {
        const result = transform(item, i, collection);
        const key = result[0];
        const value = result[1];
        results[key] = value;
        });
        return results;
    },

    $find: function(collection, predicate) {
        var result;
        $.forEach(collection, function(item, i, collection) {
        if (predicate(item, i, collection)) {
            result = item;
            return false;
        }
        });
        return result;
    },

    dictionaryWithMutableSketchObjects: function(dictionary) {
    return $mapObject(dictionary.allKeys(), function(key) {
        const object = dictionary.objectForKey(key);
        if (object.class().dictionary) {
        return [key, dictionaryWithMutableSketchObjects(object)];
        } else if (isImmutableSketchObject(object)) {
        return [key, mutableSketchObject(object)];
        } else {
        return [key, object];
        }
    });
    },

    arrayWithMutableSketchObjects: function(array) {
        return $map(array, function(object) {
            if (isImmutableSketchObject(object)) {
            return mutableSketchObject(object);
            } else {
            return object;
        }});

        // for(var i = 0; i < array.length; i++) {
        //     var object = array[i];
        //     if (MD.isImmutableSketchObject(object)) {
        //         array[i] = MD.mutableSketchObject(object);
        //     }
        // }

        // return array;

    }

});

//shared.js
MD.extend({
  sharedLayerStyle: function(name, color, borderColor) {
    var sharedStyles = this.documentData.layerStyles(),
      style = this.find({
        key: "(name != NULL) && (name == %@)",
        match: name
      }, sharedStyles);

    style = (!style || this.is(style, MSSharedStyle)) ? style : style[0];

    if (style == false) {
      style = MSStyle.alloc().init();

      var color = MSColor.colorWithRed_green_blue_alpha(color.r, color.g, color.b, color.a),
        fill = style.addStylePartOfType(0);

      fill.color = color;

      if (borderColor) {
        var border = style.addStylePartOfType(1),
          borderColor = MSColor.colorWithRed_green_blue_alpha(borderColor.r, borderColor.g, borderColor.b, borderColor.a);

        border.color = borderColor;
        border.thickness = 1;
        border.position = 1;
      }

      sharedStyles.addSharedStyleWithName_firstInstance(name, style);
    }

    return (style.newInstance) ? style.newInstance() : style;
  },

  sharedTextStyle: function(name, color, alignment, fontFamily, fontSize, lineHeight, leading) {
    var sharedStyles = this.document.documentData().layerTextStyles(),
    style = this.find({
      key: "(name != NULL) && (name == %@)",
      match: name
    }, sharedStyles);

    style = (!style || this.is(style, MSSharedStyle)) ? style : style[0];

    if (style == false && color) {
      var color = MSColor.colorWithRed_green_blue_alpha(color.r, color.g, color.b, color.a),
        alignment = alignment || 0, //[left, right, center, justify]
        fontFamily = fontFamily || 'Roboto',
        lineHeight = lineHeight || 15,
        fontSize = fontSize || 13,
        leading = leading || 0,
        text = this.addText(this.page);

      text.setTextColor(color);
      text.setFontPostscriptName(fontFamily);
      text.setLeading(leading);
      text.lineHeight = lineHeight;
      text.setFontSize(fontSize);
      text.setTextAlignment(alignment);

      style = text.style();
      sharedStyles.addSharedStyleWithName_firstInstance(name, style);
      this.removeLayer(text);
    }

    return (style.newInstance) ? style.newInstance() : style;
  }
});

// colors.js
MD.extend({
    getSelectionColor: function(){
        var self = this,
            colors = [];
        for (var i = 0; i < this.selection.count(); i++) {
            var layer = this.selection[i];
            if ( !this.is(layer, MSSliceLayer) ) {
                var layerStyle = layer.style(),
                    fills = this.getFills(layerStyle),
                    borders = this.getBorders(layerStyle);

                for (var n = 0; n < fills.length; n++) {
                    var fill = fills[n];
                    if(fill.fillType != "gradient"){
                        colors.push({name: '', color: fill.color});
                    }
                    else{
                        for (var w = 0; w < fill.gradient.colorStops.length; w++) {
                            var gColor = fill.gradient.colorStops[w];
                            colors.push({name: '', color: gColor.color});
                        }
                    }
                }
                for (var n = 0; n < borders.length; n++) {
                    var border = borders[n];
                    if(border.fillType != "gradient"){
                        colors.push({name: '', color: border.color});
                    }
                    else{
                        for (var w = 0; w < border.gradient.colorStops.length; w++) {
                            var gColor = border.gradient.colorStops[w];
                            colors.push({name: '', color: gColor.color});
                        }
                    }
                }
            }

            if ( this.is(layer, MSTextLayer) ) {
                colors.push({name: '', color: this.colorToJSON(layer.textColor())});
            }
        };

        return colors;
    },
    colorNames: function(colors){
        var colorNames = {};

        colors.forEach(function(color){
            var colorID = color.color["argb-hex"];
            colorNames[colorID] = color.name;
        });
        return colorNames;
    },
    manageColors: function(){
        var self = this,
            data = (this.configs.colors)? this.configs.colors: [];

        return this.MDPanel({
            url: this.pluginSketch + "/panel/colors.html",
            width: 320,
            height: 451,
            data: data,
            floatWindow: true,
            identifier: "com.utom.measure.colors",
            callback: function( data ){
                var colors = data;
                self.configs = self.setConfigs({
                    colors: colors,
                    colorNames: self.colorNames(colors)
                });

            },
            addCallback: function(windowObject){
                self.updateContext();
                self.init(self.context);
                var data = self.getSelectionColor();
                if(data.length > 0){
                    windowObject.evaluateWebScript("addColors(" + JSON.stringify(data) + ");");
                }
            },
            importCallback: function(windowObject){
                var data = self.importColors();
                if(data.length > 0){
                    windowObject.evaluateWebScript("addColors(" + JSON.stringify(data) + ");");
                    return true;
                }
                else{
                    return false;
                }
            },
            exportCallback: function(windowObject){
                return self.exportColors();
            },
            exportXMLCallback: function(windowObject){
                return self.exportColorsXML();
            }
        });
    },
    importColors: function(){
        var openPanel = NSOpenPanel.openPanel();
        openPanel.setCanChooseDirectories(false);
        openPanel.setCanCreateDirectories(false);
        openPanel.setDirectoryURL(NSURL.fileURLWithPath("~/Documents/"));
        openPanel.setTitle(_("Choose a &quot;colors.json&quot;"));
        openPanel.setPrompt(_("Choose"));
        openPanel.setAllowedFileTypes(NSArray.arrayWithObjects("json"))

        if (openPanel.runModal() != NSOKButton) {
            return false;
        }
        var colors = JSON.parse(NSString.stringWithContentsOfFile_encoding_error(openPanel.URL().path(), 4, nil)),
            colorsData = [];

        colors.forEach(function(color){
            if( color.color && color.color.a && color.color.r && color.color.g && color.color.b && color.color["argb-hex"] && color.color["color-hex"] && color.color["css-rgba"] && color.color["ui-color"] ){
                colorsData.push(color);
            }
        });

        if(colorsData.length <= 0){
            return false;
        }
        return colorsData;

    },
    exportColors: function(){
        var filePath = this.document.fileURL()? this.document.fileURL().path().stringByDeletingLastPathComponent(): "~";
        var fileName = this.document.displayName().stringByDeletingPathExtension();
        var savePanel = NSSavePanel.savePanel();

        savePanel.setTitle(_("Export colors"));
        savePanel.setNameFieldLabel(_("Export to:"));
        savePanel.setPrompt(_("Export"));
        savePanel.setCanCreateDirectories(true);
        savePanel.setShowsTagField(false);
        savePanel.setAllowedFileTypes(NSArray.arrayWithObject("json"));
        savePanel.setAllowsOtherFileTypes(false);
        savePanel.setNameFieldStringValue(fileName + "-colors.json");

        if (savePanel.runModal() != NSOKButton) {
            return false;
        }
        var savePath = savePanel.URL().path().stringByDeletingLastPathComponent(),
            fileName = savePanel.URL().path().lastPathComponent();

        this.writeFile({
            content: JSON.stringify(this.configs.colors),
            path: savePath,
            fileName: fileName
        });

        return true;
    },
    exportColorsXML: function(){
        var filePath = this.document.fileURL()? this.document.fileURL().path().stringByDeletingLastPathComponent(): "~";
        var fileName = this.document.displayName().stringByDeletingPathExtension();
        var savePanel = NSSavePanel.savePanel();

        savePanel.setTitle(_("Export colors"));
        savePanel.setNameFieldLabel(_("Export to:"));
        savePanel.setPrompt(_("Export"));
        savePanel.setCanCreateDirectories(true);
        savePanel.setShowsTagField(false);
        savePanel.setAllowedFileTypes(NSArray.arrayWithObject("xml"));
        savePanel.setAllowsOtherFileTypes(false);
        savePanel.setNameFieldStringValue(fileName + "-colors.xml");

        if (savePanel.runModal() != NSOKButton) {
            return false;
        }
        var savePath = savePanel.URL().path().stringByDeletingLastPathComponent(),
            fileName = savePanel.URL().path().lastPathComponent(),
            XMLContent = [];

        XMLContent.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        XMLContent.push("<resources>");
        this.configs.colors.forEach(function(color){
            if(color.name){
                XMLContent.push("\t<color name=\"" + color.name + "\">" + color.color["argb-hex"] + "</color>");
            }
        });
        XMLContent.push("</resources>");

        this.writeFile({
            content: XMLContent.join("\r\n"),
            path: savePath,
            fileName: fileName
        });

        return true;
    }
})

// Panel.js
MD.extend({
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

        if (request == 'onWindowDidBlur') {
          MD.addFirstMouseAcceptor(webView, contentView);
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
      identifier: 'com.sketch.material.table',
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
      url: MD.baseUrl + "/dialogs",
      remote: true,
      width: 850,
      height: 680,
      data: data,
      identifier: 'com.sketch.material.dialogs',
      floatWindow: false,
      callback: function (dataFromWebView) {
        MD.dialogsData = dataFromWebView;
      }
    });
  },

  snackBarsPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      url: MD.baseUrl + "/snackbars",
      // url: "http://localhost:8031/snackbars",
      remote: true,
      width: 850,
      height: 450,
      data: data,
      identifier: 'com.sketch.material.snackbars',
      floatWindow: false,
      callback: function (dataFromWebView) {
        MD.snackbarsData = dataFromWebView;
      }
    });
  },

  typographyPanel: function () {
    var self = this,
      data = {};

    return this.MDPanel({
      // url: "http://localhost:8031/styles",
      url: MD.baseUrl + "/styles",
      remote: true,
      width: 500,
      height: 600,
      data: data,
      identifier: 'com.sketch.material.typography',
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
      url: MD.baseUrl + "/forms",
      remote: true,
      width: 1000,
      height: 650,
      data: data,
      identifier: 'com.sketch.material.forms',
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
      url: MD.baseUrl + "/icons",
      remote: true,
      width: 300,
      height: 500,
      data: data,
      identifier: 'com.sketch.material.icons',
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
      identifier: 'com.sketch.material.resources',
      floatWindow: true,
      callback: function (data) {
        // self.configs = self.setConfigs({
        // table: data
        // });
      }
    });
  }

});

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

MD['Button'] = function () {

  // Globals
  var self = MD,
    selection = MD.context.selection;

  // Functions
  var _generateButtons;

  _getStyles = function (buttonType) {
    var textStyle = '…button-text-primary', padding = 8;

    if (buttonType[0] == 'raised') {
      textStyle = "…button-text-light";
      padding = 16;
    }

    if (buttonType[1] == 'disabled') {
      textStyle = "…button-text-disabled";
    }

    buttonType[1] = buttonType[1] ? "-" + buttonType[1] : '';

    return {
      bgStyle: '…button-' + buttonType[0] + buttonType[1] + '-bg',
      textStyle: textStyle,
      marginRight: padding,
      marginLeft: padding,
      marginTop: 10,
      marginBottom: 10
    }
  }

  _makeButtons = function (target, buttonType) {
    var BUTTON_STYLES = _getStyles(buttonType);

    var buttonGroup = MD.addGroup('button'),
      buttonBg = MD.addShape(),
      buttonText = MD.addText();

    target.setStyle(MD.sharedTextStyle(BUTTON_STYLES.textStyle));
    buttonBg.setStyle(MD.sharedLayerStyle(BUTTON_STYLES.bgStyle));

    var text = target.stringValue();
    buttonGroup.setName('button–' + text.toLowerCase().split(' ').join(''))
    target.setStringValue(text.toUpperCase());

    var buttonBgRect = MD.getRect(buttonBg);

    targetRect = MD.getRect(target);

    buttonBgRect.setX(targetRect.x);
    buttonBgRect.setY(targetRect.y);

    buttonBgRect.setWidth(targetRect.width + BUTTON_STYLES.marginRight + BUTTON_STYLES.marginLeft);
    buttonBgRect.setHeight(targetRect.height + BUTTON_STYLES.marginTop + BUTTON_STYLES.marginBottom);

    buttonBg.layers().firstObject().setCornerRadiusFromComponents("2")

    targetRect.setX(targetRect.x + BUTTON_STYLES.marginRight);
    targetRect.setY(targetRect.y + BUTTON_STYLES.marginTop);

    buttonGroup.addLayers([buttonBg, target]);
    buttonGroup.resizeToFitChildrenWithOption(0);

    target.select_byExpandingSelection(false, false);
    buttonGroup.select_byExpandingSelection(true, true);

    MD.current.addLayers([buttonGroup]);

    MD.current.removeLayer(target);

  }

  _generateButtons = function (type) {
    var buttonType = type.split(',');
    MD.import('button');

    if (selection.count() <= 0) {
      MD.message("Select a text layer to make button");
      return false;
    }

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      _makeButtons(target, buttonType);
    }
  }

  return {
    generateButtons: _generateButtons
  }
};

// chip.js
MD['Chip'] = function () {

  // Functions
  var _generateChips;

  // System variables
  var self = MD,
    selection = MD.selection;

  // Position
  var x = 0,
    y = 0;

  // Stings
  var chipsString, configSting;

  // Groups
  var parentGroup;

  // Components
  var chips, config;

  // Chip styles
  var chipStyles = function (layout) {
    var pickedStyle;

    switch (layout) {
      case "layout1":
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg", MD.hexToNSColor('E0E0E0', 1)),
          text: MD.sharedTextStyle("…chip-text", MD.hexToNSColor('535353', 1)),
          symbol: 'dark'
        }
        break;
      case 'layout2':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-hover", MD.hexToNSColor('BDBDBD', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout3':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-pressed", MD.hexToNSColor('BDBDBD', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout4':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-focused", MD.hexToNSColor('757575', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout5':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-primary", MD.hexToNSColor('4184F3', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
      break;
      case 'layout6':
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg-primary-focus", MD.hexToNSColor('3266D5', 1)),
          text: MD.sharedTextStyle("…chip-text-light", MD.hexToNSColor('FFFFFF', 1)),
          symbol: 'light'
        }
        break;
      default:
        pickedStyle = {
          bg: MD.sharedLayerStyle("…chip-bg", MD.hexToNSColor('E0E0E0', 1)),
          text: MD.sharedTextStyle("…chip-text", MD.hexToNSColor('535353', 1)),
          symbol: 'light'
        }
      break;
    }

    return pickedStyle;

  };

  _importChipSymbols = function () {
    MD.import('chips');
  }

  _importValues = function () {
    chips = MD.configs.chips.string.split(',');
    config = MD.configs.chips.config.split('|')
  }

  _addGroup = function () {
    parentGroup = MD.addGroup();
    parentGroup.setName('chips');
  }

  _generateAllChips = function () {
    for (var i = 0; i < chips.length; i++) {
      chip = _generateChip(chips[i], x, y, config[0]);
      x = x + MD.getRect(chip).width + 8;
      parentGroup.addLayers([chip]);
      parentGroup.resizeToFitChildrenWithOption(0);
    }
  }

  _addGroupsToDoc = function () {
    parentGroup.resizeToFitChildrenWithOption(0);
    parentGroup.setConstrainProportions(false);
    var parentGroupRect = MD.getRect(parentGroup);
    parentGroupRect.setX(MD.getCenterOfViewPort().x - (parentGroupRect.width * 0.5));
    parentGroupRect.setY(MD.getCenterOfViewPort().y - (parentGroupRect.height * 0.5));

    MD.current.addLayers([parentGroup]);
  }

  _generateChips = function () {
    if (MD.chipsPanel()) {
      _importChipSymbols();
      _importValues();
      _addGroup();
      _generateAllChips();
      _addGroupsToDoc();
    }
  }

  _generateChip =  function (string, x, y, layout) {
    var group = MD.addGroup(string),
      text = MD.addText(),
      bg = MD.addShape(),
      rect = MD.getRect(bg),
      close = MD.addGroup(),
      textRect = MD.getRect(text);

    group.setName('chip / ' + string);

    text.setStringValue(string);
    text.setName(string);

    text.setStyle(chipStyles(layout).text);
    bg.setStyle(chipStyles(layout).bg);

    var stringWidth = MD.getRect(text).width;

    rect.setX(x);
    rect.setY(y);
    rect.setHeight(32);
    rect.setWidth(12 + stringWidth  + 4 + 24 + 4);
    bg.layers().firstObject().setCornerRadiusFromComponents("100")

    textRect.setX(x + 12);
    textRect.setY(y + 8.5);

    var closeButton = MD.findSymbolByName('mat/chip/icon/'+ chipStyles(layout).symbol + '/remove');
    var button = closeButton.newSymbolInstance();

    MD.getRect(button).setX(x + 12 + stringWidth + 4);
    MD.getRect(button).setY(y + 4);

    group.addLayers([bg, text, button]);

    group.resizeToFitChildrenWithOption(0);

    return group;
  }


  return {
    generateChips: _generateChips
  }

};


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


MD['Elevation'] = function () {


  // Functions
  var _applyElevation;

  // Globals
  var self = MD,
    selection = MD.context.selection;

  // Function that will help apply the elevation
  //
  _applyElevation = function (elevation) {
    var elevationName = '…elevation-' + elevation + 'dp';

    log(elevationName);

    MD.import('elevation', elevationName);

    if (selection.count() <= 0) {
      MD.message("Select a layer to apply the elevation");
      return false;
    }

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      var newStyle = MD.sharedLayerStyle(elevationName);
      var style = target.style();
      style.setShadows(newStyle.shadows());
      style.setInnerShadows(newStyle.innerShadows());
    }
  }

  return {
    applyElevation: _applyElevation
  }
};

MD['Forms'] = function () {

  var formGroup, formHeight = 0, rowWidth = 0;

  var _importFormSymbols = function() {
    var symbolsToBeImported = [
      'Forms/Radio/Off',
      'Forms/Radio/On',
      'Icon/Radio/Off',
      'Icon/Radio/On',
      'Forms/Checkbox/Off',
      'Forms/Checkbox/On',
      'Icon/Checkbox/Off',
      'Icon/Checkbox/On',
      'Border/1px',
      'Border/2px'
    ]

    MD.import('forms', symbolsToBeImported);
  }

  var _generateForms = function() {
    formGroup = MD.addGroup();
    formGroup.setName('form');
    formGroup.setConstrainProportions(false);

    MD.import('form-styles');


    if(MD.formsPanel()) {
      _importFormSymbols();

      for(var i = 0; i < MD.formsData.rows.length; i++) {
        _renderRow(MD.formsData.rows[i]);
        formHeight = MD.getRect(formGroup).height;
      }

      formGroup.resizeToFitChildrenWithOption(1);

      var formGroupRect = MD.getRect(formGroup);
      formGroupRect.setX(MD.getCenterOfViewPort().x - (formGroupRect.width * 0.5));
      formGroupRect.setY(MD.getCenterOfViewPort().y - (formGroupRect.height * 0.5));

      MD.current.addLayers([formGroup]);
    }
  }

  var _renderRow = function(rowData) {
    rowWidth = 0;
    for(var j = 0; j < rowData.fields.length; j++) {
      _renderField(rowData.fields[j]);
    }
  }

  var _renderField = function(field) {
    var renderedField;

    if (field.type) {
      switch (field.type) {
        case "text":
          renderedField = _renderTextField(field);
          break;
        case "textarea":
          renderedField = _renderTextField(field);
          break;
        case "radio":
          renderedField = _renderOptions(field, 'Radio');
          break;
        case "dropdown":
          renderedField = _renderSelect(field);
          break;
        case "checkbox":
          renderedField = _renderOptions(field, 'Checkbox');
          break;
      }

      var renderedFieldRect = MD.getRect(renderedField);

      renderedFieldRect.setX(rowWidth);
      renderedFieldRect.setY(formHeight);

      rowWidth = rowWidth + renderedFieldRect.width + 16;

      formGroup.addLayers([renderedField]);
      formGroup.resizeToFitChildrenWithOption(1);

    }
  }

  var _renderSelect = function(field) {
    var fields = ['Forms/Select/Normal'];

    if(field.value) {
      fields = ['Forms/Select/Filled'];
    }

    if(field.hasError) {
      fields = ['Forms/Select/Error'];
    }

    MD.import('forms', fields);

    field.value = field.optionValue;

    var selectFieldSymbol = MD.findSymbolByName(fields[0]);
    var selectField = selectFieldSymbol.newSymbolInstance();
    var overridesFieldNames = ['helpText', 'label', 'value'];
    _updateOverrides(selectField, selectFieldSymbol, overridesFieldNames, field);

    return selectField;
  }

  var _renderOptions = function(field, type) {
    var optionButtons = [];
    var optionButtonGroup = MD.addGroup();
    var optionFieldGroup = MD.addGroup();

    var label = MD.addText();
    var helpText = MD.addText();

    var labelStyle = MD.sharedTextStyle('Forms/Light/Label/Idle');

    if(field.hasError) {
      labelStyle = MD.sharedTextStyle('Forms/Light/Label/Error');
    }

    label.setStringValue(field.label);
    label.setStyle(labelStyle);

    helpText.setStringValue(field.helpText);
    helpText.setStyle(labelStyle);

    var helpTextRect = MD.getRect(helpText);

    var labelRect = MD.getRect(label);
    labelRect.setY(14);

    for(var i = 0; i < field.options.length; i++) {
      var offOn = "Off";

      if((field.type == 'checkbox' && field.options[i].isChecked) ||
         (field.type == 'radio' && field.options[i].value == field.optionValue)) {
        offOn = 'On';
      }

      var optionSymbol = MD.findSymbolByName('Forms/' + type + '/' + offOn);
      var option = optionSymbol.newSymbolInstance();
      var overridesFieldNames = ['label'];

      var newVals = {
        label: field.options[i].label
      }

      var optionRect = MD.getRect(option);
      optionRect.setY((optionRect.height * i) + 4 + 14 + labelRect.height);

      _updateOverrides(option, optionSymbol, overridesFieldNames, newVals);
      optionButtons.push(option);
    }

    optionButtonGroup.addLayers(optionButtons);
    optionButtonGroup.setName(type + '-group');
    optionButtonGroup.resizeToFitChildrenWithOption(1);

    var bounds = MD.addShape();
    var boundsRect = MD.getRect(bounds);
    boundsRect.setConstrainProportions(false);
    optionFieldGroup.setConstrainProportions(false);

    optionFieldGroup.addLayers([bounds, optionButtonGroup, label]);
    optionFieldGroup.resizeToFitChildrenWithOption(1);

    var optionFieldGroupRect = MD.getRect(optionFieldGroup);

    helpTextRect.setY(optionFieldGroupRect.height);

    optionFieldGroup.addLayers([helpText]);
    optionFieldGroup.resizeToFitChildrenWithOption(1);

    boundsRect.setHeight(optionFieldGroupRect.height);
    boundsRect.setWidth(optionFieldGroupRect.width);

    optionFieldGroup.resizeToFitChildrenWithOption(1);
    return optionFieldGroup;
  }

  var _renderTextField = function(field) {
    var fields = ['Forms/Textfield/Normal'];

    if(field.value) {
      fields = ['Forms/Textfield/Filled'];
    }

    if(field.hasError) {
      fields = ['Forms/Textfield/Error'];
    }

    if(field.type == 'textarea' && field.counter) {
      field.counter =  field.value.length + " / " + field.counter;
    } else {
      field.counter = ' ';
    }

    MD.import('forms', fields);
    var textFieldSymbol = MD.findSymbolByName(fields[0]);
    var textField = textFieldSymbol.newSymbolInstance();
    var overridesFieldNames = ['helpText', 'label', 'value', 'counter'];
    _updateOverrides(textField, textFieldSymbol, overridesFieldNames, field);
    return textField;
  }

  var _updateOverrides = function(instance, symbolMaster, overridesFieldNames, field) {
    var layerIDs = _getLayerIDs(instance, symbolMaster, overridesFieldNames);
    var values = instance.overrides();
    if (!values) { values = NSMutableDictionary.dictionary(); }
    var existingOverrides = values;
    var mutableOverrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides)
    var keys = Object.keys(layerIDs);
    for(k = 0; k < keys.length; k++) {
      var key = keys[k];
      mutableOverrides.setObject_forKey(field[key], layerIDs[key]);
    }
    instance.overrides = mutableOverrides;
  };

  var _getLayerIDs = function(instance, symbolMaster, overridesFieldNames) {
    // var symbolMaster = instance.symbolMaster();
    var children = symbolMaster.children();
    var layerIDs = {};

    for (var i = 0; i < children.count(); i++){
      var layer = children[i];
      for(var j = 0; j < overridesFieldNames.length; j++) {
        var overridesID = overridesFieldNames[j];
        if(layer.name() == overridesFieldNames[j] ) {
          layerIDs[overridesID] = layer.objectID();
          break;
        }
      }
    }

    return layerIDs;
  };

  return {
    generateForms: _generateForms
  }
}

MD['Importer'] = function () {

  var _import = function () {

  }

  var _convertSvgToSymbol = function (data) {

    var name = data.name;

    var selectedLayers = MD.document.selectedLayers();
    var symbolsPage = MD.document.documentData().symbolsPageOrCreateIfNecessary();
    var existingSymbol = MD.findSymbolByName(name);

    if (existingSymbol) {
      var newSymbol = existingSymbol.newSymbolInstance(),
        newSymbolRect = MD.getRect(newSymbol),
        droppedElement = selectedLayers.firstLayer(),
        droppedEleRect = MD.getRect(droppedElement);

      MD.current.addLayers([newSymbol]);

      newSymbolRect.setX(droppedEleRect.x);
      newSymbolRect.setY(droppedEleRect.y);

      MD.current.removeLayer(droppedElement);
      return;
    }
    //avatars_and_widgets
    //alphabet_logos
    //internal_logos
    //non_material_product_logos
    //product_logos

    if (data.colorValue != '#000000' && data.isGlif ) {
      var colorHex = MD.hexToNSColor('#000000', 1)
      var color = MSColor.colorWithRed_green_blue_alpha(colorHex.r, colorHex.g, colorHex.b, 1);

      var replaceColorHex = MD.hexToNSColor(data.colorValue, 1);
      var replaceColor = MSColor.colorWithRed_green_blue_alpha(replaceColorHex.r, replaceColorHex.g, replaceColorHex.b, 1);

      var draggedLayer = selectedLayers.firstLayer();

      var layers = MD.find({ key: "(style.firstEnabledFill != NULL) && (style.firstEnabledFill.fillType == 0) && (style.firstEnabledFill.color == %@)", match: color }, draggedLayer);

      if (layers) {
        if (MD.is(layers, MSShapeGroup)) {
          var arr = NSArray.arrayWithObject(layers);
          layers = arr;
        }
        for (var i = 0; i < layers.count(); i++) {
          var layer = layers.objectAtIndex(i);
          var fill = layer.style().fills().firstObject();
          fill.color = replaceColor;
        }
      }
    }

    MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(selectedLayers, name, true);
  }


  return {
    import: _import,
    convertSvgToSymbol: _convertSvgToSymbol
  }
}

// snackbar.js
MD['SnackBar'] = function () {
  var _generateSnackBar, _buildSnackBars, _importSnackbarSymbols;

  var SB_STYLES = {
    button: '…toast-button',
    content: '…toast-content',
    bg: '…toast-bg',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
    width: 360,
  }



  _buildSnackBars = function() {

    var content = MD.addText(),
      button = MD.addText(),
      bg = MD.addShape(),
      group = MD.addGroup();

      content.setStyle(MD.sharedTextStyle(SB_STYLES.content));
      button.setStyle(MD.sharedTextStyle(SB_STYLES.button));
      bg.setStyle(MD.sharedLayerStyle(SB_STYLES.bg));

      content.setStringValue(MD.snackbarsData.content);
      button.setStringValue(MD.snackbarsData.button);

      content.setTextBehaviour_mayAdjustFrame(1, false);
      content.canResize();
      content.adjustFrameToFit();

      content.setName('toast-content');
      button.setName('toast-button');

      var contentRect = MD.getRect(content),
        buttonRect = MD.getRect(button),
        bgRect = MD.getRect(bg);

      if(MD.snackbarsData.screen == 'desktop') {
        SB_STYLES.paddingTop = 14;
        SB_STYLES.paddingBottom = 14;
        bg.layers().firstObject().setCornerRadiusFromComponents("2");
      }

      contentRect.setWidth(MD.snackbarsData.contentWidth);
      buttonRect.setWidth(MD.snackbarsData.buttonWidth);
      bgRect.setWidth(MD.snackbarsData.width);

      content.adjustFrameToFit();

      contentRect = MD.getRect(content);

      contentRect.setY(SB_STYLES.paddingTop);
      contentRect.setX(SB_STYLES.paddingLeft);

      buttonRect.setX(MD.snackbarsData.width - MD.snackbarsData.buttonWidth - SB_STYLES.paddingRight);

      bgRect.setHeight(SB_STYLES.paddingTop + SB_STYLES.paddingBottom + contentRect.height);

      var buttonX = ((bgRect.height - SB_STYLES.paddingTop - SB_STYLES.paddingBottom) - buttonRect.height)/2

      buttonRect.setY(SB_STYLES.paddingTop + buttonX);

      if(MD.snackbarsData.hideButton) {
        group.addLayers([bg, content]);
      } else {
        group.addLayers([bg, content, button]);
      }

      var groupRect = MD.getRect(group);
      groupRect.setConstrainProportions(false);

      button.hasFixedTop = true;
      button.hasFixedRight = true;
      content.hasFixedTop = true;
      content.hasFixedLeft = true;

      group.resizeToFitChildrenWithOption(0);
      group.setName('toast')

      MD.current.addLayers([group]);

      groupRect.setX(MD.getCenterOfViewPort().x - (bgRect.width * 0.5));
      groupRect.setY(MD.getCenterOfViewPort().y - (bgRect.height * 0.5));

  }

  _importSnackbarSymbols = function() {
    MD.import('snackbars');
  }

  _generateSnackBars = function() {
    if (MD.snackBarsPanel()) {
      _importSnackbarSymbols();
      _buildSnackBars();
    }
  }

  return {
    generateSnackBars: _generateSnackBars
  }

};

// table.js
MD['Table'] = function () {
  // Functions
  var _generateTable,
    _showTablePanel,
    _makeCheckBoxes;

  // Constants
  var BLACK = MD.hexToNSColor('000000', 0.87),
    GREY = MD.hexToNSColor('000000', 0.54),
    FONT = 'Roboto',
    FONT_MEDIUM = 'Roboto Medium',
    LEFT_ALIGN = 0,
    RIGHT_ALIGN = 1,
    PADDING = 24,

    FONT_SIZE = {
      CAPTION: 20,
      HEADER: 12,
      CONTENT: 13
    },

    ROW_HEIGHT = {
      S: 33,
      M: 41,
      L: 49
    },

    LEADING = {
      S: 18.1,
      M: 25.7,
      L: 33.9
    },

    LINE_HEIGHT = {
      CAPTION: 20,
      CONTENT: 15
    },

    CAPTION_HEIGHT = {
      M: 64
    };

  // Styles
  var
    headerStyle = function (rtl, l) {
      var name = rtl == 0 ? '…table-header-' + l : '…table-header-rtl-' + l;

      return MD.sharedTextStyle(name,
        GREY, rtl,
        FONT_MEDIUM, FONT_SIZE.HEADER,
        LINE_HEIGHT.CONTENT, LEADING[l]);
    },

    tableContentStyle = function (rtl, l) {
      var name = rtl == 0 ? '…table-content-' + l : '…table-content-rtl-' +  l;
      return MD.sharedTextStyle(name,
        BLACK, rtl,
        FONT, FONT_SIZE.CONTENT,
        LINE_HEIGHT.CONTENT, LEADING[l])
    },

    lineStyle = MD.sharedLayerStyle("…table-divider", MD.hexToNSColor('000000', 0.12)),

    captionStyle = MD.sharedTextStyle('…table-caption',
      BLACK, 0,
      FONT, FONT_SIZE.CAPTION,
      LINE_HEIGHT.CAPTION);

  // Parts
  var headers,
    columns,
    widths,
    metas,
    props;

  // Groups
  var columnGroup,
    tableGroup,
    checkBoxGroup,
    paginationGroup,
    linesGroup;

  // Counts
  var rowCount;

  // Coordinates
  var x = PADDING + 18 + PADDING,
    y = 0;

  // Spacings
  var gapBetweenCols = 24;

  // Captions
  var caption,
    captionRect,
    captionX = PADDING,
    captionY = (CAPTION_HEIGHT.M - FONT_SIZE.CAPTION) / 2;

  _generateTable = function () {
    _showTablePanel();
  }
  _importRequiredSymbols = function () {
    // MD.import('icons', 'symbols', ['Forms/checkbox/unchecked/16']);
    MD.import('tables');
  }

  _showTablePanel = function () {
    if (MD.tablePanel()) {
      _importRequiredSymbols();
      _parseDataFromPanel();
      _getTableSize();
      _createGroups();
      _makeCols();
      _makeLines();
      _addCaption();
      _addPagination();
      _addCard();
      _addGroupsToTable();
    }
  }

  _parseDataFromPanel = function () {
    headers = _parseDataFromString(MD.configs.table.headers, '|');
    columns = _parseDataFromString(MD.configs.table.cells, '|');
    widths = _parseDataFromString(MD.configs.table.widths, '|');
    metas = _parseDataFromString(MD.configs.table.metas, '|');
    props = _parseDataFromString(MD.configs.table.props, '|');
  }

  _parseDataFromString = function (str, sep) {
    // nsString = NSString.alloc().initWithUTF8String(str);
    // return nsString.componentsSeparatedByString(sep);
    return str.split(sep);
  }

  _makeCols = function () {

    if (props[4] == 'off') {
      x = PADDING;
    }

    for (var i = 0; i < headers.length; i++) {
      var col = MD.addText(),
        header = MD.addText(),
        line = MD.addShape(),
        colGroup = MD.addGroup(),
        layoutSize = props[3];

      header.setStringValue(headers[i]);
      col.setStringValue(columns[i]);

      header.setStyle(headerStyle(0, layoutSize));
      col.setStyle(tableContentStyle(0, layoutSize));

      if (metas[i] == 'htRight') {
        header.setStyle(headerStyle(1, layoutSize));
        col.setStyle(tableContentStyle(1, layoutSize));
      }

      headerRect = MD.getRect(header);
      headerRect.setX(x);
      headerRect.setY(CAPTION_HEIGHT.M + (ROW_HEIGHT[layoutSize] - LINE_HEIGHT.CONTENT)/2);
      headerRect.setWidth(widths[i]);

      colRect = MD.getRect(col);
      colRect.setX(x);
      colRect.setY(CAPTION_HEIGHT.M + ROW_HEIGHT[layoutSize] + (ROW_HEIGHT[layoutSize] - LINE_HEIGHT.CONTENT)/2 + 1);
      colRect.setWidth(widths[i]);

      x =  gapBetweenCols + x + parseInt(widths[i]);

      colGroup.setName('col #' + i)
      colGroup.addLayers([col, header]);
      colGroup.resizeToFitChildrenWithOption(0);
      columnGroup.addLayers([colGroup]);
    }
  }

  _makeLines = function () {
    var checkBox = MD.findSymbolByName('Forms/checkbox/unchecked/16');

    for (var k = 0; k < rowsCount + 1; k++) {
      var line,
        lineRect,
        layoutSize = props[3],
        check = checkBox.newSymbolInstance(),
        checkRect = MD.getRect(check);

      line = MD.addShape();
      lineRect = MD.getRect(line);

      line.setStyle(lineStyle);
      tableHeight = ((k + 1) * ROW_HEIGHT[layoutSize]) + CAPTION_HEIGHT.M;
      lineRect.setY(tableHeight);

      if (props[4] == 'on') {
        checkRect.setY(tableHeight - checkRect.height - (ROW_HEIGHT[layoutSize] - checkRect.height) / 2);
        checkRect.setX(PADDING);
        checkBoxGroup.addLayers([check]);
      }

      lineRect.setX(0);
      lineRect.setHeight(1);
      lineRect.setWidth(x);
      linesGroup.setName('dividers')
      linesGroup.addLayers([line]);

    }
  }


  _addCaption = function () {
    caption = MD.addText(),
    captionRect = MD.getRect(caption),

    caption.setName('caption');
    caption.setStringValue(MD.configs.table.caption);
    caption.setStyle(captionStyle);
    captionRect.setX(captionX);
    captionRect.setY(captionY);
  }

  _addCard = function () {
    bg = MD.addShape();
    bg.setName('card')
    var bgRect = MD.getRect(bg);;
    MD.import('elevation', '…elevation-02dp');

    if (props[1] == 'on') {
      bg.setStyle(MD.sharedLayerStyle("…elevation-02dp"));
      bg.layers().firstObject().setCornerRadiusFromComponents("2");
    }

    bgRect.setWidth(x);
    bgRect.setHeight(tableHeight);
  }

  _addPagination = function () {
    if (props[2] == 'off') {
      return;
    }

    var pagination = MD.findSymbolByName('…table-pagination');
    paginationInstance = pagination.newSymbolInstance();

    paginationGroup.addLayers([paginationInstance]);
    paginationInstanceRect = MD.getRect(paginationInstance);

    paginationRect = MD.getRect(paginationGroup);
    paginationRect.setY(tableHeight);
    paginationRect.setX(x - paginationInstanceRect.width);
    paginationGroup.resizeToFitChildrenWithOption(0);
    tableHeight = tableHeight + paginationInstanceRect.height;
  }


  _createGroups = function () {
    columnGroup = MD.addGroup();
    columnGroup.setName('columns');

    headerGroup = MD.addGroup();
    headerGroup.setName('headers');

    linesGroup = MD.addGroup();
    linesGroup.setName('dividers');

    checkBoxGroup = MD.addGroup();
    checkBoxGroup.setName('checkboxes');


    paginationGroup = MD.addGroup();
    paginationGroup.setName('pagination');
  }

  _getTableSize = function () {
    rowsCount = columns[0].split('\n').length;
  }

  _addGroupsToTable = function () {
    columnGroup.resizeToFitChildrenWithOption(0);
    columnGroup.setConstrainProportions(false);
    linesGroup.resizeToFitChildrenWithOption(0);
    linesGroup.setConstrainProportions(false);
    paginationGroup.resizeToFitChildrenWithOption(0);
    paginationGroup.setConstrainProportions(false);

    tableGroup = MD.addGroup();
    tableGroup.setConstrainProportions(false);
    tableGroup.setName('table');
    tableGroup.addLayers([bg, linesGroup, checkBoxGroup, paginationGroup, columnGroup, caption]);
    tableGroup.resizeToFitChildrenWithOption(0);

    var tableGroupRect = MD.getRect(tableGroup);
    tableGroupRect.setX(MD.getCenterOfViewPort().x - (tableGroupRect.width * 0.5));
    tableGroupRect.setY(MD.getCenterOfViewPort().y - (tableGroupRect.height * 0.5));

    MD.current.addLayers([tableGroup]);
  }

  return {
    generateTable: function () {
      _generateTable();
    }
  }
};

MD['Tooltip'] = function () {


  // Functions
  var _generateTooltip,
    _makeTooltip;

  // Globals
  var self = MD,
    selection = MD.context.selection,
    TIP_STYLES = {};


  _getTipStyles = function(l) {
    var layout = l < 33 ? 's' : l > 33 && l < 100 ? 'm' : 'l';

    var width = layout == 'm' ? 115 : layout == 'l' ? 320 : 0;

    var tipTextStyle, tipBgStyle, marginTop, marginRight, marginBottom, marginLeft;


    if (layout == 's') {
      tipTextStyle = '…inktip-text-mini';
      tipBgStyle = '…inktip-bg-mini';
      marginTop = 5;
      marginLeft = 8; marginRight = 8;
      marginBottom = 6;
    } else {
      tipTextStyle = '…inktip-text';
      tipBgStyle = '…inktip-bg';
      marginTop = 12;
      marginLeft = 16; marginRight = 16;
      marginBottom = 13;
    }

    TIP_STYLES = {
      width: width,
      tipTextStyle: tipTextStyle,
      tipBgStyle: tipBgStyle,
      marginTop: marginTop,
      marginBottom: marginBottom,
      marginLeft: marginLeft,
      marginRight: marginRight
    }

  }

  _makeTooltip = function (target, layout) {
    var tipGroup = MD.addGroup('tip'),
      tipBg = MD.addShape(),
      tipText = MD.addText(),
      tipContentLength = target.stringValue().length();

    _getTipStyles(tipContentLength);

    target.setStyle(MD.sharedTextStyle(TIP_STYLES.tipTextStyle));
    tipBg.setStyle(MD.sharedLayerStyle(TIP_STYLES.tipBgStyle));

    target.textBehaviour = 1;

    var targetRect = MD.getRect(target);

    if (TIP_STYLES.width != 0) {
      targetRect.setWidth(TIP_STYLES.width);
      target.textBehaviour = 1;
      target.layerStyleDidChange();
      target.adjustFrameToFit();
    }

    var tipBgRect = MD.getRect(tipBg);

    targetRect = MD.getRect(target);

    tipBgRect.setX(targetRect.x);
    tipBgRect.setY(targetRect.y);

    tipBgRect.setWidth(targetRect.width + TIP_STYLES.marginRight + TIP_STYLES.marginLeft);
    tipBgRect.setHeight(targetRect.height + TIP_STYLES.marginTop + TIP_STYLES.marginBottom);

    tipBg.layers().firstObject().setCornerRadiusFromComponents("2")

    targetRect.setX(targetRect.x + TIP_STYLES.marginRight);
    targetRect.setY(targetRect.y + TIP_STYLES.marginTop);

    tipGroup.addLayers([tipBg, target]);
    tipGroup.resizeToFitChildrenWithOption(0);
    MD.current.addLayers([tipGroup]);

    target.select_byExpandingSelection(false, false);
    tipGroup.select_byExpandingSelection(true, true);
    tipGroup.setName('inktip');

    MD.current.removeLayer(target);

  }

  /* Generate the tooltip based on selected layer
   *
   *
   */
  _generateTooltip = function () {
    // Import the ink tip layer and text styles
    MD.import('inktip');

    if (selection.count() <= 0) {
      MD.message("Select a text layer to make tooltip");
      return false;
    }

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      _makeTooltip(target, 'm');
    }

  }

  return {
    generateTooltip: _generateTooltip
  }
};

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
