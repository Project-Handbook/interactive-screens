"use strict";
// Represents a real life person working at KTH
var Person = (function () {
    function Person(given_name, family_name, email, kthid, phone_number, visiting_address, username, title, image_url, working_place, kth_profile, about_me, status_image, status_info, room, phone_number2) {
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
        this.status_image = status_image;
        this.status_info = status_info;
        this.room = room;
        this.phone_number2 = phone_number2;
    }
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=person.js.map