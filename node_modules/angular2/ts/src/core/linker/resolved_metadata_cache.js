System.register(['../di', 'angular2/src/facade/lang', './element', './directive_resolver', '../pipes/pipe_provider', './pipe_resolver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, lang_1, element_1, directive_resolver_1, pipe_provider_1, pipe_resolver_1;
    var ResolvedMetadataCache, CODEGEN_RESOLVED_METADATA_CACHE;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_provider_1_1) {
                pipe_provider_1 = pipe_provider_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            }],
        execute: function() {
            ResolvedMetadataCache = (function () {
                function ResolvedMetadataCache(_directiveResolver, _pipeResolver) {
                    this._directiveResolver = _directiveResolver;
                    this._pipeResolver = _pipeResolver;
                    this._directiveCache = new Map();
                    this._pipeCache = new Map();
                }
                ResolvedMetadataCache.prototype.getResolvedDirectiveMetadata = function (type) {
                    var result = this._directiveCache.get(type);
                    if (lang_1.isBlank(result)) {
                        result = element_1.DirectiveProvider.createFromType(type, this._directiveResolver.resolve(type));
                        this._directiveCache.set(type, result);
                    }
                    return result;
                };
                ResolvedMetadataCache.prototype.getResolvedPipeMetadata = function (type) {
                    var result = this._pipeCache.get(type);
                    if (lang_1.isBlank(result)) {
                        result = pipe_provider_1.PipeProvider.createFromType(type, this._pipeResolver.resolve(type));
                        this._pipeCache.set(type, result);
                    }
                    return result;
                };
                ResolvedMetadataCache = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver])
                ], ResolvedMetadataCache);
                return ResolvedMetadataCache;
            }());
            exports_1("ResolvedMetadataCache", ResolvedMetadataCache);
            exports_1("CODEGEN_RESOLVED_METADATA_CACHE", CODEGEN_RESOLVED_METADATA_CACHE = new ResolvedMetadataCache(directive_resolver_1.CODEGEN_DIRECTIVE_RESOLVER, pipe_resolver_1.CODEGEN_PIPE_RESOLVER));
        }
    }
});
//# sourceMappingURL=resolved_metadata_cache.js.map