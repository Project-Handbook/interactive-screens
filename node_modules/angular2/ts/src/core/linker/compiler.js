System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/async', 'angular2/src/core/reflection/reflection', 'angular2/src/core/linker/view', 'angular2/src/core/linker/view_ref'], function(exports_1, context_1) {
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
    var di_1, lang_1, exceptions_1, async_1, reflection_1, view_1, view_ref_1;
    var Compiler, Compiler_;
    function isHostViewFactory(type) {
        return type instanceof view_1.HostViewFactory;
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            }],
        execute: function() {
            /**
             * Low-level service for compiling {@link Component}s into {@link ProtoViewRef ProtoViews}s, which
             * can later be used to create and render a Component instance.
             *
             * Most applications should instead use higher-level {@link DynamicComponentLoader} service, which
             * both compiles and instantiates a Component.
             */
            Compiler = (function () {
                function Compiler() {
                }
                return Compiler;
            }());
            exports_1("Compiler", Compiler);
            Compiler_ = (function (_super) {
                __extends(Compiler_, _super);
                function Compiler_() {
                    _super.apply(this, arguments);
                }
                Compiler_.prototype.compileInHost = function (componentType) {
                    var metadatas = reflection_1.reflector.annotations(componentType);
                    var hostViewFactory = metadatas.find(isHostViewFactory);
                    if (lang_1.isBlank(hostViewFactory)) {
                        throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
                    }
                    return async_1.PromiseWrapper.resolve(new view_ref_1.HostViewFactoryRef_(hostViewFactory));
                };
                Compiler_.prototype.clearCache = function () { };
                Compiler_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Compiler_);
                return Compiler_;
            }(Compiler));
            exports_1("Compiler_", Compiler_);
        }
    }
});
//# sourceMappingURL=compiler.js.map