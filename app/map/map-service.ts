import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import "rxjs/add/operator/map";
import {LatLngBounds} from 'leaflet';
import {Location} from './location.interface';

@Injectable()

export class MapService{
	
	constructor(private _http:Http){}
	//Fetches all locations from KTH Places that matches the given search string.
	getPlaces(term:string){
		var searchResult:Array<Location>=[];
		var url = "https://www.kth.se/api/places/v3/search/room?q=" + term.toLowerCase() + "&api_key=lkjashd(%26*0987-7-0Ujuhdhj4HGRESDs";
		return this._http.get(url)
			.map(res => res.json())
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
          					latitude: item.geometry.lat,
          					longitude: item.geometry.lng,
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
}
