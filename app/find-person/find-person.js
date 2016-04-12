System.register(['angular2/core', 'angular2/common', './find-person.service', './person-profile'], function(exports_1, context_1) {
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
    var core_1, common_1, find_person_service_1, person_profile_1;
    var FindPerson;
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
            function (person_profile_1_1) {
                person_profile_1 = person_profile_1_1;
            }],
        execute: function() {
            FindPerson = (function () {
                function FindPerson(findPersonService) {
                    this.findPersonService = findPersonService;
                    // Default search values
                    this.organisation = "org:DAS";
                    this.orgName = "CSC";
                    this.currentSearch = "";
                    this.isOn = false;
                    this.isDisabled = false;
                    this.people = []; // Holds all the persons fetched from the API
                }
                FindPerson.prototype.toggle = function (newState, person) {
                    this.currentPerson = person;
                    if (!this.isDisabled) {
                        this.isOn = newState;
                    }
                };
                FindPerson.prototype.getPeople = function (searchterm) {
                    this.people = this.findPersonService.fetchPeople(searchterm);
                };
                // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
                FindPerson.prototype.getTitle = function (title) {
                    return title.charAt(0) + title.substr(1).toLowerCase();
                };
                FindPerson.prototype.ngOnInit = function () {
                    this.getPeople(this.organisation);
                };
                FindPerson.prototype.search = function (input) {
                    if (input == undefined) {
                        this.getPeople(this.organisation);
                        this.currentSearch = "";
                    }
                    else if (input.trim().length == 0) {
                        this.getPeople(this.organisation);
                        this.currentSearch = "";
                    }
                    else {
                        input = input.trim();
                        this.currentSearch = "\"" + input + "\"";
                        this.getPeople(input);
                    }
                };
                FindPerson = __decorate([
                    core_1.Component({
                        selector: 'find-person',
                        templateUrl: 'app/find-person/find-person.html',
                        directives: [common_1.NgClass, person_profile_1.PersonProfile],
                        providers: [find_person_service_1.FindPersonService]
                    }), 
                    __metadata('design:paramtypes', [find_person_service_1.FindPersonService])
                ], FindPerson);
                return FindPerson;
            }());
            exports_1("FindPerson", FindPerson);
        }
    }
});
//# sourceMappingURL=find-person.js.map