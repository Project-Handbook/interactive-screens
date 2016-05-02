import { Component, ViewEncapsulation} from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { HomeService } from './home-service';

@Component({
  selector: 'home',
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: 'app/home/home.html',
  providers:[HomeService],
  encapsulation: ViewEncapsulation.Native,
   styles: [`
    @import "http://www.kth.se/css/v/8.28.4/kth.css";
    a{
      pointer-events: none;
    }
  `],
})
export class Home {
    calendar_block: String;
    news_block:Array<String>=[];
    calendar_error:boolean;
    news_feed_error:boolean;

    constructor(private homeService:HomeService){}
    //Returns the 4 latest calendar events from Polypoly through the home-service class
    getCalendar(){
      this.homeService.getCalendar()
        .subscribe(res =>
          {this.calendar_block = res},
          error=>{this.calendar_error=true},
          ()=>this.calendar_error=false
        );
    }
    //Fetches the news event block from Polypoly through the home-service class.
    getNewsFeed(){
      this.homeService.getNewsFeed()
      .subscribe(res => {
          for(var i =0;i<res.length;i++){
            this.news_block.push(res[i].innerHTML);
            console.log(this.news_block[i]);
          }

        },
        error=>{this.news_feed_error=true},
        ()=>  this.news_feed_error=false
      );
    }
    //Calls getCalendar and getNewsFeed on View Init.
    ngOnInit(){
      this.getCalendar();
      this.getNewsFeed();
    }
  }
