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
var common_1 = require('@angular/common');
var find_person_service_1 = require('./find-person.service');
var router_1 = require('@angular/router');
var PersonProfile = (function () {
    function PersonProfile(findPersonService, router) {
        this.findPersonService = findPersonService;
        this.router = router;
    }
    // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
    PersonProfile.prototype.getTitle = function (title) {
        if (title != undefined) {
            return title.charAt(0) + title.substr(1).toLowerCase();
        }
    };
    PersonProfile.prototype.navigate = function () {
        this.router.navigate(['/map'], { queryParams: {
                givenName: this.person.given_name,
                familyName: this.person.family_name,
                address: this.person.visiting_address,
                room: this.person.roo
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PersonProfile.prototype, "person", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PersonProfile.prototype, "isOn", void 0);
    PersonProfile = __decorate([
        core_1.Component({
            selector: 'person-profile',
            templateUrl: 'app/find-person/person-profile.html',
            directives: [common_1.NgClass],
            providers: [find_person_service_1.FindPersonService]
        }), 
        __metadata('design:paramtypes', [find_person_service_1.FindPersonService, router_1.Router])
    ], PersonProfile);
    return PersonProfile;
}());
exports.PersonProfile = PersonProfile;
//# sourceMappingURL=person-profile.js.map