System.register(['angular2/src/facade/lang', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
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
    var lang_1, core_1, invalid_pipe_argument_exception_1;
    var UpperCasePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            /**
             * Implements uppercase transforms to text.
             *
             * ### Example
             *
             * {@example core/pipes/ts/lowerupper_pipe/lowerupper_pipe_example.ts region='LowerUpperPipe'}
             */
            UpperCasePipe = (function () {
                function UpperCasePipe() {
                }
                UpperCasePipe.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    if (lang_1.isBlank(value))
                        return value;
                    if (!lang_1.isString(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(UpperCasePipe, value);
                    }
                    return value.toUpperCase();
                };
                UpperCasePipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'uppercase' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UpperCasePipe);
                return UpperCasePipe;
            }());
            exports_1("UpperCasePipe", UpperCasePipe);
        }
    }
});
//# sourceMappingURL=uppercase_pipe.js.map