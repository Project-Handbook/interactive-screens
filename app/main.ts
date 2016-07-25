import { bootstrap }      from '@angular/platform-browser-dynamic';
import { AppComponent,routes}   from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter} from '@angular/router';
import { enableProdMode,provide} from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { provideForms,disableDeprecatedForms } from '@angular/forms';
//enableProdMode();

if(!localStorage.getItem('EMAIL_API_KEY')){
  localStorage.setItem('EMAIL_API_KEY',JSON.stringify({key:"api:key-5164d1f0b491719c50e103020764205a"}));
}  

bootstrap(AppComponent,
  [
    HTTP_PROVIDERS,
    provideRouter(routes),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provideForms(),
    disableDeprecatedForms()
  ]
)//.catch((err:any)=>location.reload());
