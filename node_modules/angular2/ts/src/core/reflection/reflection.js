System.register(['./reflector', './reflection_capabilities'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var reflector_1, reflection_capabilities_1;
    var reflector;
    return {
        setters:[
            function (reflector_1_1) {
                reflector_1 = reflector_1_1;
                exports_1({
                    "Reflector": reflector_1_1["Reflector"],
                    "ReflectionInfo": reflector_1_1["ReflectionInfo"]
                });
            },
            function (reflection_capabilities_1_1) {
                reflection_capabilities_1 = reflection_capabilities_1_1;
            }],
        execute: function() {
            /**
             * The {@link Reflector} used internally in Angular to access metadata
             * about symbols.
             */
            exports_1("reflector", reflector = new reflector_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities()));
        }
    }
});
//# sourceMappingURL=reflection.js.map