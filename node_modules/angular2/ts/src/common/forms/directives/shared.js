System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../validators', './default_value_accessor', './number_value_accessor', './checkbox_value_accessor', './select_control_value_accessor', './radio_control_value_accessor', './normalize_validator'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, exceptions_1, validators_1, default_value_accessor_1, number_value_accessor_1, checkbox_value_accessor_1, select_control_value_accessor_1, radio_control_value_accessor_1, normalize_validator_1;
    function controlPath(name, parent) {
        var p = collection_1.ListWrapper.clone(parent.path);
        p.push(name);
        return p;
    }
    exports_1("controlPath", controlPath);
    function setUpControl(control, dir) {
        if (lang_1.isBlank(control))
            _throwError(dir, "Cannot find control");
        if (lang_1.isBlank(dir.valueAccessor))
            _throwError(dir, "No value accessor for");
        control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
        control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
        dir.valueAccessor.writeValue(control.value);
        // view -> model
        dir.valueAccessor.registerOnChange(function (newValue) {
            dir.viewToModelUpdate(newValue);
            control.updateValue(newValue, { emitModelToViewChange: false });
            control.markAsDirty();
        });
        // model -> view
        control.registerOnChange(function (newValue) { return dir.valueAccessor.writeValue(newValue); });
        // touched
        dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
    }
    exports_1("setUpControl", setUpControl);
    function setUpControlGroup(control, dir) {
        if (lang_1.isBlank(control))
            _throwError(dir, "Cannot find control");
        control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
        control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    }
    exports_1("setUpControlGroup", setUpControlGroup);
    function _throwError(dir, message) {
        var path = dir.path.join(" -> ");
        throw new exceptions_1.BaseException(message + " '" + path + "'");
    }
    function composeValidators(validators) {
        return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
    }
    exports_1("composeValidators", composeValidators);
    function composeAsyncValidators(validators) {
        return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) :
            null;
    }
    exports_1("composeAsyncValidators", composeAsyncValidators);
    function isPropertyUpdated(changes, viewModel) {
        if (!collection_1.StringMapWrapper.contains(changes, "model"))
            return false;
        var change = changes["model"];
        if (change.isFirstChange())
            return true;
        return !lang_1.looseIdentical(viewModel, change.currentValue);
    }
    exports_1("isPropertyUpdated", isPropertyUpdated);
    // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
    function selectValueAccessor(dir, valueAccessors) {
        if (lang_1.isBlank(valueAccessors))
            return null;
        var defaultAccessor;
        var builtinAccessor;
        var customAccessor;
        valueAccessors.forEach(function (v) {
            if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
                defaultAccessor = v;
            }
            else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) ||
                lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) ||
                lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) ||
                lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
                if (lang_1.isPresent(builtinAccessor))
                    _throwError(dir, "More than one built-in value accessor matches");
                builtinAccessor = v;
            }
            else {
                if (lang_1.isPresent(customAccessor))
                    _throwError(dir, "More than one custom value accessor matches");
                customAccessor = v;
            }
        });
        if (lang_1.isPresent(customAccessor))
            return customAccessor;
        if (lang_1.isPresent(builtinAccessor))
            return builtinAccessor;
        if (lang_1.isPresent(defaultAccessor))
            return defaultAccessor;
        _throwError(dir, "No valid value accessor for");
        return null;
    }
    exports_1("selectValueAccessor", selectValueAccessor);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            },
            function (default_value_accessor_1_1) {
                default_value_accessor_1 = default_value_accessor_1_1;
            },
            function (number_value_accessor_1_1) {
                number_value_accessor_1 = number_value_accessor_1_1;
            },
            function (checkbox_value_accessor_1_1) {
                checkbox_value_accessor_1 = checkbox_value_accessor_1_1;
            },
            function (select_control_value_accessor_1_1) {
                select_control_value_accessor_1 = select_control_value_accessor_1_1;
            },
            function (radio_control_value_accessor_1_1) {
                radio_control_value_accessor_1 = radio_control_value_accessor_1_1;
            },
            function (normalize_validator_1_1) {
                normalize_validator_1 = normalize_validator_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=shared.js.map