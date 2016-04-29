System.register(['angular2/src/router/location/browser_platform_location', 'angular2/src/core/di', 'angular2/src/web_workers/shared/messaging_api', 'angular2/src/web_workers/shared/service_message_broker', 'angular2/src/web_workers/shared/serializer', './bind', 'angular2/src/web_workers/shared/serialized_types', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_platform_location_1, di_1, messaging_api_1, service_message_broker_1, serializer_1, bind_1, serialized_types_1, message_bus_1, async_1;
    var MessageBasedPlatformLocation;
    return {
        setters:[
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            },
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (bind_1_1) {
                bind_1 = bind_1_1;
            },
            function (serialized_types_1_1) {
                serialized_types_1 = serialized_types_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            MessageBasedPlatformLocation = (function () {
                function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
                    this._brokerFactory = _brokerFactory;
                    this._platformLocation = _platformLocation;
                    this._serializer = _serializer;
                    this._platformLocation.onPopState(bind_1.bind(this._sendUrlChangeEvent, this));
                    this._platformLocation.onHashChange(bind_1.bind(this._sendUrlChangeEvent, this));
                    this._broker = this._brokerFactory.createMessageBroker(messaging_api_1.ROUTER_CHANNEL);
                    this._channelSink = bus.to(messaging_api_1.ROUTER_CHANNEL);
                }
                MessageBasedPlatformLocation.prototype.start = function () {
                    this._broker.registerMethod("getLocation", null, bind_1.bind(this._getLocation, this), serialized_types_1.LocationType);
                    this._broker.registerMethod("setPathname", [serializer_1.PRIMITIVE], bind_1.bind(this._setPathname, this));
                    this._broker.registerMethod("pushState", [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._platformLocation.pushState, this._platformLocation));
                    this._broker.registerMethod("replaceState", [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._platformLocation.replaceState, this._platformLocation));
                    this._broker.registerMethod("forward", null, bind_1.bind(this._platformLocation.forward, this._platformLocation));
                    this._broker.registerMethod("back", null, bind_1.bind(this._platformLocation.back, this._platformLocation));
                };
                MessageBasedPlatformLocation.prototype._getLocation = function () {
                    return async_1.PromiseWrapper.resolve(this._platformLocation.location);
                };
                MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
                    var loc = this._serializer.serialize(this._platformLocation.location, serialized_types_1.LocationType);
                    var serializedEvent = { 'type': e.type };
                    async_1.ObservableWrapper.callEmit(this._channelSink, { 'event': serializedEvent, 'location': loc });
                };
                MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
                MessageBasedPlatformLocation = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, browser_platform_location_1.BrowserPlatformLocation, message_bus_1.MessageBus, serializer_1.Serializer])
                ], MessageBasedPlatformLocation);
                return MessageBasedPlatformLocation;
            }());
            exports_1("MessageBasedPlatformLocation", MessageBasedPlatformLocation);
        }
    }
});
//# sourceMappingURL=platform_location.js.map