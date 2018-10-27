import ClassUtils from "./class";
import DocUtils from "./doc";
import DomUtils from "./dom";
import ArrayUtils from "./array";
import ColorUtils from "./color";

export default {
  getSharedTextStyleByName(name) {
    var sharedStyles = DocUtils.doc()
      .documentData()
      .allTextStyles();
    var style = ArrayUtils.find(
      {
        key: "(name != NULL) && (name == %@)",
        match: name
      },
      sharedStyles
    );
    style = !style || ClassUtils.is(style, MSSharedStyle) ? style : style[0];
    return style;
  },
  getSharedLayerStyleByName: function(name) {
    var sharedStyles = DocUtils.doc()
      .documentData()
      .allLayerStyles();
    var style = ArrayUtils.find(
      {
        key: "(name != NULL) && (name == %@)",
        match: name
      },
      sharedStyles
    );
    style = !style || ClassUtils.is(style, MSSharedStyle) ? style : style[0];
    return style;
  },
  addSharedStylesToDoc(name, style, type) {
    var container = DocUtils.doc()
      .documentData()
      .layerTextStyles();
    if (type == "layer") {
      container = DocUtils.doc()
        .documentData()
        .layerStyles();
    }
    var s = MSSharedStyle.alloc().initWithName_style(name, style);
    container.addSharedObject(s);
  },
  createAndGetSharedTextStyleFromJson(name, json) {
    var style = this.getSharedTextStyleByName(name);

    if (style == 0 && json.color) {
      var color = MSColor.colorWithRed_green_blue_alpha(
          json.color.red,
          json.color.green,
          json.color.blue,
          json.color.alpha
        ),
        fontFamily = json.font || "Roboto",
        lineHeight = json.lineHeight || 15,
        fontSize = json.size || 13,
        leading = json.leading || 0,
        alignment = json.alignment || 0,
        spacing = json.spacing || 0,
        paragraphSpacing = json.paragraphSpacing || 0,
        textTransform = json.textTransform || 0,
        strikethrough = json.strikethrough || 0,
        underline = json.underline || 0,
        text = this.addText(this.page);

      text.setFontPostscriptName(fontFamily);
      text.setLeading(leading);
      text.setLineHeight(lineHeight);
      text.setFontSize(fontSize);
      text.setTextAlignment(alignment);
      text.setTextColor(color);
      text.textAlignment = alignment;
      text.setCharacterSpacing(spacing);
      text.addAttribute_value(
        "MSAttributedStringTextTransformAttribute",
        textTransform
      );

      var paragraphStyle = text.paragraphStyle();
      paragraphStyle.setParagraphSpacing(paragraphSpacing);
      text.addAttribute_value("NSParagraphStyle", paragraphStyle);
      text.addAttribute_value("NSStrikethrough", strikethrough);
      text.addAttribute_value("NSUnderline", underline);

      style = text.style();

      this.addSharedStylesToDoc(name, style, "text");
      DomUtils.removeLayer(text);
    }

    return this.getSharedTextStyleByName(name);
  },

  applyFillsToStyle(style, fills) {
    for (var i = 0; i < fills.length; i++) {
      var fill = fills[i];
      var color = ColorUtils.cssColorToMSColor(fill.color);
      var styleFill = style.addStylePartOfType(0);
      styleFill.setFillType(fill.type);
      styleFill.color = color;
      styleFill.isEnabled = true;
    }
  },

  applyShadowsToStyle(style, shadows) {
    for (var i = 0; i < shadows.length; i++) {
      var shadow = shadows[i];
      var color = ColorUtils.cssColorToMSColor(shadow.color);
      var styleShadow = style.addStylePartOfType(2);

      styleShadow.offsetX = shadow.x;
      styleShadow.offsetY = shadow.y;
      styleShadow.color = color;
      styleShadow.blurRadius = shadow.blur;
      styleShadow.spread = shadow.spread;
      styleShadow.isEnabled = true;
    }
  },

  applyBordersToStyle(style, borders) {
    for (var i = 0; i < borders.length; i++) {
      var border = borders[i];
      var color = ColorUtils.cssColorToMSColor(border.color);
      var styleBorder = style.addStylePartOfType(1);

      styleBorder.color = color;
      styleBorder.thickness = border.thickness;
      styleBorder.position = border.position;
    }
  },

  createAndGetSharedLayerStyleFromJson(name, json) {
    var style = this.getSharedLayerStyleByName(name);

    if (style == 0) {
      style = MSStyle.alloc().init();
      if (json.fills) this.applyFillsToStyle(style, json.fills);
      if (json.shadows) this.applyShadowsToStyle(style, json.shadows);
      if (json.borders) this.applyBordersToStyle(style, json.borders);
      style.contextSettings().setOpacity(1);
      this.addSharedStylesToDoc(name, style, "layer");
    }

    return this.getSharedLayerStyleByName(name);
  }
};
