"use strict";
// <reference path="../node_modules/angular2/typings/browser.d.ts" />
///<reference path="../typings/main.d.ts" />
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=main.js.map