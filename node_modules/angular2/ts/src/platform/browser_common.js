System.register(['angular2/src/facade/lang', 'angular2/src/core/di', "angular2/core", "angular2/common", 'angular2/src/core/testability/testability', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/platform/dom/events/key_events', 'angular2/src/platform/dom/events/hammer_gestures', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', "angular2/src/animate/browser_details", "angular2/src/animate/animation_builder", './browser/browser_adapter', 'angular2/src/platform/browser/testability', 'angular2/src/core/profile/wtf_init', "angular2/src/platform/dom/events/event_manager", 'angular2/platform/common_dom', 'angular2/src/platform/browser/title', 'angular2/src/platform/browser/tools/tools'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, core_1, common_1, testability_1, dom_adapter_1, dom_events_1, key_events_1, hammer_gestures_1, dom_tokens_1, dom_renderer_1, shared_styles_host_1, shared_styles_host_2, browser_details_1, animation_builder_1, browser_adapter_1, testability_2, wtf_init_1, event_manager_1, common_dom_1;
    var BROWSER_PROVIDERS, BROWSER_APP_COMMON_PROVIDERS;
    function _exceptionHandler() {
        // !IS_DART is required because we must rethrow exceptions in JS,
        // but must not rethrow exceptions in Dart
        return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
    }
    function _document() {
        return dom_adapter_1.DOM.defaultDoc();
    }
    function initDomAdapter() {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        wtf_init_1.wtfInit();
        testability_2.BrowserGetTestability.init();
    }
    exports_1("initDomAdapter", initDomAdapter);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (testability_1_1) {
                testability_1 = testability_1_1;
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
                exports_1({
                    "DOCUMENT": dom_tokens_1_1["DOCUMENT"]
                });
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
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
                exports_1({
                    "BrowserDomAdapter": browser_adapter_1_1["BrowserDomAdapter"]
                });
            },
            function (testability_2_1) {
                testability_2 = testability_2_1;
            },
            function (wtf_init_1_1) {
                wtf_init_1 = wtf_init_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
                exports_1({
                    "ELEMENT_PROBE_PROVIDERS": common_dom_1_1["ELEMENT_PROBE_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS_PROD_MODE": common_dom_1_1["ELEMENT_PROBE_PROVIDERS_PROD_MODE"],
                    "inspectNativeElement": common_dom_1_1["inspectNativeElement"],
                    "By": common_dom_1_1["By"]
                });
            },
            function (title_1_1) {
                exports_1({
                    "Title": title_1_1["Title"]
                });
            },
            function (tools_1_1) {
                exports_1({
                    "enableDebugTools": tools_1_1["enableDebugTools"],
                    "disableDebugTools": tools_1_1["disableDebugTools"]
                });
            }],
        execute: function() {
            /**
             * A set of providers to initialize the Angular platform in a web browser.
             *
             * Used automatically by `bootstrap`, or can be passed to {@link platform}.
             */
            exports_1("BROWSER_PROVIDERS", BROWSER_PROVIDERS = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initDomAdapter, multi: true }),
            ]));
            /**
             * A set of providers to initialize an Angular application in a web browser.
             *
             * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
             */
            exports_1("BROWSER_APP_COMMON_PROVIDERS", BROWSER_APP_COMMON_PROVIDERS = lang_1.CONST_EXPR([
                core_1.APPLICATION_COMMON_PROVIDERS,
                common_1.FORM_PROVIDERS,
                new di_1.Provider(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
                new di_1.Provider(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
                new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
                new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
                new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
                new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
                new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
                new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                new di_1.Provider(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
                shared_styles_host_1.DomSharedStylesHost,
                testability_1.Testability,
                browser_details_1.BrowserDetails,
                animation_builder_1.AnimationBuilder,
                event_manager_1.EventManager,
                common_dom_1.ELEMENT_PROBE_PROVIDERS
            ]));
        }
    }
});
//# sourceMappingURL=browser_common.js.map