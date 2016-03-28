import { Component } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

@Component({
  selector: 'home',
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: 'app/home/home.html'
})
export class Home {
    news_block: String

    constructor(http: Http) {
      http.get("https://www.kth.se/cm/1.314503")
        .subscribe(res => this.news_block = res.text())
    }
}
