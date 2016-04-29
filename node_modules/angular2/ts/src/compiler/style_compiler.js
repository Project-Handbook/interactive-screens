System.register(['./source_module', 'angular2/src/core/metadata/view', 'angular2/src/compiler/xhr', 'angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/src/compiler/shadow_css', 'angular2/src/compiler/url_resolver', './style_url_resolver', './util', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var source_module_1, view_1, xhr_1, lang_1, async_1, shadow_css_1, url_resolver_1, style_url_resolver_1, util_1, di_1;
    var COMPONENT_VARIABLE, HOST_ATTR, CONTENT_ATTR, StyleCompiler;
    return {
        setters:[
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (shadow_css_1_1) {
                shadow_css_1 = shadow_css_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            },
            function (style_url_resolver_1_1) {
                style_url_resolver_1 = style_url_resolver_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            COMPONENT_VARIABLE = '%COMP%';
            HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
            CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
            StyleCompiler = (function () {
                function StyleCompiler(_xhr, _urlResolver) {
                    this._xhr = _xhr;
                    this._urlResolver = _urlResolver;
                    this._styleCache = new Map();
                    this._shadowCss = new shadow_css_1.ShadowCss();
                }
                StyleCompiler.prototype.compileComponentRuntime = function (template) {
                    var styles = template.styles;
                    var styleAbsUrls = template.styleUrls;
                    return this._loadStyles(styles, styleAbsUrls, template.encapsulation === view_1.ViewEncapsulation.Emulated);
                };
                StyleCompiler.prototype.compileComponentCodeGen = function (template) {
                    var shim = template.encapsulation === view_1.ViewEncapsulation.Emulated;
                    return this._styleCodeGen(template.styles, template.styleUrls, shim);
                };
                StyleCompiler.prototype.compileStylesheetCodeGen = function (stylesheetUrl, cssText) {
                    var styleWithImports = style_url_resolver_1.extractStyleUrls(this._urlResolver, stylesheetUrl, cssText);
                    return [
                        this._styleModule(stylesheetUrl, false, this._styleCodeGen([styleWithImports.style], styleWithImports.styleUrls, false)),
                        this._styleModule(stylesheetUrl, true, this._styleCodeGen([styleWithImports.style], styleWithImports.styleUrls, true))
                    ];
                };
                StyleCompiler.prototype.clearCache = function () { this._styleCache.clear(); };
                StyleCompiler.prototype._loadStyles = function (plainStyles, absUrls, encapsulate) {
                    var _this = this;
                    var promises = absUrls.map(function (absUrl) {
                        var cacheKey = "" + absUrl + (encapsulate ? '.shim' : '');
                        var result = _this._styleCache.get(cacheKey);
                        if (lang_1.isBlank(result)) {
                            result = _this._xhr.get(absUrl).then(function (style) {
                                var styleWithImports = style_url_resolver_1.extractStyleUrls(_this._urlResolver, absUrl, style);
                                return _this._loadStyles([styleWithImports.style], styleWithImports.styleUrls, encapsulate);
                            });
                            _this._styleCache.set(cacheKey, result);
                        }
                        return result;
                    });
                    return async_1.PromiseWrapper.all(promises).then(function (nestedStyles) {
                        var result = plainStyles.map(function (plainStyle) { return _this._shimIfNeeded(plainStyle, encapsulate); });
                        nestedStyles.forEach(function (styles) { return result.push(styles); });
                        return result;
                    });
                };
                StyleCompiler.prototype._styleCodeGen = function (plainStyles, absUrls, shim) {
                    var _this = this;
                    var arrayPrefix = lang_1.IS_DART ? "const" : '';
                    var styleExpressions = plainStyles.map(function (plainStyle) { return util_1.escapeSingleQuoteString(_this._shimIfNeeded(plainStyle, shim)); });
                    for (var i = 0; i < absUrls.length; i++) {
                        var moduleUrl = this._createModuleUrl(absUrls[i], shim);
                        styleExpressions.push(source_module_1.moduleRef(moduleUrl) + "STYLES");
                    }
                    var expressionSource = arrayPrefix + " [" + styleExpressions.join(',') + "]";
                    return new source_module_1.SourceExpression([], expressionSource);
                };
                StyleCompiler.prototype._styleModule = function (stylesheetUrl, shim, expression) {
                    var moduleSource = "\n      " + expression.declarations.join('\n') + "\n      " + util_1.codeGenExportVariable('STYLES') + expression.expression + ";\n    ";
                    return new source_module_1.SourceModule(this._createModuleUrl(stylesheetUrl, shim), moduleSource);
                };
                StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
                    return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
                };
                StyleCompiler.prototype._createModuleUrl = function (stylesheetUrl, shim) {
                    return shim ? stylesheetUrl + ".shim" + util_1.MODULE_SUFFIX : "" + stylesheetUrl + util_1.MODULE_SUFFIX;
                };
                StyleCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [xhr_1.XHR, url_resolver_1.UrlResolver])
                ], StyleCompiler);
                return StyleCompiler;
            }());
            exports_1("StyleCompiler", StyleCompiler);
        }
    }
});
//# sourceMappingURL=style_compiler.js.map