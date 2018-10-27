import Utils from "../utils";

export default {
  applyTypographyStyles(style) {
    var selection = Utils.selection();

    if (selection.count() <= 0) {
      Utils.message("Select a text layer to apply style");
    } else {
      style.color = {
        red: style.color_red,
        blue: style.color_blue,
        green: style.color_green,
        alpha: style.color_alpha
      };

      var style = Utils.createAndGetSharedTextStyleFromJson(style.name, style),
        selecitonLoop = selection.objectEnumerator(),
        sel;

      while ((sel = selecitonLoop.nextObject())) {
        sel.sharedStyle = style;
      }

      Utils.doc().reloadInspector();
    }
  }
};
