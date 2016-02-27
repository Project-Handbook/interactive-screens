import{Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {CalenderEvent} from './calender-event.interface';

@Injectable()

export class CalenderService{
	answer: Array<CalenderEvent>=[];

	constructor(private _http:Http){}
	//Fetches the current events from csc service centers calender and returns each calender event as an object
	getCalender(): Array<CalenderEvent> {
		var eventInfo: CalenderEvent;
		var url = "https://www.kth.se/csc/aktuellt/kalender?v=iCal&c=all";
		this._http.get(url)
			.map(res=> res)
			.subscribe(res=> {
				console.log(res);
				var myregex = new RegExp("\r\nBEGIN:VEVENT");
				var events = res._body.split(myregex);
				events.splice(0, 1); //Remove first item in list becuase it is not a an event.
				events.forEach(item=> {
					myregex = new RegExp("\r\nDTSTAMP:|\r\nSUMMARY:|\r\nDESCRIPTION:|\r\nLOCATION:|"
											+	"\r\nDTSTART;TZID=|\r\nDTEND;TZID=|\r\nUID:|\r\nTZID:");
					var calenderEvent = item.split(myregex);
					calenderEvent.splice(0, 1);
					eventInfo = {
						"date_published":calenderEvent[0],
						"summary": 		calenderEvent[1],
						"description": 	calenderEvent[2],
						"location": 	calenderEvent[3],
						"start": 		calenderEvent[4],
						"end": 			calenderEvent[5],
						"id1": 			calenderEvent[6],
						"id2": 			calenderEvent[7]
					};
					console.log(eventInfo);
					this.answer.push(eventInfo);
				})
			},
			error=> console.log(error),
			() => console.log('OK Calender')
			)
		return this.answer;
	}

}


