/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
System.register(['./pipes/async_pipe', './pipes/date_pipe', './pipes/json_pipe', './pipes/slice_pipe', './pipes/lowercase_pipe', './pipes/number_pipe', './pipes/uppercase_pipe', './pipes/replace_pipe', './pipes/i18n_plural_pipe', './pipes/i18n_select_pipe', './pipes/common_pipes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (async_pipe_1_1) {
                exports_1({
                    "AsyncPipe": async_pipe_1_1["AsyncPipe"]
                });
            },
            function (date_pipe_1_1) {
                exports_1({
                    "DatePipe": date_pipe_1_1["DatePipe"]
                });
            },
            function (json_pipe_1_1) {
                exports_1({
                    "JsonPipe": json_pipe_1_1["JsonPipe"]
                });
            },
            function (slice_pipe_1_1) {
                exports_1({
                    "SlicePipe": slice_pipe_1_1["SlicePipe"]
                });
            },
            function (lowercase_pipe_1_1) {
                exports_1({
                    "LowerCasePipe": lowercase_pipe_1_1["LowerCasePipe"]
                });
            },
            function (number_pipe_1_1) {
                exports_1({
                    "NumberPipe": number_pipe_1_1["NumberPipe"],
                    "DecimalPipe": number_pipe_1_1["DecimalPipe"],
                    "PercentPipe": number_pipe_1_1["PercentPipe"],
                    "CurrencyPipe": number_pipe_1_1["CurrencyPipe"]
                });
            },
            function (uppercase_pipe_1_1) {
                exports_1({
                    "UpperCasePipe": uppercase_pipe_1_1["UpperCasePipe"]
                });
            },
            function (replace_pipe_1_1) {
                exports_1({
                    "ReplacePipe": replace_pipe_1_1["ReplacePipe"]
                });
            },
            function (i18n_plural_pipe_1_1) {
                exports_1({
                    "I18nPluralPipe": i18n_plural_pipe_1_1["I18nPluralPipe"]
                });
            },
            function (i18n_select_pipe_1_1) {
                exports_1({
                    "I18nSelectPipe": i18n_select_pipe_1_1["I18nSelectPipe"]
                });
            },
            function (common_pipes_1_1) {
                exports_1({
                    "COMMON_PIPES": common_pipes_1_1["COMMON_PIPES"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=pipes.js.map