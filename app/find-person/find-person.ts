import { Component, EventEmitter } from 'angular2/core';
import { OnInit } from 'angular2/core'
import { NgClass } from 'angular2/common';
import { NgStyle } from 'angular2/common';
import { FindPersonService, ErrorType } from './find-person.service';
import { Person } from './person';
import { PersonProfile } from './person-profile';

@Component({
  host: {
        '(document:click)': 'handleClick($event)',
  },
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
    this.getSchools();
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

  rotation: string = "rotate(90deg)";
  previous: string = "surname";

  sort(input) {
    var element = this.getElement(input);

    if(this.previous != input) {
      var prev = this.getElement(this.previous);
      prev.style.transform = "rotate(90deg)";
      prev.style.display = "none";
      element.style.display = "block";
      element.style.transform = "rotate(90deg)";
      this.previous = input;
      this.rotation = "rotate(90deg)";
    }
    else {
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

  scrollDep(dir) {
    var newScroll = departments.scrollTop + (departments.offsetHeight-55)*dir;

    console.log(newScroll);
    this.scrollTo(departments, newScroll, 5000);
  }

  scrollTo(element, to, duration) {
    $("#departments").animate({
            scrollTop: to
        }, 300);
        return false;
  }

  //This funtion determines if the user clicks outside the dropdown menu. If this is the case
    // the searchresult array will be cleared and the dropdown will disappear.
    handleClick(event){
      var clickedComponent = event.target;
      var schools = document.getElementById("schools");
      var inside = false;
      do {
         if (clickedComponent === schools
            || clickedComponent === departments_wrapper) {
            inside = true;
          }
         clickedComponent = clickedComponent.parentNode;
      }while (clickedComponent);
      if(!inside){
        schools.style.display = "none";
        this.deps = [];
      }
    }

  deps : Array<any> = [];
  schools : Array<any> = [];

  toggleSchools() {
    console.log('hello');
    var schools = document.getElementById("schools");
    if(schools.style.display == "block")
      schools.style.display = "none";
    else
      schools.style.display = "block";
  }

  getSchools() {
    $("#schools").on("click", function(event){
      event.stopPropagation();
      console.log( "I was clicked, but my parent will not be." );
    });

    this.schools[0] = "KTH";
    this.schools[1] = "ABC";
    this.schools[2] = "BIO";
    this.schools[3] = "CSC";
    this.schools[4] = "EES";
    this.schools[5] = "STH";
    this.schools[6] = "ICT";
    this.schools[7] = "CHE";
    this.schools[8] = "ECE";
    this.schools[9] = "ITM";
    this.schools[10] = "KHD";
    this.schools[11] = "UF";
  }

  getDep() {

    this.deps[0] = "FYSIOKEMISK STRÖMNINGSMEKANIK";
    this.deps[1] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[2] = "MEKANIK, MIHAESCU";
    this.deps[3] = "TEORETISK FYSIK";
    this.deps[4] = "TILLÄMPAD FYSIK GEM";
    this.deps[5] = "CELLENS FYSIK";
    this.deps[6] = "KVANTOPTIK";
    this.deps[7] = "NANOSTRUKTURFYSIK";
    this.deps[8] = "TILLÄMPAD FYSIK";
    this.deps[9] = "TILLÄMPAD FYSIK";
    this.deps[10] = "TILLÄMPAD FYSIK";
    this.deps[11] = "TILLÄMPAD FYSIK";
    this.deps[12] = "TILLÄMPAD FYSIK";
    this.deps[13] = "TILLÄMPAD FYSIK";
    this.deps[14] = "TILLÄMPAD FYSIK";
    this.deps[15] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[16] = "MEKANIK, MIHAESCU";
    this.deps[17] = "TEORETISK FYSIK";
    this.deps[18] = "TILLÄMPAD FYSIK GEM";
    this.deps[19] = "CELLENS FYSIK";
    this.deps[20] = "CELLENS FYSIK";
    this.deps[21] = "KVANTOPTIK";
    this.deps[22] = "NANOSTRUKTURFYSIK";
    this.deps[23] = "TILLÄMPAD FYSIK";
    this.deps[24] = "TILLÄMPAD FYSIK";
    this.deps[25] = "TILLÄMPAD FYSIK";
    this.deps[26] = "TILLÄMPAD FYSIK";
    this.deps[27] = "TILLÄMPAD FYSIK";
    this.deps[28] = "TILLÄMPAD FYSIK";
    this.deps[29] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[30] = "MEKANIK, MIHAESCU";
    this.deps[31] = "TEORETISK FYSIK";
    this.deps[32] = "TILLÄMPAD FYSIK GEM";
    this.deps[33] = "CELLENS FYSIK";
    this.deps[34] = "KVANTOPTIK";
    this.deps[35] = "NANOSTRUKTURFYSIK";
    this.deps[36] = "TILLÄMPAD FYSIK";
    this.deps[37] = "TILLÄMPAD FYSIK";
    this.deps[38] = "TILLÄMPAD FYSIK";
    this.deps[39] = "TILLÄMPAD FYSIK";
    this.deps[40] = "TILLÄMPAD FYSIK";
    this.deps[41] = "TILLÄMPAD FYSIK";
    this.deps[42] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[43] = "MEKANIK, MIHAESCU";
    this.deps[44] = "TEORETISK FYSIK";
    this.deps[45] = "TILLÄMPAD FYSIK GEM";
    this.deps[46] = "CELLENS FYSIK";
    this.deps[47] = "KVANTOPTIK";
    this.deps[48] = "NANOSTRUKTURFYSIK";
    this.deps[49] = "TILLÄMPAD FYSIK";
    this.deps[50] = "TILLÄMPAD FYSIK";
    this.deps[51] = "TILLÄMPAD FYSIK";
    this.deps[52] = "TILLÄMPAD FYSIK";
    this.deps[53] = "TILLÄMPAD FYSIK";
    this.deps[54] = "TILLÄMPAD FYSIK";
    this.deps[55] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[56] = "MEKANIK, MIHAESCU";
    this.deps[57] = "TEORETISK FYSIK";
    this.deps[58] = "TILLÄMPAD FYSIK GEM";
    this.deps[59] = "CELLENS FYSIK";
    this.deps[60] = "KVANTOPTIK";
    this.deps[61] = "NANOSTRUKTURFYSIK";
    this.deps[62] = "TILLÄMPAD FYSIK";
    this.deps[63] = "TILLÄMPAD FYSIK";
    this.deps[64] = "TILLÄMPAD FYSIK";
    this.deps[65] = "TILLÄMPAD FYSIK";
    this.deps[66] = "TILLÄMPAD FYSIK";
    this.deps[67] = "TILLÄMPAD FYSIK";
    this.deps[68] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[69] = "MEKANIK, MIHAESCU";
    this.deps[71] = "TEORETISK FYSIK";
    this.deps[72] = "TILLÄMPAD FYSIK GEM";
    this.deps[73] = "CELLENS FYSIK";
    this.deps[74] = "KVANTOPTIK";
    this.deps[75] = "NANOSTRUKTURFYSIK";
    this.deps[76] = "TILLÄMPAD FYSIK";
    this.deps[77] = "TILLÄMPAD FYSIK";
    this.deps[78] = "TILLÄMPAD FYSIK";
    this.deps[79] = "TILLÄMPAD FYSIK";
    this.deps[80] = "TILLÄMPAD FYSIK";
    this.deps[81] = "TILLÄMPAD FYSIK";
    this.deps[82] = "FYSIOKEMISK STRÖMNINGSMEKANIK FYSIOKEMISK STRÖMNINGSMEKANIK AAAA";
    this.deps[83] = "MEKANIK, MIHAESCU";
    this.deps[84] = "TEORETISK FYSIK";
    this.deps[85] = "TILLÄMPAD FYSIK GEM";
    this.deps[86] = "CELLENS FYSIK";
    this.deps[87] = "KVANTOPTIK";
    this.deps[88] = "KVANTOPTIK";
    this.deps[89] = "NANOSTRUKTURFYSIK";
    this.deps[90] = "TILLÄMPAD FYSIK";
    this.deps[91] = "TILLÄMPAD FYSIK";
    this.deps[92] = "TILLÄMPAD FYSIK";
    this.deps[93] = "TILLÄMPAD FYSIK";
    this.deps[94] = "TILLÄMPAD FYSIK";
    this.deps[95] = "TILLÄMPAD FYSIK";
  }
}
