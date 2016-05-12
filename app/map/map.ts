import { Component,ElementRef } from '@angular/core';
import {MapService} from './services/map-service';
import {SearchBarComponent} from './search-bar.component';
import { RouteParams } from '@angular/router-deprecated';
import {Location,Location_type} from './location.interface';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';
/// <reference path="../../typingsawd/main/ambient/leaflet/index.d.ts"/>

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
  //Center coords for map Initialize
  public mapCenter = new L.LatLng(59.3469417, 18.0702413);

  constructor(routeParams: RouteParams, private _mapService: MapService) {
    //Fetches information passed via routeParams when a user pushed the "view on map" button in the people tab
    var person = {
                   given_name: <string> routeParams.get('given_name'),
                   family_name: <string> routeParams.get('family_name'),
                   visiting_address: <string> routeParams.get('address'),
                   room: <string> routeParams.get('room')
                 }
    //If parameters was passed then display the address on the map
   if(person.given_name!==null && person.family_name!==null && person.visiting_address!==null){
     this.getAdressFromPerson(person);
   }
  }

  //Executes on page load.
	ngOnInit(){
      var screenInfo = new ScreenSpecificInformation();
      screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
      var gotChoords=false;
      if(screenInfo.latitude!==0 && screenInfo.longitude!==0){
      gotChoords=true;
      this.mapCenter = new L.LatLng(screenInfo.latitude, screenInfo.longitude);
      }else{
      this.mapCenter = new L.LatLng(59.347196, 18.073336);
      }
    //Initialize mapvar antarctica = [-77,70];
	 this.map = new L.Map('map', {
        zoomControl: false,
        center:this.mapCenter,
        zoom: 18,
        minZoom: 4,
        maxZoom: 18,
        zoomAnimation:false,
        doubleClickZoom:false
    });
    var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        	attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
        }).addTo(this.map);
    var zoomControl = L.control.zoom({
          position: 'topright'
        }).addTo(this.map);
      //Add marker at the location of the screen
      var greenIcon = L.icon({
          iconUrl: 'app/map/images/marker-icon-red.png',
          iconSize:     [25, 38], // size of the icon
          popupAnchor:  [2, -10] // point from which the popup should open relative to the iconAnchor
      });
      if(gotChoords===true){
     L.marker([screenInfo.latitude, screenInfo.longitude],{icon: greenIcon}).addTo(this.map)
      .bindPopup('<strong>You are here.</strong>').openPopup();
    }
      this.map.touchZoom.disable(); //Disable touchZoom to prevent pinch zoom on touchscreens.
  }
  //Adds a marker on the location the place that the user has searched for. If multiple searches had been made this method
  //also removed the old destination marker.
  addDestinationMarker(place:Location){
      if(place===undefined){
        return;
      }
      if (this.currentDestination != null) {
        this.map.removeLayer(this.currentDestination); //Removes old marker
      }
      this.currentDestination = L.marker([place.latitude, place.longitude]).addTo(this.map)
      this.map.setView([place.latitude,place.longitude],this.map.getZoom(),{animate:true});
        /*Depending if the location is fetched from googleapis, department api or KTH places the location Object
          contains different information and therefore the popups print different variables.
        */
        switch(place.location_type){
          case Location_type.kth_places:
            if(place.popular_name.length!==0){
              place.roomCode=place.popular_name;
            }
            this.currentDestination.bindPopup("<strong>" + place.roomCode + "</strong> - "
            + place.roomType.toLowerCase() +  "<br>"
              + place.streetAddress + " " + place.streetNumber + "<br>" + " Våningsplan " + place.floor + ", " + place.buildingName )
                .openPopup();
            break;
          case Location_type.department:
            this.currentDestination.bindPopup("<strong>" + place.buildingName + "</strong><br>" + place.streetAddress)
                .openPopup();
            break;
          case Location_type.street_address:
            this.currentDestination.bindPopup("<strong>" + place.streetAddress + "</strong>")
                .openPopup();
            break;
          default:
              console.log("No match");
      }
}
/* Used to fetch the address if the user navigates to the map tab through the peoples tab by clicking on
 the view address button. Fetches the coordinates of the adress of the person and displays it on the map.
*/
getAdressFromPerson(person){
    console.log(person.visiting_address);
    this._mapService.getGeoCode(person.visiting_address,Location_type.street_address)
      .subscribe(res => {
          var coordinate_lat = res[0].latitude;
          var coordinate_lng = res[0].longitude;
          this.currentDestination = L.marker([coordinate_lat,coordinate_lng]).addTo(this.map)
          .bindPopup("<strong>" + person.given_name + " " +  person.family_name + "</strong> <br>" +
          "Room: " + person.room + "<br>" +
            res[0].streetAddress )
          .openPopup();
    });
  }
  //Centers the map on the default coordinates.
  centerOnMarker(){
    this.map.setView(this.mapCenter, this.map.getZoom(), {animate: true});
  }
}
