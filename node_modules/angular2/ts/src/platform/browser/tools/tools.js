System.register(['angular2/src/facade/lang', './common_tools'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, common_tools_1;
    var context;
    /**
     * Enabled Angular 2 debug tools that are accessible via your browser's
     * developer console.
     *
     * Usage:
     *
     * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
     * 1. Type `ng.` (usually the console will show auto-complete suggestion)
     * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
     *    then hit Enter.
     */
    function enableDebugTools(ref) {
        context.ng = new common_tools_1.AngularTools(ref);
    }
    exports_1("enableDebugTools", enableDebugTools);
    /**
     * Disables Angular 2 tools.
     */
    function disableDebugTools() {
        delete context.ng;
    }
    exports_1("disableDebugTools", disableDebugTools);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (common_tools_1_1) {
                common_tools_1 = common_tools_1_1;
            }],
        execute: function() {
            context = lang_1.global;
        }
    }
});
//# sourceMappingURL=tools.js.map