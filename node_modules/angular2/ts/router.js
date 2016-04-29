/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */
System.register(['./src/router/router', './src/router/directives/router_outlet', './src/router/directives/router_link', './src/router/instruction', './src/router/location/platform_location', './src/router/route_registry', './src/router/location/location_strategy', './src/router/location/hash_location_strategy', './src/router/location/path_location_strategy', './src/router/location/location', './src/router/route_config/route_config_decorator', './src/router/lifecycle/lifecycle_annotations', 'angular2/core', 'angular2/src/router/router_providers_common', 'angular2/src/router/router_providers', './src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_outlet_1, router_link_1, lang_1;
    var ROUTER_DIRECTIVES;
    var exportedNames_1 = {
        'ROUTER_DIRECTIVES': true,
        'Router': true,
        'RouterOutlet': true,
        'RouterLink': true,
        'RouteParams': true,
        'RouteData': true,
        'PlatformLocation': true,
        'RouteRegistry': true,
        'ROUTER_PRIMARY_COMPONENT': true,
        'LocationStrategy': true,
        'APP_BASE_HREF': true,
        'HashLocationStrategy': true,
        'PathLocationStrategy': true,
        'Location': true,
        'CanActivate': true,
        'Instruction': true,
        'ComponentInstruction': true,
        'OpaqueToken': true,
        'ROUTER_PROVIDERS_COMMON': true,
        'ROUTER_PROVIDERS': true,
        'ROUTER_BINDINGS': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (router_1_1) {
                exports_1({
                    "Router": router_1_1["Router"]
                });
            },
            function (router_outlet_2_1) {
                exports_1({
                    "RouterOutlet": router_outlet_2_1["RouterOutlet"]
                });
                router_outlet_1 = router_outlet_2_1;
            },
            function (router_link_2_1) {
                exports_1({
                    "RouterLink": router_link_2_1["RouterLink"]
                });
                router_link_1 = router_link_2_1;
            },
            function (instruction_1_1) {
                exports_1({
                    "RouteParams": instruction_1_1["RouteParams"],
                    "RouteData": instruction_1_1["RouteData"]
                });
                exports_1({
                    "Instruction": instruction_1_1["Instruction"],
                    "ComponentInstruction": instruction_1_1["ComponentInstruction"]
                });
            },
            function (platform_location_1_1) {
                exports_1({
                    "PlatformLocation": platform_location_1_1["PlatformLocation"]
                });
            },
            function (route_registry_1_1) {
                exports_1({
                    "RouteRegistry": route_registry_1_1["RouteRegistry"],
                    "ROUTER_PRIMARY_COMPONENT": route_registry_1_1["ROUTER_PRIMARY_COMPONENT"]
                });
            },
            function (location_strategy_1_1) {
                exports_1({
                    "LocationStrategy": location_strategy_1_1["LocationStrategy"],
                    "APP_BASE_HREF": location_strategy_1_1["APP_BASE_HREF"]
                });
            },
            function (hash_location_strategy_1_1) {
                exports_1({
                    "HashLocationStrategy": hash_location_strategy_1_1["HashLocationStrategy"]
                });
            },
            function (path_location_strategy_1_1) {
                exports_1({
                    "PathLocationStrategy": path_location_strategy_1_1["PathLocationStrategy"]
                });
            },
            function (location_1_1) {
                exports_1({
                    "Location": location_1_1["Location"]
                });
            },
            function (route_config_decorator_1_1) {
                exportStar_1(route_config_decorator_1_1);
            },
            function (lifecycle_annotations_1_1) {
                exports_1({
                    "CanActivate": lifecycle_annotations_1_1["CanActivate"]
                });
            },
            function (core_1_1) {
                exports_1({
                    "OpaqueToken": core_1_1["OpaqueToken"]
                });
            },
            function (router_providers_common_1_1) {
                exports_1({
                    "ROUTER_PROVIDERS_COMMON": router_providers_common_1_1["ROUTER_PROVIDERS_COMMON"]
                });
            },
            function (router_providers_1_1) {
                exports_1({
                    "ROUTER_PROVIDERS": router_providers_1_1["ROUTER_PROVIDERS"],
                    "ROUTER_BINDINGS": router_providers_1_1["ROUTER_BINDINGS"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A list of directives. To use the router directives like {@link RouterOutlet} and
             * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
             * component.
             *
             * ### Example ([live demo](http://plnkr.co/edit/iRUP8B5OUbxCWQ3AcIDm))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *    // ...
             * }
             *
             * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
             * ```
             */
            exports_1("ROUTER_DIRECTIVES", ROUTER_DIRECTIVES = lang_1.CONST_EXPR([router_outlet_1.RouterOutlet, router_link_1.RouterLink]));
        }
    }
});
//# sourceMappingURL=router.js.map