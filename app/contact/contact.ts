import {Component} from 'angular2/core'
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators, AbstractControl} from 'angular2/common'
import { EmailService } from './email.service';
import "rxjs/add/operator/map";

@Component({
  selector: 'contact',
  templateUrl: 'app/contact/contact.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [EmailService],
})

export class Contact {


  public captchaA: number;
  public captchaB: number;
  public captchaAnswer: number;
  captchaValid: boolean;
  messageSent: boolean;
  msgCtrl: Control;
  emailCtrl: Control;
  nameCtrl: Control;
  captchaCtrl: Control;
  error: boolean;
  form: ControlGroup;

constructor(private _emailService: EmailService, private builder: FormBuilder) {
  this.createForm();
  this.captchaInit();
 }

 public email = {fromName: "", message: "", fromEmail: ""};

createForm() {
  this.error = false;
  this.msgCtrl = new Control('', Validators.minLength(10));
  this.emailCtrl = new Control('', EmailValidator.mailFormat);
  this.nameCtrl = new Control('', Validators.required);
  this.captchaCtrl = new Control('', Validators.required);

  this.form = this.builder.group({
     msgCtrl: this.msgCtrl,
     emailCtrl: this.emailCtrl,
     nameCtrl: this.nameCtrl,
     captchaCtrl: this.captchaCtrl
   });
}

captchaInit() {
  this.captchaAnswer = null;
  this.captchaValid = false;
  this.captchaA = Math.floor(Math.random() * 5) + 1;
  this.captchaB = Math.floor(Math.random() * 5) + 1;
}

captchaCheck() {
  if(this.captchaAnswer == (this.captchaA + this.captchaB)) {
    this.captchaValid = true;
  }
}

reset() {
  this.createForm();
  this.email.fromName = "";
  this.email.message = "";
  this.email.fromEmail = "";
  this.captchaInit();
  setTimeout(() => {
    this.messageSent = false;
  }, 2000);
}

showForm:boolean = true;
onSubmit(fromName, fromEmail, message) {
   // INSERT CAPTCHA HERE
   this.captchaCheck();
   if(this.captchaValid) {
   console.log("Mail from: " + fromEmail + "\nName: " + fromName + "\nMessage: " + message);
   this._emailService.sendEmail(fromName, fromEmail, message).map(res=>res).subscribe(res=>console.log(res),error=>{console.log(error), this.error = true
   },()=>{console.log("apa"), this.error = false, this.messageSent = true, this.showForm = false,
   setTimeout(() => {
     this.reset()
     this.showForm = true;
   });
});

  } else {
    this.error = true;
  }
}

}

interface ValidationResult {
  [key:string]:boolean
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
