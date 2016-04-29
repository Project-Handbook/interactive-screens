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
    var interpolationExp, I18nPluralPipe;
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
            interpolationExp = lang_1.RegExpWrapper.create('#');
            /**
             *
             *  Maps a value to a string that pluralizes the value properly.
             *
             *  ## Usage
             *
             *  expression | i18nPlural:mapping
             *
             *  where `expression` is a number and `mapping` is an object that indicates the proper text for
             *  when the `expression` evaluates to 0, 1, or some other number.  You can interpolate the actual
             *  value into the text using the `#` sign.
             *
             *  ## Example
             *
             *  ```
             *  <div>
             *    {{ messages.length | i18nPlural: messageMapping }}
             *  </div>
             *
             *  class MyApp {
             *    messages: any[];
             *    messageMapping: any = {
             *      '=0': 'No messages.',
             *      '=1': 'One message.',
             *      'other': '# messages.'
             *    }
             *    ...
             *  }
             *  ```
             *
             */
            I18nPluralPipe = (function () {
                function I18nPluralPipe() {
                }
                I18nPluralPipe.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    var key;
                    var valueStr;
                    var pluralMap = (args[0]);
                    if (!lang_1.isStringMap(pluralMap)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nPluralPipe, pluralMap);
                    }
                    key = value === 0 || value === 1 ? "=" + value : 'other';
                    valueStr = lang_1.isPresent(value) ? value.toString() : '';
                    return lang_1.StringWrapper.replaceAll(pluralMap[key], interpolationExp, valueStr);
                };
                I18nPluralPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'i18nPlural', pure: true }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], I18nPluralPipe);
                return I18nPluralPipe;
            }());
            exports_1("I18nPluralPipe", I18nPluralPipe);
        }
    }
});
//# sourceMappingURL=i18n_plural_pipe.js.map