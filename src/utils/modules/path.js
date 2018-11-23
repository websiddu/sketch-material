import path from '@skpm/path';

export default {
  getPluginCachePath() {
    let cachePath = String(NSFileManager.defaultManager().URLsForDirectory_inDomains_(
      NSCachesDirectory,
      NSUserDomainMask)[0].path());
    let pluginCacheKey = String(__command.pluginBundle().identifier()); // TODO: escape if needed
    return path.join(cachePath, pluginCacheKey);
  },
  mkdirpSync(path, mode) {
    mode = mode || 0o777;
    let err = MOPointer.alloc().init();
    let fileManager = NSFileManager.defaultManager();
    fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, true, {
      NSFilePosixPermissions: mode
    }, err);

    if (err.value() !== null) {
      throw new Error(err.value());
    }
  }
}
