System.register(['../common', '../core', '../platform/worker_app', '../compiler', '../instrumentation', 'angular2/src/platform/worker_app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'UrlResolver': true
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
            function (common_1_1) {
                exportStar_1(common_1_1);
            },
            function (core_1_1) {
                exportStar_1(core_1_1);
            },
            function (worker_app_1_1) {
                exportStar_1(worker_app_1_1);
            },
            function (compiler_1_1) {
                exports_1({
                    "UrlResolver": compiler_1_1["UrlResolver"]
                });
            },
            function (instrumentation_1_1) {
                exportStar_1(instrumentation_1_1);
            },
            function (worker_app_2_1) {
                exportStar_1(worker_app_2_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=worker.js.map