Color.Blind.js
------------------------------------

Color.Blind(color, type, anomalize) -> colorBlind

where

color:  Object ~ {R:100, G:0, B:0}
type: String ~ 'protan', 'deutan', 'tritan', 'achroma', 'custom'
anomalize: Boolean
colorBlind:  Object ~ {R:100, G:0, B:0}


Color.Space.js
------------------------------------

rgbColor = {R:255,G:255,B:0};
Color.Space.RGB_HEX(rgbColor).toString(16);
"ffff00";
