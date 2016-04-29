System.register(['angular2/src/web_workers/shared/post_message_bus', 'angular2/src/web_workers/shared/message_bus', 'angular2/core', 'angular2/src/core/di', 'angular2/src/platform/worker_render_common', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var post_message_bus_1, message_bus_1, core_1, di_1, worker_render_common_1, exceptions_1, lang_1;
    var WebWorkerInstance, WORKER_RENDER_APPLICATION;
    function initWebWorkerApplication(injector) {
        var scriptUri;
        try {
            scriptUri = injector.get(worker_render_common_1.WORKER_SCRIPT);
        }
        catch (e) {
            throw new exceptions_1.BaseException("You must provide your WebWorker's initialization script with the WORKER_SCRIPT token");
        }
        var instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        worker_render_common_1.initializeGenericWorkerRenderer(injector);
    }
    /**
     * Spawns a new class and initializes the WebWorkerInstance
     */
    function spawnWebWorker(uri, instance) {
        var webWorker = new Worker(uri);
        var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
        var source = new post_message_bus_1.PostMessageBusSource(webWorker);
        var bus = new post_message_bus_1.PostMessageBus(sink, source);
        instance.init(webWorker, bus);
    }
    return {
        setters:[
            function (post_message_bus_1_1) {
                post_message_bus_1 = post_message_bus_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (worker_render_common_1_1) {
                worker_render_common_1 = worker_render_common_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Wrapper class that exposes the Worker
             * and underlying {@link MessageBus} for lower level message passing.
             */
            WebWorkerInstance = (function () {
                function WebWorkerInstance() {
                }
                /** @internal */
                WebWorkerInstance.prototype.init = function (worker, bus) {
                    this.worker = worker;
                    this.bus = bus;
                };
                WebWorkerInstance = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WebWorkerInstance);
                return WebWorkerInstance;
            }());
            exports_1("WebWorkerInstance", WebWorkerInstance);
            /**
             * An array of providers that should be passed into `application()` when initializing a new Worker.
             */
            exports_1("WORKER_RENDER_APPLICATION", WORKER_RENDER_APPLICATION = lang_1.CONST_EXPR([
                worker_render_common_1.WORKER_RENDER_APPLICATION_COMMON,
                WebWorkerInstance,
                new di_1.Provider(core_1.APP_INITIALIZER, {
                    useFactory: function (injector) { return function () { return initWebWorkerApplication(injector); }; },
                    multi: true,
                    deps: [di_1.Injector]
                }),
                new di_1.Provider(message_bus_1.MessageBus, { useFactory: function (instance) { return instance.bus; }, deps: [WebWorkerInstance] })
            ]));
        }
    }
});
//# sourceMappingURL=worker_render.js.map