System.register(['./metadata', '../util/decorators'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var metadata_1, decorators_1;
    var Inject, Optional, Injectable, Self, Host, SkipSelf;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }],
        execute: function() {
            /**
             * Factory for creating {@link InjectMetadata}.
             */
            exports_1("Inject", Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata));
            /**
             * Factory for creating {@link OptionalMetadata}.
             */
            exports_1("Optional", Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata));
            /**
             * Factory for creating {@link InjectableMetadata}.
             */
            exports_1("Injectable", Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata));
            /**
             * Factory for creating {@link SelfMetadata}.
             */
            exports_1("Self", Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata));
            /**
             * Factory for creating {@link HostMetadata}.
             */
            exports_1("Host", Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata));
            /**
             * Factory for creating {@link SkipSelfMetadata}.
             */
            exports_1("SkipSelf", SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata));
        }
    }
});
//# sourceMappingURL=decorators.js.map