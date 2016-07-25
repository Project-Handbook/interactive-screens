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
var home_service_1 = require('./home-service');
var screen_specific_information_1 = require('../screen-specific-information');
var constants_1 = require('../constants');
var Home = (function () {
    function Home(homeService, elementRef, cdr) {
        this.homeService = homeService;
        this.cdr = cdr;
        //Contains the news event HTML blocks.
        this.news_block = [];
        //opacity is used to set the opacity of all the news event elements in the view of this component.
        this.opacatiy = 1;
        this.elementRef = elementRef;
    }
    //Returns the 4 latest calendar events from Polypoly through the home-service class
    Home.prototype.getCalendar = function (id) {
        var _this = this;
        this.homeService.getCalendar(id)
            .subscribe(function (res) { _this.calendar_block = res; }, function (error) { _this.calendar_error = true; }, function () { return _this.calendar_error = false; });
    };
    //Fetches the news event block from Polypoly through the home-service class.
    Home.prototype.getNewsFeed = function (id) {
        var _this = this;
        this.homeService.getNewsFeed(id)
            .subscribe(function (res) {
            for (var i = 0; i < res.length - 1; i++) {
                _this.news_block.push(res[i]);
            }
            if (res.splice(res.length - 1, 1)[0]) {
                _this.slideShow(_this.news_block);
            }
        }, function (error) { return _this.news_feed_error = true; }, function () { });
    };
    //Calls getCalendar and getNewsFeed on View Init.
    Home.prototype.ngOnInit = function () {
        //Contains screenspecific configuration
        var screenInfo = new screen_specific_information_1.ScreenSpecificInformation();
        //Checks if localstorage file exists
        if (localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY)) {
            screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
            this.getCalendar(screenInfo.calendar_polypoly_id);
            this.getNewsFeed(screenInfo.news_feed_polypoly_id);
        }
        else {
            //If localstorage file doesnt exists, display error messages!
            this.news_feed_error = true;
            this.calendar_error = true;
        }
    };
    //Creates a simple slideshow of the articles in the array passed as argument.
    Home.prototype.slideShow = function (articles, tmp) {
        var _this = this;
        if (tmp === void 0) { tmp = null; }
        if (tmp === null) {
            tmp = articles.splice(0, 1)[0];
            return this.slideShow(articles, tmp);
        }
        setTimeout(function () { return _this.opacatiy = 1; }, 1);
        setTimeout(function () {
            _this.opacatiy = 0;
            articles.push(tmp);
            tmp = articles.splice(0, 1)[0];
            _this.slideShow(articles, tmp);
        }, 7500);
    };
    __decorate([
        core_1.ViewChild('newsBlock'), 
        __metadata('design:type', Object)
    ], Home.prototype, "newsBlockElement", void 0);
    __decorate([
        core_1.ViewChild('newsBlockInner'), 
        __metadata('design:type', Object)
    ], Home.prototype, "newsBlockInnerElement", void 0);
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            viewProviders: [http_1.HTTP_PROVIDERS],
            encapsulation: core_1.ViewEncapsulation.Native,
            templateUrl: 'app/home/home.html',
            providers: [home_service_1.HomeService],
            styleUrls: ['app/home/home.min.css'],
            styles: ["\n    @import \"http://www.kth.se/css/v/8.28.4/kth.css\";\n    a{\n      pointer-events: none;\n    }\n  "],
        }), 
        __metadata('design:paramtypes', [home_service_1.HomeService, core_1.ElementRef, core_1.ChangeDetectorRef])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map