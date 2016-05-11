// <reference path="../node_modules/angular2/typings/browser.d.ts" />
///<reference path="../typings/main.d.ts" />
import { bootstrap }      from '@angular/platform-browser-dynamic'
import { AppComponent }   from './app.component'
import { HTTP_PROVIDERS } from '@angular/http'
import { ROUTER_PROVIDERS} from '@angular/router'
bootstrap(AppComponent, [HTTP_PROVIDERS,ROUTER_PROVIDERS]);
