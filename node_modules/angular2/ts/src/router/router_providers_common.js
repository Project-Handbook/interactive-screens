System.register(['angular2/src/router/location/location_strategy', 'angular2/src/router/location/path_location_strategy', 'angular2/src/router/router', 'angular2/src/router/route_registry', 'angular2/src/router/location/location', 'angular2/src/facade/lang', 'angular2/core', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var location_strategy_1, path_location_strategy_1, router_1, route_registry_1, location_1, lang_1, core_1, exceptions_1;
    var ROUTER_PROVIDERS_COMMON;
    function routerFactory(registry, location, primaryComponent, appRef) {
        var rootRouter = new router_1.RootRouter(registry, location, primaryComponent);
        appRef.registerDisposeListener(function () { return rootRouter.dispose(); });
        return rootRouter;
    }
    function routerPrimaryComponentFactory(app) {
        if (app.componentTypes.length == 0) {
            throw new exceptions_1.BaseException("Bootstrap at least one component before injecting Router.");
        }
        return app.componentTypes[0];
    }
    return {
        setters:[
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (path_location_strategy_1_1) {
                path_location_strategy_1 = path_location_strategy_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (route_registry_1_1) {
                route_registry_1 = route_registry_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * The Platform agnostic ROUTER PROVIDERS
             */
            exports_1("ROUTER_PROVIDERS_COMMON", ROUTER_PROVIDERS_COMMON = lang_1.CONST_EXPR([
                route_registry_1.RouteRegistry,
                lang_1.CONST_EXPR(new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: path_location_strategy_1.PathLocationStrategy })),
                location_1.Location,
                lang_1.CONST_EXPR(new core_1.Provider(router_1.Router, {
                    useFactory: routerFactory,
                    deps: lang_1.CONST_EXPR([route_registry_1.RouteRegistry, location_1.Location, route_registry_1.ROUTER_PRIMARY_COMPONENT, core_1.ApplicationRef])
                })),
                lang_1.CONST_EXPR(new core_1.Provider(route_registry_1.ROUTER_PRIMARY_COMPONENT, { useFactory: routerPrimaryComponentFactory, deps: lang_1.CONST_EXPR([core_1.ApplicationRef]) }))
            ]));
        }
    }
});
//# sourceMappingURL=router_providers_common.js.map