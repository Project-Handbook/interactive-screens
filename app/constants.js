System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Constants, School;
    return {
        setters:[],
        execute: function() {
            // Contains application wide constants
            Constants = (function () {
                function Constants() {
                }
                Object.defineProperty(Constants, "SETUP_PROCESS_KEY", {
                    // Constant key for the ScreenSpecificInformation object in sessionStorage
                    get: function () { return "ScreenSpecificInformation"; },
                    enumerable: true,
                    configurable: true
                });
                return Constants;
            }());
            exports_1("Constants", Constants);
            // All KTH schools and there shorthand notation coupled with their name.
            School = (function () {
                function School() {
                }
                // School constants
                School.ABE = "SKOLAN FÖR ARKITEKTUR OCH SAMHÄLLSBYGGNAD";
                School.BIO = "SKOLAN FÖR BIOTEKNOLOGI";
                School.CSC = "SKOLAN FÖR DATAVETENSKAP OCH KOMMUNIKATION";
                School.EES = "SKOLAN FÖR ELEKTRO OCH SYSTEMTEKNIK";
                School.ITM = "SKOLAN FÖR INDUSTRIELL TEKNIK OCH MANAGEMENT";
                School.ICT = "SKOLAN FÖR INFORMATIONS- OCH KOMMUNIKATIONSTEKNIK";
                School.CHE = "SKOLAN FÖR KEMIVETENSKAP";
                School.STH = "SKOLAN FÖR TEKNIK OCH HÄLSA";
                School.SCI = "SKOLAN FÖR TEKNIKVETENSKAP";
                School.ECE = "SKOLAN FÖR TEKNIKVETENSKAPLIG KOMMUNIKATION O LÄRANDE";
                return School;
            }());
            exports_1("School", School);
        }
    }
});
//# sourceMappingURL=constants.js.map