System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var trace, events;
    function detectWTF() {
        var wtf = lang_1.global['wtf'];
        if (wtf) {
            trace = wtf['trace'];
            if (trace) {
                events = trace['events'];
                return true;
            }
        }
        return false;
    }
    exports_1("detectWTF", detectWTF);
    function createScope(signature, flags) {
        if (flags === void 0) { flags = null; }
        return events.createScope(signature, flags);
    }
    exports_1("createScope", createScope);
    function leave(scope, returnValue) {
        trace.leaveScope(scope, returnValue);
        return returnValue;
    }
    exports_1("leave", leave);
    function startTimeRange(rangeType, action) {
        return trace.beginTimeRange(rangeType, action);
    }
    exports_1("startTimeRange", startTimeRange);
    function endTimeRange(range) {
        trace.endTimeRange(range);
    }
    exports_1("endTimeRange", endTimeRange);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=wtf_impl.js.map