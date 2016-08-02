import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LatLngBounds } from 'leaflet';
import { Observable} from 'rxjs/Observable'
import { Location, Location_type } from '../location.interface';
// See schools.json for more
export class School {
  constructor(public name: string, /* Short codename for the school (CSC) */
              public code: string, /* Unique identifier */
              public footer_text: string) /* School's fullname */ {}
}

@Injectable()
export class MapService {

	constructor(private http: Http) {}

	// Fetches all locations from KTH Places that matches the given search string.
	getPlaces(term: string): Observable<Location[]> {
		var searchResult: Array<Location> = [];
		let url = "https://www.kth.se/api/places/v3/search/room?q=" + term.toLowerCase() + "&api_key=lkjashd(%26*0987-7-0Ujuhdhj4HGRESDs";
		return this.http.get(url)
			.map((request) => request.json())
			.map(res => {
				res.forEach(item => {
				// Only accept locations of certain types.
				if ((item.typeName === "Övningssal" || item.typeName === "Datorsal"
					|| item.typeName === "Hörsal" || item.typeName === "Seminarierum" || item.typeName === "Kontor")
					&& (item.placeName.length !== 0 || item.kthPopularName.length !==0)) {
					searchResult.push(
						{
							latitude: item.geoData.lat,
							longitude: item.geoData.long,
							buildingName: item.buildingName,
							roomCode: item.placeName,
							popular_name: item.kthPopularName,
							streetAddress: item.streetAddress,
							streetNumber: item.streetNumber,
							roomType: item.typeName,
							zipCode: item.zip,
							floor: item.floor,
							location_type: Location_type.kth_places
						});
					}
				})
				return searchResult;
			}
    );
	}
	//Fetches all locations from google geocoding API that matches the given search string.
	getGeoCode(address: string, location_type: Location_type): Observable<Location[]> {
		var searchResult: Array<Location> = [];
		return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'stockholm&bounds=59.328697, 18.036975|59.348656, 18.097400&components=country:SE')
			.map(res => res.json())
			.map(res => {
          		res.results.forEach((item) => {
								// Only accepts exact locations.
              	if(item.geometry.location_type !== "APPROXIMATE"){
              		searchResult.push(
          				{
          					latitude: item.geometry.location.lat,
          					longitude: item.geometry.location.lng,
	        					buildingName: null,
										roomCode: null,
										popular_name:null,
										streetAddress: item.formatted_address,
										streetNumber: null,
										roomType: null,
										zipCode: null,
										floor: null,
										location_type: location_type
          				});
            		}
         		 });
          		return searchResult;
        	});
	}

	// Fetches all schools of KTH from local schools.json.
	getSchools(){
    var s = require('../../schools.json');
    const newArray = s.slice();
    return newArray;
	}

	// Fetches all the departments of the school passed as argument.
	getDepartments(term: string): Observable<any[]> {
		var departments = [];
		return this.http.get("https://www.lan.kth.se/personal/api/orginfo?code=" + term)
			.map(res => res.json())
			.map(res => {
				var regexp = new RegExp('handen|kista')
				var added = [];
				// Removes dupplicates from the returned department list
				// Only adds departments of KTH Östermalm campus.
				res.children.forEach(item => {
					var exists = false;
					added.forEach(dep => {
						if(item.name_sv === dep){
							exists=true;
						}
					})
					added.push(item.name_sv);
					if(exists === false && item.address !== null && regexp.test(item.address.toLowerCase()) === false){
						departments.push(item);
					}
				})
				return departments;
			})
		}
	}
