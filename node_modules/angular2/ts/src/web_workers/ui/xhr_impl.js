System.register(['angular2/src/core/di', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/messaging_api', 'angular2/src/compiler/xhr', 'angular2/src/web_workers/shared/service_message_broker', './bind'], function(exports_1, context_1) {
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
    var di_1, serializer_1, messaging_api_1, xhr_1, service_message_broker_1, bind_1;
    var MessageBasedXHRImpl;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (bind_1_1) {
                bind_1 = bind_1_1;
            }],
        execute: function() {
            MessageBasedXHRImpl = (function () {
                function MessageBasedXHRImpl(_brokerFactory, _xhr) {
                    this._brokerFactory = _brokerFactory;
                    this._xhr = _xhr;
                }
                MessageBasedXHRImpl.prototype.start = function () {
                    var broker = this._brokerFactory.createMessageBroker(messaging_api_1.XHR_CHANNEL);
                    broker.registerMethod("get", [serializer_1.PRIMITIVE], bind_1.bind(this._xhr.get, this._xhr), serializer_1.PRIMITIVE);
                };
                MessageBasedXHRImpl = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, xhr_1.XHR])
                ], MessageBasedXHRImpl);
                return MessageBasedXHRImpl;
            }());
            exports_1("MessageBasedXHRImpl", MessageBasedXHRImpl);
        }
    }
});
//# sourceMappingURL=xhr_impl.js.map