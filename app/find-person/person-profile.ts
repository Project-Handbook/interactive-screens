import { Component, Input } from 'angular2/core';
import { OnInit } from 'angular2/core'
import { NgClass } from 'angular2/common';
import { FindPersonService } from './find-person.service';
import { Person } from './person';
import { RouterLink } from 'angular2/router';

@Component({
  selector: 'person-profile',
  templateUrl: 'app/find-person/person-profile.html',
  directives: [NgClass, RouterLink],
  providers: [FindPersonService]
})
export class PersonProfile {
	@Input() person;
  @Input() isOn;

  	constructor(private findPersonService: FindPersonService) {}

  	// Makes a Persons title lowercase instead of KTH standard ALL CAPS.
  	getTitle(title: string): string {
  		if(title != undefined) {
    		return title.charAt(0) + title.substr(1).toLowerCase();
    	}
  	}	
}