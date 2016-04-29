System.register(['selenium-webdriver'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var webdriver;
    var browser, $;
    function clickAll(buttonSelectors) {
        buttonSelectors.forEach(function (selector) { $(selector).click(); });
    }
    exports_1("clickAll", clickAll);
    function verifyNoBrowserErrors() {
        // TODO(tbosch): Bug in ChromeDriver: Need to execute at least one command
        // so that the browser logs can be read out!
        browser.executeScript('1+1');
        browser.manage().logs().get('browser').then(function (browserLog) {
            var filteredLog = browserLog.filter(function (logEntry) {
                if (logEntry.level.value >= webdriver.logging.Level.INFO.value) {
                    console.log('>> ' + logEntry.message);
                }
                return logEntry.level.value > webdriver.logging.Level.WARNING.value;
            });
            expect(filteredLog).toEqual([]);
        });
    }
    exports_1("verifyNoBrowserErrors", verifyNoBrowserErrors);
    return {
        setters:[
            function (webdriver_1) {
                webdriver = webdriver_1;
            }],
        execute: function() {
            exports_1("browser", browser = global['browser']);
            exports_1("$", $ = global['$']);
        }
    }
});
//# sourceMappingURL=e2e_util.js.map