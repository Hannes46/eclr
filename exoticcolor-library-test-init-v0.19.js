/* exoticcolor-library-test-init-v0.17.js
"Version 0.19&#10;2026-06-30T17:00&#10;"
Änderung 2021-11-07 hjt1946:
Hier sind nur die Funktionen zur Initialisierung der HTML-Datei ‚./exoticcolor-library-test-v0.17.html‛ enthalten.
Alle anderen Funktionen aus ‚./exoticcolor-library-test-v0.17.js‛und Hilfsfunktionen aus ‚./exoticcolor-library-v0.17.js‛ werden in ‚./exoticcolor-library-init-v0.17.js‛ verschoben.
Bis ‚./exoticcolor-library-init-v0.17.js‛ vollständig ist und funktioniert, wird in den zu ändernden Dateien nichts entfernt!
Änderung 2026-06-30 hjt1946: Mit Sublime neu eingerückt, Version angepasst.
Fehler in localstorage beseitigt.
*/

document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  let EC = window.exoticColor;

  //console.log("colorInit 1: exoticColor=%s window.exoticColor=%s getOwnPropertyNames(EC)=%s", exoticColor, window.exoticColor, Object.getOwnPropertyNames(EC));
  /* ****** Init functions ***** */

  /* eclrRangeInput
  $param: f - bool
   0: Use event INPUT if browser FF, Chrome...
   1: Use event CHANGE if browser IE 10/11.
  And init aviable range input variables.
  */
  function eclrRangeInput() {
    let rgbR, rgbG, rgbB, hslH, hslS, hslL, alphaA,
    h = "input";

    EC.rgbR = document.querySelector("#rgb-r");
    if(EC.rgbR) {
      EC.rgbR.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"rgb");
      }, false);
    }
    EC.rgbG = document.querySelector("#rgb-g");
    if(EC.rgbG) {
      EC.rgbG.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"rgb");
      }, false);
    }
    EC.rgbB = document.querySelector("#rgb-b");
    if(EC.rgbB) {
      EC.rgbB.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"rgb");
      }, false);
    }
    EC.hslH = document.querySelector("#hsl-h");
    if(EC.hslH) {
      EC.hslH.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"hsl");
      }, false);
    }
    EC.hslS = document.querySelector("#hsl-s");
    if(EC.hslS) {
      EC.hslS.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"hsl");
      }, false);
    }
    EC.hslL = document.querySelector("#hsl-l");
    if(EC.hslL) {
      EC.hslL.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"hsl");
      }, false);
    }
    EC.alphaA = document.querySelector("#alpha-a");
    if(EC.alphaA) {
      EC.alphaA.addEventListener(h, function (e) {
        EC.rangeInput(e.target,"alpha");
      }, false);
    }
  }

  /* eclrTextInput
  Setzt Event-Handler CHANGE bei Input-Typ Text.
  Aufgefufen von colorInit() nach Slider Inputhandlern.

  Die Funktionsnamen im Handler dienen nur Debugzwecken.
  */
  function eclrTextInput() {
    EC.colorI = document.querySelector("#cssInput");
    if(EC.colorI) {
      EC.colorI.addEventListener("change", function cssInput(e) {
      EC.textInput(e.target);
      }, false);
    }
    EC.hslI = document.querySelector("#hslInput");
    if(EC.hslI) {
      EC.hslI.addEventListener("change", function hslInput(e) {
        EC.textInput(e.target);
      }, false);
    }
    EC.hwbI = document.querySelector("#hwbInput");
    if(EC.hwbI) {
      EC.hwbI.addEventListener("change", function hwbInput(e) {
        EC.textInput(e.target);
      }, false);
    }
    EC.hsvI = document.querySelector("#hsvInput");
    if(EC.hsvI) {
      EC.hsvI.addEventListener("change", function hsvInput(e) {
        EC.textInput(e.target);
      }, false);
    }
    EC.rgbI = document.querySelector("#rgbInput");
    if(EC.rgbI) {
      EC.rgbI.addEventListener("change", function rgbInput(e) {
        EC.textInput(e.target);
      }, false);
    }
    EC.hexI = document.querySelector("#hexInput");
    if(EC.hexI) {
      EC.hexI.addEventListener("change", function hexInput(e) {
        EC.textInput(e.target);
      }, false);
    }
    EC.nameI = document.querySelector("#nameInput");
    if(EC.nameI) {
      EC.nameI.addEventListener("change", function inputName(e) {
        EC.textInput(e.target);
      }, false);
    }
    EC.namesI = document.querySelector("#nameSelect");
    if(EC.namesI) {
      EC.namesI.addEventListener("change", function selectName(e) {
        EC.textInput(e.target);
      }, false);
    }
  }

  /* allDigits
  EC.isError to EC.hexAlpha are all typeof number and must set to number!
  Formatted step values are typeof string.
  */
  function allDigits(numObject) {
    let step, // for range inputs
    v, // value
    hslH = document.querySelector("#hsl-h"),
    hslS = document.querySelector("#hsl-s"),
    hslL = document.querySelector("#hsl-l"),
    alphaA = document.querySelector("#alpha-a");

    // Set slider step to precision
    function d(d) {
      let s="1";
      function n(d) {
        if(d <= 0) {
          return s;
        }
        while(d--) {
          s = "0" + s;
        }
        return s;
      }
      s = n(d);
      s = s[0] === "0" ? "." + s.substring(1) : "1";
      return s;
    }

    v = +numObject.value;
    //if (isNaN(v)) {return;} // ???
    //console.log("allDigits: id=%s value=%s eclr='%s'", numObject.id, numObject.value, numObject.getAttribute("data-eclr");
    switch(numObject.id) {
      case "outputPrecision": // 0‥2‥4‥16
        EC.outputPrecision = v;
        step = d(v);
        //console.log("step=%s actstep='%s'", step, hslH.step);
        hslH.step = step;
        hslL.step = step;
        hslS.step = step;
        // Init: EC.outputPrecision = hslH.step.length - 1;
        //console.log("v=%s step=%s step.length=%s newstep='%s'", v, step, step.length, hslH.step);
        break;
      case "rgbPrecision": // 0‥2‥4‥16
        EC.rgbPrecision = v;
        step = d(v);
        alphaA.step = step;
        break;
      case "alphaPrecision": // 0‥2‥16
        EC.alphaPrecision = v;
        step = d(v);
        alphaA.step = step;
        break;
      case "handleError": // 0|1
        EC.handleError = v;
        break;
      case "alphaOne": // 0|1, visible alpha value
        EC.alphaOne = v;
        break;
      case "rgbOutput": // 0|1, 0: integer value | 1: number value
        EC.rgbOutput = v;
        break;
      case "hexAlpha": // 0|1
        EC.hexAlpha = v;
        break;
      default:
        EC.isError += 20;
        EC.errorString = "allDigits Error: " + numObject.id + ".value='" + numObject.value + "'!";
        EC.topMsgF("");
        return;
    }

    // read slider actual color
    EC.rangeInput(null, "hsl", null, 0);
  }

  /* eclrNumberInput
  Setzt Event-Handler INPUT bei Nummereingabe.
  Aufgefufen von colorInit() nach Slider Inputhandlern.
  */
  function eclrNumberInput() {
    document.querySelector("#outputPrecision").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
    document.querySelector("#alphaPrecision").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
    document.querySelector("#handleError").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
    document.querySelector("#alphaOne").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
    document.querySelector("#rgbPrecision").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
    document.querySelector("#rgbOutput").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
    document.querySelector("#hexAlpha").addEventListener("input", function (e) {
      allDigits(e.target);
    }, false);
  }

  /* colorInit
  $param: none
  $return: void
  */
  function colorInit() {
    let t, u, // temp value
    min, max; // range attribute values

    // Text output init, must be first to see messages
    EC.rgbValue = document.querySelector("#rgbValue");
    EC.hslValue = document.querySelector("#hslValue");
    EC.alphaValue = document.querySelector("#alphaValue");
    EC.errorValue = document.querySelector("[data-messages] #errorValue");
    EC.errorMsg = document.querySelector("[data-messages] #errorMsg");
    EC.warnMsg = document.querySelector("[data-messages] #warnMsg");
    EC.clearErrorF();

    eclrRangeInput(); // Set time critical handler
    eclrTextInput(); // Set uncritical handler
    eclrNumberInput(); // Set uncritical handler

    // Formatted step values are string.
    if(EC.rgbR !== null) {
      t = EC.rgbR.step;
      u = t.length; // number
      u = u > 0 ? u - 1 : 1;
      EC.rgbPrecision = u;
      //console.log("%s t=%s %s {""+u} u=%s", typeof t, t, typeof ("" + u), u);
      document.querySelector("#rgbPrecision").value = "" + u;
    }

    if(EC.hslH !== null) {
      t = EC.hslH.step;
      u = t.length; // number
      u = u > 0 ? u - 1 : 1;
      EC.outputPrecision = u;
      //console.log("%s t=%s %s {""+u} u=%s", typeof t, t, typeof ("" + u), u);
      document.querySelector("#outputPrecision").value = "" + u;
    }

    if(EC.alphaA !== null) {
    t = EC.alphaA.step;
    u = t.length;
    u = u > 0 ? u - 1 : 1;
    //console.log("t=%s u=%s", t, u);
    EC.alphaPrecision = u;
    document.querySelector("#alphaPrecision").value = "" + u;
    }

    // EC.isError to EC.hexAlpha are all typeof number and must set to number!
    // Changed values ok after reload
    EC.handleError = +(document.querySelector("#handleError").value);
    EC.alphaOne = +(document.querySelector("#alphaOne").value);
    EC.rgbOutput = +(document.querySelector("#rgbOutput").value);
    //EC.hexAlpha = +(document.querySelector("#hexAlpha").value);
    //console.log("handleError=%s alphaOne=%s hexAlpha=%s", EC.handleError, EC.alphaOne, EC.hexAlpha, typeof EC.handleError, typeof EC.alphaOne, typeof EC.hexAlpha);

    /*
    // Must be at last, read slider actual color if aviable
    if(EC.hslH !== null) {
      EC.rangeInput(null, "hsl", null, 0);
    } else if(EC.rgbR !== null) {
      EC.rangeInput(null, "rgb", null, 0);
    } // else no slider aviable
    */

    /* repariert 2026-06-30 hjt1946
    #bgInput akt. bg-color ausgeben, 
    speichern in localStorage.lastBgColor.
    2021-09-30 hjt: Logik ist falsch für actBgColor da zu diesem Zeitpunkt keine Hintergrundfarbe gesetzt ist für BODY! → 
    */
    let lastBgColor = "rgba(82,65,0,0.9)";
    let actBgColor = window.getComputedStyle(document.querySelector("body")).backgroundColor.replace(/\s/g, "");
    //console.info("colorInit body.backgroundColor 1: lastBgColor=%s actBgColor=%s", lastBgColor, actBgColor);
    if(localStorage.lastBgColor) {
      lastBgColor = JSON.parse(localStorage.lastBgColor);
    } else {
      localStorage.lastBgColor = JSON.stringify(lastBgColor);
    }

    //console.info("colorInit body.backgroundColor 2: lastBgColor='%s' actBgColor='%s'", lastBgColor, actBgColor);

    let bgc = lastBgColor.substring(0, 3);
    let lbgc = EC.parseCssToRGB(lastBgColor);
    //console.info("colorInit 3: bgc=%s lastBgColor='%s'", bgc, lastBgColor);
    if (bgc !== "rgb") {
      lastBgColor = "rgb(" + lbgc.toString() + ")";
      //console.info("Not RGB: %s %s", lbgc, lbgc.toString());
    }
    //console.info("colorInit 4: bgc=%s lbgc='%s' %s", bgc, lbgc, lbgc.toString());
    EC.rangeInput(null, "rgb", lastBgColor, 0);
  } // colorInit end

  /*      */
  function browserData() {
    // FF allow this only over https

    let ua;
    if ("userAgentData" in navigator) {
      console.info("navigator.userAgentData.brands: %s ", navigator.userAgentData.brands, navigator.userAgentData.brands);

      /*
      navigator.userAgentData.getHighEntropyValues(
        ["architecture",
        "model",
        "platform",
        "platformVersion",
        "uaFullVersion"])
        .then(ua => { console.info("navigator.userAgentData.getHighEntropyValues()", ua) });
      */

      ua = navigator.userAgentData.getHighEntropyValues( ["architecture", "brands", "mobile", "model", "platform", "platformVersion", "uaFullVersion"]);
      if (ua) {
        console.info("navigator.userAgentData.getHighEntropyValues()", ua);
      }

    } else {
      ua = navigator.userAgent;
      console.info("navigator.userAgent=%s", ua);
    }
  }

  browserData();
  colorInit();

});
