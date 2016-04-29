System.register(['angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, lang_1;
    var DOCUMENT;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A DI Token representing the main rendering context. In a browser this is the DOM Document.
             *
             * Note: Document might not be available in the Application Context when Application and Rendering
             * Contexts are not the same (e.g. when running the application into a Web Worker).
             */
            exports_1("DOCUMENT", DOCUMENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('DocumentToken')));
        }
    }
});
//# sourceMappingURL=dom_tokens.js.map