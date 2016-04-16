import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core'
import { NgClass } from 'angular2/common';
import { FindPersonService, ErrorType } from './find-person.service';
import { Person } from './person';
import { PersonProfile } from './person-profile';

@Component({
  selector: 'find-person',
  templateUrl: 'app/find-person/find-person.html',
  directives: [NgClass, PersonProfile],
  providers: [FindPersonService]
})
export class FindPerson {

  currentPerson: Person;
  // Default search values
  organisation: string = "org:DAS";
  orgName: string = "CSC";
  currentSearch: string = "";

  // Displaying error message if a search request would fail for any reason
  showErrorMessage: boolean = false;

  isOn = false;
  isDisabled = false;

  toggle(newState, person: Person) {
    this.currentPerson = person;
    if (!this.isDisabled) {
      	this.isOn = newState;
    }
  }
  people: Array<Person> = []; // Holds all the persons fetched from the API
  constructor(private findPersonService: FindPersonService) {}

  // This is called whenever an event that might fail occurs.
  // Ex) Internet/API is down.
  onError = (errorType: ErrorType) => {
    switch (errorType) {
      case ErrorType.NoError:
        this.showErrorMessage = false;
        break;
      default:
        this.showErrorMessage = true;
    }
  }

  getPeople(searchterm: string) {
    this.people = this.findPersonService.fetchPeople(searchterm, this.onError);
  }

  // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
  getTitle(title: string): string {
    return title.charAt(0) + title.substr(1).toLowerCase();
  }

  //Displays people local to the department as default when the people tab is pushed.
  ngOnInit(): any {
    this.getPeople(this.organisation);
  }

  search(input: string) {
    if(input == undefined) {
      this.getPeople(this.organisation);
      this.currentSearch = "";
    }
    else if(input.trim().length == 0) {
      this.getPeople(this.organisation);
      this.currentSearch = "";
    }
    else {
      input = input.trim();
      this.currentSearch = "\"" + input + "\"";
      this.getPeople(input);
    }
  }


}
