System.register(["angular2/core", 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var EmailService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            EmailService = (function () {
                function EmailService(_http) {
                    this._http = _http;
                }
                EmailService.prototype.sendEmail = function (fromName, fromEmail, message) {
                    var headers = new http_1.Headers();
                    var recieverName = "CSC Skolan";
                    var recieverMail = "emil.g.persson@gmail.com";
                    var subject = "Errand";
                    headers.append("Authorization", "Basic " + btoa("api:key-5164d1f0b491719c50e103020764205a"));
                    headers.append("content-type", "application/x-www-form-urlencoded");
                    var url = "https://api.mailgun.net/v3/sandbox34e0d52fd37247abab5dbe90b52e2e71.mailgun.org/messages";
                    var data = "from=" + fromName + "<" + fromEmail + ">&to=" + recieverName + "<" + recieverMail + ">&subject=" + subject + "&text=" + message;
                    return this._http.post(url, data, { headers: headers });
                    /* https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0@api.mailgun.net/v3/samples.mailgun.org/log */
                };
                EmailService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], EmailService);
                return EmailService;
            }());
            exports_1("EmailService", EmailService);
        }
    }
});
//# sourceMappingURL=email.service.js.map