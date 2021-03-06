import { Component,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { RouterConfig, ROUTER_DIRECTIVES, Router} from '@angular/router';
import { Location, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { FindPerson } from './find-person/find-person';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Map } from './map/map';
import { SetupProcess } from './setup-process/setup-process';
import { provide } from '@angular/core';
import { Constants } from './constants';
import { ScreenSpecificInformation} from './screen-specific-information';
import {DomSanitizationService,SafeHtml} from '@angular/platform-browser';

export const routes:RouterConfig = [
  {
    path: '',
    redirectTo: 'home',
    terminal:true
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'setup',
    component: SetupProcess,
  },
  {
    path: 'people',
    component: FindPerson
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'map',
    component: Map
  }
]

@Component({
    selector: 'main-frame',
    templateUrl: './main-frame/main-frame.html', // Relative base
    directives: [ROUTER_DIRECTIVES],
    precompile:[Home,SetupProcess,FindPerson,Map,Contact],
    styles:[require('./main-frame/main-frame.scss').toString()]
})

/*The styles in the "styles" section underneath is styles that is applied to html inserted in the view
  with [innerHTML]. To apply styles to these elements the :host>>> operator has to be used that is a
  angular 2 specific operator and is not supported by sass, hence these styles has to be
  listed separtely underneath.*/
export class AppComponent  {
    // Keys of screenInfo.opening_hours, used for iteration over dictionary
    public weekdays: Array<string> = ['monday', 'tuesday', 'wednesday', 'thursday',
                                      'friday', 'saturday', 'sunday'];

    // The system time displayed in the main-frame header
    clock: SafeHtml = "";

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
      this.router.navigate(['home']).then(() => {
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

      var hours_str: string;
      var minutes_str: string;
      var seconds_str: string;

      if (hours < 10)   { hours_str   = `0${hours}`;   } else { hours_str   = `${hours}`}
      if (minutes < 10) { minutes_str = `0${minutes}`; } else { minutes_str = `${minutes}`}
      if (seconds < 10) { seconds_str = `0${seconds}`; } else { seconds_str = `${seconds}`}

      this.clock = this.sanitizer.bypassSecurityTrustHtml(`<span class="date">${day} ${month} ${year}</span>
                    <br>
                    <span class="time">${hours_str}:${minutes_str}:${seconds_str}</span>`);
    }

constructor(private router: Router, private location: Location,
            private cdr:ChangeDetectorRef,private element:ElementRef,
            private sanitizer:DomSanitizationService) {
    this.element = element;
    this.cdr = cdr;
    // Check whether or not the screen has gone through the setup process
    var screenInfo = localStorage.getItem(Constants.SETUP_PROCESS_KEY); // Returns null when nothing is found
    if (!screenInfo) { /* Has not gone through setup - go to Setup then */
      this.router.navigate(['setup']);
    }

    // Setup update interval
    this.refreshVar = window.setInterval(this.refreshPage, this.refreshTimeout);
    // Setup the window on click callback
    window.onclick = this.onWindowClick;

    // Refresh the clock every minute
    window.setInterval(this.refreshClock, 60);

    /* Subscribes to the router, every time the route is changed the code inside the subscribe statement
       is executed, changed the appearance of the menu items depending on the current route */
    router.events.subscribe((val) => {
    var url_with_para = val.url.split("?",1);

    switch(url_with_para[0]){
      case "/home":
        if (this.prev !== 0) {
            this.menuItemsRightBorder[0] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[0] = true;
            this.menuImages[this.prev] = false;
            this.prev = 0;
          }
          break;
        case "/people":
          if (this.prev !== 1) {
            this.menuItemsRightBorder[1] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[1] = true;
            this.menuImages[this.prev] = false;
            this.prev = 1;
          }
          break;
        case "/map":
          if (this.prev !== 2) {
            this.menuItemsRightBorder[2] = "none";
            this.menuItemsRightBorder[this.prev] = "solid #2258A5";
            this.menuImages[2] = true;
            this.menuImages[this.prev] = false;
            this.prev = 2;
          }
          break;
        case "/contact":
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

   /**
    If title text covers more than 60% percent of the screen width then decrease the
    font-size until the text covers less then 60%:
   */
   @ViewChild('titleText') titleTextElement;

   @ViewChild('header') headerElement;

   titlefontSize:number=5;

   ngAfterViewInit(){
     while(this.titleTextElement.nativeElement.offsetWidth>=this.headerElement.nativeElement.offsetWidth*0.6){
       this.titlefontSize*=0.95;
       this.cdr.detectChanges();
     }
  }
}
