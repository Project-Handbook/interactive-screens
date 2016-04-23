import {Component,ElementRef,EventEmitter} from 'angular2/core';
import {MapService} from './services/map-service';
import {Location} from './location.interface';
import { NgStyle,Control } from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
	selector:'auto-complete',
   host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './app/map/html/search-bar.html',
    providers: [MapService],
    directives:[NgStyle],
    styleUrls:['./app/map/styles/search-bar.min.css'],
    outputs:['newLocation']
})

export class SearchBarComponent {
	// Used for passing the selected argument from the dropdown menu to the map component
	newLocation = new EventEmitter<Location>();
  showErrorMessage:boolean=false;
	public query = '';
	searchResult:Array<Location>=[];
	public elementRef;
  searchForLocation:boolean=true;
  term = new Control();
 // items: Observable<Array<Location>>;
	constructor(private _mapService: MapService, myElement: ElementRef) {
    //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
		  this.elementRef = myElement;
      this.term.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(item => {
          if (item.toString().length > 1) {
            if (this.searchForLocation === true) {
              this._mapService.getPlaces(item.toString()).subscribe(res => { this.searchResult = res },
                error => this.showErrorMessage = true,
                () => this.showErrorMessage = false);
            } else {
              this._mapService.getGeoCode(item.toString()).subscribe(res => { this.searchResult = res },
                error => this.showErrorMessage = true,
                () => this.showErrorMessage = false);
            }
          }else{
          this.searchResult = [];
          }
        })
	 }
    //Send the selected location to map component.
    select(location){
    console.log(location);
    console.log("+");
    this.term.updateValue(""); //Reset search field
    if(location.latitude!==undefined){
        this.newLocation.emit(location); // Send selected location to output
    }else{
      this._mapService.getGeoCode(location.streetAddress).subscribe(res => { this.newLocation.emit(res[0])},
                error => this.showErrorMessage = true,
                () => this.showErrorMessage = false);
    }
		this.searchResult = [];
    }
    //This funtion determines if the user clicks outside the dropdown menu. If this is the case
    // the searchresult array will be cleared and the dropdown will disappear.
    handleClick(event){
      var clickedComponent = event.target;
  		var inside = false;
		  do {
			   if (clickedComponent === this.elementRef.nativeElement) {
				    inside = true;
			    }
			   clickedComponent = clickedComponent.nativeElement.parentNode.value;
		  }while (clickedComponent);
  		if(!inside){
  			this.searchResult = [];
        this.schools = [];
        this.departmentsCol1 = [];
        this.departmentsCol2 = [];
  		}
    }
    buttons:Array<string>=["blue","white","white"];
    buttonPush(value){
      this.query="";
      this.searchResult=[];
      if(value===0){
        this.buttons[0]="blue";
        this.buttons[1]="white";
        this.buttons[2]="white";
        this.searchForLocation=true;
        this.schools = [];
        this.departmentsCol1=[];
        this.departmentsCol2=[];
      }else if(value===1){
        this.buttons[0]="white";
        this.buttons[1]="blue";
        this.buttons[2]="white";
        this.searchForLocation=false;
        this.schools = [];
        this.departmentsCol1=[];
        this.departmentsCol2=[];
      }
      else if(value===2) {
        this.buttons[0]="white";
        this.buttons[1]="white";
        this.buttons[2]="blue";
      }
    }

  schools:Array<any>=[];
  getSchools(){
    this._mapService.getSchools().subscribe(res=>this.schools=res);
  }
  departmentsCol1: Array<any> = [];
  departmentsCol2: Array<any> = [];
  getDepartments(department:string){
    this._mapService.getDepartments(department).subscribe(res => {
      if (res.length > 25) {
        this.departmentsCol1 = res.splice(10, 25);
        this.departmentsCol2 = res.splice(25, res.length);
      } else {
        this.departmentsCol1 = res;
        this.departmentsCol2 = [];
      }
    })
  }
}
