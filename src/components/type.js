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
      }

      var style = Utils.createAndGetSharedTextStyleFromJson(style.name, style);
      var selecitonLoop = selection.objectEnumerator();

      while (sel = selecitonLoop.nextObject()) {
        sel.sharedStyle = style;
      }
      MD.doc().reloadInspector();
    }
  }
}
