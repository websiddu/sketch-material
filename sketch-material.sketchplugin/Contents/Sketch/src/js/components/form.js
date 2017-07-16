MD['Forms'] = function () {

  var formGroup, formHeight = 0, rowWidth = 0;

  var _importFormSymbols = function() {
    var symbolsToBeImported = [
      'Forms/Radio/Off',
      'Forms/Radio/On',
      'Icon/Radio/Off',
      'Icon/Radio/On',
      'Forms/Checkbox/Off',
      'Forms/Checkbox/On',
      'Icon/Checkbox/Off',
      'Icon/Checkbox/On',
      'Border/1px',
      'Border/2px'
    ]

    MD.import('forms', symbolsToBeImported);
  }

  var _generateForms = function() {
    formGroup = MD.addGroup();
    formGroup.setName('form');
    formGroup.setConstrainProportions(false);

    MD.import('form-styles');


    if(MD.formsPanel()) {
      _importFormSymbols();

      for(var i = 0; i < MD.formsData.rows.length; i++) {
        _renderRow(MD.formsData.rows[i]);
        formHeight = MD.getRect(formGroup).height;
      }

      formGroup.resizeToFitChildrenWithOption(1);

      var formGroupRect = MD.getRect(formGroup);
      formGroupRect.setX(MD.getCenterOfViewPort().x - (formGroupRect.width * 0.5));
      formGroupRect.setY(MD.getCenterOfViewPort().y - (formGroupRect.height * 0.5));

      MD.current.addLayers([formGroup]);
    }
  }

  var _renderRow = function(rowData) {
    rowWidth = 0;
    for(var j = 0; j < rowData.fields.length; j++) {
      _renderField(rowData.fields[j]);
    }
  }

  var _renderField = function(field) {
    var renderedField;

    if (field.type) {
      switch (field.type) {
        case "text":
          renderedField = _renderTextField(field);
          break;
        case "textarea":
          renderedField = _renderTextField(field);
          break;
        case "radio":
          renderedField = _renderOptions(field, 'Radio');
          break;
        case "dropdown":
          renderedField = _renderSelect(field);
          break;
        case "checkbox":
          renderedField = _renderOptions(field, 'Checkbox');
          break;
      }

      var renderedFieldRect = MD.getRect(renderedField);

      renderedFieldRect.setX(rowWidth);
      renderedFieldRect.setY(formHeight);

      rowWidth = rowWidth + renderedFieldRect.width + 16;

      formGroup.addLayers([renderedField]);
      formGroup.resizeToFitChildrenWithOption(1);

    }
  }

  var _renderSelect = function(field) {
    var fields = ['Forms/Select/Normal'];

    if(field.value) {
      fields = ['Forms/Select/Filled'];
    }

    if(field.hasError) {
      fields = ['Forms/Select/Error'];
    }

    MD.import('forms', fields);

    field.value = field.optionValue;

    var selectFieldSymbol = MD.findSymbolByName(fields[0]);
    var selectField = selectFieldSymbol.newSymbolInstance();
    var overridesFieldNames = ['helpText', 'label', 'value'];
    _updateOverrides(selectField, selectFieldSymbol, overridesFieldNames, field);

    return selectField;
  }

  var _renderOptions = function(field, type) {
    var optionButtons = [];
    var optionButtonGroup = MD.addGroup();
    var optionFieldGroup = MD.addGroup();

    var label = MD.addText();
    var helpText = MD.addText();

    var labelStyle = MD.sharedTextStyle('Forms/Light/Label/Idle');

    if(field.hasError) {
      labelStyle = MD.sharedTextStyle('Forms/Light/Label/Error');
    }

    label.setStringValue(field.label);
    label.setStyle(labelStyle);

    helpText.setStringValue(field.helpText);
    helpText.setStyle(labelStyle);

    var helpTextRect = MD.getRect(helpText);

    var labelRect = MD.getRect(label);
    labelRect.setY(14);

    for(var i = 0; i < field.options.length; i++) {
      var offOn = "Off";

      if((field.type == 'checkbox' && field.options[i].isChecked) ||
         (field.type == 'radio' && field.options[i].value == field.optionValue)) {
        offOn = 'On';
      }

      var optionSymbol = MD.findSymbolByName('Forms/' + type + '/' + offOn);
      var option = optionSymbol.newSymbolInstance();
      var overridesFieldNames = ['label'];

      var newVals = {
        label: field.options[i].label
      }

      var optionRect = MD.getRect(option);
      optionRect.setY((optionRect.height * i) + 4 + 14 + labelRect.height);

      _updateOverrides(option, optionSymbol, overridesFieldNames, newVals);
      optionButtons.push(option);
    }

    optionButtonGroup.addLayers(optionButtons);
    optionButtonGroup.setName(type + '-group');
    optionButtonGroup.resizeToFitChildrenWithOption(1);

    var bounds = MD.addShape();
    var boundsRect = MD.getRect(bounds);
    boundsRect.setConstrainProportions(false);
    optionFieldGroup.setConstrainProportions(false);

    optionFieldGroup.addLayers([bounds, optionButtonGroup, label]);
    optionFieldGroup.resizeToFitChildrenWithOption(1);

    var optionFieldGroupRect = MD.getRect(optionFieldGroup);

    helpTextRect.setY(optionFieldGroupRect.height);

    optionFieldGroup.addLayers([helpText]);
    optionFieldGroup.resizeToFitChildrenWithOption(1);

    boundsRect.setHeight(optionFieldGroupRect.height);
    boundsRect.setWidth(optionFieldGroupRect.width);

    optionFieldGroup.resizeToFitChildrenWithOption(1);
    return optionFieldGroup;
  }

  var _renderTextField = function(field) {
    var fields = ['Forms/Textfield/Normal'];

    if(field.value) {
      fields = ['Forms/Textfield/Filled'];
    }

    if(field.hasError) {
      fields = ['Forms/Textfield/Error'];
    }

    if(field.type == 'textarea' && field.counter) {
      field.counter =  field.value.length + " / " + field.counter;
    } else {
      field.counter = ' ';
    }

    MD.import('forms', fields);
    var textFieldSymbol = MD.findSymbolByName(fields[0]);
    var textField = textFieldSymbol.newSymbolInstance();
    var overridesFieldNames = ['helpText', 'label', 'value', 'counter'];
    _updateOverrides(textField, textFieldSymbol, overridesFieldNames, field);
    return textField;
  }

  var _updateOverrides = function(instance, symbolMaster, overridesFieldNames, field) {
    var layerIDs = _getLayerIDs(instance, symbolMaster, overridesFieldNames);
    var values = instance.overrides();
    if (!values) { values = NSMutableDictionary.dictionary(); }
    var existingOverrides = values;
    var mutableOverrides = NSMutableDictionary.dictionaryWithDictionary(existingOverrides)
    var keys = Object.keys(layerIDs);
    for(k = 0; k < keys.length; k++) {
      var key = keys[k];
      mutableOverrides.setObject_forKey(field[key], layerIDs[key]);
    }
    instance.overrides = mutableOverrides;
  };

  var _getLayerIDs = function(instance, symbolMaster, overridesFieldNames) {
    // var symbolMaster = instance.symbolMaster();
    var children = symbolMaster.children();
    var layerIDs = {};

    for (var i = 0; i < children.count(); i++){
      var layer = children[i];
      for(var j = 0; j < overridesFieldNames.length; j++) {
        var overridesID = overridesFieldNames[j];
        if(layer.name() == overridesFieldNames[j] ) {
          layerIDs[overridesID] = layer.objectID();
          break;
        }
      }
    }

    return layerIDs;
  };

  return {
    generateForms: _generateForms
  }
}
