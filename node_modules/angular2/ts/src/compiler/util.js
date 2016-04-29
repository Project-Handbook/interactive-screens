System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var CAMEL_CASE_REGEXP, DASH_CASE_REGEXP, SINGLE_QUOTE_ESCAPE_STRING_RE, DOUBLE_QUOTE_ESCAPE_STRING_RE, MODULE_SUFFIX, CONST_VAR, Statement, Expression;
    function camelCaseToDashCase(input) {
        return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
    }
    exports_1("camelCaseToDashCase", camelCaseToDashCase);
    function dashCaseToCamelCase(input) {
        return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, function (m) { return m[1].toUpperCase(); });
    }
    exports_1("dashCaseToCamelCase", dashCaseToCamelCase);
    function escapeSingleQuoteString(input) {
        if (lang_1.isBlank(input)) {
            return null;
        }
        return "'" + escapeString(input, SINGLE_QUOTE_ESCAPE_STRING_RE) + "'";
    }
    exports_1("escapeSingleQuoteString", escapeSingleQuoteString);
    function escapeDoubleQuoteString(input) {
        if (lang_1.isBlank(input)) {
            return null;
        }
        return "\"" + escapeString(input, DOUBLE_QUOTE_ESCAPE_STRING_RE) + "\"";
    }
    exports_1("escapeDoubleQuoteString", escapeDoubleQuoteString);
    function escapeString(input, re) {
        return lang_1.StringWrapper.replaceAllMapped(input, re, function (match) {
            if (match[0] == '$') {
                return lang_1.IS_DART ? '\\$' : '$';
            }
            else if (match[0] == '\n') {
                return '\\n';
            }
            else if (match[0] == '\r') {
                return '\\r';
            }
            else {
                return "\\" + match[0];
            }
        });
    }
    function codeGenExportVariable(name) {
        if (lang_1.IS_DART) {
            return "const " + name + " = ";
        }
        else {
            return "var " + name + " = exports['" + name + "'] = ";
        }
    }
    exports_1("codeGenExportVariable", codeGenExportVariable);
    function codeGenConstConstructorCall(name) {
        if (lang_1.IS_DART) {
            return "const " + name;
        }
        else {
            return "new " + name;
        }
    }
    exports_1("codeGenConstConstructorCall", codeGenConstConstructorCall);
    function codeGenValueFn(params, value, fnName) {
        if (fnName === void 0) { fnName = ''; }
        if (lang_1.IS_DART) {
            return codeGenFnHeader(params, fnName) + " => " + value;
        }
        else {
            return codeGenFnHeader(params, fnName) + " { return " + value + "; }";
        }
    }
    exports_1("codeGenValueFn", codeGenValueFn);
    function codeGenFnHeader(params, fnName) {
        if (fnName === void 0) { fnName = ''; }
        if (lang_1.IS_DART) {
            return fnName + "(" + params.join(',') + ")";
        }
        else {
            return "function " + fnName + "(" + params.join(',') + ")";
        }
    }
    exports_1("codeGenFnHeader", codeGenFnHeader);
    function codeGenToString(expr) {
        if (lang_1.IS_DART) {
            return "'${" + expr + "}'";
        }
        else {
            // JS automatically converts to string...
            return expr;
        }
    }
    exports_1("codeGenToString", codeGenToString);
    function splitAtColon(input, defaultValues) {
        var parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
        if (parts.length > 1) {
            return parts;
        }
        else {
            return defaultValues;
        }
    }
    exports_1("splitAtColon", splitAtColon);
    function escapeValue(value) {
        if (value instanceof Expression) {
            return value.expression;
        }
        else if (lang_1.isString(value)) {
            return escapeSingleQuoteString(value);
        }
        else if (lang_1.isBlank(value)) {
            return 'null';
        }
        else {
            return "" + value;
        }
    }
    exports_1("escapeValue", escapeValue);
    function codeGenArray(data) {
        return "[" + data.map(escapeValue).join(',') + "]";
    }
    exports_1("codeGenArray", codeGenArray);
    function codeGenFlatArray(values) {
        var result = '([';
        var isFirstArrayEntry = true;
        var concatFn = lang_1.IS_DART ? '.addAll' : 'concat';
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value instanceof Expression && value.isArray) {
                result += "])." + concatFn + "(" + value.expression + ")." + concatFn + "([";
                isFirstArrayEntry = true;
            }
            else {
                if (!isFirstArrayEntry) {
                    result += ',';
                }
                isFirstArrayEntry = false;
                result += escapeValue(value);
            }
        }
        result += '])';
        return result;
    }
    exports_1("codeGenFlatArray", codeGenFlatArray);
    function codeGenStringMap(keyValueArray) {
        return "{" + keyValueArray.map(codeGenKeyValue).join(',') + "}";
    }
    exports_1("codeGenStringMap", codeGenStringMap);
    function codeGenKeyValue(keyValue) {
        return escapeValue(keyValue[0]) + ":" + escapeValue(keyValue[1]);
    }
    function addAll(source, target) {
        for (var i = 0; i < source.length; i++) {
            target.push(source[i]);
        }
    }
    exports_1("addAll", addAll);
    function flattenArray(source, target) {
        if (lang_1.isPresent(source)) {
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                if (lang_1.isArray(item)) {
                    flattenArray(item, target);
                }
                else {
                    target.push(item);
                }
            }
        }
        return target;
    }
    exports_1("flattenArray", flattenArray);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            CAMEL_CASE_REGEXP = /([A-Z])/g;
            DASH_CASE_REGEXP = /-([a-z])/g;
            SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
            DOUBLE_QUOTE_ESCAPE_STRING_RE = /"|\\|\n|\r|\$/g;
            exports_1("MODULE_SUFFIX", MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '.js');
            exports_1("CONST_VAR", CONST_VAR = lang_1.IS_DART ? 'const' : 'var');
            Statement = (function () {
                function Statement(statement) {
                    this.statement = statement;
                }
                return Statement;
            }());
            exports_1("Statement", Statement);
            Expression = (function () {
                function Expression(expression, isArray) {
                    if (isArray === void 0) { isArray = false; }
                    this.expression = expression;
                    this.isArray = isArray;
                }
                return Expression;
            }());
            exports_1("Expression", Expression);
        }
    }
});
//# sourceMappingURL=util.js.map