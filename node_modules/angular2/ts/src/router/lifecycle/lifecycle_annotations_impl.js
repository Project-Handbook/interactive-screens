System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var lang_1;
    var RouteLifecycleHook, CanActivate, routerCanReuse, routerCanDeactivate, routerOnActivate, routerOnReuse, routerOnDeactivate;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            RouteLifecycleHook = (function () {
                function RouteLifecycleHook(name) {
                    this.name = name;
                }
                RouteLifecycleHook = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String])
                ], RouteLifecycleHook);
                return RouteLifecycleHook;
            }());
            exports_1("RouteLifecycleHook", RouteLifecycleHook);
            CanActivate = (function () {
                function CanActivate(fn) {
                    this.fn = fn;
                }
                CanActivate = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Function])
                ], CanActivate);
                return CanActivate;
            }());
            exports_1("CanActivate", CanActivate);
            exports_1("routerCanReuse", routerCanReuse = lang_1.CONST_EXPR(new RouteLifecycleHook("routerCanReuse")));
            exports_1("routerCanDeactivate", routerCanDeactivate = lang_1.CONST_EXPR(new RouteLifecycleHook("routerCanDeactivate")));
            exports_1("routerOnActivate", routerOnActivate = lang_1.CONST_EXPR(new RouteLifecycleHook("routerOnActivate")));
            exports_1("routerOnReuse", routerOnReuse = lang_1.CONST_EXPR(new RouteLifecycleHook("routerOnReuse")));
            exports_1("routerOnDeactivate", routerOnDeactivate = lang_1.CONST_EXPR(new RouteLifecycleHook("routerOnDeactivate")));
        }
    }
});
//# sourceMappingURL=lifecycle_annotations_impl.js.map