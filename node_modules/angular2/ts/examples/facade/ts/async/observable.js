System.register(['rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1;
    var obs;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            obs = new Rx_1.Observable(function (obs) {
                var i = 0;
                setInterval(function () { obs.next(++i); }, 1000);
            });
            obs.subscribe(function (i) { return console.log(i + " seconds elapsed"); });
        }
    }
});
// #enddocregion
//# sourceMappingURL=observable.js.map