
import { bootstrap}      from '@angular/platform-browser-dynamic';
import { AppComponent,routes}   from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter} from '@angular/router';
import { enableProdMode,provide} from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy,APP_BASE_HREF  } from "@angular/common";
import { provideForms,disableDeprecatedForms } from '@angular/forms';

if(!localStorage.getItem('EMAIL_API_KEY')){
  localStorage.setItem('EMAIL_API_KEY',JSON.stringify({key:"api:key-5164d1f0b491719c50e103020764205a"}));
}

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent,
  [
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provideRouter(routes),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provideForms(),
    disableDeprecatedForms()
  ]
).catch((err:any)=>location.reload());
