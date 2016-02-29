import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()

export class FindPersonService{

	constructor(private _http:Http){}

	answer: Array<Object>=[];
	images: Array<string>=[];

	getPeople(term: string): Array<Object> {
		this.answer = [];
		var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
		this._http.get(url + term)
			.map(res=> res.json())
			.subscribe(res=> {
				var index = 0;
				res.result.forEach(item=> {
					this.answer.push(item);
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