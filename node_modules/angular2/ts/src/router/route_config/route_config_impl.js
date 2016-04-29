System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var lang_1;
    var __make_dart_analyzer_happy, RouteConfig, AbstractRoute, Route, AuxRoute, AsyncRoute, Redirect;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            __make_dart_analyzer_happy = null;
            /**
             * The `RouteConfig` decorator defines routes for a given component.
             *
             * It takes an array of {@link RouteDefinition}s.
             */
            RouteConfig = (function () {
                function RouteConfig(configs) {
                    this.configs = configs;
                }
                RouteConfig = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Array])
                ], RouteConfig);
                return RouteConfig;
            }());
            exports_1("RouteConfig", RouteConfig);
            AbstractRoute = (function () {
                function AbstractRoute(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data;
                    this.name = name;
                    this.useAsDefault = useAsDefault;
                    this.path = path;
                    this.regex = regex;
                    this.serializer = serializer;
                    this.data = data;
                }
                AbstractRoute = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], AbstractRoute);
                return AbstractRoute;
            }());
            exports_1("AbstractRoute", AbstractRoute);
            /**
             * `Route` is a type of {@link RouteDefinition} used to route a path to a component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `component` a component type.
             * - `name` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via {@link RouteData}.
             * - `useAsDefault` is a boolean value. If `true`, the child route will be navigated to if no child
             * route is specified during the navigation.
             *
             * ### Example
             * ```
             * import {RouteConfig, Route} from 'angular2/router';
             *
             * @RouteConfig([
             *   new Route({path: '/home', component: HomeCmp, name: 'HomeCmp' })
             * ])
             * class MyApp {}
             * ```
             */
            Route = (function (_super) {
                __extends(Route, _super);
                function Route(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, component = _a.component;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.aux = null;
                    this.component = component;
                }
                Route = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], Route);
                return Route;
            }(AbstractRoute));
            exports_1("Route", Route);
            /**
             * `AuxRoute` is a type of {@link RouteDefinition} used to define an auxiliary route.
             *
             * It takes an object with the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `component` a component type.
             * - `name` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via {@link RouteData}.
             *
             * ### Example
             * ```
             * import {RouteConfig, AuxRoute} from 'angular2/router';
             *
             * @RouteConfig([
             *   new AuxRoute({path: '/home', component: HomeCmp})
             * ])
             * class MyApp {}
             * ```
             */
            AuxRoute = (function (_super) {
                __extends(AuxRoute, _super);
                function AuxRoute(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, component = _a.component;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.component = component;
                }
                AuxRoute = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], AuxRoute);
                return AuxRoute;
            }(AbstractRoute));
            exports_1("AuxRoute", AuxRoute);
            /**
             * `AsyncRoute` is a type of {@link RouteDefinition} used to route a path to an asynchronously
             * loaded component.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `loader` is a function that returns a promise that resolves to a component.
             * - `name` is an optional `CamelCase` string representing the name of the route.
             * - `data` is an optional property of any type representing arbitrary route metadata for the given
             * route. It is injectable via {@link RouteData}.
             * - `useAsDefault` is a boolean value. If `true`, the child route will be navigated to if no child
             * route is specified during the navigation.
             *
             * ### Example
             * ```
             * import {RouteConfig, AsyncRoute} from 'angular2/router';
             *
             * @RouteConfig([
             *   new AsyncRoute({path: '/home', loader: () => Promise.resolve(MyLoadedCmp), name:
             * 'MyLoadedCmp'})
             * ])
             * class MyApp {}
             * ```
             */
            AsyncRoute = (function (_super) {
                __extends(AsyncRoute, _super);
                function AsyncRoute(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, loader = _a.loader;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.aux = null;
                    this.loader = loader;
                }
                AsyncRoute = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], AsyncRoute);
                return AsyncRoute;
            }(AbstractRoute));
            exports_1("AsyncRoute", AsyncRoute);
            /**
             * `Redirect` is a type of {@link RouteDefinition} used to route a path to a canonical route.
             *
             * It has the following properties:
             * - `path` is a string that uses the route matcher DSL.
             * - `redirectTo` is an array representing the link DSL.
             *
             * Note that redirects **do not** affect how links are generated. For that, see the `useAsDefault`
             * option.
             *
             * ### Example
             * ```
             * import {RouteConfig, Route, Redirect} from 'angular2/router';
             *
             * @RouteConfig([
             *   new Redirect({path: '/', redirectTo: ['/Home'] }),
             *   new Route({path: '/home', component: HomeCmp, name: 'Home'})
             * ])
             * class MyApp {}
             * ```
             */
            Redirect = (function (_super) {
                __extends(Redirect, _super);
                function Redirect(_a) {
                    var name = _a.name, useAsDefault = _a.useAsDefault, path = _a.path, regex = _a.regex, serializer = _a.serializer, data = _a.data, redirectTo = _a.redirectTo;
                    _super.call(this, {
                        name: name,
                        useAsDefault: useAsDefault,
                        path: path,
                        regex: regex,
                        serializer: serializer,
                        data: data
                    });
                    this.redirectTo = redirectTo;
                }
                Redirect = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], Redirect);
                return Redirect;
            }(AbstractRoute));
            exports_1("Redirect", Redirect);
        }
    }
});
//# sourceMappingURL=route_config_impl.js.map