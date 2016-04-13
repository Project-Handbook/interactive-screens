import {Component} from 'angular2/core';
import {CalenderService} from './calender.service';
import {CalenderEvent} from './calender-event.interface';
import {OnInit} from 'angular2/core'
@Component({
	selector:'calender',
	template:`
		<h3>Calender</h3>
		<div *ngFor="#event of answer" style="border-style: solid; width:60%; float:left; border-width:1px;">
			<div style="margin-left:20px;">
				<h3>{{event.summary}}</h3>
				<p>{{event.description}}</p>
				<p><b>Location: </b>{{event.location}}</p>
				<p><b>Start: </b>{{event.start}}</p>
				<p><b>End: </b>{{event.end}}</p>
			</div>	
		</div>	
	`,
	providers:[CalenderService],



})
/*
	getCalander returns an object with all calender events from csc service centers kalender. 
	Check calender-event.interface to see the structure of the returned object. 
*/

export class CalenderComponent{
	answer: Array<CalenderEvent>;
	constructor(private _calenderService:CalenderService){}
	getCalender(){
		this.answer = [];
		this.answer = this._calenderService.getCalender();
	}

	//Initalize the calender
	ngOnInit():any{
		this.getCalender();
	}

}
