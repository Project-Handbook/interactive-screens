System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, lang_1;
    var NG_VALUE_ACCESSOR;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Used to provide a {@link ControlValueAccessor} for form controls.
             *
             * See {@link DefaultValueAccessor} for how to implement one.
             */
            exports_1("NG_VALUE_ACCESSOR", NG_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgValueAccessor")));
        }
    }
});
//# sourceMappingURL=control_value_accessor.js.map