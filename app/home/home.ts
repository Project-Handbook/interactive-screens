import { Component } from 'angular2/core';
import {CalenderComponent} from '../calender/calender.component';
import {Http} from 'angular2/http';

@Component({
  selector: 'home',
  template: `
  <h1>Home component here</h1>
  <calender></calender>
  `,
  directives:[CalenderComponent]

})
export class Home {

}
