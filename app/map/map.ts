import { Component } from 'angular2/core';
import {MapService} from './map-service';
@Component({
  selector: 'map',
  template: `
		<h1>Map component here</h1>
		<form action="search()" id="search-container">
				<input type="text" [(ngModel)]="input" id="person-search-input" placeholder="Search for someone...">
				<button type="submit" (click)="search(input)" name="search_button" >Search</button>
		</form>
		<ul><li *ngFor="#res of searchResult">{{res.kthLokalkod}}</li></ul>	
  `,
  providers:[MapService],
})
export class Map {
	searchResult:Array<Object>;

	constructor(private _mapService:MapService){}
	search(term:string){
		this.searchResult = [];
		this._mapService.getPlaces(term)
			.subscribe(res => { this.searchResult = res ,console.log(res)},error=>console.log(error),()=>console.log("hej"));
	}

}
//		<ul><li *ngFor="#res of searchResult">{{res}}</li></ul>
