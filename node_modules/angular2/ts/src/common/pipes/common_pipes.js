System.register(['./async_pipe', './uppercase_pipe', './lowercase_pipe', './json_pipe', './slice_pipe', './date_pipe', './number_pipe', './replace_pipe', './i18n_plural_pipe', './i18n_select_pipe', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_pipe_1, uppercase_pipe_1, lowercase_pipe_1, json_pipe_1, slice_pipe_1, date_pipe_1, number_pipe_1, replace_pipe_1, i18n_plural_pipe_1, i18n_select_pipe_1, lang_1;
    var COMMON_PIPES;
    return {
        setters:[
            function (async_pipe_1_1) {
                async_pipe_1 = async_pipe_1_1;
            },
            function (uppercase_pipe_1_1) {
                uppercase_pipe_1 = uppercase_pipe_1_1;
            },
            function (lowercase_pipe_1_1) {
                lowercase_pipe_1 = lowercase_pipe_1_1;
            },
            function (json_pipe_1_1) {
                json_pipe_1 = json_pipe_1_1;
            },
            function (slice_pipe_1_1) {
                slice_pipe_1 = slice_pipe_1_1;
            },
            function (date_pipe_1_1) {
                date_pipe_1 = date_pipe_1_1;
            },
            function (number_pipe_1_1) {
                number_pipe_1 = number_pipe_1_1;
            },
            function (replace_pipe_1_1) {
                replace_pipe_1 = replace_pipe_1_1;
            },
            function (i18n_plural_pipe_1_1) {
                i18n_plural_pipe_1 = i18n_plural_pipe_1_1;
            },
            function (i18n_select_pipe_1_1) {
                i18n_select_pipe_1 = i18n_select_pipe_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A collection of Angular core pipes that are likely to be used in each and every
             * application.
             *
             * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
             * property of the `@Component` decorator.
             */
            exports_1("COMMON_PIPES", COMMON_PIPES = lang_1.CONST_EXPR([
                async_pipe_1.AsyncPipe,
                uppercase_pipe_1.UpperCasePipe,
                lowercase_pipe_1.LowerCasePipe,
                json_pipe_1.JsonPipe,
                slice_pipe_1.SlicePipe,
                number_pipe_1.DecimalPipe,
                number_pipe_1.PercentPipe,
                number_pipe_1.CurrencyPipe,
                date_pipe_1.DatePipe,
                replace_pipe_1.ReplacePipe,
                i18n_plural_pipe_1.I18nPluralPipe,
                i18n_select_pipe_1.I18nSelectPipe
            ]));
        }
    }
});
//# sourceMappingURL=common_pipes.js.map