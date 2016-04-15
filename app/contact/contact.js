System.register(['angular2/core', 'angular2/common', './email.service', "rxjs/add/operator/map"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, email_service_1;
    var dropDownValue, Contact, EmailValidator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (email_service_1_1) {
                email_service_1 = email_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            dropDownValue = (function () {
                function dropDownValue() {
                }
                return dropDownValue;
            }());
            Contact = (function () {
                function Contact(_emailService, builder) {
                    this._emailService = _emailService;
                    this.builder = builder;
                    this.email = { message: "", fromEmail: "" };
                    this.error = false;
                    this.msgCtrl = new common_1.Control('', common_1.Validators.minLength(10));
                    this.emailCtrl = new common_1.Control('', EmailValidator.mailFormat);
                    this.form = builder.group({
                        msgCtrl: this.msgCtrl,
                        emailCtrl: this.emailCtrl
                    });
                }
                Contact.prototype.onSubmit = function (fromEmail, message) {
                    var _this = this;
                    console.log("Mail from: " + fromEmail + "\nMessage: " + message);
                    this._emailService.sendEmail(fromEmail, message).map(function (res) { return res; }).subscribe(function (res) { return console.log(res); }, function (error) {
                        console.log(error), _this.error = true;
                    }, function () { console.log("apa"), _this.error = false; });
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
            exports_1("Contact", Contact);
            EmailValidator = (function () {
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
        }
    }
});
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
//# sourceMappingURL=contact.js.map