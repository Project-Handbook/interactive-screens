import { Injectable }    from "@angular/core";
import { Http, Headers } from '@angular/http';

@Injectable()
export class EmailService {

  // Initializes an Http object to send a POST request to the Mailgun API
  constructor(private http: Http) {}

  // Method for sending the users email. Uses an HTTP-POST request to the Mailgun API with the supplied attributes.
  sendEmail(fromName, fromEmail, message) {
    var headers = new Headers();
    var recieverName = "CSC Service"
    var recieverMail = "service@csc.kth.se"
    var subject = "error report submitted by interactive screen"
    headers.append("Authorization", "Basic "+btoa("api:key-5164d1f0b491719c50e103020764205a"));
    headers.append("content-type", "application/x-www-form-urlencoded");
    var url = "https://api.mailgun.net/v3/sandbox34e0d52fd37247abab5dbe90b52e2e71.mailgun.org/messages";
    var data = "from="+fromName+"<"+fromEmail+">&to="+recieverName+"<"+recieverMail+">&subject="+subject+"&text="+message;
    return this.http.post(url,data, {headers: headers});
  }
}
