import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import { Person } from './person';

@Injectable()
export class FindPersonService {
	constructor(private http: Http) {}
	// Fetches all the people matching the searchterm from KTH Profiles
	fetchPeople(searchterm: string) {
		var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
		return this.http.get(url + searchterm)
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
				error=> console.log(error),
				() => {}
			);
		return people;
	}
}
	// Fetches the persons image url from the API asscioated their kth id
	fetchAdditionalInfo(person: Person) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid;
		return this.http.get(url)
			.map(res => res.json())
	}
}
