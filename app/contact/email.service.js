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
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var EmailService = (function () {
    // Initializes an Http object to send a POST request to the Mailgun API
    function EmailService(http) {
        this.http = http;
    }
    // Method for sending the users email. Uses an HTTP-POST request to the Mailgun API with the supplied attributes.
    EmailService.prototype.sendEmail = function (fromName, fromEmail, message) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('EMAIL_API_KEY')).key));
        headers.append("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        var recieverMail = "service@csc.kth.se";
        var subject = "error report submitted by interactive screen";
        var recieverName = "CSC SERVICE";
        var url = "https://api.mailgun.net/v3/sandbox34e0d52fd37247abab5dbe90b52e2e71.mailgun.org/messages";
        var body = "from=" + fromName + "<" + fromEmail + ">&to=" + recieverName + "<" + recieverMail + ">&subject=" + subject + "&text=" + message;
        return this.http.post(url, body, { headers: headers });
    };
    EmailService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map