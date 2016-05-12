import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { FindPersonService, ErrorType } from './find-person.service';
import { Person } from './person';
import { PersonProfile } from './person-profile';
import { MapService } from '../map/services/map-service';
import {ScreenSpecificInformation} from '../screen-specific-information';
import {Constants} from '../constants';

@Component({
  host: {
        '(document:click)': 'handleClick($event)',
  },
  selector: 'find-person',
  templateUrl: 'app/find-person/find-person.html',
  directives: [NgClass, PersonProfile],
  providers: [FindPersonService, MapService]
})
export class FindPerson {



  state: string = "none";

  currentPerson: Person = null;
  // Default search values
  currentSearch: string = "";
  currentPrefix: string = "org:DAS";
  selectedSchool: string = "CSC Staben";
  currentSchool: string = "CSC Staben";

  // Displaying error message if a search request would fail for any reason
  showErrorMessage: boolean = false;

  isOn = false;

  people: Array<Person> = []; // Holds all the persons fetched from the API
  constructor(private findPersonService: FindPersonService, private _mapService: MapService) {}

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

  // This will find all people within the standard department
  getPeople(searchterm: string) {
    this.people = this.findPersonService.fetchPeople(searchterm, this.onError);
  }

  // This will find all people within the chosen department
  getPeople2(searchterm: string) {
    this.people = this.findPersonService.fetchPeople2(searchterm, this.currentPrefix, this.onError);
  }

  // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
  getTitle(title: string): string {
    return title.charAt(0) + title.substr(1).toLowerCase();
  }

  //Displays people local to the department as default when the people tab is pushed.
  ngOnInit(): any {
    this.getPeople(this.currentPrefix);
    this.getSchools();
    var screenInfo = new ScreenSpecificInformation();
    screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
    console.log("hej");
    console.log(screenInfo.department_code);
    console.log(screenInfo.title);
  }

  search(input: string) {
    this.currentSchool = this.selectedSchool;
    if(input == undefined) {
      this.getPeople(this.currentPrefix);
      this.currentSearch = "";
    }
    else if(input.trim().length == 0) {
      this.getPeople(this.currentPrefix);
      this.currentSearch = "";
    } else {
      input = input.trim();
      this.currentSearch = "\"" + input + "\"";
      this.getPeople2(input);
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

  scrollDep(dir) {
    var departments = document.getElementById("departments");
    var newScroll = departments.scrollTop + (departments.offsetHeight-55)*dir;
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
      this.handleClickForPopup(event);
      var clickedComponent = event.target;
      var schoolsDiv = document.getElementById('schools-wrapper');
      var schoolsBtn = document.getElementById('person-search-schools');
      do {
          if (clickedComponent === schoolsBtn) {
            this.toggleSchools();
            return;
          }
          if (clickedComponent === schoolsDiv) {
            return;
          }
         clickedComponent = clickedComponent.parentNode;
      }while (clickedComponent);

      schoolsDiv.style.display = "none";
      this.deps = [];
    }

  handleClickForPopup(event) {
      var clickedComponent = event.target;
      var popupContent = document.getElementById('popup-content');
      var personTable = document.getElementById('person-table-body');

      do {
         if (clickedComponent === personTable) {
            this.isOn = true;
            return;
          }
         if (clickedComponent === popupContent) {
            return;
          }
         clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);

      this.isOn = false;
  }

  deps : Array<any> = [];
  schools : Array<any> = [];

  toggleSchools() {
    var w = document.getElementById('schools-wrapper');
    w.style.display = w.style.display == "table" ? "none" : "table";
    this.deps = [];
  }

  getSchools() {
    this.schools = [];
    this._mapService.getSchools().subscribe( res=> {
      this.schools=res;

      // Add KTH as the first element should one just want
      // to search with that

      var code = "code";
      var school = "school";
      var a = {};
      a[code] = "";
      a[school] = "KTH";

      this.schools.unshift(a);
    });
  }

  getDep(item) {
    if(item.school == "KTH") {
      // We want to search all of KTH
      var code = "code";
      var name = "name_sv";
      var a = {};
      a[code] = "KTH";
      a[name] = "KTH";
      this.setDep(a);
      return;
    }

    this.deps = [];
    this._mapService.getDepartments(item.code).subscribe( res=> {
      this.deps=res;

      // Add the school as the first element should one just want
      // to search with that

      var code = "code";
      var name = "name_sv";
      var a = {};
      a[code] = item.code;
      a[name] = item.school;

      this.deps.unshift(a);
    });
  }

  setDep(dep) {
    this.selectedSchool = dep.name_sv;
    this.currentPrefix = "org:" + dep.code;

    this.deps = [];
    this.toggleSchools();
  }

  setPerson(p) {
    this.currentPerson = p;
  }
}
