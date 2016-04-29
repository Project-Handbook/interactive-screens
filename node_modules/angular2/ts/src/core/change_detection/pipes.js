System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SelectedPipe;
    return {
        setters:[],
        execute: function() {
            SelectedPipe = (function () {
                function SelectedPipe(pipe, pure) {
                    this.pipe = pipe;
                    this.pure = pure;
                }
                return SelectedPipe;
            }());
            exports_1("SelectedPipe", SelectedPipe);
        }
    }
});
//# sourceMappingURL=pipes.js.map