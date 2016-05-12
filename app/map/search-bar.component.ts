import {Component,ElementRef,EventEmitter} from '@angular/core';
import {MapService} from './services/map-service';
import {Location,Location_type} from './location.interface';
import { NgStyle,Control } from '@angular/common';
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
	//Used for displaying errors if any of the http rquests fails
  showErrorMessage:boolean=false;
	// Holds all results returned by the http requests
	searchResult:Array<Location>=[];
	// Keeps track on where the user clicks on the screen.
	elementRef:ElementRef;
	// Boolean values that keeps track of which button is currently pressed
  searchForLocation:boolean=true;
	searchForAddress:boolean=false;
	showSearchField:boolean=true;
	//Holds the string that will be displayed in the search field if there is no user input.
	search_bar_placeholder="Search for a location...";
	// Holds an Observable that is subscribed to inside the constructor. Keeps track if the user is typing in the search field
  term = new Control();
	//If no adress is found by google geocord api then an error shall be presented on the screen.
	no_address_found:boolean=false;
	constructor(private _mapService: MapService, myElement: ElementRef) {
    //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
		  this.elementRef = myElement;
      this.term.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(item => {
					var regex = new RegExp('^[\\w\\d\\säöåÄÖÅ]+:?[\\w\\d\\säöåÄÖÅ]*$','i');
          if (item.toString().length > 1 && regex.test(item.toString())){
            if (this.searchForLocation === true) {
              this._mapService.getPlaces(item.toString()).subscribe(res => { this.searchResult = res },
                error => this.showErrorMessage = true,
                () => this.showErrorMessage = false);
            } else {
							//Replacing ä,å,ö with a's and o's. googleapis works better without swedish charachters.
							var location_type = this.searchForAddress===true? Location_type.street_address : Location_type.department;
							var term = item.toString().replace(/ä|å/ig,'a').replace(/ö/ig,'o');
              this._mapService.getGeoCode(term,location_type).subscribe(res => { this.searchResult = res },
                error => {this.showErrorMessage = true},
                () => this.showErrorMessage = false);
            }
          }else{
						this.searchResult=[];
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
						this.no_address_found=true;
						 setTimeout(() => {this.no_address_found=false;},3000);
						this.newLocation.emit(undefined);
					}
				},
	        error => this.showErrorMessage = true,
	        () => this.showErrorMessage = false);
	    }
			this.resetDropDownMenus();
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
			//If drop down wrapper is pushed then clear dropdown.
			if(document.querySelector(".departments_drop_down")===event.target
				||document.querySelector(".component_wrapper")===event.target ){
					inside=false;
					console.log("hej");
			};
  		if(!inside){
				if(this.searchForLocation===true){
						this.updateButtons(0);
				}else{
						this.updateButtons(1);
				}
				this.showSearchField=true;
				this.resetDropDownMenus();
				this.searchResult=[];
  		}
    }
    buttonColors:Array<string>=["#2E7CC0","#8c8c93","#8c8c93"];

    buttonPush(value){
      if(value===0){
        this.searchForLocation=true;
				this.searchForAddress=false;
				this.showSearchField=true;
				this.search_bar_placeholder = "Search for a location..."
				this.resetDropDownMenus();
      }else if(value===1){
        this.searchForLocation=false;
				this.searchForAddress=true;
				this.showSearchField=true;
				this.search_bar_placeholder = "Search for an address..."
				this.resetDropDownMenus();
      }else if(value===2){
				this.showSearchField=false;
			}
			this.searchResult=[];
			this.term.updateValue("");
			this.updateButtons(value);
    }
	updateButtons(value){
		switch(value){
			case 0:
				this.buttonColors[0]="#2E7CC0";
				this.buttonColors[1]="#8c8c93";
				this.buttonColors[2]="#8c8c93";
				break;
			case 1:
				this.buttonColors[0]="#8c8c93";
				this.buttonColors[1]="#2E7CC0";
				this.buttonColors[2]="#8c8c93";
				break;
			case 2:
				this.buttonColors[0]="#8c8c93";
				this.buttonColors[1]="#8c8c93";
				this.buttonColors[2]="#2E7CC0";
				break;
			default:
				console.log("error");
				break;
		}
	}
  schools:Array<any>=[];
	//Returns a list of all the schools listed in a local .json file
  getSchools(){
    this._mapService.getSchools().subscribe(res=>this.schools=res);
  }
  departmentsColumns: Array<Array<any>> = [];
  getDepartments(department:string){
    this._mapService.getDepartments(department).subscribe(res => {
			this.departmentsColumns=[];
			switch(true){
				case res.length>51:
					this.departmentsColumns[0] = res.splice(0, 17);
					this.departmentsColumns[1] = res.splice(0, 17);
					this.departmentsColumns[2] = res.splice(0, 17);
					this.departmentsColumns[3] = res.splice(0, res.length);
					break;
				case res.length>34:
					this.departmentsColumns[0] = res.splice(0, 17);
	        this.departmentsColumns[1] = res.splice(0, 17);
					this.departmentsColumns[2] = res.splice(0,res.length);
					break;
				case res.length>17:
					this.departmentsColumns[0] = res.splice(0, 17);
					this.departmentsColumns[1] = res.splice(0, res.length);
					break;
				default:
					this.departmentsColumns[0] = res;
					break;
			}
    },
		error=>this.showErrorMessage=true,
		()=> this.showErrorMessage=false)
  }
	resetDropDownMenus(){
		this.schools=[];
		this.departmentsColumns=[];
	}
//used when search button is pressed
	search(){
		if(this.searchResult.length!==0){
			this.select(this.searchResult[0]);
	}
}
}
