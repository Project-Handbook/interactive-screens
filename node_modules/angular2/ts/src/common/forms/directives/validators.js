System.register(['angular2/core', 'angular2/src/facade/lang', '../validators'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, lang_1, validators_1, lang_2;
    var REQUIRED_VALIDATOR, RequiredValidator, MIN_LENGTH_VALIDATOR, MinLengthValidator, MAX_LENGTH_VALIDATOR, MaxLengthValidator, PATTERN_VALIDATOR, PatternValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
                lang_2 = lang_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            REQUIRED_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useValue: validators_1.Validators.required, multi: true }));
            /**
             * A Directive that adds the `required` validator to any controls marked with the
             * `required` attribute, via the {@link NG_VALIDATORS} binding.
             *
             * ### Example
             *
             * ```
             * <input ngControl="fullName" required>
             * ```
             */
            RequiredValidator = (function () {
                function RequiredValidator() {
                }
                RequiredValidator = __decorate([
                    core_1.Directive({
                        selector: '[required][ngControl],[required][ngFormControl],[required][ngModel]',
                        providers: [REQUIRED_VALIDATOR]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RequiredValidator);
                return RequiredValidator;
            }());
            exports_1("RequiredValidator", RequiredValidator);
            /**
             * Provivder which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
             *
             * ## Example:
             *
             * {@example common/forms/ts/validators/validators.ts region='min'}
             */
            MIN_LENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return MinLengthValidator; }), multi: true }));
            /**
             * A directive which installs the {@link MinLengthValidator} for any `ngControl`,
             * `ngFormControl`, or control with `ngModel` that also has a `minlength` attribute.
             */
            MinLengthValidator = (function () {
                function MinLengthValidator(minLength) {
                    this._validator = validators_1.Validators.minLength(lang_2.NumberWrapper.parseInt(minLength, 10));
                }
                MinLengthValidator.prototype.validate = function (c) { return this._validator(c); };
                MinLengthValidator = __decorate([
                    core_1.Directive({
                        selector: '[minlength][ngControl],[minlength][ngFormControl],[minlength][ngModel]',
                        providers: [MIN_LENGTH_VALIDATOR]
                    }),
                    __param(0, core_1.Attribute("minlength")), 
                    __metadata('design:paramtypes', [String])
                ], MinLengthValidator);
                return MinLengthValidator;
            }());
            exports_1("MinLengthValidator", MinLengthValidator);
            /**
             * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
             *
             * ## Example:
             *
             * {@example common/forms/ts/validators/validators.ts region='max'}
             */
            MAX_LENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return MaxLengthValidator; }), multi: true }));
            /**
             * A directive which installs the {@link MaxLengthValidator} for any `ngControl, `ngFormControl`,
             * or control with `ngModel` that also has a `maxlength` attribute.
             */
            MaxLengthValidator = (function () {
                function MaxLengthValidator(maxLength) {
                    this._validator = validators_1.Validators.maxLength(lang_2.NumberWrapper.parseInt(maxLength, 10));
                }
                MaxLengthValidator.prototype.validate = function (c) { return this._validator(c); };
                MaxLengthValidator = __decorate([
                    core_1.Directive({
                        selector: '[maxlength][ngControl],[maxlength][ngFormControl],[maxlength][ngModel]',
                        providers: [MAX_LENGTH_VALIDATOR]
                    }),
                    __param(0, core_1.Attribute("maxlength")), 
                    __metadata('design:paramtypes', [String])
                ], MaxLengthValidator);
                return MaxLengthValidator;
            }());
            exports_1("MaxLengthValidator", MaxLengthValidator);
            /**
             * A Directive that adds the `pattern` validator to any controls marked with the
             * `pattern` attribute, via the {@link NG_VALIDATORS} binding. Uses attribute value
             * as the regex to validate Control value against.  Follows pattern attribute
             * semantics; i.e. regex must match entire Control value.
             *
             * ### Example
             *
             * ```
             * <input [ngControl]="fullName" pattern="[a-zA-Z ]*">
             * ```
             */
            PATTERN_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, { useExisting: core_1.forwardRef(function () { return PatternValidator; }), multi: true }));
            PatternValidator = (function () {
                function PatternValidator(pattern) {
                    this._validator = validators_1.Validators.pattern(pattern);
                }
                PatternValidator.prototype.validate = function (c) { return this._validator(c); };
                PatternValidator = __decorate([
                    core_1.Directive({
                        selector: '[pattern][ngControl],[pattern][ngFormControl],[pattern][ngModel]',
                        providers: [PATTERN_VALIDATOR]
                    }),
                    __param(0, core_1.Attribute("pattern")), 
                    __metadata('design:paramtypes', [String])
                ], PatternValidator);
                return PatternValidator;
            }());
            exports_1("PatternValidator", PatternValidator);
        }
    }
});
//# sourceMappingURL=validators.js.map