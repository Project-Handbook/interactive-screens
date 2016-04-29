System.register(['angular2/src/facade/lang', 'angular2/src/facade/base_wrapped_exception', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, base_wrapped_exception_1, collection_1;
    var _ArrayLogger, ExceptionHandler;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (base_wrapped_exception_1_1) {
                base_wrapped_exception_1 = base_wrapped_exception_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            _ArrayLogger = (function () {
                function _ArrayLogger() {
                    this.res = [];
                }
                _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
                _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
                _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
                _ArrayLogger.prototype.logGroupEnd = function () { };
                ;
                return _ArrayLogger;
            }());
            /**
             * Provides a hook for centralized exception handling.
             *
             * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
             * intercept error handling,
             * write a custom exception handler that replaces this default as appropriate for your app.
             *
             * ### Example
             *
             * ```javascript
             *
             * class MyExceptionHandler implements ExceptionHandler {
             *   call(error, stackTrace = null, reason = null) {
             *     // do something with the exception
             *   }
             * }
             *
             * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
             *
             * ```
             */
            ExceptionHandler = (function () {
                function ExceptionHandler(_logger, _rethrowException) {
                    if (_rethrowException === void 0) { _rethrowException = true; }
                    this._logger = _logger;
                    this._rethrowException = _rethrowException;
                }
                ExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
                    if (stackTrace === void 0) { stackTrace = null; }
                    if (reason === void 0) { reason = null; }
                    var l = new _ArrayLogger();
                    var e = new ExceptionHandler(l, false);
                    e.call(exception, stackTrace, reason);
                    return l.res.join("\n");
                };
                ExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
                    if (stackTrace === void 0) { stackTrace = null; }
                    if (reason === void 0) { reason = null; }
                    var originalException = this._findOriginalException(exception);
                    var originalStack = this._findOriginalStack(exception);
                    var context = this._findContext(exception);
                    this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
                    if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
                        this._logger.logError("STACKTRACE:");
                        this._logger.logError(this._longStackTrace(stackTrace));
                    }
                    if (lang_1.isPresent(reason)) {
                        this._logger.logError("REASON: " + reason);
                    }
                    if (lang_1.isPresent(originalException)) {
                        this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
                    }
                    if (lang_1.isPresent(originalStack)) {
                        this._logger.logError("ORIGINAL STACKTRACE:");
                        this._logger.logError(this._longStackTrace(originalStack));
                    }
                    if (lang_1.isPresent(context)) {
                        this._logger.logError("ERROR CONTEXT:");
                        this._logger.logError(context);
                    }
                    this._logger.logGroupEnd();
                    // We rethrow exceptions, so operations like 'bootstrap' will result in an error
                    // when an exception happens. If we do not rethrow, bootstrap will always succeed.
                    if (this._rethrowException)
                        throw exception;
                };
                /** @internal */
                ExceptionHandler.prototype._extractMessage = function (exception) {
                    return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
                        exception.toString();
                };
                /** @internal */
                ExceptionHandler.prototype._longStackTrace = function (stackTrace) {
                    return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join("\n\n-----async gap-----\n") :
                        stackTrace.toString();
                };
                /** @internal */
                ExceptionHandler.prototype._findContext = function (exception) {
                    try {
                        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                            return null;
                        return lang_1.isPresent(exception.context) ? exception.context :
                            this._findContext(exception.originalException);
                    }
                    catch (e) {
                        // exception.context can throw an exception. if it happens, we ignore the context.
                        return null;
                    }
                };
                /** @internal */
                ExceptionHandler.prototype._findOriginalException = function (exception) {
                    if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                        return null;
                    var e = exception.originalException;
                    while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                        e = e.originalException;
                    }
                    return e;
                };
                /** @internal */
                ExceptionHandler.prototype._findOriginalStack = function (exception) {
                    if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                        return null;
                    var e = exception;
                    var stack = exception.originalStack;
                    while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                        e = e.originalException;
                        if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                            stack = e.originalStack;
                        }
                    }
                    return stack;
                };
                return ExceptionHandler;
            }());
            exports_1("ExceptionHandler", ExceptionHandler);
        }
    }
});
//# sourceMappingURL=exception_handler.js.map