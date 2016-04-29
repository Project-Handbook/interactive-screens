System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConnectionBackend, Connection;
    return {
        setters:[],
        execute: function() {
            /**
             * Abstract class from which real backends are derived.
             *
             * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
             * {@link Request}.
             */
            ConnectionBackend = (function () {
                function ConnectionBackend() {
                }
                return ConnectionBackend;
            }());
            exports_1("ConnectionBackend", ConnectionBackend);
            /**
             * Abstract class from which real connections are derived.
             */
            Connection = (function () {
                function Connection() {
                }
                return Connection;
            }());
            exports_1("Connection", Connection);
        }
    }
});
//# sourceMappingURL=interfaces.js.map