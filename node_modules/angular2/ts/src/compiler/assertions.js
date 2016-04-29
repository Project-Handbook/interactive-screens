System.register(['../facade/lang', '../facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1;
    function assertArrayOfStrings(identifier, value) {
        if (!lang_1.assertionsEnabled() || lang_1.isBlank(value)) {
            return;
        }
        if (!lang_1.isArray(value)) {
            throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
        }
        for (var i = 0; i < value.length; i += 1) {
            if (!lang_1.isString(value[i])) {
                throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
            }
        }
    }
    exports_1("assertArrayOfStrings", assertArrayOfStrings);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=assertions.js.map