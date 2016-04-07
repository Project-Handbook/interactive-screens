import { Component } from 'angular2/core';
import {MapService} from './map-service';
import {AutoCompleteComponent} from './autocomplete';
/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

@Component({
  selector: 'map',
  templateUrl:'./app/map/map.html',
  styleUrls:['./app/map/map.min.css'],  
  directives:[AutoCompleteComponent],
})
export class Map {
  public destinationLocation;
  //Leaflet Map Object
  map: L.Map;
  //Leaflet Marker Object
  currentDestination: L.Marker;

  
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
  addDestinationMarker(place){
    if (this.currentDestination != null) {
      this.map.removeLayer(this.currentDestination);
    } 
    this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map);
  }





}
