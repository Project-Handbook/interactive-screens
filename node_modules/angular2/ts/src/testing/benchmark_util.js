System.register(['angular2/src/platform/browser/browser_adapter', 'angular2/src/facade/browser', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_adapter_1, browser_1, lang_1, exceptions_1;
    var DOM;
    function getIntParameter(name) {
        return lang_1.NumberWrapper.parseInt(getStringParameter(name), 10);
    }
    exports_1("getIntParameter", getIntParameter);
    function getStringParameter(name) {
        var els = DOM.querySelectorAll(browser_1.document, "input[name=\"" + name + "\"]");
        var value;
        var el;
        for (var i = 0; i < els.length; i++) {
            el = els[i];
            var type = DOM.type(el);
            if ((type != 'radio' && type != 'checkbox') || DOM.getChecked(el)) {
                value = DOM.getValue(el);
                break;
            }
        }
        if (lang_1.isBlank(value)) {
            throw new exceptions_1.BaseException("Could not find and input field with name " + name);
        }
        return value;
    }
    exports_1("getStringParameter", getStringParameter);
    function bindAction(selector, callback) {
        var el = DOM.querySelector(browser_1.document, selector);
        DOM.on(el, 'click', function (_) { callback(); });
    }
    exports_1("bindAction", bindAction);
    function microBenchmark(name, iterationCount, callback) {
        var durationName = name + "/" + iterationCount;
        browser_1.window.console.time(durationName);
        callback();
        browser_1.window.console.timeEnd(durationName);
    }
    exports_1("microBenchmark", microBenchmark);
    function windowProfile(name) {
        browser_1.window.console.profile(name);
    }
    exports_1("windowProfile", windowProfile);
    function windowProfileEnd(name) {
        browser_1.window.console.profileEnd(name);
    }
    exports_1("windowProfileEnd", windowProfileEnd);
    return {
        setters:[
            function (browser_adapter_1_1) {
                browser_adapter_1 = browser_adapter_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            DOM = new browser_adapter_1.BrowserDomAdapter();
        }
    }
});
//# sourceMappingURL=benchmark_util.js.map