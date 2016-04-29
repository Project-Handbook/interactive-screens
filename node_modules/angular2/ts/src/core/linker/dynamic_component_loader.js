System.register(['angular2/src/core/di', './compiler', 'angular2/src/facade/lang', 'angular2/src/core/linker/view_manager'], function(exports_1, context_1) {
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
    var di_1, compiler_1, lang_1, view_manager_1;
    var ComponentRef, ComponentRef_, DynamicComponentLoader, DynamicComponentLoader_;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (view_manager_1_1) {
                view_manager_1 = view_manager_1_1;
            }],
        execute: function() {
            /**
             * Represents an instance of a Component created via {@link DynamicComponentLoader}.
             *
             * `ComponentRef` provides access to the Component Instance as well other objects related to this
             * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
             * method.
             */
            ComponentRef = (function () {
                function ComponentRef() {
                }
                Object.defineProperty(ComponentRef.prototype, "hostView", {
                    /**
                     * The {@link ViewRef} of the Host View of this Component instance.
                     */
                    get: function () {
                        return this.location.internalElement.parentView.ref;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef.prototype, "hostComponent", {
                    /**
                     * @internal
                     *
                     * The instance of the component.
                     *
                     * TODO(i): this api should be removed
                     */
                    get: function () { return this.instance; },
                    enumerable: true,
                    configurable: true
                });
                return ComponentRef;
            }());
            exports_1("ComponentRef", ComponentRef);
            ComponentRef_ = (function (_super) {
                __extends(ComponentRef_, _super);
                /**
                 * TODO(i): refactor into public/private fields
                 */
                function ComponentRef_(location, instance, componentType, injector, _dispose) {
                    _super.call(this);
                    this._dispose = _dispose;
                    this.location = location;
                    this.instance = instance;
                    this.componentType = componentType;
                    this.injector = injector;
                }
                Object.defineProperty(ComponentRef_.prototype, "hostComponentType", {
                    /**
                     * @internal
                     *
                     * Returns the type of this Component instance.
                     *
                     * TODO(i): this api should be removed
                     */
                    get: function () { return this.componentType; },
                    enumerable: true,
                    configurable: true
                });
                ComponentRef_.prototype.dispose = function () { this._dispose(); };
                return ComponentRef_;
            }(ComponentRef));
            exports_1("ComponentRef_", ComponentRef_);
            /**
             * Service for instantiating a Component and attaching it to a View at a specified location.
             */
            DynamicComponentLoader = (function () {
                function DynamicComponentLoader() {
                }
                return DynamicComponentLoader;
            }());
            exports_1("DynamicComponentLoader", DynamicComponentLoader);
            DynamicComponentLoader_ = (function (_super) {
                __extends(DynamicComponentLoader_, _super);
                function DynamicComponentLoader_(_compiler, _viewManager) {
                    _super.call(this);
                    this._compiler = _compiler;
                    this._viewManager = _viewManager;
                }
                DynamicComponentLoader_.prototype.loadAsRoot = function (type, overrideSelector, injector, onDispose, projectableNodes) {
                    var _this = this;
                    return this._compiler.compileInHost(type).then(function (hostProtoViewRef) {
                        var hostViewRef = _this._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector, projectableNodes);
                        var newLocation = _this._viewManager.getHostElement(hostViewRef);
                        var component = _this._viewManager.getComponent(newLocation);
                        var dispose = function () {
                            if (lang_1.isPresent(onDispose)) {
                                onDispose();
                            }
                            _this._viewManager.destroyRootHostView(hostViewRef);
                        };
                        return new ComponentRef_(newLocation, component, type, injector, dispose);
                    });
                };
                DynamicComponentLoader_.prototype.loadIntoLocation = function (type, hostLocation, anchorName, providers, projectableNodes) {
                    if (providers === void 0) { providers = null; }
                    if (projectableNodes === void 0) { projectableNodes = null; }
                    return this.loadNextToLocation(type, this._viewManager.getNamedElementInComponentView(hostLocation, anchorName), providers, projectableNodes);
                };
                DynamicComponentLoader_.prototype.loadNextToLocation = function (type, location, providers, projectableNodes) {
                    var _this = this;
                    if (providers === void 0) { providers = null; }
                    if (projectableNodes === void 0) { projectableNodes = null; }
                    return this._compiler.compileInHost(type).then(function (hostProtoViewRef) {
                        var viewContainer = _this._viewManager.getViewContainer(location);
                        var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers, projectableNodes);
                        var newLocation = _this._viewManager.getHostElement(hostViewRef);
                        var component = _this._viewManager.getComponent(newLocation);
                        var dispose = function () {
                            var index = viewContainer.indexOf(hostViewRef);
                            if (!hostViewRef.destroyed && index !== -1) {
                                viewContainer.remove(index);
                            }
                        };
                        return new ComponentRef_(newLocation, component, type, null, dispose);
                    });
                };
                DynamicComponentLoader_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [compiler_1.Compiler, view_manager_1.AppViewManager])
                ], DynamicComponentLoader_);
                return DynamicComponentLoader_;
            }(DynamicComponentLoader));
            exports_1("DynamicComponentLoader_", DynamicComponentLoader_);
        }
    }
});
//# sourceMappingURL=dynamic_component_loader.js.map