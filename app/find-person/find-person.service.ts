import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import { Person } from './person';

@Injectable()
export class FindPersonService{
	constructor(private http: Http) {}
	// Fetches all the people matching the searchterm from KTH Profiles
	fetchPeople(searchterm: string): Array<Person> {
		var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
		return this.http.get(url + searchterm)
			.map(res => res.json())
			
	}
	// Fetches the persons image url from the API asscioated their kth id
	private fetchImage(person: Person) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + person.kthid + "/image";
		return this.http.get(url)
			.map(res => res.text())
	}
}
