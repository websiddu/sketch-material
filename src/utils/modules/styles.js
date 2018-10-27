import ClassUtils from './class';
import DocUtils from './doc';
import DomUtils from './dom';

export default {
  getSharedTextStyleByName(name) {
    var sharedStyles = Utils.doc()
      .documentData()
      .allTextStyles();
    var style = Utils.find(
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
  createAndGetSharedTextStyleFromJson: function(name, json) {
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
  }
};
