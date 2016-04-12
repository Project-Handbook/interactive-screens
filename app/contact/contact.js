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
    var dropDownValue, Contact;
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
                function Contact(_emailService) {
                    this._emailService = _emailService;
                    this.dropDownValues = [
                        { "id": 1, "name": "Where am i?", "info": "You are at Lindstedsvägen 4" },
                        { "id": 2, "name": "heee", "info": "DU kan lämna skit här" },
                        { "id": 3, "name": "Whats the clock?", "info": "Tiden är 13.37" },
                        { "id": 4, "name": "Where are CSC's departments located?", "info": "CSC's departments are located at Lindstedsvägen 3 & 5 and Osquars backe 18." }
                    ];
                    this.selectedValue = this.dropDownValues[0];
                    this.email = { message: "", reciever: "emil.g.persson@gmail.com" };
                }
                Contact.prototype.onSelect = function (valueID) {
                    this.selectedValue = null;
                    for (var i = 0; i < this.dropDownValues.length; i++) {
                        if (this.dropDownValues[i].id == valueID) {
                            this.selectedValue = this.dropDownValues[i];
                        }
                    }
                };
                Contact.prototype.onSubmit = function (reciever, message) {
                    console.log("Mail to: " + reciever + "\nMessage: " + message);
                    this._emailService.sendEmail(reciever, message).map(function (res) { return res; }).subscribe(function (res) { return console.log(res); }, function (error) { return console.log(error); });
                };
                Contact = __decorate([
                    core_1.Component({
                        selector: 'contact',
                        templateUrl: 'app/contact/contact.html',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [email_service_1.EmailService],
                    }), 
                    __metadata('design:paramtypes', [email_service_1.EmailService])
                ], Contact);
                return Contact;
            }());
            exports_1("Contact", Contact);
        }
    }
});
//# sourceMappingURL=contact.js.map