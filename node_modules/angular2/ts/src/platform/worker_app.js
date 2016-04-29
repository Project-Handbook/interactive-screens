System.register(['angular2/src/core/zone/ng_zone', 'angular2/src/core/di', 'angular2/src/platform/server/parse5_adapter', 'angular2/src/web_workers/shared/post_message_bus', './worker_app_common', 'angular2/core', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/compiler/compiler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ng_zone_1, di_1, parse5_adapter_1, post_message_bus_1, worker_app_common_1, core_1, message_bus_1, compiler_1;
    var _postMessage, WORKER_APP_APPLICATION;
    function createMessageBus(zone) {
        var sink = new post_message_bus_1.PostMessageBusSink(_postMessage);
        var source = new post_message_bus_1.PostMessageBusSource();
        var bus = new post_message_bus_1.PostMessageBus(sink, source);
        bus.attachToZone(zone);
        return bus;
    }
    function setupWebWorker() {
        parse5_adapter_1.Parse5DomAdapter.makeCurrent();
    }
    return {
        setters:[
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (parse5_adapter_1_1) {
                parse5_adapter_1 = parse5_adapter_1_1;
            },
            function (post_message_bus_1_1) {
                post_message_bus_1 = post_message_bus_1_1;
            },
            function (worker_app_common_1_1) {
                worker_app_common_1 = worker_app_common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            }],
        execute: function() {
            // TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
            _postMessage = {
                postMessage: function (message, transferrables) {
                    postMessage(message, transferrables);
                }
            };
            exports_1("WORKER_APP_APPLICATION", WORKER_APP_APPLICATION = [
                worker_app_common_1.WORKER_APP_APPLICATION_COMMON,
                compiler_1.COMPILER_PROVIDERS,
                new di_1.Provider(message_bus_1.MessageBus, { useFactory: createMessageBus, deps: [ng_zone_1.NgZone] }),
                new di_1.Provider(core_1.APP_INITIALIZER, { useValue: setupWebWorker, multi: true })
            ]);
        }
    }
});
//# sourceMappingURL=worker_app.js.map