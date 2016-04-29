System.register(['angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dom_adapter_1;
    var Title;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            /**
             * A service that can be used to get and set the title of a current HTML document.
             *
             * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
             * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
             * (representing the `<title>` tag). Instead, this service can be used to set and get the current
             * title value.
             */
            Title = (function () {
                function Title() {
                }
                /**
                 * Get the title of the current HTML document.
                 * @returns {string}
                 */
                Title.prototype.getTitle = function () { return dom_adapter_1.DOM.getTitle(); };
                /**
                 * Set the title of the current HTML document.
                 * @param newTitle
                 */
                Title.prototype.setTitle = function (newTitle) { dom_adapter_1.DOM.setTitle(newTitle); };
                return Title;
            }());
            exports_1("Title", Title);
        }
    }
});
//# sourceMappingURL=title.js.map