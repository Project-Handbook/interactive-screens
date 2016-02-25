System.register(['angular2/core', 'angular2/router', './find-person/find-person', './home/home', './contact/contact', './map/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, find_person_1, home_1, contact_1, map_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'main-frame',
                        templateUrl: 'app/main-frame/main-frame.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/home',
                            component: home_1.Home,
                            name: 'Home',
                            useAsDefault: true
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
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map