export default {
  initFramework(frameworkName) {
    var pluginRoot;
    pluginRoot = "/Users/gsid/Library/Developer/Xcode/DerivedData/SketchMaterial-dcfonlecjckrqcaaituorzhlrpgo/Build/Products/Debug/";

    var mocha = Mocha.sharedRuntime();
    if (NSClassFromString(frameworkName) == null) {
      if (!mocha.loadFrameworkWithName_inDirectory(frameworkName, pluginRoot)) {
        log('An error ocurred while loading the SketchMaterial Framework.');
        return;
      }
    }
  },
}
