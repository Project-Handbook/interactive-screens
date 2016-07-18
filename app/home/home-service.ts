import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService{
	// Polypoly URL
	url: string = "https://www.kth.se/cm/";

	constructor(private http: Http) {}

	/* Fetches the calendar block associated with the given id string
		 Returns observable that has to be subscribed in order to retrieve the data */
	getCalendar(id) {
		var calendar_polopoly_id = id;
		return this.http.get(this.url + calendar_polopoly_id)
			.map(res=>res.text());
	}

	/* Fetches the calendar news feed block associated with the given id string
		 Returns observable that has to be subscribed in order to retrieve the data */
	getNewsFeed(id): Observable<JQuery> {
		var news_polopoly_id = id;
		return this.http.get(this.url + news_polopoly_id)
			.map(res => res.text())
			// Res contains a block of HTML
			.map(res => {
				// Add https://kth.se infront of every image url
				var regex = new RegExp("/polopoly_fs/1.+/image/.+\.(jpg|png)","g");
				var image_urls = res.match(regex);
				image_urls.forEach(image => {
					res = res.replace(image,"https://www.kth.se" + image);
				})
				// The news events are contained in the blockItem div class.
				var blocks = jQuery(res).find(".blockItem");
				// Returns a list of news events
				return blocks;
		});
	}
}
