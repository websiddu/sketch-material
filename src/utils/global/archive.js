import doc from '../modules/doc';
import $ from '../modules/array';

const SKETCH_47_JSON_FORMAT_VERSION = 95;
export default {
  stringFromData(data) {
    return NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);
  },

  dataFromString(string) {
    return NSString.stringWithString(string).dataUsingEncoding(NSUTF8StringEncoding);
  },

  wrapArchiveDataInHeader(archiveData) {
    const archiveJSONString = this.stringFromData(archiveData);
    const archiveJSData = JSON.parse(archiveJSONString);
    const headerJSData = this.createArchiveHeaderJSData();
    headerJSData.root = archiveJSData;
    const archiveWithHeaderJSONString = JSON.stringify(headerJSData);
    return this.dataFromString(archiveWithHeaderJSONString);
  },

  createArchiveHeaderJSData() {
    // Creating a header directly with MSArchiveHeader.new()
    // results in a header with no properties --- not what we
    // want. Instead, export a stub object and use the header
    // from that.
    const object = MSImmutableLayer.new();
    const archiveWithHeaderData = MSJSONDataArchiver.archivedDataWithHeaderAndRootObject(object);
    const archiveWithHeaderJSONString = this.stringFromData(archiveWithHeaderData);
    const archiveWithHeaderJSData = JSON.parse(archiveWithHeaderJSONString);
    delete archiveWithHeaderJSData.root;
    return archiveWithHeaderJSData;
  },

  // Unarchive with a known version of the JSON format.
  sketchObjectFromArchiveJSONUsingFormatVersion(jsonString, formatVersion) {
    return MSJSONDataUnarchiver.unarchiveObjectWithString_asVersion_corruptionDetected_error(
      jsonString,
      formatVersion,
      null,
      null
    );
  },

  recurseThroughLayers(root, fn) {
    fn(root)
    if (root.layers && root.layers()) {
      root.layers().forEach(l => this.recurseThroughLayers(l, fn))
    }
  },

  getSharedStylesFromContainer(layer) {
    let layerStyledUsed = {};
    this.recurseThroughLayers(layer, l => {
      let sharedObject = l.sharedObject();
      if (sharedObject) {
        layerStyledUsed["" + l.sharedStyleID()] = sharedObject.immutableModelObject();
      }
    });
    return layerStyledUsed;
  },

  archiveDataFromSketchObject(object, options) {
    if (options && options.includeDependencies) {
      if (!options.document) {
        throw 'Options must include "document" when "includeDependencies" is true';
      }
      const documentData = options.document.documentData();

      let symbols = MSPasteboardLayersBase.usedSymbolsInContainer_document(
        MSLayerArray.arrayWithLayer(object),
        documentData
      );

      let sharedStyles = {};

      // In Sketch 48 the symbols are returned as a set of
      // ids, but what we need is a map of those ids to the
      // symbols themselves.
      if (symbols.class().isSubclassOfClass(NSSet)) {
        const symbolsDict = NSMutableDictionary.new();
        const documentSymbols = doc.getDocumentSymbols();
        $.forEach(symbols.allObjects(), (symbolID) => {
          const symbol = documentSymbols[symbolID].immutableModelObject();
          symbolsDict.setObject_forKey(symbol, symbolID);
          const styles = this.getSharedStylesFromContainer(documentSymbols[symbolID]);
          sharedStyles = Object.assign(sharedStyles, styles)
        });
        symbols = symbolsDict;
      }

      object = NSDictionary.dictionaryWithDictionary({
        layers: [object.immutableModelObject()],
        symbols: symbols,
        sharedStyles: sharedStyles
      });

    }

    const immutableObject = object.immutableModelObject();

    const archiver = MSJSONDataArchiver.new();
    archiver.setArchiveObjectIDs(true);
    const archiveData = archiver.archivedDataWithRootObject_error(immutableObject, null);

    return this.wrapArchiveDataInHeader(archiveData);
  },

  sketchObjectFromArchiveData(archiveData) {
    if (archiveData && archiveData.class().isSubclassOfClass(NSData)) {
      const jsonString = this.stringFromData(archiveData);

      // The default format version to use is the one exported
      // by Sketch 47. This is the last version for which we
      // did not store the format version so we would know
      // what to use when unarchiving. This is not exact
      // because of course customers do not always upgrade at
      // the same time, but because of backwards compatibility
      // going back several format versions, it is fine.
      var formatVersion = SKETCH_47_JSON_FORMAT_VERSION;

      var jsData;
      try {
        jsData = JSON.parse(jsonString);
      } catch (err) {
        jsData = null; // No-op.
      }

      if (!jsData) {
        // Format is not JSON, use the keyed unarchiver.
        return MSKeyedUnarchiver.unarchiveObjectWithData_asVersion_corruptionDetected_error(
          archiveData,
          formatVersion,
          null,
          null
        );
      }

      if (jsData._class === 'MSArchiveHeader') {
        // If there is a wrapping header, take the format
        // version from it.
        formatVersion = jsData.version;

        // Also unwrap the archive data from the header
        // because the header throws Sketch off even though it
        // contains the correct version information.
        jsData = jsData.root;
      }

      return this.sketchObjectFromArchiveJSONUsingFormatVersion(
        JSON.stringify(jsData),
        formatVersion
      );

    } else {
      // Object has already been unarchived.
      return archiveData;
    }
  },

}
