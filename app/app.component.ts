import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, Router } from 'angular2/router';
import { FindPerson } from './find-person/find-person';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Map } from './map/map';
import { NgStyle } from 'angular2/common';
import { SetupProcess } from './setup-process/setup-process';
import {LocationStrategy,
        HashLocationStrategy} from 'angular2/router';
import {provide}           from 'angular2/core';
import { Constants } from './constants';
import { ScreenSpecificInformation } from './screen-specific-information';

@Component({
    selector: 'main-frame',
    templateUrl: 'app/main-frame/main-frame.html', // Relative base
    directives: [ROUTER_DIRECTIVES, NgStyle],
    providers: [ROUTER_PROVIDERS,provide(LocationStrategy,
         {useClass: HashLocationStrategy})]
})
@RouteConfig([
  {
    path: '/setup',
    component: SetupProcess,
    name: 'SetupProcess',
    useAsDefault: true
  },
  {
    path: '/home',
    component: Home,
    name: 'Home',
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

    // Fetches the screen specific information from the session storage
    // If the screen information is null this returns a default object
    public get screenInfo(): ScreenSpecificInformation {
      var screenInfo = JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
      if (screenInfo == null) { return new ScreenSpecificInformation(); }
      return screenInfo
    }

    // Called whenever the window is clicked
    onWindowClick = () => {
      window.clearInterval(this.refreshVar);
      this.refreshVar = window.setInterval(this.refreshPage, this.refreshTimeout);
    }

    // After this time (5 min) the page will reload if none has touched the window
    private refreshTimeout = 5 * 60 * 1000;
    // Reloads the current page
    refreshPage = () => {
      // Navigate to '/Home'
      this.router.navigate(['Home']).then(() => {
        window.location.reload(true);
      });
    }
    // Used to clear the refresh timer
    private refreshVar

constructor(private router: Router, private location: Location) {
    // Check whether or not the screen has gone through the setup process
    var screenInfo = sessionStorage.getItem(Constants.SETUP_PROCESS_KEY); // Returns null when nothing is found
    if (screenInfo != null) { /* Has gone through setup - go to Home then */
      this.router.navigate(['Home']);
    }

    // Setup update interval
    this.refreshVar = window.setInterval(this.refreshPage, this.refreshTimeout);
    // Setup the window on click callback
    window.onclick = this.onWindowClick;

    router.subscribe((val) => {
    var url_with_para = val.split("?",1);
    console.log(url_with_para);
    switch(url_with_para[0]){
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
