"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var person_1 = require('./person');
// ErrorType describes what kind of error has occured
(function (ErrorType) {
    ErrorType[ErrorType["NoError"] = 0] = "NoError";
    ErrorType[ErrorType["NoResults"] = 1] = "NoResults";
    ErrorType[ErrorType["NoInternetConnection"] = 2] = "NoInternetConnection";
})(exports.ErrorType || (exports.ErrorType = {}));
var ErrorType = exports.ErrorType;
var FindPersonService = (function () {
    function FindPersonService(http) {
        this.http = http;
    }
    // Fetches all the people matching the searchterm from KTH Profiles
    FindPersonService.prototype.fetchPeople = function (searchterm, onError) {
        var people = [];
        var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
        this.http.get(url + searchterm)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            res.result.forEach(function (item) {
                var person = new person_1.Person(item.given_name, item.family_name, item.email_address, item.kthid, item.phonehr, item.visiting_address, item.username, item.title_sv, undefined, /* Need to fetch the image url */ undefined, /* Need to fetch working place */ undefined, /* Need to fetch kth profile */ undefined, /* Need to scrape the 'about me' section */ undefined, undefined, undefined, undefined);
                //this.fetchAdditionalInfo(person) // Profile info is divided into two APIs.
                //this.fetchStatus(person);
                people.push(person);
            });
        }, function (error) { return onError(ErrorType.NoInternetConnection); }, function () { return onError(ErrorType.NoError); });
        return people;
    };
    // Fetches all the people matching the searchterm from KTH Profiles
    // This function will also make sure they are from a certain department
    // This function makes two calls to the same API, once based on the name
    // and once based on the department, it then compares the results and returns
    // the shared elements.
    // NOTE: Due to lack of time this function makes an extra unnecessary call
    // and fetches the image-link for every person a second time.
    FindPersonService.prototype.fetchPeople2 = function (searchterm, prefix, onError) {
        var _this = this;
        var people = [];
        var peopleAlsoInDep = [];
        var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
        this.http.get(url + searchterm)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            res.result.forEach(function (item) {
                var person = new person_1.Person(item.given_name, item.family_name, item.email_address, item.kthid, item.phonehr, item.visiting_address, item.username, item.title_sv, undefined, /* Need to fetch the image url */ undefined, /* Need to fetch working place */ undefined, /* Need to fetch kth profile */ undefined, /* Need to scrape the 'about me' section */ undefined, undefined, undefined, undefined);
                people.push(person);
            });
        }, function (error) { return onError(ErrorType.NoInternetConnection); }, function () {
            // We've fetched all persons based on the search-string.
            // Let's fetch all persons based on the department and
            // then compare the results.
            if (prefix == "org:KTH") {
                people.forEach(function (item) {
                    peopleAlsoInDep.push(item);
                });
            }
            else {
                _this.http.get(url + prefix)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    res.result.forEach(function (item) {
                        if (people.some(function (e) { return e.kthid == item.kthid; })) {
                            // Person was also found in the department, add to list
                            var person = new person_1.Person(item.given_name, item.family_name, item.email_address, item.kthid, item.phonehr, item.visiting_address, item.username, item.title_sv, undefined, /* Need to fetch the image url */ undefined, /* Need to fetch working place */ undefined, /* Need to fetch kth profile */ undefined, /* Need to scrape the 'about me' section */ undefined, undefined, undefined, undefined);
                            peopleAlsoInDep.push(person);
                        }
                    });
                }, function (error) { return onError(ErrorType.NoInternetConnection); }, function () { return onError(ErrorType.NoError); });
            }
            onError(ErrorType.NoError);
        });
        return peopleAlsoInDep;
    };
    // Fetches the persons image url from the API asscioated their kth id
    FindPersonService.prototype.fetchAdditionalInfo = function (person, callback, self) {
        var _this = this;
        var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid;
        this.http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (item) {
            person.image_url = item.image;
            person.working_place = item.worksFor[0].name;
            person.kth_profile = item.url;
            _this.fetchStatus(person, callback, self);
            _this.fetchAboutMeInfo(person, callback, self);
            _this.fetchPersonalDetails(person, callback, self);
        }, function (error) { return callback(self, new Error("Error retrieving profile image")); }, function () { callback(self); });
    };
    // Scrapes the Person's KTH profile 'About me' section from the internet.
    FindPersonService.prototype.fetchAboutMeInfo = function (person, callback, self) {
        this.http.get(person.kth_profile).subscribe(function (resp) {
            var body = resp.text();
            var patt = new RegExp("<img.+>");
            body = body.replace(patt, ""); //Removes all img tags from body because this the img tags genereted a lot of errors in jquery .find.
            var about_me = jQuery(body).find(".description").text();
            person.about_me = about_me;
        }, function (error) { return callback(self, new Error("Error retrieving about me text")); }, function () { return callback(self); });
    };
    // Fetches the availibility of employees
    FindPersonService.prototype.fetchStatus = function (person, callback, self) {
        var url = "https://www.lan.kth.se/mobile/api/katalogjson?q=kthid:";
        this.http.get(url + person.kthid)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.result[0].intercepts !== undefined) {
                if (res.result[0].intercepts.length === 0) {
                    person.status_image = "app/find-person/images/availible.png";
                }
                else {
                    person.status_image = "app/find-person/images/unavailible.png";
                    person.status_info = res.result[0].intercepts[0];
                }
            }
            else {
                person.status_image = null;
            }
        }, function (error) { return callback(self, new Error("Error retrieving status")); }, function () { return callback(self); });
    };
    // Fetches employee room number and phone number from KTH Places personal details API.
    FindPersonService.prototype.fetchPersonalDetails = function (person, callback, self) {
        var url = "https://www.lan.kth.se/personal/api/personaldetails?kthid=";
        this.http.get(url + person.kthid)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.result[0].result[0] !== undefined) {
                person.phone_number2 = res.result[0].result[0].telno;
                person.room = res.result[0].result[0].room;
            }
        }, function (error) { return callback(self, new Error("Error retrieving personal details")); }, function () { return callback(self); });
    };
    FindPersonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FindPersonService);
    return FindPersonService;
}());
exports.FindPersonService = FindPersonService;
//# sourceMappingURL=find-person.service.js.map