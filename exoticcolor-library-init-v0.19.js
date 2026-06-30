/* exoticcolor-library-init.js
"Version 0.19&#10;2026-06-30T17:00&#10;"
Änderung 2021-11-07 hjt1946:
Hier sind nur allgemeine Hilfsfunktionen enthalten.
Diese wurden aus ‚./exoticcolor-library-test-v0.17.js‛ und ‚./exoticcolor-library-v0.17.js‛ hierher verschoben.
Änderung 2026-06-30 hjt1946: Mit Sublime neu eingerückt, Version angepasst.
IE vollständig entfernt.
*/

let HASSTORAGE = false;
const O = {
  name: "O",
  eclr: null, // 
  isError: 0, // 0: ok, ≥1: error
  isWarn: 0, // 0: ok, ≥1: warning (todo)
  errorValue: null, // Value over text inputs, init by colorInit()
  errorMsg: null, // Message over text inputs, init by colorInit()
  errorString: "", // String for errorMsg
  topMsgF: null, // Autoinit to topMsg() Meldungsausgabe in Arbeit
  clearErrorF: null, // Autoinit to clearError()
  noStorage: -1, // 0|1: if browser has Storage API
};
// FF nicht, Chromium 92, Chromium 95, Edge 95
async function isMacAsync() {
  if ( navigator.userAgentData ) {
    const ua = await navigator.userAgentData.getHighEntropyValues(["platform"]);
    console.info("ua.platform='%s'", ua.platform, ua.platform);
    return ua.platform === "macOS";
  }
}

async function browserData() {
  // FF allow this only over https

  if ("userAgentData" in navigator) {
    console.info("browserData: navigator.userAgentData.brands: %s ", navigator.userAgentData.brands, navigator.userAgentData.brands);


    const ua = await navigator.userAgentData.getHighEntropyValues( ["architecture", "brands", "mobile", "model", "platform", "platformVersion", "uaFullVersion"]);
    if (ua) {
      console.info("browserData: navigator.userAgentData.getHighEntropyValues()", ua);
    }

  } else {
    const ua = navigator.userAgent;
    console.info("navigator.userAgent=%s", ua);
  }
}

function testLocalStorage() {
  const msg = "No Storage available.";
  
  // 1. Schnelle Rückgabe, falls der Status bereits bekannt ist
  if (1 === O.noStorage) return true;
  if (0 === O.noStorage) return false;

  try {
    // 2. Ein Test-Schreiben und -Löschen simuliert den Echtzugriff
    const storage = window.localStorage;
    const testKey = "__storage_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    
    // Test erfolgreich: Storage ist aktiv und nutzbar
    O.noStorage = 1;
    return true;
  } catch (e) {
    // 3. Greift, wenn der private Modus oder Cookie-Sperren den Zugriff blockieren
    O.noStorage = 0;
    O.isError++;
    O.errorString = msg;
    
    console.error("Storage-Zugriff blockiert (z.B. Privater Modus). %s", msg);
    if (O.topMsgF !== null) { O.topMsgF(msg); }
    
    return false;
  }
}

/*  ******************************** */

isMacAsync();
browserData();
testLocalStorage();
