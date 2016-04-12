System.register(['angular2/core', 'angular2/router', './find-person/find-person', './home/home', './contact/contact', './map/map', 'angular2/common', './setup-process/setup-process', './constants', './screen-specific-information'], function(exports_1, context_1) {
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
    var core_1, router_1, find_person_1, home_1, contact_1, map_1, common_1, setup_process_1, router_2, core_2, constants_1, screen_specific_information_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (find_person_1_1) {
                find_person_1 = find_person_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (contact_1_1) {
                contact_1 = contact_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (setup_process_1_1) {
                setup_process_1 = setup_process_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (screen_specific_information_1_1) {
                screen_specific_information_1 = screen_specific_information_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, location) {
                    var _this = this;
                    this.router = router;
                    this.location = location;
                    this.menuItemsRightBorder = ['none', 'solid #2258A5', 'solid #2258A5', 'solid #2258A5'];
                    this.menuItemsTopBottomBorder = ['1px solid #2258A5', '1px groove #A9A9A9', '1px groove #A9A9A9', '1px groove #A9A9A9'];
                    this.prev = 0;
                    // Called whenever the window is clicked
                    this.onWindowClick = function () {
                        window.clearInterval(_this.refreshVar);
                        _this.refreshVar = window.setInterval(_this.refreshPage, _this.refreshTimeout);
                    };
                    // After this time (5 min) the page will reload if none has touched the window
                    this.refreshTimeout = 5 * 60 * 1000;
                    // Reloads the current page
                    this.refreshPage = function () {
                        // Navigate to '/Home'
                        _this.router.navigate(['Home']).then(function () {
                            window.location.reload(true);
                        });
                    };
                    // Check whether or not the screen has gone through the setup process
                    var screenInfo = sessionStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY); // Returns null when nothing is found
                    if (screenInfo != null) {
                        this.router.navigate(['Home']);
                    }
                    // Setup update interval
                    this.refreshVar = window.setInterval(this.refreshPage, this.refreshTimeout);
                    // Setup the window on click callback
                    window.onclick = this.onWindowClick;
                    router.subscribe(function (val) {
                        console.log(val);
                        console.log(_this.menuItemsRightBorder);
                        switch (val) {
                            case "home":
                                if (_this.prev !== 0) {
                                    _this.menuItemsRightBorder[0] = "none";
                                    _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                                    _this.menuItemsTopBottomBorder[0] = "1px solid #2258A5";
                                    _this.menuItemsTopBottomBorder[_this.prev] = "1px groove #A9A9A9";
                                    _this.prev = 0;
                                }
                                break;
                            case "find-person":
                                if (_this.prev !== 1) {
                                    _this.menuItemsRightBorder[1] = "none";
                                    _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                                    _this.menuItemsTopBottomBorder[1] = "1px solid #2258A5";
                                    _this.menuItemsTopBottomBorder[_this.prev] = "1px groove #A9A9A9";
                                    _this.prev = 1;
                                }
                                break;
                            case "map":
                                if (_this.prev !== 2) {
                                    _this.menuItemsRightBorder[2] = "none";
                                    _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                                    _this.menuItemsTopBottomBorder[2] = "1px solid #2258A5";
                                    _this.menuItemsTopBottomBorder[_this.prev] = "1px groove #A9A9A9";
                                    _this.prev = 2;
                                }
                                break;
                            case "contact":
                                if (_this.prev !== 3) {
                                    _this.menuItemsRightBorder[3] = "none";
                                    _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                                    _this.menuItemsTopBottomBorder[3] = "1px solid #2258A5";
                                    _this.menuItemsTopBottomBorder[_this.prev] = "1px groove #A9A9A9";
                                    _this.prev = 3;
                                }
                                break;
                        }
                        ;
                    });
                }
                Object.defineProperty(AppComponent.prototype, "screenInfo", {
                    // Fetches the screen specific information from the session storage
                    // If the screen information is null this returns a default object
                    get: function () {
                        var screenInfo = JSON.parse(sessionStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
                        if (screenInfo == null) {
                            return new screen_specific_information_1.ScreenSpecificInformation();
                        }
                        return screenInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'main-frame',
                        templateUrl: 'app/main-frame/main-frame.html',
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.NgStyle],
                        providers: [router_1.ROUTER_PROVIDERS, core_2.provide(router_2.LocationStrategy, { useClass: router_2.HashLocationStrategy })]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/setup-process',
                            component: setup_process_1.SetupProcess,
                            name: 'SetupProcess',
                            useAsDefault: true
                        },
                        {
                            path: '/home',
                            component: home_1.Home,
                            name: 'Home',
                        },
                        {
                            path: '/find-person',
                            component: find_person_1.FindPerson,
                            name: 'FindPerson'
                        },
                        {
                            path: '/contact',
                            component: contact_1.Contact,
                            name: 'Contact'
                        },
                        {
                            path: '/map',
                            component: map_1.Map,
                            name: 'Map'
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map