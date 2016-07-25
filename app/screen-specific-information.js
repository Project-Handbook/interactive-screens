"use strict";
// Contains all the screen specific information. Used application wide.
var ScreenSpecificInformation = (function () {
    function ScreenSpecificInformation(title, /* Title to show in the top of the screen */ address, /* Address to show in the sidebar */ telephoneNumber, /* Telephone number in the sidebar */ telephone_deliveries, /* Telephone number for the delivery man */ postal_code, /* Postal code in the sidebar */ city, /* Nearest city shown in the sidebar */ departments, /* List of nearby departments */ nearest_department, /* Name of the department nearest the screen */ school, /* Department code for People tab default */ department, /*Department name for People tab default */ longitude, /* Coordinate for the sceen */ latitude, /* Coordinate for the screen  */ 
        // The first seven of the Date tuples will be interpreted as one opening,
        // one closing date per day in a seven day week, all other values will be ignored.
        // The dates hours and minutes are only used, all other time measure will be ignored.
        // Example) opening_hours["monday"][1] would be the closing hour on monday, and so on
        // opening_hours["thursday"][2] = false says that on thursday it's closed.
        opening_hours, /* opening hours */ opening_hours_enabled, /* Whether or not the opening hours should be displayed or not */ calendar_polypoly_id, /*Polypoly id to fetch calendar in home tab*/ news_feed_polypoly_id /*Polypoly id to fetch news feed in home tab*/) {
        if (title === void 0) { title = ""; }
        if (address === void 0) { address = ""; }
        if (telephoneNumber === void 0) { telephoneNumber = ""; }
        if (telephone_deliveries === void 0) { telephone_deliveries = ""; }
        if (postal_code === void 0) { postal_code = ""; }
        if (city === void 0) { city = ""; }
        if (departments === void 0) { departments = []; }
        if (nearest_department === void 0) { nearest_department = ""; }
        if (school === void 0) { school = {}; }
        if (department === void 0) { department = {}; }
        if (longitude === void 0) { longitude = 0; }
        if (latitude === void 0) { latitude = 0; }
        if (opening_hours === void 0) { opening_hours = opening_hours_defaults; }
        if (opening_hours_enabled === void 0) { opening_hours_enabled = false; }
        if (calendar_polypoly_id === void 0) { calendar_polypoly_id = ""; }
        if (news_feed_polypoly_id === void 0) { news_feed_polypoly_id = ""; }
        this.title = title;
        this.address = address;
        this.telephoneNumber = telephoneNumber;
        this.telephone_deliveries = telephone_deliveries;
        this.postal_code = postal_code;
        this.city = city;
        this.departments = departments;
        this.nearest_department = nearest_department;
        this.school = school;
        this.department = department;
        this.longitude = longitude;
        this.latitude = latitude;
        this.opening_hours = opening_hours;
        this.opening_hours_enabled = opening_hours_enabled;
        this.calendar_polypoly_id = calendar_polypoly_id;
        this.news_feed_polypoly_id = news_feed_polypoly_id;
    }
    return ScreenSpecificInformation;
}());
exports.ScreenSpecificInformation = ScreenSpecificInformation;
var opening_hours_defaults = { 'monday': ['09:00', '17:00', true],
    'tuesday': ['09:00', '17:00', true],
    'wednesday': ['09:00', '17:00', true],
    'thursday': ['09:00', '17:00', true],
    'friday': ['09:00', '17:00', true],
    'saturday': ['09:00', '17:00', true],
    'sunday': ['09:00', '17:00', true] };
//# sourceMappingURL=screen-specific-information.js.map