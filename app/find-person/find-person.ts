import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core'
import { NgClass } from 'angular2/common';
import { NgStyle } from 'angular2/common';
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

  state: string = "none";

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
    if (input == undefined) {
      this.getPeople(this.organisation);
      this.currentSearch = "";
    } else if (input.trim().length == 0) {
      this.getPeople(this.organisation);
      this.currentSearch = "";
    } else {
      input = input.trim();
      this.currentSearch = "\"" + input + "\"";
      this.getPeople(input);
    }
  }

  rotation: string = "rotate(90deg)";
  previous: string = "surname";

  sort(input) {
    var element = this.getElement(input);

    if (this.previous != input) {
      var prev = this.getElement(this.previous);
      prev.style.transform = "rotate(90deg)";
      prev.style.display = "none";
      element.style.display = "block";
      element.style.transform = "rotate(90deg)";
      this.previous = input;
      this.rotation = "rotate(90deg)";
    } else {
      element.style.transform = this.rotation;
      this.rotation = this.rotation == "rotate(-90deg)" ? "rotate(90deg)" : "rotate(-90deg)";
    }

    element.style.transform = this.rotation;

    var rotation = this.rotation;
    this.people.sort(function(a, b) {
      if(input == "firstname") {
          if(a.given_name < b.given_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.given_name > b.given_name) return rotation == "rotate(90deg)" ? 1 : -1;

          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
      else if(input == "surname") {
          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
      else if(input == "email") {
          if(a.email < b.email) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.email > b.email) return rotation == "rotate(90deg)" ? 1 : -1;

          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
      else if(input == "phone") {
          if(a.phone_number < b.phone_number) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.phone_number > b.phone_number) return rotation == "rotate(90deg)" ? 1 : -1;

          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
      else if(input == "title") {
          if(a.title < b.title) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.title > b.title) return rotation == "rotate(90deg)" ? 1 : -1;

          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
    });
  }

  getElement(input) {
    var element;
    if(input == "firstname") {
      element = document.getElementById("firstname");
    }
    else if(input == "surname") {
      element = document.getElementById("surname");;
    }
    else if(input == "email") {
      element = document.getElementById("email");
    }
    else if(input == "phone") {
      element = document.getElementById("phone");
    }
    else if(input == "title") {
      element = document.getElementById("title");
    }
    return element;
  }
}
