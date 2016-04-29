System.register(['./src/testing/testing', './src/testing/test_component_builder', './src/testing/test_injector', './src/testing/fake_async', 'angular2/src/mock/view_resolver_mock', 'angular2/src/compiler/xhr_mock', 'angular2/src/mock/ng_zone_mock', 'angular2/src/mock/mock_application_ref', 'angular2/src/mock/directive_resolver_mock'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'ComponentFixture': true,
        'TestComponentBuilder': true,
        'MockViewResolver': true,
        'MockXHR': true,
        'MockNgZone': true,
        'MockApplicationRef': true,
        'MockDirectiveResolver': true
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
            function (testing_1_1) {
                exportStar_1(testing_1_1);
            },
            function (test_component_builder_1_1) {
                exports_1({
                    "ComponentFixture": test_component_builder_1_1["ComponentFixture"],
                    "TestComponentBuilder": test_component_builder_1_1["TestComponentBuilder"]
                });
            },
            function (test_injector_1_1) {
                exportStar_1(test_injector_1_1);
            },
            function (fake_async_1_1) {
                exportStar_1(fake_async_1_1);
            },
            function (view_resolver_mock_1_1) {
                exports_1({
                    "MockViewResolver": view_resolver_mock_1_1["MockViewResolver"]
                });
            },
            function (xhr_mock_1_1) {
                exports_1({
                    "MockXHR": xhr_mock_1_1["MockXHR"]
                });
            },
            function (ng_zone_mock_1_1) {
                exports_1({
                    "MockNgZone": ng_zone_mock_1_1["MockNgZone"]
                });
            },
            function (mock_application_ref_1_1) {
                exports_1({
                    "MockApplicationRef": mock_application_ref_1_1["MockApplicationRef"]
                });
            },
            function (directive_resolver_mock_1_1) {
                exports_1({
                    "MockDirectiveResolver": directive_resolver_mock_1_1["MockDirectiveResolver"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=testing.js.map