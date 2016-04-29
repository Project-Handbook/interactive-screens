System.register(['angular2/core', 'angular2/src/router/location/platform_location', './platform_location', 'angular2/src/router/router_providers_common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_location_1, platform_location_2, router_providers_common_1;
    var WORKER_APP_ROUTER;
    function initRouter(platformLocation, zone) {
        return zone.run(function () { return platformLocation.init(); });
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            },
            function (platform_location_2_1) {
                platform_location_2 = platform_location_2_1;
            },
            function (router_providers_common_1_1) {
                router_providers_common_1 = router_providers_common_1_1;
            }],
        execute: function() {
            exports_1("WORKER_APP_ROUTER", WORKER_APP_ROUTER = [
                router_providers_common_1.ROUTER_PROVIDERS_COMMON,
                new core_1.Provider(platform_location_1.PlatformLocation, { useClass: platform_location_2.WebWorkerPlatformLocation }),
                new core_1.Provider(core_1.APP_INITIALIZER, {
                    useFactory: function (platformLocation, zone) { return function () {
                        return initRouter(platformLocation, zone);
                    }; },
                    multi: true,
                    deps: [platform_location_1.PlatformLocation, core_1.NgZone]
                })
            ]);
        }
    }
});
//# sourceMappingURL=router_providers.js.map