import { bootstrap }      from '@angular/platform-browser-dynamic';
import { AppComponent,routes}   from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter} from '@angular/router';
import { enableProdMode,provide} from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from "@angular/common";

//enableProdMode();

bootstrap(AppComponent,
  [
    HTTP_PROVIDERS,
    provideRouter(routes),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]
);//.catch((err:any)=>location.reload());
