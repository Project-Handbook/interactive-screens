import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import { EmailService } from './email.service';
import "rxjs/add/operator/map";

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

  msgCtrl: Control;
  emailCtrl: Control;
  nameCtrl: Control;
  error: boolean;
  form: ControlGroup;

constructor(private _emailService: EmailService, private builder: FormBuilder) {
  this.error = false;
  this.msgCtrl = new Control('', Validators.minLength(10));
  this.emailCtrl = new Control('', EmailValidator.mailFormat);
  this.nameCtrl = new Control('', Validators.required);
  this.form = builder.group({
     msgCtrl: this.msgCtrl,
     emailCtrl: this.emailCtrl,
     nameCtrl: this.nameCtrl,
   });
 }


 public email = {fromName: "", message: "", fromEmail: ""};

 onSubmit(fromName, fromEmail, message) {

   console.log("Mail from: " + fromEmail + "\nName: " + fromName + "\nMessage: " + message);
   this._emailService.sendEmail(fromName, fromEmail, message).map(res=>res).subscribe(res=>console.log(res),error=>{console.log(error), this.error = true
   },()=>{console.log("apa"),this.error = false});
 }

}


 interface ValidationResult {
  [key:string]:boolean;
 }

 class EmailValidator {

  static mailFormat(control: Control): ValidationResult {

  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
      return { "isInCorrectEmail": true };
    }

    return null;

  }

 }








/*  public dropDownValues: dropDownValue[] = [
        { "id": 1, "name": "Where am i?", "info": "You are at Lindstedsvägen 4" },
        { "id": 2, "name": "heee", "info": "DU kan lämna skit här" },
        { "id": 3, "name": "Whats the clock?", "info": "Tiden är 13.37" },
        { "id": 4, "name": "Where are CSC's departments located?", "info": "CSC's departments are located at Lindstedsvägen 3 & 5 and Osquars backe 18."}
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
*/
