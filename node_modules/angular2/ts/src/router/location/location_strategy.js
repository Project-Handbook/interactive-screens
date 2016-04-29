System.register(['angular2/src/facade/lang', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, core_1;
    var LocationStrategy, APP_BASE_HREF;
    function normalizeQueryParams(params) {
        return (params.length > 0 && params.substring(0, 1) != '?') ? ('?' + params) : params;
    }
    exports_1("normalizeQueryParams", normalizeQueryParams);
    function joinWithSlash(start, end) {
        if (start.length == 0) {
            return end;
        }
        if (end.length == 0) {
            return start;
        }
        var slashes = 0;
        if (start.endsWith('/')) {
            slashes++;
        }
        if (end.startsWith('/')) {
            slashes++;
        }
        if (slashes == 2) {
            return start + end.substring(1);
        }
        if (slashes == 1) {
            return start + end;
        }
        return start + '/' + end;
    }
    exports_1("joinWithSlash", joinWithSlash);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * `LocationStrategy` is responsible for representing and reading route state
             * from the browser's URL. Angular provides two strategies:
             * {@link HashLocationStrategy} and {@link PathLocationStrategy} (default).
             *
             * This is used under the hood of the {@link Location} service.
             *
             * Applications should use the {@link Router} or {@link Location} services to
             * interact with application route state.
             *
             * For instance, {@link HashLocationStrategy} produces URLs like
             * `http://example.com#/foo`, and {@link PathLocationStrategy} produces
             * `http://example.com/foo` as an equivalent URL.
             *
             * See these two classes for more.
             */
            LocationStrategy = (function () {
                function LocationStrategy() {
                }
                return LocationStrategy;
            }());
            exports_1("LocationStrategy", LocationStrategy);
            /**
             * The `APP_BASE_HREF` token represents the base href to be used with the
             * {@link PathLocationStrategy}.
             *
             * If you're using {@link PathLocationStrategy}, you must provide a provider to a string
             * representing the URL prefix that should be preserved when generating and recognizing
             * URLs.
             *
             * ### Example
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
             *   // ...
             * }
             *
             * bootstrap(AppCmp, [
             *   ROUTER_PROVIDERS,
             *   provide(APP_BASE_HREF, {useValue: '/my/app'})
             * ]);
             * ```
             */
            exports_1("APP_BASE_HREF", APP_BASE_HREF = lang_1.CONST_EXPR(new core_1.OpaqueToken('appBaseHref')));
        }
    }
});
//# sourceMappingURL=location_strategy.js.map