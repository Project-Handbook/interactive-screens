System.register(['./router_providers_common', 'angular2/core', 'angular2/src/facade/lang', './location/browser_platform_location', './location/platform_location'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_providers_common_1, core_1, lang_1, browser_platform_location_1, platform_location_1;
    var ROUTER_PROVIDERS, ROUTER_BINDINGS;
    return {
        setters:[
            function (router_providers_common_1_1) {
                router_providers_common_1 = router_providers_common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            }],
        execute: function() {
            /**
             * A list of {@link Provider}s. To use the router, you must add this to your application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            exports_1("ROUTER_PROVIDERS", ROUTER_PROVIDERS = lang_1.CONST_EXPR([
                router_providers_common_1.ROUTER_PROVIDERS_COMMON,
                lang_1.CONST_EXPR(new core_1.Provider(platform_location_1.PlatformLocation, { useClass: browser_platform_location_1.BrowserPlatformLocation })),
            ]));
            /**
             * Use {@link ROUTER_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("ROUTER_BINDINGS", ROUTER_BINDINGS = ROUTER_PROVIDERS);
        }
    }
});
//# sourceMappingURL=router_providers.js.map