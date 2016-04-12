 import { Injectable } from "angular2/core";
 import {Http,Headers} from 'angular2/http';

@Injectable()

export class EmailService {

	constructor(private _http:Http){}

  sendEmail(reciever, message) {
    var headers = new Headers(); 
    headers.append("Authorization": "Basic "+btoa("api:key-5164d1f0b491719c50e103020764205a")
    headers.append("content-type": "application/x-www-form-urlencoded");
		var url = "https://api.mailgun.net/v3/sandbox34e0d52fd37247abab5dbe90b52e2e71.mailgun.org/messages";
    var data = "from=Jakob<jakob.svenning@gmail.com>&to=FittEmil<jaksve@kth.se>&subject=Hungdaddy&text=testing";
    return this._http.post(url,data, {headers: headers});
    /* https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0@api.mailgun.net/v3/samples.mailgun.org/log */
  }
}
