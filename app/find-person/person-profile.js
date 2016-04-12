System.register(['angular2/core', 'angular2/common', './find-person.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, common_1, find_person_service_1, router_1;
    var PersonProfile;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (find_person_service_1_1) {
                find_person_service_1 = find_person_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PersonProfile = (function () {
                function PersonProfile(findPersonService) {
                    this.findPersonService = findPersonService;
                    this.isOn = false;
                }
                PersonProfile.prototype.toggle = function (newState) {
                    this.isOn = newState;
                };
                // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
                PersonProfile.prototype.getTitle = function (title) {
                    if (title != undefined) {
                        return title.charAt(0) + title.substr(1).toLowerCase();
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PersonProfile.prototype, "person", void 0);
                PersonProfile = __decorate([
                    core_1.Component({
                        selector: 'person-profile',
                        templateUrl: 'app/find-person/person-profile.html',
                        directives: [common_1.NgClass, router_1.RouterLink],
                        providers: [find_person_service_1.FindPersonService]
                    }), 
                    __metadata('design:paramtypes', [find_person_service_1.FindPersonService])
                ], PersonProfile);
                return PersonProfile;
            }());
            exports_1("PersonProfile", PersonProfile);
        }
    }
});
//# sourceMappingURL=person-profile.js.map