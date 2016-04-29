System.register(['angular2/core', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, exceptions_1, collection_1, lang_1;
    var TestInjector, _testInjector, InjectSetupWrapper, FunctionWithParamTokens;
    function getTestInjector() {
        if (_testInjector == null) {
            _testInjector = new TestInjector();
        }
        return _testInjector;
    }
    exports_1("getTestInjector", getTestInjector);
    /**
     * Set the providers that the test injector should use. These should be providers
     * common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on teh current platform. If you absolutely need to change the providers,
     * first use `resetBaseTestProviders`.
     *
     * Test Providers for individual platforms are available from
     * 'angular2/platform/testing/<platform_name>'.
     */
    function setBaseTestProviders(platformProviders, applicationProviders) {
        var testInjector = getTestInjector();
        if (testInjector.platformProviders.length > 0 || testInjector.applicationProviders.length > 0) {
            throw new exceptions_1.BaseException('Cannot set base providers because it has already been called');
        }
        testInjector.platformProviders = platformProviders;
        testInjector.applicationProviders = applicationProviders;
        var injector = testInjector.createInjector();
        var inits = injector.getOptional(core_1.PLATFORM_INITIALIZER);
        if (lang_1.isPresent(inits)) {
            inits.forEach(function (init) { return init(); });
        }
        testInjector.reset();
    }
    exports_1("setBaseTestProviders", setBaseTestProviders);
    /**
     * Reset the providers for the test injector.
     */
    function resetBaseTestProviders() {
        var testInjector = getTestInjector();
        testInjector.platformProviders = [];
        testInjector.applicationProviders = [];
        testInjector.reset();
    }
    exports_1("resetBaseTestProviders", resetBaseTestProviders);
    /**
     * Allows injecting dependencies in `beforeEach()` and `it()`.
     *
     * Example:
     *
     * ```
     * beforeEach(inject([Dependency, AClass], (dep, object) => {
     *   // some code that uses `dep` and `object`
     *   // ...
     * }));
     *
     * it('...', inject([AClass], (object) => {
     *   object.doSomething();
     *   expect(...);
     * })
     * ```
     *
     * Notes:
     * - inject is currently a function because of some Traceur limitation the syntax should
     * eventually
     *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
     *
     * @param {Array} tokens
     * @param {Function} fn
     * @return {FunctionWithParamTokens}
     */
    function inject(tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, false);
    }
    exports_1("inject", inject);
    function withProviders(providers) {
        return new InjectSetupWrapper(providers);
    }
    exports_1("withProviders", withProviders);
    /**
     * Allows injecting dependencies in `beforeEach()` and `it()`. The test must return
     * a promise which will resolve when all asynchronous activity is complete.
     *
     * Example:
     *
     * ```
     * it('...', injectAsync([AClass], (object) => {
     *   return object.doSomething().then(() => {
     *     expect(...);
     *   });
     * })
     * ```
     *
     * @param {Array} tokens
     * @param {Function} fn
     * @return {FunctionWithParamTokens}
     */
    function injectAsync(tokens, fn) {
        return new FunctionWithParamTokens(tokens, fn, true);
    }
    exports_1("injectAsync", injectAsync);
    function emptyArray() {
        return [];
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            TestInjector = (function () {
                function TestInjector() {
                    this._instantiated = false;
                    this._injector = null;
                    this._providers = [];
                    this.platformProviders = [];
                    this.applicationProviders = [];
                }
                TestInjector.prototype.reset = function () {
                    this._injector = null;
                    this._providers = [];
                    this._instantiated = false;
                };
                TestInjector.prototype.addProviders = function (providers) {
                    if (this._instantiated) {
                        throw new exceptions_1.BaseException('Cannot add providers after test injector is instantiated');
                    }
                    this._providers = collection_1.ListWrapper.concat(this._providers, providers);
                };
                TestInjector.prototype.createInjector = function () {
                    var rootInjector = core_1.Injector.resolveAndCreate(this.platformProviders);
                    this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(this.applicationProviders, this._providers));
                    this._instantiated = true;
                    return this._injector;
                };
                TestInjector.prototype.execute = function (fn) {
                    var additionalProviders = fn.additionalProviders();
                    if (additionalProviders.length > 0) {
                        this.addProviders(additionalProviders);
                    }
                    if (!this._instantiated) {
                        this.createInjector();
                    }
                    return fn.execute(this._injector);
                };
                return TestInjector;
            }());
            exports_1("TestInjector", TestInjector);
            _testInjector = null;
            InjectSetupWrapper = (function () {
                function InjectSetupWrapper(_providers) {
                    this._providers = _providers;
                }
                InjectSetupWrapper.prototype.inject = function (tokens, fn) {
                    return new FunctionWithParamTokens(tokens, fn, false, this._providers);
                };
                InjectSetupWrapper.prototype.injectAsync = function (tokens, fn) {
                    return new FunctionWithParamTokens(tokens, fn, true, this._providers);
                };
                return InjectSetupWrapper;
            }());
            exports_1("InjectSetupWrapper", InjectSetupWrapper);
            FunctionWithParamTokens = (function () {
                function FunctionWithParamTokens(_tokens, _fn, isAsync, additionalProviders) {
                    if (additionalProviders === void 0) { additionalProviders = emptyArray; }
                    this._tokens = _tokens;
                    this._fn = _fn;
                    this.isAsync = isAsync;
                    this.additionalProviders = additionalProviders;
                }
                /**
                 * Returns the value of the executed function.
                 */
                FunctionWithParamTokens.prototype.execute = function (injector) {
                    var params = this._tokens.map(function (t) { return injector.get(t); });
                    return lang_1.FunctionWrapper.apply(this._fn, params);
                };
                FunctionWithParamTokens.prototype.hasToken = function (token) { return this._tokens.indexOf(token) > -1; };
                return FunctionWithParamTokens;
            }());
            exports_1("FunctionWithParamTokens", FunctionWithParamTokens);
        }
    }
});
//# sourceMappingURL=test_injector.js.map