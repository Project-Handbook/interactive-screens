import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Person } from '../find-person/person';

@Component({
  selector: 'map',
  template: '<h1>Map component here</h1>'
})
export class Map {
  constructor(routeParams: RouteParams) {
    var person = <Person> routeParams.get('person'); // This works (hooray!)
    console.log(person);
  }
}
