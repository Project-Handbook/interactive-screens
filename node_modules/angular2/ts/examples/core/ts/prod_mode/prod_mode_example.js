System.register(['angular2/core', 'angular2/platform/browser', './my_component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, browser_1, my_component_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (my_component_1_1) {
                my_component_1 = my_component_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(my_component_1.MyComponent);
        }
    }
});
// #enddocregion
//# sourceMappingURL=prod_mode_example.js.map