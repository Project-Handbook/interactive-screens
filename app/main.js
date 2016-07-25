"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var forms_1 = require('@angular/forms');
/// <reference path="typings/index.d.ts" />
core_1.enableProdMode();
if (!localStorage.getItem('EMAIL_API_KEY')) {
    localStorage.setItem('EMAIL_API_KEY', JSON.stringify({ key: "api:key-5164d1f0b491719c50e103020764205a" }));
}
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_1.provideRouter(app_component_1.routes),
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    forms_1.provideForms(),
    forms_1.disableDeprecatedForms()
]).catch(function (err) { return location.reload(); });
//# sourceMappingURL=main.js.map