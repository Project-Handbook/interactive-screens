System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DebugContext, ChangeDetectorGenConfig, ChangeDetectorDefinition;
    return {
        setters:[],
        execute: function() {
            DebugContext = (function () {
                function DebugContext(element, componentElement, directive, context, locals, injector) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.directive = directive;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                }
                return DebugContext;
            }());
            exports_1("DebugContext", DebugContext);
            ChangeDetectorGenConfig = (function () {
                function ChangeDetectorGenConfig(genDebugInfo, logBindingUpdate, useJit) {
                    this.genDebugInfo = genDebugInfo;
                    this.logBindingUpdate = logBindingUpdate;
                    this.useJit = useJit;
                }
                return ChangeDetectorGenConfig;
            }());
            exports_1("ChangeDetectorGenConfig", ChangeDetectorGenConfig);
            ChangeDetectorDefinition = (function () {
                function ChangeDetectorDefinition(id, strategy, variableNames, bindingRecords, eventRecords, directiveRecords, genConfig) {
                    this.id = id;
                    this.strategy = strategy;
                    this.variableNames = variableNames;
                    this.bindingRecords = bindingRecords;
                    this.eventRecords = eventRecords;
                    this.directiveRecords = directiveRecords;
                    this.genConfig = genConfig;
                }
                return ChangeDetectorDefinition;
            }());
            exports_1("ChangeDetectorDefinition", ChangeDetectorDefinition);
        }
    }
});
//# sourceMappingURL=interfaces.js.map