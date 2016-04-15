System.register(['angular2/core', './services/map-service', './search-bar.component', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, map_service_1, search_bar_component_1, router_1;
    var Map;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (search_bar_component_1_1) {
                search_bar_component_1 = search_bar_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /// <reference path="../../typings/leaflet/leaflet.d.ts"/>
            Map = (function () {
                function Map(routeParams, _mapService) {
                    this._mapService = _mapService;
                    var person = routeParams.get('hej'); // This works (hooray!)
                    if (person !== null) {
                        this.getPopUpAdress(person);
                    }
                }
                //Executes on page load.
                Map.prototype.ngOnInit = function () {
                    //Initialize map
                    this.map = new L.Map('map', {
                        zoomControl: false,
                        center: new L.LatLng(59.3469417, 18.0702413),
                        zoom: 15,
                        minZoom: 4,
                        maxZoom: 18
                    });
                    var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                        attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
                    }).addTo(this.map);
                    var zoomControl = L.control.zoom({
                        position: 'topright'
                    }).addTo(this.map);
                    L.marker([59.34694, 18.07319]).addTo(this.map)
                        .bindPopup('<strong>You are here.</strong>').openPopup();
                };
                //Adds a marker on the location the place that the user has searched for. If multiple searches had been made this method
                //also removed the old destination marker.
                Map.prototype.addDestinationMarker = function (place) {
                    console.log(place);
                    if (this.currentDestination != null) {
                        this.map.removeLayer(this.currentDestination);
                    }
                    this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map)
                        .bindPopup("<strong>" + place.roomCode + "</strong> <br>" + place.streetAddress + " " + place.streetNumber + "<br>" + place.buildingName)
                        .openPopup();
                };
                Map.prototype.getPopUpAdress = function (address) {
                    var _this = this;
                    console.log(address.visiting_address);
                    this._mapService.getGeoCode(address.visiting_address)
                        .subscribe(function (res) {
                        var coordinate_lat = res[0].latitude;
                        var coordinate_lng = res[0].longitude;
                        _this.currentDestination = L.marker([coordinate_lat, coordinate_lng]).addTo(_this.map)
                            .bindPopup("<strong>" + res[0].streetAddress + "</strong> <br>")
                            .openPopup();
                    });
                };
                Map = __decorate([
                    core_1.Component({
                        selector: 'map',
                        templateUrl: './app/map/html/map.html',
                        styleUrls: ['./app/map/styles/map.min.css'],
                        directives: [search_bar_component_1.SearchBarComponent],
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