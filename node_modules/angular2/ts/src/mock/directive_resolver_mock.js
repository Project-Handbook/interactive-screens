System.register(['angular2/src/core/di', 'angular2/src/facade/collection', 'angular2/src/facade/lang', '../core/metadata', 'angular2/src/core/linker/directive_resolver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, collection_1, lang_1, metadata_1, directive_resolver_1;
    var MockDirectiveResolver;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            }],
        execute: function() {
            /**
             * An implementation of {@link DirectiveResolver} that allows overriding
             * various properties of directives.
             */
            MockDirectiveResolver = (function (_super) {
                __extends(MockDirectiveResolver, _super);
                function MockDirectiveResolver() {
                    _super.apply(this, arguments);
                    this._providerOverrides = new collection_1.Map();
                    this.viewProviderOverrides = new collection_1.Map();
                }
                MockDirectiveResolver.prototype.resolve = function (type) {
                    var dm = _super.prototype.resolve.call(this, type);
                    var providerOverrides = this._providerOverrides.get(type);
                    var viewProviderOverrides = this.viewProviderOverrides.get(type);
                    var providers = dm.providers;
                    if (lang_1.isPresent(providerOverrides)) {
                        providers = dm.providers.concat(providerOverrides);
                    }
                    if (dm instanceof metadata_1.ComponentMetadata) {
                        var viewProviders = dm.viewProviders;
                        if (lang_1.isPresent(viewProviderOverrides)) {
                            viewProviders = dm.viewProviders.concat(viewProviderOverrides);
                        }
                        return new metadata_1.ComponentMetadata({
                            selector: dm.selector,
                            inputs: dm.inputs,
                            outputs: dm.outputs,
                            host: dm.host,
                            exportAs: dm.exportAs,
                            moduleId: dm.moduleId,
                            queries: dm.queries,
                            changeDetection: dm.changeDetection,
                            providers: providers,
                            viewProviders: viewProviders
                        });
                    }
                    return new metadata_1.DirectiveMetadata({
                        selector: dm.selector,
                        inputs: dm.inputs,
                        outputs: dm.outputs,
                        host: dm.host,
                        providers: providers,
                        exportAs: dm.exportAs,
                        queries: dm.queries
                    });
                };
                /**
                 * @deprecated
                 */
                MockDirectiveResolver.prototype.setBindingsOverride = function (type, bindings) {
                    this._providerOverrides.set(type, bindings);
                };
                /**
                 * @deprecated
                 */
                MockDirectiveResolver.prototype.setViewBindingsOverride = function (type, viewBindings) {
                    this.viewProviderOverrides.set(type, viewBindings);
                };
                MockDirectiveResolver.prototype.setProvidersOverride = function (type, providers) {
                    this._providerOverrides.set(type, providers);
                };
                MockDirectiveResolver.prototype.setViewProvidersOverride = function (type, viewProviders) {
                    this.viewProviderOverrides.set(type, viewProviders);
                };
                MockDirectiveResolver = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockDirectiveResolver);
                return MockDirectiveResolver;
            }(directive_resolver_1.DirectiveResolver));
            exports_1("MockDirectiveResolver", MockDirectiveResolver);
        }
    }
});
//# sourceMappingURL=directive_resolver_mock.js.map