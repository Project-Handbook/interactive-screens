import { Component,ElementRef, OnInit} from '@angular/core';
import {MapService} from './services/map-service';
import {SearchBarComponent} from './search-bar.component';
import {Location,Location_type} from './location.interface';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';
import {Router} from '@angular/router';

@Component({
  selector: 'map',
  templateUrl:'./html/map.html',
  styles:[require('./styles/map.scss').toString()],
  directives:[SearchBarComponent],
  providers:[MapService],
})
export class Map implements OnInit{
  private destinationLocation;
  //Leaflet Map Object
  private map: L.Map;
  //Leaflet Marker Object
  private currentDestination: L.Marker;
  //Center coords for map Initialize
  private mapCenter = new L.LatLng(59.3469417, 18.0702413);
  //Boolean to display error message
  private showError:boolean=false;
  //
  id;
  constructor(router: Router, private _mapService: MapService) {
    //Fetches information passed via routeParams when a user pushed the "view on map" button in the people tab
    let person = {given_name:"",family_name:"",visiting_address:"",room:""};
    router.routerState.queryParams
      .subscribe(params=>{
         person = {
                     given_name: <string> params['givenName'],
                     family_name: <string> params['familyName'],
                     visiting_address: <string> params['address'],
                     room: <string> params['room']
                  }
      });
    //If parameters was passed then display the address on the map
   if(person.given_name && person.family_name && person.visiting_address){
     this.getAdressFromPerson(person);
   }
  }

  //Executes on page load.
	ngOnInit(){
      var screenInfo = new ScreenSpecificInformation();
      //Used to detect if chords of the screen is saved in localstorage
      var gotChoords=false;
      //Check if localstorage object exists
      if(localStorage.getItem(Constants.SETUP_PROCESS_KEY)){
        screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
        //Check if localstorage object contains position coordinates.
        if(screenInfo.latitude!==0 && screenInfo.longitude!==0){
          //Set map center
          this.mapCenter = new L.LatLng(screenInfo.latitude, screenInfo.longitude);
          gotChoords=true;
        }
      }
    //Initialize map
	 this.map = new L.Map('map', {
        zoomControl: false,
        center:this.mapCenter,
        zoom: 18,
        minZoom: 4,
        maxZoom: 18,
        zoomAnimation:false,
        doubleClickZoom:false
    });
    //Add map layer
    var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        	attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
        }).addTo(this.map);
    //Add zoom control
    var zoomControl = L.control.zoom({
          position: 'topright'
        }).addTo(this.map);
    //Add marker at the location of the screen
    var redIcon = L.icon({
        iconUrl: require('./images/marker-icon-red.png'),
        iconSize:     [25, 38], // size of the icon
        popupAnchor:  [2, -10] // point from which the popup should open relative to the iconAnchor
    });
    /*If choordiantes are found in localstorage then set map center to the containing chords and display marker*/
    if(gotChoords===true){
      //Display marker
     L.marker([screenInfo.latitude, screenInfo.longitude],{icon: redIcon}).addTo(this.map)
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
      this.currentDestination = L.marker([place.latitude, place.longitude],{
        icon: L.icon({
                          iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
                          shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png')
                      }),
        })
        .addTo(this.map)
      this.map.setView([place.latitude,place.longitude],this.map.getZoom(),{animate:true});
        /*Depending if the location is fetched from googleapis or KTH places the location Object
          contains different information and therefore the popups print different variables.  */
        switch(place.location_type){
          case Location_type.kth_places:
            if(place.popular_name.length!==0){
              place.roomCode=place.popular_name;
            }
            this.currentDestination.bindPopup("<strong>" + place.roomCode + "</strong> - "
              + place.roomType.toLowerCase() +  "<br>"
              + place.streetAddress + " " + place.streetNumber + "<br>" + " Våningsplan "
              + place.floor + ", " + place.buildingName ,{
                offset: L.point(12, 10)
              })
                .openPopup();
            break;
          case Location_type.department:
            this.currentDestination.bindPopup("<strong>" + place.buildingName + "</strong><br>" + place.streetAddress,{
              offset: L.point(12, 10)
            })
                .openPopup();
            break;
          case Location_type.street_address:
            this.currentDestination.bindPopup("<strong>" + place.streetAddress + "</strong>",{
              offset: L.point(12, 10)
            })
                .openPopup();
            break;
          default:
              console.log("No match");
      }
}
/* This method is used when a person has been passed as argument when navigating to this view. It fetches
   the coordinates of the person and dispaly the coordinates as a marker on the map */
getAdressFromPerson(person){

    this._mapService.getGeoCode(person.visiting_address,Location_type.street_address)
      .subscribe(res => {
          if(res[0]!==undefined){
            var coordinate_lat = res[0].latitude;
            var coordinate_lng = res[0].longitude;
            this.mapCenter = new L.LatLng(coordinate_lat, coordinate_lng);
            this.centerOnMarker();
            this.currentDestination = L.marker([coordinate_lat,coordinate_lng],{
              icon: L.icon({
                                iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
                                shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png'),
                                iconAnchor:[12,6]
                            })
              })
              .addTo(this.map)
            //If room number exists then print it in popup otherwise not.
              this.currentDestination.bindPopup(`<strong> ${person.given_name} ${person.family_name} </strong>
                <br> ${res[0].streetAddress}`)
              .openPopup();
          }else{
            this.showError=true;
            setTimeout(() => {this.showError=false;},3000);
          }
    },error=>console.log("error"));
  }

//Centers the map on the default coordinates.
centerOnMarker(){
  this.map.setView(this.mapCenter, this.map.getZoom(), {animate: true});
  }

}
