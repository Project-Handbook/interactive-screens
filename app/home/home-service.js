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
    function HomeService(_http) {
        this._http = _http;
        this.url = "https://www.kth.se/cm/";
    }
    HomeService.prototype.getCalendar = function (id) {
        //"1.467916";
        var calendar_polopoly_id = id;
        return this._http.get(this.url + calendar_polopoly_id).map(function (res) { return res.text(); });
    };
    HomeService.prototype.getNewsFeed = function (id) {
        //"1.640564"
        var news_polopoly_id = id;
        return this._http.get(this.url + news_polopoly_id)
            .map(function (res) { return res.text(); })
            .map(function (res) {
            //Add https://kth.se infront of every image url
            var regex = new RegExp("/polopoly_fs/1.+/image/.+\.(jpg|png)", "g");
            var image_urls = res.match(regex);
            image_urls.forEach(function (image) {
                res = res.replace(image, "https://www.kth.se" + image);
            });
            var blocks = jQuery(res).find(".blockItem");
            var news_items = "";
            /*Replaces the class name of every news block, currently supports three different layouts
                Image on top and text in the bottom, floating image to the right and text on the left and
                blocks without any media.
            */
            /*	for(var i=0;i<blocks.length;i++){
                        var regex_top = new RegExp("<div class=\"tlc cid-1_[0-9]{6} no-categories\\sblock[\\s\\w]+[top|bottom][\\s\\w]+[^n][^o][^M][^e][^d][^i][^a]\">","gi");
                        var regex_right = new RegExp("<div class=\"tlc cid-1_[0-9]{6} no-categories\\sblock[\\s\\w]+[right|left][\\s\\w]+[^n][^o][^M][^e][^d][^i][^a]\">","gi");
                        var regex_match;
                        if(regex_top.test(blocks[i].innerHTML)){
                            regex_match = blocks[i].innerHTML.match(regex_top);
                            blocks[i].innerHTML = blocks[i].innerHTML.replace(regex_match[0],"<div class=\"block_image_top\">");
                        }else if(regex_right.test(blocks[i].innerHTML)){
                            regex_match = blocks[i].innerHTML.match(regex_right);
                            blocks[i].innerHTML = blocks[i].innerHTML.replace(regex_match[0],"<div class=\"block_image_right\">");
                        }
                        news_items= news_items + blocks[i].innerHTML;
                }*/
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