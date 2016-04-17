import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import "rxjs/add/operator/map";
import {LatLngBounds} from 'leaflet';
import {Location,Location_type} from '../location.interface';
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
							floor: item.floor,
							location_type: Location_type.kth_places
						});
					}
				})
				return searchResult;
			}
      	);
	}

	getGeoCode(address:string,location_type:Location_type){
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
										floor: null,
										location_type: location_type
          				});
									console.log(searchResult);

            		}
         		 });
          		return searchResult;
        	});
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
				var regexp = new RegExp('handen|kista')
				var added = [];
				res.children.forEach(item=>{
					var exists=false;
					added.forEach( dep =>{
						if(item.name_sv===dep){
							exists=true;
						}
					})
					added.push(item.name_sv);
					if(exists===false && item.address!==null && regexp.test(item.address.toLowerCase())===false){
						departments.push(item);
					}

				})
				console
				return departments;
			})
	}
}
