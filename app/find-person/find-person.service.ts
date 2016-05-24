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
						undefined, /* Need to scrape the 'about me' section */
						undefined,
						undefined,
						undefined,
						undefined
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

	// Fetches all the people matching the searchterm from KTH Profiles
	// This function will also make sure they are from a certain department
	// This function makes two calls to the same API, once based on the name
	// and once based on the department, it then compares the results and returns
	// the shared elements.
	// NOTE: Due to lack of time this function makes an extra unnecessary call
	// and fetches the image-link for every person a second time.
	fetchPeople2(searchterm: string, prefix: string, onError: ErrorCallback): Array<Person> {
		var people = [];
		var peopleAlsoInDep = [];
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
						undefined, /* Need to scrape the 'about me' section */
						undefined,
						undefined,
						undefined,
						undefined
					);
					this.fetchAdditionalInfo(person); // Profile info is divided into two APIs.
					people.push(person);
				})
			},
				error => onError(ErrorType.NoInternetConnection),
				() => {

					// We've fetched all persons based on the search-string.
					// Let's fetch all persons based on the department and
					// then compare the results.

					if(prefix == "org:KTH") {
						people.forEach(item => {
							peopleAlsoInDep.push(item);
						});
					} else {
						this.http.get(url + prefix)
							.map(res => res.json())
							.subscribe(res => {
								res.result.forEach(item => {
									if(people.some(function(e) { return e.kthid == item.kthid })) {
										// Person was also found in the department, add to list
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
											undefined, /* Need to scrape the 'about me' section */
											undefined,
											undefined,
											undefined,
											undefined
										);
										this.fetchAdditionalInfo(person); // Profile info is divided into two APIs.
										peopleAlsoInDep.push(person);
									}
								})
							},
								error => onError(ErrorType.NoInternetConnection),
								() => {
									onError(ErrorType.NoError);
								}
							);
					}

					onError(ErrorType.NoError);
				}
			);
		return peopleAlsoInDep;
	}

	// Fetches the persons image url from the API asscioated their kth id
	public fetchAdditionalInfo(person: Person) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid;
		this.http.get(url)
			.map(res => res.json())
			.subscribe(item => {
				person.image_url = item.image;
				person.working_place = item.worksFor[0].name;
				person.kth_profile = item.url;
				this.fetchAboutMeInfo(person);
				this.fetchStatus(person);
				this.fetchPersonalDetails(person);
			},
			error => null,
			() => {}
		);
	}

	// Scrapes the Person's KTH profile 'About me' section from the internet.
	private fetchAboutMeInfo(person: Person) {
		this.http.get(person.kth_profile).subscribe(resp => {
			var body = resp.text();
			var patt = new RegExp("<img.+>");
			body = body.replace(patt, ""); //Removes all img tags from body because this the img tags genereted a lot of errors in jquery .find.
			var about_me = jQuery(body).find(".description").text();
			person.about_me = about_me;
		},
		error => null)
	}

	// Fetches the availibility of employees
	private fetchStatus(person: Person) {
		var url = "https://www.lan.kth.se/mobile/api/katalogjson?q=kthid:";
		this.http.get(url + person.kthid)
			.map(res => res.json())
			.subscribe(res => {
				if(res.result[0].intercepts !== undefined) {
					if(res.result[0].intercepts.length === 0) {
						person.status_image = "https://www.lan.kth.se/sip/lur15.png";
					} else {
						person.status_image = "https://www.lan.kth.se/sip/lur14.png";
						person.status_info = res.result[0].intercepts[0];
					}
				} else {
					person.status_image = null;
				}
			}, error => null)
	}

	// Fetches employee room number and phone number from KTH Places personal details API.
	private fetchPersonalDetails(person: Person) {
		var url = "https://www.lan.kth.se/personal/api/personaldetails?kthid=";
		this.http.get(url + person.kthid)
			.map(res => res.json())
			.subscribe(res => {
			if(res.result[0].result[0] !== undefined){
				person.phone_number2 = res.result[0].result[0].telno;
				person.room = res.result[0].result[0].room;
			}
		}, error => null)
	}
}
