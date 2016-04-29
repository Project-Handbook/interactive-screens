System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './event_manager', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var dom_adapter_1, lang_1, collection_1, event_manager_1, di_1;
    var modifierKeys, modifierKeyGetters, KeyEventsPlugin;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            modifierKeys = ['alt', 'control', 'meta', 'shift'];
            modifierKeyGetters = {
                'alt': function (event) { return event.altKey; },
                'control': function (event) { return event.ctrlKey; },
                'meta': function (event) { return event.metaKey; },
                'shift': function (event) { return event.shiftKey; }
            };
            KeyEventsPlugin = (function (_super) {
                __extends(KeyEventsPlugin, _super);
                function KeyEventsPlugin() {
                    _super.call(this);
                }
                KeyEventsPlugin.prototype.supports = function (eventName) {
                    return lang_1.isPresent(KeyEventsPlugin.parseEventName(eventName));
                };
                KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
                    var outsideHandler = KeyEventsPlugin.eventCallback(element, collection_1.StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(function () {
                        return dom_adapter_1.DOM.onAndCancel(element, collection_1.StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
                    });
                };
                KeyEventsPlugin.parseEventName = function (eventName) {
                    var parts = eventName.toLowerCase().split('.');
                    var domEventName = parts.shift();
                    if ((parts.length === 0) ||
                        !(lang_1.StringWrapper.equals(domEventName, 'keydown') ||
                            lang_1.StringWrapper.equals(domEventName, 'keyup'))) {
                        return null;
                    }
                    var key = KeyEventsPlugin._normalizeKey(parts.pop());
                    var fullKey = '';
                    modifierKeys.forEach(function (modifierName) {
                        if (collection_1.ListWrapper.contains(parts, modifierName)) {
                            collection_1.ListWrapper.remove(parts, modifierName);
                            fullKey += modifierName + '.';
                        }
                    });
                    fullKey += key;
                    if (parts.length != 0 || key.length === 0) {
                        // returning null instead of throwing to let another plugin process the event
                        return null;
                    }
                    var result = collection_1.StringMapWrapper.create();
                    collection_1.StringMapWrapper.set(result, 'domEventName', domEventName);
                    collection_1.StringMapWrapper.set(result, 'fullKey', fullKey);
                    return result;
                };
                KeyEventsPlugin.getEventFullKey = function (event) {
                    var fullKey = '';
                    var key = dom_adapter_1.DOM.getEventKey(event);
                    key = key.toLowerCase();
                    if (lang_1.StringWrapper.equals(key, ' ')) {
                        key = 'space'; // for readability
                    }
                    else if (lang_1.StringWrapper.equals(key, '.')) {
                        key = 'dot'; // because '.' is used as a separator in event names
                    }
                    modifierKeys.forEach(function (modifierName) {
                        if (modifierName != key) {
                            var modifierGetter = collection_1.StringMapWrapper.get(modifierKeyGetters, modifierName);
                            if (modifierGetter(event)) {
                                fullKey += modifierName + '.';
                            }
                        }
                    });
                    fullKey += key;
                    return fullKey;
                };
                KeyEventsPlugin.eventCallback = function (element, fullKey, handler, zone) {
                    return function (event) {
                        if (lang_1.StringWrapper.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                            zone.run(function () { return handler(event); });
                        }
                    };
                };
                /** @internal */
                KeyEventsPlugin._normalizeKey = function (keyName) {
                    // TODO: switch to a StringMap if the mapping grows too much
                    switch (keyName) {
                        case 'esc':
                            return 'escape';
                        default:
                            return keyName;
                    }
                };
                KeyEventsPlugin = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], KeyEventsPlugin);
                return KeyEventsPlugin;
            }(event_manager_1.EventManagerPlugin));
            exports_1("KeyEventsPlugin", KeyEventsPlugin);
        }
    }
});
//# sourceMappingURL=key_events.js.map