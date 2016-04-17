import {Component,ElementRef,EventEmitter} from 'angular2/core';
import {MapService} from './services/map-service';
import {Location,Location_type} from './location.interface';
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
	searchForDepartment:boolean=false;
	searchForAddress:boolean=false;
	search_bar_placeholder="Search for a location...";
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
							//Replacing ä,å,ö with a's and o's. googleapis works better without swedish charachters.
							var location_type = this.searchForAddress===true? Location_type.street_address : Location_type.department;
							var term = item.toString().replace(/ä|å/ig,'a').replace(/ö/ig,'o');
              this._mapService.getGeoCode(term,location_type).subscribe(res => { this.searchResult = res },
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
    this.term.updateValue(""); //Reset search field
		//Locations that is not fetched from KTH Places hasnt got coordinates but an address.
		//Those locations has to be sent to googleapis in order to recieve coordinates.
    if(location.latitude!==undefined && location.longitude!==undefined){
        this.newLocation.emit(location); // Send selected location to output
    }else{
			var location_type = this.searchForAddress===true? Location_type.street_address : Location_type.department;
      this._mapService.getGeoCode(location.streetAddress,location_type).subscribe(res => {
				if(res.length!==0){
					res[0].buildingName = location.buildingName;
					this.newLocation.emit(res[0])
				}else{
					this.newLocation.emit(undefined);
				}
			},
        error => this.showErrorMessage = true,
        () => this.showErrorMessage = false);
    }
		this.searchResult = [];
		this.departmentsCol1 = [];
		this.departmentsCol2 = [];
		this.schools=[];
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
			   clickedComponent = clickedComponent.parentNode;
		  }while (clickedComponent);
  		if(!inside){
  			this.searchResult = [];
        this.schools = [];
        this.departmentsCol1 = [];
        this.departmentsCol2 = [];
  		}
    }
    buttons:Array<string>=["#2258A5","white","white"];
    buttonPush(value){
      this.query="";
      this.searchResult=[];
      if(value===0){
        this.buttons[0]="#2258A5";
        this.buttons[1]="white";
        this.buttons[2]="white";
        this.searchForLocation=true;
				this.searchForAddress=false;
				this.searchForDepartment=false;
        this.schools = [];
        this.departmentsCol1=[];
        this.departmentsCol2=[];
				this.search_bar_placeholder = "Search for a Location..."

      }else if(value===1){
        this.buttons[0]="white";
        this.buttons[1]="#2258A5";
        this.buttons[2]="white";
        this.searchForLocation=false;
				this.searchForAddress=true;
				this.searchForDepartment=false;
        this.schools = [];
        this.departmentsCol1=[];
        this.departmentsCol2=[];
				this.search_bar_placeholder = "Search for an Address..."
      }
      else if(value===2) {
        this.buttons[0]="white";
        this.buttons[1]="white";
        this.buttons[2]="#2258A5";
				this.searchForLocation=false;
				this.searchForAddress=false;
				this.searchForDepartment=true;

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
      if (res.length > 20) {
        this.departmentsCol1 = res.splice(0, 20);
        this.departmentsCol2 = res.splice(20, res.length);
      } else {
        this.departmentsCol1 = res;
        this.departmentsCol2 = [];
      }
    })
  }
}
