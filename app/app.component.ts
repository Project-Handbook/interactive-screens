import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, Router } from 'angular2/router';
import { FindPerson } from './find-person/find-person';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Map } from './map/map';
import { NgStyle } from 'angular2/common';

@Component({
    selector: 'main-frame',
    templateUrl: 'app/main-frame/main-frame.html', // Relative base
    directives: [ROUTER_DIRECTIVES, NgStyle],
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
    menuItemsRightBorder: Array<string> = ['none', 'solid #2258A5', 'solid #2258A5', 'solid #2258A5'];
    menuItemsTopBottomBorder: Array<string> = ['1px solid #2258A5', '1px groove #A9A9A9', '1px groove #A9A9A9', '1px groove #A9A9A9'];
    prev:number = 0;

  constructor(private router: Router, private location: Location) {
    router.subscribe((val) => {
    console.log(val);
    console.log(this.menuItemsRightBorder);

    switch(val){
      case "home":
        if (this.prev !== 0) {
            this.menuItemsRightBorder[0] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuItemsTopBottomBorder[0] = "1px solid #2258A5";
            this.menuItemsTopBottomBorder[this.prev] = "1px groove #A9A9A9"
            this.prev = 0;
          }
          break;
        case "find-person":
          if (this.prev !== 1) {
            this.menuItemsRightBorder[1] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuItemsTopBottomBorder[1] = "1px solid #2258A5";
            this.menuItemsTopBottomBorder[this.prev] = "1px groove #A9A9A9"
            this.prev = 1;
          }
          break;
        case "map":
          if (this.prev !== 2) {
            this.menuItemsRightBorder[2] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuItemsTopBottomBorder[2] = "1px solid #2258A5";
            this.menuItemsTopBottomBorder[this.prev] = "1px groove #A9A9A9"
            this.prev = 2;
          }
          break;
        case "contact":
          if (this.prev !== 3) {
            this.menuItemsRightBorder[3] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuItemsTopBottomBorder[3] = "1px solid #2258A5";
            this.menuItemsTopBottomBorder[this.prev] = "1px groove #A9A9A9"
            this.prev = 3;
          }
          break;
      };
    })
   }
}
