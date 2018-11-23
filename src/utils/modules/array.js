import ClassUtils from "./class";

export default {
  find(format, container, returnArray) {
    if (!format || !format.key || !format.match) {
      return false;
    }
    var predicate = NSPredicate.predicateWithFormat(format.key, format.match),
      container = container || this.current,
      items;

    if (container.pages) {
      items = container.pages();
    } else if (
      ClassUtils.is(container, MSSharedStyleContainer) ||
      ClassUtils.is(container, MSSharedTextStyleContainer)
    ) {
      items = container.objectsSortedByName();
    } else if (container.children) {
      items = container.children();
    } else {
      items = container;
    }

    var queryResult = items.filteredArrayUsingPredicate(predicate);

    if (returnArray) return queryResult;

    if (queryResult.count() == 1) {
      return queryResult[0];
    } else if (queryResult.count() > 0) {
      return queryResult;
    } else {
      return false;
    }
  },

  forEach(collection, iterator) {
    for (var i = 0; i < collection.count(); i++) {
      const item = collection.objectAtIndex(i);
      const returnValue = iterator(item, i, collection);
      if (returnValue === false) {
        break;
      }
    }
  },

  map(collection, transform) {
    const result = [];
    this.forEach(collection, function (item, i, collection) {
      result.push(transform(item, i, collection));
    });
    return result;
  },

  mapObject(collection, transform) {
    const results = {};
    this.forEach(collection, function (item, i, collection) {
      const result = transform(item, i, collection);
      const key = result[0];
      const value = result[1];
      results[key] = value;
    });
    return results;
  },

  find(collection, predicate) {
    var result;
    this.forEach(collection, function (item, i, collection) {
      if (predicate(item, i, collection)) {
        result = item;
        return false;
      }
    });
    return result;
  },

  filter(collection, predicate) {
    const result = [];
    this.forEach(collection, function (item, i, collection) {
      if (predicate(item, i, collection)) {
        result.push(item);
      }
    });
    return result;
  }
};
