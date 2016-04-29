System.register(['angular2/src/testing/e2e_util', 'angular2/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var e2e_util_1, testing_1;
    function waitForElement(selector) {
        var EC = protractor.ExpectedConditions;
        // Waits for the element with id 'abc' to be present on the dom.
        e2e_util_1.browser.wait(EC.presenceOf($(selector)), 20000);
    }
    function waitForAlert() {
        var EC = protractor.ExpectedConditions;
        e2e_util_1.browser.wait(EC.alertIsPresent(), 1000);
    }
    return {
        setters:[
            function (e2e_util_1_1) {
                e2e_util_1 = e2e_util_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            }],
        execute: function() {
            describe('can deactivate example app', function () {
                afterEach(e2e_util_1.verifyNoBrowserErrors);
                var URL = 'angular2/examples/router/ts/can_deactivate/';
                it('should not navigate away when prompt is cancelled', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('note-index-cmp');
                    element(by.css('#note-1-link')).click();
                    waitForElement('note-cmp');
                    e2e_util_1.browser.navigate().back();
                    waitForAlert();
                    e2e_util_1.browser.switchTo().alert().dismiss(); // Use to simulate cancel button
                    testing_1.expect(element(by.css('note-cmp')).getText()).toContain('id: 1');
                });
                it('should navigate away when prompt is confirmed', function () {
                    e2e_util_1.browser.get(URL);
                    waitForElement('note-index-cmp');
                    element(by.css('#note-1-link')).click();
                    waitForElement('note-cmp');
                    e2e_util_1.browser.navigate().back();
                    waitForAlert();
                    e2e_util_1.browser.switchTo().alert().accept();
                    waitForElement('note-index-cmp');
                    testing_1.expect(element(by.css('note-index-cmp')).getText()).toContain('Your Notes');
                });
            });
        }
    }
});
//# sourceMappingURL=can_deactivate_spec.js.map