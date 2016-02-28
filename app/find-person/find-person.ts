import { Component } from 'angular2/core';
import {NgClass} from 'angular2/common';
import {FindPersonService} from './find-person.service';

@Component({
  selector: 'find-person',
  templateUrl: 'app/find-person/partial_find-person.html',
  directives: [NgClass],
  providers: [FindPersonService]
})
export class FindPerson {
	isOn = false;
  	isDisabled = false;
  	toggle(newState) {
    if (!this.isDisabled) {
      	this.isOn = newState;
    }
  }
  staben: string = "org:DAS";
  people: Array<Object>=[];
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
}
