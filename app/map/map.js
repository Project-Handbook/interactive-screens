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
var search_bar_component_1 = require('./search-bar.component');
var location_interface_1 = require('./location.interface');
var constants_1 = require('../constants');
var screen_specific_information_1 = require('../screen-specific-information');
var router_1 = require('@angular/router');
var Map = (function () {
    //
    function Map(router, _mapService) {
        this._mapService = _mapService;
        //Center coords for map Initialize
        this.mapCenter = new L.LatLng(59.3469417, 18.0702413);
        //Boolean to display error message
        this.showError = false;
        //Fetches information passed via routeParams when a user pushed the "view on map" button in the people tab
        var person = { given_name: "", family_name: "", visiting_address: "", room: "" };
        router.routerState.queryParams
            .subscribe(function (params) {
            person = {
                given_name: params['givenName'],
                family_name: params['familyName'],
                visiting_address: params['address'],
                room: params['room']
            };
        });
        //If parameters was passed then display the address on the map
        if (person.given_name && person.family_name && person.visiting_address) {
            this.getAdressFromPerson(person);
        }
    }
    //Executes on page load.
    Map.prototype.ngOnInit = function () {
        var screenInfo = new screen_specific_information_1.ScreenSpecificInformation();
        //Used to detect if chords of the screen is saved in localstorage
        var gotChoords = false;
        //Check if localstorage object exists
        if (localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY) !== null) {
            screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
            //Check if localstorage object contains position coordinates.
            if (screenInfo.latitude !== 0 && screenInfo.longitude !== 0) {
                //Set map center
                this.mapCenter = new L.LatLng(screenInfo.latitude, screenInfo.longitude);
                gotChoords = true;
            }
        }
        //Initialize map
        this.map = new L.Map('map', {
            zoomControl: false,
            center: this.mapCenter,
            zoom: 18,
            minZoom: 4,
            maxZoom: 18,
            zoomAnimation: false,
            doubleClickZoom: false
        });
        //Add map layer
        var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
        }).addTo(this.map);
        //Add zoom control
        var zoomControl = L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
        //Add marker at the location of the screen
        var greenIcon = L.icon({
            iconUrl: 'app/map/images/marker-icon-red.png',
            iconSize: [25, 38],
            popupAnchor: [2, -10] // point from which the popup should open relative to the iconAnchor
        });
        /*If choordiantes are found in localstorage then set map center to the containing chords and display marker*/
        if (gotChoords === true) {
            //Display marker
            L.marker([screenInfo.latitude, screenInfo.longitude], { icon: greenIcon }).addTo(this.map)
                .bindPopup('<strong>You are here.</strong>').openPopup();
        }
        this.map.touchZoom.disable(); //Disable touchZoom to prevent pinch zoom on touchscreens.
    };
    //Adds a marker on the location the place that the user has searched for. If multiple searches had been made this method
    //also removed the old destination marker.
    Map.prototype.addDestinationMarker = function (place) {
        if (place === undefined) {
            return;
        }
        if (this.currentDestination != null) {
            this.map.removeLayer(this.currentDestination); //Removes old marker
        }
        this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map);
        this.map.setView([place.latitude, place.longitude], this.map.getZoom(), { animate: true });
        /*Depending if the location is fetched from googleapis or KTH places the location Object
          contains different information and therefore the popups print different variables.  */
        switch (place.location_type) {
            case location_interface_1.Location_type.kth_places:
                if (place.popular_name.length !== 0) {
                    place.roomCode = place.popular_name;
                }
                this.currentDestination.bindPopup("<strong>" + place.roomCode + "</strong> - "
                    + place.roomType.toLowerCase() + "<br>"
                    + place.streetAddress + " " + place.streetNumber + "<br>" + " Våningsplan " + place.floor + ", " + place.buildingName)
                    .openPopup();
                break;
            case location_interface_1.Location_type.department:
                this.currentDestination.bindPopup("<strong>" + place.buildingName + "</strong><br>" + place.streetAddress)
                    .openPopup();
                break;
            case location_interface_1.Location_type.street_address:
                this.currentDestination.bindPopup("<strong>" + place.streetAddress + "</strong>")
                    .openPopup();
                break;
            default:
                console.log("No match");
        }
    };
    /* This method is used when a person has been passed as argument when navigating to this view. It fetches
       the coordinates of the person and dispaly the coordinates as a marker on the map */
    Map.prototype.getAdressFromPerson = function (person) {
        var _this = this;
        this._mapService.getGeoCode(person.visiting_address, location_interface_1.Location_type.street_address)
            .subscribe(function (res) {
            if (res[0] !== undefined) {
                var coordinate_lat = res[0].latitude;
                var coordinate_lng = res[0].longitude;
                _this.mapCenter = new L.LatLng(coordinate_lat, coordinate_lng);
                _this.centerOnMarker();
                _this.currentDestination = L.marker([coordinate_lat, coordinate_lng]).addTo(_this.map);
                //If room number exists then print it in popup otherwise not.
                _this.currentDestination.bindPopup("<strong> " + person.given_name + " " + person.family_name + " </strong>\n                <br> " + res[0].streetAddress)
                    .openPopup();
            }
            else {
                _this.showError = true;
                setTimeout(function () { _this.showError = false; }, 3000);
            }
        }, function (error) { return console.log("error"); });
    };
    //Centers the map on the default coordinates.
    Map.prototype.centerOnMarker = function () {
        this.map.setView(this.mapCenter, this.map.getZoom(), { animate: true });
    };
    Map = __decorate([
        core_1.Component({
            selector: 'map',
            templateUrl: './app/map/html/map.html',
            styleUrls: ['./app/map/styles/map.min.css'],
            directives: [search_bar_component_1.SearchBarComponent],
            providers: [map_service_1.MapService],
        }), 
        __metadata('design:paramtypes', [router_1.Router, map_service_1.MapService])
    ], Map);
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map