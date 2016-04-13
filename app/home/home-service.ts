import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()

export class HomeService{

	url: string = "https://www.kth.se/cm/";


	constructor(private _http:Http){}
	getCalendar(){
		var calendar_polopoly_id = "1.467916";
		return this._http.get(this.url + calendar_polopoly_id).map(res=>res.text());
	}

	getNewsFeed(){
		var news_polopoly_id = "1.640551"
		return this._http.get(this.url + news_polopoly_id).map(res => res.text());
	}

}