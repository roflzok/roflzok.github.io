Lib = {}; // global export

(function(){
  var colorStringToRGB = function(colorString) {
    if (colorString.length !== 6) {
      throw new Error('Color must be 6 characters long.');
    }
    return Color.Space.HEX_RGB(
      Color.Space.STRING_HEX(colorString)
    );
  };

  var RGBToColorString = function(rgb) {
    return Color.Space.HEX_STRING(
      Color.Space.RGB_HEX(rgb)
    );
  };

  Lib.colorToBlind = function(colorString, colorBlindType) {
    var colorBlindTypes = ['protan', 'deutan', 'tritan', 'achroma', 'custom'];
    colorBlindType = colorBlindType || 'deutan'; // default
    if (!_.contains(colorBlindTypes, colorBlindType)) {
      throw new Error(colorString + ' is not a color blind type');
    }

    var color = colorStringToRGB(colorString);
    console.log(color);
    var colorBlind = Color.Blind(color, colorBlindType);
    console.log(colorBlind);

    return RGBToColorString(colorBlind);
  };

})();
