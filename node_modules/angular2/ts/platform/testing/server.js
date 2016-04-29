System.register(['angular2/core', 'angular2/src/platform/server/parse5_adapter', 'angular2/src/animate/animation_builder', 'angular2/src/mock/animation_builder_mock', 'angular2/src/mock/directive_resolver_mock', 'angular2/src/mock/view_resolver_mock', 'angular2/src/mock/mock_location_strategy', 'angular2/src/router/location/location_strategy', 'angular2/src/mock/ng_zone_mock', 'angular2/src/testing/test_component_builder', 'angular2/src/compiler/xhr', 'angular2/src/testing/utils', 'angular2/src/compiler/compiler', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/core/render/api', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/shared_styles_host', 'angular2/platform/common_dom', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, parse5_adapter_1, animation_builder_1, animation_builder_mock_1, directive_resolver_mock_1, view_resolver_mock_1, mock_location_strategy_1, location_strategy_1, ng_zone_mock_1, test_component_builder_1, xhr_1, utils_1, compiler_1, dom_tokens_1, dom_adapter_1, api_1, dom_renderer_1, shared_styles_host_1, common_dom_1, dom_events_1, lang_1, utils_2;
    var TEST_SERVER_PLATFORM_PROVIDERS, TEST_SERVER_APPLICATION_PROVIDERS;
    function initServerTests() {
        parse5_adapter_1.Parse5DomAdapter.makeCurrent();
        utils_1.BrowserDetection.setup();
    }
    function appDoc() {
        try {
            return dom_adapter_1.DOM.defaultDoc();
        }
        catch (e) {
            return null;
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (parse5_adapter_1_1) {
                parse5_adapter_1 = parse5_adapter_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (animation_builder_mock_1_1) {
                animation_builder_mock_1 = animation_builder_mock_1_1;
            },
            function (directive_resolver_mock_1_1) {
                directive_resolver_mock_1 = directive_resolver_mock_1_1;
            },
            function (view_resolver_mock_1_1) {
                view_resolver_mock_1 = view_resolver_mock_1_1;
            },
            function (mock_location_strategy_1_1) {
                mock_location_strategy_1 = mock_location_strategy_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (ng_zone_mock_1_1) {
                ng_zone_mock_1 = ng_zone_mock_1_1;
            },
            function (test_component_builder_1_1) {
                test_component_builder_1 = test_component_builder_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
                utils_2 = utils_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (shared_styles_host_1_1) {
                shared_styles_host_1 = shared_styles_host_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (dom_events_1_1) {
                dom_events_1 = dom_events_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default patform providers for testing.
             */
            exports_1("TEST_SERVER_PLATFORM_PROVIDERS", TEST_SERVER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initServerTests, multi: true })
            ]));
            /**
             * Default application providers for testing.
             */
            exports_1("TEST_SERVER_APPLICATION_PROVIDERS", TEST_SERVER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
                // TODO(julie): when angular2/platform/server is available, use that instead of making our own
                // list here.
                core_1.APPLICATION_COMMON_PROVIDERS,
                compiler_1.COMPILER_PROVIDERS,
                new core_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: appDoc }),
                new core_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
                new core_1.Provider(api_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
                common_dom_1.EventManager,
                new core_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
                new core_1.Provider(xhr_1.XHR, { useClass: xhr_1.XHR }),
                new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
                shared_styles_host_1.DomSharedStylesHost,
                common_dom_1.ELEMENT_PROBE_PROVIDERS,
                new core_1.Provider(core_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
                new core_1.Provider(core_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
                utils_2.Log,
                test_component_builder_1.TestComponentBuilder,
                new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
                new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
                new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
            ]));
        }
    }
});
//# sourceMappingURL=server.js.map