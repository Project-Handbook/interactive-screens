System.register(['./src/core/profile/profile'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (profile_1_1) {
                exports_1({
                    "wtfCreateScope": profile_1_1["wtfCreateScope"],
                    "wtfLeave": profile_1_1["wtfLeave"],
                    "wtfStartTimeRange": profile_1_1["wtfStartTimeRange"],
                    "wtfEndTimeRange": profile_1_1["wtfEndTimeRange"],
                    "WtfScopeFn": profile_1_1["WtfScopeFn"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=instrumentation.js.map