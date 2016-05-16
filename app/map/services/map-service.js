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
var http_1 = require('@angular/http');
require("rxjs/add/operator/map");
var location_interface_1 = require('../location.interface');
var MapService = (function () {
    function MapService(http) {
        this.http = http;
    }
    //Fetches all locations from KTH Places that matches the given search string.
    MapService.prototype.getPlaces = function (term) {
        var searchResult = [];
        var url = "https://www.kth.se/api/places/v3/search/room?q=" + term.toLowerCase() + "&api_key=lkjashd(%26*0987-7-0Ujuhdhj4HGRESDs";
        return this.http.get(url)
            .map(function (request) { return request.json(); })
            .map(function (res) {
            res.forEach(function (item) {
                //Only accept locations of certain types.
                if ((item.typeName === "Övningssal" || item.typeName === "Datorsal"
                    || item.typeName === "Hörsal" || item.typeName === "Seminarierum" || item.typeName === "Kontor")
                    && (item.placeName.length !== 0 || item.kthPopularName.length !== 0)) {
                    searchResult.push({
                        latitude: item.geoData.lat,
                        longitude: item.geoData.long,
                        buildingName: item.buildingName,
                        roomCode: item.placeName,
                        popular_name: item.kthPopularName,
                        streetAddress: item.streetAddress,
                        streetNumber: item.streetNumber,
                        roomType: item.typeName,
                        zipCode: item.zip,
                        floor: item.floor,
                        location_type: location_interface_1.Location_type.kth_places
                    });
                }
            });
            return searchResult;
        });
    };
    //Fetches all locations from google geocoding API that matches the given search string.
    MapService.prototype.getGeoCode = function (address, location_type) {
        var searchResult = [];
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'stockholm&bounds=59.328697, 18.036975|59.348656, 18.097400&components=country:SE')
            .map(function (res) { return res.json(); })
            .map(function (res) {
            console.log(res),
                res.results.forEach(function (item) {
                    //Only accepts exact locations.
                    if (item.geometry.location_type !== "APPROXIMATE") {
                        searchResult.push({
                            latitude: item.geometry.location.lat,
                            longitude: item.geometry.location.lng,
                            buildingName: null,
                            roomCode: null,
                            popular_name: null,
                            streetAddress: item.formatted_address,
                            streetNumber: null,
                            roomType: null,
                            zipCode: null,
                            floor: null,
                            location_type: location_type
                        });
                    }
                });
            return searchResult;
        });
    };
    //Fetches all schools of KTH from local schools.json.
    MapService.prototype.getSchools = function () {
        var schools = [];
        return this.http.get('app/schools.json')
            .map(function (res) { return res.json(); })
            .map(function (res) {
            res.forEach(function (item) {
                return schools.push(item);
            });
            return schools;
        });
    };
    //Fetches all the departments of the school passed as argument.
    MapService.prototype.getDepartments = function (term) {
        var departments = [];
        return this.http.get("https://www.lan.kth.se/personal/api/orginfo?code=" + term)
            .map(function (res) { return res.json(); })
            .map(function (res) {
            var regexp = new RegExp('handen|kista');
            var added = [];
            // Removes dupplicates from the returned department list
            // Only adds departments of KTH Östermalm campus.
            res.children.forEach(function (item) {
                var exists = false;
                added.forEach(function (dep) {
                    if (item.name_sv === dep) {
                        exists = true;
                    }
                });
                added.push(item.name_sv);
                if (exists === false && item.address !== null && regexp.test(item.address.toLowerCase()) === false) {
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
exports.MapService = MapService;
//# sourceMappingURL=map-service.js.map