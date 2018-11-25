import fs from "@skpm/fs";
import path from "@skpm/path";

import Utils from "../utils/index";
import Archive from "../utils/global/archive";

let library = {};

const updateIndex = function () {
  const cachePath = Utils.getPluginCachePath();
  let indexCachePath = path.join(cachePath, 'index.json');

  fs.writeFileSync(indexCachePath, JSON.stringify(library), {
    encoding: 'utf8'
  });
}

const captureLayerImage = function (layer, destPath) {
  let air = layer.absoluteInfluenceRect();
  let rect = NSMakeRect(air.origin.x, air.origin.y, air.size.width, air.size.height);
  let exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_inRect_(
    MSImmutableLayerAncestry.ancestryWithMSLayer_(layer),
    rect // we pass this to avoid trimming
  ).firstObject();
  exportRequest.format = 'png';
  exportRequest.scale = 2;
  if (!(layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster)) {
    exportRequest.includeArtboardBackground = false;
  }
  // exportRequest.shouldTrim = false;
  Utils.doc().saveArtboardOrSlice_toFile_(exportRequest, destPath);
}

const exportLayer = function (layer, pageName) {
  const options = {
    includeDependencies: true,
    document: Utils.doc()
  }
  const data = Archive.archiveDataFromSketchObject(layer, options);
  const cachePath = Utils.getPluginCachePath();


  const layerId = String(layer.objectID());
  const folder = path.join(cachePath, pageName)
  Utils.mkdirpSync(folder);
  const filePath = path.join(folder, layerId + '.json');
  const imagePath = path.join(folder, layerId + '.png');

  const layerObj = {
    type: 'layer',
    id: layerId,
    name: layer.name(),
    component: pageName,
    data: '/static/l/gm/' + pageName + '/' + layerId + '.json',
    imagePath: '/static/l/gm/' + pageName + '/' + layerId + '.png',
    width: Number(layer.absoluteInfluenceRect().size.width),
    height: Number(layer.absoluteInfluenceRect().size.height),
  }

  captureLayerImage(layer, imagePath);

  fs.writeFileSync(filePath, data, {
    encoding: 'NSData'
  });

  if (!library[pageName]) library[pageName] = [];

  library[pageName].push(layerObj);
}


const parsePageLayers = function (page) {
  const layers = page.layers();
  if (layers.count() > 0) {
    const layersLoop = layers.objectEnumerator();
    let layer = null;
    while (layer = layersLoop.nextObject()) {
      exportLayer(layer, "" + page.name());
    }
  }
}


export default function () {
  const pages = Utils.doc().documentData().pages();
  const pagesLoop = pages.objectEnumerator();
  let page = null;
  while (page = pagesLoop.nextObject()) {
    if (page.name().isEqualToString('Symbols')) continue;
    parsePageLayers(page);
  }
  updateIndex();
}
