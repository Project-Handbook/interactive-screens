import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
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
export class FindPersonService{

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
						undefined /* Need to fetch working place */
					);
					this.fetchImage(person);
					this.fetchWorkingPlace(person);
					people.push(person);
				})
			},
				error => onError(ErrorType.NoInternetConnection),
				() => onError(ErrorType.NoError)
			);
		return people;
	}

	// Fetches the persons image url from the API asscioated their kth id
	private fetchImage(person: Person) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid + "/image";
		this.http.get(url)
			.map(res => res.text())
			.subscribe(image_url => {
				person.image_url = image_url.substr(1, image_url.length - 2);
			},
			error => console.log(error),
			() => {}
		);
	}

	// Fetches the persons working place from the KTH Profile API
	private fetchWorkingPlace(person: Person) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid;
		this.http.get(url)
			.map(res => res.json())
			.subscribe(person_info => {
				person.working_place = person_info.worksFor[0].name;
			},
			error => console.log(error),
			() => {}
		);
	}
}
