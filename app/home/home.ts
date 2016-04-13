import { Component } from 'angular2/core';
import { CalenderComponent } from '../calender/calender.component';
import { Http } from 'angular2/http';

@Component({
  selector: 'home',
  template: `
  <h1>Home component here</h1>
  <calender></calender>
  `,
  directives:[CalenderComponent]
})
export class Home {
    private base_polopoly_url = "https://www.kth.se/cm/"

    private calendar_polopoly_id = "1.231565"
    private news_polopoly_id = "1.314503"

    /**
    * Description to be added
    * @property {String} news_block
    */
    news_block: String

    /**
    * Description to be added
    * @property {String} news_block
    */
    calendar_block: String

    constructor(http: Http) {
      http.get(this.base_polopoly_url + this.news_polopoly_id)
        .subscribe(res => this.news_block = res.text())

      http.get(this.base_polopoly_url + this.calendar_polopoly_id)
        .subscribe(res => this.calendar_block = res.text())
    }
}
