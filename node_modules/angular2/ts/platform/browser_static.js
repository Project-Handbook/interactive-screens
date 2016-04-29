System.register(['angular2/src/core/angular_entrypoint', 'angular2/src/platform/browser_common', 'angular2/src/facade/lang', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, browser_common_1, core_1;
    var BROWSER_APP_PROVIDERS;
    /**
     * See {@link bootstrap} for more information.
     */
    function bootstrapStatic(appComponentType, customProviders, initReflector) {
        if (lang_1.isPresent(initReflector)) {
            initReflector();
        }
        var appProviders = lang_1.isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
        return core_1.platform(browser_common_1.BROWSER_PROVIDERS).application(appProviders).bootstrap(appComponentType);
    }
    exports_1("bootstrapStatic", bootstrapStatic);
    return {
        setters:[
            function (angular_entrypoint_1_1) {
                exports_1({
                    "AngularEntrypoint": angular_entrypoint_1_1["AngularEntrypoint"]
                });
            },
            function (browser_common_2_1) {
                exports_1({
                    "BROWSER_PROVIDERS": browser_common_2_1["BROWSER_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS": browser_common_2_1["ELEMENT_PROBE_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS_PROD_MODE": browser_common_2_1["ELEMENT_PROBE_PROVIDERS_PROD_MODE"],
                    "inspectNativeElement": browser_common_2_1["inspectNativeElement"],
                    "BrowserDomAdapter": browser_common_2_1["BrowserDomAdapter"],
                    "By": browser_common_2_1["By"],
                    "Title": browser_common_2_1["Title"],
                    "enableDebugTools": browser_common_2_1["enableDebugTools"],
                    "disableDebugTools": browser_common_2_1["disableDebugTools"]
                });
                browser_common_1 = browser_common_2_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * An array of providers that should be passed into `application()` when bootstrapping a component
             * when all templates
             * have been precompiled offline.
             */
            exports_1("BROWSER_APP_PROVIDERS", BROWSER_APP_PROVIDERS = browser_common_1.BROWSER_APP_COMMON_PROVIDERS);
        }
    }
});
//# sourceMappingURL=browser_static.js.map