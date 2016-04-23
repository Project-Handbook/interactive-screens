import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';
import { NgClass } from 'angular2/common';

@Component({
  selector: 'setup-process',
  directives: [NgClass],
  templateUrl: 'app/setup-process/setup-process.html'
})
export class SetupProcess {

  map: L.Map;
  public lat;
  public lng;
  public screenInfo = new ScreenSpecificInformation()

  constructor(private router: Router) {}

  // Stores the ScreenSpecificInformation object
  saveInformation() {
    if (!this.validateInputs(this.screenInfo)) { return; }
    this.screenInfo.departments = this.departments;
    // Save the screen information in the session storage for use by all of the app
    localStorage.setItem(Constants.SETUP_PROCESS_KEY, JSON.stringify(this.screenInfo));
    this.router.navigate(['Home']);
  }

  // Reads the stored ScreenSpecificInformation object
  loadInformation() {
    this.screenInfo = <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
  }

  // Validates that all the required fields in the setup process contain data
  private validateInputs(screenInfo: ScreenSpecificInformation): boolean {
    // TODO: Implement
    return true
  }

  // Input - need to add this the the list
  public newDepartment: string = ""
  // User selected department
  public selectedDepartment: string = ""
  // List of user created departments
  public departments: Array<string> = []

  addDepartment() {
    this.departments.push(this.newDepartment);
  }


  ngOnInit(){

    this.map = new L.Map('map', {
         zoomControl: false,
         center: new L.LatLng(59.3469417, 18.0702413),
         zoom: 15,
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
         //this.map.on('click', this.onMapClick);
         this.map.on('click', (event:L.LeafletMouseEvent) => {
                  this.lat=event.latlng.lat;
                  this.lng=event.latlng.lng;
        });
        this.map.touchZoom.disable();

  }



}
