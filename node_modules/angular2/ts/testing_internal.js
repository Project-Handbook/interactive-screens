System.register(['./src/testing/testing_internal', './src/testing/test_component_builder', './src/testing/test_injector', './src/testing/fake_async', './src/testing/utils'], function(exports_1, context_1) {
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
            function (testing_internal_1_1) {
                exportStar_1(testing_internal_1_1);
            },
            function (test_component_builder_1_1) {
                exportStar_1(test_component_builder_1_1);
            },
            function (test_injector_1_1) {
                exportStar_1(test_injector_1_1);
            },
            function (fake_async_1_1) {
                exportStar_1(fake_async_1_1);
            },
            function (utils_1_1) {
                exportStar_1(utils_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=testing_internal.js.map