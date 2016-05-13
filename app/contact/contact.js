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
var common_1 = require('@angular/common');
var email_service_1 = require('./email.service');
require("rxjs/add/operator/map");
var Contact = (function () {
    function Contact(emailService, builder) {
        this.emailService = emailService;
        this.builder = builder;
        this.email = { fromName: "", message: "", fromEmail: "" };
        this.showForm = true;
        this.createForm();
        this.captchaInit();
    }
    Contact.prototype.createForm = function () {
        this.error = false;
        this.msgCtrl = new common_1.Control('', common_1.Validators.minLength(10));
        this.emailCtrl = new common_1.Control('', EmailValidator.mailFormat);
        this.nameCtrl = new common_1.Control('', common_1.Validators.required);
        this.captchaCtrl = new common_1.Control('', common_1.Validators.required);
        this.form = this.builder.group({
            msgCtrl: this.msgCtrl,
            emailCtrl: this.emailCtrl,
            nameCtrl: this.nameCtrl,
            captchaCtrl: this.captchaCtrl
        });
    };
    Contact.prototype.captchaInit = function () {
        this.captchaAnswer = null;
        this.captchaValid = false;
        this.captchaA = Math.floor(Math.random() * 5) + 1;
        this.captchaB = Math.floor(Math.random() * 5) + 1;
    };
    Contact.prototype.captchaCheck = function () {
        if (this.captchaAnswer == (this.captchaA + this.captchaB)) {
            this.captchaValid = true;
        }
    };
    Contact.prototype.reset = function () {
        var _this = this;
        this.createForm();
        this.email.fromName = "";
        this.email.message = "";
        this.email.fromEmail = "";
        this.captchaInit();
        setTimeout(function () {
            _this.messageSent = false;
        }, 2000);
    };
    Contact.prototype.onSubmit = function (fromName, fromEmail, message) {
        var _this = this;
        // INSERT CAPTCHA HERE
        this.captchaCheck();
        if (this.captchaValid) {
            this.emailService.sendEmail(fromName, fromEmail, message)
                .map(function (res) { return res; })
                .subscribe(function (res) { return console.log(res); }, function (error) { console.log(error), _this.error = true; }, function () {
                _this.error = false, _this.messageSent = true, _this.showForm = false,
                    setTimeout(function () {
                        _this.reset();
                        _this.showForm = true;
                    });
            });
        }
        else {
            this.error = true;
        }
    };
    Contact = __decorate([
        core_1.Component({
            selector: 'contact',
            templateUrl: 'app/contact/contact.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            providers: [email_service_1.EmailService],
        }), 
        __metadata('design:paramtypes', [email_service_1.EmailService, common_1.FormBuilder])
    ], Contact);
    return Contact;
}());
exports.Contact = Contact;
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.mailFormat = function (control) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
            return { "isInCorrectEmail": true };
        }
        return null;
    };
    return EmailValidator;
}());
//# sourceMappingURL=contact.js.map