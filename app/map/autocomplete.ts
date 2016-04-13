import {Component,ElementRef,EventEmitter} from 'angular2/core';
import {MapService} from './map-service';
import {Location} from './location.interface';


@Component({
	selector:'auto-complete',
   host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './app/map/autocomplete.html',
    providers: [MapService],
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
	constructor(private _mapService: MapService, myElement: ElementRef) {
    //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
		this.elementRef = myElement;
	 }

  //Fetches Places that matches the given search term. Only returns places of type Övningssal and Datorsal at the moment.
	search(term:string){
		if(term.length>1){

		this.searchResult = [];
		this._mapService.getPlaces(term)
			.subscribe(res => {
        res.forEach(item=>{
          if ((item.typeName === "Övningssal" || item.typeName === "Datorsal" || item.typeName==="Hörsal")&& item.kthLokalkod.length !== 0) {
             this.searchResult.push(
                {
                  latitude:item.geoData.lat,
                  longitude:item.geoData.long,
                  buildingName:item.buildingName,
                  roomCode:item.kthLokalkod,
                  streetAddress:item.streetAddress,
                  streetNumber:item.streetNumber,
                  roomType:item.typeName,
                  zipCode:item.zip,
                  floor:item.floor
                }
              );
             } 
           }
        )
      },
      error=>this.showErrorMessage=true,
      ()=>this.showErrorMessage=false;
		}else{
			this.searchResult=[];
		}	
	}
    //Send the selected location to map component. 
    select(item:Location){
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
}
