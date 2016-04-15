System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Person;
    return {
        setters:[],
        execute: function() {
            // Represents a real life person working at KTH
            Person = (function () {
                function Person(given_name, family_name, email, kthid, phone_number, visiting_address, username, title, image_url, working_place, kth_profile, about_me) {
                    this.given_name = given_name;
                    this.family_name = family_name;
                    this.email = email;
                    this.kthid = kthid;
                    this.phone_number = phone_number;
                    this.visiting_address = visiting_address;
                    this.username = username;
                    this.title = title;
                    this.image_url = image_url;
                    this.working_place = working_place;
                    this.kth_profile = kth_profile;
                    this.about_me = about_me;
                }
                return Person;
            }());
            exports_1("Person", Person);
        }
    }
});
//# sourceMappingURL=person.js.map