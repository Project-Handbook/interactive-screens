System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/core/change_detection/pipes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1, cd;
    var ProtoPipes, Pipes;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (cd_1) {
                cd = cd_1;
            }],
        execute: function() {
            ProtoPipes = (function () {
                function ProtoPipes(
                    /**
                    * Map of {@link PipeMetadata} names to {@link PipeMetadata} implementations.
                    */
                    config) {
                    this.config = config;
                    this.config = config;
                }
                ProtoPipes.fromProviders = function (providers) {
                    var config = {};
                    providers.forEach(function (b) { return config[b.name] = b; });
                    return new ProtoPipes(config);
                };
                ProtoPipes.prototype.get = function (name) {
                    var provider = this.config[name];
                    if (lang_1.isBlank(provider))
                        throw new exceptions_1.BaseException("Cannot find pipe '" + name + "'.");
                    return provider;
                };
                return ProtoPipes;
            }());
            exports_1("ProtoPipes", ProtoPipes);
            Pipes = (function () {
                function Pipes(proto, injector) {
                    this.proto = proto;
                    this.injector = injector;
                    /** @internal */
                    this._config = {};
                }
                Pipes.prototype.get = function (name) {
                    var cached = collection_1.StringMapWrapper.get(this._config, name);
                    if (lang_1.isPresent(cached))
                        return cached;
                    var p = this.proto.get(name);
                    var transform = this.injector.instantiateResolved(p);
                    var res = new cd.SelectedPipe(transform, p.pure);
                    if (p.pure) {
                        collection_1.StringMapWrapper.set(this._config, name, res);
                    }
                    return res;
                };
                return Pipes;
            }());
            exports_1("Pipes", Pipes);
        }
    }
});
//# sourceMappingURL=pipes.js.map