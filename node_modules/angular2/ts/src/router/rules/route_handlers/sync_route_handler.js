System.register(['angular2/src/facade/async', 'angular2/src/facade/lang', '../../instruction'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, lang_1, instruction_1;
    var SyncRouteHandler;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            }],
        execute: function() {
            SyncRouteHandler = (function () {
                function SyncRouteHandler(componentType, data) {
                    this.componentType = componentType;
                    /** @internal */
                    this._resolvedComponent = null;
                    this._resolvedComponent = async_1.PromiseWrapper.resolve(componentType);
                    this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
                }
                SyncRouteHandler.prototype.resolveComponentType = function () { return this._resolvedComponent; };
                return SyncRouteHandler;
            }());
            exports_1("SyncRouteHandler", SyncRouteHandler);
        }
    }
});
//# sourceMappingURL=sync_route_handler.js.map