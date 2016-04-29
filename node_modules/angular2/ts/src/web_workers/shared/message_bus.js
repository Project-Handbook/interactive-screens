System.register(['angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MessageBus;
    return {
        setters:[
            function (async_1_1) {
                exports_1({
                    "EventEmitter": async_1_1["EventEmitter"],
                    "Observable": async_1_1["Observable"]
                });
            }],
        execute: function() {
            /**
             * Message Bus is a low level API used to communicate between the UI and the background.
             * Communication is based on a channel abstraction. Messages published in a
             * given channel to one MessageBusSink are received on the same channel
             * by the corresponding MessageBusSource.
             */
            MessageBus = (function () {
                function MessageBus() {
                }
                return MessageBus;
            }());
            exports_1("MessageBus", MessageBus);
        }
    }
});
//# sourceMappingURL=message_bus.js.map