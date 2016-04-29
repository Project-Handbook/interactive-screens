System.register(['angular2/core', 'angular2/src/platform/browser_common', 'angular2/src/platform/browser/browser_adapter', 'angular2/src/animate/animation_builder', 'angular2/src/mock/animation_builder_mock', 'angular2/src/mock/directive_resolver_mock', 'angular2/src/mock/view_resolver_mock', 'angular2/src/mock/mock_location_strategy', 'angular2/src/router/location/location_strategy', 'angular2/src/mock/ng_zone_mock', "angular2/src/platform/browser/xhr_impl", 'angular2/compiler', 'angular2/src/testing/test_component_builder', 'angular2/src/testing/utils', 'angular2/platform/common_dom', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, browser_common_1, browser_adapter_1, animation_builder_1, animation_builder_mock_1, directive_resolver_mock_1, view_resolver_mock_1, mock_location_strategy_1, location_strategy_1, ng_zone_mock_1, xhr_impl_1, compiler_1, test_component_builder_1, utils_1, common_dom_1, lang_1, utils_2;
    var TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, ADDITIONAL_TEST_BROWSER_PROVIDERS, TEST_BROWSER_STATIC_APPLICATION_PROVIDERS;
    function initBrowserTests() {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        utils_1.BrowserDetection.setup();
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_common_1_1) {
                browser_common_1 = browser_common_1_1;
            },
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
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
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (test_component_builder_1_1) {
                test_component_builder_1 = test_component_builder_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
                utils_2 = utils_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default patform providers for testing without a compiler.
             */
            exports_1("TEST_BROWSER_STATIC_PLATFORM_PROVIDERS", TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([
                core_1.PLATFORM_COMMON_PROVIDERS,
                new core_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initBrowserTests, multi: true })
            ]));
            exports_1("ADDITIONAL_TEST_BROWSER_PROVIDERS", ADDITIONAL_TEST_BROWSER_PROVIDERS = lang_1.CONST_EXPR([
                new core_1.Provider(core_1.APP_ID, { useValue: 'a' }),
                common_dom_1.ELEMENT_PROBE_PROVIDERS,
                new core_1.Provider(core_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
                new core_1.Provider(core_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
                utils_2.Log,
                test_component_builder_1.TestComponentBuilder,
                new core_1.Provider(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
                new core_1.Provider(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
                new core_1.Provider(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
            ]));
            /**
             * Default application providers for testing without a compiler.
             */
            exports_1("TEST_BROWSER_STATIC_APPLICATION_PROVIDERS", TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([
                browser_common_1.BROWSER_APP_COMMON_PROVIDERS,
                new core_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }),
                ADDITIONAL_TEST_BROWSER_PROVIDERS
            ]));
        }
    }
});
//# sourceMappingURL=browser_static.js.map