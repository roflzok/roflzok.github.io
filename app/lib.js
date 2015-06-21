Lib = {}; // global export

(function(){
  var colorStringToRGB = function(colorString) {
    if (colorString[0] === '#') {
      colorString = colorString.substr(1);
    }
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

  var colorDistance = function(colorString1, colorString2) {
    return DeltaE.getDeltaE00(colorToLab(colorString1), colorToLab(colorString2));
  };

  Lib.colorToBlind = function(colorString, colorBlindType) {
    var colorBlindTypes = ['protan', 'deutan', 'tritan', 'achroma', 'custom'];
    colorBlindType = colorBlindType || 'deutan'; // default
    if (!_.contains(colorBlindTypes, colorBlindType)) {
      throw new Error(colorString + ' is not a color blind type');
    }

    var color = colorStringToRGB(colorString);
    var colorBlindString = RGBToColorString(Color.Blind(color, colorBlindType));

    if (colorString[0] === '#') {
      return '#' + colorBlindString;
    } else {
      return colorBlindString;
    }
  };

  Lib.colorAssessment = function(colorString1, colorString2) {
    var distance = Math.round(colorDistance(colorString1, colorString2));
    var rgb = colorStringToRGB(colorString1);
    var causes = {};
    if (distance>30) {
      if (rgb.R > 200) causes.highRed = true;
      if (rgb.G > 200) causes.highGreen = true;
      if (_.isEmpty(causes)) {
        var cause = (rgb.R > rgb.G)? 'moderateRed' : 'moderateGreen';
        causes[cause] = true;
      }
    }
    
    return {
      distance: distance,
      rgb: rgb,
      causes: causes,
    }
  }

})();

