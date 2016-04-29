System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/src/core/di', 'angular2/src/facade/collection', './dom_tokens'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var dom_adapter_1, di_1, collection_1, dom_tokens_1;
    var SharedStylesHost, DomSharedStylesHost;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (dom_tokens_1_1) {
                dom_tokens_1 = dom_tokens_1_1;
            }],
        execute: function() {
            SharedStylesHost = (function () {
                function SharedStylesHost() {
                    /** @internal */
                    this._styles = [];
                    /** @internal */
                    this._stylesSet = new Set();
                }
                SharedStylesHost.prototype.addStyles = function (styles) {
                    var _this = this;
                    var additions = [];
                    styles.forEach(function (style) {
                        if (!collection_1.SetWrapper.has(_this._stylesSet, style)) {
                            _this._stylesSet.add(style);
                            _this._styles.push(style);
                            additions.push(style);
                        }
                    });
                    this.onStylesAdded(additions);
                };
                SharedStylesHost.prototype.onStylesAdded = function (additions) { };
                SharedStylesHost.prototype.getAllStyles = function () { return this._styles; };
                SharedStylesHost = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SharedStylesHost);
                return SharedStylesHost;
            }());
            exports_1("SharedStylesHost", SharedStylesHost);
            DomSharedStylesHost = (function (_super) {
                __extends(DomSharedStylesHost, _super);
                function DomSharedStylesHost(doc) {
                    _super.call(this);
                    this._hostNodes = new Set();
                    this._hostNodes.add(doc.head);
                }
                /** @internal */
                DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
                    for (var i = 0; i < styles.length; i++) {
                        var style = styles[i];
                        dom_adapter_1.DOM.appendChild(host, dom_adapter_1.DOM.createStyleElement(style));
                    }
                };
                DomSharedStylesHost.prototype.addHost = function (hostNode) {
                    this._addStylesToHost(this._styles, hostNode);
                    this._hostNodes.add(hostNode);
                };
                DomSharedStylesHost.prototype.removeHost = function (hostNode) { collection_1.SetWrapper.delete(this._hostNodes, hostNode); };
                DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
                    var _this = this;
                    this._hostNodes.forEach(function (hostNode) { _this._addStylesToHost(additions, hostNode); });
                };
                DomSharedStylesHost = __decorate([
                    di_1.Injectable(),
                    __param(0, di_1.Inject(dom_tokens_1.DOCUMENT)), 
                    __metadata('design:paramtypes', [Object])
                ], DomSharedStylesHost);
                return DomSharedStylesHost;
            }(SharedStylesHost));
            exports_1("DomSharedStylesHost", DomSharedStylesHost);
        }
    }
});
//# sourceMappingURL=shared_styles_host.js.map