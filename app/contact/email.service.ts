import { Injectable }    from "@angular/core";
import { Http, Headers } from '@angular/http';

@Injectable()
export class EmailService {

 constructor(private http: Http) {}

 sendEmail(fromName, fromEmail, message) {
   var headers = new Headers();
   var recieverName = "CSC Skolan"
   var recieverMail = "emil.g.persson@gmail.com"
   var subject = "Errand"
   headers.append("Authorization", "Basic "+btoa("api:key-5164d1f0b491719c50e103020764205a"));
   headers.append("content-type", "application/x-www-form-urlencoded");
   var url = "https://api.mailgun.net/v3/sandbox34e0d52fd37247abab5dbe90b52e2e71.mailgun.org/messages";
   var data = "from="+fromName+"<"+fromEmail+">&to="+recieverName+"<"+recieverMail+">&subject="+subject+"&text="+message;
   return this.http.post(url,data, {headers: headers});
   /* https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0@api.mailgun.net/v3/samples.mailgun.org/log */
 }
}
