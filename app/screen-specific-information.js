System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ScreenSpecificInformation;
    return {
        setters:[],
        execute: function() {
            // Contains all the screen specific information. Used application wide.
            ScreenSpecificInformation = (function () {
                function ScreenSpecificInformation(title, /* Title to show in the top of the screen */ address, /* Address to show in the sidebar */ telephoneNumber, /* Telephone number in the sidebar */ telephone_deliveries, /* Telephone number for the delivery man */ postal_code, /* Postal code in the sidebar */ city, /* Nearest city shown in the sidebar */ departments, /* List of nearby departments */ nearest_department, /* Name of the department nearest the screen */ department_code, /* Department code for People tab default */ longitude, /* Coordinate for the sceen */ latitude) {
                    if (title === void 0) { title = ""; }
                    if (address === void 0) { address = ""; }
                    if (telephoneNumber === void 0) { telephoneNumber = ""; }
                    if (telephone_deliveries === void 0) { telephone_deliveries = ""; }
                    if (postal_code === void 0) { postal_code = ""; }
                    if (city === void 0) { city = ""; }
                    if (departments === void 0) { departments = []; }
                    if (nearest_department === void 0) { nearest_department = ""; }
                    if (department_code === void 0) { department_code = ""; }
                    if (longitude === void 0) { longitude = 0; }
                    if (latitude === void 0) { latitude = 0; }
                    this.title = title;
                    this.address = address;
                    this.telephoneNumber = telephoneNumber;
                    this.telephone_deliveries = telephone_deliveries;
                    this.postal_code = postal_code;
                    this.city = city;
                    this.departments = departments;
                    this.nearest_department = nearest_department;
                    this.department_code = department_code;
                    this.longitude = longitude;
                    this.latitude = latitude;
                }
                return ScreenSpecificInformation;
            }());
            exports_1("ScreenSpecificInformation", ScreenSpecificInformation);
        }
    }
});
//# sourceMappingURL=screen-specific-information.js.map