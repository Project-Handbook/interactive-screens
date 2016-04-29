System.register(['angular2/src/facade/lang', 'angular2/src/facade/promise', 'angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, promise_1, async_1, collection_1, core_1;
    var NG_VALIDATORS, NG_ASYNC_VALIDATORS, Validators;
    function _convertToPromise(obj) {
        return promise_1.PromiseWrapper.isPromise(obj) ? obj : async_1.ObservableWrapper.toPromise(obj);
    }
    function _executeValidators(control, validators) {
        return validators.map(function (v) { return v(control); });
    }
    function _executeAsyncValidators(control, validators) {
        return validators.map(function (v) { return v(control); });
    }
    function _mergeErrors(arrayOfErrors) {
        var res = arrayOfErrors.reduce(function (res, errors) {
            return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
        }, {});
        return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Providers for validators to be used for {@link Control}s in a form.
             *
             * Provide this using `multi: true` to add validators.
             *
             * ### Example
             *
             * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
             */
            exports_1("NG_VALIDATORS", NG_VALIDATORS = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgValidators")));
            /**
             * Providers for asynchronous validators to be used for {@link Control}s
             * in a form.
             *
             * Provide this using `multi: true` to add validators.
             *
             * See {@link NG_VALIDATORS} for more details.
             */
            exports_1("NG_ASYNC_VALIDATORS", NG_ASYNC_VALIDATORS = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgAsyncValidators")));
            /**
             * Provides a set of validators used by form controls.
             *
             * A validator is a function that processes a {@link Control} or collection of
             * controls and returns a map of errors. A null map means that validation has passed.
             *
             * ### Example
             *
             * ```typescript
             * var loginControl = new Control("", Validators.required)
             * ```
             */
            Validators = (function () {
                function Validators() {
                }
                /**
                 * Validator that requires controls to have a non-empty value.
                 */
                Validators.required = function (control) {
                    return lang_1.isBlank(control.value) || (lang_1.isString(control.value) && control.value == "") ?
                        { "required": true } :
                        null;
                };
                /**
                 * Validator that requires controls to have a value of a minimum length.
                 */
                Validators.minLength = function (minLength) {
                    return function (control) {
                        if (lang_1.isPresent(Validators.required(control)))
                            return null;
                        var v = control.value;
                        return v.length < minLength ?
                            { "minlength": { "requiredLength": minLength, "actualLength": v.length } } :
                            null;
                    };
                };
                /**
                 * Validator that requires controls to have a value of a maximum length.
                 */
                Validators.maxLength = function (maxLength) {
                    return function (control) {
                        if (lang_1.isPresent(Validators.required(control)))
                            return null;
                        var v = control.value;
                        return v.length > maxLength ?
                            { "maxlength": { "requiredLength": maxLength, "actualLength": v.length } } :
                            null;
                    };
                };
                /**
                 * Validator that requires a control to match a regex to its value.
                 */
                Validators.pattern = function (pattern) {
                    return function (control) {
                        if (lang_1.isPresent(Validators.required(control)))
                            return null;
                        var regex = new RegExp("^" + pattern + "$");
                        var v = control.value;
                        return regex.test(v) ? null :
                            { "pattern": { "requiredPattern": "^" + pattern + "$", "actualValue": v } };
                    };
                };
                /**
                 * No-op validator.
                 */
                Validators.nullValidator = function (c) { return null; };
                /**
                 * Compose multiple validators into a single function that returns the union
                 * of the individual error maps.
                 */
                Validators.compose = function (validators) {
                    if (lang_1.isBlank(validators))
                        return null;
                    var presentValidators = validators.filter(lang_1.isPresent);
                    if (presentValidators.length == 0)
                        return null;
                    return function (control) {
                        return _mergeErrors(_executeValidators(control, presentValidators));
                    };
                };
                Validators.composeAsync = function (validators) {
                    if (lang_1.isBlank(validators))
                        return null;
                    var presentValidators = validators.filter(lang_1.isPresent);
                    if (presentValidators.length == 0)
                        return null;
                    return function (control) {
                        var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
                        return promise_1.PromiseWrapper.all(promises).then(_mergeErrors);
                    };
                };
                return Validators;
            }());
            exports_1("Validators", Validators);
        }
    }
});
//# sourceMappingURL=validators.js.map