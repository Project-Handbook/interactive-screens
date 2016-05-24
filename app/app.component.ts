import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { Location, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { FindPerson } from './find-person/find-person';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Map } from './map/map';
import { NgStyle } from '@angular/common';
import { SetupProcess } from './setup-process/setup-process';
import { provide } from '@angular/core';
import { Constants } from './constants';
import { ScreenSpecificInformation } from './screen-specific-information';

@Component({
    selector: 'main-frame',
    templateUrl: 'app/main-frame/main-frame.html', // Relative base
    directives: [ROUTER_DIRECTIVES, NgStyle],
    providers: [ROUTER_PROVIDERS, provide(LocationStrategy,
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
    // Keys of screenInfo.opening_hours, used for iteration over dictionary
    public weekdays: Array<string> = ['monday', 'tuesday', 'wednesday', 'thursday',
                                      'friday', 'saturday', 'sunday'];

    // The system time displayed in the main-frame header
    clock: string = "";

    menuItemsRightBorder: Array<string> = ['none', 'solid #2258A5', 'solid #2258A5', 'solid #2258A5'];
    prev: number = 0;
    menuImages: Array<boolean> = [true, false, false, false];
    public imagePath = "app/main-frame/images/";
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

    refreshClock = () => {
      let date = new Date();
      let day = date.getDate();
      let months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
      let month = months[date.getMonth()];
      let year  = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      this.clock = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    }

constructor(private router: Router, private location: Location) {
    // Check whether or not the screen has gone through the setup process
    var screenInfo = localStorage.getItem(Constants.SETUP_PROCESS_KEY); // Returns null when nothing is found
    if (screenInfo === null) { /* Has not gone through setup - go to Setup then */
      this.router.navigate(['Setup']);
    }

    // Setup update interval
    this.refreshVar = window.setInterval(this.refreshPage, this.refreshTimeout);
    // Setup the window on click callback
    window.onclick = this.onWindowClick;

    // Refresh the clock every minute
    window.setInterval(this.refreshClock, 60);

    /**Subscribes to the router, every time the route is changed the code inside the subscribe statement
      is executed, changed the appearance of the menu items depending on the current route*/
    router.subscribe((val) => {
    var url_with_para = val.split("?",1);

    switch(url_with_para[0]){
      case "home":
        if (this.prev !== 0) {
            this.menuItemsRightBorder[0] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[0] = true;
            this.menuImages[this.prev] = false;
            this.prev = 0;
          }
          break;
        case "find-person":
          if (this.prev !== 1) {
            this.menuItemsRightBorder[1] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[1] = true;
            this.menuImages[this.prev] = false;
            this.prev = 1;
          }
          break;
        case "map":
          if (this.prev !== 2) {
            this.menuItemsRightBorder[2] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[2] = true;
            this.menuImages[this.prev] = false;
            this.prev = 2;
          }
          break;
        case "contact":
          if (this.prev !== 3) {
            this.menuItemsRightBorder[3] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[3] = true;
            this.menuImages[this.prev] = false;
            this.prev = 3;
          }
          break;
      };
    })
   }
}
