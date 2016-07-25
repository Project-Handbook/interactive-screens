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
var router_1 = require('@angular/router');
var common_1 = require("@angular/common");
var find_person_1 = require('./find-person/find-person');
var home_1 = require('./home/home');
var contact_1 = require('./contact/contact');
var map_1 = require('./map/map');
var common_2 = require('@angular/common');
var setup_process_1 = require('./setup-process/setup-process');
var constants_1 = require('./constants');
var screen_specific_information_1 = require('./screen-specific-information');
exports.routes = [
    {
        path: '',
        redirectTo: 'home',
        terminal: true
    },
    {
        path: 'setup',
        component: setup_process_1.SetupProcess,
    },
    {
        path: 'home',
        component: home_1.Home
    },
    {
        path: 'people',
        component: find_person_1.FindPerson
    },
    {
        path: 'contact',
        component: contact_1.Contact
    },
    {
        path: 'map',
        component: map_1.Map
    }
];
var AppComponent = (function () {
    function AppComponent(router, location, cdr, element) {
        var _this = this;
        this.router = router;
        this.location = location;
        this.cdr = cdr;
        this.element = element;
        // Keys of screenInfo.opening_hours, used for iteration over dictionary
        this.weekdays = ['monday', 'tuesday', 'wednesday', 'thursday',
            'friday', 'saturday', 'sunday'];
        // The system time displayed in the main-frame header
        this.clock = "";
        this.menuItemsRightBorder = ['none', 'solid #2258A5', 'solid #2258A5', 'solid #2258A5'];
        this.prev = 0;
        this.menuImages = [true, false, false, false];
        this.imagePath = "app/main-frame/images/";
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
        this.refreshClock = function () {
            var date = new Date();
            var day = date.getDate();
            var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            var month = months[date.getMonth()];
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var hours_str;
            var minutes_str;
            var seconds_str;
            if (hours < 10) {
                hours_str = "0" + hours;
            }
            else {
                hours_str = "" + hours;
            }
            if (minutes < 10) {
                minutes_str = "0" + minutes;
            }
            else {
                minutes_str = "" + minutes;
            }
            if (seconds < 10) {
                seconds_str = "0" + seconds;
            }
            else {
                seconds_str = "" + seconds;
            }
            _this.clock = day + " " + month + " " + year + " " + hours_str + ":" + minutes_str + ":" + seconds_str;
        };
        this.titlefontSize = 5;
        this.element = element;
        this.cdr = cdr;
        // Check whether or not the screen has gone through the setup process
        var screenInfo = localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY); // Returns null when nothing is found
        if (screenInfo === null) {
            this.router.navigate(['Setup']);
        }
        // Setup update interval
        this.refreshVar = window.setInterval(this.refreshPage, this.refreshTimeout);
        // Setup the window on click callback
        window.onclick = this.onWindowClick;
        // Refresh the clock every minute
        window.setInterval(this.refreshClock, 60);
        /* Subscribes to the router, every time the route is changed the code inside the subscribe statement
           is executed, changed the appearance of the menu items depending on the current route */
        router.events.subscribe(function (val) {
            var url_with_para = val.url.split("?", 1);
            switch (url_with_para[0]) {
                case "/home":
                    if (_this.prev !== 0) {
                        _this.menuItemsRightBorder[0] = "none";
                        _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                        _this.menuImages[0] = true;
                        _this.menuImages[_this.prev] = false;
                        _this.prev = 0;
                    }
                    break;
                case "/people":
                    if (_this.prev !== 1) {
                        _this.menuItemsRightBorder[1] = "none";
                        _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                        _this.menuImages[1] = true;
                        _this.menuImages[_this.prev] = false;
                        _this.prev = 1;
                    }
                    break;
                case "/map":
                    if (_this.prev !== 2) {
                        _this.menuItemsRightBorder[2] = "none";
                        _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                        _this.menuImages[2] = true;
                        _this.menuImages[_this.prev] = false;
                        _this.prev = 2;
                    }
                    break;
                case "/contact":
                    if (_this.prev !== 3) {
                        _this.menuItemsRightBorder[3] = "none";
                        _this.menuItemsRightBorder[_this.prev] = "solid #2258A5";
                        _this.menuImages[3] = true;
                        _this.menuImages[_this.prev] = false;
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
            var screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
            if (screenInfo == null) {
                return new screen_specific_information_1.ScreenSpecificInformation();
            }
            return screenInfo;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngAfterViewInit = function () {
        while (this.titleTextElement.nativeElement.offsetWidth >= this.headerElement.nativeElement.offsetWidth * 0.6) {
            this.titlefontSize *= 0.95;
            this.cdr.detectChanges();
        }
    };
    __decorate([
        core_1.ViewChild('titleText'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "titleTextElement", void 0);
    __decorate([
        core_1.ViewChild('header'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "headerElement", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-frame',
            templateUrl: 'app/main-frame/main-frame.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_2.NgStyle],
            precompile: [home_1.Home, find_person_1.FindPerson, contact_1.Contact, map_1.Map, setup_process_1.SetupProcess]
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, core_1.ChangeDetectorRef, core_1.ElementRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map