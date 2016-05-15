import { Component ,ViewEncapsulation } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { HomeService } from './home-service';
import {ScreenSpecificInformation} from '../screen-specific-information';
import {Constants} from '../constants';

@Component({
  selector: 'home',
  viewProviders: [HTTP_PROVIDERS],
  encapsulation: ViewEncapsulation.Native,
  templateUrl: 'app/home/home.html',
  providers:[HomeService],
  styleUrls:['app/home/home.min.css'],
   styles: [`
    @import "http://www.kth.se/css/v/8.28.4/kth.css";
    a{
      pointer-events: none;
    }
  `],
})
export class Home {
    //Contains the calendar HTML block.
    calendar_block: String;
    //Contains the news event HTML blocks.
    news_block:Array<String>=[];
    //Used to display error message on the screen in the case of failed HTTP request
    calendar_error:boolean;
    //Used to display error message on the screen in the case of failed HTTP request
    news_feed_error:boolean;

    constructor(private homeService:HomeService){}

    //Returns the 4 latest calendar events from Polypoly through the home-service class
    getCalendar(id:string){
      this.homeService.getCalendar(id)
        .subscribe(res =>
          {this.calendar_block = res},
          error=>{this.calendar_error=true},
          ()=>this.calendar_error=false
        );
    }
    //Fetches the news event block from Polypoly through the home-service class.
    getNewsFeed(id:string){
      this.homeService.getNewsFeed(id)
      .subscribe(res => {
          for(var i =0;i<res.length;i++){
            this.news_block.push(res[i].innerHTML);
          }
        },
        error=> this.news_feed_error=true,
        ()=>    this.news_feed_error=false
      );
    }
    //Calls getCalendar and getNewsFeed on View Init.
    ngOnInit(){
      //Contains screenspecific configuration
      var screenInfo = new ScreenSpecificInformation();
      //Checks if localstorage file exists
      if(localStorage.getItem(Constants.SETUP_PROCESS_KEY)!==null){
        screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
        this.getCalendar(screenInfo.calendar_polypoly_id);
        this.getNewsFeed(screenInfo.news_feed_polypoly_id);
      }else{
        //If localstorage file doesnt exists, display error messages!
        this.news_feed_error=true;
        this.calendar_error=true;
      }
    }
  }
