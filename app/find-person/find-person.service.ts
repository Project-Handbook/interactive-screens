import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()

export class FindPersonService{

	constructor(private _http:Http){}

	answer: Array<Object>=[];

	getPeople(term: string): Array<Object> {
		var url = "https://www.lan.kth.se/personal/api/katalogjson?q=";
		this._http.get(url + term)
			.map(res=> res.json())
			.subscribe(res=> {
				res.result.forEach(item=> { this.answer.push(item) })
			},
				error=> console.log(error),
				() => console.log('OK People')
			)
		return this.answer;
	}
}