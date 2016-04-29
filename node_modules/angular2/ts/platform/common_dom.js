System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/dom/dom_renderer', 'angular2/src/platform/dom/dom_tokens', 'angular2/src/platform/dom/shared_styles_host', 'angular2/src/platform/dom/events/dom_events', 'angular2/src/platform/dom/events/event_manager', 'angular2/src/platform/dom/debug/by', 'angular2/src/platform/dom/debug/ng_probe'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'DOM': true,
        'setRootDomAdapter': true,
        'DomAdapter': true,
        'DomRenderer': true,
        'DOCUMENT': true,
        'SharedStylesHost': true,
        'DomSharedStylesHost': true,
        'DomEventsPlugin': true,
        'EVENT_MANAGER_PLUGINS': true,
        'EventManager': true,
        'EventManagerPlugin': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (dom_adapter_1_1) {
                exports_1({
                    "DOM": dom_adapter_1_1["DOM"],
                    "setRootDomAdapter": dom_adapter_1_1["setRootDomAdapter"],
                    "DomAdapter": dom_adapter_1_1["DomAdapter"]
                });
            },
            function (dom_renderer_1_1) {
                exports_1({
                    "DomRenderer": dom_renderer_1_1["DomRenderer"]
                });
            },
            function (dom_tokens_1_1) {
                exports_1({
                    "DOCUMENT": dom_tokens_1_1["DOCUMENT"]
                });
            },
            function (shared_styles_host_1_1) {
                exports_1({
                    "SharedStylesHost": shared_styles_host_1_1["SharedStylesHost"],
                    "DomSharedStylesHost": shared_styles_host_1_1["DomSharedStylesHost"]
                });
            },
            function (dom_events_1_1) {
                exports_1({
                    "DomEventsPlugin": dom_events_1_1["DomEventsPlugin"]
                });
            },
            function (event_manager_1_1) {
                exports_1({
                    "EVENT_MANAGER_PLUGINS": event_manager_1_1["EVENT_MANAGER_PLUGINS"],
                    "EventManager": event_manager_1_1["EventManager"],
                    "EventManagerPlugin": event_manager_1_1["EventManagerPlugin"]
                });
            },
            function (by_1_1) {
                exportStar_1(by_1_1);
            },
            function (ng_probe_1_1) {
                exportStar_1(ng_probe_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=common_dom.js.map