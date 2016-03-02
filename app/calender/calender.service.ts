import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {CalenderEvent} from './calender-event.interface';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'ng2-google-maps/core';

@Injectable()

export class CalenderService {
	answer: Array<CalenderEvent> = [];
	eventInfo: CalenderEvent;

	constructor(private _http: Http) { }
	//Fetches the current events from csc service centers calender and returns each calender event as an object
	getCalender(): Array<CalenderEvent> {
		this.eventInfo = { "date_published": "", "summary": "", "description": "", "location": "", "start": "", "end": "" };
		var url = "https://www.kth.se/csc/aktuellt/kalender?v=iCal&c=all";
		this._http.get(url)
			.map(res=> res)
			.subscribe(res=> {
				console.log(res);
				var y = res._body.replace(/(\s\s\s|\\n)/g, "");	
				y = y.replace(/\\,/g, ",");
				//var y = res._body.split('');
				//y.forEach(function(entry) {
				//	 console.log(entry);
				//});
				console.log(y);
				var myregex = new RegExp("BEGIN:VEVENT");
				var events = y.split(myregex);
				events.splice(0, 1); //Remove first item in list becuase it is not a an event.
				events.forEach(item=> {
					this.eventInfo = { "date_published": "", "summary": "", "description": "", "location": "", "start": "", "end": "" };

					myregex = new RegExp("(DTSTAMP:|SUMMARY:|DESCRIPTION:|LOCATION:|"
						+ "DTSTART;TZID=|DTEND;TZID=|UID:|TZID:)");
					var calenderEvent = item.split(myregex);
					//	console.log(calenderEvent);

					calenderEvent.splice(0, 1);
					//console.log(calenderEvent);
					//console.log(calenderEvent.length);
					for (var i = 0; i < calenderEvent.length; i++) {
						var n = calenderEvent.splice(0, 1);
						//console.log(n);

						switch (String(n)) {
							case "DTSTAMP:":
								this.eventInfo.date_published = String(calenderEvent.splice(0, 1));
								break;
							case "SUMMARY:":
								this.eventInfo.summary = String(calenderEvent.splice(0, 1));
								break;

							case "DESCRIPTION:":
								this.eventInfo.description = String(calenderEvent.splice(0, 1));
								break;

							case "LOCATION:":
								this.eventInfo.location = String(calenderEvent.splice(0, 1));
								break;

							case "DTSTART;TZID=":
								var x = String(calenderEvent.splice(0, 1)).split('T');
								var y = x[0].split(':');
								this.eventInfo.start = y[1] + " - " + x[1];
								break;

							case "DTEND;TZID=":
								var x = String(calenderEvent.splice(0, 1)).split('T');
								var y = x[0].split(':');
								this.eventInfo.end = y[1] + " - " + x[1];
								break;
							default:
								console.log("not found");

						}
					}
					console.log(this.eventInfo)
					this.answer.push(this.eventInfo);
				})
			},

			error=> console.log(error),
			() => console.log('OK Calender')
			)


		return this.answer;
	}

}