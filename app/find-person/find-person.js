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
var person_profile_1 = require('./person-profile');
var map_service_1 = require('../map/services/map-service');
var screen_specific_information_1 = require('../screen-specific-information');
var constants_1 = require('../constants');
var FindPerson = (function () {
    function FindPerson(findPersonService, _mapService) {
        var _this = this;
        this.findPersonService = findPersonService;
        this._mapService = _mapService;
        this.state = "none";
        this.currentPerson = null;
        // Default search values
        this.currentSearch = "";
        this.currentPrefix = "";
        this.selectedSchool = "";
        this.currentSchool = "";
        // Displaying error message if a search request would fail for any reason
        this.showErrorMessage = false;
        this.isOn = false;
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
        this.deps = [];
        this.schools = [];
    }
    // This will find all people within the standard department
    FindPerson.prototype.getPeople = function (searchterm) {
        this.people = this.findPersonService.fetchPeople(searchterm, this.onError);
    };
    // This will find all people within the chosen department
    FindPerson.prototype.getPeople2 = function (searchterm) {
        this.people = this.findPersonService.fetchPeople2(searchterm, this.currentPrefix, this.onError);
    };
    // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
    FindPerson.prototype.getTitle = function (title) {
        return title.charAt(0) + title.substr(1).toLowerCase();
    };
    //Displays people local to the department as default when the people tab is pushed.
    FindPerson.prototype.ngOnInit = function () {
        //Fetches department code and name from local storage.
        var screenInfo = new screen_specific_information_1.ScreenSpecificInformation();
        screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
        this.currentPrefix = "org:" + screenInfo.department_code;
        this.selectedSchool = screenInfo.department_name;
        this.currentSchool = screenInfo.department_name;
        this.getPeople(this.currentPrefix);
        this.getSchools();
    };
    FindPerson.prototype.search = function (input) {
        this.currentSchool = this.selectedSchool;
        if (input == undefined) {
            this.getPeople(this.currentPrefix);
            this.currentSearch = "";
        }
        else if (input.trim().length == 0) {
            this.getPeople(this.currentPrefix);
            this.currentSearch = "";
        }
        else {
            input = input.trim();
            this.currentSearch = "\"" + input + "\"";
            this.getPeople2(input);
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
    FindPerson.prototype.scrollDep = function (dir) {
        var departments = document.getElementById("departments");
        var newScroll = departments.scrollTop + (departments.offsetHeight - 55) * dir;
        this.scrollTo(departments, newScroll, 5000);
    };
    FindPerson.prototype.scrollTo = function (element, to, duration) {
        $("#departments").animate({
            scrollTop: to
        }, 300);
        return false;
    };
    //This funtion determines if the user clicks outside the dropdown menu. If this is the case
    // the searchresult array will be cleared and the dropdown will disappear.
    FindPerson.prototype.handleClick = function (event) {
        this.handleClickForPopup(event);
        var clickedComponent = event.target;
        var schoolsDiv = document.getElementById('schools-wrapper');
        var schoolsBtn = document.getElementById('person-search-schools');
        do {
            if (clickedComponent === schoolsBtn) {
                this.toggleSchools();
                return;
            }
            if (clickedComponent === schoolsDiv) {
                return;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        schoolsDiv.style.display = "none";
        this.deps = [];
    };
    FindPerson.prototype.handleClickForPopup = function (event) {
        var clickedComponent = event.target;
        var popupContent = document.getElementById('popup-content');
        var personTable = document.getElementById('person-table-body');
        do {
            if (clickedComponent === personTable) {
                this.isOn = true;
                return;
            }
            if (clickedComponent === popupContent) {
                return;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        this.isOn = false;
    };
    FindPerson.prototype.toggleSchools = function () {
        var w = document.getElementById('schools-wrapper');
        w.style.display = w.style.display == "table" ? "none" : "table";
        this.deps = [];
    };
    FindPerson.prototype.getSchools = function () {
        var _this = this;
        this.schools = [];
        this._mapService.getSchools().subscribe(function (res) {
            _this.schools = res;
            // Add KTH as the first element should one just want
            // to search with that
            var code = "code";
            var school = "school";
            var a = {};
            a[code] = "";
            a[school] = "KTH";
            _this.schools.unshift(a);
        });
    };
    FindPerson.prototype.getDep = function (item) {
        var _this = this;
        if (item.school == "KTH") {
            // We want to search all of KTH
            var code = "code";
            var name = "name_sv";
            var a = {};
            a[code] = "KTH";
            a[name] = "KTH";
            this.setDep(a);
            return;
        }
        this.deps = [];
        this._mapService.getDepartments(item.code).subscribe(function (res) {
            _this.deps = res;
            // Add the school as the first element should one just want
            // to search with that
            var code = "code";
            var name = "name_sv";
            var a = {};
            a[code] = item.code;
            a[name] = item.school;
            _this.deps.unshift(a);
        });
    };
    FindPerson.prototype.setDep = function (dep) {
        this.selectedSchool = dep.name_sv;
        this.currentPrefix = "org:" + dep.code;
        this.deps = [];
        this.toggleSchools();
    };
    FindPerson.prototype.setPerson = function (p) {
        this.currentPerson = p;
    };
    FindPerson = __decorate([
        core_1.Component({
            host: {
                '(document:click)': 'handleClick($event)',
            },
            selector: 'find-person',
            templateUrl: 'app/find-person/find-person.html',
            directives: [common_1.NgClass, person_profile_1.PersonProfile],
            providers: [find_person_service_1.FindPersonService, map_service_1.MapService]
        }), 
        __metadata('design:paramtypes', [find_person_service_1.FindPersonService, map_service_1.MapService])
    ], FindPerson);
    return FindPerson;
}());
exports.FindPerson = FindPerson;
//# sourceMappingURL=find-person.js.map