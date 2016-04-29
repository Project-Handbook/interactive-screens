System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Converts `funcOrValue` to a string which can be used in generated code.
     */
    function codify(obj) {
        return JSON.stringify(obj);
    }
    exports_1("codify", codify);
    function rawString(str) {
        return "'" + str + "'";
    }
    exports_1("rawString", rawString);
    /**
     * Combine the strings of generated code into a single interpolated string.
     * Each element of `vals` is expected to be a string literal or a codegen'd
     * call to a method returning a string.
     */
    function combineGeneratedStrings(vals) {
        return vals.join(' + ');
    }
    exports_1("combineGeneratedStrings", combineGeneratedStrings);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=codegen_facade.js.map