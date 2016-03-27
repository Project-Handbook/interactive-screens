import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { FindPerson } from './find-person/find-person';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Map } from './map/map';

@Component({
    selector: 'main-frame',
    templateUrl: 'app/main-frame/main-frame.html', // Relative base
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    path: '/home',
    component: Home,
    name: 'Home',
    useAsDefault: true
  },
  {
    path: '/find-person',
    component: FindPerson,
    name: 'FindPerson'
  },
  {
    path: '/contact',
    component: Contact,
    name: 'Contact'
  },
  {
    path: '/map',
    component: Map,
    name: 'Map'
  }
])
export class AppComponent {

}
