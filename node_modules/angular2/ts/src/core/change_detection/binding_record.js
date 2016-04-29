System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var DIRECTIVE_LIFECYCLE, BINDING, DIRECTIVE, ELEMENT_PROPERTY, ELEMENT_ATTRIBUTE, ELEMENT_CLASS, ELEMENT_STYLE, TEXT_NODE, EVENT, HOST_EVENT, BindingTarget, BindingRecord;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            DIRECTIVE_LIFECYCLE = "directiveLifecycle";
            BINDING = "native";
            DIRECTIVE = "directive";
            ELEMENT_PROPERTY = "elementProperty";
            ELEMENT_ATTRIBUTE = "elementAttribute";
            ELEMENT_CLASS = "elementClass";
            ELEMENT_STYLE = "elementStyle";
            TEXT_NODE = "textNode";
            EVENT = "event";
            HOST_EVENT = "hostEvent";
            BindingTarget = (function () {
                function BindingTarget(mode, elementIndex, name, unit, debug) {
                    this.mode = mode;
                    this.elementIndex = elementIndex;
                    this.name = name;
                    this.unit = unit;
                    this.debug = debug;
                }
                BindingTarget.prototype.isDirective = function () { return this.mode === DIRECTIVE; };
                BindingTarget.prototype.isElementProperty = function () { return this.mode === ELEMENT_PROPERTY; };
                BindingTarget.prototype.isElementAttribute = function () { return this.mode === ELEMENT_ATTRIBUTE; };
                BindingTarget.prototype.isElementClass = function () { return this.mode === ELEMENT_CLASS; };
                BindingTarget.prototype.isElementStyle = function () { return this.mode === ELEMENT_STYLE; };
                BindingTarget.prototype.isTextNode = function () { return this.mode === TEXT_NODE; };
                return BindingTarget;
            }());
            exports_1("BindingTarget", BindingTarget);
            BindingRecord = (function () {
                function BindingRecord(mode, target, implicitReceiver, ast, setter, lifecycleEvent, directiveRecord) {
                    this.mode = mode;
                    this.target = target;
                    this.implicitReceiver = implicitReceiver;
                    this.ast = ast;
                    this.setter = setter;
                    this.lifecycleEvent = lifecycleEvent;
                    this.directiveRecord = directiveRecord;
                }
                BindingRecord.prototype.isDirectiveLifecycle = function () { return this.mode === DIRECTIVE_LIFECYCLE; };
                BindingRecord.prototype.callOnChanges = function () {
                    return lang_1.isPresent(this.directiveRecord) && this.directiveRecord.callOnChanges;
                };
                BindingRecord.prototype.isDefaultChangeDetection = function () {
                    return lang_1.isBlank(this.directiveRecord) || this.directiveRecord.isDefaultChangeDetection();
                };
                BindingRecord.createDirectiveDoCheck = function (directiveRecord) {
                    return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "DoCheck", directiveRecord);
                };
                BindingRecord.createDirectiveOnInit = function (directiveRecord) {
                    return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnInit", directiveRecord);
                };
                BindingRecord.createDirectiveOnChanges = function (directiveRecord) {
                    return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnChanges", directiveRecord);
                };
                BindingRecord.createForDirective = function (ast, propertyName, setter, directiveRecord) {
                    var elementIndex = directiveRecord.directiveIndex.elementIndex;
                    var t = new BindingTarget(DIRECTIVE, elementIndex, propertyName, null, ast.toString());
                    return new BindingRecord(DIRECTIVE, t, 0, ast, setter, null, directiveRecord);
                };
                BindingRecord.createForElementProperty = function (ast, elementIndex, propertyName) {
                    var t = new BindingTarget(ELEMENT_PROPERTY, elementIndex, propertyName, null, ast.toString());
                    return new BindingRecord(BINDING, t, 0, ast, null, null, null);
                };
                BindingRecord.createForElementAttribute = function (ast, elementIndex, attributeName) {
                    var t = new BindingTarget(ELEMENT_ATTRIBUTE, elementIndex, attributeName, null, ast.toString());
                    return new BindingRecord(BINDING, t, 0, ast, null, null, null);
                };
                BindingRecord.createForElementClass = function (ast, elementIndex, className) {
                    var t = new BindingTarget(ELEMENT_CLASS, elementIndex, className, null, ast.toString());
                    return new BindingRecord(BINDING, t, 0, ast, null, null, null);
                };
                BindingRecord.createForElementStyle = function (ast, elementIndex, styleName, unit) {
                    var t = new BindingTarget(ELEMENT_STYLE, elementIndex, styleName, unit, ast.toString());
                    return new BindingRecord(BINDING, t, 0, ast, null, null, null);
                };
                BindingRecord.createForHostProperty = function (directiveIndex, ast, propertyName) {
                    var t = new BindingTarget(ELEMENT_PROPERTY, directiveIndex.elementIndex, propertyName, null, ast.toString());
                    return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
                };
                BindingRecord.createForHostAttribute = function (directiveIndex, ast, attributeName) {
                    var t = new BindingTarget(ELEMENT_ATTRIBUTE, directiveIndex.elementIndex, attributeName, null, ast.toString());
                    return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
                };
                BindingRecord.createForHostClass = function (directiveIndex, ast, className) {
                    var t = new BindingTarget(ELEMENT_CLASS, directiveIndex.elementIndex, className, null, ast.toString());
                    return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
                };
                BindingRecord.createForHostStyle = function (directiveIndex, ast, styleName, unit) {
                    var t = new BindingTarget(ELEMENT_STYLE, directiveIndex.elementIndex, styleName, unit, ast.toString());
                    return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
                };
                BindingRecord.createForTextNode = function (ast, elementIndex) {
                    var t = new BindingTarget(TEXT_NODE, elementIndex, null, null, ast.toString());
                    return new BindingRecord(BINDING, t, 0, ast, null, null, null);
                };
                BindingRecord.createForEvent = function (ast, eventName, elementIndex) {
                    var t = new BindingTarget(EVENT, elementIndex, eventName, null, ast.toString());
                    return new BindingRecord(EVENT, t, 0, ast, null, null, null);
                };
                BindingRecord.createForHostEvent = function (ast, eventName, directiveRecord) {
                    var directiveIndex = directiveRecord.directiveIndex;
                    var t = new BindingTarget(HOST_EVENT, directiveIndex.elementIndex, eventName, null, ast.toString());
                    return new BindingRecord(HOST_EVENT, t, directiveIndex, ast, null, null, directiveRecord);
                };
                return BindingRecord;
            }());
            exports_1("BindingRecord", BindingRecord);
        }
    }
});
//# sourceMappingURL=binding_record.js.map