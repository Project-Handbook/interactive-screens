System.register(['angular2/core', 'angular2/http', './home-service'], function(exports_1, context_1) {
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
    var core_1, http_1, home_service_1;
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (home_service_1_1) {
                home_service_1 = home_service_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(homeService) {
                    this.homeService = homeService;
                }
                Home.prototype.getCalendar = function () {
                    var _this = this;
                    this.homeService.getCalendar()
                        .subscribe(function (res) { _this.calendar_block = res; });
                };
                Home.prototype.getNewsFeed = function () {
                    var _this = this;
                    this.homeService.getNewsFeed()
                        .subscribe(function (res) { _this.news_block = res, console.log(res); });
                };
                Home.prototype.ngOnInit = function () {
                    this.getCalendar();
                    this.getNewsFeed();
                };
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        encapsulation: core_1.ViewEncapsulation.Native,
                        templateUrl: 'app/home/home.html',
                        providers: [home_service_1.HomeService],
                        styleUrls: ['app/home/home.min.css']
                    }), 
                    __metadata('design:paramtypes', [home_service_1.HomeService])
                ], Home);
                return Home;
            }());
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map