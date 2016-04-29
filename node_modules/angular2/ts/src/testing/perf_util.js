System.register(['./e2e_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var benchpress, bind, Options;
    function runClickBenchmark(config) {
        browser.ignoreSynchronization = !config.waitForAngular2;
        var buttons = config.buttons.map(function (selector) { return $(selector); });
        config.work = function () { buttons.forEach(function (button) { button.click(); }); };
        return runBenchmark(config);
    }
    exports_1("runClickBenchmark", runClickBenchmark);
    function runBenchmark(config) {
        return getScaleFactor(browser.params.benchmark.scaling)
            .then(function (scaleFactor) {
            var description = {};
            var urlParams = [];
            if (config.params) {
                config.params.forEach(function (param) {
                    var name = param.name;
                    var value = applyScaleFactor(param.value, scaleFactor, param.scale);
                    urlParams.push(name + '=' + value);
                    description[name] = value;
                });
            }
            var url = encodeURI(config.url + '?' + urlParams.join('&'));
            return browser.get(url).then(function () {
                return global['benchpressRunner'].sample({
                    id: config.id,
                    execute: config.work,
                    prepare: config.prepare,
                    microMetrics: config.microMetrics,
                    bindings: [bind(Options.SAMPLE_DESCRIPTION).toValue(description)]
                });
            });
        });
    }
    exports_1("runBenchmark", runBenchmark);
    function getScaleFactor(possibleScalings) {
        return browser.executeScript('return navigator.userAgent')
            .then(function (userAgent) {
            var scaleFactor = 1;
            possibleScalings.forEach(function (entry) {
                if (userAgent.match(entry.userAgent)) {
                    scaleFactor = entry.value;
                }
            });
            return scaleFactor;
        });
    }
    function applyScaleFactor(value, scaleFactor, method) {
        if (method === 'log2') {
            return value + Math.log(scaleFactor) / Math.LN2;
        }
        else if (method === 'sqrt') {
            return value * Math.sqrt(scaleFactor);
        }
        else if (method === 'linear') {
            return value * scaleFactor;
        }
        else {
            return value;
        }
    }
    return {
        setters:[
            function (e2e_util_1_1) {
                exports_1({
                    "verifyNoBrowserErrors": e2e_util_1_1["verifyNoBrowserErrors"]
                });
            }],
        execute: function() {
            benchpress = global['benchpress'];
            bind = benchpress.bind;
            Options = benchpress.Options;
        }
    }
});
//# sourceMappingURL=perf_util.js.map