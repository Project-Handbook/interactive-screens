System.register(['angular2/core', './location_strategy', 'angular2/src/facade/lang', './platform_location'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, location_strategy_1, lang_1, platform_location_1;
    var HashLocationStrategy;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (platform_location_1_1) {
                platform_location_1 = platform_location_1_1;
            }],
        execute: function() {
            /**
             * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
             * {@link Location} service to represent its state in the
             * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
             * of the browser's URL.
             *
             * For instance, if you call `location.go('/foo')`, the browser's URL will become
             * `example.com#/foo`.
             *
             * ### Example
             *
             * ```
             * import {Component, provide} from 'angular2/core';
             * import {
             *   ROUTER_DIRECTIVES,
             *   ROUTER_PROVIDERS,
             *   RouteConfig,
             *   Location,
             *   LocationStrategy,
             *   HashLocationStrategy
             * } from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   constructor(location: Location) {
             *     location.go('/foo');
             *   }
             * }
             *
             * bootstrap(AppCmp, [
             *   ROUTER_PROVIDERS,
             *   provide(LocationStrategy, {useClass: HashLocationStrategy})
             * ]);
             * ```
             */
            HashLocationStrategy = (function (_super) {
                __extends(HashLocationStrategy, _super);
                function HashLocationStrategy(_platformLocation, _baseHref) {
                    _super.call(this);
                    this._platformLocation = _platformLocation;
                    this._baseHref = '';
                    if (lang_1.isPresent(_baseHref)) {
                        this._baseHref = _baseHref;
                    }
                }
                HashLocationStrategy.prototype.onPopState = function (fn) {
                    this._platformLocation.onPopState(fn);
                    this._platformLocation.onHashChange(fn);
                };
                HashLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
                HashLocationStrategy.prototype.path = function () {
                    // the hash value is always prefixed with a `#`
                    // and if it is empty then it will stay empty
                    var path = this._platformLocation.hash;
                    if (!lang_1.isPresent(path))
                        path = '#';
                    // Dart will complain if a call to substring is
                    // executed with a position value that extends the
                    // length of string.
                    return (path.length > 0 ? path.substring(1) : path);
                };
                HashLocationStrategy.prototype.prepareExternalUrl = function (internal) {
                    var url = location_strategy_1.joinWithSlash(this._baseHref, internal);
                    return url.length > 0 ? ('#' + url) : url;
                };
                HashLocationStrategy.prototype.pushState = function (state, title, path, queryParams) {
                    var url = this.prepareExternalUrl(path + location_strategy_1.normalizeQueryParams(queryParams));
                    if (url.length == 0) {
                        url = this._platformLocation.pathname;
                    }
                    this._platformLocation.pushState(state, title, url);
                };
                HashLocationStrategy.prototype.replaceState = function (state, title, path, queryParams) {
                    var url = this.prepareExternalUrl(path + location_strategy_1.normalizeQueryParams(queryParams));
                    if (url.length == 0) {
                        url = this._platformLocation.pathname;
                    }
                    this._platformLocation.replaceState(state, title, url);
                };
                HashLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
                HashLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
                HashLocationStrategy = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Inject(location_strategy_1.APP_BASE_HREF)), 
                    __metadata('design:paramtypes', [platform_location_1.PlatformLocation, String])
                ], HashLocationStrategy);
                return HashLocationStrategy;
            }(location_strategy_1.LocationStrategy));
            exports_1("HashLocationStrategy", HashLocationStrategy);
        }
    }
});
//# sourceMappingURL=hash_location_strategy.js.map