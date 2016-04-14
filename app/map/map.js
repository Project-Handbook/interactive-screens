System.register(['angular2/core', './map-service', './autocomplete', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, map_service_1, autocomplete_1, router_1;
    var Map;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (autocomplete_1_1) {
                autocomplete_1 = autocomplete_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /// <reference path="../../typings/leaflet/leaflet.d.ts"/>
            Map = (function () {
                function Map(routeParams, geoCodingService) {
                    this.geoCodingService = geoCodingService;
                    var person = routeParams.get('person'); // This works (hooray!)
                    //var person_name = <string> routeParams.get('person');
                    //var person_address = <string> routeParams.get('address');
                    console.log(person);
                    if (person !== null) {
                        this.getGeoCoding(person);
                    }
                }
                //Executes on page load.
                Map.prototype.ngOnInit = function () {
                    //Initialize map
                    this.map = new L.Map('map', {
                        zoomControl: false,
                        center: new L.LatLng(59.3469417, 18.0702413),
                        zoom: 16,
                        minZoom: 4,
                        maxZoom: 18
                    });
                    var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                        attribution: '&copy; Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                    }).addTo(this.map);
                    var zoomControl = L.control.zoom({
                        position: 'topright'
                    }).addTo(this.map);
                    //Add marker at the location of the screen.
                    var greenIcon = L.icon({
                        iconUrl: './app/map/marker-icon-2x-red.png',
                        iconSize: [25, 40],
                        iconAnchor: [12.5, 20],
                        popupAnchor: [-10, -87] // point from which the popup should open relative to the iconAnchor
                    });
                    L.marker([59.34694, 18.07319]).addTo(this.map)
                        .bindPopup('<strong>You are here.</strong>')
                        .openPopup();
                };
                //Adds a marker on the location the place that the user has searched for. If multiple searches had been made this method
                //also removed the old destination marker.
                Map.prototype.addDestinationMarker = function (place) {
                    if (this.currentDestination != null) {
                        this.map.removeLayer(this.currentDestination);
                    }
                    this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map)
                        .bindPopup("<strong>" + place.roomCode + "</strong> <br>" + place.streetAddress + " " + place.streetNumber + "<br>" + place.buildingName)
                        .openPopup();
                };
                Map.prototype.getGeoCoding = function (address) {
                    var _this = this;
                    console.log(address);
                    console.log("+");
                    var coordinates;
                    this.geoCodingService.getGeoCode(address.visiting_address)
                        .subscribe(function (res) {
                        coordinates = res.results[0].geometry.location,
                            _this.currentDestination = L.marker([coordinates.lat, coordinates.lng]).addTo(_this.map);
                        // .bindPopup("<strong>" + person.given_name + " " + person.family_name + "</strong> <br>" + person.visiting_address)
                        //.openPopup();
                    });
                };
                Map = __decorate([
                    core_1.Component({
                        selector: 'map',
                        templateUrl: './app/map/map.html',
                        styleUrls: ['./app/map/map.min.css'],
                        directives: [autocomplete_1.AutoCompleteComponent],
                        providers: [map_service_1.MapService],
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, map_service_1.MapService])
                ], Map);
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
//# sourceMappingURL=map.js.map