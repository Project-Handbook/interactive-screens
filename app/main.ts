/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from 'angular2/http'
bootstrap(AppComponent,[HTTP_PROVIDERS]);
