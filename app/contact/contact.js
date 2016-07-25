"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var email_service_1 = require('./email.service');
require("rxjs/add/operator/map");
var Contact = (function () {
    // Constructor, initializes a EmailService and FormBuilder object for later use
    // Creates the form and initializes the captcha
    function Contact(emailService, fb) {
        this.emailService = emailService;
        this.fb = fb;
        this.captchaInit();
        this.emailForm = fb.group({
            'message': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(10)])],
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, this.emailValidator])],
            'name': ['', forms_1.Validators.required],
            'captcha': ['', this.captchaValidator()]
        });
    }
    Contact.prototype.captchaValidator = function () {
        var _this = this;
        return function (control) {
            if (control.value == _this.captchaA + _this.captchaB) {
                return null;
            }
            else {
                return { invalidCaptcha: true };
            }
        };
    };
    Contact.prototype.emailValidator = function (control) {
        if (!control.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i)) {
            return { invalidEmail: true };
        }
        else {
            return null;
        }
    };
    // Method for initializing and reseting the captcha.
    Contact.prototype.captchaInit = function () {
        this.captchaA = Math.floor(Math.random() * 5) + 1;
        this.captchaB = Math.floor(Math.random() * 5) + 1;
    };
    // Method for reseting the form and re-initializing the captcha.
    Contact.prototype.reset = function (form) {
        this.captchaInit();
        Object.keys(form.controls).forEach(function (control) {
            form.controls[control].updateValue('');
            form.controls[control].setErrors(null);
            form.controls[control]['_touched'] = false;
        });
    };
    // The submit method. Sends the mail containing the forms attributes.
    Contact.prototype.onSubmit = function (form) {
        var _this = this;
        this.emailService.sendEmail(form.value.name.toString(), form.value.email.toString(), form.value.message.toString())
            .map(function (res) { return res; })
            .subscribe(function (res) { }, function (error) {
            _this.messageSentError = true;
            _this.reset(form);
            setTimeout(function () { _this.messageSentError = false; }, 3000);
        }, 
        // Below is what will happen if Mailgun responds with a 200 OK response.
        // It then resets the form and sets error to false.
        function () {
            _this.messageSentSuccess = true;
            _this.reset(form);
            setTimeout(function () { _this.messageSentSuccess = false; }, 3000);
        });
    };
    Contact = __decorate([
        core_1.Component({
            selector: 'contact',
            templateUrl: 'app/contact/contact.html',
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
            providers: [email_service_1.EmailService],
        }), 
        __metadata('design:paramtypes', [email_service_1.EmailService, forms_1.FormBuilder])
    ], Contact);
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map