import { Component } from 'angular2/core';
import {MapService} from './map-service';
import {Location} from './location.interface';
/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

@Component({
  selector: 'map',
  templateUrl:'./app/map/map.html',
  styleUrls:['./app/map/map.min.css'],  
  providers:[MapService]
})
export class Map {
  //Leaflet Map Object
  map: L.Map;
  //Leaflet Marker Object
  currentDestination: L.Marker;

  searchResult:Array<Location>; 
	constructor(private _mapService:MapService){}
  //Fetches Places that matches the given search term. Only returns places of type Övningssal and Datorsal at the moment.
	search(term:string){
		this.searchResult = [];
		this._mapService.getPlaces(term)
			.subscribe(res => { console.log(res),
        res.forEach(item=>{
          if ((item.typeName === "Övningssal" || item.typeName === "Datorsal" )&& item.kthLokalkod.length !== 0) {
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
      error=>console.log(error),
      ()=>console.log("Success"));
	}
  //Executes on page load.
	ngOnInit(){
    //Initialize map
	 this.map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(59.3469417, 18.0702413),
            zoom: 17,
            minZoom: 4,
            maxZoom: 18
        });
        var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        	attribution: '&copy; Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        }).addTo(this.map);
        var zoomControl = L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
       //Add marker at the location of the screen. 
			L.marker([59.34694, 18.07319]).addTo(this.map);	 
  }
  //Adds a marker on the location the place that the user has searched for. If multiple searches had been made this method
  //also removed the old destination marker. test
  addDestinationMarker(place:Location){
    console.log(place);
    if (this.currentDestination != null) {
      this.map.removeLayer(this.currentDestination);
    } 
    this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map);
  }

}
