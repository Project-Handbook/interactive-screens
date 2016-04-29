System.register(["./runtime_compiler", './template_compiler', './directive_metadata', './source_module', 'angular2/src/core/platform_directives_and_pipes', 'angular2/src/compiler/template_ast', 'angular2/src/compiler/template_parser', 'angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/compiler/html_parser', 'angular2/src/compiler/template_normalizer', 'angular2/src/compiler/runtime_metadata', 'angular2/src/compiler/change_detector_compiler', 'angular2/src/compiler/style_compiler', 'angular2/src/compiler/view_compiler', 'angular2/src/compiler/proto_view_compiler', 'angular2/src/compiler/template_compiler', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/linker/compiler', 'angular2/src/compiler/runtime_compiler', 'angular2/src/compiler/schema/element_schema_registry', 'angular2/src/compiler/schema/dom_element_schema_registry', 'angular2/src/compiler/url_resolver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var runtime_compiler_1, lang_1, di_1, template_parser_1, html_parser_1, template_normalizer_1, runtime_metadata_1, change_detector_compiler_1, style_compiler_1, view_compiler_1, proto_view_compiler_1, template_compiler_1, change_detection_1, compiler_1, runtime_compiler_2, element_schema_registry_1, dom_element_schema_registry_1, url_resolver_1, change_detection_2;
    var COMPILER_PROVIDERS;
    function _createChangeDetectorGenConfig() {
        return new change_detection_1.ChangeDetectorGenConfig(lang_1.assertionsEnabled(), false, true);
    }
    var exportedNames_1 = {
        'COMPILER_PROVIDERS': true,
        'TemplateCompiler': true,
        'CompileDirectiveMetadata': true,
        'CompileTypeMetadata': true,
        'CompileTemplateMetadata': true,
        'SourceModule': true,
        'SourceWithImports': true,
        'PLATFORM_DIRECTIVES': true,
        'PLATFORM_PIPES': true,
        'TEMPLATE_TRANSFORMS': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (runtime_compiler_1_1) {
                runtime_compiler_1 = runtime_compiler_1_1;
            },
            function (template_compiler_2_1) {
                exports_1({
                    "TemplateCompiler": template_compiler_2_1["TemplateCompiler"]
                });
            },
            function (directive_metadata_1_1) {
                exports_1({
                    "CompileDirectiveMetadata": directive_metadata_1_1["CompileDirectiveMetadata"],
                    "CompileTypeMetadata": directive_metadata_1_1["CompileTypeMetadata"],
                    "CompileTemplateMetadata": directive_metadata_1_1["CompileTemplateMetadata"]
                });
            },
            function (source_module_1_1) {
                exports_1({
                    "SourceModule": source_module_1_1["SourceModule"],
                    "SourceWithImports": source_module_1_1["SourceWithImports"]
                });
            },
            function (platform_directives_and_pipes_1_1) {
                exports_1({
                    "PLATFORM_DIRECTIVES": platform_directives_and_pipes_1_1["PLATFORM_DIRECTIVES"],
                    "PLATFORM_PIPES": platform_directives_and_pipes_1_1["PLATFORM_PIPES"]
                });
            },
            function (template_ast_1_1) {
                exportStar_1(template_ast_1_1);
            },
            function (template_parser_2_1) {
                exports_1({
                    "TEMPLATE_TRANSFORMS": template_parser_2_1["TEMPLATE_TRANSFORMS"]
                });
                template_parser_1 = template_parser_2_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (html_parser_1_1) {
                html_parser_1 = html_parser_1_1;
            },
            function (template_normalizer_1_1) {
                template_normalizer_1 = template_normalizer_1_1;
            },
            function (runtime_metadata_1_1) {
                runtime_metadata_1 = runtime_metadata_1_1;
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
            function (template_compiler_1_1) {
                template_compiler_1 = template_compiler_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
                change_detection_2 = change_detection_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (runtime_compiler_2_1) {
                runtime_compiler_2 = runtime_compiler_2_1;
            },
            function (element_schema_registry_1_1) {
                element_schema_registry_1 = element_schema_registry_1_1;
            },
            function (dom_element_schema_registry_1_1) {
                dom_element_schema_registry_1 = dom_element_schema_registry_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            }],
        execute: function() {
            /**
             * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
             * template compilation.
             */
            exports_1("COMPILER_PROVIDERS", COMPILER_PROVIDERS = lang_1.CONST_EXPR([
                change_detection_2.Lexer,
                change_detection_2.Parser,
                html_parser_1.HtmlParser,
                template_parser_1.TemplateParser,
                template_normalizer_1.TemplateNormalizer,
                runtime_metadata_1.RuntimeMetadataResolver,
                url_resolver_1.DEFAULT_PACKAGE_URL_PROVIDER,
                style_compiler_1.StyleCompiler,
                proto_view_compiler_1.ProtoViewCompiler,
                view_compiler_1.ViewCompiler,
                change_detector_compiler_1.ChangeDetectionCompiler,
                new di_1.Provider(change_detection_1.ChangeDetectorGenConfig, { useFactory: _createChangeDetectorGenConfig, deps: [] }),
                template_compiler_1.TemplateCompiler,
                new di_1.Provider(runtime_compiler_2.RuntimeCompiler, { useClass: runtime_compiler_1.RuntimeCompiler_ }),
                new di_1.Provider(compiler_1.Compiler, { useExisting: runtime_compiler_2.RuntimeCompiler }),
                dom_element_schema_registry_1.DomElementSchemaRegistry,
                new di_1.Provider(element_schema_registry_1.ElementSchemaRegistry, { useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry }),
                url_resolver_1.UrlResolver
            ]));
        }
    }
});
//# sourceMappingURL=compiler.js.map