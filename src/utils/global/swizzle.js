export default {

  appendMethod_with(method, block) {
    const components = method.split("_");
    const methodName = components[1];
    const className = components[0];
    this.appendCode_intoMethodWithName_ofClassWithName(block, methodName, className);
  },

  appendCode_intoMethodWithName_ofClassWithName(block, methodName, className) {

    let klass = NSClassFromString(className);

    log(klass);

    if (!klass) {
      return false;
    }

    let from = NSSelectorFromString(methodName);



    // let original = class_getInstanceMethod(klass, from);
    // if (!original) {
    //   return false;
    // }

    // let originalImp = null;

    // let replacement = imp_implementationWithBlock(function (_self, argp) {
    //   // Original implementation
    //   if (originalImp) {
    //     originalImp(_self, _cmd, argp);
    //   }
    //   block(_self, argp);
    // });

    // originalImp = class_replaceMethod(klass, from, replacement, method_getTypeEncoding(original));

    // if (!originalImp) {
    //   return false;
    // }

    // return true;

  }
}
