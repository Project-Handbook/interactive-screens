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
var router_1 = require('@angular/router');
var constants_1 = require('../constants');
var screen_specific_information_1 = require('../screen-specific-information');
var common_1 = require('@angular/common');
var map_service_1 = require('../map/services/map-service');
var SetupProcess = (function () {
    function SetupProcess(router, mapService) {
        this.router = router;
        this.mapService = mapService;
        // Localstorage configuration object
        this.screenInfo = new screen_specific_information_1.ScreenSpecificInformation();
        // Input - need to add this the the list
        this.newDepartment = "";
        // List of user created departments
        this.departments = [];
        // Holds all schools fetched from getSchools.
        this.schools = [];
        // Holds all departments from getDepartments.
        this.department_list = [];
        // Hash keys for screenInfo.opening_hours
        this.weekdays = ['monday', 'tuesday', 'wednesday', 'thursday',
            'friday', 'saturday', 'sunday'];
    }
    // Stores the ScreenSpecificInformation object and navigates to /home.
    SetupProcess.prototype.saveInformation = function () {
        if (!this.validateInputs(this.screenInfo)) {
            return;
        }
        this.screenInfo.departments = this.departments;
        // Save the screen information in the session storage for use by all of the app
        localStorage.setItem(constants_1.Constants.SETUP_PROCESS_KEY, JSON.stringify(this.screenInfo));
        this.router.navigate(['home']);
    };
    // Reads the stored ScreenSpecificInformation object
    SetupProcess.prototype.loadInformation = function () {
        if (JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY))) {
            this.screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
            //If coordinates exist in local storage then set pin on map
            if (this.screenInfo.longitude && this.screenInfo.latitude) {
                this.updateMapMarker(this.screenInfo.longitude, this.screenInfo.latitude);
            }
            this.departments = this.screenInfo.departments;
            //If a school exist in local storage then load the departments assosciated with the school.
            if (Object.keys(this.screenInfo.school).length !== 0 && this.screenInfo.school) {
                this.getDepartments(JSON.stringify(this.screenInfo.school));
            }
        }
    };
    // Validates that all the required fields in the setup process contain data
    SetupProcess.prototype.validateInputs = function (screenInfo) {
        // TODO: Implement
        return true;
    };
    SetupProcess.prototype.addDepartment = function () {
        this.departments.push(this.newDepartment);
        this.newDepartment = "";
    };
    SetupProcess.prototype.removeDepartment = function () {
        var index = this.departments.indexOf(this.screenInfo.nearest_department);
        this.departments.splice(index, 1);
    };
    SetupProcess.prototype.ngOnInit = function () {
        var _this = this;
        // Initialize leaflet map
        this.map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(59.3469417, 18.0702413),
            zoom: 15,
            minZoom: 4,
            maxZoom: 18,
            zoomAnimation: false,
            doubleClickZoom: false
        });
        // Choose map layer
        var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
        }).addTo(this.map);
        // Add zoom control buttons
        var zoomControl = L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
        // Every time the map is clicked, the coordinates are saved.
        this.map.on('click', function (event) {
            var longitude = event.latlng.lng;
            var latitude = event.latlng.lat;
            _this.screenInfo.latitude = latitude;
            _this.screenInfo.longitude = longitude;
            _this.updateMapMarker(longitude, latitude);
        });
        // Disable pinch zoom
        this.map.touchZoom.disable();
        // Fetches all schools at KTH from local schools.json file
        this.getSchools();
        this.loadInformation();
    };
    // Updates the marker on the laeflet map
    SetupProcess.prototype.updateMapMarker = function (longitude, latitude) {
        if (this.currentMapMarker != null) {
            this.map.removeLayer(this.currentMapMarker); // Remove old marker
        }
        // Add a new marker at the location of the screen
        this.currentMapMarker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup('<b>You are here.</b>').openPopup();
    };
    // Fetches all schools at KTH from a local school.json file
    SetupProcess.prototype.getSchools = function () {
        var _this = this;
        this.mapService.getSchools().subscribe(function (res) { _this.schools = res; });
    };
    // Fetches the departments of the school passed as argument
    SetupProcess.prototype.getDepartments = function (selectedSchool) {
        var _this = this;
        var school = JSON.parse(selectedSchool);
        // Save selected  school in screenInfo Object.
        this.screenInfo.school = school;
        this.mapService.getDepartments(school.code).subscribe(function (res) {
            _this.department_list = res;
        }, function (error) { return console.log(error); });
    };
    // Toggle if opening hours feature is used or not
    SetupProcess.prototype.toggleOpeningHours = function () {
        this.screenInfo.opening_hours_enabled = !this.screenInfo.opening_hours_enabled;
    };
    // Toggles opening hours for the specific day
    SetupProcess.prototype.toggleOpeningHoursDay = function (day) {
        this.screenInfo.opening_hours[day][2] = !this.screenInfo.opening_hours[day][2];
    };
    // Set the department attributes of screenInfo object
    SetupProcess.prototype.setDepartment = function (department) {
        this.screenInfo.department = JSON.parse(department);
    };
    SetupProcess.prototype.stringify = function (value) {
        return JSON.stringify(value);
    };
    SetupProcess = __decorate([
        core_1.Component({
            selector: 'setup-process',
            directives: [common_1.NgClass],
            templateUrl: 'app/setup-process/setup-process.html',
            providers: [map_service_1.MapService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, map_service_1.MapService])
    ], SetupProcess);
    return SetupProcess;
}());
exports.SetupProcess = SetupProcess;
//# sourceMappingURL=setup-process.js.map