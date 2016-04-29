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
                    var _this = this;
                    this.findPersonService = findPersonService;
                    this.state = "none";
                    // Default search values
                    this.organisation = "org:DAS";
                    this.orgName = "CSC";
                    this.currentSearch = "";
                    // Displaying error message if a search request would fail for any reason
                    this.showErrorMessage = false;
                    this.isOn = false;
                    this.isDisabled = false;
                    this.people = []; // Holds all the persons fetched from the API
                    // This is called whenever an event that might fail occurs.
                    // Ex) Internet/API is down.
                    this.onError = function (errorType) {
                        switch (errorType) {
                            case find_person_service_1.ErrorType.NoError:
                                _this.showErrorMessage = false;
                                break;
                            default:
                                _this.showErrorMessage = true;
                        }
                    };
                    this.rotation = "rotate(90deg)";
                    this.previous = "surname";
                }
                FindPerson.prototype.toggle = function (newState, person) {
                    this.currentPerson = person;
                    if (!this.isDisabled) {
                        this.isOn = newState;
                    }
                };
                FindPerson.prototype.getPeople = function (searchterm) {
                    this.people = this.findPersonService.fetchPeople(searchterm, this.onError);
                };
                // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
                FindPerson.prototype.getTitle = function (title) {
                    return title.charAt(0) + title.substr(1).toLowerCase();
                };
                //Displays people local to the department as default when the people tab is pushed.
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
                FindPerson.prototype.sort = function (input) {
                    var element = this.getElement(input);
                    if (this.previous != input) {
                        var prev = this.getElement(this.previous);
                        prev.style.transform = "rotate(90deg)";
                        prev.style.display = "none";
                        element.style.display = "block";
                        element.style.transform = "rotate(90deg)";
                        this.previous = input;
                        this.rotation = "rotate(90deg)";
                    }
                    else {
                        element.style.transform = this.rotation;
                        this.rotation = this.rotation == "rotate(-90deg)" ? "rotate(90deg)" : "rotate(-90deg)";
                    }
                    element.style.transform = this.rotation;
                    var rotation = this.rotation;
                    this.people.sort(function (a, b) {
                        if (input == "firstname") {
                            if (a.given_name < b.given_name)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.given_name > b.given_name)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            if (a.family_name < b.family_name)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.family_name > b.family_name)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            return 0; // Maybe sort by other parameter?
                        }
                        else if (input == "surname") {
                            if (a.family_name < b.family_name)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.family_name > b.family_name)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            return 0; // Maybe sort by other parameter?
                        }
                        else if (input == "email") {
                            if (a.email < b.email)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.email > b.email)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            if (a.family_name < b.family_name)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.family_name > b.family_name)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            return 0; // Maybe sort by other parameter?
                        }
                        else if (input == "phone") {
                            if (a.phone_number < b.phone_number)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.phone_number > b.phone_number)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            if (a.family_name < b.family_name)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.family_name > b.family_name)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            return 0; // Maybe sort by other parameter?
                        }
                        else if (input == "title") {
                            if (a.title < b.title)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.title > b.title)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            if (a.family_name < b.family_name)
                                return rotation == "rotate(90deg)" ? -1 : 1;
                            if (a.family_name > b.family_name)
                                return rotation == "rotate(90deg)" ? 1 : -1;
                            return 0; // Maybe sort by other parameter?
                        }
                    });
                };
                FindPerson.prototype.getElement = function (input) {
                    var element;
                    if (input == "firstname") {
                        element = document.getElementById("firstname");
                    }
                    else if (input == "surname") {
                        element = document.getElementById("surname");
                        ;
                    }
                    else if (input == "email") {
                        element = document.getElementById("email");
                    }
                    else if (input == "phone") {
                        element = document.getElementById("phone");
                    }
                    else if (input == "title") {
                        element = document.getElementById("title");
                    }
                    return element;
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