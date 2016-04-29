System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var MODULE_REGEXP, SourceModule, SourceExpression, SourceExpressions, SourceWithImports;
    function moduleRef(moduleUrl) {
        return "#MODULE[" + moduleUrl + "]";
    }
    exports_1("moduleRef", moduleRef);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            MODULE_REGEXP = /#MODULE\[([^\]]*)\]/g;
            /**
             * Represents generated source code with module references. Internal to the Angular compiler.
             */
            SourceModule = (function () {
                function SourceModule(moduleUrl, sourceWithModuleRefs) {
                    this.moduleUrl = moduleUrl;
                    this.sourceWithModuleRefs = sourceWithModuleRefs;
                }
                SourceModule.getSourceWithoutImports = function (sourceWithModuleRefs) {
                    return lang_1.StringWrapper.replaceAllMapped(sourceWithModuleRefs, MODULE_REGEXP, function (match) { return ''; });
                };
                SourceModule.prototype.getSourceWithImports = function () {
                    var _this = this;
                    var moduleAliases = {};
                    var imports = [];
                    var newSource = lang_1.StringWrapper.replaceAllMapped(this.sourceWithModuleRefs, MODULE_REGEXP, function (match) {
                        var moduleUrl = match[1];
                        var alias = moduleAliases[moduleUrl];
                        if (lang_1.isBlank(alias)) {
                            if (moduleUrl == _this.moduleUrl) {
                                alias = '';
                            }
                            else {
                                alias = "import" + imports.length;
                                imports.push([moduleUrl, alias]);
                            }
                            moduleAliases[moduleUrl] = alias;
                        }
                        return alias.length > 0 ? alias + "." : '';
                    });
                    return new SourceWithImports(newSource, imports);
                };
                return SourceModule;
            }());
            exports_1("SourceModule", SourceModule);
            SourceExpression = (function () {
                function SourceExpression(declarations, expression) {
                    this.declarations = declarations;
                    this.expression = expression;
                }
                return SourceExpression;
            }());
            exports_1("SourceExpression", SourceExpression);
            SourceExpressions = (function () {
                function SourceExpressions(declarations, expressions) {
                    this.declarations = declarations;
                    this.expressions = expressions;
                }
                return SourceExpressions;
            }());
            exports_1("SourceExpressions", SourceExpressions);
            /**
             * Represents generated source code with imports. Internal to the Angular compiler.
             */
            SourceWithImports = (function () {
                function SourceWithImports(source, imports) {
                    this.source = source;
                    this.imports = imports;
                }
                return SourceWithImports;
            }());
            exports_1("SourceWithImports", SourceWithImports);
        }
    }
});
//# sourceMappingURL=source_module.js.map