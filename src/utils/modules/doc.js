import $ from './array';

export default {
  doc() {
    const document = NSDocumentController.sharedDocumentController().currentDocument();
    return document;
  },
  current() {
    const doc = this.doc(),
      page = doc.currentPage(),
      artboard = page.currentArtboard();

    return artboard || page;
  },
  selection() {
    return this.doc()
      .selectedLayers()
      .layers();
  },
  allLayers() {
    return this.current().children();
  },
  getDocumentSymbols() {
    const symbols = this.doc().documentData().allSymbols();
    return $.mapObject(symbols, function (symbol) {
      return [symbol.symbolID(), symbol];
    });
  }
};
