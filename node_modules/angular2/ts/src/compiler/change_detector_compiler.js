System.register(['./source_module', 'angular2/src/core/change_detection/change_detection_jit_generator', 'angular2/src/core/change_detection/abstract_change_detector', 'angular2/src/core/change_detection/change_detection_util', 'angular2/src/core/change_detection/constants', './change_definition_factory', 'angular2/src/facade/lang', 'angular2/src/core/change_detection/change_detection', 'angular2/src/transform/template_compiler/change_detector_codegen', './util', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var source_module_1, change_detection_jit_generator_1, abstract_change_detector_1, change_detection_util_1, constants_1, change_definition_factory_1, lang_1, change_detection_1, change_detector_codegen_1, util_1, di_1;
    var ABSTRACT_CHANGE_DETECTOR, UTIL, CHANGE_DETECTOR_STATE, CHANGE_DETECTION_JIT_IMPORTS, ABSTRACT_CHANGE_DETECTOR_MODULE, UTIL_MODULE, PREGEN_PROTO_CHANGE_DETECTOR_MODULE, CONSTANTS_MODULE, ChangeDetectionCompiler;
    return {
        setters:[
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
            },
            function (change_detection_jit_generator_1_1) {
                change_detection_jit_generator_1 = change_detection_jit_generator_1_1;
            },
            function (abstract_change_detector_1_1) {
                abstract_change_detector_1 = abstract_change_detector_1_1;
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (change_definition_factory_1_1) {
                change_definition_factory_1 = change_definition_factory_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (change_detector_codegen_1_1) {
                change_detector_codegen_1 = change_detector_codegen_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
            UTIL = "ChangeDetectionUtil";
            CHANGE_DETECTOR_STATE = "ChangeDetectorState";
            exports_1("CHANGE_DETECTION_JIT_IMPORTS", CHANGE_DETECTION_JIT_IMPORTS = lang_1.CONST_EXPR({
                'AbstractChangeDetector': abstract_change_detector_1.AbstractChangeDetector,
                'ChangeDetectionUtil': change_detection_util_1.ChangeDetectionUtil,
                'ChangeDetectorState': constants_1.ChangeDetectorState
            }));
            ABSTRACT_CHANGE_DETECTOR_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/abstract_change_detector" + util_1.MODULE_SUFFIX);
            UTIL_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/change_detection_util" + util_1.MODULE_SUFFIX);
            PREGEN_PROTO_CHANGE_DETECTOR_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/pregen_proto_change_detector" + util_1.MODULE_SUFFIX);
            CONSTANTS_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/constants" + util_1.MODULE_SUFFIX);
            ChangeDetectionCompiler = (function () {
                function ChangeDetectionCompiler(_genConfig) {
                    this._genConfig = _genConfig;
                }
                ChangeDetectionCompiler.prototype.compileComponentRuntime = function (componentType, strategy, parsedTemplate) {
                    var _this = this;
                    var changeDetectorDefinitions = change_definition_factory_1.createChangeDetectorDefinitions(componentType, strategy, this._genConfig, parsedTemplate);
                    return changeDetectorDefinitions.map(function (definition) {
                        return _this._createChangeDetectorFactory(definition);
                    });
                };
                ChangeDetectionCompiler.prototype._createChangeDetectorFactory = function (definition) {
                    var proto = new change_detection_1.DynamicProtoChangeDetector(definition);
                    return function () { return proto.instantiate(); };
                };
                ChangeDetectionCompiler.prototype.compileComponentCodeGen = function (componentType, strategy, parsedTemplate) {
                    var changeDetectorDefinitions = change_definition_factory_1.createChangeDetectorDefinitions(componentType, strategy, this._genConfig, parsedTemplate);
                    var factories = [];
                    var index = 0;
                    var sourceParts = changeDetectorDefinitions.map(function (definition) {
                        var codegen;
                        var sourcePart;
                        // TODO(tbosch): move the 2 code generators to the same place, one with .dart and one with .ts
                        // suffix
                        // and have the same API for calling them!
                        if (lang_1.IS_DART) {
                            codegen = new change_detector_codegen_1.Codegen(PREGEN_PROTO_CHANGE_DETECTOR_MODULE);
                            var className = "_" + definition.id;
                            var typeRef = (index === 0 && componentType.isHost) ?
                                'dynamic' :
                                "" + source_module_1.moduleRef(componentType.moduleUrl) + componentType.name;
                            codegen.generate(typeRef, className, definition);
                            factories.push(className + ".newChangeDetector");
                            sourcePart = codegen.toString();
                        }
                        else {
                            codegen = new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, "" + UTIL_MODULE + UTIL, "" + ABSTRACT_CHANGE_DETECTOR_MODULE + ABSTRACT_CHANGE_DETECTOR, "" + CONSTANTS_MODULE + CHANGE_DETECTOR_STATE);
                            factories.push("function() { return new " + codegen.typeName + "(); }");
                            sourcePart = codegen.generateSource();
                        }
                        index++;
                        return sourcePart;
                    });
                    return new source_module_1.SourceExpressions(sourceParts, factories);
                };
                ChangeDetectionCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [change_detection_1.ChangeDetectorGenConfig])
                ], ChangeDetectionCompiler);
                return ChangeDetectionCompiler;
            }());
            exports_1("ChangeDetectionCompiler", ChangeDetectionCompiler);
        }
    }
});
//# sourceMappingURL=change_detector_compiler.js.map