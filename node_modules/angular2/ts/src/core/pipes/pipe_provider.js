System.register(['angular2/src/core/di/provider', 'angular2/src/core/di'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var provider_1, di_1;
    var PipeProvider;
    return {
        setters:[
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            PipeProvider = (function (_super) {
                __extends(PipeProvider, _super);
                function PipeProvider(name, pure, key, resolvedFactories, multiBinding) {
                    _super.call(this, key, resolvedFactories, multiBinding);
                    this.name = name;
                    this.pure = pure;
                }
                PipeProvider.createFromType = function (type, metadata) {
                    var provider = new di_1.Provider(type, { useClass: type });
                    var rb = provider_1.resolveProvider(provider);
                    return new PipeProvider(metadata.name, metadata.pure, rb.key, rb.resolvedFactories, rb.multiProvider);
                };
                return PipeProvider;
            }(provider_1.ResolvedProvider_));
            exports_1("PipeProvider", PipeProvider);
        }
    }
});
//# sourceMappingURL=pipe_provider.js.map