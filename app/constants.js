"use strict";
// Contains application wide constants
var Constants = (function () {
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
exports.Constants = Constants;
// All KTH schools and there shorthand notation coupled with their name.
var School = (function () {
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
exports.School = School;
//# sourceMappingURL=constants.js.map