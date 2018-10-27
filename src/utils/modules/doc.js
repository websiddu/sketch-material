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
  }
};
