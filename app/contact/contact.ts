import { Component } from '@angular/core'
import { CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators, AbstractControl } from '@angular/common'
import { EmailService } from './email.service';
import "rxjs/add/operator/map";

@Component({
  selector: 'contact',
  templateUrl: 'app/contact/contact.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [EmailService],
})

export class Contact {
  // Variable initializations
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

  // Constructor, initializes a EmailService and FormBuilder object for later use
  // Creates the form and initializes the captcha
  constructor(private emailService: EmailService, private builder: FormBuilder) {
    this.createForm();
    this.captchaInit();
  }
  
  // This is the object that will be used to send the emails to RT
  public email = {fromName: "", message: "", fromEmail: ""};
  
  // Method for creating the email form and its validators.
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

  // Method for initializing and reseting the captcha.
  captchaInit() {
    this.captchaAnswer = null;
    this.captchaValid = false;
    this.captchaA = Math.floor(Math.random() * 5) + 1;
    this.captchaB = Math.floor(Math.random() * 5) + 1;
  }
  
  // Method for checking if the submitted captcha is valid.
  captchaCheck() {
    if (this.captchaAnswer == (this.captchaA + this.captchaB)) {
      this.captchaValid = true;
    }
  }

  // Method for reseting the form and re-initializing the captcha.
  // A workaround for clearing the form had to be done here, it replaces the old form with a new one.
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

  // The submit method. Sends the mail containing the forms attributes.
  showForm: boolean = true;
  onSubmit(fromName, fromEmail, message) {
     // First checks if the captcha is valid
    this.captchaCheck();
    // If it is, send the forms attributes to the EmailService service
    if (this.captchaValid) {
    this.emailService.sendEmail(fromName, fromEmail, message)
      .map(res => res)
      // If Mailgun responds with an error, log the error and set error to true.
      .subscribe(res => console.log(res), error => { 
        console.log(error), this.error = true 
      },
      // Below is what will happen if Mailgun responds with a 200 OK response.
      // It then resets the form and sets error to false.
      () => { 
        this.error = false, this.messageSent = true, this.showForm = false,
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

// Below is the custom Email Validator to check if the supplied email is a valid one (using RegEX)
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
