export default {
  is: function(layer, theClass) {
    if (!layer) return false;
    var klass = layer.class();
    return klass === theClass;
  }
};
