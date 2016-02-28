import {Component} from 'angular2/core';
//import { EmailService } from './email.service.ts';

@Component({
  selector: 'contact',
  templateUrl: 'app/contact/partial_contact.html',
//  providers: [EmailService],

})
export class Contact {
  public email = {message: "", reciever: ""};
  public subject = "General contact";


  onSubmit(reciever, subject, message) {
    console.log("Mail to: " + reciever + "\n Subject: " + subject + "\nMessage: " + message);
  }

  changeSubject(subject){
    if (subject === 1) {
      this.subject = "Booking"
    }
    else if (subject === 2) {
      this.subject = "Error report"
    }
    else {
      this.subject = "General contact"
    }

  }
}
