MD['Imagery'] = function () {

  const FillType = { Solid: 0, Gradient: 1, Pattern: 4, Noise: 5 };
  const PatternFillType = { Tile: 0, Fill: 1, Stretch: 2, Fit: 3};

  var _showImageryPanel = function() {
    MD['frameWork'] = MD.initFramework(MD.context, 'SketchMaterial');
    MD.frameWork.setWebView(MD.webView);
    var isAuthorized = MD.frameWork.isAuthorized();
    MD.imageryPanel(isAuthorized);
  }

  var fetchImage = function(url) {
    var nsurl = NSURL.URLWithString(url);
    var newImage = NSImage.alloc().initWithContentsOfURL(nsurl);
    return MSImageData.alloc().initWithImage(newImage);
  }

  var fillLayer = function(photo, layer){

    var doc = NSDocumentController.sharedDocumentController().currentDocument();
    var selection = doc.selectedLayers().layers();

    var image = fetchImage(photo.thumbnailLink.slice(0, -5));

    if(layer && layer.style().firstEnabledFill()) {
        if(image) {
            var fill = layer.style().fills().firstObject();
            fill.setFillType(4);
            fill.setImage(image);
            fill.setPatternFillType(1);
        } else {
            print("Can't load image!");
        }
    } else {
        print("Select a layer that has at least one fill style");
    }
  }

  var insertAsImageLayer = function(photo) {
    // var layer = MSBitmapLayer.bitmapLayerWithImageFromPath(photo.thumbnailLink.slice(0, -5));

    var layer = MSBitmapLayer.alloc().initWithFrame(CGRectMake(0, 0, 100, 100));

    layer.image = fetchImage(photo.thumbnailLink.slice(0, -5));
    layer.setName(photo.name);
    layer.resizeToOriginalSize();
    var layerRect = MD.getRect(layer);

    layerRect.setX(MD.getCenterOfViewPort().x - layerRect.width * 0.5);
    layerRect.setY(MD.getCenterOfViewPort().y - layerRect.height * 0.5);

    MD.current.addLayers([layer]);
  }

  var _insertImages = function(photos) {
    var doc = NSDocumentController.sharedDocumentController().currentDocument();
    var selection = doc.selectedLayers().layers();
    var i = 0;

    if(selection.length > 0) {
      selection.forEach(function(layer){
        if(!photos[i]) { i = 0; }
        fillLayer(photos[i], layer);
        i++;
      });
    } else {
      insertAsImageLayer(photos[0])
    }

  }

  return {
    showImageryPanel: _showImageryPanel,
    insertImages: _insertImages,
  }
}
