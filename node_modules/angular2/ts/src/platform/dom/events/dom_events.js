System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/core', './event_manager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var dom_adapter_1, core_1, event_manager_1;
    var DomEventsPlugin;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            }],
        execute: function() {
            DomEventsPlugin = (function (_super) {
                __extends(DomEventsPlugin, _super);
                function DomEventsPlugin() {
                    _super.apply(this, arguments);
                }
                // This plugin should come last in the list of plugins, because it accepts all
                // events.
                DomEventsPlugin.prototype.supports = function (eventName) { return true; };
                DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    var zone = this.manager.getZone();
                    var outsideHandler = function (event) { return zone.run(function () { return handler(event); }); };
                    return this.manager.getZone().runOutsideAngular(function () { return dom_adapter_1.DOM.onAndCancel(element, eventName, outsideHandler); });
                };
                DomEventsPlugin.prototype.addGlobalEventListener = function (target, eventName, handler) {
                    var element = dom_adapter_1.DOM.getGlobalEventTarget(target);
                    var zone = this.manager.getZone();
                    var outsideHandler = function (event) { return zone.run(function () { return handler(event); }); };
                    return this.manager.getZone().runOutsideAngular(function () { return dom_adapter_1.DOM.onAndCancel(element, eventName, outsideHandler); });
                };
                DomEventsPlugin = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DomEventsPlugin);
                return DomEventsPlugin;
            }(event_manager_1.EventManagerPlugin));
            exports_1("DomEventsPlugin", DomEventsPlugin);
        }
    }
});
//# sourceMappingURL=dom_events.js.map