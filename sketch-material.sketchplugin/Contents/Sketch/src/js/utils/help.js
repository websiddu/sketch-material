// help.js
MD.extend({
    mathHalf: function(number){
        return Math.round( number / 2 );
    },
    convertUnit: function(length, isText, percentageType){
        if(percentageType && this.artboard){
            var artboardRect = this.getRect( this.artboard );
            if (percentageType == "width") {
                 return Math.round((length / artboardRect.width) * 1000) / 10 + "%";

            }
            else if(percentageType == "height"){
                return Math.round((length / artboardRect.height) * 1000) / 10 + "%";
            }
        }

        var length = Math.round( length / this.configs.scale * 10 ) / 10,
            units = this.configs.unit.split("/"),
            unit = units[0];

        if( units.length > 1 && isText){
            unit = units[1];
        }

        return length + unit;
    },
    toHex:function(c) {
        var hex = parseInt(c, 16);
        return hex.length == 1 ? "0" + hex :hex;
    },
    hexToNSColor: function (hex, alpha) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: this.toHex(result[1])/255,
            g: this.toHex(result[2])/255,
            b: this.toHex(result[3])/255,
            a: alpha || 1
        } : null;
    },
    hexToRgb:function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: this.toHex(result[1]),
            g: this.toHex(result[2]),
            b: this.toHex(result[3])
        } : null;
    },
    isIntersect: function(targetRect, layerRect){
        return !(
            targetRect.maxX <= layerRect.x ||
            targetRect.x >= layerRect.maxX ||
            targetRect.y >= layerRect.maxY ||
            targetRect.maxY <= layerRect.y
        );
    },
    getDistance: function(targetRect, containerRect){
        var containerRect = containerRect || this.getRect(this.current);

        return {
            top: (targetRect.y - containerRect.y),
            right: (containerRect.maxX - targetRect.maxX),
            bottom: (containerRect.maxY - targetRect.maxY),
            left: (targetRect.x - containerRect.x),
        }
    },
    message: function(message){
        this.document.showMessage(message);
    },
    findInJsArray: function (val, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val) {
                return true;
            }
        }
        return false;
    },
    findSymbolByName: function (symbolName) {
        var targetSymbols = this.documentData.allSymbols();
        for (var j = 0; j < targetSymbols.count(); j++) {
            var targetSymbol = targetSymbols.objectAtIndex(j);
            if (targetSymbol.name().isEqualToString(symbolName)) {
                return targetSymbol;
            }
        }
        return false;
    },
    findSymbol: function (targetSymbols, clonedSymbol) {
        for (var j = 0; j < targetSymbols.count(); j++) {
            var targetSymbol = targetSymbols.objectAtIndex(j);
            if (clonedSymbol.name().isEqualToString(targetSymbol.name())) {
                return true;
            }
        }
        return false;
    },
    find: function(format, container, returnArray){
        if(!format || !format.key  || !format.match){
            return false;
        }
        var predicate = NSPredicate.predicateWithFormat(format.key,format.match),
            container = container || this.current,
            items;

        if(container.pages){
            items = container.pages();
        }
        else if( this.is( container, MSSharedStyleContainer ) || this.is( container, MSSharedTextStyleContainer ) ){
            items = container.objectsSortedByName();
        }
        else if( container.children ){
            items = container.children();
        }
        else{
            items = container;
        }

        var queryResult = items.filteredArrayUsingPredicate(predicate);

        if(returnArray) return queryResult;

        if (queryResult.count() == 1){
            return queryResult[0];
        } else if (queryResult.count() > 0){
            return queryResult;
        } else {
            return false;
        }
    },
    clearAllMarks: function(){
        var layers = this.page.children().objectEnumerator();
        while(layer = layers.nextObject()) {
            if(this.is(layer, MSLayerGroup) && this.regexNames.exec(layer.name())){
                this.removeLayer(layer)
            }
        }
    },
    toggleHidden: function(){
        var isHidden = (this.configs.isHidden)? false : !Boolean(this.configs.isHidden);
        this.configs = this.setConfigs({isHidden: isHidden});

        var layers = this.page.children().objectEnumerator();

        while(layer = layers.nextObject()) {
            if(this.is(layer, MSLayerGroup) && this.regexNames.exec(layer.name())){
                layer.setIsVisible(!isHidden);
            }
        }
    },
    toggleLocked: function(){
        var isLocked = (this.configs.isLocked)? false : !Boolean(this.configs.isLocked);
        this.configs = this.setConfigs({isLocked: isLocked});

        var layers = this.page.children().objectEnumerator();

        while(layer = layers.nextObject()) {
            if(this.is(layer, MSLayerGroup) && this.regexNames.exec(layer.name())){
                layer.setIsLocked(isLocked);
            }
        }
    },
    isImmutableSketchObject: function(sketchObject) {
        return !!(
            sketchObject &&
            sketchObject.class().mutableClass &&
            sketchObject.class().mutableClass() &&
            sketchObject.class().mutableClass() !== sketchObject.class()
        );
    },
    mutableSketchObject: function(immutableSketchObject) {
        if (immutableSketchObject && immutableSketchObject.class) {
            const immutableClass = immutableSketchObject.class();
            if (immutableClass.mutableClass) {
            const mutableClass = immutableClass.mutableClass();
            return mutableClass.new().initWithImmutableModelObject(
                immutableSketchObject
            );
            }
        }
    },

    $forEach: function(collection, iterator) {
        for (var i = 0; i < collection.count(); i++) {
        const item = collection.objectAtIndex(i);
        const returnValue = iterator(item, i, collection);
        if (returnValue === false) {
            break;
        }
        }
    },

    $map: function(collection, transform) {
        const result = [];
        $.forEach(collection, function(item, i, collection) {
        result.push(transform(item, i, collection));
        });
        return result;
    },

    $mapObject: function(collection, transform) {
        const results = {};
        $.forEach(collection, function(item, i, collection) {
        const result = transform(item, i, collection);
        const key = result[0];
        const value = result[1];
        results[key] = value;
        });
        return results;
    },

    $find: function(collection, predicate) {
        var result;
        $.forEach(collection, function(item, i, collection) {
        if (predicate(item, i, collection)) {
            result = item;
            return false;
        }
        });
        return result;
    },

    dictionaryWithMutableSketchObjects: function(dictionary) {
    return $mapObject(dictionary.allKeys(), function(key) {
        const object = dictionary.objectForKey(key);
        if (object.class().dictionary) {
        return [key, dictionaryWithMutableSketchObjects(object)];
        } else if (isImmutableSketchObject(object)) {
        return [key, mutableSketchObject(object)];
        } else {
        return [key, object];
        }
    });
    },

    arrayWithMutableSketchObjects: function(array) {
        return $map(array, function(object) {
            if (isImmutableSketchObject(object)) {
            return mutableSketchObject(object);
            } else {
            return object;
        }});

        // for(var i = 0; i < array.length; i++) {
        //     var object = array[i];
        //     if (MD.isImmutableSketchObject(object)) {
        //         array[i] = MD.mutableSketchObject(object);
        //     }
        // }

        // return array;

    }

});
