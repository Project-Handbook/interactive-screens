import { Component,ElementRef } from 'angular2/core';
import {MapService} from './services/map-service';
import {SearchBarComponent} from './search-bar.component';
import { RouteParams } from 'angular2/router';
import {Person} from '../find-person/person';
/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

@Component({
  selector: 'map',
  templateUrl:'./app/map/html/map.html',
  styleUrls:['./app/map/styles/map.min.css'],
  directives:[SearchBarComponent],
  providers:[MapService],
})
export class Map {
  public destinationLocation;
  //Leaflet Map Object
  map: L.Map;
  //Leaflet Marker Object
  currentDestination: L.Marker;

  constructor(routeParams: RouteParams, private _mapService: MapService) {
    var person = <any> routeParams.get('hej'); // This works (hooray!)
    if(person!==null){
      this.getPopUpAdress(person);
    }
  }

  //Executes on page load.
	ngOnInit(){
    //Initialize map
	 this.map = new L.Map('map', {
        zoomControl: false,
        center: new L.LatLng(59.3469417, 18.0702413),
        zoom: 15,
        minZoom: 4,
        maxZoom: 18
    });
    var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        	attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
        }).addTo(this.map);
    var zoomControl = L.control.zoom({
          position: 'topright'
        }).addTo(this.map);
			L.marker([59.34694, 18.07319]).addTo(this.map)
       .bindPopup('<strong>You are here.</strong>').openPopup();

  }
  //Adds a marker on the location the place that the user has searched for. If multiple searches had been made this method
  //also removed the old destination marker.
  addDestinationMarker(place){
    console.log(place);
    if (this.currentDestination != null) {
      this.map.removeLayer(this.currentDestination);
    }
    this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map)
        .bindPopup("<strong>" + place.roomCode + "</strong> <br>" + place.streetAddress + " "  + place.streetNumber + "<br>" +  place.buildingName )
        .openPopup();
  }

  getPopUpAdress(address:Person){
    console.log(address.visiting_address);
    this._mapService.getGeoCode(address.visiting_address)
      .subscribe(res=>{
          var coordinate_lat= res[0].latitude;
          var coordinate_lng= res[0].longitude;
          this.currentDestination = L.marker([coordinate_lat,coordinate_lng]).addTo(this.map)
          .bindPopup("<strong>" + res[0].streetAddress + "</strong> <br>")
          .openPopup();
    });
  }
}
