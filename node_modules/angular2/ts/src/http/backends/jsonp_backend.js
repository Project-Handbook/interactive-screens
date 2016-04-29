System.register(['../interfaces', '../enums', '../static_response', '../base_response_options', 'angular2/core', './browser_jsonp', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var interfaces_1, enums_1, static_response_1, base_response_options_1, core_1, browser_jsonp_1, exceptions_1, lang_1, Observable_1;
    var JSONP_ERR_NO_CALLBACK, JSONP_ERR_WRONG_METHOD, JSONPConnection, JSONPConnection_, JSONPBackend, JSONPBackend_;
    return {
        setters:[
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (static_response_1_1) {
                static_response_1 = static_response_1_1;
            },
            function (base_response_options_1_1) {
                base_response_options_1 = base_response_options_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_jsonp_1_1) {
                browser_jsonp_1 = browser_jsonp_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
            JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
            /**
             * Abstract base class for an in-flight JSONP request.
             */
            JSONPConnection = (function () {
                function JSONPConnection() {
                }
                return JSONPConnection;
            }());
            exports_1("JSONPConnection", JSONPConnection);
            JSONPConnection_ = (function (_super) {
                __extends(JSONPConnection_, _super);
                function JSONPConnection_(req, _dom, baseResponseOptions) {
                    var _this = this;
                    _super.call(this);
                    this._dom = _dom;
                    this.baseResponseOptions = baseResponseOptions;
                    this._finished = false;
                    if (req.method !== enums_1.RequestMethod.Get) {
                        throw exceptions_1.makeTypeError(JSONP_ERR_WRONG_METHOD);
                    }
                    this.request = req;
                    this.response = new Observable_1.Observable(function (responseObserver) {
                        _this.readyState = enums_1.ReadyState.Loading;
                        var id = _this._id = _dom.nextRequestID();
                        _dom.exposeConnection(id, _this);
                        // Workaround Dart
                        // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
                        var callback = _dom.requestCallback(_this._id);
                        var url = req.url;
                        if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                            url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
                        }
                        else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                            url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
                        }
                        var script = _this._script = _dom.build(url);
                        var onLoad = function (event) {
                            if (_this.readyState === enums_1.ReadyState.Cancelled)
                                return;
                            _this.readyState = enums_1.ReadyState.Done;
                            _dom.cleanup(script);
                            if (!_this._finished) {
                                var responseOptions_1 = new base_response_options_1.ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: enums_1.ResponseType.Error, url: url });
                                if (lang_1.isPresent(baseResponseOptions)) {
                                    responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                                }
                                responseObserver.error(new static_response_1.Response(responseOptions_1));
                                return;
                            }
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: _this._responseData, url: url });
                            if (lang_1.isPresent(_this.baseResponseOptions)) {
                                responseOptions = _this.baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.next(new static_response_1.Response(responseOptions));
                            responseObserver.complete();
                        };
                        var onError = function (error) {
                            if (_this.readyState === enums_1.ReadyState.Cancelled)
                                return;
                            _this.readyState = enums_1.ReadyState.Done;
                            _dom.cleanup(script);
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: error.message, type: enums_1.ResponseType.Error });
                            if (lang_1.isPresent(baseResponseOptions)) {
                                responseOptions = baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.error(new static_response_1.Response(responseOptions));
                        };
                        script.addEventListener('load', onLoad);
                        script.addEventListener('error', onError);
                        _dom.send(script);
                        return function () {
                            _this.readyState = enums_1.ReadyState.Cancelled;
                            script.removeEventListener('load', onLoad);
                            script.removeEventListener('error', onError);
                            if (lang_1.isPresent(script)) {
                                _this._dom.cleanup(script);
                            }
                        };
                    });
                }
                JSONPConnection_.prototype.finished = function (data) {
                    // Don't leak connections
                    this._finished = true;
                    this._dom.removeConnection(this._id);
                    if (this.readyState === enums_1.ReadyState.Cancelled)
                        return;
                    this._responseData = data;
                };
                return JSONPConnection_;
            }(JSONPConnection));
            exports_1("JSONPConnection_", JSONPConnection_);
            /**
             * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
             */
            JSONPBackend = (function (_super) {
                __extends(JSONPBackend, _super);
                function JSONPBackend() {
                    _super.apply(this, arguments);
                }
                return JSONPBackend;
            }(interfaces_1.ConnectionBackend));
            exports_1("JSONPBackend", JSONPBackend);
            JSONPBackend_ = (function (_super) {
                __extends(JSONPBackend_, _super);
                function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
                    _super.call(this);
                    this._browserJSONP = _browserJSONP;
                    this._baseResponseOptions = _baseResponseOptions;
                }
                JSONPBackend_.prototype.createConnection = function (request) {
                    return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
                };
                JSONPBackend_ = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [browser_jsonp_1.BrowserJsonp, base_response_options_1.ResponseOptions])
                ], JSONPBackend_);
                return JSONPBackend_;
            }(JSONPBackend));
            exports_1("JSONPBackend_", JSONPBackend_);
        }
    }
});
//# sourceMappingURL=jsonp_backend.js.map