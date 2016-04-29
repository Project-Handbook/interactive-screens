System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventBinding;
    return {
        setters:[],
        execute: function() {
            EventBinding = (function () {
                function EventBinding(eventName, elIndex, dirIndex, records) {
                    this.eventName = eventName;
                    this.elIndex = elIndex;
                    this.dirIndex = dirIndex;
                    this.records = records;
                }
                return EventBinding;
            }());
            exports_1("EventBinding", EventBinding);
        }
    }
});
//# sourceMappingURL=event_binding.js.map