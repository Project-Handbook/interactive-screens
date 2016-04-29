System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Codegen;
    return {
        setters:[],
        execute: function() {
            // Note: This class is only here so that we can reference it from TypeScript code.
            // The actual implementation lives under modules_dart.
            // TODO(tbosch): Move the corresponding code into angular2/src/compiler once
            // the new compiler is done.
            Codegen = (function () {
                function Codegen(moduleAlias) {
                }
                Codegen.prototype.generate = function (typeName, changeDetectorTypeName, def) {
                    throw "Not implemented in JS";
                };
                Codegen.prototype.toString = function () { throw "Not implemented in JS"; };
                return Codegen;
            }());
            exports_1("Codegen", Codegen);
        }
    }
});
//# sourceMappingURL=change_detector_codegen.js.map