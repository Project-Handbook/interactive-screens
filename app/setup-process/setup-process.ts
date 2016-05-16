import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Constants } from '../constants';
import { ScreenSpecificInformation } from '../screen-specific-information';
import { NgClass } from '@angular/common';
import { MapService } from '../map/services/map-service';

@Component({
  selector: 'setup-process',
  directives: [NgClass],
  templateUrl: 'app/setup-process/setup-process.html',
  providers: [MapService]
})
export class SetupProcess {
  //Leaflet map object
  map: L.Map;
  // Localstorage configuration object
  public screenInfo = new ScreenSpecificInformation();

  constructor(private router: Router, private mapService: MapService) {}

  // Stores the ScreenSpecificInformation object and navigates to /home.
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
    this.updateMapMarker(this.screenInfo.longitude, this.screenInfo.latitude);
  }

  // Validates that all the required fields in the setup process contain data
  private validateInputs(screenInfo: ScreenSpecificInformation): boolean {
    // TODO: Implement
    return true
  }

  // Input - need to add this the the list
  public newDepartment: string = ""
  // List of user created departments
  public departments: Array<string> = []

  addDepartment() {
    this.departments.push(this.newDepartment);
  }

  removeDepartment() {
    var index: number = this.departments.indexOf(this.screenInfo.nearest_department);
    this.departments.splice(index, 1);
  }

  // Leaflet Marker Object which shows the current selected position on the map
  private currentMapMarker: L.Marker;

  ngOnInit(){
    //Checks if localstorage object exists and saves the object to screenInfo(if it exists).
    if(localStorage.getItem(Constants.SETUP_PROCESS_KEY)!==null){
      this.screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
    }
    //Initialize leaflet map
    this.map = new L.Map('map', {
         zoomControl: false,
         center: new L.LatLng(59.3469417, 18.0702413), // Center on KTH
         zoom: 15,
         minZoom: 4,
         maxZoom: 18,
         zoomAnimation: false,
         doubleClickZoom: false
    });
    //Choose map layer
    var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
           attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team<br><br>'
         }).addTo(this.map);
    // Add zoom control buttons
    var zoomControl = L.control.zoom({
           position: 'topright'
         }).addTo(this.map);
    // Every time the map is clicked, the coordinates are saved.
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      var longitude = event.latlng.lng;
      var latitude = event.latlng.lat;
      this.screenInfo.latitude = latitude;
      this.screenInfo.longitude = longitude;
      this.updateMapMarker(longitude, latitude);
    });
    //Disable pinch zoom
    this.map.touchZoom.disable();
    //Fetches all schools at KTH from local schools.json file.
    this.getSchools();
  }
  //Updates the marker on the laeflet map
  updateMapMarker(longitude: number, latitude: number) {
    if (this.currentMapMarker != null) {
      this.map.removeLayer(this.currentMapMarker); // Remove old marker
    }
    // Add a new marker at the location of the screen
    this.currentMapMarker = L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup('<b>You are here.</b>').openPopup();
  }
  // Holds all schools fetched from getSchools.
  schools: Array<any> = [];
  //Fetches all schools at KTH from a local school.json file
  getSchools() {
    this.mapService.getSchools().subscribe(res => {this.schools = res});
  }
  // Holds all departments from getDepartments.
  department_list: Array<any> = [];

  //Fetches the departments of the school passed as argument
  getDepartments(department) {
    this.mapService.getDepartments(this.schools[department].code).subscribe(res => {
      this.department_list = res;
    })
    //Updates the footer text depending on the choosen school.
    this.screenInfo.footer_text = this.schools[department].footer_text;
  }

  public weekdays: Array<string> = ['monday', 'tuesday', 'wednesday', 'thursday',
                                    'friday', 'saturday', 'sunday'];

  // Toggle if opening hours feature is used or not.
  toggleOpeningHours() {
      this.screenInfo.opening_hours_enabled = !this.screenInfo.opening_hours_enabled;
  }

  // Toggles opening hours for the specific day
  toggleOpeningHoursDay(day: string) {
    this.screenInfo.opening_hours[day][2] = !this.screenInfo.opening_hours[day][2];
  }

  //Set the department attributes of screenInfo object
  setDepartment(index){
    this.screenInfo.department_code = this.department_list[index].code;
    this.screenInfo.department_name = this.department_list[index].name_sv;
  }
}
