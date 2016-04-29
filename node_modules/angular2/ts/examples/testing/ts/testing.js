System.register(['angular2/testing', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, core_1;
    var db, MyService, MyMockService;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MyService = (function () {
                function MyService() {
                }
                return MyService;
            }());
            MyMockService = (function () {
                function MyMockService() {
                }
                return MyMockService;
            }());
            // #docregion describeIt
            testing_1.describe('some component', function () {
                testing_1.it('does something', function () {
                    // This is a test.
                });
            });
            // #enddocregion
            // #docregion fdescribe
            testing_1.fdescribe('some component', function () {
                testing_1.it('has a test', function () {
                    // This test will run.
                });
            });
            testing_1.describe('another component', function () { testing_1.it('also has a test', function () { throw 'This test will not run.'; }); });
            // #enddocregion
            // #docregion xdescribe
            testing_1.xdescribe('some component', function () { testing_1.it('has a test', function () { throw 'This test will not run.'; }); });
            testing_1.describe('another component', function () {
                testing_1.it('also has a test', function () {
                    // This test will run.
                });
            });
            // #enddocregion
            // #docregion fit
            testing_1.describe('some component', function () {
                testing_1.fit('has a test', function () {
                    // This test will run.
                });
                testing_1.it('has another test', function () { throw 'This test will not run.'; });
            });
            // #enddocregion
            // #docregion xit
            testing_1.describe('some component', function () {
                testing_1.xit('has a test', function () { throw 'This test will not run.'; });
                testing_1.it('has another test', function () {
                    // This test will run.
                });
            });
            // #enddocregion
            // #docregion beforeEach
            testing_1.describe('some component', function () {
                testing_1.beforeEach(function () { db.connect(); });
                testing_1.it('uses the db', function () {
                    // Database is connected.
                });
            });
            // #enddocregion
            // #docregion beforeEachProviders
            testing_1.describe('some component', function () {
                testing_1.beforeEachProviders(function () { return [core_1.provide(MyService, { useClass: MyMockService })]; });
                testing_1.it('uses MyService', testing_1.inject([MyService], function (service) {
                    // service is an instance of MyMockService.
                }));
            });
            // #enddocregion
            // #docregion afterEach
            testing_1.describe('some component', function () {
                testing_1.afterEach(function (done) { db.reset().then(function (_) { return done(); }); });
                testing_1.it('uses the db', function () {
                    // This test can leave the database in a dirty state.
                    // The afterEach will ensure it gets reset.
                });
            });
        }
    }
});
// #enddocregion
//# sourceMappingURL=testing.js.map