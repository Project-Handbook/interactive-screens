System.register(['angular2/core', './services/map-service', './search-bar.component', 'angular2/router', './location.interface'], function(exports_1, context_1) {
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
    var core_1, map_service_1, search_bar_component_1, router_1, location_interface_1;
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
            },
            function (location_interface_1_1) {
                location_interface_1 = location_interface_1_1;
            }],
        execute: function() {
            Map = (function () {
                function Map(routeParams, _mapService) {
                    this._mapService = _mapService;
                    //Center coords for map Initialize
                    this.mapCenter = new L.LatLng(59.3469417, 18.0702413);
                    //Fetches information passed via routeParams when a user pushed the "view on map" button in the people tab
                    var person = {
                        given_name: routeParams.get('given_name'),
                        family_name: routeParams.get('family_name'),
                        visiting_address: routeParams.get('address')
                    };
                    //If parameters was passed then display the address on the map
                    if (person.given_name !== null && person.family_name !== null && person.visiting_address !== null) {
                        this.getAdressFromPerson(person);
                    }
                }
                //Executes on page load.
                Map.prototype.ngOnInit = function () {
                    //Initialize mapvar antarctica = [-77,70];
                    this.map = new L.Map('map', {
                        zoomControl: false,
                        center: this.mapCenter,
                        zoom: 17,
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
                    //Add marker at the location of the screen
                    var greenIcon = L.icon({
                        iconUrl: 'app/map/images/marker-icon-red.png',
                        iconSize: [25, 38],
                        popupAnchor: [2, -10] // point from which the popup should open relative to the iconAnchor
                    });
                    L.marker([59.34694, 18.07319], { icon: greenIcon }).addTo(this.map)
                        .bindPopup('<strong>You are here.</strong>').openPopup();
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
                    /*Depending if the location is fetched from googleapis, department api or KTH places the location Object
                      contains different information and therefore the popups print different variables.
                    */
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
                /* Used to fetch the address if the user navigates to the map tab through the peoples tab by clicking on
                 the view address button. Fetches the coordinates of the adress of the person and displays it on the map.
                */
                Map.prototype.getAdressFromPerson = function (person) {
                    var _this = this;
                    console.log(person.visiting_address);
                    this._mapService.getGeoCode(person.visiting_address, location_interface_1.Location_type.street_address)
                        .subscribe(function (res) {
                        var coordinate_lat = res[0].latitude;
                        var coordinate_lng = res[0].longitude;
                        _this.currentDestination = L.marker([coordinate_lat, coordinate_lng]).addTo(_this.map)
                            .bindPopup("<strong>" + res[0].streetAddress + "</strong> <br>" +
                            person.given_name + " " + person.family_name)
                            .openPopup();
                    });
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
                    __metadata('design:paramtypes', [router_1.RouteParams, map_service_1.MapService])
                ], Map);
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
//# sourceMappingURL=map.js.map