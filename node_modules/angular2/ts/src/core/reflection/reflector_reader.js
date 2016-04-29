System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReflectorReader;
    return {
        setters:[],
        execute: function() {
            /**
             * Provides read-only access to reflection data about symbols. Used internally by Angular
             * to power dependency injection and compilation.
             */
            ReflectorReader = (function () {
                function ReflectorReader() {
                }
                return ReflectorReader;
            }());
            exports_1("ReflectorReader", ReflectorReader);
        }
    }
});
//# sourceMappingURL=reflector_reader.js.map