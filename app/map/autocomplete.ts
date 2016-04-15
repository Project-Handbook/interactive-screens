import {Component,ElementRef,EventEmitter} from 'angular2/core';
import {MapService} from './map-service';
import {Location} from './location.interface';
import { NgStyle } from 'angular2/common';


@Component({
	selector:'auto-complete',
   host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './app/map/autocomplete.html',
    providers: [MapService],
    directives:[NgStyle],
    styleUrls:['./app/map/autocomplete.min.css'],
    outputs:['newLocation']
})

export class AutoCompleteComponent {
	// Used for passing the selected argument from the dropdown menu to the map component
	newLocation = new EventEmitter<Location>();
  showErrorMessage:boolean=false;
	public query = '';
	searchResult:Array<Location>=[];
	public elementRef;
  searchForLocation:boolean=true;


	constructor(private _mapService: MapService, myElement: ElementRef) {
    //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
		  this.elementRef = myElement;
	 }

  //Fetches Places that matches the given search term. Only returns places of type Övningssal and Datorsal at the moment.
	search(term:string){
		if(term.length>1){
      if(this.searchForLocation===true){
          this.searchLocation(term);
      }else{
        this.searchAddress(term);
      }
		}else{
			this.searchResult=[];
		}

    if(term.length===0){
      this.showErrorMessage=false;
    }
	}

    searchLocation(term:string){
      this.searchResult = [];
      this._mapService.getPlaces(term)
        .subscribe(res=>
          this.searchResult=res,
          error=>this.showErrorMessage=true,
          ()=>this.showErrorMessage=false;
        );
    }

    searchAddress(term:string){
      this.searchResult = [];
      this._mapService.getGeoCode(term)
        .subscribe(res=>
          this.searchResult=res,
          error=>this.showErrorMessage=true,
          ()=>this.showErrorMessage=false
        );
    }

    //Send the selected location to map component.
    select(item:Location){
      this.query="";
		  this.newLocation.emit(item);
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
			   clickedComponent = clickedComponent.parentNode;
		  }while (clickedComponent);
  		if(!inside){
  			this.searchResult = [];
  		}
    }

    buttons:Array<string>=["white","blue"];
    buttonPush(value){
      this.query="";
      this.searchResult=[];
      if(value===2){
        this.buttons[1]="blue";
        this.buttons[0]="white";
        this.searchForLocation=true;
        console.log(this.searchForLocation);
      }
      else {
        this.buttons[1]="white";
        this.buttons[0]="blue";
        this.searchForLocation=false;
        console.log(this.searchForLocation);
      }
    }
}
