import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import "rxjs/add/operator/map";
import {LatLngBounds} from 'leaflet';

@Injectable()

export class MapService{
	constructor(private _http:Http){}
	//Fetches all locations from KTH Places that matches the given search string.
	getPlaces(term:string){
		var url = "https://www.kth.se/api/places/v3/search/room?q=" + term.toLowerCase() + "&api_key=lkjashd(%26*0987-7-0Ujuhdhj4HGRESDs";
	 	return this._http.get(url).map(res => res.json());
	}

	getGeoCode(address:string){
		return this._http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address + ', stockholm')
			.map(res => res.json());
	}
}
