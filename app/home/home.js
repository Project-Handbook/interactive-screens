System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var Home;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(http) {
                    var _this = this;
                    this.base_polopoly_url = "https://www.kth.se/cm/";
                    this.calendar_polopoly_id = "1.231565";
                    this.news_polopoly_id = "1.314503";
                    http.get(this.base_polopoly_url + this.news_polopoly_id)
                        .subscribe(function (res) { return _this.news_block = res.text(); });
                    http.get(this.base_polopoly_url + this.calendar_polopoly_id)
                        .subscribe(function (res) { return _this.calendar_block = res.text(); });
                }
                Home = __decorate([
                    core_1.Component({
                        selector: 'home',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        templateUrl: 'app/home/home.html'
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Home);
                return Home;
            }());
            exports_1("Home", Home);
        }
    }
});
//# sourceMappingURL=home.js.map