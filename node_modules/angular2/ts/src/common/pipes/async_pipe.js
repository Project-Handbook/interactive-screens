System.register(['angular2/src/facade/lang', 'angular2/src/facade/async', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, async_1, core_1, invalid_pipe_argument_exception_1;
    var ObservableStrategy, PromiseStrategy, _promiseStrategy, _observableStrategy, __unused, AsyncPipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            ObservableStrategy = (function () {
                function ObservableStrategy() {
                }
                ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
                    return async_1.ObservableWrapper.subscribe(async, updateLatestValue, function (e) { throw e; });
                };
                ObservableStrategy.prototype.dispose = function (subscription) { async_1.ObservableWrapper.dispose(subscription); };
                ObservableStrategy.prototype.onDestroy = function (subscription) { async_1.ObservableWrapper.dispose(subscription); };
                return ObservableStrategy;
            }());
            PromiseStrategy = (function () {
                function PromiseStrategy() {
                }
                PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
                    return async.then(updateLatestValue);
                };
                PromiseStrategy.prototype.dispose = function (subscription) { };
                PromiseStrategy.prototype.onDestroy = function (subscription) { };
                return PromiseStrategy;
            }());
            _promiseStrategy = new PromiseStrategy();
            _observableStrategy = new ObservableStrategy();
             // avoid unused import when Promise union types are erased
            /**
             * The `async` pipe subscribes to an Observable or Promise and returns the latest value it has
             * emitted.
             * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
             *
             * ### Example
             *
             * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
             * promise.
             *
             * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipe'}
             *
             * It's also possible to use `async` with Observables. The example below binds the `time` Observable
             * to the view. Every 500ms, the `time` Observable updates the view with the current time.
             *
             * ```typescript
             * ```
             */
            AsyncPipe = (function () {
                function AsyncPipe(_ref) {
                    /** @internal */
                    this._latestValue = null;
                    /** @internal */
                    this._latestReturnedValue = null;
                    /** @internal */
                    this._subscription = null;
                    /** @internal */
                    this._obj = null;
                    this._strategy = null;
                    this._ref = _ref;
                }
                AsyncPipe.prototype.ngOnDestroy = function () {
                    if (lang_1.isPresent(this._subscription)) {
                        this._dispose();
                    }
                };
                AsyncPipe.prototype.transform = function (obj, args) {
                    if (lang_1.isBlank(this._obj)) {
                        if (lang_1.isPresent(obj)) {
                            this._subscribe(obj);
                        }
                        this._latestReturnedValue = this._latestValue;
                        return this._latestValue;
                    }
                    if (obj !== this._obj) {
                        this._dispose();
                        return this.transform(obj);
                    }
                    if (this._latestValue === this._latestReturnedValue) {
                        return this._latestReturnedValue;
                    }
                    else {
                        this._latestReturnedValue = this._latestValue;
                        return core_1.WrappedValue.wrap(this._latestValue);
                    }
                };
                /** @internal */
                AsyncPipe.prototype._subscribe = function (obj) {
                    var _this = this;
                    this._obj = obj;
                    this._strategy = this._selectStrategy(obj);
                    this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
                };
                /** @internal */
                AsyncPipe.prototype._selectStrategy = function (obj) {
                    if (lang_1.isPromise(obj)) {
                        return _promiseStrategy;
                    }
                    else if (async_1.ObservableWrapper.isObservable(obj)) {
                        return _observableStrategy;
                    }
                    else {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(AsyncPipe, obj);
                    }
                };
                /** @internal */
                AsyncPipe.prototype._dispose = function () {
                    this._strategy.dispose(this._subscription);
                    this._latestValue = null;
                    this._latestReturnedValue = null;
                    this._subscription = null;
                    this._obj = null;
                };
                /** @internal */
                AsyncPipe.prototype._updateLatestValue = function (async, value) {
                    if (async === this._obj) {
                        this._latestValue = value;
                        this._ref.markForCheck();
                    }
                };
                AsyncPipe = __decorate([
                    // avoid unused import when Promise union types are erased
                    core_1.Pipe({ name: 'async', pure: false }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], AsyncPipe);
                return AsyncPipe;
            }());
            exports_1("AsyncPipe", AsyncPipe);
        }
    }
});
//# sourceMappingURL=async_pipe.js.map