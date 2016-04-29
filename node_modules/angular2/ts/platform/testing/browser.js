System.register(['angular2/platform/testing/browser_static', 'angular2/platform/browser', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_static_1, browser_1, lang_1;
    var TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS;
    return {
        setters:[
            function (browser_static_1_1) {
                browser_static_1 = browser_static_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Default patform providers for testing.
             */
            exports_1("TEST_BROWSER_PLATFORM_PROVIDERS", TEST_BROWSER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS]));
            /**
             * Default application providers for testing.
             */
            exports_1("TEST_BROWSER_APPLICATION_PROVIDERS", TEST_BROWSER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([browser_1.BROWSER_APP_PROVIDERS, browser_static_1.ADDITIONAL_TEST_BROWSER_PROVIDERS]));
        }
    }
});
//# sourceMappingURL=browser.js.map