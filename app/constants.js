System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Constants;
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
        }
    }
});
//# sourceMappingURL=constants.js.map