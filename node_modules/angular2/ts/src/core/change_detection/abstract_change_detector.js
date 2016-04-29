System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', './change_detection_util', './change_detector_ref', './exceptions', './parser/locals', './constants', '../profile/profile', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, change_detection_util_1, change_detector_ref_1, exceptions_1, locals_1, constants_1, profile_1, async_1;
    var _scope_check, _Context, AbstractChangeDetector;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (change_detector_ref_1_1) {
                change_detector_ref_1 = change_detector_ref_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (locals_1_1) {
                locals_1 = locals_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            _scope_check = profile_1.wtfCreateScope("ChangeDetector#check(ascii id, bool throwOnChange)");
            _Context = (function () {
                function _Context(element, componentElement, context, locals, injector, expression) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                    this.expression = expression;
                }
                return _Context;
            }());
            AbstractChangeDetector = (function () {
                function AbstractChangeDetector(id, numberOfPropertyProtoRecords, bindingTargets, directiveIndices, strategy) {
                    this.id = id;
                    this.numberOfPropertyProtoRecords = numberOfPropertyProtoRecords;
                    this.bindingTargets = bindingTargets;
                    this.directiveIndices = directiveIndices;
                    this.strategy = strategy;
                    this.contentChildren = [];
                    this.viewChildren = [];
                    // The names of the below fields must be kept in sync with codegen_name_util.ts or
                    // change detection will fail.
                    this.state = constants_1.ChangeDetectorState.NeverChecked;
                    this.locals = null;
                    this.mode = null;
                    this.pipes = null;
                    this.ref = new change_detector_ref_1.ChangeDetectorRef_(this);
                }
                AbstractChangeDetector.prototype.addContentChild = function (cd) {
                    this.contentChildren.push(cd);
                    cd.parent = this;
                };
                AbstractChangeDetector.prototype.removeContentChild = function (cd) { collection_1.ListWrapper.remove(this.contentChildren, cd); };
                AbstractChangeDetector.prototype.addViewChild = function (cd) {
                    this.viewChildren.push(cd);
                    cd.parent = this;
                };
                AbstractChangeDetector.prototype.removeViewChild = function (cd) { collection_1.ListWrapper.remove(this.viewChildren, cd); };
                AbstractChangeDetector.prototype.remove = function () { this.parent.removeContentChild(this); };
                AbstractChangeDetector.prototype.handleEvent = function (eventName, elIndex, event) {
                    if (!this.hydrated()) {
                        this.throwDehydratedError(this.id + " -> " + eventName);
                    }
                    try {
                        var locals = new Map();
                        locals.set('$event', event);
                        var res = !this.handleEventInternal(eventName, elIndex, new locals_1.Locals(this.locals, locals));
                        this.markPathToRootAsCheckOnce();
                        return res;
                    }
                    catch (e) {
                        var c = this.dispatcher.getDebugContext(null, elIndex, null);
                        var context = lang_1.isPresent(c) ?
                            new exceptions_1.EventEvaluationErrorContext(c.element, c.componentElement, c.context, c.locals, c.injector) :
                            null;
                        throw new exceptions_1.EventEvaluationError(eventName, e, e.stack, context);
                    }
                };
                AbstractChangeDetector.prototype.handleEventInternal = function (eventName, elIndex, locals) { return false; };
                AbstractChangeDetector.prototype.detectChanges = function () { this.runDetectChanges(false); };
                AbstractChangeDetector.prototype.checkNoChanges = function () {
                    if (lang_1.assertionsEnabled()) {
                        this.runDetectChanges(true);
                    }
                };
                AbstractChangeDetector.prototype.runDetectChanges = function (throwOnChange) {
                    if (this.mode === constants_1.ChangeDetectionStrategy.Detached ||
                        this.mode === constants_1.ChangeDetectionStrategy.Checked || this.state === constants_1.ChangeDetectorState.Errored)
                        return;
                    var s = _scope_check(this.id, throwOnChange);
                    this.detectChangesInRecords(throwOnChange);
                    this._detectChangesContentChildren(throwOnChange);
                    if (!throwOnChange)
                        this.afterContentLifecycleCallbacks();
                    this._detectChangesInViewChildren(throwOnChange);
                    if (!throwOnChange)
                        this.afterViewLifecycleCallbacks();
                    if (this.mode === constants_1.ChangeDetectionStrategy.CheckOnce)
                        this.mode = constants_1.ChangeDetectionStrategy.Checked;
                    this.state = constants_1.ChangeDetectorState.CheckedBefore;
                    profile_1.wtfLeave(s);
                };
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `detectChangesInRecordsInternal` which does the work of detecting changes
                // and which this method will call.
                // This method expects that `detectChangesInRecordsInternal` will set the property
                // `this.propertyBindingIndex` to the propertyBindingIndex of the first proto record. This is to
                // facilitate error reporting.
                AbstractChangeDetector.prototype.detectChangesInRecords = function (throwOnChange) {
                    if (!this.hydrated()) {
                        this.throwDehydratedError(this.id);
                    }
                    try {
                        this.detectChangesInRecordsInternal(throwOnChange);
                    }
                    catch (e) {
                        // throwOnChange errors aren't counted as fatal errors.
                        if (!(e instanceof exceptions_1.ExpressionChangedAfterItHasBeenCheckedException)) {
                            this.state = constants_1.ChangeDetectorState.Errored;
                        }
                        this._throwError(e, e.stack);
                    }
                };
                // Subclasses should override this method to perform any work necessary to detect and report
                // changes. For example, changes should be reported via `ChangeDetectionUtil.addChange`, lifecycle
                // methods should be called, etc.
                // This implementation should also set `this.propertyBindingIndex` to the propertyBindingIndex of
                // the
                // first proto record to facilitate error reporting. See {@link #detectChangesInRecords}.
                AbstractChangeDetector.prototype.detectChangesInRecordsInternal = function (throwOnChange) { };
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `hydrateDirectives`.
                AbstractChangeDetector.prototype.hydrate = function (context, locals, dispatcher, pipes) {
                    this.dispatcher = dispatcher;
                    this.mode = change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.strategy);
                    this.context = context;
                    this.locals = locals;
                    this.pipes = pipes;
                    this.hydrateDirectives(dispatcher);
                    this.state = constants_1.ChangeDetectorState.NeverChecked;
                };
                // Subclasses should override this method to hydrate any directives.
                AbstractChangeDetector.prototype.hydrateDirectives = function (dispatcher) { };
                // This method is not intended to be overridden. Subclasses should instead provide an
                // implementation of `dehydrateDirectives`.
                AbstractChangeDetector.prototype.dehydrate = function () {
                    this.dehydrateDirectives(true);
                    this._unsubscribeFromOutputs();
                    this.dispatcher = null;
                    this.context = null;
                    this.locals = null;
                    this.pipes = null;
                };
                // Subclasses should override this method to dehydrate any directives. This method should reverse
                // any work done in `hydrateDirectives`.
                AbstractChangeDetector.prototype.dehydrateDirectives = function (destroyPipes) { };
                AbstractChangeDetector.prototype.hydrated = function () { return lang_1.isPresent(this.context); };
                AbstractChangeDetector.prototype.destroyRecursive = function () {
                    this.dispatcher.notifyOnDestroy();
                    this.dehydrate();
                    var children = this.contentChildren;
                    for (var i = 0; i < children.length; i++) {
                        children[i].destroyRecursive();
                    }
                    children = this.viewChildren;
                    for (var i = 0; i < children.length; i++) {
                        children[i].destroyRecursive();
                    }
                };
                AbstractChangeDetector.prototype.afterContentLifecycleCallbacks = function () {
                    this.dispatcher.notifyAfterContentChecked();
                    this.afterContentLifecycleCallbacksInternal();
                };
                AbstractChangeDetector.prototype.afterContentLifecycleCallbacksInternal = function () { };
                AbstractChangeDetector.prototype.afterViewLifecycleCallbacks = function () {
                    this.dispatcher.notifyAfterViewChecked();
                    this.afterViewLifecycleCallbacksInternal();
                };
                AbstractChangeDetector.prototype.afterViewLifecycleCallbacksInternal = function () { };
                /** @internal */
                AbstractChangeDetector.prototype._detectChangesContentChildren = function (throwOnChange) {
                    var c = this.contentChildren;
                    for (var i = 0; i < c.length; ++i) {
                        c[i].runDetectChanges(throwOnChange);
                    }
                };
                /** @internal */
                AbstractChangeDetector.prototype._detectChangesInViewChildren = function (throwOnChange) {
                    var c = this.viewChildren;
                    for (var i = 0; i < c.length; ++i) {
                        c[i].runDetectChanges(throwOnChange);
                    }
                };
                AbstractChangeDetector.prototype.markAsCheckOnce = function () { this.mode = constants_1.ChangeDetectionStrategy.CheckOnce; };
                AbstractChangeDetector.prototype.markPathToRootAsCheckOnce = function () {
                    var c = this;
                    while (lang_1.isPresent(c) && c.mode !== constants_1.ChangeDetectionStrategy.Detached) {
                        if (c.mode === constants_1.ChangeDetectionStrategy.Checked)
                            c.mode = constants_1.ChangeDetectionStrategy.CheckOnce;
                        c = c.parent;
                    }
                };
                AbstractChangeDetector.prototype._unsubscribeFromOutputs = function () {
                    if (lang_1.isPresent(this.outputSubscriptions)) {
                        for (var i = 0; i < this.outputSubscriptions.length; ++i) {
                            async_1.ObservableWrapper.dispose(this.outputSubscriptions[i]);
                            this.outputSubscriptions[i] = null;
                        }
                    }
                };
                AbstractChangeDetector.prototype.getDirectiveFor = function (directives, index) {
                    return directives.getDirectiveFor(this.directiveIndices[index]);
                };
                AbstractChangeDetector.prototype.getDetectorFor = function (directives, index) {
                    return directives.getDetectorFor(this.directiveIndices[index]);
                };
                AbstractChangeDetector.prototype.notifyDispatcher = function (value) {
                    this.dispatcher.notifyOnBinding(this._currentBinding(), value);
                };
                AbstractChangeDetector.prototype.logBindingUpdate = function (value) {
                    this.dispatcher.logBindingUpdate(this._currentBinding(), value);
                };
                AbstractChangeDetector.prototype.addChange = function (changes, oldValue, newValue) {
                    if (lang_1.isBlank(changes)) {
                        changes = {};
                    }
                    changes[this._currentBinding().name] = change_detection_util_1.ChangeDetectionUtil.simpleChange(oldValue, newValue);
                    return changes;
                };
                AbstractChangeDetector.prototype._throwError = function (exception, stack) {
                    var error;
                    try {
                        var c = this.dispatcher.getDebugContext(null, this._currentBinding().elementIndex, null);
                        var context = lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.context, c.locals, c.injector, this._currentBinding().debug) :
                            null;
                        error = new exceptions_1.ChangeDetectionError(this._currentBinding().debug, exception, stack, context);
                    }
                    catch (e) {
                        // if an error happens during getting the debug context, we throw a ChangeDetectionError
                        // without the extra information.
                        error = new exceptions_1.ChangeDetectionError(null, exception, stack, null);
                    }
                    throw error;
                };
                AbstractChangeDetector.prototype.throwOnChangeError = function (oldValue, newValue) {
                    throw new exceptions_1.ExpressionChangedAfterItHasBeenCheckedException(this._currentBinding().debug, oldValue, newValue, null);
                };
                AbstractChangeDetector.prototype.throwDehydratedError = function (detail) { throw new exceptions_1.DehydratedException(detail); };
                AbstractChangeDetector.prototype._currentBinding = function () {
                    return this.bindingTargets[this.propertyBindingIndex];
                };
                return AbstractChangeDetector;
            }());
            exports_1("AbstractChangeDetector", AbstractChangeDetector);
        }
    }
});
//# sourceMappingURL=abstract_change_detector.js.map