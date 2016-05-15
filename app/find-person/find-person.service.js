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
        var _this = this;
        var people = [];
        var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
        this.http.get(url + searchterm)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            res.result.forEach(function (item) {
                var person = new person_1.Person(item.given_name, item.family_name, item.email_address, item.kthid, item.phonehr, item.visiting_address, item.username, item.title_sv, undefined, /* Need to fetch the image url */ undefined, /* Need to fetch working place */ undefined, /* Need to fetch kth profile */ undefined, /* Need to scrape the 'about me' section */ undefined, undefined, undefined, undefined);
                _this.fetchAdditionalInfo(person); // Profile info is divided into two APIs.
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
                _this.fetchAdditionalInfo(person); // Profile info is divided into two APIs.
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
                            _this.fetchAdditionalInfo(person); // Profile info is divided into two APIs.
                            peopleAlsoInDep.push(person);
                        }
                    });
                }, function (error) { return onError(ErrorType.NoInternetConnection); }, function () {
                    onError(ErrorType.NoError);
                });
            }
            onError(ErrorType.NoError);
        });
        return peopleAlsoInDep;
    };
    // Fetches the persons image url from the API asscioated their kth id
    FindPersonService.prototype.fetchAdditionalInfo = function (person) {
        var _this = this;
        var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid;
        this.http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(function (item) {
            //console.log(item.image);
            person.image_url = item.image;
            person.working_place = item.worksFor[0].name;
            person.kth_profile = item.url;
            _this.fetchAboutMeInfo(person);
            _this.fetchStatus(person);
            _this.fetchPersonalDetails(person);
        }, function (error) { return null; }, function () { });
    };
    // Scrapes the Person's KTH profile 'About me' section from the internet.
    FindPersonService.prototype.fetchAboutMeInfo = function (person) {
        this.http.get(person.kth_profile).subscribe(function (resp) {
            var body = resp.text();
            var patt = new RegExp("<img.+>");
            body = body.replace(patt, ""); //Removes all img tags from body because this the img tags genereted a lot of errors in jquery .find.
            var about_me = jQuery(body).find(".description").text();
            person.about_me = about_me;
        }, function (error) { return null; });
    };
    //Fetches the availibility of employees
    FindPersonService.prototype.fetchStatus = function (person) {
        var url = "https://www.lan.kth.se/mobile/api/katalogjson?q=kthid:";
        this.http.get(url + person.kthid)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.result[0].intercepts !== undefined) {
                if (res.result[0].intercepts.length === 0) {
                    person.status_image = "https://www.lan.kth.se/sip/lur15.png";
                }
                else {
                    person.status_image = "https://www.lan.kth.se/sip/lur14.png";
                    person.status_info = res.result[0].intercepts[0];
                }
            }
            else {
                person.status_image = null;
            }
        }, function (error) { return null; });
    };
    //Fetches employee room number and phone number from KTH Places personal details API.
    FindPersonService.prototype.fetchPersonalDetails = function (person) {
        var url = "https://www.lan.kth.se/personal/api/personaldetails?kthid=";
        this.http.get(url + person.kthid)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.result[0].result[0] !== undefined) {
                person.phone_number2 = res.result[0].result[0].telno;
                person.room = res.result[0].result[0].room;
            }
        }, function (error) { return null; });
    };
    FindPersonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FindPersonService);
    return FindPersonService;
}());
exports.FindPersonService = FindPersonService;
//# sourceMappingURL=find-person.service.js.map