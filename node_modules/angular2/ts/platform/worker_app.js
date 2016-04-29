System.register(['angular2/src/platform/worker_app_common', 'angular2/src/platform/worker_app', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/service_message_broker', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/core/angular_entrypoint', 'angular2/src/web_workers/worker/router_providers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'WORKER_APP_PLATFORM': true,
        'WORKER_APP_APPLICATION_COMMON': true,
        'WORKER_APP_APPLICATION': true,
        'ClientMessageBroker': true,
        'ClientMessageBrokerFactory': true,
        'FnArg': true,
        'UiArguments': true,
        'ReceivedMessage': true,
        'ServiceMessageBroker': true,
        'ServiceMessageBrokerFactory': true,
        'PRIMITIVE': true,
        'AngularEntrypoint': true,
        'WORKER_APP_ROUTER': true
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
            function (worker_app_common_1_1) {
                exports_1({
                    "WORKER_APP_PLATFORM": worker_app_common_1_1["WORKER_APP_PLATFORM"],
                    "WORKER_APP_APPLICATION_COMMON": worker_app_common_1_1["WORKER_APP_APPLICATION_COMMON"]
                });
            },
            function (worker_app_1_1) {
                exports_1({
                    "WORKER_APP_APPLICATION": worker_app_1_1["WORKER_APP_APPLICATION"]
                });
            },
            function (client_message_broker_1_1) {
                exports_1({
                    "ClientMessageBroker": client_message_broker_1_1["ClientMessageBroker"],
                    "ClientMessageBrokerFactory": client_message_broker_1_1["ClientMessageBrokerFactory"],
                    "FnArg": client_message_broker_1_1["FnArg"],
                    "UiArguments": client_message_broker_1_1["UiArguments"]
                });
            },
            function (service_message_broker_1_1) {
                exports_1({
                    "ReceivedMessage": service_message_broker_1_1["ReceivedMessage"],
                    "ServiceMessageBroker": service_message_broker_1_1["ServiceMessageBroker"],
                    "ServiceMessageBrokerFactory": service_message_broker_1_1["ServiceMessageBrokerFactory"]
                });
            },
            function (serializer_1_1) {
                exports_1({
                    "PRIMITIVE": serializer_1_1["PRIMITIVE"]
                });
            },
            function (message_bus_1_1) {
                exportStar_1(message_bus_1_1);
            },
            function (angular_entrypoint_1_1) {
                exports_1({
                    "AngularEntrypoint": angular_entrypoint_1_1["AngularEntrypoint"]
                });
            },
            function (router_providers_1_1) {
                exports_1({
                    "WORKER_APP_ROUTER": router_providers_1_1["WORKER_APP_ROUTER"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=worker_app.js.map