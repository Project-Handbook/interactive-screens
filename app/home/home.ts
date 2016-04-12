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

    constructor(private homeService:HomeService){}

    getCalendar(){
      this.homeService.getCalendar()
      .subscribe(res => { this.calendar_block = res, console.log(res) });
    }

    getNewsFeed(){
    this.homeService.getNewsFeed()
    .subscribe(res => { this.news_block = res , console.log(res)});
    }

    ngOnInit(){
      this.getCalendar();
      //this.getNewsFeed();
    }
}
