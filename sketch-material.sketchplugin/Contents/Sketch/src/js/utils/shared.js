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
