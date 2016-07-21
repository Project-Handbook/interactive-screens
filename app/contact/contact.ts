import { Component } from '@angular/core'
import {ValidatorFn,AbstractControl,FORM_DIRECTIVES,FormBuilder,FormGroup,Validators, REACTIVE_FORM_DIRECTIVES,FormControl} from '@angular/forms';
import { EmailService } from './email.service';
import "rxjs/add/operator/map";

@Component({
  selector: 'contact',
  templateUrl: 'app/contact/contact.html',
  directives: [FORM_DIRECTIVES,REACTIVE_FORM_DIRECTIVES],
  providers: [EmailService],
})
export class Contact {
  // Variable initializations
  captchaA: number;
  captchaB: number;
  messageSentSuccess: boolean;
  messageSentError: boolean;
  emailForm:FormGroup;

  // Constructor, initializes a EmailService and FormBuilder object for later use
  // Creates the form and initializes the captcha
  constructor(private emailService: EmailService, private fb: FormBuilder) {
    this.captchaInit();
    this.emailForm = fb.group({
      'message' : ['',Validators.compose([Validators.required,Validators.minLength(10)])],
      'email' : ['',Validators.compose([Validators.required,this.emailValidator])],
      'name' : ['',Validators.required],
      'captcha' : ['',this.captchaValidator()]
    });
  }

captchaValidator():ValidatorFn {
  return (control:FormControl):{[key:string]:boolean}=>{
    if(control.value==this.captchaA+this.captchaB){
      return null;
    }else{
      return {invalidCaptcha: true};
    }
  }
}
emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i)) {
      return {invalidEmail: true};
    }else{
      return null;
    }
}
// Method for initializing and reseting the captcha.
captchaInit() {
  this.captchaA = Math.floor(Math.random() * 5) + 1;
  this.captchaB = Math.floor(Math.random() * 5) + 1;
}
  // Method for reseting the form and re-initializing the captcha.
  reset(form:any){
    this.captchaInit();
    Object.keys(form.controls).forEach(control=>{
      form.controls[control].updateValue('');
      form.controls[control].setErrors(null);
      form.controls[control]['_touched'] = false;
    })
  }
  // The submit method. Sends the mail containing the forms attributes.
  onSubmit(form:any) {
    this.emailService.sendEmail(form.value.name.toString(),form.value.email.toString(),form.value.message.toString())
      .map(res => res)
      // If Mailgun responds with an error, log the error and set error to true.
      .subscribe(
                res => {},
                error => {
                      this.messageSentError = true
                      this.reset(form);
                      setTimeout(()=>{this.messageSentError=false},3000);
                      },
      // Below is what will happen if Mailgun responds with a 200 OK response.
      // It then resets the form and sets error to false.
                () => {
                    this.messageSentSuccess=true;
                    this.reset(form);
                    setTimeout(()=>{this.messageSentSuccess=false},3000);
                    }
      );
  }
}
