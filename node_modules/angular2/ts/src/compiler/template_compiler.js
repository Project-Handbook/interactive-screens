System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/async', './directive_metadata', './template_ast', 'angular2/src/core/di', './source_module', './change_detector_compiler', './style_compiler', './view_compiler', './proto_view_compiler', './template_parser', './template_normalizer', './runtime_metadata', 'angular2/src/core/linker/view', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/linker/resolved_metadata_cache', './util'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, collection_1, async_1, directive_metadata_1, template_ast_1, di_1, source_module_1, change_detector_compiler_1, style_compiler_1, view_compiler_1, proto_view_compiler_1, template_parser_1, template_normalizer_1, runtime_metadata_1, view_1, change_detection_1, resolved_metadata_cache_1, util_1;
    var METADATA_CACHE_MODULE_REF, TemplateCompiler, NormalizedComponentWithViewDirectives, CompiledTemplate, DirectiveCollector, PipeVisitor;
    function assertComponent(meta) {
        if (!meta.isComponent) {
            throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
        }
    }
    function templateModuleUrl(moduleUrl) {
        var urlWithoutSuffix = moduleUrl.substring(0, moduleUrl.length - util_1.MODULE_SUFFIX.length);
        return urlWithoutSuffix + ".template" + util_1.MODULE_SUFFIX;
    }
    function codeGenHostViewFactoryName(type) {
        return "hostViewFactory_" + type.name;
    }
    function codeGenComponentViewFactoryName(nestedCompType) {
        return source_module_1.moduleRef(templateModuleUrl(nestedCompType.type.moduleUrl)) + "viewFactory_" + nestedCompType.type.name + "0";
    }
    function mergeStringMaps(maps) {
        var result = {};
        maps.forEach(function (map) { collection_1.StringMapWrapper.forEach(map, function (value, key) { result[key] = value; }); });
        return result;
    }
    function removeDuplicates(items) {
        var res = [];
        items.forEach(function (item) {
            var hasMatch = res.filter(function (r) { return r.type.name == item.type.name && r.type.moduleUrl == item.type.moduleUrl &&
                r.type.runtime == item.type.runtime; })
                .length > 0;
            if (!hasMatch) {
                res.push(item);
            }
        });
        return res;
    }
    function filterPipes(template, allPipes) {
        var visitor = new PipeVisitor();
        template_ast_1.templateVisitAll(visitor, template);
        return allPipes.filter(function (pipeMeta) { return collection_1.SetWrapper.has(visitor.collector.pipes, pipeMeta.name); });
    }
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
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (directive_metadata_1_1) {
                directive_metadata_1 = directive_metadata_1_1;
            },
            function (template_ast_1_1) {
                template_ast_1 = template_ast_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
            },
            function (change_detector_compiler_1_1) {
                change_detector_compiler_1 = change_detector_compiler_1_1;
            },
            function (style_compiler_1_1) {
                style_compiler_1 = style_compiler_1_1;
            },
            function (view_compiler_1_1) {
                view_compiler_1 = view_compiler_1_1;
            },
            function (proto_view_compiler_1_1) {
                proto_view_compiler_1 = proto_view_compiler_1_1;
            },
            function (template_parser_1_1) {
                template_parser_1 = template_parser_1_1;
            },
            function (template_normalizer_1_1) {
                template_normalizer_1 = template_normalizer_1_1;
            },
            function (runtime_metadata_1_1) {
                runtime_metadata_1 = runtime_metadata_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (resolved_metadata_cache_1_1) {
                resolved_metadata_cache_1 = resolved_metadata_cache_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            exports_1("METADATA_CACHE_MODULE_REF", METADATA_CACHE_MODULE_REF = source_module_1.moduleRef('package:angular2/src/core/linker/resolved_metadata_cache' + util_1.MODULE_SUFFIX));
            /**
             * An internal module of the Angular compiler that begins with component types,
             * extracts templates, and eventually produces a compiled version of the component
             * ready for linking into an application.
             */
            TemplateCompiler = (function () {
                function TemplateCompiler(_runtimeMetadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _cdCompiler, _protoViewCompiler, _viewCompiler, _resolvedMetadataCache, _genConfig) {
                    this._runtimeMetadataResolver = _runtimeMetadataResolver;
                    this._templateNormalizer = _templateNormalizer;
                    this._templateParser = _templateParser;
                    this._styleCompiler = _styleCompiler;
                    this._cdCompiler = _cdCompiler;
                    this._protoViewCompiler = _protoViewCompiler;
                    this._viewCompiler = _viewCompiler;
                    this._resolvedMetadataCache = _resolvedMetadataCache;
                    this._genConfig = _genConfig;
                    this._hostCacheKeys = new Map();
                    this._compiledTemplateCache = new Map();
                    this._compiledTemplateDone = new Map();
                }
                TemplateCompiler.prototype.normalizeDirectiveMetadata = function (directive) {
                    if (!directive.isComponent) {
                        // For non components there is nothing to be normalized yet.
                        return async_1.PromiseWrapper.resolve(directive);
                    }
                    return this._templateNormalizer.normalizeTemplate(directive.type, directive.template)
                        .then(function (normalizedTemplate) { return new directive_metadata_1.CompileDirectiveMetadata({
                        type: directive.type,
                        isComponent: directive.isComponent,
                        dynamicLoadable: directive.dynamicLoadable,
                        selector: directive.selector,
                        exportAs: directive.exportAs,
                        changeDetection: directive.changeDetection,
                        inputs: directive.inputs,
                        outputs: directive.outputs,
                        hostListeners: directive.hostListeners,
                        hostProperties: directive.hostProperties,
                        hostAttributes: directive.hostAttributes,
                        lifecycleHooks: directive.lifecycleHooks,
                        providers: directive.providers,
                        template: normalizedTemplate
                    }); });
                };
                TemplateCompiler.prototype.compileHostComponentRuntime = function (type) {
                    var compMeta = this._runtimeMetadataResolver.getDirectiveMetadata(type);
                    var hostCacheKey = this._hostCacheKeys.get(type);
                    if (lang_1.isBlank(hostCacheKey)) {
                        hostCacheKey = new Object();
                        this._hostCacheKeys.set(type, hostCacheKey);
                        assertComponent(compMeta);
                        var hostMeta = directive_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                        this._compileComponentRuntime(hostCacheKey, hostMeta, [compMeta], [], []);
                    }
                    return this._compiledTemplateDone.get(hostCacheKey)
                        .then(function (compiledTemplate) {
                        return new view_1.HostViewFactory(compMeta.selector, compiledTemplate.viewFactory);
                    });
                };
                TemplateCompiler.prototype.clearCache = function () {
                    this._styleCompiler.clearCache();
                    this._compiledTemplateCache.clear();
                    this._compiledTemplateDone.clear();
                    this._hostCacheKeys.clear();
                };
                TemplateCompiler.prototype.compileTemplatesCodeGen = function (components) {
                    var _this = this;
                    if (components.length === 0) {
                        throw new exceptions_1.BaseException('No components given');
                    }
                    var declarations = [];
                    components.forEach(function (componentWithDirs) {
                        var compMeta = componentWithDirs.component;
                        assertComponent(compMeta);
                        _this._compileComponentCodeGen(compMeta, componentWithDirs.directives, componentWithDirs.pipes, declarations);
                        if (compMeta.dynamicLoadable) {
                            var hostMeta = directive_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
                            var viewFactoryExpression = _this._compileComponentCodeGen(hostMeta, [compMeta], [], declarations);
                            var constructionKeyword = lang_1.IS_DART ? 'const' : 'new';
                            var compiledTemplateExpr = constructionKeyword + " " + proto_view_compiler_1.APP_VIEW_MODULE_REF + "HostViewFactory('" + compMeta.selector + "'," + viewFactoryExpression + ")";
                            var varName = codeGenHostViewFactoryName(compMeta.type);
                            declarations.push("" + util_1.codeGenExportVariable(varName) + compiledTemplateExpr + ";");
                        }
                    });
                    var moduleUrl = components[0].component.type.moduleUrl;
                    return new source_module_1.SourceModule("" + templateModuleUrl(moduleUrl), declarations.join('\n'));
                };
                TemplateCompiler.prototype.compileStylesheetCodeGen = function (stylesheetUrl, cssText) {
                    return this._styleCompiler.compileStylesheetCodeGen(stylesheetUrl, cssText);
                };
                TemplateCompiler.prototype._compileComponentRuntime = function (cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath) {
                    var _this = this;
                    var uniqViewDirectives = removeDuplicates(viewDirectives);
                    var uniqViewPipes = removeDuplicates(pipes);
                    var compiledTemplate = this._compiledTemplateCache.get(cacheKey);
                    var done = this._compiledTemplateDone.get(cacheKey);
                    if (lang_1.isBlank(compiledTemplate)) {
                        compiledTemplate = new CompiledTemplate();
                        this._compiledTemplateCache.set(cacheKey, compiledTemplate);
                        done = async_1.PromiseWrapper
                            .all([this._styleCompiler.compileComponentRuntime(compMeta.template)].concat(uniqViewDirectives.map(function (dirMeta) { return _this.normalizeDirectiveMetadata(dirMeta); })))
                            .then(function (stylesAndNormalizedViewDirMetas) {
                            var normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                            var styles = stylesAndNormalizedViewDirMetas[0];
                            var parsedTemplate = _this._templateParser.parse(compMeta.template.template, normalizedViewDirMetas, uniqViewPipes, compMeta.type.name);
                            var childPromises = [];
                            var usedDirectives = DirectiveCollector.findUsedDirectives(parsedTemplate);
                            usedDirectives.components.forEach(function (component) { return _this._compileNestedComponentRuntime(component, compilingComponentsPath, childPromises); });
                            return async_1.PromiseWrapper.all(childPromises)
                                .then(function (_) {
                                var filteredPipes = filterPipes(parsedTemplate, uniqViewPipes);
                                compiledTemplate.init(_this._createViewFactoryRuntime(compMeta, parsedTemplate, usedDirectives.directives, styles, filteredPipes));
                                return compiledTemplate;
                            });
                        });
                        this._compiledTemplateDone.set(cacheKey, done);
                    }
                    return compiledTemplate;
                };
                TemplateCompiler.prototype._compileNestedComponentRuntime = function (childComponentDir, parentCompilingComponentsPath, childPromises) {
                    var compilingComponentsPath = collection_1.ListWrapper.clone(parentCompilingComponentsPath);
                    var childCacheKey = childComponentDir.type.runtime;
                    var childViewDirectives = this._runtimeMetadataResolver.getViewDirectivesMetadata(childComponentDir.type.runtime);
                    var childViewPipes = this._runtimeMetadataResolver.getViewPipesMetadata(childComponentDir.type.runtime);
                    var childIsRecursive = collection_1.ListWrapper.contains(compilingComponentsPath, childCacheKey);
                    compilingComponentsPath.push(childCacheKey);
                    this._compileComponentRuntime(childCacheKey, childComponentDir, childViewDirectives, childViewPipes, compilingComponentsPath);
                    if (!childIsRecursive) {
                        // Only wait for a child if it is not a cycle
                        childPromises.push(this._compiledTemplateDone.get(childCacheKey));
                    }
                };
                TemplateCompiler.prototype._createViewFactoryRuntime = function (compMeta, parsedTemplate, directives, styles, pipes) {
                    var _this = this;
                    if (lang_1.IS_DART || !this._genConfig.useJit) {
                        var changeDetectorFactories = this._cdCompiler.compileComponentRuntime(compMeta.type, compMeta.changeDetection, parsedTemplate);
                        var protoViews = this._protoViewCompiler.compileProtoViewRuntime(this._resolvedMetadataCache, compMeta, parsedTemplate, pipes);
                        return this._viewCompiler.compileComponentRuntime(compMeta, parsedTemplate, styles, protoViews.protoViews, changeDetectorFactories, function (compMeta) { return _this._getNestedComponentViewFactory(compMeta); });
                    }
                    else {
                        var declarations = [];
                        var viewFactoryExpr = this._createViewFactoryCodeGen('resolvedMetadataCache', compMeta, new source_module_1.SourceExpression([], 'styles'), parsedTemplate, pipes, declarations);
                        var vars = { 'exports': {}, 'styles': styles, 'resolvedMetadataCache': this._resolvedMetadataCache };
                        directives.forEach(function (dirMeta) {
                            vars[dirMeta.type.name] = dirMeta.type.runtime;
                            if (dirMeta.isComponent && dirMeta.type.runtime !== compMeta.type.runtime) {
                                vars[("viewFactory_" + dirMeta.type.name + "0")] = _this._getNestedComponentViewFactory(dirMeta);
                            }
                        });
                        pipes.forEach(function (pipeMeta) { return vars[pipeMeta.type.name] = pipeMeta.type.runtime; });
                        var declarationsWithoutImports = source_module_1.SourceModule.getSourceWithoutImports(declarations.join('\n'));
                        return lang_1.evalExpression("viewFactory_" + compMeta.type.name, viewFactoryExpr, declarationsWithoutImports, mergeStringMaps([vars, change_detector_compiler_1.CHANGE_DETECTION_JIT_IMPORTS, proto_view_compiler_1.PROTO_VIEW_JIT_IMPORTS, view_compiler_1.VIEW_JIT_IMPORTS]));
                    }
                };
                TemplateCompiler.prototype._getNestedComponentViewFactory = function (compMeta) {
                    return this._compiledTemplateCache.get(compMeta.type.runtime).viewFactory;
                };
                TemplateCompiler.prototype._compileComponentCodeGen = function (compMeta, directives, pipes, targetDeclarations) {
                    var uniqueDirectives = removeDuplicates(directives);
                    var uniqPipes = removeDuplicates(pipes);
                    var styleExpr = this._styleCompiler.compileComponentCodeGen(compMeta.template);
                    var parsedTemplate = this._templateParser.parse(compMeta.template.template, uniqueDirectives, uniqPipes, compMeta.type.name);
                    var filteredPipes = filterPipes(parsedTemplate, uniqPipes);
                    return this._createViewFactoryCodeGen(METADATA_CACHE_MODULE_REF + "CODEGEN_RESOLVED_METADATA_CACHE", compMeta, styleExpr, parsedTemplate, filteredPipes, targetDeclarations);
                };
                TemplateCompiler.prototype._createViewFactoryCodeGen = function (resolvedMetadataCacheExpr, compMeta, styleExpr, parsedTemplate, pipes, targetDeclarations) {
                    var changeDetectorsExprs = this._cdCompiler.compileComponentCodeGen(compMeta.type, compMeta.changeDetection, parsedTemplate);
                    var protoViewExprs = this._protoViewCompiler.compileProtoViewCodeGen(new util_1.Expression(resolvedMetadataCacheExpr), compMeta, parsedTemplate, pipes);
                    var viewFactoryExpr = this._viewCompiler.compileComponentCodeGen(compMeta, parsedTemplate, styleExpr, protoViewExprs.protoViews, changeDetectorsExprs, codeGenComponentViewFactoryName);
                    util_1.addAll(changeDetectorsExprs.declarations, targetDeclarations);
                    util_1.addAll(protoViewExprs.declarations, targetDeclarations);
                    util_1.addAll(viewFactoryExpr.declarations, targetDeclarations);
                    return viewFactoryExpr.expression;
                };
                TemplateCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [runtime_metadata_1.RuntimeMetadataResolver, template_normalizer_1.TemplateNormalizer, template_parser_1.TemplateParser, style_compiler_1.StyleCompiler, change_detector_compiler_1.ChangeDetectionCompiler, proto_view_compiler_1.ProtoViewCompiler, view_compiler_1.ViewCompiler, resolved_metadata_cache_1.ResolvedMetadataCache, change_detection_1.ChangeDetectorGenConfig])
                ], TemplateCompiler);
                return TemplateCompiler;
            }());
            exports_1("TemplateCompiler", TemplateCompiler);
            NormalizedComponentWithViewDirectives = (function () {
                function NormalizedComponentWithViewDirectives(component, directives, pipes) {
                    this.component = component;
                    this.directives = directives;
                    this.pipes = pipes;
                }
                return NormalizedComponentWithViewDirectives;
            }());
            exports_1("NormalizedComponentWithViewDirectives", NormalizedComponentWithViewDirectives);
            CompiledTemplate = (function () {
                function CompiledTemplate() {
                    this.viewFactory = null;
                }
                CompiledTemplate.prototype.init = function (viewFactory) { this.viewFactory = viewFactory; };
                return CompiledTemplate;
            }());
            DirectiveCollector = (function () {
                function DirectiveCollector() {
                    this.directives = [];
                    this.components = [];
                }
                DirectiveCollector.findUsedDirectives = function (parsedTemplate) {
                    var collector = new DirectiveCollector();
                    template_ast_1.templateVisitAll(collector, parsedTemplate);
                    return collector;
                };
                DirectiveCollector.prototype.visitBoundText = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitText = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitNgContent = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitElement = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                DirectiveCollector.prototype.visitEmbeddedTemplate = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                DirectiveCollector.prototype.visitVariable = function (ast, ctx) { return null; };
                DirectiveCollector.prototype.visitAttr = function (ast, attrNameAndValues) { return null; };
                DirectiveCollector.prototype.visitDirective = function (ast, ctx) {
                    if (ast.directive.isComponent) {
                        this.components.push(ast.directive);
                    }
                    this.directives.push(ast.directive);
                    return null;
                };
                DirectiveCollector.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    return null;
                };
                DirectiveCollector.prototype.visitDirectiveProperty = function (ast, context) { return null; };
                DirectiveCollector.prototype.visitElementProperty = function (ast, context) { return null; };
                return DirectiveCollector;
            }());
            PipeVisitor = (function () {
                function PipeVisitor() {
                    this.collector = new template_parser_1.PipeCollector();
                }
                PipeVisitor.prototype.visitBoundText = function (ast, context) {
                    ast.value.visit(this.collector);
                    return null;
                };
                PipeVisitor.prototype.visitText = function (ast, context) { return null; };
                PipeVisitor.prototype.visitNgContent = function (ast, context) { return null; };
                PipeVisitor.prototype.visitElement = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.inputs);
                    template_ast_1.templateVisitAll(this, ast.outputs);
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                PipeVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
                    template_ast_1.templateVisitAll(this, ast.outputs);
                    template_ast_1.templateVisitAll(this, ast.directives);
                    template_ast_1.templateVisitAll(this, ast.children);
                    return null;
                };
                PipeVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
                PipeVisitor.prototype.visitAttr = function (ast, attrNameAndValues) { return null; };
                PipeVisitor.prototype.visitDirective = function (ast, ctx) {
                    template_ast_1.templateVisitAll(this, ast.inputs);
                    template_ast_1.templateVisitAll(this, ast.hostEvents);
                    template_ast_1.templateVisitAll(this, ast.hostProperties);
                    return null;
                };
                PipeVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
                    ast.handler.visit(this.collector);
                    return null;
                };
                PipeVisitor.prototype.visitDirectiveProperty = function (ast, context) {
                    ast.value.visit(this.collector);
                    return null;
                };
                PipeVisitor.prototype.visitElementProperty = function (ast, context) {
                    ast.value.visit(this.collector);
                    return null;
                };
                return PipeVisitor;
            }());
        }
    }
});
//# sourceMappingURL=template_compiler.js.map