System.register(['angular2/src/facade/lang', './constants'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, constants_1;
    var DirectiveIndex, DirectiveRecord;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            DirectiveIndex = (function () {
                function DirectiveIndex(elementIndex, directiveIndex) {
                    this.elementIndex = elementIndex;
                    this.directiveIndex = directiveIndex;
                }
                Object.defineProperty(DirectiveIndex.prototype, "name", {
                    get: function () { return this.elementIndex + "_" + this.directiveIndex; },
                    enumerable: true,
                    configurable: true
                });
                return DirectiveIndex;
            }());
            exports_1("DirectiveIndex", DirectiveIndex);
            DirectiveRecord = (function () {
                function DirectiveRecord(_a) {
                    var _b = _a === void 0 ? {} : _a, directiveIndex = _b.directiveIndex, callAfterContentInit = _b.callAfterContentInit, callAfterContentChecked = _b.callAfterContentChecked, callAfterViewInit = _b.callAfterViewInit, callAfterViewChecked = _b.callAfterViewChecked, callOnChanges = _b.callOnChanges, callDoCheck = _b.callDoCheck, callOnInit = _b.callOnInit, callOnDestroy = _b.callOnDestroy, changeDetection = _b.changeDetection, outputs = _b.outputs;
                    this.directiveIndex = directiveIndex;
                    this.callAfterContentInit = lang_1.normalizeBool(callAfterContentInit);
                    this.callAfterContentChecked = lang_1.normalizeBool(callAfterContentChecked);
                    this.callOnChanges = lang_1.normalizeBool(callOnChanges);
                    this.callAfterViewInit = lang_1.normalizeBool(callAfterViewInit);
                    this.callAfterViewChecked = lang_1.normalizeBool(callAfterViewChecked);
                    this.callDoCheck = lang_1.normalizeBool(callDoCheck);
                    this.callOnInit = lang_1.normalizeBool(callOnInit);
                    this.callOnDestroy = lang_1.normalizeBool(callOnDestroy);
                    this.changeDetection = changeDetection;
                    this.outputs = outputs;
                }
                DirectiveRecord.prototype.isDefaultChangeDetection = function () {
                    return constants_1.isDefaultChangeDetectionStrategy(this.changeDetection);
                };
                return DirectiveRecord;
            }());
            exports_1("DirectiveRecord", DirectiveRecord);
        }
    }
});
//# sourceMappingURL=directive_record.js.map