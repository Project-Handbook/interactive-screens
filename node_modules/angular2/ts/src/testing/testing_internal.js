System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', './test_injector', './utils', './matchers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, core_1, test_injector_1, utils_1;
    var proxy, _global, afterEach, AsyncTestCompleter, jsmBeforeEach, jsmDescribe, jsmDDescribe, jsmXDescribe, jsmIt, jsmIIt, jsmXIt, runnerStack, inIt, globalTimeOut, testInjector, BeforeEachRunner, SpyObject;
    function _describe(jsmFn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
        var runner = new BeforeEachRunner(parentRunner);
        runnerStack.push(runner);
        var suite = jsmFn.apply(void 0, args);
        runnerStack.pop();
        return suite;
    }
    function describe() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return _describe.apply(void 0, [jsmDescribe].concat(args));
    }
    exports_1("describe", describe);
    function ddescribe() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return _describe.apply(void 0, [jsmDDescribe].concat(args));
    }
    exports_1("ddescribe", ddescribe);
    function xdescribe() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return _describe.apply(void 0, [jsmXDescribe].concat(args));
    }
    exports_1("xdescribe", xdescribe);
    function beforeEach(fn) {
        if (runnerStack.length > 0) {
            // Inside a describe block, beforeEach() uses a BeforeEachRunner
            runnerStack[runnerStack.length - 1].beforeEach(fn);
        }
        else {
            // Top level beforeEach() are delegated to jasmine
            jsmBeforeEach(fn);
        }
    }
    exports_1("beforeEach", beforeEach);
    /**
     * Allows overriding default providers defined in test_injector.js.
     *
     * The given function must return a list of DI providers.
     *
     * Example:
     *
     *   beforeEachProviders(() => [
     *     provide(Compiler, {useClass: MockCompiler}),
     *     provide(SomeToken, {useValue: myValue}),
     *   ]);
     */
    function beforeEachProviders(fn) {
        jsmBeforeEach(function () {
            var providers = fn();
            if (!providers)
                return;
            testInjector.addProviders(providers);
        });
    }
    exports_1("beforeEachProviders", beforeEachProviders);
    /**
     * @deprecated
     */
    function beforeEachBindings(fn) {
        beforeEachProviders(fn);
    }
    exports_1("beforeEachBindings", beforeEachBindings);
    function _it(jsmFn, name, testFn, testTimeOut) {
        var runner = runnerStack[runnerStack.length - 1];
        var timeOut = lang_1.Math.max(globalTimeOut, testTimeOut);
        if (testFn instanceof test_injector_1.FunctionWithParamTokens) {
            // The test case uses inject(). ie `it('test', inject([AsyncTestCompleter], (async) => { ...
            // }));`
            if (testFn.hasToken(AsyncTestCompleter)) {
                jsmFn(name, function (done) {
                    var completerProvider = core_1.provide(AsyncTestCompleter, {
                        useFactory: function () {
                            // Mark the test as async when an AsyncTestCompleter is injected in an it()
                            if (!inIt)
                                throw new Error('AsyncTestCompleter can only be injected in an "it()"');
                            return new AsyncTestCompleter(done);
                        }
                    });
                    testInjector.addProviders([completerProvider]);
                    runner.run();
                    inIt = true;
                    testInjector.execute(testFn);
                    inIt = false;
                }, timeOut);
            }
            else {
                jsmFn(name, function () {
                    runner.run();
                    testInjector.execute(testFn);
                }, timeOut);
            }
        }
        else {
            // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
            if (testFn.length === 0) {
                jsmFn(name, function () {
                    runner.run();
                    testFn();
                }, timeOut);
            }
            else {
                jsmFn(name, function (done) {
                    runner.run();
                    testFn(done);
                }, timeOut);
            }
        }
    }
    function it(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIt, name, fn, timeOut);
    }
    exports_1("it", it);
    function xit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmXIt, name, fn, timeOut);
    }
    exports_1("xit", xit);
    function iit(name, fn, timeOut) {
        if (timeOut === void 0) { timeOut = null; }
        return _it(jsmIIt, name, fn, timeOut);
    }
    exports_1("iit", iit);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (test_injector_1_1) {
                test_injector_1 = test_injector_1_1;
                exports_1({
                    "inject": test_injector_1_1["inject"]
                });
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (matchers_1_1) {
                exports_1({
                    "expect": matchers_1_1["expect"],
                    "NgMatchers": matchers_1_1["NgMatchers"]
                });
            }],
        execute: function() {
            exports_1("proxy", proxy = function (t) { return t; });
            _global = (typeof window === 'undefined' ? lang_1.global : window);
            exports_1("afterEach", afterEach = _global.afterEach);
            /**
             * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
             */
            AsyncTestCompleter = (function () {
                function AsyncTestCompleter(_done) {
                    this._done = _done;
                }
                AsyncTestCompleter.prototype.done = function () { this._done(); };
                return AsyncTestCompleter;
            }());
            exports_1("AsyncTestCompleter", AsyncTestCompleter);
            jsmBeforeEach = _global.beforeEach;
            jsmDescribe = _global.describe;
            jsmDDescribe = _global.fdescribe;
            jsmXDescribe = _global.xdescribe;
            jsmIt = _global.it;
            jsmIIt = _global.fit;
            jsmXIt = _global.xit;
            runnerStack = [];
            inIt = false;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
            globalTimeOut = utils_1.browserDetection.isSlow ? 3000 : jasmine.DEFAULT_TIMEOUT_INTERVAL;
            testInjector = test_injector_1.getTestInjector();
            /**
             * Mechanism to run `beforeEach()` functions of Angular tests.
             *
             * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
             */
            BeforeEachRunner = (function () {
                function BeforeEachRunner(_parent) {
                    this._parent = _parent;
                    this._fns = [];
                }
                BeforeEachRunner.prototype.beforeEach = function (fn) { this._fns.push(fn); };
                BeforeEachRunner.prototype.run = function () {
                    if (this._parent)
                        this._parent.run();
                    this._fns.forEach(function (fn) {
                        return lang_1.isFunction(fn) ? fn() :
                            (testInjector.execute(fn));
                    });
                };
                return BeforeEachRunner;
            }());
            // Reset the test providers before each test
            jsmBeforeEach(function () { testInjector.reset(); });
            SpyObject = (function () {
                function SpyObject(type) {
                    if (type === void 0) { type = null; }
                    if (type) {
                        for (var prop in type.prototype) {
                            var m = null;
                            try {
                                m = type.prototype[prop];
                            }
                            catch (e) {
                            }
                            if (typeof m === 'function') {
                                this.spy(prop);
                            }
                        }
                    }
                }
                // Noop so that SpyObject has the same interface as in Dart
                SpyObject.prototype.noSuchMethod = function (args) { };
                SpyObject.prototype.spy = function (name) {
                    if (!this[name]) {
                        this[name] = this._createGuinnessCompatibleSpy(name);
                    }
                    return this[name];
                };
                SpyObject.prototype.prop = function (name, value) { this[name] = value; };
                SpyObject.stub = function (object, config, overrides) {
                    if (object === void 0) { object = null; }
                    if (config === void 0) { config = null; }
                    if (overrides === void 0) { overrides = null; }
                    if (!(object instanceof SpyObject)) {
                        overrides = config;
                        config = object;
                        object = new SpyObject();
                    }
                    var m = collection_1.StringMapWrapper.merge(config, overrides);
                    collection_1.StringMapWrapper.forEach(m, function (value, key) { object.spy(key).andReturn(value); });
                    return object;
                };
                /** @internal */
                SpyObject.prototype._createGuinnessCompatibleSpy = function (name) {
                    var newSpy = jasmine.createSpy(name);
                    newSpy.andCallFake = newSpy.and.callFake;
                    newSpy.andReturn = newSpy.and.returnValue;
                    newSpy.reset = newSpy.calls.reset;
                    // revisit return null here (previously needed for rtts_assert).
                    newSpy.and.returnValue(null);
                    return newSpy;
                };
                return SpyObject;
            }());
            exports_1("SpyObject", SpyObject);
        }
    }
});
//# sourceMappingURL=testing_internal.js.map