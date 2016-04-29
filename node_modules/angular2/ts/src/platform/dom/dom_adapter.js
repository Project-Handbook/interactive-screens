System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var DOM, DomAdapter;
    function setRootDomAdapter(adapter) {
        if (lang_1.isBlank(DOM)) {
            exports_1("DOM", DOM = adapter);
        }
    }
    exports_1("setRootDomAdapter", setRootDomAdapter);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            exports_1("DOM", DOM = null);
            /* tslint:disable:requireParameterType */
            /**
             * Provides DOM operations in an environment-agnostic way.
             */
            DomAdapter = (function () {
                function DomAdapter() {
                }
                Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
                    /**
                     * Maps attribute names to their corresponding property names for cases
                     * where attribute name doesn't match property name.
                     */
                    get: function () { return this._attrToPropMap; },
                    set: function (value) { this._attrToPropMap = value; },
                    enumerable: true,
                    configurable: true
                });
                ;
                ;
                return DomAdapter;
            }());
            exports_1("DomAdapter", DomAdapter);
        }
    }
});
//# sourceMappingURL=dom_adapter.js.map