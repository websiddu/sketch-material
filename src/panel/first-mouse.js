var createCocoaObject = function (methods, superclass) {
  var uniqueClassName = 'MD.sketch_' + NSUUID.UUID().UUIDString()
  var classDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(
    uniqueClassName,
    superclass || NSObject
  )
  classDesc.registerClass()
  for (var selectorString in methods) {
    var selector = NSSelectorFromString(selectorString)
    classDesc.addInstanceMethodWithSelector_function(
      selector,
      methods[selectorString]
    )
  }
  return NSClassFromString(uniqueClassName).new()
}

module.exports = function (webView, contentView) {
  var button = createCocoaObject({
      'mouseDown:': function (evt) {
        this.removeFromSuperview()
        NSApplication.sharedApplication().sendEvent(evt)
      },
    },
    NSButton
  )

  button.setIdentifier('firstMouseAcceptor')
  button.setTransparent(true)
  button.setTranslatesAutoresizingMaskIntoConstraints(false)

  contentView.addSubview(button)

  var views = {
    button: button,
    webView: webView,
  }

  contentView.addConstraints(
    NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views(
      'H:[button(==webView)]',
      NSLayoutFormatDirectionLeadingToTrailing,
      null,
      views
    )
  )

  contentView.addConstraints(
    NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views(
      'V:[button(==webView)]',
      NSLayoutFormatDirectionLeadingToTrailing,
      null,
      views
    )
  )

  contentView.addConstraints(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      button,
      NSLayoutAttributeTop,
      NSLayoutRelationEqual,
      webView,
      NSLayoutAttributeTop,
      1,
      0
    )
  )
}
