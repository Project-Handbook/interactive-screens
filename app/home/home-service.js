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
require('rxjs/add/operator/map');
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
        // Polypoly URL
        this.url = "https://www.kth.se/cm/";
    }
    /* Fetches the calendar block associated with the given id string
         Returns observable that has to be subscribed in order to retrieve the data */
    HomeService.prototype.getCalendar = function (id) {
        var calendar_polopoly_id = id;
        return this.http.get(this.url + calendar_polopoly_id).map(function (res) { return res.text(); });
    };
    /* Fetches the calendar news feed block associated with the given id string
         Returns observable that has to be subscribed in order to retrieve the data */
    HomeService.prototype.getNewsFeed = function (id) {
        var news_polopoly_id = id;
        return this.http.get(this.url + news_polopoly_id)
            .map(function (res) { return res.text(); })
            .map(function (res) {
            // Add https://kth.se infront of every image url
            var regex = new RegExp("/polopoly_fs/1.+/image/.+\.(jpg|png)", "g");
            var image_urls = res.match(regex);
            image_urls.forEach(function (image) {
                res = res.replace(image, "https://www.kth.se" + image);
            });
            // The news events are contained in the blockItem div class.
            var blocks = jQuery(res).find(".blockItem");
            // Returns a list of news events
            return blocks;
        });
    };
    HomeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;
//# sourceMappingURL=home-service.js.map