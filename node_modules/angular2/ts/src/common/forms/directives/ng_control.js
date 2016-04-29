System.register(['./abstract_control_directive', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var abstract_control_directive_1, exceptions_1;
    var NgControl;
    return {
        setters:[
            function (abstract_control_directive_1_1) {
                abstract_control_directive_1 = abstract_control_directive_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * A base class that all control directive extend.
             * It binds a {@link Control} object to a DOM element.
             *
             * Used internally by Angular forms.
             */
            NgControl = (function (_super) {
                __extends(NgControl, _super);
                function NgControl() {
                    _super.apply(this, arguments);
                    this.name = null;
                    this.valueAccessor = null;
                }
                Object.defineProperty(NgControl.prototype, "validator", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControl.prototype, "asyncValidator", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return NgControl;
            }(abstract_control_directive_1.AbstractControlDirective));
            exports_1("NgControl", NgControl);
        }
    }
});
//# sourceMappingURL=ng_control.js.map