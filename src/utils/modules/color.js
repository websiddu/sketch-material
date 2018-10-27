export default {
  hexToNSColor: function(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: this.toHex(result[1]) / 255,
          g: this.toHex(result[2]) / 255,
          b: this.toHex(result[3]) / 255,
          a: alpha || 1
        }
      : null;
  },
  toHex: function(c) {
    var hex = parseInt(c, 16);
    return hex.length == 1 ? "0" + hex : hex;
  },
  hexToMSColor(hex) {
    var r = parseInt(hex.substring(1, 3), 16) / 255,
      g = parseInt(hex.substring(3, 5), 16) / 255,
      b = parseInt(hex.substring(5, 7), 16) / 255,
      a = 1;
    return MSColor.colorWithRed_green_blue_alpha(r, g, b, a);
  },
  rgbaToMSColor: function(rgba) {
    rgba = rgba.replace("rgba(", "").replace(")", "");
    rgba = rgba.split(",");

    var r = parseFloat(rgba[0]) / 255,
      g = parseFloat(rgba[1]) / 255,
      b = parseFloat(rgba[2]) / 255,
      a = parseFloat(rgba[3]);

    return MSColor.colorWithRed_green_blue_alpha(r, g, b, a);
  },
  cssColorToMSColor: function(color) {
    if (color.type == "hex") {
      return this.hexToMSColor(color.value);
    }
    if (color.type == "rgba") {
      return this.rgbaToMSColor(color.value);
    }
  }
};
