System.register(['angular2/src/facade/lang', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, dom_adapter_1;
    var By;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            /**
             * Predicates for use with {@link DebugElement}'s query functions.
             */
            By = (function () {
                function By() {
                }
                /**
                 * Match all elements.
                 *
                 * ## Example
                 *
                 * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
                 */
                By.all = function () { return function (debugElement) { return true; }; };
                /**
                 * Match elements by the given CSS selector.
                 *
                 * ## Example
                 *
                 * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
                 */
                By.css = function (selector) {
                    return function (debugElement) {
                        return lang_1.isPresent(debugElement.nativeElement) ?
                            dom_adapter_1.DOM.elementMatches(debugElement.nativeElement, selector) :
                            false;
                    };
                };
                /**
                 * Match elements that have the given directive present.
                 *
                 * ## Example
                 *
                 * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
                 */
                By.directive = function (type) {
                    return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
                };
                return By;
            }());
            exports_1("By", By);
        }
    }
});
//# sourceMappingURL=by.js.map