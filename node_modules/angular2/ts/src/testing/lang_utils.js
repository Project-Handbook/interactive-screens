System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getTypeOf(instance) {
        return instance.constructor;
    }
    exports_1("getTypeOf", getTypeOf);
    function instantiateType(type, params) {
        if (params === void 0) { params = []; }
        var instance = Object.create(type.prototype);
        instance.constructor.apply(instance, params);
        return instance;
    }
    exports_1("instantiateType", instantiateType);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=lang_utils.js.map