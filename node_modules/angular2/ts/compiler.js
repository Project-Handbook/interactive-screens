System.register(['./src/compiler/url_resolver', './src/compiler/xhr', './src/compiler/compiler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (url_resolver_1_1) {
                exportStar_1(url_resolver_1_1);
            },
            function (xhr_1_1) {
                exportStar_1(xhr_1_1);
            },
            function (compiler_1_1) {
                exportStar_1(compiler_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=compiler.js.map