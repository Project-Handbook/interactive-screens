 import { Injectable } from "angular2/core";
 import {Http} from 'angular2/http';

@Injectable()

export class EmailService {

	constructor(private _http:Http){}

  sendEmail(reciever, message) {
		var url = "https://api.mailgun.net/v3/sandboxc60b026f4c8d4da89504b8fd824292ad.mailgun.org";
    var mail = {
      from : "CSCreen",
      to : reciever,
      subject : "Reported problem at CSCreen"
      text : message,
    };


  return this._http.post(url, JSON.stringify(mail));

    /* https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0@api.mailgun.net/v3/samples.mailgun.org/log */

  }

}
