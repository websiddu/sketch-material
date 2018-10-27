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
  }
};
