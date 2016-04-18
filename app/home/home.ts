import { Component, ViewEncapsulation } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { HomeService } from './home-service';

@Component({
  selector: 'home',
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: 'app/home/home.html',
  providers:[HomeService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app/home/home.min.css']

})
export class Home {
    calendar_block: String;
    news_block: String;
    calendar_error:boolean;
    news_feed_error:boolean;
    constructor(private homeService:HomeService){}

    getCalendar(){
      this.homeService.getCalendar()
        .subscribe(res =>
          this.calendar_block = res,
          error=>this.calendar_error=true,
          ()=>this.news_feed_error=true
        );
    }

    getNewsFeed(){
      this.homeService.getNewsFeed()
      .subscribe(res =>
        this.news_block = res,
        error=>this.news_feed_error=true,
        ()=>this.news_feed_error=false
      );
    }

    ngOnInit(){
      this.getCalendar();
      this.getNewsFeed();
    }
}
