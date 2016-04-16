import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import "rxjs/add/operator/map";
import {LatLngBounds} from 'leaflet';
import {Location} from '../location.interface';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class MapService{
	
	constructor(private _http:Http){}
	//Fetches all locations from KTH Places that matches the given search string.
	getPlaces(term:string){
		var searchResult:Array<Location>=[];
		var url = "https://www.kth.se/api/places/v3/search/room?q=" + term.toLowerCase() + "&api_key=lkjashd(%26*0987-7-0Ujuhdhj4HGRESDs";
		return this._http.get(url)
			.map((request)  => request.json())
			.map(res => {
				res.forEach(item => {
				if ((item.typeName === "Övningssal" || item.typeName === "Datorsal"
					|| item.typeName === "Hörsal") && item.kthLokalkod.length !== 0) {
					searchResult.push(
						{
							latitude: item.geoData.lat,
							longitude: item.geoData.long,
							buildingName: item.buildingName,
							roomCode: item.kthLokalkod,
							streetAddress: item.streetAddress,
							streetNumber: item.streetNumber,
							roomType: item.typeName,
							zipCode: item.zip,
							floor: item.floor
						});
					}
				})
				return searchResult;
			}
      	);
	}

	getGeoCode(address:string){
		var searchResult:Array<Location>=[];
		return this._http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'stockholm&components=country:SE')
			.map(res => res.json())
			.map(res=>{
          		res.results.forEach(item=>{
              	if(item.geometry.location_type!=="APPROXIMATE"){
              		searchResult.push(
          				{
          					latitude: item.geometry.location.lat,
          					longitude: item.geometry.location.lng,
        					buildingName: null,
							roomCode: null,
							streetAddress: item.formatted_address,
							streetNumber: null,
							roomType: null,
							zipCode: null,
							floor: null
          				});
            		}
         		 })
          		return searchResult;
        	})
	}

	getSchools(){
		var schools=[];
		return this._http.get('app/map/schools.json')
			.map(res=>res.json())
			.map(res=>{
				res.forEach(item=>
				schools.push(item)
				)
				return schools;
			});
	}
	getDepartments(term:string){
		var departments=[];
		return this._http.get("https://www.lan.kth.se/personal/api/orginfo?code=" + term)
			.map(res=>res.json())
			.map(res=>{
				console.log(res);
				var regexp = new RegExp('handen|kista')
				res.children.forEach(item=>{
					console.log(item.address)
					if(item.address!==null && regexp.test(item.address.toLowerCase())===false){
						departments.push(item);
					}
				
				})
				return departments;
			})
	}
}
