System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map', './person'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, person_1;
    var FindPersonService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (person_1_1) {
                person_1 = person_1_1;
            }],
        execute: function() {
            FindPersonService = (function () {
                function FindPersonService(http) {
                    this.http = http;
                }
                // Fetches all the people matching the searchterm from KTH Profiles
                FindPersonService.prototype.fetchPeople = function (searchterm) {
                    var _this = this;
                    var people = [];
                    var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
                    this.http.get(url + searchterm)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        res.result.forEach(function (item) {
                            var person = new person_1.Person(item.given_name, item.family_name, item.email_address, item.kthid, item.phonehr, item.visiting_address, item.username, item.title_sv, item.image_url);
                            _this.fetchImage(person);
                            people.push(person);
                        });
                    }, function (error) { return console.log(error); }, function () { });
                    return people;
                };
                // Fetches the persons image url from the API asscioated their kth id
                FindPersonService.prototype.fetchImage = function (person) {
                    var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid + "/image";
                    this.http.get(url)
                        .map(function (res) { return res.text(); })
                        .subscribe(function (image_url) {
                        person.image_url = image_url.substr(1, image_url.length - 2);
                    }, function (error) { return console.log(error); }, function () { });
                };
                FindPersonService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], FindPersonService);
                return FindPersonService;
            }());
            exports_1("FindPersonService", FindPersonService);
        }
    }
});
//# sourceMappingURL=find-person.service.js.map