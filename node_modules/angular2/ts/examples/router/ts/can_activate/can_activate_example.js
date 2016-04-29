System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, browser_1, router_1;
    var ControlPanelCmp, HomeCmp, AppCmp;
    function checkIfWeHavePermission(instruction) {
        return instruction.params['id'] == '1';
    }
    function main() {
        return browser_1.bootstrap(AppCmp, [core_1.provide(router_1.APP_BASE_HREF, { useValue: '/angular2/examples/router/ts/can_activate' })]);
    }
    exports_1("main", main);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            // #docregion canActivate
            ControlPanelCmp = (function () {
                function ControlPanelCmp() {
                }
                ControlPanelCmp = __decorate([
                    core_1.Component({ selector: 'control-panel-cmp', template: "<div>Settings: ...</div>" }),
                    router_1.CanActivate(checkIfWeHavePermission), 
                    __metadata('design:paramtypes', [])
                ], ControlPanelCmp);
                return ControlPanelCmp;
            }());
            // #enddocregion
            HomeCmp = (function () {
                function HomeCmp() {
                }
                HomeCmp = __decorate([
                    core_1.Component({
                        selector: 'home-cmp',
                        template: "\n    <h1>Welcome Home!</h1>\n    <div>\n      Edit <a [routerLink]=\"['/ControlPanelCmp', {id: 1}]\" id=\"user-1-link\">User 1</a> |\n      Edit <a [routerLink]=\"['/ControlPanelCmp', {id: 2}]\" id=\"user-2-link\">User 2</a>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeCmp);
                return HomeCmp;
            }());
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        template: "\n    <h1>My App</h1>\n    <router-outlet></router-outlet>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/user-settings/:id', component: ControlPanelCmp, name: 'ControlPanelCmp' },
                        { path: '/', component: HomeCmp, name: 'HomeCmp' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
        }
    }
});
//# sourceMappingURL=can_activate_example.js.map