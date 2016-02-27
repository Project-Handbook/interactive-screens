import { Component } from 'angular2/core';
import {FindPersonService} from './find-person.service';

@Component({
  selector: 'find-person',
  template: `
  	<h3>Find Person</h3>
    <input type="text" [(ngModel)]="term" placeholder="Search"><br>
    <button (click)="getPeople(term)">Get People</button>
    <div>
	    <table *ngFor="#person of people" border="1" >
	    <tr>
	    	<td>{{person.given_name}}</td>
	    	<td>{{person.family_name}}</td>
	    	<td>{{person.phonehr}}</td>
	    	<td>{{person.email_address}}</td>
	    	<td>{{person.visiting_address}}</td>
	    </tr>	
	    </table>
	</div> 
  `,
  providers:[FindPersonService],
})


/*
	FindPerson returns an Object with the following parameters:

	anm_telefonkatalog_hr: string
	email_address: string
	family_name: string
	fax: string
	given_name: string
	kthid: string
	org: Array of strings
	phonehr: string
	title_sv: string
	username: string
	visiting_address: string

	ex:

	anm_telefonkatalog_hr: null
	email_address: "dah@pdc.kth.se"
	family_name: "Ahlin"
	fax: null
	given_name: "Daniel"
	kthid: "u132j84z"
	org: Array[1]
	phonehr: "087906844"
	title_sv: "TEKNISK CHEF"
	username: "dah"
	visiting_address: "TEKNIKRINGEN 14"

*/
export class FindPerson {
	people: Array<Object>=[];
	constructor(private _findPersonService:FindPersonService){}
	getPeople(term:string){
		console.log(this.people);
		this.people = [];
		this.people = this._findPersonService.getPeople(term);
	}
}
