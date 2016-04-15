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
                function ScreenSpecificInformation(title, /* Title to show in the top of the screen */ address, /* Address to show in the sidebar */ telephoneNumber, /* Telephone nuber in the sidebar */ postal_code, /* Postal code in the sidebar */ city, /* Nearest city shown in the sidebar */ departments, /* List of nearby departments */ nearest_department) {
                    if (title === void 0) { title = ""; }
                    if (address === void 0) { address = ""; }
                    if (telephoneNumber === void 0) { telephoneNumber = ""; }
                    if (postal_code === void 0) { postal_code = ""; }
                    if (city === void 0) { city = ""; }
                    if (departments === void 0) { departments = []; }
                    if (nearest_department === void 0) { nearest_department = ""; }
                    this.title = title;
                    this.address = address;
                    this.telephoneNumber = telephoneNumber;
                    this.postal_code = postal_code;
                    this.city = city;
                    this.departments = departments;
                    this.nearest_department = nearest_department;
                }
                return ScreenSpecificInformation;
            }());
            exports_1("ScreenSpecificInformation", ScreenSpecificInformation);
        }
    }
});
//# sourceMappingURL=screen-specific-information.js.map