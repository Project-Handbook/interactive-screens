System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function stringify(obj) {
        if (typeof obj == 'function')
            return obj.name || obj.toString();
        return '' + obj;
    }
    exports_1("stringify", stringify);
    function onError(e) {
        // TODO: (misko): We seem to not have a stack trace here!
        console.log(e, e.stack);
        throw e;
    }
    exports_1("onError", onError);
    function controllerKey(name) {
        return '$' + name + 'Controller';
    }
    exports_1("controllerKey", controllerKey);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=util.js.map