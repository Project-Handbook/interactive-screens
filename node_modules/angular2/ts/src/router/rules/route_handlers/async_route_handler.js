System.register(['angular2/src/facade/lang', '../../instruction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, instruction_1;
    var AsyncRouteHandler;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            AsyncRouteHandler = (function () {
                function AsyncRouteHandler(_loader, data) {
                    if (data === void 0) { data = null; }
                    this._loader = _loader;
                    /** @internal */
                    this._resolvedComponent = null;
                    this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
                }
                AsyncRouteHandler.prototype.resolveComponentType = function () {
                    var _this = this;
                    if (lang_1.isPresent(this._resolvedComponent)) {
                        return this._resolvedComponent;
                    }
                    return this._resolvedComponent = this._loader().then(function (componentType) {
                        _this.componentType = componentType;
                        return componentType;
                    });
                };
                return AsyncRouteHandler;
            }());
            exports_1("AsyncRouteHandler", AsyncRouteHandler);
        }
    }
});
//# sourceMappingURL=async_route_handler.js.map