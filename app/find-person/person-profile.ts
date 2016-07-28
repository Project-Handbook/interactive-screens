import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core'
import { NgClass } from '@angular/common';
import { FindPersonService } from './find-person.service';
import { Person } from './person';
import { Router } from '@angular/router';

@Component({
  selector: 'person-profile',
  templateUrl:'./person-profile.html',
  directives: [NgClass],
  providers: [FindPersonService],
  styles:[require('./find-person.scss').toString()]

})
export class PersonProfile {
	@Input() person;
  @Input() isOn;

  	constructor(private findPersonService: FindPersonService,private router:Router) {}

  	// Makes a Persons title lowercase instead of KTH standard ALL CAPS.
  	getTitle(title: string): string {
  		if(title != undefined) {
    		return title.charAt(0) + title.substr(1).toLowerCase();
    	}
  	}
    navigate(){
      this.router.navigate(['/map'],
      {queryParams:
        {
          givenName:this.person.given_name,
          familyName:this.person.family_name,
          address:this.person.visiting_address,
          room:this.person.roo
        }
      });
    }
}
