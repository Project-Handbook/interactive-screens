System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/di', 'angular2/src/core/zone/ng_zone', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var lang_1, exceptions_1, di_1, ng_zone_1, collection_1;
    var EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            exports_1("EVENT_MANAGER_PLUGINS", EVENT_MANAGER_PLUGINS = lang_1.CONST_EXPR(new di_1.OpaqueToken("EventManagerPlugins")));
            EventManager = (function () {
                function EventManager(plugins, _zone) {
                    var _this = this;
                    this._zone = _zone;
                    plugins.forEach(function (p) { return p.manager = _this; });
                    this._plugins = collection_1.ListWrapper.reversed(plugins);
                }
                EventManager.prototype.addEventListener = function (element, eventName, handler) {
                    var plugin = this._findPluginFor(eventName);
                    return plugin.addEventListener(element, eventName, handler);
                };
                EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
                    var plugin = this._findPluginFor(eventName);
                    return plugin.addGlobalEventListener(target, eventName, handler);
                };
                EventManager.prototype.getZone = function () { return this._zone; };
                /** @internal */
                EventManager.prototype._findPluginFor = function (eventName) {
                    var plugins = this._plugins;
                    for (var i = 0; i < plugins.length; i++) {
                        var plugin = plugins[i];
                        if (plugin.supports(eventName)) {
                            return plugin;
                        }
                    }
                    throw new exceptions_1.BaseException("No event manager plugin found for event " + eventName);
                };
                EventManager = __decorate([
                    di_1.Injectable(),
                    __param(0, di_1.Inject(EVENT_MANAGER_PLUGINS)), 
                    __metadata('design:paramtypes', [Array, ng_zone_1.NgZone])
                ], EventManager);
                return EventManager;
            }());
            exports_1("EventManager", EventManager);
            EventManagerPlugin = (function () {
                function EventManagerPlugin() {
                }
                // That is equivalent to having supporting $event.target
                EventManagerPlugin.prototype.supports = function (eventName) { return false; };
                EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    throw "not implemented";
                };
                EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
                    throw "not implemented";
                };
                return EventManagerPlugin;
            }());
            exports_1("EventManagerPlugin", EventManagerPlugin);
        }
    }
});
//# sourceMappingURL=event_manager.js.map