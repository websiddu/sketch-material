export default {
  is: function (layer, theClass) {
    if (!layer) return false;
    var klass = layer.class();
    return klass === theClass;
  },
  mutableSketchObject(immutableSketchObject) {
    if (immutableSketchObject && immutableSketchObject.class) {
      const immutableClass = immutableSketchObject.class();
      if (immutableClass.mutableClass) {
        const mutableClass = immutableClass.mutableClass();
        return mutableClass.new().initWithImmutableModelObject(
          immutableSketchObject
        );
      }
    }
  }
};
