System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var win, document, location, gc, performance, Event, MouseEvent, KeyboardEvent, EventTarget, History, Location, EventListener;
    return {
        setters:[],
        execute: function() {
            /**
             * JS version of browser APIs. This library can only run in the browser.
             */
            win = window;
            exports_1("window", win);
            exports_1("document", document = window.document);
            exports_1("location", location = window.location);
            exports_1("gc", gc = window['gc'] ? function () { return window['gc'](); } : function () { return null; });
            exports_1("performance", performance = window['performance'] ? window['performance'] : null);
            exports_1("Event", Event = window['Event']);
            exports_1("MouseEvent", MouseEvent = window['MouseEvent']);
            exports_1("KeyboardEvent", KeyboardEvent = window['KeyboardEvent']);
            exports_1("EventTarget", EventTarget = window['EventTarget']);
            exports_1("History", History = window['History']);
            exports_1("Location", Location = window['Location']);
            exports_1("EventListener", EventListener = window['EventListener']);
        }
    }
});
//# sourceMappingURL=browser.js.map