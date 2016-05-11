import { Component ,ViewEncapsulation } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { HomeService } from './home-service';

@Component({
  selector: 'home',
  viewProviders: [HTTP_PROVIDERS],
  encapsulation: ViewEncapsulation.Native,
  templateUrl: 'app/home/home.html',
  providers:[HomeService],
  styleUrls: ['app/home/home.min.css']
})
export class Home {
    calendar_block: String;
    news_block: String;

    constructor(private homeService: HomeService) {}

    getCalendar() {
      this.homeService.getCalendar()
      .subscribe(res => { this.calendar_block = res ,error=>console.log("error")});
    }

    getNewsFeed() {
      this.homeService.getNewsFeed()
      .subscribe(res => { this.news_block = res,error=>console.log("error")});
    }

    ngOnInit() {
      this.getCalendar();
      this.getNewsFeed();
    }
}
