import { Component } from 'angular2/core';

@Component({
  selector: 'search',
  template: '<link rel="stylesheet" type="text/css" href="find-person.min.css" />
  				<form action="search()" id="search-container">
					<input type="text" [(ngModel)]="input" id="person-search-input" placeholder="Search for someone ...">
					<button type="submit" (click)="search(input)" name="search_button" id="person-search-button"></button>
				</form>'
})
export class Search {
}