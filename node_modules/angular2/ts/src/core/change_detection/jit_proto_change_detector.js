System.register(['./change_detection_jit_generator'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var change_detection_jit_generator_1;
    var JitProtoChangeDetector;
    return {
        setters:[
            function (change_detection_jit_generator_1_1) {
                change_detection_jit_generator_1 = change_detection_jit_generator_1_1;
            }],
        execute: function() {
            JitProtoChangeDetector = (function () {
                function JitProtoChangeDetector(definition) {
                    this.definition = definition;
                    this._factory = this._createFactory(definition);
                }
                JitProtoChangeDetector.isSupported = function () { return true; };
                JitProtoChangeDetector.prototype.instantiate = function () { return this._factory(); };
                /** @internal */
                JitProtoChangeDetector.prototype._createFactory = function (definition) {
                    return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, 'util', 'AbstractChangeDetector', 'ChangeDetectorStatus')
                        .generate();
                };
                return JitProtoChangeDetector;
            }());
            exports_1("JitProtoChangeDetector", JitProtoChangeDetector);
        }
    }
});
//# sourceMappingURL=jit_proto_change_detector.js.map