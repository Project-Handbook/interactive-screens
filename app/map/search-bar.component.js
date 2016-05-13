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
var map_service_1 = require('./services/map-service');
var location_interface_1 = require('./location.interface');
var common_1 = require('@angular/common');
require('rxjs/add/operator/map');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var SearchBarComponent = (function () {
    function SearchBarComponent(_mapService, myElement) {
        var _this = this;
        this._mapService = _mapService;
        // Used for passing the selected argument from the dropdown menu to the map component
        this.newLocation = new core_1.EventEmitter();
        //Used for displaying errors if any of the http rquests fails
        this.showErrorMessage = false;
        // Holds all results returned by the http requests
        this.searchResult = [];
        // Boolean values that keeps track of which button is currently pressed
        this.searchForLocation = true;
        this.searchForAddress = false;
        this.showSearchField = true;
        //Holds the string that will be displayed in the search field if there is no user input.
        this.search_bar_placeholder = "Search for a location...";
        // Holds an Observable that is subscribed to inside the constructor. Keeps track if the user is typing in the search field
        this.term = new common_1.Control();
        //If no adress is found by google geocord api then an error shall be presented on the screen.
        this.no_address_found = false;
        this.buttonColors = ["#2E7CC0", "#8c8c93", "#8c8c93"];
        this.schools = [];
        this.departmentsColumns = [];
        //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
        this.elementRef = myElement;
        this.term.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(function (item) {
            var regex = new RegExp('^[\\w\\d\\säöåÄÖÅ]+:?[\\w\\d\\säöåÄÖÅ]*$', 'i');
            if (item.toString().length > 1 && regex.test(item.toString())) {
                if (_this.searchForLocation === true) {
                    _this._mapService.getPlaces(item.toString()).subscribe(function (res) { _this.searchResult = res; }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                }
                else {
                    //Replacing ä,å,ö with a's and o's. googleapis works better without swedish charachters.
                    var location_type = _this.searchForAddress === true ? location_interface_1.Location_type.street_address : location_interface_1.Location_type.department;
                    var term = item.toString().replace(/ä|å/ig, 'a').replace(/ö/ig, 'o');
                    _this._mapService.getGeoCode(term, location_type).subscribe(function (res) { _this.searchResult = res; }, function (error) { _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                }
            }
            else {
                _this.searchResult = [];
            }
        });
    }
    //Send the selected location to map component.
    SearchBarComponent.prototype.select = function (location) {
        var _this = this;
        this.term.updateValue(""); //Reset search field
        //Locations that is not fetched from KTH Places hasnt got coordinates but an address.
        //Those locations has to be sent to googleapis in order to recieve coordinates.
        if (location.latitude !== undefined && location.longitude !== undefined) {
            this.newLocation.emit(location); // Send selected location to output
        }
        else {
            var location_type = this.searchForAddress === true ? location_interface_1.Location_type.street_address : location_interface_1.Location_type.department;
            this._mapService.getGeoCode(location.streetAddress, location_type).subscribe(function (res) {
                if (res.length !== 0) {
                    res[0].buildingName = location.buildingName;
                    _this.newLocation.emit(res[0]);
                }
                else {
                    _this.no_address_found = true;
                    setTimeout(function () { _this.no_address_found = false; }, 3000);
                    _this.newLocation.emit(undefined);
                }
            }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
        }
        this.resetDropDownMenus();
    };
    //This funtion determines if the user clicks outside the dropdown menu. If this is the case
    // the searchresult array will be cleared and the dropdown will disappear.
    SearchBarComponent.prototype.handleClick = function (event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        //If drop down wrapper is pushed then clear dropdown.
        if (document.querySelector(".departments_drop_down") === event.target
            || document.querySelector(".component_wrapper") === event.target) {
            inside = false;
            console.log("hej");
        }
        ;
        if (!inside) {
            if (this.searchForLocation === true) {
                this.updateButtons(0);
            }
            else {
                this.updateButtons(1);
            }
            this.showSearchField = true;
            this.resetDropDownMenus();
            this.searchResult = [];
        }
    };
    SearchBarComponent.prototype.buttonPush = function (value) {
        if (value === 0) {
            this.searchForLocation = true;
            this.searchForAddress = false;
            this.showSearchField = true;
            this.search_bar_placeholder = "Search for a location...";
            this.resetDropDownMenus();
        }
        else if (value === 1) {
            this.searchForLocation = false;
            this.searchForAddress = true;
            this.showSearchField = true;
            this.search_bar_placeholder = "Search for an address...";
            this.resetDropDownMenus();
        }
        else if (value === 2) {
            this.showSearchField = false;
        }
        this.searchResult = [];
        this.term.updateValue("");
        this.updateButtons(value);
    };
    SearchBarComponent.prototype.updateButtons = function (value) {
        switch (value) {
            case 0:
                this.buttonColors[0] = "#2E7CC0";
                this.buttonColors[1] = "#8c8c93";
                this.buttonColors[2] = "#8c8c93";
                break;
            case 1:
                this.buttonColors[0] = "#8c8c93";
                this.buttonColors[1] = "#2E7CC0";
                this.buttonColors[2] = "#8c8c93";
                break;
            case 2:
                this.buttonColors[0] = "#8c8c93";
                this.buttonColors[1] = "#8c8c93";
                this.buttonColors[2] = "#2E7CC0";
                break;
            default:
                console.log("error");
                break;
        }
    };
    //Returns a list of all the schools listed in a local .json file
    SearchBarComponent.prototype.getSchools = function () {
        var _this = this;
        this._mapService.getSchools().subscribe(function (res) { return _this.schools = res; });
    };
    SearchBarComponent.prototype.getDepartments = function (department) {
        var _this = this;
        this._mapService.getDepartments(department).subscribe(function (res) {
            _this.departmentsColumns = [];
            switch (true) {
                case res.length > 51:
                    _this.departmentsColumns[0] = res.splice(0, 17);
                    _this.departmentsColumns[1] = res.splice(0, 17);
                    _this.departmentsColumns[2] = res.splice(0, 17);
                    _this.departmentsColumns[3] = res.splice(0, res.length);
                    break;
                case res.length > 34:
                    _this.departmentsColumns[0] = res.splice(0, 17);
                    _this.departmentsColumns[1] = res.splice(0, 17);
                    _this.departmentsColumns[2] = res.splice(0, res.length);
                    break;
                case res.length > 17:
                    _this.departmentsColumns[0] = res.splice(0, 17);
                    _this.departmentsColumns[1] = res.splice(0, res.length);
                    break;
                default:
                    _this.departmentsColumns[0] = res;
                    break;
            }
        }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
    };
    SearchBarComponent.prototype.resetDropDownMenus = function () {
        this.schools = [];
        this.departmentsColumns = [];
    };
    //used when search button is pressed
    SearchBarComponent.prototype.search = function () {
        if (this.searchResult.length !== 0) {
            this.select(this.searchResult[0]);
        }
    };
    SearchBarComponent = __decorate([
        core_1.Component({
            selector: 'auto-complete',
            host: {
                '(document:click)': 'handleClick($event)',
            },
            templateUrl: './app/map/html/search-bar.html',
            providers: [map_service_1.MapService],
            directives: [common_1.NgStyle],
            styleUrls: ['./app/map/styles/search-bar.min.css'],
            outputs: ['newLocation']
        }), 
        __metadata('design:paramtypes', [map_service_1.MapService, core_1.ElementRef])
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
//# sourceMappingURL=search-bar.component.js.map