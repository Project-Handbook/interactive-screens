System.register(['angular2/src/facade/lang', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/core/zone/ng_zone', 'angular2/core', 'angular2/platform/common_dom', 'angular2/src/core/di', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/platform/dom/events/key_events', 'angular2/src/platform/dom/events/hammer_gestures', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', 'angular2/src/animate/browser_details', 'angular2/src/animate/animation_builder', 'angular2/compiler', 'angular2/src/platform/browser/xhr_impl', 'angular2/src/core/testability/testability', 'angular2/src/platform/browser/testability', './browser/browser_adapter', 'angular2/src/core/profile/wtf_init', 'angular2/src/web_workers/ui/renderer', 'angular2/src/web_workers/ui/xhr_impl', 'angular2/src/router/location/browser_platform_location', 'angular2/src/web_workers/shared/service_message_broker', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/api', 'angular2/src/web_workers/shared/render_store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, message_bus_1, ng_zone_1, core_1, common_dom_1, di_1, dom_adapter_1, dom_events_1, key_events_1, hammer_gestures_1, dom_tokens_1, dom_renderer_1, shared_styles_host_1, shared_styles_host_2, browser_details_1, animation_builder_1, compiler_1, xhr_impl_1, testability_1, testability_2, browser_adapter_1, wtf_init_1, renderer_1, xhr_impl_2, browser_platform_location_1, service_message_broker_1, client_message_broker_1, serializer_1, api_1, render_store_1;
    var WORKER_SCRIPT, WORKER_RENDER_MESSAGING_PROVIDERS, WORKER_RENDER_PLATFORM, WORKER_RENDER_ROUTER, WORKER_RENDER_APPLICATION_COMMON;
    function initializeGenericWorkerRenderer(injector) {
        var bus = injector.get(message_bus_1.MessageBus);
        var zone = injector.get(ng_zone_1.NgZone);
        bus.attachToZone(zone);
        zone.run(function () {
            WORKER_RENDER_MESSAGING_PROVIDERS.forEach(function (token) { injector.get(token).start(); });
        });
    }
    exports_1("initializeGenericWorkerRenderer", initializeGenericWorkerRenderer);
    function initWebWorkerRenderPlatform() {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        wtf_init_1.wtfInit();
        testability_2.BrowserGetTestability.init();
    }
    exports_1("initWebWorkerRenderPlatform", initWebWorkerRenderPlatform);
    function _exceptionHandler() {
        return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
    }
    function _document() {
        return dom_adapter_1.DOM.defaultDoc();
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (dom_events_1_1) {
                dom_events_1 = dom_events_1_1;
            },
            function (key_events_1_1) {
                key_events_1 = key_events_1_1;
            },
            function (hammer_gestures_1_1) {
                hammer_gestures_1 = hammer_gestures_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (shared_styles_host_1_1) {
                shared_styles_host_1 = shared_styles_host_1_1;
                shared_styles_host_2 = shared_styles_host_1_1;
            },
            function (browser_details_1_1) {
                browser_details_1 = browser_details_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
            },
            function (testability_2_1) {
                testability_2 = testability_2_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            },
            function (wtf_init_1_1) {
                wtf_init_1 = wtf_init_1_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            },
            function (xhr_impl_2_1) {
                xhr_impl_2 = xhr_impl_2_1;
            },
            function (browser_platform_location_1_1) {
                browser_platform_location_1 = browser_platform_location_1_1;
            },
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (render_store_1_1) {
                render_store_1 = render_store_1_1;
            }],
        execute: function() {
            exports_1("WORKER_SCRIPT", WORKER_SCRIPT = lang_1.CONST_EXPR(new di_1.OpaqueToken("WebWorkerScript")));
            // Message based Worker classes that listen on the MessageBus
            exports_1("WORKER_RENDER_MESSAGING_PROVIDERS", WORKER_RENDER_MESSAGING_PROVIDERS = lang_1.CONST_EXPR([renderer_1.MessageBasedRenderer, xhr_impl_2.MessageBasedXHRImpl]));
            exports_1("WORKER_RENDER_PLATFORM", WORKER_RENDER_PLATFORM = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initWebWorkerRenderPlatform, multi: true })
            ]));
            /**
             * A list of {@link Provider}s. To use the router in a Worker enabled application you must
             * include these providers when setting up the render thread.
             */
            exports_1("WORKER_RENDER_ROUTER", WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([browser_platform_location_1.BrowserPlatformLocation]));
            exports_1("WORKER_RENDER_APPLICATION_COMMON", WORKER_RENDER_APPLICATION_COMMON = lang_1.CONST_EXPR([
                core_1.APPLICATION_COMMON_PROVIDERS,
                WORKER_RENDER_MESSAGING_PROVIDERS,
                new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
                new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
                // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
                // #5298
                new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
                new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
                new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
                new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                new di_1.Provider(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
                new di_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }),
                xhr_impl_2.MessageBasedXHRImpl,
                new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
                new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }),
                serializer_1.Serializer,
                new di_1.Provider(api_1.ON_WEB_WORKER, { useValue: false }),
                render_store_1.RenderStore,
                shared_styles_host_1.DomSharedStylesHost,
                testability_1.Testability,
                browser_details_1.BrowserDetails,
                animation_builder_1.AnimationBuilder,
                common_dom_1.EventManager
            ]));
        }
    }
});
//# sourceMappingURL=worker_render_common.js.map