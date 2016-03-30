import { Component } from 'angular2/core';
import {OnInit} from 'angular2/core'
import {NgClass} from 'angular2/common';
import {FindPersonService} from './find-person.service';

@Component({
  selector: 'find-person',
  templateUrl: 'app/find-person/partial_find-person.html',
  directives: [NgClass],
  providers: [FindPersonService]
})
export class FindPerson {
	
  organisation: string = "org:D";
  orgName : string = "CSC";

  isOn = false;
  	isDisabled = false;
  	toggle(newState) {
      if (!this.isDisabled) {
        	this.isOn = newState;
      }
    } 
  
  currentSearch : string = "";
  people: Array<Object>=[];
  peopleImage: Array<string>=[];
  constructor(private _findPersonService:FindPersonService){
  }
  getPeople(term:string){
    console.log(this.people);
    this.people = [];
    this.people = this._findPersonService.getPeople(term);
    this.peopleImage = this._findPersonService.getImages();
  }
  getTitle(title : string) : string {
    var res = title.charAt(0) + title.substr(1).toLowerCase();
    return res;
  }
  ngOnInit():any{
    this.getPeople(this.organisation);
  }

  search(input : string) {
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
