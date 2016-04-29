System.register(['angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1;
    var Rectangle, Ruler;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            Rectangle = (function () {
                function Rectangle(left, top, width, height) {
                    this.left = left;
                    this.right = left + width;
                    this.top = top;
                    this.bottom = top + height;
                    this.height = height;
                    this.width = width;
                }
                return Rectangle;
            }());
            exports_1("Rectangle", Rectangle);
            Ruler = (function () {
                function Ruler(domAdapter) {
                    this.domAdapter = domAdapter;
                }
                Ruler.prototype.measure = function (el) {
                    var clntRect = this.domAdapter.getBoundingClientRect(el.nativeElement);
                    // even if getBoundingClientRect is synchronous we use async API in preparation for further
                    // changes
                    return async_1.PromiseWrapper.resolve(new Rectangle(clntRect.left, clntRect.top, clntRect.width, clntRect.height));
                };
                return Ruler;
            }());
            exports_1("Ruler", Ruler);
        }
    }
});
//# sourceMappingURL=ruler.js.map