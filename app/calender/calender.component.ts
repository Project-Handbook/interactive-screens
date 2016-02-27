import {Component} from 'angular2/core';
import {CalenderService} from './calender.service';
import {CalenderEvent} from './calender-event.interface';
import {OnInit} from 'angular2/core'
@Component({
	selector:'calender',
	template:`
		<h3>Calender</h3>
		<div>
			<ul *ngFor="#event of answer">
				<li>{{event.summary}}</li>
			</ul>
		</div>	
	`,
	providers:[CalenderService],

})


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
