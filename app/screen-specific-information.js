System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ScreenSpecificInformation;
    return {
        setters:[],
        execute: function() {
            // Contains all the screen specific information shown in the main-frame (border)
            // of the screen.
            ScreenSpecificInformation = (function () {
                function ScreenSpecificInformation(title, /* Title to show in the top of the screen */ address, /* Address to show in the sidebar */ telephoneNumber) {
                    if (title === void 0) { title = ""; }
                    if (address === void 0) { address = ""; }
                    if (telephoneNumber === void 0) { telephoneNumber = ""; }
                    this.title = title;
                    this.address = address;
                    this.telephoneNumber = telephoneNumber;
                }
                return ScreenSpecificInformation;
            }());
            exports_1("ScreenSpecificInformation", ScreenSpecificInformation);
        }
    }
});
//# sourceMappingURL=screen-specific-information.js.map