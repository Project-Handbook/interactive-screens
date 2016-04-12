import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import { Person } from './person';

@Injectable()
export class FindPersonService{

	constructor(private http: Http) {}

	// Fetches all the people matching the searchterm from KTH Profiles
	fetchPeople(searchterm: string): Array<Person> {
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
						item.image_url
					);
					this.fetchImage(person);
					people.push(person);
				})
			},
				error=> console.log(error),
				() => {}
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
}
