System.register(["angular2/src/facade/exceptions"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var exceptions_1;
    var ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError, DehydratedException, EventEvaluationError, EventEvaluationErrorContext;
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * An error thrown if application changes model breaking the top-down data flow.
             *
             * This exception is only thrown in dev mode.
             *
             * <!-- TODO: Add a link once the dev mode option is configurable -->
             *
             * ### Example
             *
             * ```typescript
             * @Component({
             *   selector: 'parent',
             *   template: `
             *     <child [prop]="parentProp"></child>
             *   `,
             *   directives: [forwardRef(() => Child)]
             * })
             * class Parent {
             *   parentProp = "init";
             * }
             *
             * @Directive({selector: 'child', inputs: ['prop']})
             * class Child {
             *   constructor(public parent: Parent) {}
             *
             *   set prop(v) {
             *     // this updates the parent property, which is disallowed during change detection
             *     // this will result in ExpressionChangedAfterItHasBeenCheckedException
             *     this.parent.parentProp = "updated";
             *   }
             * }
             * ```
             */
            ExpressionChangedAfterItHasBeenCheckedException = (function (_super) {
                __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
                function ExpressionChangedAfterItHasBeenCheckedException(exp, oldValue, currValue, context) {
                    _super.call(this, ("Expression '" + exp + "' has changed after it was checked. ") +
                        ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
                }
                return ExpressionChangedAfterItHasBeenCheckedException;
            }(exceptions_1.BaseException));
            exports_1("ExpressionChangedAfterItHasBeenCheckedException", ExpressionChangedAfterItHasBeenCheckedException);
            /**
             * Thrown when an expression evaluation raises an exception.
             *
             * This error wraps the original exception to attach additional contextual information that can
             * be useful for debugging.
             *
             * ### Example ([live demo](http://plnkr.co/edit/2Kywoz?p=preview))
             *
             * ```typescript
             * @Directive({selector: 'child', inputs: ['prop']})
             * class Child {
             *   prop;
             * }
             *
             * @Component({
             *   selector: 'app',
             *   template: `
             *     <child [prop]="field.first"></child>
             *   `,
             *   directives: [Child]
             * })
             * class App {
             *   field = null;
             * }
             *
             * bootstrap(App);
             * ```
             *
             * You can access the original exception and stack through the `originalException` and
             * `originalStack` properties.
             */
            ChangeDetectionError = (function (_super) {
                __extends(ChangeDetectionError, _super);
                function ChangeDetectionError(exp, originalException, originalStack, context) {
                    _super.call(this, originalException + " in [" + exp + "]", originalException, originalStack, context);
                    this.location = exp;
                }
                return ChangeDetectionError;
            }(exceptions_1.WrappedException));
            exports_1("ChangeDetectionError", ChangeDetectionError);
            /**
             * Thrown when change detector executes on dehydrated view.
             *
             * This error indicates a bug in the framework.
             *
             * This is an internal Angular error.
             */
            DehydratedException = (function (_super) {
                __extends(DehydratedException, _super);
                function DehydratedException(details) {
                    _super.call(this, "Attempt to use a dehydrated detector: " + details);
                }
                return DehydratedException;
            }(exceptions_1.BaseException));
            exports_1("DehydratedException", DehydratedException);
            /**
             * Wraps an exception thrown by an event handler.
             */
            EventEvaluationError = (function (_super) {
                __extends(EventEvaluationError, _super);
                function EventEvaluationError(eventName, originalException, originalStack, context) {
                    _super.call(this, "Error during evaluation of \"" + eventName + "\"", originalException, originalStack, context);
                }
                return EventEvaluationError;
            }(exceptions_1.WrappedException));
            exports_1("EventEvaluationError", EventEvaluationError);
            /**
             * Error context included when an event handler throws an exception.
             */
            EventEvaluationErrorContext = (function () {
                function EventEvaluationErrorContext(element, componentElement, context, locals, injector) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                }
                return EventEvaluationErrorContext;
            }());
            exports_1("EventEvaluationErrorContext", EventEvaluationErrorContext);
        }
    }
});
//# sourceMappingURL=exceptions.js.map