System.register(['./platform_location', 'angular2/src/facade/lang', 'angular2/src/router/location/browser_platform_location', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_location_1, lang_1, browser_platform_location_1, core_1;
    var WORKER_RENDER_ROUTER;
    function initRouterListeners(injector) {
        return function () {
            var zone = injector.get(core_1.NgZone);
            zone.run(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
        };
    }
    return {
        setters:[
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("WORKER_RENDER_ROUTER", WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([
                platform_location_1.MessageBasedPlatformLocation,
                browser_platform_location_1.BrowserPlatformLocation,
                lang_1.CONST_EXPR(new core_1.Provider(core_1.APP_INITIALIZER, { useFactory: initRouterListeners, multi: true, deps: lang_1.CONST_EXPR([core_1.Injector]) }))
            ]));
        }
    }
});
//# sourceMappingURL=router_providers.js.map