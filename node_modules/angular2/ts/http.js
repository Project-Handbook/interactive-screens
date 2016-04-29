System.register(['angular2/core', './src/http/http', './src/http/backends/xhr_backend', './src/http/backends/jsonp_backend', './src/http/backends/browser_xhr', './src/http/backends/browser_jsonp', './src/http/base_request_options', './src/http/base_response_options', './src/http/static_request', './src/http/static_response', './src/http/interfaces', './src/http/headers', './src/http/enums', './src/http/url_search_params'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, xhr_backend_1, jsonp_backend_1, browser_xhr_1, browser_jsonp_1, base_request_options_1, base_response_options_1;
    var HTTP_PROVIDERS, HTTP_BINDINGS, JSONP_PROVIDERS, JSON_BINDINGS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                exports_1({
                    "Http": http_1_1["Http"],
                    "Jsonp": http_1_1["Jsonp"]
                });
            },
            function (xhr_backend_1_1) {
                xhr_backend_1 = xhr_backend_1_1;
                exports_1({
                    "XHRBackend": xhr_backend_1_1["XHRBackend"],
                    "XHRConnection": xhr_backend_1_1["XHRConnection"]
                });
            },
            function (jsonp_backend_1_1) {
                jsonp_backend_1 = jsonp_backend_1_1;
                exports_1({
                    "JSONPBackend": jsonp_backend_1_1["JSONPBackend"],
                    "JSONPConnection": jsonp_backend_1_1["JSONPConnection"]
                });
            },
            function (browser_xhr_1_1) {
                browser_xhr_1 = browser_xhr_1_1;
                exports_1({
                    "BrowserXhr": browser_xhr_1_1["BrowserXhr"]
                });
            },
            function (browser_jsonp_1_1) {
                browser_jsonp_1 = browser_jsonp_1_1;
            },
            function (base_request_options_1_1) {
                base_request_options_1 = base_request_options_1_1;
                exports_1({
                    "BaseRequestOptions": base_request_options_1_1["BaseRequestOptions"],
                    "RequestOptions": base_request_options_1_1["RequestOptions"]
                });
            },
            function (base_response_options_1_1) {
                base_response_options_1 = base_response_options_1_1;
                exports_1({
                    "BaseResponseOptions": base_response_options_1_1["BaseResponseOptions"],
                    "ResponseOptions": base_response_options_1_1["ResponseOptions"]
                });
            },
            function (static_request_1_1) {
                exports_1({
                    "Request": static_request_1_1["Request"]
                });
            },
            function (static_response_1_1) {
                exports_1({
                    "Response": static_response_1_1["Response"]
                });
            },
            function (interfaces_1_1) {
                exports_1({
                    "RequestOptionsArgs": interfaces_1_1["RequestOptionsArgs"],
                    "ResponseOptionsArgs": interfaces_1_1["ResponseOptionsArgs"],
                    "Connection": interfaces_1_1["Connection"],
                    "ConnectionBackend": interfaces_1_1["ConnectionBackend"]
                });
            },
            function (headers_1_1) {
                exports_1({
                    "Headers": headers_1_1["Headers"]
                });
            },
            function (enums_1_1) {
                exports_1({
                    "ResponseType": enums_1_1["ResponseType"],
                    "ReadyState": enums_1_1["ReadyState"],
                    "RequestMethod": enums_1_1["RequestMethod"]
                });
            },
            function (url_search_params_1_1) {
                exports_1({
                    "URLSearchParams": url_search_params_1_1["URLSearchParams"]
                });
            }],
        execute: function() {
            /**
             * Provides a basic set of injectables to use the {@link Http} service in any application.
             *
             * The `HTTP_PROVIDERS` should be included either in a component's injector,
             * or in the root injector when bootstrapping an application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/snj7Nv?p=preview))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {NgFor} from 'angular2/common';
             * import {HTTP_PROVIDERS, Http} from 'angular2/http';
             *
             * @Component({
             *   selector: 'app',
             *   providers: [HTTP_PROVIDERS],
             *   template: `
             *     <div>
             *       <h1>People</h1>
             *       <ul>
             *         <li *ngFor="#person of people">
             *           {{person.name}}
             *         </li>
             *       </ul>
             *     </div>
             *   `,
             *   directives: [NgFor]
             * })
             * export class App {
             *   people: Object[];
             *   constructor(http:Http) {
             *     http.get('people.json').subscribe(res => {
             *       this.people = res.json();
             *     });
             *   }
             *   active:boolean = false;
             *   toggleActiveState() {
             *     this.active = !this.active;
             *   }
             * }
             *
             * bootstrap(App)
             *   .catch(err => console.error(err));
             * ```
             *
             * The primary public API included in `HTTP_PROVIDERS` is the {@link Http} class.
             * However, other providers required by `Http` are included,
             * which may be beneficial to override in certain cases.
             *
             * The providers included in `HTTP_PROVIDERS` include:
             *  * {@link Http}
             *  * {@link XHRBackend}
             *  * `BrowserXHR` - Private factory to create `XMLHttpRequest` instances
             *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
             *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
             *
             * There may be cases where it makes sense to extend the base request options,
             * such as to add a search string to be appended to all URLs.
             * To accomplish this, a new provider for {@link RequestOptions} should
             * be added in the same injector as `HTTP_PROVIDERS`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/aCMEXi?p=preview))
             *
             * ```
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
             *
             * class MyOptions extends BaseRequestOptions {
             *   search: string = 'coreTeam=true';
             * }
             *
             * bootstrap(App, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})])
             *   .catch(err => console.error(err));
             * ```
             *
             * Likewise, to use a mock backend for unit tests, the {@link XHRBackend}
             * provider should be bound to {@link MockBackend}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/7LWALD?p=preview))
             *
             * ```
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {HTTP_PROVIDERS, Http, Response, XHRBackend} from 'angular2/http';
             * import {MockBackend} from 'angular2/http/testing';
             *
             * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
             *
             * var injector = Injector.resolveAndCreate([
             *   HTTP_PROVIDERS,
             *   MockBackend,
             *   provide(XHRBackend, {useExisting: MockBackend})
             * ]);
             * var http = injector.get(Http);
             * var backend = injector.get(MockBackend);
             *
             * // Listen for any new requests
             * backend.connections.observer({
             *   next: connection => {
             *     var response = new Response({body: people});
             *     setTimeout(() => {
             *       // Send a response to the request
             *       connection.mockRespond(response);
             *     });
             *   }
             * });
             *
             * http.get('people.json').observer({
             *   next: res => {
             *     // Response came from mock backend
             *     console.log('first person', res.json()[0].name);
             *   }
             * });
             * ```
             */
            exports_1("HTTP_PROVIDERS", HTTP_PROVIDERS = [
                // TODO(pascal): use factory type annotations once supported in DI
                // issue: https://github.com/angular/angular/issues/3183
                core_1.provide(http_1.Http, {
                    useFactory: function (xhrBackend, requestOptions) {
                        return new http_1.Http(xhrBackend, requestOptions);
                    },
                    deps: [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions]
                }),
                browser_xhr_1.BrowserXhr,
                core_1.provide(base_request_options_1.RequestOptions, { useClass: base_request_options_1.BaseRequestOptions }),
                core_1.provide(base_response_options_1.ResponseOptions, { useClass: base_response_options_1.BaseResponseOptions }),
                xhr_backend_1.XHRBackend
            ]);
            /**
             * See {@link HTTP_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("HTTP_BINDINGS", HTTP_BINDINGS = HTTP_PROVIDERS);
            /**
             * Provides a basic set of providers to use the {@link Jsonp} service in any application.
             *
             * The `JSONP_PROVIDERS` should be included either in a component's injector,
             * or in the root injector when bootstrapping an application.
             *
             * ### Example ([live demo](http://plnkr.co/edit/vmeN4F?p=preview))
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {NgFor} from 'angular2/common';
             * import {JSONP_PROVIDERS, Jsonp} from 'angular2/http';
             *
             * @Component({
             *   selector: 'app',
             *   providers: [JSONP_PROVIDERS],
             *   template: `
             *     <div>
             *       <h1>People</h1>
             *       <ul>
             *         <li *ngFor="#person of people">
             *           {{person.name}}
             *         </li>
             *       </ul>
             *     </div>
             *   `,
             *   directives: [NgFor]
             * })
             * export class App {
             *   people: Array<Object>;
             *   constructor(jsonp:Jsonp) {
             *     jsonp.request('people.json').subscribe(res => {
             *       this.people = res.json();
             *     })
             *   }
             * }
             * ```
             *
             * The primary public API included in `JSONP_PROVIDERS` is the {@link Jsonp} class.
             * However, other providers required by `Jsonp` are included,
             * which may be beneficial to override in certain cases.
             *
             * The providers included in `JSONP_PROVIDERS` include:
             *  * {@link Jsonp}
             *  * {@link JSONPBackend}
             *  * `BrowserJsonp` - Private factory
             *  * {@link RequestOptions} - Bound to {@link BaseRequestOptions} class
             *  * {@link ResponseOptions} - Bound to {@link BaseResponseOptions} class
             *
             * There may be cases where it makes sense to extend the base request options,
             * such as to add a search string to be appended to all URLs.
             * To accomplish this, a new provider for {@link RequestOptions} should
             * be added in the same injector as `JSONP_PROVIDERS`.
             *
             * ### Example ([live demo](http://plnkr.co/edit/TFug7x?p=preview))
             *
             * ```
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {JSONP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
             *
             * class MyOptions extends BaseRequestOptions {
             *   search: string = 'coreTeam=true';
             * }
             *
             * bootstrap(App, [JSONP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})])
             *   .catch(err => console.error(err));
             * ```
             *
             * Likewise, to use a mock backend for unit tests, the {@link JSONPBackend}
             * provider should be bound to {@link MockBackend}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/HDqZWL?p=preview))
             *
             * ```
             * import {provide, Injector} from 'angular2/core';
             * import {JSONP_PROVIDERS, Jsonp, Response, JSONPBackend} from 'angular2/http';
             * import {MockBackend} from 'angular2/http/testing';
             *
             * var people = [{name: 'Jeff'}, {name: 'Tobias'}];
             * var injector = Injector.resolveAndCreate([
             *   JSONP_PROVIDERS,
             *   MockBackend,
             *   provide(JSONPBackend, {useExisting: MockBackend})
             * ]);
             * var jsonp = injector.get(Jsonp);
             * var backend = injector.get(MockBackend);
             *
             * // Listen for any new requests
             * backend.connections.observer({
             *   next: connection => {
             *     var response = new Response({body: people});
             *     setTimeout(() => {
             *       // Send a response to the request
             *       connection.mockRespond(response);
             *     });
             *   }
             * });
            
             * jsonp.get('people.json').observer({
             *   next: res => {
             *     // Response came from mock backend
             *     console.log('first person', res.json()[0].name);
             *   }
             * });
             * ```
             */
            exports_1("JSONP_PROVIDERS", JSONP_PROVIDERS = [
                // TODO(pascal): use factory type annotations once supported in DI
                // issue: https://github.com/angular/angular/issues/3183
                core_1.provide(http_1.Jsonp, {
                    useFactory: function (jsonpBackend, requestOptions) {
                        return new http_1.Jsonp(jsonpBackend, requestOptions);
                    },
                    deps: [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions]
                }),
                browser_jsonp_1.BrowserJsonp,
                core_1.provide(base_request_options_1.RequestOptions, { useClass: base_request_options_1.BaseRequestOptions }),
                core_1.provide(base_response_options_1.ResponseOptions, { useClass: base_response_options_1.BaseResponseOptions }),
                core_1.provide(jsonp_backend_1.JSONPBackend, { useClass: jsonp_backend_1.JSONPBackend_ })
            ]);
            /**
             * See {@link JSONP_PROVIDERS} instead.
             *
             * @deprecated
             */
            exports_1("JSON_BINDINGS", JSON_BINDINGS = JSONP_PROVIDERS);
        }
    }
});
//# sourceMappingURL=http.js.map