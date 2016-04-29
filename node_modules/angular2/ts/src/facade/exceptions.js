System.register(['./base_wrapped_exception', './exception_handler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var base_wrapped_exception_1, exception_handler_1;
    var BaseException, WrappedException;
    function makeTypeError(message) {
        return new TypeError(message);
    }
    exports_1("makeTypeError", makeTypeError);
    function unimplemented() {
        throw new BaseException('unimplemented');
    }
    exports_1("unimplemented", unimplemented);
    return {
        setters:[
            function (base_wrapped_exception_1_1) {
                base_wrapped_exception_1 = base_wrapped_exception_1_1;
            },
            function (exception_handler_1_1) {
                exception_handler_1 = exception_handler_1_1;
                exports_1({
                    "ExceptionHandler": exception_handler_1_1["ExceptionHandler"]
                });
            }],
        execute: function() {
            BaseException = (function (_super) {
                __extends(BaseException, _super);
                function BaseException(message) {
                    if (message === void 0) { message = "--"; }
                    _super.call(this, message);
                    this.message = message;
                    this.stack = (new Error(message)).stack;
                }
                BaseException.prototype.toString = function () { return this.message; };
                return BaseException;
            }(Error));
            exports_1("BaseException", BaseException);
            /**
             * Wraps an exception and provides additional context or information.
             */
            WrappedException = (function (_super) {
                __extends(WrappedException, _super);
                function WrappedException(_wrapperMessage, _originalException, _originalStack, _context) {
                    _super.call(this, _wrapperMessage);
                    this._wrapperMessage = _wrapperMessage;
                    this._originalException = _originalException;
                    this._originalStack = _originalStack;
                    this._context = _context;
                    this._wrapperStack = (new Error(_wrapperMessage)).stack;
                }
                Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
                    get: function () { return this._wrapperMessage; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "wrapperStack", {
                    get: function () { return this._wrapperStack; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "originalException", {
                    get: function () { return this._originalException; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "originalStack", {
                    get: function () { return this._originalStack; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "context", {
                    get: function () { return this._context; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WrappedException.prototype, "message", {
                    get: function () { return exception_handler_1.ExceptionHandler.exceptionToString(this); },
                    enumerable: true,
                    configurable: true
                });
                WrappedException.prototype.toString = function () { return this.message; };
                return WrappedException;
            }(base_wrapped_exception_1.BaseWrappedException));
            exports_1("WrappedException", WrappedException);
        }
    }
});
//# sourceMappingURL=exceptions.js.map