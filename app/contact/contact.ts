import {Component} from 'angular2/core';
import { EmailService } from './email.service';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';




class dropDownValue {
  id: number;
  name: string;
  info: string;
}
@Component({
  selector: 'contact',
  templateUrl: 'app/contact/contact.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [EmailService],
})
export class Contact {
  public dropDownValues: dropDownValue[] = [
        { "id": 1, "name": "Var är jag", "info": "Du är på lindstedsvägen 4" },
        { "id": 2, "name": "Ärende", "info": "DU kan lämna skit här" },
        { "id": 3, "name": "Vad är klockan", "info": "Tiden är 13.37" }
      ];
      public selectedValue: dropDownValue = this.dropDownValues[0];
      onSelect(valueID) {
          this.selectedValue = null;
          for (var i = 0; i < this.dropDownValues.length; i++)
          {
            if (this.dropDownValues[i].id == valueID) {
              this.selectedValue = this.dropDownValues[i];
            }
          }
      }
/*
  constructor(private _emailService: EmailService) {}

  public email = {message: "", reciever: ""};
  public subject = "General contact";


  onSubmit(reciever, subject, message) {
    console.log("Mail to: " + reciever + "\n Subject: " + subject + "\nMessage: " + message);
    this._emailService.sendEmail();
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

  */
}
