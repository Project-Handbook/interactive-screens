import { Component } from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
  selector: 'find-person',
  templateUrl: 'app/find-person/partial_find-person.html',
  directives: [NgClass]
})
export class FindPerson {
	isOn = false;
  	isDisabled = false;
  	toggle(newState) {
    if (!this.isDisabled) {
      	this.isOn = newState;
    }
  }
}
