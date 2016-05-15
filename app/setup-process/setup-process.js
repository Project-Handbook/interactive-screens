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
var router_deprecated_1 = require('@angular/router-deprecated');
var constants_1 = require('../constants');
var screen_specific_information_1 = require('../screen-specific-information');
var common_1 = require('@angular/common');
var map_service_1 = require('../map/services/map-service');
var SetupProcess = (function () {
    function SetupProcess(router, mapService) {
        this.router = router;
        this.mapService = mapService;
        this.screenInfo = new screen_specific_information_1.ScreenSpecificInformation();
        // Input - need to add this the the list
        this.newDepartment = "";
        // List of user created departments
        this.departments = [];
        this.schools = [];
        this.department_list = [];
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
        this.router.navigate(['Home']);
    };
    // Reads the stored ScreenSpecificInformation object
    SetupProcess.prototype.loadInformation = function () {
        this.screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
        this.updateMapMarker(this.screenInfo.longitude, this.screenInfo.latitude);
    };
    // Validates that all the required fields in the setup process contain data
    SetupProcess.prototype.validateInputs = function (screenInfo) {
        // TODO: Implement
        return true;
    };
    SetupProcess.prototype.addDepartment = function () {
        this.departments.push(this.newDepartment);
    };
    SetupProcess.prototype.removeDepartment = function () {
        var index = this.departments.indexOf(this.screenInfo.nearest_department);
        this.departments.splice(index, 1);
    };
    SetupProcess.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY) !== null) {
            this.screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
        }
        this.map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(59.3469417, 18.0702413),
            zoom: 15,
            minZoom: 4,
            maxZoom: 18,
            zoomAnimation: false,
            doubleClickZoom: false
        });
        var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
        }).addTo(this.map);
        var zoomControl = L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
        this.map.on('click', function (event) {
            var longitude = event.latlng.lng;
            var latitude = event.latlng.lat;
            _this.screenInfo.latitude = latitude;
            _this.screenInfo.longitude = longitude;
            _this.updateMapMarker(longitude, latitude);
        });
        this.map.touchZoom.disable();
        this.getSchools();
    };
    SetupProcess.prototype.updateMapMarker = function (longitude, latitude) {
        if (this.currentMapMarker != null) {
            this.map.removeLayer(this.currentMapMarker); // Remove old marker
        }
        // Add a new marker at the location of the screen
        this.currentMapMarker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup('<b>You are here.</b>').openPopup();
    };
    SetupProcess.prototype.getSchools = function () {
        var _this = this;
        this.mapService.getSchools().subscribe(function (res) { _this.schools = res; });
    };
    SetupProcess.prototype.getDepartments = function (department) {
        var _this = this;
        this.mapService.getDepartments(this.schools[department].code).subscribe(function (res) {
            _this.department_list = res;
        });
        this.screenInfo.footer_text = this.schools[department].footer_text;
    };
    // Toggle if opening hours feature is used or not.
    SetupProcess.prototype.toggleOpeningHours = function () {
        this.screenInfo.opening_hours_enabled = !this.screenInfo.opening_hours_enabled;
    };
    // Toggles opening hours for the specific day
    SetupProcess.prototype.toggleOpeningHoursDay = function (day) {
        this.screenInfo.opening_hours[day][2] = !this.screenInfo.opening_hours[day][2];
    };
    SetupProcess.prototype.setDepartment = function (index) {
        console.log(index);
        this.screenInfo.department_code = this.department_list[index].code;
        this.screenInfo.department_name = this.department_list[index].name_sv;
    };
    SetupProcess = __decorate([
        core_1.Component({
            selector: 'setup-process',
            directives: [common_1.NgClass],
            templateUrl: 'app/setup-process/setup-process.html',
            providers: [map_service_1.MapService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, map_service_1.MapService])
    ], SetupProcess);
    return SetupProcess;
}());
exports.SetupProcess = SetupProcess;
//# sourceMappingURL=setup-process.js.map