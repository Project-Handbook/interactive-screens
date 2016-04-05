import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Person} from './person-interface';
@Injectable()

export class FindPersonService{

	constructor(private _http:Http){}

	answer: Array<Person>=[];
	images: Array<string>=[];

	getPeople(term: string): Array<Person> {
		this.answer = [];
		var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
		this._http.get(url + term)
			.map(res=> res.json())
			.subscribe(res=> {
				var index = 0;
				res.result.forEach(item=> {
					this.answer.push(
						{
							given_name:item.given_name,
							family_name:item.family_name,
							email_adress:item.email_adress,
							kthid:item.kthid,
							phone_number:item.phonehr,
							visiting_adress:item.visiting_adress,
							username:item.username,
							title:item.title_sv,
						}
					);
					this.getImage(item, index++);
				})
			},
				error=> console.log(error),
				() => {
					console.log('OK People');
				}
			);
		return this.answer;
	}
	getImage(a : Object, index : number) {
		var url = "https://www.kth.se/social/api/profile/1.1/" + a.kthid + "/image";
		this._http.get(url).map(res=> res.text()).subscribe(
			data => {
				a.image = data.substr(1, data.length - 2);
				this.images[index] = a.image;
			},
			error => console.log(error),
			() => {
				// console.log('OK Images');
			}
		);
	}
	getImages() : Array<string> {
		return this.images;
	}
}