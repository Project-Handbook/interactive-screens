System.register(['angular2/core', 'angular2/http', "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var MapService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            MapService = (function () {
                function MapService(_http) {
                    this._http = _http;
                }
                //Fetches all locations from KTH Places that matches the given search string.
                MapService.prototype.getPlaces = function (term) {
                    var searchResult = [];
                    var url = "https://www.kth.se/api/places/v3/search/room?q=" + term.toLowerCase() + "&api_key=lkjashd(%26*0987-7-0Ujuhdhj4HGRESDs";
                    return this._http.get(url)
                        .map(function (request) { return request.json(); })
                        .map(function (res) {
                        res.forEach(function (item) {
                            if ((item.typeName === "Övningssal" || item.typeName === "Datorsal"
                                || item.typeName === "Hörsal") && item.kthLokalkod.length !== 0) {
                                searchResult.push({
                                    latitude: item.geoData.lat,
                                    longitude: item.geoData.long,
                                    buildingName: item.buildingName,
                                    roomCode: item.kthLokalkod,
                                    streetAddress: item.streetAddress,
                                    streetNumber: item.streetNumber,
                                    roomType: item.typeName,
                                    zipCode: item.zip,
                                    floor: item.floor
                                });
                            }
                        });
                        return searchResult;
                    });
                };
                MapService.prototype.getGeoCode = function (address) {
                    var searchResult = [];
                    return this._http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'stockholm&components=country:SE')
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        res.results.forEach(function (item) {
                            if (item.geometry.location_type !== "APPROXIMATE") {
                                searchResult.push({
                                    latitude: item.geometry.location.lat,
                                    longitude: item.geometry.location.lng,
                                    buildingName: null,
                                    roomCode: null,
                                    streetAddress: item.formatted_address,
                                    streetNumber: null,
                                    roomType: null,
                                    zipCode: null,
                                    floor: null
                                });
                            }
                        });
                        return searchResult;
                    });
                };
                MapService.prototype.getSchools = function () {
                    var schools = [];
                    return this._http.get('app/map/schools.json')
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        res.forEach(function (item) {
                            return schools.push(item);
                        });
                        return schools;
                    });
                };
                MapService.prototype.getDepartments = function (term) {
                    var departments = [];
                    return this._http.get("https://www.lan.kth.se/personal/api/orginfo?code=" + term)
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        console.log(res);
                        var regexp = new RegExp('handen|kista');
                        res.children.forEach(function (item) {
                            console.log(item.address);
                            if (item.address !== null && regexp.test(item.address.toLowerCase()) === false) {
                                departments.push(item);
                            }
                        });
                        return departments;
                    });
                };
                MapService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MapService);
                return MapService;
            }());
            exports_1("MapService", MapService);
        }
    }
});
//# sourceMappingURL=map-service.js.map