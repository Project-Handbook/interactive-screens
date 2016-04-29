System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function normalizeValidator(validator) {
        if (validator.validate !== undefined) {
            return function (c) { return validator.validate(c); };
        }
        else {
            return validator;
        }
    }
    exports_1("normalizeValidator", normalizeValidator);
    function normalizeAsyncValidator(validator) {
        if (validator.validate !== undefined) {
            return function (c) { return Promise.resolve(validator.validate(c)); };
        }
        else {
            return validator;
        }
    }
    exports_1("normalizeAsyncValidator", normalizeAsyncValidator);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=normalize_validator.js.map