System.register(['angular2/src/mock/mock_location_strategy', 'angular2/src/mock/location_mock'], function(exports_1, context_1) {
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
            function (mock_location_strategy_1_1) {
                exportStar_1(mock_location_strategy_1_1);
            },
            function (location_mock_1_1) {
                exportStar_1(location_mock_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=testing.js.map