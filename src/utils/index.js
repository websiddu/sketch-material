import ArrayUtils from './modules/array'
import ClassUtils from './modules/class'
import ColorUtils from './modules/color'
import DocUtils from './modules/doc'
import DomUtils from './modules/dom'
import StyleUtils from './modules/styles'
import SymbolUtils from './modules/symbol'
import UiUtils from './modules/ui'
import PathUtils from './modules/path'
import SettingsUtils from './modules/settings'

const Utils = Object.assign({},
  ArrayUtils,
  ClassUtils,
  ColorUtils,
  DocUtils,
  DomUtils,
  StyleUtils,
  SymbolUtils,
  UiUtils,
  PathUtils,
  SettingsUtils
)

export default Utils;
