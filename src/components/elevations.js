import Utils from "../utils";

export default {
  applyElevation(elevation) {
    var selection = Utils.selection();

    var name = "Elevation/" + elevation;

    if (elevation.name) {
      name = "Elevation/" + elevation.name;
    }

    var elevationName = name;

    if (selection.count() <= 0) {
      Utils.message("Select a layer to apply the elevation");
      return false;
    }

    var style = Utils.createAndGetSharedLayerStyleFromJson(
      elevationName,
      elevation
    );

    for (var i = 0; i < selection.count(); i++) {
      var target = selection[i];
      target.sharedStyle = style;
    }

    Utils.doc().reloadInspector();
  }
};
