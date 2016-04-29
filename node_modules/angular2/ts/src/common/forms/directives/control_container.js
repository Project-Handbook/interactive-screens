System.register(['./abstract_control_directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var abstract_control_directive_1;
    var ControlContainer;
    return {
        setters:[
            function (abstract_control_directive_1_1) {
                abstract_control_directive_1 = abstract_control_directive_1_1;
            }],
        execute: function() {
            /**
             * A directive that contains multiple {@link NgControl}s.
             *
             * Only used by the forms module.
             */
            ControlContainer = (function (_super) {
                __extends(ControlContainer, _super);
                function ControlContainer() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ControlContainer.prototype, "formDirective", {
                    /**
                     * Get the form to which this container belongs.
                     */
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ControlContainer.prototype, "path", {
                    /**
                     * Get the path to this container.
                     */
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                return ControlContainer;
            }(abstract_control_directive_1.AbstractControlDirective));
            exports_1("ControlContainer", ControlContainer);
        }
    }
});
//# sourceMappingURL=control_container.js.map