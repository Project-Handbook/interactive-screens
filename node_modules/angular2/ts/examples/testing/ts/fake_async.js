System.register(['angular2/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            // #docregion basic
            testing_1.describe('this test', function () {
                testing_1.it('looks async but is synchronous', testing_1.fakeAsync(function () {
                    var flag = false;
                    setTimeout(function () { flag = true; }, 100);
                    testing_1.expect(flag).toBe(false);
                    testing_1.tick(50);
                    testing_1.expect(flag).toBe(false);
                    testing_1.tick(50);
                    testing_1.expect(flag).toBe(true);
                }));
            });
            // #enddocregion
            // #docregion pending
            testing_1.describe('this test', function () {
                testing_1.it('aborts a timer', testing_1.fakeAsync(function () {
                    // This timer is scheduled but doesn't need to complete for the
                    // test to pass (maybe it's a timeout for some operation).
                    // Leaving it will cause the test to fail...
                    setTimeout(function () { }, 100);
                    // Unless we clean it up first.
                    testing_1.clearPendingTimers();
                }));
            });
        }
    }
});
// #enddocregion 
//# sourceMappingURL=fake_async.js.map