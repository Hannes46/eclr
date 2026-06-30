/* exoticcolor-library.js
"Version 0.19&#10;2026-06-30T17:00&#10;"
Changes:
hexAlpha Auswertung entfernt hjt1946 2021-09-26.
Alle Zeichen[ketten] von '…' in "…" geändert hjt1946 2021-10-29.
EC.isTransparent entfernt, war nutzlos.
In Arbeit:
In topMsg() Warnungen einbauen!
Getrennte Warnmeldungen einbauen.
Fehlerwert ändern auf Fehleranzahl.
inputError() ersetzen.
Änderung 2026-06-30 hjt1946: Mit Sublime neu eingerückt, Version angepasst.
*/

(function (root, factory) {
  //console.log("exoticColor: this='%s' root='%s' typeof(factory)='%s' factory='%s'", this, root, typeof(factory), factory);
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    // CommonJS/Node module
    module.exports = factory();
  } else {
    // Browser globals
    root.exoticColor = factory();
  }
}(this, function()
{
  "use strict";

  let EC = null;

  // FROM: CSS Color Module Level 4
  // Editor’s Draft, 14 November 2017
  const namedColors = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "778899",
    lightslategrey: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
  };

  /* The visible library part.
  Das ganze HTML-Interface muss ausgelagert werden in ein externes Object.
  */
  let exoticColor = {
    name: "exoticColor",
    version: "0.6.19",
    // From isError to hexAlpha are all typeof number and must set to number!
    isError: 0, // 0: ok, ≥1: error
    isWarn: 0, // 0: ok, ≥1: warning (todo)
    outputPrecision: 2, // H, S, L, V, W, Bl displayed decimal places.
    alphaPrecision: 2, // opacity displayed decimal places.
    handleError: 1, // 0: no message, 1: warn and error message.
    alphaOne: 0, // Output format if alpha=1:
    // 0: do not use alpha formats, output like CSS3 rgb() and hsl().
    // 1: use alpha formats, output like CSS3 rgba() and hsla().
    rgbPrecision: 2, // rgb displayed decimal places.
    rgbOutput: 1, // rgb output format 0|1.
    // 0: CSS3 like integer.
    // 1: CSS4 like number.
    hexAlpha: 0, // 0: #rgba|#rrggbbaa (W3C), 1: #argb|#aarrggbb (Mobile) disabled!
    initI: null, // initInput, init by colorInit() - (implementieren)
    colorI: null, // cssInput, init by colorInit() - readonly
    hslI: null, // hslInput, init by colorInit() - rw
    hwbI: null, // hwbInput, init by colorInit() - rw
    hsvI: null, // hsvInput, init by colorInit() - rw
    rgbI: null, // rgbInput, init by colorInit() - rw
    hexI: null, // hexInput, init by colorInit() - rw
    nameI: null, // nameInput, init by colorInit() - rw
    namesI: null, // nameSelect, init by colorInit() - rw
    rgbR: null, // R slider, init by colorInit()
    rgbG: null, // G slider, init by colorInit()
    rgbB: null, // B slider, init by colorInit()
    hslH: null, // H slider, init by colorInit()
    hslS: null, // S slider, init by colorInit()
    hslL: null, // L slider, init by colorInit()
    alphaA: null, // A slider, init by colorInit()
    rgbValue: null, // Value over slider, init by colorInit()
    hslValue: null, // Value over slider, init by colorInit()
    alphaValue: null, // Value over slider, init by colorInit()
    warnMsg: null, // Warning over text inputs, init by colorInit()
    warnString: "", // String for warnMsg
    errorValue: null, // Value over text inputs, init by colorInit()
    errorMsg: null, // Message over text inputs, init by colorInit()
    errorString: "", // String for errorMsg
    topMsgF: null, // Autoinit to topMsg()
    clearErrorF: null, // Autoinit to clearError()
    //noDetails: 0, // 0|1: if browser handles <details> momentan raus
    noStorage: -1, // 0|1: if browser has Storage API, Nachsehen ob noch Browser betroffen sind.
    dataAttribute: "data-eclr", // unused

    /* isString
    $param: s. Should be a string.
    $param: f - string with caller function name.
    $return: bool.
    ToDo: Als Inline-Test einbauen. Bei Fehler try/catch verwenden um Funktionsname und Zeilennummer zu erhalten.
    */
    isString: function (s, f) {
      if (!f) {f = "";}
      if (typeof s !== "string") {
        EC.isError++;
        EC.errorString = f + " Error: '" + s + "' not a string!";
        EC.topMsgF("");
        return false;
      }
      return true;
    },

    /* nameCssToHEX
    $param: s - string with color name.
    $return: hex - string #rrggbb | #aarrggbb | null if colorName unknown or empty.
    Changes: hexAlpha Auswertung entfernt hjt1946 2021-09-17.
    */
    nameCssToHEX: function (s) {
      let c = s, hex;
      let key;

      EC.isError = 0;
      /*
      if (!EC.isString(s, "nameCssToHEX")) {
        return null;
      }
      */
      if (typeof s !== "string") {
        EC.isError++;
        EC.errorString = f + " Error: '" + s + "' not a string!";
        EC.topMsgF("");
        return null;
      }
      c = c.trim().toLowerCase();
      if (/^([a-z]{3,20})$/g.test(c)) {
        //console.log("nameCssToHEX 1: name=%s", c);
        if (c === "transparent") {
          //hex = EC.alphaOne === 1 ? "00000000" : "000000"; // not logical
          hex = "00000000";
        } else {
          for(key in namedColors) {
            if (s === key) {
              hex = namedColors[key];
              //console.log("nameCssToHEX 2: name=%s key=%s hex=%s", c, key, hex);
              if (EC.alphaOne === 1) { // alpha always $ff
                hex += "ff";
              }
            }
          }
        }
        //console.log("nameCssToHEX 3: c='%s' hex=%s EC.alphaOne=%s", c, hex, EC.alphaOne);
        if (hex !== undefined) {return "#" + hex;}
        return null; // no name found, no error
      }
      EC.isError++;
      EC.errorString = "nameCssToHEX Error: No color name string '" + s + "'";
      console.log(EC.errorString);
      EC.topMsgF("");
      return null;
    },

    /* nameCssToRGB - CSS-String-Auswertung.
    $param: s - string with color name.
    $return: rgb - array of string [r, g, b(, a)?]. or null if error.
    Array values are with toFixed(0..16) formatted float.
    BUG 2019-06-26: transparent is defined as rgba(0,0,0,0) and must ignore EC.hexAlpha!
    Changes: hexAlpha Auswertung entfernt hjt1946 2021-09-26.
    BUG: Alpha-Wert ist NaN wenn EC.alphaOne==0. Behoben 2021-09-26.
    */
    nameCssToRGB: function (s) {
      let h, r, g, b, a;

      h = EC.nameCssToHEX(s); // handle all error
      //console.log("nameCssToRGB 1: s='%s' h='%s' h.length='%s'", s, h, h.length);
      if (h !== null) {
        h = h.substr(1);
        //console.log("nameCssToRGB 1a: s='%s' h='%s' h.length='%s'", s, h, h.length);
        if (h === "00000000") {
          //console.log("nameCssToRGB 2: h=%s rgb=[0, 0, 0, 0]", h);
          return [0, 0, 0, 0];
        }
        r = parseInt(h[0] + h[1], 16);
        g = parseInt(h[2] + h[3], 16);
        b = parseInt(h[4] + h[5], 16);
        if (h.length === 8) {
          a = parseInt(h[6] + h[7], 16);
        }
        if (a !== "undefined" && !isNaN(a) ) { // EC.alphaOne beachten!
          a = (a / 255).toFixed(EC.alphaPrecision);
          //console.log("nameCssToRGB 3: h=%s rgb=%s", h, [r, g, b, a]);
          return [r, g, b, a];
        }
        //console.log("nameCssToRGB 4: h=%s rgb=%s", h, [r, g, b]);
        return [r, g, b];
      }
      return null; // empty or undefined name
    },

    /* nameCssToHSL - CSS-String-Auswertung.
    $param: s - string with color name.
    $return: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1) or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    nameCssToHSL: function (s) {
      let h;

      h = EC.nameCssToHEX(s); // parse all errors
      if (h !== null) {
        return EC.hexToHSL(h);
      }
      return null; // empty or undefined name
    },

    /* hexToName
    $param: #rrggbb | #aarrggbb | #rrggbbaa - string (see hexAlpha).
    # may be omitted. Length must fit to 6 or 8. No error check.
    $return: colorname - string, or "" if none found.
    Changes: hexAlpha Auswertung entfernt hjt1946 2021-09-26.
    */
    hexToName: function (s) {
      let key;
      let h = s.replace(/ |#/g, "");
      //console.log("hexToName: h=%s hexAlpha=%s", h, EC.hexAlpha);
      if (h === "00000000") {
        //console.log("hexToName: h=%s transparent", h);
        return "transparent";
      }
      h = h.substring(0,6);
      // now h in rrggbb format
      for(key in namedColors) {
        if (namedColors[key] === h) {
          //console.log("hexToName: key=%s h=%s", key, h);
          return key;
        }
      }
      return "";
    },

    /* hexCssTo
    $param: #rgb|#rrggbb, #rgba|#rrggbbaa - string (see hexAlpha).
    $return: #rrggbb | #rrggbbaa - string or null if error.

    CSS3:
    Unlike RGB values, there is no hexadecimal notation for an RGBA value.
    Changes: hexAlpha Auswertung entfernt hjt1946 2021-09-26.
    */
    hexCssTo: function (s) {
      let a, aa, hh, h = s, l;

      EC.isError = 0;
      if (!EC.isString(s, "hexCssTo")) {
        return null;
      }
      if (/^\s*?#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})\s*?$/ig.test(s)) {
        h = h.replace(/#|\s+/g, "").toLowerCase();
        l = h.length;
        h = (l === 3) || (l === 4) ? h.replace(/(.)/g, "$1$1") : h;
        //console.log("hexCssTo: s='%s' h='%s'", s, h);

        if (EC.alphaOne === 0 && l === 8) { // found alpha and split
          aa = h.substring(6,8);
          hh = h.substring(0,6);
          //console.log("hexCssTo 0: s='%s' h='%s' aa='%s' hh='%s'", s, h, aa, hh);
        }

        if (aa !== undefined) {
           // FF and FE → 1
          a = (parseInt(aa, 16) / 255).toFixed(EC.alphaPrecision);
          //console.log("hexCssTo alpha: hh=%s aa='%s' a='%s'", hh, aa, a);
          if (+a === 1) {h = hh;}
        }

        //console.log("hexCssTo test: s='%s' h='%s'", s, '#' + h);
        return "#" + h;
      }
      EC.isError++;
      EC.errorString = "hexCssTo Error: '" + s + "' not #rgb[a] or #rrggbb[aa] HEX value range 0-F!";
      console.log(EC.errorString);
      EC.topMsgF("");
      return null;
    },

    /* rgbCssToRGB - Parse RGB[A] CSS strings.
    $param: s - string. Format rgb(r,g,b) | rgba(r,g,b,a) | rgb(r%,g%,b%) | rgba(r%,g%,b%,a), rgb(r g b) | rgb(r g b/a).
    $return: rgb - array of string [r, g, b(, a)?] or null if error.
    Array values are with toFixed(0..16) formatted float.

    CSS4 syntax:
    rgb() = rgb( <percentage>{3} [ / <alpha-value> ]? ) |
            rgb( <number>{3} [ / <alpha-value> ]? )
    <alpha-value> = <number> | <percentage>
    Legacy syntax:
    rgb() = rgb( <percentage>#{3} , <alpha-value>? ) |
            rgb( <number>#{3} , <alpha-value>? )
    CSS3 (Color Module 3) syntax:
    rgb()  = rgb( <percentage>#{3} ) | rgb( <integer>#{3} )
    rgba() = rgba( <percentage>#{3} , <alpha-value> ) |
             rgb( <integer>#{3} , <alpha-value> )
    with alpha-value as number in range 0..1.
    Values outside the device gamut should be clipped or mapped into the gamut when the gamut is known: the red, green, and blue values must be changed to fall within the range supported by the device.
    */
    rgbCssToRGB: function (s) {
      let a, p, z, rgb = [], ppp = [],
      //percent, // % counter
      percent = 0, // % counter
      comma = 0, // comma counter
      space = 0, // space counter
      css3 = 0, // if rgba() used
      css4 = 0, // if new syntax rgb(r g b/a)
      flagA = 0, // rgba() flag 0|1 - 1: if (css3 || a3A || a4A)
      a3A = 0, // rgb[a](,,a) flag 0|1
      a4A = 0, // rgb(r g b /a) flag 0|1
      a1 = 0, // 0|1: if EC.alphaOne==0 && alpha==1
      err = 0, // error counter
      rp = EC.rgbPrecision;

      EC.isError = 0;
      if (!EC.isString(s, "rgbCssToRGB")) {
        return null;
      }
      s = s.trim();
      p = /(rgba?)(?:\((?:(?:\s*?([\-+]?\d+(?:\.[\d]+)?|[\-+]?\.[\d]+)(%?)\s*?)(?:(,| )\s*?([\-+]?\d+(?:\.[\d]+)?|[\-+]?\.[\d]+)(%?)\s*?)(?:(,| )\s*?([\-+]?\d+(?:\.[\d]+)?|[\-+]?\.[\d]+)(%?)\s*?))(?:(,|\/)\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%?)\s*?)?\)\s*?)/g; // CSS3+4
      a = p.exec(s);
      //console.info("rgbCssToRGB 1: a=%s %s", a, typeof a); // a=Array(13) object, bei Fehler null!
      if (a !== null) {
        //console.log("rgbCssToRGB 2: a=%s", a, a);
        //console.log("rgbCssToRGB 3: a:[0]='%s' [1]='%s' [2]='%s' [3]='%s' [4]='%s' [5]='%s' [6]='%s' [7]='%s' [8]='%s' [9]='%s' [10]='%s' [11]='%s' [12]='%s'", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]);

        //No commas, space used from Color Module 4 syntax. Before alpha is
        // "/". Alpha may be 0..1 or 0%..100% number.

        if (a[1] === "rgba") {
          if (a[11] !== undefined || a[11] !== "") {
            css3 = 1;
          }
          else {
          err++;
          } // CSS3 error, Color Module 4 error
        }

        if (a[3] === "%" || a[6] === "%" || a[9] === "%") {
          if (a[3] === "%" && a[6] === "%" && a[9] === "%") {
            percent = 3;
          } else {
            err++;
          }
        }

        if (a[3] === "" || a[6] === "" || a[9] === "") {
          if (a[3] === "" && a[6] === "" && a[9] === "") {
            percent = 0;
          } else {
            err++;
          }
        }

        if (a[4] === "," && a[7] === ",") {
          //May legacy syntax rgb(r,g,b[,a]) or CSS3 syntax rgb(r,g,b)|rgba().
          comma = 2;
          if (a[11] !== undefined) { // alpha value found
            if (a[10] !== "," || a[11] === "" || a[12] !== "") {
              err++;
            } else {
              comma++;
              a3A = 1;
            }
          }
        }

        if ((css3 && !a3A) || (css3 && (comma < 3))) {
          err++;
        }

        if (a[4] === " " || a[7] === " ") {
          if (a[4] === " " && a[7] === " ") {
            space = 2; css4 = 1;
            if (a[10] === "/" && (a[11] !== undefined || a[11] !== "")) {
              a4A = 1;
              if (a[12] === "%") {
                percent++;
              }
            }
          } else {
            err++;
          }
        }

        if (!comma && !space) {
          err++;
        }

        if (css3 || a3A || a4A) {
          flagA = 1;
          if (EC.alphaOne === 0 && +a[11] === 1) {
            a1 = 1;
          }
        }

        if (css3 === 1 && css4 === 1) {
          err++;
        }

        //console.log("rgbCssToRGB 4: comma=%s space=%s percent=%s css3=%s css4=%s flagA=%s a3A=%s a4A=%s err=%s", comma, space, percent, css3, css4, flagA, a3A, a4A, err);

        if (err) {
          EC.isError++;
          EC.errorString = "rgbCssToRGB Error: " + err + ", '" + s + "' wrong formatted!";
          console.log(EC.errorString);
          EC.topMsgF("");
          return null;
        }

        ppp[0] = +a[2];
        ppp[1] = +a[5];
        ppp[2] = +a[8];

        if (flagA && !a1) { // add a
          if (a4A && a[12] === "%") {
            ppp[3] = (a[11] / 100).toFixed(EC.alphaPrecision);
          } else {
            ppp[3] = (+a[11]).toFixed(EC.alphaPrecision);
          }
        }

        if (percent > 2) {
          let rgbcheck = false; // bool DEBUG
          ppp = EC.checkPercent(ppp, null);
          if (ppp) {
            if (flagA && !a1) {
              rgb = [((ppp[0] * 255) / 100).toFixed(rp), ((ppp[1] * 255) / 100).toFixed(rp), ((ppp[2] * 255) / 100).toFixed(rp), ppp[3]];
            } else {
              rgb = [((ppp[0] * 255) / 100).toFixed(rp), ((ppp[1] * 255) / 100).toFixed(rp), ((ppp[2] * 255) / 100).toFixed(rp)];
            }
            //console.log("rgbCssToRGB %% %% %%: ppp=[%s] rgb=[%s]", ppp.toString(), rgb.toString());
            if(rgbcheck === true) {
              z = EC.checkRGB(rgb);
              console.log("rgbCssToRGB %% %% %% nach checkRGB([%s])=[%s]", rgb.toString(), z.toString());
              return z;
            }
            return rgb;
          }
          return null;
        }
        // number rgba
        if (flagA && !a1) {
          rgb = [(ppp[0]).toFixed(rp), (ppp[1]).toFixed(rp), (ppp[2]).toFixed(rp), ppp[3]];
        } else {
          rgb = [(ppp[0]).toFixed(rp), (ppp[1]).toFixed(rp), (ppp[2]).toFixed(rp)];
        }
        //console.log("rgbCssToRGB: ppp=%s rgb=%s", ppp, rgb);
        return EC.checkRGB(rgb);
      } // !if (a=pattern...) - error
      EC.isError++;
      EC.errorString = "rgbCssToRGB Error: '" + s + "' not rgb(…) CSS!";
      console.log(EC.errorString);
      EC.topMsgF("");
      return null;
    },

    /* hueCssTo - hwbCssTo() integrated, hwb -0.00 output error not here
    $param: s - string. Format is -(hsl may be hsl|hsv)
    CSS3: hsl(h,s%,l%) and hsla(h,s%,l%,a);
    CSS4: hsl(h s% l% [/a | /a%]) | hwb(h w% b% [/a | /a%]).
    $return: hsl | hsv | hwb - array of number (a string) [h, s|w, l|v|b(, a)?] or null if error.
    Value of a is with toFixed(0..16) formatted float.

    CSS4 syntax:
    hsl() = hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? )
    hwb() = hwb(<hue> <percentage> <percentage> [/ <alpha-value>]?) - only CSS4 syntax allowed? AKTUALISIEREN!!!
    <hue> = <number> | <angle>
    <alpha-value> = <percentage> | <number> range 0..1
    Legacy syntax:
    hsl[a]() = hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )
    <hue> = <number> | <angle>
    <alpha-value> = <number> range 0..1
    CSS3 syntax:
    hsl()  = hsl( <hue>, <percentage>, <percentage> )
    hsla() = hsla( <hue>, <percentage>, <percentage>, <alpha-value> )
    <hue> = <number> | <angle>
    <alpha-value> = <number> range 0..1
    HSL: If saturation is less than 0%, implementations must clip it to 0%.
    Implementations must clip the hue, saturation, and lightness components of HSLA color values to the device gamut according to the rules for the HSL color value composed of those components.
    */
    hueCssTo: function (s) {
      let a, p, hpp = [],
      comma = 0, // comma counter
      space = 0, // space counter
      css3 = 0, // if rgba() used
      css4 = 0, // if new syntax rgb(r g b/a)
      flagA = 0, // alpha flag 0|1 - 1: if (css3 || a3A || a4A)
      a3A = 0, // hsla(,,,a) flag 0|1
      a4A = 0, // hsl(h s l /a) flag 0|1
      err = 0, // >0: format error
      a1 = 0; // if EC.alphaOne==0 && alpha==1

      EC.isError = 0;
      if (!EC.isString(s, "hueCssTo")) {
        return null;
      }
      s = s.trim();
      p = /(hs[lv]a?|hwb)(?:\((?:\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)\s*?(?:(,| )\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%))\s*?(?:(,| )\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%))\s*?)(?:(,|\/)\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%?))?\s*?\))/g; // CSS3+4
      a = p.exec(s);
      if (a !== null) {
        //console.log("hueCssTo: a=%s", a);
        //console.log("a:[0]='%s' [1]='%s' [2]='%s' [3]='%s' [4]='%s' [5]='%s' [6]='%s' [7]='%s' [8]='%s' [9]='%s' [10]='%s' [11]='%s' [12]='%s' ", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]);

        //No commas, space used from Color Module 4 syntax. Before alpha is
        // "/". Alpha may be 0-1 or 0%-100% number.
        //CSS3 or Color Module 4 syntax found.

        if (a[1] === "hsla" || a[1] === "hsva") {
          if (a[11] !== undefined || a[11] !== "") {
            css3 = 1;
          } else {err++;} // CSS3 error, Color Module 4 error
        }

        /* //////////////////////////
        if (EC.handleError !== 0) {
          // Könnte entfallen, hilft aber Pattern Fehler zu bemerken.
          // Kommt nicht bei fehlerfreiem Pattern.
          if (a[5] === "%" || a[8] === "%") {
            if (a[5] === "%" && a[8] === "%") {
              ;
            } else {
              err++;
              EC.isError++;
              EC.errorString = "hueCssTo Error: Pattern wrong, \% failure '" + s + "' !"
              console.log(EC.errorString);
              EC.topMsgF("");
            }
          }
        }
        */ //////////////////////////

        if (a[3] === "," || a[6] === "," || a[9] === ",") {
          comma = 1; // min. 1 found

          if (a[3] === "," && a[6] === ",") {
            //May legacy syntax hsl(h,s,l[,a]) or CSS3 syntax hsl(h,s,l)|hsla().
            comma = 2;
            if (a[10] !== undefined) { // alpha value found
              if (a[9] !== "," || a[10] === "" || a[11] !== "") {
                err++;
              } else {
                comma++;
                a3A = 1;
              }
            }
          }
        }

        if ((css3 && !a3A) || (css3 && (comma < 3))) {err++;}

        if (a[3] === " " || a[6] === " ") {
          space = 1; // min. 1 found
          if (a[3] === " " && a[6] === " ") {
            space++; css4 = 1;
            if (a[10] !== undefined) { // alpha value found
              if (a[9] !== "/" || a[10] === "") {
                err++;
              } else {
                a4A = 1;
              }
            }
          }
        }

        if (css3 || a3A || a4A) {
          flagA = 1;
          if (EC.alphaOne === 0 && +a[10] === 1) {
            a1 = 1;
          }
        }

        if (css3 === 1 && css4 === 1) { err++; }
        if (comma > 0 && space > 0) { err++; } 

        if (a[1] === "hwb" && comma !== 0) {
          err+=4;
        }

        //console.log("hueCssTo: comma=%s space=%s css3=%s css4=%s flagA=%s err=%s a1=%s", comma, space, css3, css4, flagA, err, a1);

        if (err) { // format error
          EC.isError++;
          EC.errorString = "hueCssTo Error: '" + s + "' wrong formatted!";
          console.log(EC.errorString);
          EC.topMsgF("");
          return null;
        }

        a[2] %= 360; // hue
        hpp[0] = a[2] < 0 ? a[2] += 360 : a[2];
        hpp[1] = +a[4];
        hpp[2] = +a[7];
        // typeof hpp[1] and typeof hpp[2] is now number!

        //console.log("hueCssTo: comma=%s space=%s css3=%s css4=%s flagA=%s err=%s a1=%s hpp='%s'", comma, space, css3, css4, flagA, err, a1, hpp);

        if (flagA && !a1) {
          if (a4A && a[11] === "%") {
            hpp[3] = (a[10] / 100).toFixed(EC.alphaPrecision);
          } else {
            hpp[3] = (+a[10]).toFixed(EC.alphaPrecision);
          }
        }

        if (a[1] === "hwb") {
          let ratio = hpp[1] + hpp[2];
          if (hpp[1] < 0 | hpp[1] > 100 | hpp[2] < 0 | hpp[2] > 100) {
            EC.isError++;
            EC.errorString = "hueCssTo Error: '" + hpp + "' hwb white or black out of range [0-100]%!";
            console.log(EC.errorString);
            EC.topMsgF("");
            return null;
          }
          if (ratio > 100) { // Result achromatic.
            ratio /= 100;
            hpp[1] /= ratio;
            hpp[2] /= ratio;
            /*
            if (0) { // values ok
              let w0, b0, s0, d0;
              w0 = hpp[1];
              b0 = hpp[2];
              s0 = w0 + b0; // must ≤ 100
              d0 = 100 - s0; // must ≥ 0
              //console.log("hueCssTo: hwb='%s' ratio='%s' w0='%s' b0='%s' s0='%s' d0='%s'", hpp, ratio, w0, b0, s0, d0);
            }
            */
          }
          //else {console.log("hueCssTo: hwb='%s' ratio='%s'", hpp, ratio);}
        }

        //console.log("hueCssTo: with a hpp='%s'", hpp);
        return EC.checkPercent(null, hpp);
      } // !if (a = p.exec(s)) - else error
      EC.isError++;
      EC.errorString = "hueCssTo Error: '" + s + "' not hsl(…), hwb(…) or hsv(…) CSS!";
      console.log(EC.errorString);
      EC.topMsgF("");
      return null;
    },

    /* hexCssToName
    $param: #rgb|#rrggbb, #rgba|#rrggbbaa - string.
    $return: colorname | "" - string.
    Bei Fehler wird h===null geliefert.
    */
    hexCssToName: function (s) {
      let h = EC.hexCssTo(s); // Parse all errors

      //console.log("hexCssToName: s=%s h=%s %s", s, h, typeof h);
      if (h !== null) {
        //console.log("hexCssToName h: s=%s h=%s", s, h);
        return EC.hexToName(h);
      }
      return "";
    },

    /* rgbCssToHSL
    $param: rgb - string (a 0-1)
    $return: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1) or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    rgbCssToHSL: function (s) {
      let rgb;

      //console.log("rgbCssToHSL: %s", s);
      rgb = EC.rgbCssToRGB(s);
      if (rgb !== null) { // Parse all errors
        return EC.rgbToHSL(rgb);
      }
      return null;
    },

    /* hslCssToRGB
    $param: s - string. Format see hueCssTo().
    $return: rgb - array of string [r, g, b(, a)?] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hslCssToRGB: function (s) {
      let hsl;

      //console.log("hslCssToRGB: %s", s);
      hsl = EC.hueCssTo(s);
      if (hsl !== null) { // Parse all errors
        return EC.hslToRGB(hsl);
      }
      return null;
    },

    /* rgbToHSL by Foley and VanDam
    https://www5.in.tum.de/lehre/vorlesungen/graphik/info/csc/COL_26.htm
    $param: rgb - array of number|string 0..255, a 0..1
    $return: hsl - array of string h (0..360) s (0..100) l (0..100) a (0..1)
    Array values are with toFixed(0..16) formatted float.
    */
    rgbToHSL: function (rgb) {
      let r, g, b, max, min, d, h, s, l, a, a1,
      hsl = [],
      op = EC.outputPrecision;

      r = rgb[0] / 255;
      g = rgb[1] / 255;
      b = rgb[2] / 255;
      a = rgb[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) { // graytone
        h = s = 0; // s=0, h=undefined, H-Slider jump to 0
      } else { // h(0-6) s(0-1) l(0-1)
        d = max - min; // delta
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (r === max) {
          h = (g - b) / d + (g < b ? 6 : 0); // h negative then +6
        } else if (g === max) {
          h = (b - r) / d + 2;
        } else { // b===max
          h = (r - g) / d + 4;
        }
      }

      hsl[0] = (h * 60).toFixed(op);
      hsl[1] = (s * 100).toFixed(op);
      hsl[2] = (l * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hsl[3] = (+a).toFixed(EC.alphaPrecision);
      }
      //console.log("hsl=%s length=%s", hsl, hsl.length);
      return hsl;
    },

    /* hslToRGB by Foley and VanDam
    https://www5.in.tum.de/lehre/vorlesungen/graphik/info/csc/COL_26.htm
    $param: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1).
    $return: rgb - array of string 0-255.
    Array values are with toFixed(0..16) formatted float.
    */
    hslToRGB: function (hsl) {
      let h, s, l, m1, m2, r, g, b, a, a1, rgb = [],
      rp = EC.rgbPrecision;

      // m1+m2 (0-1) hue (0-360)
      function hueToRgb(m1, m2, hue) {
        if (hue > 360) {hue -= 360;}
        else if (hue < 0) {hue += 360;}
        //hue = hue > 360 ? hue - 360 : hue;
        //hue = hue < 0 ? hue + 360 : hue;
        return hue < 60  ? m1 + (m2 - m1) * hue / 60
        : hue < 180 ? m2
        : hue < 240 ? m1 + ((m2 - m1) * (240 - hue)) / 60
        :             m1;
      }

      h = +hsl[0];
      s = hsl[1] / 100;
      l = hsl[2] / 100;
      a = hsl[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      if (s === 0) { // achromatic, h == undefined (never if slider)
        r = g = b = l;
      } else {
        if (l <= 0.5) {m2 = l * (1 + s);}
        else {m2 = l + s - (l * s);}
        m1 = 2 * l - m2;
        r = hueToRgb(m1, m2, h + 120);
        g = hueToRgb(m1, m2, h);
        b = hueToRgb(m1, m2, h - 120);
      }

      rgb[0] = (r * 255).toFixed(rp);
      rgb[1] = (g * 255).toFixed(rp);
      rgb[2] = (b * 255).toFixed(rp);
      if (a !== undefined && !a1) {
        rgb[3] = (+a).toFixed(EC.alphaPrecision);
      }
      return rgb;
    },

    /* hwbCssTo - intern not used. Now integrated by hueCssTo()
    $param: s - string. Format hwb(h w% b% (/ a)?) or hcg(h c% g% (/ a)?).
    $return: hwb | hcg - array of number [h, w|c, b|g[, a]?] or null if error. Alpha value is CSS3 number (0-1).

    hwbCssTo CSS4 only syntax:
    hwb() = hwb( <hue> <percentage> <percentage> [ / <alpha-value> ]? )
    <hue> = <number> | <angle>
    <alpha-value> = <percentage> | <number> range 0..1

    HCG color space is not CSS, bud the better model for HWB-Slider.
    hjt1946 2018-08-13: Funktionalität wurde in hueCssTo() integriert.
    */
    hwbCssTo: function (s) {
      let a, p, hpp = [],
      flagA = 0, // 0|1 - 1: if alpha value found
      err = 0, // >0: format error
      a1 = 0; // if EC.alphaOne==0 && alpha==1

      EC.isError = 0;
      if (!EC.isString(s, "hwbCssTo")) {
        return null;
      }
      s = s.trim();
      p = /(hwb|hcg)(?:\((?:\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)\s+?(?:([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%))\s+?(?:([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%))\s*?)(?:(\/)\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%?))?\s*?\))/g;
      a = p.exec(s);
      if (a !== null) {
        //console.log("hwbCssTo: a=%s", a);
        //console.log("a:[0]='%s' [1]='%s' [2]='%s' [3]='%s' [4]='%s' [5]='%s' [6]='%s' [7]='%s' [8]='%s' [9]='%s' [10]='%s' [11]='%s' [12]='%s'", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12]);

        if (a[8] !== undefined) { // alpha value found
          if (a[7] !== "/" || a[8] === "") {
            err++;
          } else {
            flagA = 1;
            if (EC.alphaOne === 0 && +a[8] === 1) {
              a1 = 1;
            }
          }
        }

        if (err) { // format error
          EC.isError++;
          EC.errorString = "hwbCssTo Error: '" + s + "' wrong formatted!";
          console.log(EC.errorString);
          EC.topMsgF("");
          return null;
        }

        a[2] %= 360; // hue
        hpp[0] = a[2] < 0 ? a[2] += 360 : a[2];
        hpp[1] = +a[3];
        hpp[2] = +a[5];

        //console.log("hwbCssTo: flagA=%s err=%s a1=%s hpp='%s'", flagA, err, a1, hpp);

        if (flagA && !a1) {
          if (a[9] === "%") {
            hpp[3] = (a[8] / 100).toFixed(EC.alphaPrecision);
          } else {
            hpp[3] = (+a[8]).toFixed(EC.alphaPrecision);
          }
        }

        //console.log("hwbCssTo: with a hpp='%s'", hpp);
        if (hpp[1] < 0 | hpp[1] > 100 | hpp[2] < 0 | hpp[2] > 100) {
          EC.isError++;
          EC.errorString = "hwbCssTo Error: '" + hpp + "' hwb white or black out of range [0-100]%!";
          console.log(EC.errorString);
          EC.topMsgF("");
          return null;
        }
        return EC.checkPercent(null, hpp);
      } // !if (a = p.exec(s)) - else error
      EC.isError++;
      EC.errorString = "hwbCssTo Error: '" + s + "' not hwb(…) CSS or hcg(…)!";
      console.log(EC.errorString);
      EC.topMsgF("");
      return null;
    },

    /* hwbToRGB - css3+
    https://drafts.csswg.org/css-color/
    $param: hwb - array of string h (0-360) w (0-100) b (0-100) a (0-1).
    $return: rgb - array of string 0-255, a 0-1.
    Array values are with toFixed(0..16) formatted float.
    */
    hwbToRGB: function (hwb) {
      let h, w, bl, ratio, r, g, b, a, a1, rgb = [],
      rp = EC.rgbPrecision;

      //$global: w, bl (0-1)
      //$param: hue (0-360)
      function hueToCol(hue) {
        let c;
        if (hue > 360) {hue -= 360;}
        else if (hue < 0) {hue += 360;}
        c = hue < 60  ? hue / 60
        : hue < 180 ? 1
        : hue < 240 ? (240 - hue) / 60
        :             0;
        c *= (1 - w - bl);
        c += w;
        return c;
      }

      h = +hwb[0];
      w = hwb[1] / 100;
      bl = hwb[2] / 100;
      a = hwb[3];

      ratio = w + bl;
      if (ratio > 1) { // Result achromatic.
        w /= ratio;
        bl /= ratio;
      }

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      if ((w + bl) === 1) { // achromatic
        r = g = b = w;
      } else {
        r = hueToCol(h + 120);
        g = hueToCol(h);
        b = hueToCol(h - 120);
      }

      rgb[0] = (r * 255).toFixed(rp);
      rgb[1] = (g * 255).toFixed(rp);
      rgb[2] = (b * 255).toFixed(rp);
      if (a !== undefined && !a1) {
        rgb[3] = (+a).toFixed(EC.alphaPrecision);
      }
      return rgb;
    },

    /* rgbToHWB
    $param: rgb - array of number|string 0..255, a 0..1.
    $return: hwb - array of string h (0..360) w (0..100) b (0..100) a (0..1).
    Array values are with toFixed(0..16) formatted float.
    */
    rgbToHWB: function (rgb) {
      return EC.hslToHWB(EC.rgbToHSL(rgb));
    },


    /*// From "inkdrop master" for testing
    // Ergebnis noch falsch. b
    rgbToHwb: function (rgb) {
      const hsl = EC.rgbToHSL(rgb);
      const w = Math.min(rgb[0], rgb[1], rgb[2]);
      const b = 1 - Math.max(rgb[0], rgb[1], rgb[2]);
      console.info("rgbToHwb: hsl=%s", hsl);
      return [hsl[0], w, b, rgb[3]?rgb[3]:1];
    },
    */

    /*// From "inkdrop master" for testing.
    // Ergebnis noch falsch
    hwbToRgb: function (hwb) {
      let w = hwb[1];
      let b = hwb[2];

      const ratio = w + b;
      if (ratio > 1) { // normalize if sum of `w` and `b` is more than 1
        w /= ratio;
        b /= ratio;
      }

      const h = hwb[0] * 6;
      const i = Math.floor(h);
      const v = 1 - b;
      let f = h - i;

      if ((i & 1) !== 0) { // is odd
        f = 1 - f;
      }

      const n = w + (f * (v - w)); // lerp between `w` a `v`
      let r;
      let g;

      switch (i) {
        default:
        case 6:
        case 0: r = v; g = n; b = w; break;
        case 1: r = n; g = v; b = w; break;
        case 2: r = w; g = v; b = n; break;
        case 3: r = w; g = n; b = v; break;
        case 4: r = n; g = w; b = v; break;
        case 5: r = v; g = w; b = n; break;
      }

      return[255 * r, 255 * g, 255 * b, hwb[3]?hwb[3]:1];
    },
    */


    /* hwbToHSV
    Idea from atom-pigments-master\lib\color-conversions.coffee.
    $param: hwb - array of string h (0-360) w (0-100) b (0-100) a (0-1).
    $return: hsv - array of string h (0-360) s (0-100) v (0-100) a (0-1).
    Array values are with toFixed(0..16) formatted float.
    */
    hwbToHSV: function (hwb) {
      let h, w, bl, ratio, s, v, a, a1, hsv = [],
      op = EC.outputPrecision;

      h = +hwb[0];
      w = hwb[1] / 100;
      bl = hwb[2] / 100;
      a = hwb[3];

      ratio = w + bl;
      if (ratio > 1) { // Result graytone (achromatic).
        w /= ratio;
        bl /= ratio;
      }

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;
      v = 1 - bl;
      if (v === 0) { // black (achromatic → s=0)
        s = 0;
      } else {
        s = 1 - (w / v);
      }

      hsv[0] = h.toFixed(op);
      hsv[1] = (s * 100).toFixed(op);
      hsv[2] = (v * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hsv[3] = (+a).toFixed(EC.alphaPrecision);
      }
      return hsv;
    },

    /* hsvToHWB
    Idea from atom-pigments-master\lib\color-conversions.coffee.
    $param: hsv - array of string h (0-360) s (0-100) v (0-100) [a (0-1)]
    $return: hwb - array of string h (0-360) w (0-100) b (0-100) a (0-1)
    Array values are with toFixed(0..16) formatted float.
    */
    hsvToHWB: function (hsv) {
      let h, s, v, w, b, a, a1, hwb = [],
      op = EC.outputPrecision;

      h = +hsv[0];
      s = hsv[1] / 100;
      v = hsv[2] / 100;
      a = hsv[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      w = (1 - s) * v;
      b = 1 - v;

      hwb[0] = h.toFixed(op);
      hwb[1] = (w * 100).toFixed(op);
      hwb[2] = (b * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hwb[3] = (+a).toFixed(EC.alphaPrecision);
      }
      return hwb;
    },

    /* hwbToHSL by Hans-Jürgen Trolldenier (hjt1946)
    $param: hwb - array of string h (0-360) w (0-100) b (0-100) a (0-1).
    $return: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1).
    String hsl values are with toFixed(0..16) formatted float.
    */
    hwbToHSL: function (hwb) {
      let h, w, b, ratio, s, l, a, a1, hsl = [],
      op = EC.outputPrecision;

      if ((hwb[1] > 100) || (hwb[1] < 0) || (hwb[2] > 100) || (hwb[2] < 0) ) {
        // CSS3 keine Prüfung gefordert, Korrektur verboten.
        // Hier kommen aber 2 Fehler bei hwb(0 101% -10%)??? !!!
        // "Error: 14 Msg: textInput error: cssInput hwb! 🤫"
        // "hueCssTo Error: '0,101,-10' hwb white or black out of range [0-100]%! 👿"
        // Die folgende Warnung verschwindet völlig.
        EC.isError++;
        EC.errorString = "hwbToHSL Warning: w=" + hwb[1] + "% b=" + hwb[2] + "% out of range 0%…100% – not corrected!";
        console.log(EC.errorString);
        EC.topMsgF("");
      }

      h = +hwb[0];
      w = hwb[1] / 100;
      b = hwb[2] / 100;
      a = hwb[3];

      ratio = w + b;
      if (ratio > 1) { // Result achromatic.
        w /= ratio;
        b /= ratio;
        //console.log("hwbToHSL 0. ratio >100: hwb=%s ratio=%s w=%s b=%s w+b=%s", hwb, ratio, w, b, w+b);
      }
      //console.log("hwbToHSL: hwb=%s ratio=%s w=%s b=%s w+b=%s", hwb, ratio, w, b, w+b);
      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      if (b === 1) { // black (achromatic)
        s = l = 0;
      } else if (w === 1) { // white (achromatic)
        s = 0; l = 1;
      } else {
        //s = 1 - w - b; // -0.00 bug here
        s = 1 - (w + b); // ok
        //console.log("hwbToHSL s: s=%s ratio=%s w+b=%s", s, ratio, w+b);
        l = 1 + w - b;
        s = l <=1 ? s = s / l : s /= 2 - l;
        l /= 2;
      }

      hsl[0] = h.toFixed(op);
      hsl[1] = (s * 100).toFixed(op);
      hsl[2] = (l * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hsl[3] = (+a).toFixed(EC.alphaPrecision);
      }
      return hsl;
    },

    /* hslToHWB by Hans-Jürgen Trolldenier (hjt1946)
    $param: hsl - array of string h (0-360) s (0-100) v (0-100) [a (0-1)]
    $return: hwb - array of string h (0-360) s (0-100) l (0-100) a (0-1)
    Array values are with toFixed(0..16) formatted float.
    */
    hslToHWB: function (hsl) {
      let h, s, l, w, b, a, a1, hwb = [],
      op = EC.outputPrecision;

      h = +hsl[0];
      s = hsl[1] / 100;
      l = hsl[2] / 100;
      a = hsl[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      l *= 2;
      s = l <= 1 ? s *= l : s *= 2 - l;

      w = (l - s) / 2;
      b = (2 - l - s) / 2;

      hwb[0] = h.toFixed(op);
      hwb[1] = (w * 100).toFixed(op);
      hwb[2] = (b * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hwb[3] = (+a).toFixed(EC.alphaPrecision);
      }
      return hwb;
    },

    /* hwbCssToRGB - mit hueCssTo(s)
    $param: s - string. Format see hueCssTo().
    $return: rgb - array of string [h, w, b, a] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hwbCssToRGB: function (s) {
      let hwb;
      //console.log("hwbCssToRGB: %s", s);
      hwb = EC.hueCssTo(s);
      if (hwb !== null) { // Parse all errors
        return EC.hwbToRGB(hwb);
      }
      return null;
    },

    /* hwbCssToHSL - mit hueCssTo(s)
    $param: s - string. Format see hueCssTo()
    $return: hsl - array of string [h, s, l, a] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hwbCssToHSL: function (s) {
      let hwb;
      //console.log("hwbCssToHSL: %s", s);
      hwb = EC.hueCssTo(s);
      if (hwb !== null) { // Parse all errors
        return EC.hwbToHSL(hwb);
      }
      return null;
    },

    /* rgbCssToHWB
    $param: s - string. RGB Format see rgbCssToRGB().
    $return: hwb - array of string [h, w, b(, a)?] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    rgbCssToHWB: function (s) {
      let rgb;

      rgb = EC.rgbCssToRGB(s);
      if (rgb !== null) { // Parse all errors
        return EC.rgbToHWB(rgb);
      }
      return null;
    },

    /* hexCssToHWB
     $param: s - string, #rgb|#rrggbb| #rgba|#rrggbbaa.
    $return: hwb - array of string h (0-360) w (0-100) b (0-100) a (0-1) or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hexCssToHWB: function (s) {
      let h = EC.hexCssTo(s); // Parse all errors

      //console.log("hexCssToHWB: s='%s' h='%s'", s, h);
      if (h !== null) {
        //console.log("hexCssToHWB h: h='%s'", h);
        return EC.hexToHWB(h);
      }
      return null;
    },

    /* hslCssToHWB - mit hueCssTo(s)
    $param: s - string. Format see hueCssTo().
    $return: hwb - array of string [h, w, b(, a)?] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hslCssToHWB: function (s) {
      let hsl;

      //console.log("hslCssToHWB: %s", s);
      hsl = EC.hueCssTo (s);
      if (hsl !== null) { // Parse all errors
        return EC.hslToHWB(hsl);
      }
      return null;
    },

    /* hsvCssToHWB
    $param: s - string. Format see hueCssTo().
    $return: hwb - array of string [h, w, b(, a)?] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hsvCssToHWB: function (s) {
      let hsl;

      //console.log("hsvCssToHWB: %s", s);
      hsl = EC.hsvCssToHSL (s);
      if (hsl !== null) { // Parse all errors
        return EC.hslToHWB (hsl);
      }
      return null;
    },

    /* hexToHWB
    $param: #rgb|#rrggbb, #rgba|#rrggbbaa - string. Length must fit to 6 or 8, else incorrect HSL. No error check.
    $return: hwb - array of string h (0..360) s (0..100) l (0..100) a (0..1).
    Array values are with toFixed(0..16) formatted float.
    */
    hexToHWB: function (hex) {
      return EC.rgbToHWB (EC.hexToRGB (hex));
    },

    /* hexCssToRGB
    $param: s - string, #rgb|#rrggbb | #rgba|#rrggbbaa.
    $return: rgb - array of string 0-255 and alpha 0-1 or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hexCssToRGB: function (s) {
      let h = EC.hexCssTo(s); // Parse all errors

      //console.log("hexCssToRGB: s='%s' h='%s'", s, h);
      if (h !== null) {
        //console.log("hexCssToRGB h: h='%s'", h);
        return EC.hexToRGB(h);
      }
      return null;
    },

    /* hexCssToHSL
    $param: s - string, #rgb|#rrggbb | #rgba|#rrggbbaa.
    $return: hsl - array of string h (0-360) s (0-100) l (0-100)
    Array values are with toFixed(0..16) formatted float.
    */
    hexCssToHSL: function (s) {
      let h = EC.hexCssTo(s); // Parse all errors

      //console.log("hexCssToHSL: s='%s' h='%s'", s, h);
      if (h !== null) {
        //console.log("hexCssToHSL h: h='%s'", h);
        return EC.rgbToHSL(EC.hexToRGB(h));
      }
      return null;
    },

    /* hexToRGB
    $param: hex - string, #rrggbb. Length must fit to 6 or 8, else incorrect RGB. No error check.
    $return: rgb - array of integer 0-255 and alpha 0-1 or null if error.
    Alpha value is string with toFixed(0..16) formatted float.
    Changes: hexAlpha Auswertung entfernt hjt1946 2021-09-26.
    */
    hexToRGB: function (s) {
      let h, r, g, b, a, a1;

      h = s.replace(/ |#/g, "");
      if (h.length === 8) { // alpha value is set
        a = (parseInt(h.substring(6,8), 16)) / 255;
        //h = h.substring(0,6); //correct bud h[6] h[7] only log
      }
      // now h in rrggbb format
      r = parseInt(h[0] + h[1], 16);
      g = parseInt(h[2] + h[3], 16);
      b = parseInt(h[4] + h[5], 16);

      a1 = EC.alphaOne === 0 && a === 1 ? 1 : 0;
      //console.log("hexToRGB: s='%s' h=%s a1=%s alphaOne='%s' a='%s' ", s, h, a1, EC.alphaOne, a, r, g, b, "r=" + typeof r, "a=" + typeof a);

      if (a !== undefined && !a1) {
        a = a.toFixed(EC.alphaPrecision);
        //console.log("hexToRGB a: a1=%s h='%s' ", a1, h, r, g, b, a);
        return [r, g, b, a];
      }
      return [r, g, b];
    },

    /* rgbToHEX
    $param: rgb - array of string or number 0-255 (a 0-1).
    $return: hex - string, format #rrggbb | #rrggbbaa.
    Changes: hexAlpha Auswertung entfernt hjt1946 2021-09-26.
    */
    rgbToHEX: function (rgb) {
      let h, l, aa,
      r = Math.round(rgb[0]),
      g = Math.round(rgb[1]),
      b = Math.round(rgb[2]),
      a = rgb[3];

      //console.log("rgbToHex: rgb=%s a=%s", rgb, a);
      if (a !== undefined) {
        aa = (Math.round(a * 255)).toString(16);
        aa = aa.length === 1 ? "0" + aa : aa;
        //console.log("rgbToHex: a='%s' aa='%s' EC.alphaOne='%s'", a, aa, EC.alphaOne);
      }
      //l = (h = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16)).length; // old integer
      l = (h = ((r << 16) + (g << 8) + b).toString(16)).length;
      while(l++ < 6) {h = "0" + h;}
      if (aa !== undefined) {
        if ((EC.alphaOne === 1) || (EC.alphaOne === 0 && +a !== 1)) {
          h = h + aa;
        }
      }
      //console.log("rgbToHex: a='%s' aa='%s' EC.alphaOne='%s'", a, aa, EC.alphaOne);
      return h;
    },

    /* rgbCssToHex
    $param: rgb - string CSS format. See rgbCssToRGB.
    $return: hex - string, format #rrggbb | #rrggbbaa.
    */
    rgbCssToHex: function (s) {
      let rgb;

      rgb = EC.rgbCssToRGB (s);
      //console.log("rgbCssToHex: s=%s rgb=%s %s", s, rgb, typeof rgb);
      if (rgb !== null) { // Parse all errors
        return EC.rgbToHEX (rgb);
      }
      return null;
    },

    /* hslToHEX
    $param: hsl - array of string or number h (0-360) s (0-100) l (0-100) a (0-1).
    $return: hex - string, format #rrggbb | #rrggbbaa.
    */
    hslToHEX: function (hsl) {
      return EC.rgbToHEX(EC.hslToRGB(hsl));
    },

    /* hexToHSL
    $param: #rgb|#rrggbb, #rgba|#rrggbbaa - string. Length must fit to 6 or 8, else incorrect HSL. No error check.
    $return: hsl - array of string h (0..360) s (0..100) l (0..100) a (0..1).
    Array values are with toFixed(0..16) formatted float.
    */
    hexToHSL: function (hex) {
      return EC.rgbToHSL(EC.hexToRGB(hex));
    },


    /* rgbToCMYK
    $param:  rgb - array of string, 0-255. See rgbCssToRGB.
    $return: cmyk - array of string 0-1 or 0%-100% (not implemented).
    Array values are with toFixed(0..16) formatted float.
    In Entwicklung!
    */
    rgbToCMYK: function (s) {
      let rgb = [], cyan, magenta, yellow, black, r, g, b, a,
      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0,
      rp = EC.rgbPrecision;

      console.log("rgbToCMYK: %s", s);
      rgb = EC.rgbCssToRGB(s);
      if (rgb !== null) { // Parse all errors
        r = +rgb[0] / 255;
        g = +rgb[1] / 255;
        b = +rgb[2] / 255;
        a = rgb[3];
        black = 1 - Math.max(r, g, b);
        if (black === 1) {
          cyan = magenta = yellow = 0;
        }
        else {
          cyan = (1 - r -black) / (1 - black);
          magenta = (1 - g - black) / (1 - black);
          yellow = (1 - b - black) / (1 - black);
        }

        console.log("rgbToCMYK: cyan=%s magenta=%s yellow=%s black=%s a=%s", cyan, magenta, yellow, black, (a !== undefined && !a1)?(+a).toFixed(EC.alphaPrecision):undefined );

        if (a !== undefined && !a1) {
          return [cyan.toFixed(rp), magenta.toFixed(rp), yellow.toFixed(rp), black.toFixed(rp), (+a).toFixed(EC.alphaPrecision)];
        }
        return [cyan.toFixed(rp), magenta.toFixed(rp), yellow.toFixed(rp), black.toFixed(rp)];
      }
    },

    /* cmykToRGB
    $param: cmyk - array of string ... a (0-1).Values less than 0 or 0%, or greater than 1 or 100%, are not invalid; instead, they are clamped to 0/0% or 1/100%. Prozentwerte werden momentan nicht unterstützt.
    If a fallback color was specified, return that color (converting it to RGB as well, if necessary).
    $return: rgb - array of string 0-255.
    Array values are with toFixed(0..16) formatted float.
    In Entwicklung!
    */
    cmykToRGB: function (cmyk) {
      let black, cyan, magenta, yellow, r, g, b, a,
      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0,
      rp = EC.rgbPrecision;

      console.log("cmykToRGB: %s", cmyk);
      cyan = (+cmyk[0]) % 1;
      magenta = (+cmyk[1]) % 1;
      yellow = (+cmyk[2]) % 1;
      black = (+cmyk[3]) % 1;
      a = cmyk[4];

      console.log("cmykToRGB: cyan=%s magenta=%s yellow=%s black=%s a=%s", cyan, magenta, yellow, black, a);

      cyan = cyan < 0? 1 + cyan: cyan;
      magenta = magenta < 0? 1 + magenta: magenta;
      yellow = yellow < 0? 1 + yellow: yellow;
      black = black < 0? 1 + black: black;

      console.log("cmykToRGB: cyan=%s magenta=%s yellow=%s black=%s a=%s", cyan, magenta, yellow, black, a);

      r = 1 - Math.min(1, cyan * (1 - black) + black);
      g = 1 - Math.min(1, magenta * (1 - black) + black);
      b = 1 - Math.min(1, yellow * (1 - black) + black);

      console.log("cmykToRGB: r=%s g=%s b=%s a=%s",r, g, b, a); // r,g,b sind immer 1!!!


      if (a !== undefined && !a1) {
        return [(r * 255).toFixed(rp), (g * 255).toFixed(rp), (b * 255).toFixed(rp), (+a).toFixed(EC.alphaPrecision)];
      }
      return [(r * 255).toFixed(rp), (g * 255).toFixed(rp), (b * 255).toFixed(rp)];
    },


    /* rgbToHSV by Foley and VanDam corrected and optimized
    https://www5.in.tum.de/lehre/vorlesungen/graphik/info/csc/COL_25.htm
    $param: rgb - array of string, 0-255
    $return: hsv - array of string, h (0-360) s (0-100) v (0-100)
    Array values are with toFixed(0..16) formatted float.
    */
    rgbToHSV: function (rgb) {
      let r, g, b, a, a1,
      op = EC.outputPrecision;

      r = rgb[0] / 255;
      g = rgb[1] / 255;
      b = rgb[2] / 255;
      a = rgb[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      let max, min, d, h, s, v;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      v = max;
      d = max - min;
      s = max === 0 ? 0 : d / max;

      if (d === 0) { // graytone r=g=b, max==min
        h = 0;
      }
      else {
        switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = 2 + (b - r) / d;
          break;
        case b:
          h = 4 + (r - g) / d;
          break;
        }
        h *= 60;
      }
      if (a !== undefined && !a1) {
        return[h.toFixed(op), (s * 100).toFixed(op), (v * 100).toFixed(op), (+a).toFixed(EC.alphaPrecision)];
      }
      return[h.toFixed(op), (s * 100).toFixed(op), (v * 100).toFixed(op)];
    },

    /* hsvToRGB by Foley and VanDam
    https://www5.in.tum.de/lehre/vorlesungen/graphik/info/csc/COL_26.htm
    $param: hsv - array of string h (0-360) s (0-100) v (0-100) a (0-1).
    $return: rgb - array of string 0-255.
    Array values are with toFixed(0..16) formatted float.
    */
    hsvToRGB: function (hsv) {
      let h, s, v, i, f, p, q, t, r, g, b, a, a1, rp;
      rp = EC.rgbPrecision;

      h = hsv[0] / 60;
      s = hsv[1] / 100;
      v = hsv[2] / 100;
      a = +hsv[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      if (s === 0) { // graytone (achromatic), original Foley and VanDam
        v = (v * 255).toFixed(rp);
        if (a !== undefined && !a1) {
          return [v, v, v, a.toFixed(EC.alphaPrecision)];
        }
        return [v, v, v];
      }
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - (s * f));
      t = v * (1 - (s * (1 - f)));
      switch(i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      }
      if (a !== undefined && !a1) {
        return [(r * 255).toFixed(rp), (g * 255).toFixed(rp), (b * 255).toFixed(rp), a.toFixed(EC.alphaPrecision)];
      }
      return [(r * 255).toFixed(rp), (g * 255).toFixed(rp), (b * 255).toFixed(rp)];
    },

    /* hsvCssToHSL
    $param: s - string. Format hsv(h,s%,v%) | hsv[a](h,s%,v%,a).
    Or "Color Module 4" syntax: hsv(h s% v%/a%). See hueCssTo().
    $return: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1) or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hsvCssToHSL: function (s) {
      let hsv;

      //console.log("hsvCssToHSL: %s", s);
      hsv = EC.hueCssTo(s);
      if (hsv !== null) { // Parse all errors
        return EC.hsvToHSL(hsv);
      }
      return null;
    },

    /* hsvCssToRGB
    $param: s - string. Format hsv(h,s%,v%) | hsv[a](h,s%,v%,a).
    Or "Color Module 4" syntax: hsv(h s% v%/a%). See hueCssTo().
    $return: rgb - array of string [r, g, b, a] or null if error.
    Array values are with toFixed(0..16) formatted float.
    */
    hsvCssToRGB: function (s) {
      let hsv;

      //console.log("hsvCssToRGB: %s", s);
      hsv = EC.hueCssTo(s);
      if (hsv !== null) { // Parse all errors
        return EC.hsvToRGB(hsv);
      }
      return null;
    },

    /* hsvToHSL
    $param: hsv - array of string h (0-360) s (0-100) v (0-100) [a (0-1)]
    $return: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1)
    Array values are with toFixed(0..16) formatted float.
    */
    hsvToHSL: function (hsv) {
      let h, s, v, ss, l, a, a1, hsl = [],
      op = EC.outputPrecision;

      h = +hsv[0];
      s = hsv[1] / 100;
      v = hsv[2] / 100;
      a = hsv[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      l = (2 - s) * v;
      ss = s * v;
      if (l <= 1) {
        ss = l === 0 ? 0 : ss / l; // l==0 is black (achromatic → ss=0)
      } else if (l === 2) { // s==0, l==2, v==1 is white (achromatic → ss=0)
        ss = 0;
      } else {
        ss /= 2 - l; // division by 0 if s=0 and v=1 → l==2!
      }
      l /= 2;
      //console.log("hsvToHSL: hsv=%s hsl=%s a='%s'", hsv, [h, (ss * 100), (l * 100)]), a;

      hsl[0] = h.toFixed(op);
      hsl[1] = (ss * 100).toFixed(op);
      hsl[2] = (l * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hsl[3] = (+a).toFixed(EC.alphaPrecision);
      }
      //console.log("hsl=%s length=%s", hsl, hsl.length);
      return hsl;
    },

    /* hslToHSV
    $param: hsl - array of string h (0-360) s (0-100) l (0-100) [a (0-1)]
    $return: hsv - array of string h (0-360) s (0-100) v (0-100) a (0-1)
    Array values are with toFixed(0..16) formatted float.
    */
    hslToHSV: function (hsl) {
      let h, s, v, ss, l, a, a1,
      hsv = [],
      op = EC.outputPrecision;

      h = +hsl[0];
      ss = hsl[1] / 100;
      l = hsl[2] / 100;
      a = hsl[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      l *= 2;
      if (l <= 1) {
        ss *= l;
      } else {
        ss *= 2 - l;
      }
      v = (l + ss) / 2;
      s = l === 0 ? 0 : (2 * ss) / (l + ss); // l==0 is black (achromatic → s=0)
      //console.log("hslToHSV: hsl=%s hsv=%s a='%s'", hsl, [h, (ss * 100), (v * 100), (a !== undefined ? a :"")], a);

      hsv[0] = h.toFixed(op);
      hsv[1] = (s * 100).toFixed(op);
      hsv[2] = (v * 100).toFixed(op);
      if (a !== undefined && !a1) {
        hsv[3] = (+a).toFixed(EC.alphaPrecision);
      }
      //console.log("hsv=%s length=%s", hsv, hsv.length);
      return hsv;
    },

    /* hppFormat
    $param: hpp - array of string h (0-360) p1 (0-100) p2 (0-100) [a (0-1)].
    $return: hppa - array of string h (0-360) p1 (0-100) p2 (0-100) a (0-1) formatted.
    Array values are with toFixed(0..16) formatted float.
    */
    hppFormat: function (hpp) {
      let h, p1, p2, a, a1,
      hppa = [],
      op = EC.outputPrecision;

      h = +hpp[0];
      p1 = +hpp[1];
      p2 = +hpp[2];
      a = hpp[3];

      a1 = EC.alphaOne === 0 && +a === 1 ? 1 : 0;

      //console.log("hueFormat: hpp='%s' p1='%s' p2='%s' a='%s' a1='%s'", hpp, p1, p2, [(a !== undefined ? a :"")], a1);

      hppa[0] = h.toFixed(op);
      hppa[1] = p1.toFixed(op);
      hppa[2] = p2.toFixed(op);
      if (a !== undefined && !a1) {
        hppa[3] = (+a).toFixed(EC.alphaPrecision);
      }
      //console.log("hueFormat: hppa=%s length=%s", hppa, hppa.length);
      return hppa;
    },

    /* checkPercent - Test with autocorrection (a CSS3 format), hwb -0.00 output error not here
    $param: rgba - array of percent 0%‥100% and a 0‥1 (string or number).
    $param: hppa = hsl | hsv | hwb - array of number and a 0‥1 (string or number).
    $return: rgba | hsla | hsva - array of number 0‥100 and a 0‥1. If hue, h not changed. Alpha corrected.
    */
    checkPercent: function (rgba, hppa) {
      let p0, // rgba[0] | hppa[0]
      p1, // rgba[1] | hppa[0]
      p2, // rgba[2] | hppa[0]
      a, // rgba[3] | hppa[0]
      pppa, // rgba | hppa
      c = 1, // alpha check 1: ok | 0: not equal
      r = null; // return value null or Array[3] | Array[4]
      if (rgba !== null) {
        //console.log("checkPercent(rgba, null): parameter rgba=%s", rgba.toString());
        pppa = rgba;
        p0 = Math.max(Math.min(+rgba[0], 100), 0);
        p1 = Math.max(Math.min(+rgba[1], 100), 0);
        p2 = Math.max(Math.min(+rgba[2], 100), 0);
        a =  isNaN(+rgba[3]) ? a : +rgba[3];
      } else if (hppa !== null) {
        //console.log("checkPercent(null, hppa): parameter hppa=%s", hppa.toString());
        pppa = hppa;
        p0 = hppa[0]; // hue not changed
        p1 = Math.max(Math.min(+hppa[1], 100), 0);
        p2 = Math.max(Math.min(+hppa[2], 100), 0);
        a = isNaN(+hppa[3]) ? a : +hppa[3];
      } else {
        EC.isError++;
        EC.errorString = "checkPercent Error: Function need parameter!";
        console.log(EC.errorString);
        EC.topMsgF("");
        return null;
      }
      //console.log("checkPercent range 0%‥100% test: parameter pppa=%s p0=%s p1=%s p2=%s a=%s", pppa.toString(), p0, p1, p2, a);

      if (pppa[3] !== undefined) {
        a = Math.max(Math.min(pppa[3], 1), 0);
        c = a === +pppa[3] ? 1 : 0;
        //console.log("checkPercent alpha defined: a=%s typ %s", a, typeof a);
      }
      if ((p0 === +pppa[0]) && (p1 === +pppa[1]) && (p2 === +pppa[2]) && c) {
        //console.log("checkPercent result: pppa==[p0,p1,p2,a] ? [%s] == %s", pppa.toString(), '[' + [p0, p1, p2, a].toString() + ']');
        return pppa;
      }
      r = (a === undefined ? [p0, p1, p2] : [p0, p1, p2, a]);
      EC.isWarn++;
      EC.warnString = "checkPercent Range Warning: pppa=[" + pppa + "] corrected [" + r + "].";
      console.log(EC.warnString);
      EC.topMsgF("");
      return r;
    },

    /* checkRGB - Test number rgba with autocorrection (a CSS3 format)
    $param: rgba - array of number 0-255 and a 0-1 (string or number).
    $return: rgba - array of number 0-255 and a 0-1. Alpha corrected.
    */
    checkRGB: function (rgba) {
      let r, g, b, a, r1,
      c = 1; // alpha check 1: ok | 0: not equal
      r = Math.max(Math.min(rgba[0], 255), 0);
      g = Math.max(Math.min(rgba[1], 255), 0);
      b = Math.max(Math.min(rgba[2], 255), 0);
      //console.log("checkRGB: rgba=%s", rgba, "r=" + typeof r);
      if (rgba[3] !== undefined) {
        a = Math.max(Math.min(rgba[3], 1), 0);
        c = a === +rgba[3] ? 1 : 0;
        //console.log("checkRGB a: a=%s", a);
      }

      if ((r === +rgba[0]) && (g === +rgba[1]) && (b === +rgba[2]) && c) {
        //console.log("checkRGB OK: rgba=%s === %s", rgba, [r, g, b, a]);
        return rgba;
      }
      r1 = (a === undefined ? [r, g, b] : [r, g, b, a]);
      EC.isWarn++;
      EC.warnString = "checkRGB Range Warning: rgba=" + rgba + " to " + r1 + ".";
      console.log(EC.warnString);
      EC.topMsgF("");
      return r1;
    },

    /* checkAlpha - Test alpha channel with autocorrection (CSS3+4 format)
    $param: alpha - number|string. CSS3 or CSS4 0-1 or CSS4 only 0-100[%].
    $param: percent - bool 0|1 - CSS4 percent flag.
    $return: a - string. CSS3 0-1 or CSS4  0-100 corrected and formatted.
    */
    checkAlpha: function (alpha, percent) {
      let a;
      //console.log("checkAlpha: alpha=%s", alpha);
      if (percent) {
        a = Math.max(Math.min(alpha, 100), 0);
        //console.log("checkAlpha CSS4: alpha=%s a=%s", alpha, a);
      } else { // CSS3 format
        a = Math.max(Math.min(alpha, 1), 0);
        //console.log("checkAlpha CSS3: alpha=%s a=%s", alpha, a);
      }
      if (alpha !== a) {
        EC.isError++;
        EC.errorString = "checkAlpha Range Warning: alpha=" + alpha + " to " + a + ".";
        console.log(EC.errorString);
        EC.topMsgF("");
      }
      return a.toFixed(EC.alphaPrecision);
    },

    /* textInput - Input type=text handling
    $param: inputO - object array, from input element or null from function.
    $param: sRGB - array of string from rangeInput().
    $param: sHSL - array of string from rangeInput().
    $return: void.
    Called from handler function onChange() and onInput() or from colorHandling() if slider changed.

    Durch Änderung der Handler (einzeln zugeordnet zu jedem Text-Input) ändert sich der Algorithmus, es wird nur noch 1 Argument (e.target) vom Handler benötigt. Alle READONLY Inputs beginnen mit Suffix "color" wie z.B. cssInput und color02Input und werden daran erkannt. Alle schreibbaren Inputs gibt es einmalig pro Typ, sie müssen mit einem der folgenden Suffixe beginnen:
    "rgb" für rgb(),
    "hsl" für hsl(),
    "hex" für #RRGGBB,
    "name" für Farbnamen,
    "hwb" für hwb() (Slider in Arbeit!!!),
    "hsv" für hsv() (Zusatz wenn benötigt, kein CSS Wert),
    "cmyk" für cmyk() (noch implementieren),
    "lin" für linear() (noch implementieren wenn benötigt?),
    "xyz" für xyz() (noch implementieren wenn benötigt?),
    "lab" für lab() (noch implementieren wenn benötigt?),
    "lch" für lch() (noch implementieren wenn benötigt?).

    Die beschreibbaren Text-Inputs werden intern in Objekt-Zeigern EC.hslI, EC.rgbI … gespeichert. Initialisierung durch colorInit(). Nur diese werden gegen null abgefragt.
    V0.5.1: Float RGB eingebaut.
    V0.6.11: HWB-Input eingebaut.
    V0.16: FEHLER Semikolons entfernt oder mit Kommas vertauscht in __setSelectedIndex(ns)!
    jslint:
    'textInput'(inputO, sRGB, sHSL)
      unused !!! Untersuchen !!!
          ap, hsl, hsv, hwb, inputError, op, rgb, rgb3i, rp, s, setInput, sourceI
      closure
          __setSelectedIndex, cname, hex, hslcss, hsvcss, hwbcss, rgbcss
      variable
          cssColor, cssId, p, sId
      outer
          EC

      __setSelectedIndex(ns)
      variable
          j, opt, opts
      outer
          cname

      setInput()
      variable
          ns
      outer
          EC, __setSelectedIndex, cname, hex, hslcss, hsvcss, hwbcss, rgbcss

      inputError(errNum, errStr)
      outer
          EC
    */
    textInput: function (inputO, sRGB, sHSL) {
      let rgb, hsl, hwb, hsv, hex, cname, rgbcss, hslcss, hwbcss, hsvcss,
      rgb3i = [], // CSS3 integer
      ap = EC.alphaPrecision,
      op = EC.outputPrecision,
      rp = EC.rgbPrecision;

      /* Setzt Farbnamen in NAME-Input #nameInput und SELECT-Input #nameSelect
      ns=EC.namesI;
      */
      function __setSelectedIndex(ns) {
        let i;
        let opt = ns.options[0];
        cname = cname === "" ? "---" : cname;
        //console.log("__setSelectedIndex: cname='%s' ns=%s ns.options.length='%d'", cname, ns, ns.options.length );
        for(i = 0; i < ns.options.length; i++) {
          opt = ns.options[i];
          if (opt.text === cname) {
            //console.info("__setSelectedIndex: i='%d' opt=%s", i, opt.text);
            ns.selectedIndex = i;
            //break;
            return;
          }
        }
      }

      //
      function setInput() {
        //let ns = EC.namesI; // #nameSelect BUG!!!
        //console.log("setInput: rgbI='%s' hslI='%s' hexI='%s' nameI='%s' hwbI='%s' hsvI='%s'", EC.rgbI, EC.hslI, EC.hexI, EC.nameI, EC.hwbI, EC.hsvI);
        //console.log("setInput: rgbcss=%s hslcss=%s hsvcss=%s hex=%s cname=%s hwbcss=%s", rgbcss, hslcss, hsvcss, hex, cname, hwbcss);
        if (EC.rgbI) {EC.rgbI.value = rgbcss;}
        if (EC.hslI) {EC.hslI.value = hslcss;}
        if (EC.hexI) {EC.hexI.value = "#" + hex;}
        if (EC.hwbI) {EC.hwbI.value = hwbcss;}
        if (EC.hsvI) {EC.hsvI.value = hsvcss;}
        if (EC.nameI) {EC.nameI.value = cname;}
        // IE11: Set EC.namesI.value ==> "", EC.namesI.selectedOptions undefined!
        if (EC.namesI) {
          __setSelectedIndex(EC.namesI);
          //console.log("selectedIndex set: EC.namesI.options[%d].innerText='%s' ", EC.namesI.selectedIndex, EC.namesI.options[EC.namesI.selectedIndex].innerText );
        }
      }

      function inputError(errNum, errStr) {
        EC.isError += errNum;
        EC.errorString = errStr;
        console.log(EC.errorString);
        EC.topMsgF("");
        return;
      }

      //console.info("textInput: inputO='%s' sRGB='%s' sHSL='%s'", inputO, sRGB, sHSL);
      if (inputO) {
        let cssColor = inputO.value,
        cssId = inputO.id,
        sourceI = null,
        p = [],
        s,
        sId; // cssId lower case suffix

        //console.log("textInput inputO: EC.isError=%s", EC.isError);

        EC.clearErrorF();
        // CSS4 conform: " " for ",", "/\s*?<number>%?" for alpha value
        cssColor = cssColor.trim().replace(/\s+/g, " ");
        cssColor = cssColor.replace(/\(\s/g, "(");
        cssColor = cssColor.replace(/\s\)/g, ")");
        cssColor = cssColor.replace(/\s?,\s?/g, ",");
        //console.log("textInput 1: inputO.value=%s cssColor=%s", inputO.value, cssColor);
        if (cssColor === "") {return;} // no error

        //console.log("textInput: cssColor=%s inputO=%s id=%s rgb=%s alphaOne=%s", cssColor, inputO.localName, inputO.id, rgb, EC.alphaOne);

        p = cssId.match(/[a-z]+/);
        sId = p[0];

        switch(sId) {
          case "css": { // All unparsed input
            p = cssColor.match(/#|[a-z]+/);
            //console.log("textInput: cssInput p[0]=%s cssColor=%s typeof p[0]", p[0], cssColor, typeof(p[0]));
            switch(p[0]) {
            case "#": {
              rgb = EC.hexCssToRGB(cssColor);
              if (rgb !== null) {
                sourceI = "rgb";
                  //console.log("textInput css: hex=%s → rgb=[%s] cssColor=%s sourceI=%s", p[0], rgb.toString(), cssColor, sourceI);
                break;
              }
              inputError(10, "textInput error: cssInput hex!");
              return;
            }
            break;
          case "rgb":
          case "rgba": {
            rgb = EC.rgbCssToRGB(cssColor);
            if (rgb !== null) {
              sourceI = "rgb";
                  //console.log("textInput css: rgb=%s=[%s] cssColor=%s sourceI=%s", p[0], rgb.toString(), cssColor, sourceI);
              break;
            }
            inputError(10, "textInput error: cssInput rgb!");
            return;
          }
          break;
        case "hsl":
        case "hsla": {
          hsl = EC.hueCssTo(cssColor);
          if (hsl !== null) {
            sourceI = "hsl";
            hsl[0] = (+hsl[0]).toFixed(op);
            hsl[1] = (+hsl[1]).toFixed(op);
            hsl[2] = (+hsl[2]).toFixed(op);
                  //console.log("textInput css: hsl=%s=[%s] cssColor=%s sourceI=%s", p[0], hsl.toString(), cssColor, sourceI);
            break;
          }
          inputError(10, "textInput error: cssInput hsl!");
          return;
        }
        break;
      case "hsv":
      case "hsva": {
        hsv = EC.hueCssTo(cssColor);
        if (hsv !== null) {
          sourceI = "hsv";
          hsv[0] = (+hsv[0]).toFixed(op);
          hsv[1] = (+hsv[1]).toFixed(op);
          hsv[2] = (+hsv[2]).toFixed(op);
                  //console.log("textInput css: hsv=%s=[%s] cssColor=%s sourceI=%s", p[0], hsv.toString(), cssColor, sourceI);
          break;
        }
        inputError(10, "textInput error: cssInput hsv!");
        return;
      }
      break;
    case "hwb": {
      rgb = EC.hwbCssToRGB(cssColor);
      if (rgb !== null) {
        sourceI = "rgb";
                  //console.log("textInput css: hwb=%s → rgb=[%s] cssColor=%s sourceI=%s", p[0], rgb.toString(), cssColor, sourceI);
        break;
      }
      inputError(10, "textInput error: cssInput hwb!");
      return;
    }
    break;
  default: {
    s = p[0].match(/[a-z]{3,20}/i);
                if (s !== null) { // color name
                  rgb = EC.nameCssToRGB(p[0]);
                  if (rgb !== null) {
                    cname = p[0]; sourceI = "rgb";
                    //console.log("textInput: name: %s → rgb=[%s] sourceI=%s", cssColor, rgb.toString(), sourceI);
                    break;
                  } // else fall through to error
                }
                inputError(10, "textInput Error cssInput: " + p[0] + ": " + cssColor + ", " + sourceI);
                return;
              }
            } // !switch(p[0])
            // Alle cssInputs kommen hier an.
            //console.log("textInput case css end - after switch(p[0]): p[0]='%s' cssColor='%s' rgb='%s' hsl=[%s] hsv=[%s] hwb=[%s] cname='%s' sourceI='%s'", p[0], cssColor, rgb?"[" + rgb.toString() + "] typeof " + typeof(rgb[0]):rgb, hsl?hsl.toString():hsl, hsv?hsv.toString():hsv, hwb?hwb.toString():hwb, cname, sourceI);
            break;
          } // !case: css
          break;
        case "hex": {
          rgb = EC.hexCssToRGB(cssColor);
          if (rgb !== null) {
            sourceI = "rgb";
              //console.log("textInput hexInput: hex=%s → rgb=[%s] cssColor=%s sourceI=%s", p[0], rgb.toString(), cssColor, sourceI);
            break;
          }
          inputError(10, "textInput error: hexInput!");
          return;
        }
        break;
      case "rgb": {
        rgb = EC.rgbCssToRGB(cssColor);
        if (rgb !== null) {
          sourceI = "rgb";
              //console.log("textInput rgbInput: rgb=%s cssColor=%s sourceI=%s", rgb.toString(), cssColor, sourceI);
          break;
        }
        inputError(10, "textInput error: rgbInput!");
        return;
      }
      break;
    case "hsl": {
      hsl = EC.hueCssTo(cssColor);
      if (hsl !== null) {
        sourceI = "hsl";
        hsl[0] = (+hsl[0]).toFixed(op);
        hsl[1] = (+hsl[1]).toFixed(op);
        hsl[2] = (+hsl[2]).toFixed(op);
              //console.log("textInput hslInput: hsl=%s cssColor=%s sourceI=%s", hsl.toString(), cssColor, sourceI);
        break;
      }
      inputError(10, "textInput error: hslInput!");
      return;
    }
    break;
  case "hwb": {
    hwb = EC.hueCssTo(cssColor);
    if (hwb !== null) {
      sourceI = "hwb";
      hwb[0] = (+hwb[0]).toFixed(op);
      hwb[1] = (+hwb[1]).toFixed(op);
      hwb[2] = (+hwb[2]).toFixed(op);
              //console.log("textInput hwb: hwb=%s cssColor=%s sourceI=%s", hwb.toString(), cssColor, sourceI);
      break;
    }
    inputError(10, "textInput error: hwbInput!");
    return;
  }
  break;
case "hsv": {
  hsv = EC.hueCssTo(cssColor);
  if (hsv !== null) {
    sourceI = "hsv";
    hsv[0] = (+hsv[0]).toFixed(op);
    hsv[1] = (+hsv[1]).toFixed(op);
    hsv[2] = (+hsv[2]).toFixed(op);
              //console.log("textInput hsv: hsv=%s cssColor=%s sourceI=%s", hsv.toString(), cssColor, sourceI);
    break;
  }
  inputError(10, "textInput error: hsvInput!");
  return;
}
break;
case "name": {
  rgb = EC.nameCssToRGB(cssColor);
  if (rgb !== null) {
    sourceI = "rgb";
              //console.log("textInput name: name=%s cssColor=%s sourceI=%s", name, cssColor, sourceI);
    break;
  }
  inputError(10, "textInput error: nameInput!");
  return;
}
break;
          default: { // Only if programming bug.
            inputError(100, "textInput Error default: sId='" + sId + "' cssColor='" + cssColor + "' rgb='" + rgb + "' hsl='" + hsl + "' hsv='" + hsv + "' hwb='" + hwb + "'!");
            return;
          }
        } // !switch(sId)

        /* if (EC.hsvI && !hsv) ???
        if (!rgb && !hsl && !hwb && !(hsvI?hsv:undefined)) { // 2. error output.
          EC.isError++;
          EC.errorString = "textInput Error 2528: cssId='" + cssId + "' cssColor='" +  cssColor + "' sourceI='" + sourceI + "'!";
          console.log(EC.errorString);
          EC.topMsgF("");
          return;
        }
        */

        //console.log("textInput after switch(sId) all input ok: sourceI='%s' cssColor='%s' rgb='[%s]' hsl='[%s]' hsv='[%s]' hwb='[%s]' cname='%s'", sourceI, cssColor, rgb?rgb.toString():rgb, hsl?hsl.toString():hsl, hsv?hsv.toString():hsv, hwb?hwb.toString():hwb, cname);
        /* aHJT: Bis hier korrigiert !!!!!!
        */

        if (sourceI !== undefined) {
          //console.log("textInput if (sourceI): sourceI='%s' cssColor='%s' rgb='[%s]' hsl='[%s]' hsv='[%s]' hwb='[%s]' cname='%s'", sourceI, cssColor, rgb?rgb.toString():rgb, hsl?hsl.toString():hsl, hsv?hsv.toString():hsv, hwb?hwb.toString():hwb, cname);

          if (hsl) {
            if (+hsl[2] === 0 || +hsl[2] === 100) { // black or white css conform
              hsl[0] = hsl[1] = (0).toFixed(op);
            }
            rgb = EC.hslToRGB(hsl);
            hwb = EC.rgbToHWB(rgb);
            if (EC.hsvI) hsv = EC.hslToHSV(hsl);
            //console.log("textInput hsl → rgb hwb hsv: rgb='[%s]' hsl='[%s]' hsv='[%s]' hwb='[%s]'", rgb, hsl, hsv, hwb);
          }
          else if (rgb) {
            hsl = EC.rgbToHSL(rgb);
            hwb = EC.rgbToHWB(rgb);
            if (EC.hsvI) hsv = EC.hslToHSV(hsl);
            //console.log("textInput rgb → hsl hwb hsv: rgb='[%s]' hsl='[%s]' hsv='[%s]' hwb='[%s]'", rgb, hsl, hsv, hwb);
          }
          else if (hwb) { // CSS 4
            rgb = EC.hwbToRGB(hwb);
            hsl = EC.rgbToHSL(rgb);
            if (EC.hsvI) hsv = EC.hslToHSV(hsl);
            //console.log("textInput hwb → rgb hsl hsv: rgb='[%s]' hsl='[%s]' hsv='[%s]' hwb='[%s]'", rgb, hsl, hsv, hwb);
          }
          else if (EC.hsvI && hsv) { // not in CSS, no input at moment
            // bw: h=? → 0 white:s=0 v=100%, black: v=0 → s=0 (s=0 is graytone)
            if (+hsv[2] === 0) { // black → set graytone
              hsv[0] = hsv[1] = (0).toFixed(op); // hsl compatible
            } else if (+hsv[1] === 0 && +hsv[2] === 100) { // graytone white
              hsv[0] = (0).toFixed(op); // hsl compatible
            }
            /*
            rgb = EC.hsvToRGB(hsv); // Function test only
            hsl = EC.rgbToHSL(rgb);
            //console.log("textInput hsv rgb hsl 1: rgb=%s hsl=%s hsv=%s", rgb, hsl, hsv);
            */
            hsl = EC.hsvToHSL(hsv);
            rgb = EC.hslToRGB(hsl);
            hwb = EC.rgbToHWB(rgb);
            //console.log("textInput hsv → hsl rgb hwb: rgb='[%s]' hsl='[%s]' hsv='[%s]' hwb='[%s]'", rgb, hsl, hsv, hwb);
          }

          //console.log("textInput: rgb=%s typeof rgb[3]", rgb, typeof rgb[3]);

          rgb[0] = (+rgb[0]).toFixed(rp);
          rgb[1] = (+rgb[1]).toFixed(rp);
          rgb[2] = (+rgb[2]).toFixed(rp);

          rgb3i[0] = (+rgb[0]).toFixed(0);
          rgb3i[1] = (+rgb[1]).toFixed(0);
          rgb3i[2] = (+rgb[2]).toFixed(0);
          if (rgb[3] !== undefined) {
            rgb3i[3] = rgb[3];
          }
          //console.log("textInput: rgb=%s rgb3i=%s", rgb, rgb3i);
          hex = EC.rgbToHEX(rgb3i);
          if (cname === undefined) cname = EC.hexToName(hex);

          //console.log("textInput all arrays ok: cssColor='%s' rgb3i='%s' rgb='%s' hsl=[%s] hsv=[%s] hwb=[%s] cname='%s'", cssColor, rgb3i?"[" + rgb3i.toString() + "] typeof " + typeof(rgb3i[0]):rgb3i, rgb?"[" + rgb.toString() + "] typeof " + typeof(rgb[0]):rgb, hsl?hsl.toString():hsl, hsv?hsv.toString():hsv, hwb?hwb.toString():hwb, cname);

          if (rgb[3] !== undefined) {
            if (EC.rgbOutput) { // CSS4 float
              rgbcss = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (+rgb[3]).toFixed(ap) + ")";
            } else { // CSS3 integer
              rgbcss = "rgba(" + rgb3i[0] + "," + rgb3i[1] + "," + rgb3i[2] + "," + (+rgb3i[3]).toFixed(ap) + ")";
            }
            hslcss = "hsla(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%," + (+hsl[3]).toFixed(ap) + ")";
            hwbcss = "hwb(" + hwb[0] + " " + hwb[1] + "% " + hwb[2] + "%/" + (+hwb[3] * 100).toFixed(ap) + "%)";
            if (EC.hsvI) hsvcss = "hsva(" + hsv[0] + "," + hsv[1] + "%," + hsv[2] + "%," + (+hsv[3]).toFixed(ap) + ")";
          }
          else {
            if (EC.rgbOutput) { // CSS4 float
              rgbcss = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
            } else { // CSS3 integer
              rgbcss = "rgb(" + rgb3i[0] + "," + rgb3i[1] + "," + rgb3i[2] + ")";
            }
            hslcss = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
            hwbcss = "hwb(" + hwb[0] + " " + hwb[1] + "% " + hwb[2] + "%)";
            if (EC.hsvI) hsvcss = "hsv(" + hsv[0] + "," + hsv[1] + "%," + hsv[2] + "%)";
          }

          //console.log("textInput before setInput: rgbcss=%s hslcss=%s hwbcss=%s hsvcss=%s cname=%s", rgbcss, hslcss, hwbcss, hsvcss, cname);

          setInput();
          if (sourceI === "rgb") {
            EC.rangeInput(null,"rgb", rgbcss, 1);
          } else if (sourceI === "hsl" || sourceI === "hwb" || sourceI === "hsv") {
            EC.rangeInput(null,"hsl", hslcss, 1);
          } else { // error
            EC.isError++;
            EC.errorString = "textInput Error: inputO='" + inputO + "' cssColor='" + cssColor + "' unknown sourceI='" + sourceI + "'!";
            console.log(EC.errorString);
            EC.topMsgF("");
            return;
          }

        } // if (sourceI) end
        else { // only if code bug in abcCssToDEF()
          EC.isError++;
          EC.errorString = "textInput Error: inputO='" + inputO + "' cssColor='" +  cssColor + "'!";
          console.log(EC.errorString);
          EC.topMsgF("");
          return;
        }

      }
      else { // !inputO
        // From rangeInput(), $param inputO=null, sRGB and sHSL are
        // toFixed(EC.rgbPrecision | EC.outputPrecision) formatted float strings.
        // No error handling, slider have no error.
        // CSS handling
        //console.log("textInput: %s sHSL=%s, %s sRGB=%s", typeof sHSL[0], sHSL, typeof sRGB[0], sRGB);
        rgb = sRGB;

        rgb3i[0] = (+rgb[0]).toFixed(0);
        rgb3i[1] = (+rgb[1]).toFixed(0);
        rgb3i[2] = (+rgb[2]).toFixed(0);
        if (rgb[3]) {
          rgb3i[3] = rgb[3];
        }
        //console.log("textInput !inputO: rgb3i=%s typeof=%s", rgb3i, typeof rgb3i[0]);

        hsl = sHSL;
        if (+hsl[0] === 360) {
          hsl[0] = (0).toFixed(op);
        }
        if (+hsl[2] === 0 || +hsl[2] === 100) { // black or white
          hsl[0] = hsl[1] = (0).toFixed(op);
        }
        //console.log("textInput !inputO: hsl=%s typeof=%s", hsl, typeof hsl[0]);
        hwb = EC.rgbToHWB(rgb);
        hex = EC.rgbToHEX(rgb3i);
        cname = EC.hexToName(hex);
        if (EC.hsvI) hsv = EC.hslToHSV(hsl);

        //console.log("textInput slider: rgb='%s' hsl='%s' hsv=[%s] hwb=[%s] cname='%s'", rgb?"[" + rgb.toString() + "] typeof " + typeof(rgb[0]):rgb, hsl?"[" + hsl.toString() + "] typeof " + typeof(hsl[0]):hsl, hsv?hsv.toString():hsv, hwb?hwb.toString():hwb, cname);

        if (rgb[3]) {
          if (EC.rgbOutput) { // CSS4 float
            rgbcss = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (+rgb[3]).toFixed(ap) + ")";
          } else { // CSS3 integer
            rgbcss = "rgba(" + rgb3i[0] + "," + rgb3i[1] + "," + rgb3i[2] + "," + (+rgb3i[3]).toFixed(ap) + ")";
          }
          hslcss = "hsla(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%," + (+hsl[3]).toFixed(ap) + ")";
          hwbcss = "hwb(" + hwb[0] + " " + hwb[1] + "% " + hwb[2] + "%/" + (+hwb[3] * 100).toFixed(ap) + "%)";
          if (EC.hsvI) hsvcss = "hsva(" + hsv[0] + "," + hsv[1] + "%," + hsv[2] + "%," + (+hsv[3]).toFixed(ap) + ")";
        } else {
          if (EC.rgbOutput) { // CSS4 float
            rgbcss = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
          } else { // CSS3 integer
            rgbcss = "rgb(" + rgb3i[0] + "," + rgb3i[1] + "," + rgb3i[2] + ")";
          }
          hslcss = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
          hwbcss = "hwb(" + hwb[0] + " " + hwb[1] + "% " + hwb[2] + "%)";
          if (EC.hsvI) hsvcss = "hsv(" + hsv[0] + "," + hsv[1] + "%," + hsv[2] + "%)";
        }
        //console.log("textInput: EC.isError=%s", EC.isError);
        setInput();
      } // end !inputO
    },

    /* rangeInput - Slider handling
    $param: inputO - Input object from event input|change, null if from function.
    $param: mode - string. Only "rgb" or "hsl".
    $param: colorCss - string. No tests, must be correct CSS 3.
    $param: ti - bool. 0 | 1 if called from textInput()
    $return: void
    V0.5.2: Float RGB eingebaut.
    */
    rangeInput: function (inputO, mode, colorCss, ti) {
      //"use strict";
      let a, // exec array
      p, // pattern
      rgb = [],
      hsl = [],
      rgbcss,
      hslcss,
      ap = EC.alphaPrecision,
      op = EC.outputPrecision,
      rp = EC.rgbPrecision,
      alpha, // Here only CSS3 format handling 0..1.
      a1A = (1).toFixed(ap); // Used if alphaOne==1

      //console.log("rangeInput: mode=%s colorCss=%s typeof: %s, %s",mode,colorCss, typeof mode, typeof colorCss);
      //console.log("rangeInput: inputO%s mode=%s colorCss=%s ti=%s", (inputO ? ".id=" + inputO.id : "=" + inputO), mode, colorCss, ti);

      switch(mode) {
      case "alpha":
      case "rgb":
          if (colorCss) { // Set slider
            p = /(rgba?)(?:\((?:(?:\s*?([\-+]?\d+(?:\.[\d]+)?|[\-+]?\.[\d]+)(%?)\s*?)(?:(,| )\s*?([\-+]?\d+(?:\.[\d]+)?|[\-+]?\.[\d]+)(%?)\s*?)(?:(,| )\s*?([\-+]?\d+(?:\.[\d]+)?|[\-+]?\.[\d]+)(%?)\s*?))(?:(,|\/)\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%?)\s*?)?\)\s*?)/g; // CSS3+4
            a = p.exec(colorCss);
            //console.log("rangeInput: set mode='%s' a=", mode, a);
            //console.log("rangeInput: set mode='%s' a='%s' [0]='%s' 1='%s' 2='%s' 3='%s' 4='%s' 5='%s' 6='%s' 7='%s' 8='%s' 9='%s' 10='%s' 11='%s' 12='%s' 13='%s' 14='%s' 15='%s'", mode, a, a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);

            rgb = [(+a[2]).toFixed(rp), (+a[5]).toFixed(rp), (+a[8]).toFixed(rp)];
            if (a[11] !== undefined) {
              EC.alphaA.value = alpha = (+a[11]).toFixed(ap);
              if (EC.alphaOne === 0 && alpha === a1A) {
                //console.log("rangeInput: set alpha==a1A=%s rgb=%s", alpha, rgb);
              } else {
                rgb[3] = alpha;
                //console.log("rangeInput: alpha set mode=%s rgb=%s", mode, rgb);
              }
            } else { // alpha not set
              EC.alphaA.value = a1A;
            }

            EC.rgbR.value = rgb[0];
            EC.rgbG.value = rgb[1];
            EC.rgbB.value = rgb[2];

            //console.log("rangeInput: set mode=%s rgb=%s", mode, rgb);

          } else { // Read slider
            alpha = (+EC.alphaA.value).toFixed(ap);
            if (EC.alphaOne === 0 && alpha === a1A) {
              rgb = [(+EC.rgbR.value).toFixed(rp), (+EC.rgbG.value).toFixed(rp), (+EC.rgbB.value).toFixed(rp)];
            } else {
              rgb = [(+EC.rgbR.value).toFixed(rp), (+EC.rgbG.value).toFixed(rp), (+EC.rgbB.value).toFixed(rp), alpha];
            }
            //console.log("rangeInput: get mode=%s rgb=%s", mode, rgb);
          }
          hsl = EC.rgbToHSL(rgb);
          break;
        case "hsl":
          if (colorCss) { // Set slider
            p = /(hs[lv]a?)(?:\((?:\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)\s*?(?:(,| )\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%))\s*?(?:(,| )\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%))\s*?)(?:(,|\/)\s*?([\-+]?\d+(?:\.\d+)?|[\-+]?\.\d+)(%?))?\s*?\))/g; // CSS3+4
            a = p.exec(colorCss);
            //console.log("rangeInput: set mode='%s' a='%s' [0]='%s' 1='%s' 2='%s' 3='%s' 4='%s' 5='%s' 6='%s' 7='%s' 8='%s' 9='%s' 10='%s' 11='%s' 12='%s' 13='%s' 14='%s' 15='%s'", mode, a, a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);

            hsl = [a[2], a[4], a[7]];
            if (a[10] !== undefined) {
              EC.alphaA.value = alpha = (+a[10]).toFixed(ap);
              if (EC.alphaOne === 0 && alpha === a1A) {
              } else {
                hsl[3] = alpha;
              }
            } else {
              EC.alphaA.value = a1A;
            }

            //console.log("rangeInput: set mode=%s hsl=%s", mode, hsl);

            EC.hslH.value = hsl[0];
            EC.hslS.value = hsl[1];
            EC.hslL.value = hsl[2];

          } else { // Read slider
            alpha = (+(EC.alphaA).value).toFixed(ap);
            //console.log("rangeInput: get typeof %s alpha=%s typeof %s a1A=%s EC.alphaOne=%s", typeof alpha, alpha, typeof a1A, a1A, EC.alphaOne);
            if (EC.alphaOne === 0 && alpha === a1A) {
              //console.log("rangeInput: get alpha=%s === a1A=%s", alpha, a1A);
              hsl = [(+EC.hslH.value).toFixed(op), (+EC.hslS.value).toFixed(op), (+EC.hslL.value).toFixed(op)];
            } else {
              hsl = [(+EC.hslH.value).toFixed(op), (+EC.hslS.value).toFixed(op), (+EC.hslL.value).toFixed(op), alpha];
            }
            rgb = EC.hslToRGB(hsl);
            //console.log("rangeInput: typeof hsl[0]=%s", typeof hsl[0]);
            //console.log("rangeInput: get mode=%s hsl=%s", mode, hsl);
          }
          rgb = EC.hslToRGB(hsl);
          break;
        default: // Error, must set color
          if (alpha === a1A && EC.alphaOne === 0) {
            rgb = [255, 255, 255];
          } else {
            rgb = [255, 255, 255, alpha];
          }
          hsl = EC.rgbToHSL(rgb);
          EC.isError++; // Reset only from colorInit() or text input.
          EC.errorString = "rangeInput Error: mode=" + mode + " colorCss=" + colorCss + "!";
          console.log(EC.errorString);
          EC.topMsgF("");
        }
        EC.hslS.style.backgroundImage = "linear-gradient(90deg, hsl(0,0%,50%), hsl(" + hsl[0] + ",100%,50%))";

        EC.alphaA.style.backgroundImage = "linear-gradient(90deg, hsla(0,0%,100%,0), hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%))";
      /* Funktioniert nicht so!!!
      ::-webkit-slider-runnable-track: 
      #shadow-root (user-agent)
       <div>
        <div pseudo="-webkit-slider-runnable-track" id="track"><div id="thumb"><\/div></\div><\/div>
      
      ::-moz-range-track:
        input[type=range]::-moz-range-track
        
      ::-ms-track setzen: EC.alphaA.style.backgroundImage
      let bgA = "linear-gradient(90deg, hsla(0,0%,100%,0), hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%))";
      EC.alphaA.WebkitSliderRunnableTrack.style.backgroundImage =
      EC.alphaA.MozRangeTrack.style.backgroundImage =
      EC.alphaA.MsTrack.style.backgroundImage = bgA;
      Suchen!!!
      */

        if (alpha !== undefined) {
          if (EC.alphaOne === 0 && alpha === a1A) {
            rgbcss = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
            hslcss = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
          } else {
            rgbcss = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
            hslcss = "hsla(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%," + alpha + ")";
          }
        } else {
          rgbcss = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
          hslcss = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
        }

        EC.rgbValue.innerHTML = rgbcss;
        EC.hslValue.innerHTML = hslcss;
        EC.alphaValue.innerHTML = (alpha === undefined ? a1A : alpha);

        if (mode !== "rgb") {
          EC.rgbR.value = rgb[0];
          EC.rgbG.value = rgb[1];
          EC.rgbB.value = rgb[2];
        }

        if (mode !== "hsl") {
          EC.hslH.value = hsl[0];
          EC.hslS.value = hsl[1];
          EC.hslL.value = hsl[2];
        }

      //console.log("rangeInput: mode=%s rgb=%s hsl=%s rgbcss=%s hslcss=%s", mode, rgb, hsl, rgbcss, hslcss);

      // Library output, should a external function!!! This is only a show test.
      // Browser setzen nur rgba() bei Nameeingabe ohne a!!!
        document.querySelector("body").style.backgroundColor = rgbcss;
        if (EC.testLocalStorage()) {
          localStorage.lastBgColor = JSON.stringify(rgbcss);
        }

        if (ti !== 1) {
         EC.textInput(null, rgb, hsl);
       }
     },

    /* parseCssToRGB
    $param: s - string - any unparsed CSS format.
    $return: rgb - array of integer 0-255, a 0-1 if a. On error null.
    */
     parseCssToRGB: function (s) {
      let c = s, // cssColor
      p, // prefix
      rgb, // rgb array with a if alpha
      a; // pattern match result array

      //console.log("parseCssToRGB: s='%s' c='%s'", s, c);
      // Color name may capitalized. "rgb", "hsl", "hsv" lowercased.

      EC.clearErrorF();
      if (!EC.isString(s, "parseCssToRGB")) {
        return null;
      }
      // CSS4 conform: " " for ",", "/\s*?<number>%?" for alpha value
      c = c.replace(/\s+/g, " ");

      p = c.match(/#|[a-z]+/i);
      //console.log("parseCssToRGB: p='%s'", p);
      //console.log("parseCssToRGB: p[0]=%s typeof=%s", p[0], typeof p[0]);
      if (p) {
        let pattern;
        switch(p[0]) {
        case "#":
          rgb = EC.hexCssToRGB(c);
          if (rgb !== null) { return rgb; }
          break;
        case "rgba":
          case "rgb": // Gibt formatiert aus.
            rgb = EC.rgbCssToRGB(c);
            if (rgb !== null) { return rgb; }
            break;
          case "hsla":
          case "hsl":
            rgb = EC.hslCssToRGB(c);
            if (rgb !== null) { return rgb; }
            break;
          case "hsva":
          case "hsv":
            rgb = EC.hsvCssToRGB(c);
            if (rgb !== null) { return rgb; }
            break;
          case "hwb":
            rgb = EC.hwbCssToRGB(c);
            if (rgb !== null) { return rgb; }
            break;
          default:
            a = p[0].match(/[a-z]{3,20}/ig);
            if (a !== null) { // color name
              //console.log("parseCssToRGB default: a[0]=%s p[0]=%s", a[0], p[0]);
              rgb = EC.nameCssToRGB(p[0]);
              if (rgb !== null) {
                //console.log("parseCssToRGB name: %s rgb=%s", c, rgb);
                return rgb;
              } // else fall through
            }
            EC.isError++;
            EC.errorString = "parseCssToRGB Error: Unknown or wrong css string '" + s + "'!";
            console.log(EC.errorString);
            EC.topMsgF("");
          }
        // No second error message.
          return null;
        }
        EC.isError++;
        EC.errorString = "parseCssToRGB Error: No css string '" + s + "'!";
        console.log(EC.errorString);
        EC.topMsgF("");
        return null;
      },

    /* parseCssToHSL - hppFormat() eingesetzt um -0.00 Bug in hwbToHSL() zu korrigieren!
    $param: s - string - any unparsed CSS format.
    $return: hsl - array of string h (0-360) s (0-100) l (0-100) a (0-1) or null if error.
    */
      parseCssToHSL: function (s) {
      let c = s, // cssColor
      p, // prefix
      hsl, // hsl array with a if alpha
      a; // pattern match result array

      //console.log("parseCssToHSL: s='%s' c='%s'", s, c);
      // Color name may capitalized. "rgb", "hsl", "hsv" lowercased.

      EC.clearErrorF();
      if (!EC.isString(s, "parseCssToHSL")) {
        return null;
      }
      // CSS4 conform: " " for ",", "/\s*?<number>%?" for alpha value
      c = c.trim().replace(/\s+/g, " ");

      p = c.match(/#|[a-z]+/i);
      //console.log("parseCssToHSL: p='%s'", p);
      //console.log("parseCssToHSL: p[0]=%s typeof=%s", p[0], typeof p[0]);
      if (p) {
        let pattern;
        switch(p[0]) {
        case "#":
          hsl = EC.hexCssToHSL(c);
          if (hsl !== null) { return hsl; }
          break;
        case "rgba":
        case "rgb":
          hsl = EC.rgbCssToHSL(c);
          if (hsl !== null) { return hsl; }
          break;
        case "hsla":
        case "hsl":
          hsl = EC.hueCssTo(c);
          if (hsl !== null) { return EC.hppFormat(hsl); }
          break;
        case "hsva":
        case "hsv":
          hsl = EC.hsvCssToHSL(c);
          if (hsl !== null) { return hsl; }
          break;
        case "hwb":
          hsl = EC.hwbCssToHSL(c);
          if (hsl !== null) { return hsl; }
          break;
        default:
          a = p[0].match(/[a-z]{3,20}/i);
            if (a !== null) { // color name
              //console.log("parseCssToHSL default: a[0]=%s p[0]=%s", a[0], p[0]);
              hsl = EC.nameCssToHSL(p[0]);
              if (hsl !== null) {
                //console.log("parseCssToHSL name: %s hsl=%s", c, hsl);
                return hsl;
              } // else fall through
            }
            EC.isError++;
            EC.errorString = "parseCssToHSL Error: Unknown or wrong css string '" + s + "'!";
            console.log(EC.errorString);
            EC.topMsgF("");
            return null;
          }
        // No second error message.
          return null;
        }
        EC.isError++;
        EC.errorString = "parseCssToHSL Error: No css string '" + s + "'!";
        console.log(EC.errorString);
        EC.topMsgF("");
        return null;
      },

    /* parseCssToHWB
    $param: s - string - any unparsed CSS format.
    $return: hwb - array of string h (0-360) w (0-100) b (0-100) a (0-1) or null if error.
    */
      parseCssToHWB: function (s) {
      let c = s, // cssColor
      p, // prefix
      hwb, // hwb array with a if alpha
      a; // pattern match result array

      //console.log("parseCssToHWB: s='%s' c='%s'", s, c);
      // Color name may capitalized. "rgb", "hsl", "hsv", hwb lowercased.

      EC.clearErrorF();
      if (!EC.isString(s, "parseCssToHWB")) {
        return null;
      }
      // CSS4 conform: " " for ",", "/\s*?<number>%?" for alpha value
      c = c.trim().replace(/\s+/g, " ");

      p = c.match(/#|[a-z]+/i);
      //console.log("parseCssToHWB: p='%s'", p);
      //console.log("parseCssToHWB: p[0]=%s typeof=%s", p[0], typeof p[0]);
      if (p !== null) {
        let pattern;
        switch(p[0]) {
        case "#":
          hwb = EC.hexCssToHWB(c);
          if (hwb !== null) { return hwb; }
          break;
        case "rgba":
        case "rgb":
          hwb = EC.rgbCssToHWB(c);
          if (hwb !== null) { return hwb; }
          break;
        case "hsla":
        case "hsl":
          hwb = EC.hslCssToHWB(c);
          if (hwb !== null) { return hwb; }
          break;
        case "hsva":
        case "hsv":
          hwb = EC.hsvCssToHWB(c);
          if (hwb !== null) { return hwb; }
          break;
        case "hwb":
          hwb = EC.hueCssTo(c);
          if (hwb !== null) { return EC.hppFormat(hwb); }
          break;
        default:
          a = p[0].match(/[a-z]{3,20}/i);
            if (a !== null) { // color name
              //console.log("parseCssToHWB default: a[0]=%s p[0]=%s", a[0], p[0]);
              hwb = EC.nameCssToHWB(p[0]);
              if (hwb !== null) {
                //console.log("parseCssToHWB name: %s hsl=%s", c, hsl);
                return hwb;
              } // else fall through
            }
            EC.isError++;
            EC.errorString = "parseCssToHWB Error: Unknown or wrong css string '" + s + "'!";
            console.log(EC.errorString);
            EC.topMsgF("");
            return null;
          }
        // No second error message.
          return null;
        }
        EC.isError++;
        EC.errorString = "parseCssToHSL Error: No css string '" + s + "'!";
        console.log(EC.errorString);
        EC.topMsgF("");
        return null;
      },

    /* Bool. For IE10+, Edge …. Opera, Chrome OK. Auslagern!!!
    Gehört nach exoticcolor-library-init-v0.17.js !
    */
      testLocalStorage: function () {
        let msg = "No Storage aviable.";
        if (1 === EC.noStorage) return true;
        if (0 === EC.noStorage) return false;
      try { // -1 start value
        throw(window.localStorage);
      }
      catch(e) {
        //console.log("testLocalStorage: e='%s' e.message='%s' typeof e='%s' e.name='%s' e", e, typeof e === 'object'? e.message : undefined, typeof e, typeof e === 'object'? (typeof e.name?e.name:undefined) :undefined, e);
        if (typeof e === "object" && typeof e.name === "undefined") {
          //console.info("Object.getOwnPropertyNames(e): ", Object.getOwnPropertyNames(e));
          EC.noStorage = 1;
          return true;
        } else if (typeof e === "object" && typeof e.name === "string") {
          //console.info("Object.getOwnPropertyNames(e): ", Object.getOwnPropertyNames(e));
          if (e.name !== "Error") {
            EC.noStorage = 1;
            return true; // Chrome "f"
          }
          EC.noStorage = 0; // else Edge Legacy
          console.error("Nur Edge Legacy sollte hier hinkommen. %s", msg);
          EC.isError++;
          EC.errorString = msg;
          console.log(EC.errorString);
          EC.topMsgF(msg);
          return false;
        } else { //IE
          EC.noStorage = 0;
          console.error("Nur IE sollte hier hinkommen. %s", msg);
          EC.isError++;
          EC.errorString = msg;
          console.log(EC.errorString);
          EC.topMsgF(msg);
          return false;
        }
      }
    },
  }
  // exoticColor end

  EC = exoticColor;

  /* addMsg
  typ - "m" | "w" | "e" Art der Meldung ist Meldung | Warnung | Fehler.
  msg - string mit Meldung. 
  */
  function addMsg(typ, msg) {
    //let result = "<" 
  }

  /* topMsg In Arbeit!!!
  $param: s - string with message to show (no error output). Set errorValue.innerText to "0".
  If S and empty or undefined EC.errorString used.
  $return: void.
  All parser reset at start all error values. Only multiple warnings and errors are added.
  V0.16 changed hjt1946 2021-10-03:
  1. Console output now with line numbers before calling EC.topMsgF().
  2. Is s!=="" output is only a info message. EC.errorValue.color set transparent. EC.errorValue.innerText left unchanged.
  */
  function topMsg(s) {
    let m = "", oldErrorValue = "";
    if(EC.errorMsg !== null && EC.errorValue !== null) {
      oldErrorValue = EC.errorValue? +(EC.errorValue.innerText) : 0;
      if (s) {
        if (EC.errorMsg !== null) {
          //console.log("errorMsg s: id=%s innerText='%s' s='%s'", EC.errorMsg.id, EC.errorMsg.innerText, s);
          EC.errorMsg.innerText = s + "🤨";
        }
        if (EC.errorValue !== null) {
          EC.errorValue.innerText = "0";
          EC.isError = 0;
        }
        if (EC.handleError !== 0) {
          document.querySelector("[data-messages]").setAttribute("data-messages", "true");
        }
        return;
      }
      if (EC.errorMsg && oldErrorValue > 0) {
        // take only warning and error as old Msg
        m = EC.errorMsg.innerText;
        //console.log("errorMsg !s oldErrorValue &gt; 0: innerText='%s' oldErrorValue=%d m='%s' s='%s'", EC.errorMsg.innerText, oldErrorValue, m, s);
      }
      //console.log("errorMsg !s: innerText='%s' oldErrorValue=%d m='%s' s='%s'", EC.errorMsg.innerText, oldErrorValue, m, s);
      if (!s) {s = EC.errorString;}
      if (typeof(EC.isError) === "number" && EC.isError > 0) {
        oldErrorValue += EC.isError;
        //console.log("errorMsg isError \> 0: isError='%s' oldErrorValue=%d s='%s' m='%s'", EC.isError, oldErrorValue, s, m);
        m = !m.trim()? s: s + " 🤫\u000a" + m + " 👿"; // Add messages before if two
        if (EC.errorValue != "0") {
          EC.errorValue.innerText = "" + oldErrorValue;
        }
        if (EC.errorMsg != "") {
          EC.errorMsg.innerText = m;
        }
      }
      document.querySelector("[data-messages]").setAttribute("data-messages", "true");
      //console.log("errorMsg test: innerText='%s' s='%s' m='%s'", EC.errorMsg.innerText, s, m);
      if (EC.handleError !== 0) {
        console.log(s);
      }
    }
  }
  EC.topMsgF = topMsg;

  /* clearError
  $param: -.
  $return: void.
  */
  function clearError() {
    if(EC.errorMsg !== null && EC.errorValue !== null) {
      EC.isError = 0;
      EC.errorString = "";
      if (EC.errorValue != "0") {
        EC.errorValue.innerText = EC.errorString;
      }
      if (EC.errorMsg != "") {
        EC.errorMsg.innerText = EC.errorString;
      }
      if(EC.warnMsg !== null) {
        EC.isWarn = 0;
        EC.warnMsg.innerText = EC.errorString;
      }
      document.querySelector("[data-messages]").setAttribute("data-messages", "false");
    }
  }
  EC.clearErrorF = clearError;

  return exoticColor;
}));
