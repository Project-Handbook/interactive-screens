import { Component,OnInit } from '@angular/core';
import { FindPersonService, ErrorType } from './find-person.service';
import { Person } from './person';
import { PersonProfile } from './person-profile';
import { MapService } from '../map/services/map-service';
import { ScreenSpecificInformation,department } from '../screen-specific-information';
import { Constants } from '../constants';

@Component({
  host: {
        '(document:click)': 'handleClick($event)',
  },
  selector: 'find-person',
  templateUrl:'./find-person.html',
  directives: [ PersonProfile],
  providers: [FindPersonService, MapService],
  styles:[require('./find-person.scss').toString()]
})
export class FindPerson implements OnInit{
  state: string = "none";

  currentPerson: Person = null;
  // Default search values
  currentSearch: string = "";
  currentPrefix: string = "";
  selectedSchool: string = "";
  currentSchool: string = "";
  nearby_departments:Array<department>

  // Displaying error message if a search request would fail for any reason
  showErrorMessage: boolean = false;
  missingConfiguration:boolean =false;

  isOn = false;

  people: Array<Person> = []; // Holds all the persons fetched from the API

  constructor(private findPersonService: FindPersonService, private mapService: MapService) {}

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

  // This will find all people based on the given search-string
  getPeople(searchterm: string) {
    this.people = this.findPersonService.fetchPeople(searchterm, this.onError);
  }

  // This will find all people based on the given search-string within the chosen department
  getPeople2(searchterm: string) {
    this.people = this.findPersonService.fetchPeople2(searchterm, this.currentPrefix, this.onError);
  }

  // Makes a Persons title lowercase instead of KTH standard ALL CAPS.
  getTitle(title: string): string {
    return title.charAt(0) + title.substr(1).toLowerCase();
  }

  // Displays people local to the department as default when the people tab is pushed.
  ngOnInit(): any {
    // Fetches department code and name from local storage.
    var screenInfo = new ScreenSpecificInformation();
    if(localStorage.getItem(Constants.SETUP_PROCESS_KEY)){
      screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
      if(screenInfo.department.code && screenInfo.department.name_sv){
        this.currentPrefix  = "org:" + screenInfo.department.code;
        this.selectedSchool  =  screenInfo.department.name_sv;
        this.currentSchool =  screenInfo.department.name_sv;
        this.nearby_departments = screenInfo.departments;
        // Load initial results
        this.getPeople(this.currentPrefix);
        this.getSchools();
      }else{
        this.missingConfiguration = true;
      }
    }else{
      this.missingConfiguration=true;
    }
  }

  // Set's field based on input and makes a function call to find all people based on the input
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

  // Used for arrows when sorting the results
  rotation: string = "rotate(90deg)";

  previous: string = "surname";

  // Sorts the person-list based on input. This will sort the list first based
  // on the input and if two objects have the same value it will then sort those
  // based on their family name
  // The function will also reset and rotate the arrows marking how the list is
  // currently sorted.
  sort(input) {
    // The arrow for the current input
    var element = this.getElement(input);

    // Rotate and display the current arrow and
    // reset the previous
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

    // Sort the list based on input and how it's currently sorted. For example, if
    // it's previously sorted based on email and the input also is email, then simply
    // flip the list, sorting it backwards.
    var rotation = this.rotation;
    this.people.sort(function(a, b) {
      if(input == "firstname") {
          if(a.given_name < b.given_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.given_name > b.given_name) return rotation == "rotate(90deg)" ? 1 : -1;

          // Both items were equal, sort based on family name instead
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

          // Both items were equal, sort based on family name instead
          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
      else if(input == "phone") {
          if(a.phone_number < b.phone_number) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.phone_number > b.phone_number) return rotation == "rotate(90deg)" ? 1 : -1;

          // Both items were equal, sort based on family name instead
          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
      else if(input == "title") {
          if(a.title < b.title) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.title > b.title) return rotation == "rotate(90deg)" ? 1 : -1;

          // Both items were equal, sort based on family name instead
          if(a.family_name < b.family_name) return rotation == "rotate(90deg)" ? -1 : 1;
          if(a.family_name > b.family_name) return rotation == "rotate(90deg)" ? 1 : -1;
          return 0; // Maybe sort by other parameter?
      }
    });
  }
  // Returns the mark-element for the person-table based
  // on input. This is used to be able to rotate the arrows.
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
  // Scrolls the div 'departments' in the provided direction.
  // input 'dir' = -1 or 1
  scrollDep(dir: number) {
    var departments = document.getElementById("departments");
    var newScroll = departments.scrollTop + (departments.offsetHeight-55)*dir;
    this.scrollTo(departments, newScroll, 5000);
  }

  // Scrolls to a position in a certain div in a certain time
  scrollTo(element, to, duration) {
    $("#departments").animate({
            scrollTop: to
        }, 300);
    return false;
  }
  // This funtion determines if the user clicks outside the dropdown menu. If this is the case
  // the searchresult array will be cleared and the dropdown will disappear.
  handleClick(event) {
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
  // This funtion determines if the user clicks outside the popup window. If this is the case
  // the window will disappear.
  handleClickForPopup(event) {
      var clickedComponent = event.target;
      var popupContent = document.getElementById('popup-content');
      var personTable = document.getElementById('person-table-body');
      do {
         if (clickedComponent === popupContent) {
            return;
          }
         clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);

      this.isOn = false;
  }
  deps : Array<any> = [];
  schools: Array<Object>;
  // Will either display or hide the element 'schools-wrapper' depending
  // on it's previous 'display' value.
  // It will also clear the deps array.
  toggleSchools() {
    var w = document.getElementById('schools-wrapper');
    w.style.display = w.style.display == "table" ? "none" : "table";
    this.deps = [];
  }
  // Will fetch all available schools
  getSchools() {
    this.schools = this.mapService.getSchools();
    var code = "code";
    var school = "school";
    var a = {};
    a[code] = "";
    a[school] = "KTH";
    this.schools.unshift(a);
  }

  // Will fetch all departments within a certain school
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
    this.mapService.getDepartments(item.code).subscribe( res=> {
      this.deps = res;
    },error=>null,()=>{});
  }

  // Set's the currently selected department
  setDep(dep) {
    this.selectedSchool = dep.name_sv;
    this.currentPrefix = "org:" + dep.code;

    this.deps = [];
    this.toggleSchools();
  }

  // Set's the currently selected person for the popup window
  setPerson(p) {
    this.completedFetchedResources=0;
    this.findPersonService.fetchAdditionalInfo(p,this.getAdditonalInfoCallback,this);
    this.isOn=false;
    this.currentPerson = p;
  }

  /*
    When fetching all info of a person, the info is fetched from 4 different APIs therefore 4 different
    http calls has to made, when every http call is done they call a the getAdditonalInfocallback function.
    When all 4 callbacks has been called all resoures dispalyed in the popup view is fetched and ready to be viewed.
  */
  public completedFetchedResources=0;
  getAdditonalInfoCallback(self,err){
    if(err){
      console.error(err);
      self.completedFetchedResources=0;
      return;
    }
    self.completedFetchedResources++;
    if(self.completedFetchedResources===4){
      self.isOn=true;
      self.completedFetchedResources=0;
    }
  }
  changeDepartment(dep:department){
    this.currentPrefix  = "org:" + dep.code;
    this.selectedSchool  =  dep.name_sv;
    this.currentSchool =  dep.name_sv;
    this.getPeople(this.currentPrefix);
  }

}
