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

  var caseKeys = function(obj,lower) {
    _.forOwn(obj, function(value, oldKey, obj){
      var newKey = lower? oldKey.toLowerCase() : oldKey.toUpperCase();
      obj[newKey] = value;
      if (newKey !== oldKey) {
        delete obj[oldKey];
      }
    });
    return obj;
  };

  var colorToLab = function(colorString) {
    var rgb = caseKeys(
      colorStringToRGB(colorString), true
    ); // lowerCase for IColor
    
    return caseKeys(
      IColor.convert(rgb,'LAB')
    ); // upperCase for Color.Blind and Delta
  };

  Lib.colorToBlind = function(colorString, colorBlindType) {
    var colorBlindTypes = ['protan', 'deutan', 'tritan', 'achroma', 'custom'];
    colorBlindType = colorBlindType || 'deutan'; // default
    if (!_.contains(colorBlindTypes, colorBlindType)) {
      throw new Error(colorString + ' is not a color blind type');
    }

    var color = colorStringToRGB(colorString);
    var colorBlind = Color.Blind(color, colorBlindType);

    return RGBToColorString(colorBlind);
  };

  Lib.colorDistance = function(colorString1, colorString2) {
    return DeltaE.getDeltaE94(colorToLab(colorString1), colorToLab(colorString2));
  };

})();

