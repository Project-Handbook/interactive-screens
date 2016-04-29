System.register(['angular2/src/facade/lang', './directives/ng_control_name', './directives/ng_form_control', './directives/ng_model', './directives/ng_control_group', './directives/ng_form_model', './directives/ng_form', './directives/default_value_accessor', './directives/checkbox_value_accessor', './directives/number_value_accessor', './directives/radio_control_value_accessor', './directives/ng_control_status', './directives/select_control_value_accessor', './directives/validators', './directives/ng_control'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, ng_control_name_1, ng_form_control_1, ng_model_1, ng_control_group_1, ng_form_model_1, ng_form_1, default_value_accessor_1, checkbox_value_accessor_1, number_value_accessor_1, radio_control_value_accessor_1, ng_control_status_1, select_control_value_accessor_1, validators_1;
    var FORM_DIRECTIVES;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (ng_control_name_1_1) {
                ng_control_name_1 = ng_control_name_1_1;
                exports_1({
                    "NgControlName": ng_control_name_1_1["NgControlName"]
                });
            },
            function (ng_form_control_1_1) {
                ng_form_control_1 = ng_form_control_1_1;
                exports_1({
                    "NgFormControl": ng_form_control_1_1["NgFormControl"]
                });
            },
            function (ng_model_1_1) {
                ng_model_1 = ng_model_1_1;
                exports_1({
                    "NgModel": ng_model_1_1["NgModel"]
                });
            },
            function (ng_control_group_1_1) {
                ng_control_group_1 = ng_control_group_1_1;
                exports_1({
                    "NgControlGroup": ng_control_group_1_1["NgControlGroup"]
                });
            },
            function (ng_form_model_1_1) {
                ng_form_model_1 = ng_form_model_1_1;
                exports_1({
                    "NgFormModel": ng_form_model_1_1["NgFormModel"]
                });
            },
            function (ng_form_1_1) {
                ng_form_1 = ng_form_1_1;
                exports_1({
                    "NgForm": ng_form_1_1["NgForm"]
                });
            },
            function (default_value_accessor_1_1) {
                default_value_accessor_1 = default_value_accessor_1_1;
                exports_1({
                    "DefaultValueAccessor": default_value_accessor_1_1["DefaultValueAccessor"]
                });
            },
            function (checkbox_value_accessor_1_1) {
                checkbox_value_accessor_1 = checkbox_value_accessor_1_1;
                exports_1({
                    "CheckboxControlValueAccessor": checkbox_value_accessor_1_1["CheckboxControlValueAccessor"]
                });
            },
            function (number_value_accessor_1_1) {
                number_value_accessor_1 = number_value_accessor_1_1;
                exports_1({
                    "NumberValueAccessor": number_value_accessor_1_1["NumberValueAccessor"]
                });
            },
            function (radio_control_value_accessor_1_1) {
                radio_control_value_accessor_1 = radio_control_value_accessor_1_1;
                exports_1({
                    "RadioControlValueAccessor": radio_control_value_accessor_1_1["RadioControlValueAccessor"],
                    "RadioButtonState": radio_control_value_accessor_1_1["RadioButtonState"]
                });
            },
            function (ng_control_status_1_1) {
                ng_control_status_1 = ng_control_status_1_1;
                exports_1({
                    "NgControlStatus": ng_control_status_1_1["NgControlStatus"]
                });
            },
            function (select_control_value_accessor_1_1) {
                select_control_value_accessor_1 = select_control_value_accessor_1_1;
                exports_1({
                    "SelectControlValueAccessor": select_control_value_accessor_1_1["SelectControlValueAccessor"],
                    "NgSelectOption": select_control_value_accessor_1_1["NgSelectOption"]
                });
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
                exports_1({
                    "RequiredValidator": validators_1_1["RequiredValidator"],
                    "MinLengthValidator": validators_1_1["MinLengthValidator"],
                    "MaxLengthValidator": validators_1_1["MaxLengthValidator"],
                    "PatternValidator": validators_1_1["PatternValidator"]
                });
            },
            function (ng_control_1_1) {
                exports_1({
                    "NgControl": ng_control_1_1["NgControl"]
                });
            }],
        execute: function() {
            /**
             *
             * A list of all the form directives used as part of a `@Component` annotation.
             *
             *  This is a shorthand for importing them each individually.
             *
             * ### Example
             *
             * ```typescript
             * @Component({
             *   selector: 'my-app',
             *   directives: [FORM_DIRECTIVES]
             * })
             * class MyApp {}
             * ```
             */
            exports_1("FORM_DIRECTIVES", FORM_DIRECTIVES = lang_1.CONST_EXPR([
                ng_control_name_1.NgControlName,
                ng_control_group_1.NgControlGroup,
                ng_form_control_1.NgFormControl,
                ng_model_1.NgModel,
                ng_form_model_1.NgFormModel,
                ng_form_1.NgForm,
                select_control_value_accessor_1.NgSelectOption,
                default_value_accessor_1.DefaultValueAccessor,
                number_value_accessor_1.NumberValueAccessor,
                checkbox_value_accessor_1.CheckboxControlValueAccessor,
                select_control_value_accessor_1.SelectControlValueAccessor,
                radio_control_value_accessor_1.RadioControlValueAccessor,
                ng_control_status_1.NgControlStatus,
                validators_1.RequiredValidator,
                validators_1.MinLengthValidator,
                validators_1.MaxLengthValidator,
                validators_1.PatternValidator
            ]));
        }
    }
});
//# sourceMappingURL=directives.js.map