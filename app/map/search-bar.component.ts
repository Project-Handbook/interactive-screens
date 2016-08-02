import {Component,ElementRef,EventEmitter,ViewChild} from '@angular/core';
import {MapService} from './services/map-service';
import {Location,Location_type} from './location.interface';
import {FormControl,REACTIVE_FORM_DIRECTIVES} from '@angular/forms';



@Component({
	selector:'auto-complete',
   host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl:'./html/search-bar.html',
    providers: [MapService],
		directives:[REACTIVE_FORM_DIRECTIVES],
    styles:[require('./styles/search-bar.scss').toString()],
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
	//Boolean value that decides if the searchfield shall be visible or not
	showSearchField:boolean=true;
	//Holds the string that will be displayed in the search field if there is no user input.
	search_bar_placeholder="Search for a location...";
	// Holds an Observable that is subscribed to inside the constructor. Keeps track if the user is typing in the search field
	//@ViewChild('searchField') searchFields;
	term = new FormControl();
	//If no adress is found by google geocord api then an error shall be presented on the screen.
	no_address_found:boolean=false;
	//Holds the the school objects fetched from schools.json.
	schools:Array<Object>=[];
	//Control array for updating the buttons in the search component
	buttonColors:Array<string>=["#2E7CC0","#8c8c93","#8c8c93"];
	// Holds department objects fetched from KTH Places.
	departmentsColumns: Array<Array<any>> = [];

	constructor(private _mapService: MapService, myElement: ElementRef) {
		//Saves the root node of this componenet. Used for toogling dropdown menu on and off.
		  this.elementRef = myElement;
			this.term.valueChanges
				//Only execute new search query if no changes has been made to the search field for 300ms.
        .debounceTime(300)
				//Only executes new search query if the new query is different than the last one
        .distinctUntilChanged()
				/**	search field only accepts letters, numbers and the character ":".''
						if the search field contains accepted input and input is longer than 1
						 character -> search query will be executed */
        .subscribe(query => {
          if (query.toString().length>1 && /^[\w\s\däöåÄÖÅ]+:?[\w\d\säöåÄÖÅ]*$/i.test(query.toString())){
						//Search from KTH Places API
            if (this.searchForLocation === true) {
              this._mapService.getPlaces(query.toString()).subscribe(res => { this.searchResult = res },
                error => this.showErrorMessage = true,
                () => this.showErrorMessage = false);
            } else {
							/**Search from google geocoding API*/
							//Check if the search query is for a department or address
							var location_type = this.searchForAddress===true? Location_type.street_address : Location_type.department;
							//Replacing ä,å,ö with a's and o's. googleapis works better without swedish charachters.
							var term = query.toString().replace(/ä|å/ig,'a').replace(/ö/ig,'o');
              this._mapService.getGeoCode(term,location_type).subscribe(res => { this.searchResult = res },
                error => {this.showErrorMessage = true},
                () => this.showErrorMessage = false);
            }
          } else {
						//Clear dropdown search list
					this.searchResult=[];
					}
				})
			}


    //Send the selected location to map component.
    select(location){
	    this.term.updateValue(""); //Reset search field
			/**Locations that is not fetched from KTH Places hasnt got coordinates but an address.
		 		Those locations has to be sent to googleapis in order to recieve coordinates.*/
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

    /**This funtion is used determine if the user clicks outside the dropdown menu. If this is the case
     the searchresult array will be cleared and the dropdown will disappear.*/
    handleClick(event){
			//The component that the user has clicked on
			var clickedComponent = event.target;
			//Boolean value that will be set to true if the user has clicked inside the dropdown
			var inside = false;
			//Check every parent node of the clicked component.
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
			};
			//If the clicked component is outside dropdown then clear dropdown.
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
		/**Switchs the color of the buttons in the search componet and also keep
		control of what api to execute the search query to.*/
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
	//Updates the colors of the buttons
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
	//Returns a list of all the schools listed in a local .json file
  getSchools(){
		this.schools = this._mapService.getSchools();
  }
	// Fetches all departments matching the given school code string passed as argument
  getDepartments(department:string){
    this._mapService.getDepartments(department).subscribe(res => {
			this.departmentsColumns=[];
			// Depening on the amount of departments. The list is split into diffenrent amount of sublists(columns).
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
	// Clears dropdown lists.
	resetDropDownMenus(){
		this.schools=[];
		this.departmentsColumns=[];
	}
//Searches for the first object displayed in the dropdown menu.
	search(){
		if(this.searchResult.length!==0){
			this.select(this.searchResult[0]);
		}
	}
}
