System.register(['angular2/src/facade/facade', '../src/core/di', '../src/core/application_ref', '../src/core/application_tokens', '../src/core/zone', 'angular2/platform/worker_render'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'platform': true,
        'PlatformRef': true,
        'ApplicationRef': true,
        'APP_ID': true,
        'APP_COMPONENT': true,
        'APP_INITIALIZER': true,
        'PLATFORM_INITIALIZER': true
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
            function (facade_1_1) {
                exportStar_1(facade_1_1);
            },
            function (di_1_1) {
                exportStar_1(di_1_1);
            },
            function (application_ref_1_1) {
                exports_1({
                    "platform": application_ref_1_1["platform"],
                    "PlatformRef": application_ref_1_1["PlatformRef"],
                    "ApplicationRef": application_ref_1_1["ApplicationRef"]
                });
            },
            function (application_tokens_1_1) {
                exports_1({
                    "APP_ID": application_tokens_1_1["APP_ID"],
                    "APP_COMPONENT": application_tokens_1_1["APP_COMPONENT"],
                    "APP_INITIALIZER": application_tokens_1_1["APP_INITIALIZER"],
                    "PLATFORM_INITIALIZER": application_tokens_1_1["PLATFORM_INITIALIZER"]
                });
            },
            function (zone_1_1) {
                exportStar_1(zone_1_1);
            },
            function (worker_render_1_1) {
                exportStar_1(worker_render_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ui.js.map