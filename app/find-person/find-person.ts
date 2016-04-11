import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core'
import { NgClass } from 'angular2/common';
import { FindPersonService } from './find-person.service';
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
  //Boolean for displaying error message if a search request would fail for any reason
  showErrorMessage:boolean=false;

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

  //Fetches people matching the given search string
  getPeople(searchterm: string) {
    this.people=[];
    this.findPersonService.fetchPeople(searchterm)
      .subscribe(res => {
        res.result.forEach(item => {
          var person = new Person(
            item.given_name,
            item.family_name,
            item.email_address,
            item.kthid,
            item.phonehr,
            item.visiting_adress,
            item.username,
            item.title_sv,
            item.image_url
          );
          this.fetchImage(person),
          this.people.push(person);
        })
      },
        error=> this.showErrorMessage=true,
        () => {this.showErrorMessage=false}
      );

  }
  //Fetches the associated image for every person fetched by getPeople
  private fetchImage(person: Person) {
    this.findPersonService.fetchImage(person)
      .subscribe(image_url => {
        person.image_url = image_url.substr(1, image_url.length - 2);
      },
      error => console.log(error),
      () => {}
    );
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
