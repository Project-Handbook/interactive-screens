import { Injectable } from 'angular2/core';
import { Http }       from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService{

	url: string = "https://www.kth.se/cm/";

	constructor(private http: Http){}

	getCalendar() {
		let calendar_polopoly_id = "1.467916";
		return this.http.get(this.url + calendar_polopoly_id).map(res => res.text());
	}

	getNewsFeed() {
		let news_polopoly_id = "1.640551"
		return this.http.get(this.url + news_polopoly_id)
			.map(res => res.text())
			.map(res => {
				var result = []
				var regex = new RegExp('<article>');
			 	result = res.split(regex);
				regex = new RegExp('<footer>');
				result = result[1].split(regex);
				regex = new RegExp("/polopoly_fs/1.+/image/.+\.(jpg|png)","g");
				var image_urls = result[0].match(regex);
				image_urls.forEach(image => {
				result[0] = result[0].replace(image,"https://www.kth.se" + image);
			  })
				return result[0];
			});
	}
}
