System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1;
    var InvalidPipeArgumentException;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            InvalidPipeArgumentException = (function (_super) {
                __extends(InvalidPipeArgumentException, _super);
                function InvalidPipeArgumentException(type, value) {
                    _super.call(this, "Invalid argument '" + value + "' for pipe '" + lang_1.stringify(type) + "'");
                }
                return InvalidPipeArgumentException;
            }(exceptions_1.BaseException));
            exports_1("InvalidPipeArgumentException", InvalidPipeArgumentException);
        }
    }
});
//# sourceMappingURL=invalid_pipe_argument_exception.js.map