 import { Injectable } from "angular2/core";
 import {Http} from 'angular2/http';

@Injectable()

export class EmailService {

	constructor(private _http:Http){}

  sendEmail() {
		var url = "https://api.mailgun.net/v3/sandboxc60b026f4c8d4da89504b8fd824292ad.mailgun.org";
    var hej = {
      from : "hejhejhej",
      to : "emil.g.persson@gmail.com",
      subject : "test",
      text : "aiheoiwhoiehowihroiw",
    };


    this._http.post(url, JSON.stringify(hej));



    /* https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0@api.mailgun.net/v3/samples.mailgun.org/log */

  }

}



/*

-s, --silent

Silent or quiet mode. Don't show progress meter or error messages. Makes Curl mute.
It will still output the data you ask for, potentially even to the terminal/stdout unless you redirect it.


curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
    -F from='Excited User <mailgun@YOUR_DOMAIN_NAME>' \
    -F to=YOU@YOUR_DOMAIN_NAME \
    -F to=bar@example.com \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomness!'
*/
