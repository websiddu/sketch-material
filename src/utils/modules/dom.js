export default {
  getRect: function(layer) {
    var rect = layer.frame();
    return {
      x: Math.round(rect.x()),
      y: Math.round(rect.y()),
      width: Math.round(rect.width()),
      height: Math.round(rect.height()),
      maxX: Math.round(rect.x() + rect.width()),
      maxY: Math.round(rect.y() + rect.height()),
      setX(x) {
        rect.setX(x);
        this.x = x;
        this.maxX = this.x + this.width;
      },
      setY(y) {
        rect.setY(y);
        this.y = y;
        this.maxY = this.y + this.height;
      },
      setWidth(width) {
        rect.setWidth(width);
        this.width = width;
        this.maxX = this.x + this.width;
      },
      setHeight(height) {
        rect.setHeight(height);
        this.height = height;
        this.maxY = this.y + this.height;
      },
      setConstrainProportions(val) {
        rect.setConstrainProportions(val);
      }
    };
  },
  addGroup: function() {
    return MSLayerGroup.new();
  },
  addShape: function() {
    return MSShapeGroup.shapeWithRect(NSMakeRect(0, 0, 100, 100));
  },
  addText: function(container, string) {
    var text = MSTextLayer.new();
    text.setStringValue(string || "Text");
    return text;
  },
  removeLayer: function(layer) {
    var container = layer.parentGroup();
    if (container) container.removeLayer(layer);
  }
};
