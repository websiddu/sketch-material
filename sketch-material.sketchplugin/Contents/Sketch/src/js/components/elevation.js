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
