System.register(['angular2/src/facade/lang', 'angular2/src/facade/promise', 'rxjs/Subject', 'rxjs/observable/PromiseObservable', 'rxjs/operator/toPromise', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, Subject_1, PromiseObservable_1, toPromise_1;
    var TimerWrapper, ObservableWrapper, EventEmitter;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                exports_1({
                    "PromiseWrapper": promise_1_1["PromiseWrapper"],
                    "PromiseCompleter": promise_1_1["PromiseCompleter"]
                });
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
                exports_1({
                    "Subject": Subject_1_1["Subject"]
                });
            },
            function (PromiseObservable_1_1) {
                PromiseObservable_1 = PromiseObservable_1_1;
            },
            function (toPromise_1_1) {
                toPromise_1 = toPromise_1_1;
            },
            function (Observable_1_1) {
                exports_1({
                    "Observable": Observable_1_1["Observable"]
                });
            }],
        execute: function() {
            TimerWrapper = (function () {
                function TimerWrapper() {
                }
                TimerWrapper.setTimeout = function (fn, millis) {
                    return lang_1.global.setTimeout(fn, millis);
                };
                TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
                TimerWrapper.setInterval = function (fn, millis) {
                    return lang_1.global.setInterval(fn, millis);
                };
                TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
                return TimerWrapper;
            }());
            exports_1("TimerWrapper", TimerWrapper);
            ObservableWrapper = (function () {
                function ObservableWrapper() {
                }
                // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
                ObservableWrapper.subscribe = function (emitter, onNext, onError, onComplete) {
                    if (onComplete === void 0) { onComplete = function () { }; }
                    onError = (typeof onError === "function") && onError || lang_1.noop;
                    onComplete = (typeof onComplete === "function") && onComplete || lang_1.noop;
                    return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
                };
                ObservableWrapper.isObservable = function (obs) { return !!obs.subscribe; };
                /**
                 * Returns whether `obs` has any subscribers listening to events.
                 */
                ObservableWrapper.hasSubscribers = function (obs) { return obs.observers.length > 0; };
                ObservableWrapper.dispose = function (subscription) { subscription.unsubscribe(); };
                /**
                 * @deprecated - use callEmit() instead
                 */
                ObservableWrapper.callNext = function (emitter, value) { emitter.next(value); };
                ObservableWrapper.callEmit = function (emitter, value) { emitter.emit(value); };
                ObservableWrapper.callError = function (emitter, error) { emitter.error(error); };
                ObservableWrapper.callComplete = function (emitter) { emitter.complete(); };
                ObservableWrapper.fromPromise = function (promise) {
                    return PromiseObservable_1.PromiseObservable.create(promise);
                };
                ObservableWrapper.toPromise = function (obj) { return toPromise_1.toPromise.call(obj); };
                return ObservableWrapper;
            }());
            exports_1("ObservableWrapper", ObservableWrapper);
            /**
             * Use by directives and components to emit custom Events.
             *
             * ### Examples
             *
             * In the following example, `Zippy` alternatively emits `open` and `close` events when its
             * title gets clicked:
             *
             * ```
             * @Component({
             *   selector: 'zippy',
             *   template: `
             *   <div class="zippy">
             *     <div (click)="toggle()">Toggle</div>
             *     <div [hidden]="!visible">
             *       <ng-content></ng-content>
             *     </div>
             *  </div>`})
             * export class Zippy {
             *   visible: boolean = true;
             *   @Output() open: EventEmitter<any> = new EventEmitter();
             *   @Output() close: EventEmitter<any> = new EventEmitter();
             *
             *   toggle() {
             *     this.visible = !this.visible;
             *     if (this.visible) {
             *       this.open.emit(null);
             *     } else {
             *       this.close.emit(null);
             *     }
             *   }
             * }
             * ```
             *
             * Use Rx.Observable but provides an adapter to make it work as specified here:
             * https://github.com/jhusain/observable-spec
             *
             * Once a reference implementation of the spec is available, switch to it.
             */
            EventEmitter = (function (_super) {
                __extends(EventEmitter, _super);
                /**
                 * Creates an instance of [EventEmitter], which depending on [isAsync],
                 * delivers events synchronously or asynchronously.
                 */
                function EventEmitter(isAsync) {
                    if (isAsync === void 0) { isAsync = true; }
                    _super.call(this);
                    this._isAsync = isAsync;
                }
                EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
                /**
                 * @deprecated - use .emit(value) instead
                 */
                EventEmitter.prototype.next = function (value) { _super.prototype.next.call(this, value); };
                EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
                    var schedulerFn;
                    var errorFn = function (err) { return null; };
                    var completeFn = function () { return null; };
                    if (generatorOrNext && typeof generatorOrNext === 'object') {
                        schedulerFn = this._isAsync ? function (value) { setTimeout(function () { return generatorOrNext.next(value); }); } :
                            function (value) { generatorOrNext.next(value); };
                        if (generatorOrNext.error) {
                            errorFn = this._isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                                function (err) { generatorOrNext.error(err); };
                        }
                        if (generatorOrNext.complete) {
                            completeFn = this._isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                                function () { generatorOrNext.complete(); };
                        }
                    }
                    else {
                        schedulerFn = this._isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
                            function (value) { generatorOrNext(value); };
                        if (error) {
                            errorFn =
                                this._isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
                        }
                        if (complete) {
                            completeFn =
                                this._isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
                        }
                    }
                    return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
                };
                return EventEmitter;
            }(Subject_1.Subject));
            exports_1("EventEmitter", EventEmitter);
        }
    }
});
//# sourceMappingURL=async.js.map