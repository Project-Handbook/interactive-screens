System.register(['angular2/src/facade/lang', './enums', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, enums_1, exceptions_1;
    var isSuccess;
    function normalizeMethodName(method) {
        if (lang_1.isString(method)) {
            var originalMethod = method;
            method = method
                .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
            });
            method = enums_1.RequestMethod[method];
            if (typeof method !== 'number')
                throw exceptions_1.makeTypeError("Invalid request method. The method \"" + originalMethod + "\" is not supported.");
        }
        return method;
    }
    exports_1("normalizeMethodName", normalizeMethodName);
    function getResponseURL(xhr) {
        if ('responseURL' in xhr) {
            return xhr.responseURL;
        }
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
        }
        return;
    }
    exports_1("getResponseURL", getResponseURL);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
                exports_1({
                    "isJsObject": lang_1_1["isJsObject"]
                });
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            exports_1("isSuccess", isSuccess = function (status) { return (status >= 200 && status < 300); });
        }
    }
});
//# sourceMappingURL=http_utils.js.map