System.register(['./src/core/metadata', './src/core/util', './src/core/prod_mode', './src/core/di', './src/facade/facade', 'angular2/src/facade/lang', './src/core/application_ref', './src/core/application_tokens', './src/core/zone', './src/core/render', './src/core/linker', './src/core/debug/debug_node', './src/core/testability/testability', './src/core/change_detection', './src/core/platform_directives_and_pipes', './src/core/platform_common_providers', './src/core/application_common_providers', './src/core/reflection/reflection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'enableProdMode': true,
        'platform': true,
        'createNgZone': true,
        'PlatformRef': true,
        'ApplicationRef': true,
        'APP_ID': true,
        'APP_COMPONENT': true,
        'APP_INITIALIZER': true,
        'PACKAGE_ROOT_URL': true,
        'PLATFORM_INITIALIZER': true,
        'DebugElement': true,
        'DebugNode': true,
        'asNativeElements': true
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
            function (metadata_1_1) {
                exportStar_1(metadata_1_1);
            },
            function (util_1_1) {
                exportStar_1(util_1_1);
            },
            function (prod_mode_1_1) {
                exportStar_1(prod_mode_1_1);
            },
            function (di_1_1) {
                exportStar_1(di_1_1);
            },
            function (facade_1_1) {
                exportStar_1(facade_1_1);
            },
            function (lang_1_1) {
                exports_1({
                    "enableProdMode": lang_1_1["enableProdMode"]
                });
            },
            function (application_ref_1_1) {
                exports_1({
                    "platform": application_ref_1_1["platform"],
                    "createNgZone": application_ref_1_1["createNgZone"],
                    "PlatformRef": application_ref_1_1["PlatformRef"],
                    "ApplicationRef": application_ref_1_1["ApplicationRef"]
                });
            },
            function (application_tokens_1_1) {
                exports_1({
                    "APP_ID": application_tokens_1_1["APP_ID"],
                    "APP_COMPONENT": application_tokens_1_1["APP_COMPONENT"],
                    "APP_INITIALIZER": application_tokens_1_1["APP_INITIALIZER"],
                    "PACKAGE_ROOT_URL": application_tokens_1_1["PACKAGE_ROOT_URL"],
                    "PLATFORM_INITIALIZER": application_tokens_1_1["PLATFORM_INITIALIZER"]
                });
            },
            function (zone_1_1) {
                exportStar_1(zone_1_1);
            },
            function (render_1_1) {
                exportStar_1(render_1_1);
            },
            function (linker_1_1) {
                exportStar_1(linker_1_1);
            },
            function (debug_node_1_1) {
                exports_1({
                    "DebugElement": debug_node_1_1["DebugElement"],
                    "DebugNode": debug_node_1_1["DebugNode"],
                    "asNativeElements": debug_node_1_1["asNativeElements"]
                });
            },
            function (testability_1_1) {
                exportStar_1(testability_1_1);
            },
            function (change_detection_1_1) {
                exportStar_1(change_detection_1_1);
            },
            function (platform_directives_and_pipes_1_1) {
                exportStar_1(platform_directives_and_pipes_1_1);
            },
            function (platform_common_providers_1_1) {
                exportStar_1(platform_common_providers_1_1);
            },
            function (application_common_providers_1_1) {
                exportStar_1(application_common_providers_1_1);
            },
            function (reflection_1_1) {
                exportStar_1(reflection_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=core.js.map