System.register(['./src/common/pipes', './src/common/directives', './src/common/forms', './src/common/common_directives'], function(exports_1, context_1) {
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
            function (pipes_1_1) {
                exportStar_1(pipes_1_1);
            },
            function (directives_1_1) {
                exportStar_1(directives_1_1);
            },
            function (forms_1_1) {
                exportStar_1(forms_1_1);
            },
            function (common_directives_1_1) {
                exportStar_1(common_directives_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=common.js.map