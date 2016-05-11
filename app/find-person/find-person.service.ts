import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Person } from './person';

// ErrorType describes what kind of error has occured
export enum ErrorType {
	NoError, NoResults, NoInternetConnection
}

// Defines a interface to a generic error callback to be passed to functions
// which may fail or produce a error that we support via the ErrorType interface
export interface ErrorCallback {
	(errorType: ErrorType): void;
}

@Injectable()
export class FindPersonService {

	constructor(private http: Http) {}

	// Fetches all the people matching the searchterm from KTH Profiles
	fetchPeople(searchterm: string, onError: ErrorCallback): Array<Person> {
		var people = [];
		var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
		this.http.get(url + searchterm)
			.map(res => res.json())
			.subscribe(res => {
				res.result.forEach(item => {
					var person = new Person(
						item.given_name,
						item.family_name,
						item.email_address,
						item.kthid,
						item.phonehr,
						item.visiting_address,
						item.username,
						item.title_sv,
						undefined,	/* Need to fetch the image url */
						undefined, /* Need to fetch working place */
						undefined, /* Need to fetch kth profile */
						undefined /* Need to scrape the 'about me' section */
					);
					this.fetchAdditionalInfo(person); // Profile info is divided into two APIs.
					people.push(person);
				})
			},
				error => onError(ErrorType.NoInternetConnection),
				() => onError(ErrorType.NoError)
			);
		return people;
	}

	// Fetches the persons image url from the API asscioated their kth id
	private fetchAdditionalInfo(person: Person) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid;
		this.http.get(url)
			.map(res => res.json())
			.subscribe(item => {
				person.image_url = item.image;
				person.working_place = item.worksFor[0].name;
				person.kth_profile = item.url;
				this.fetchAboutMeInfo(person);
			},
			error => console.log(error),
			() => {}
		);
	}

	// Scrapes the Person's KTH profile 'About me' section from the internet.
	private fetchAboutMeInfo(person: Person) {
		this.http.get(person.kth_profile).subscribe(resp => {
			var body = resp.text();
			var about_me = jQuery(body).find(".description").text();
			person.about_me = about_me;
		})
	}
}
