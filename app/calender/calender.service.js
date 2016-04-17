System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var CalenderService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            CalenderService = (function () {
                function CalenderService(_http) {
                    this._http = _http;
                    this.answer = [];
                }
                //Fetches the current events from csc service centers calender and returns each calender event as an object
                CalenderService.prototype.getCalender = function () {
                    var _this = this;
                    this.eventInfo = { "date_published": "", "summary": "", "description": "", "location": "", "start": "", "end": "" };
                    var url = "https://www.kth.se/csc/aktuellt/kalender?v=iCal&c=all";
                    this._http.get(url)
                        .map(function (res) { return res; })
                        .subscribe(function (res) {
                        console.log(res);
                        var y = res._body.replace(/(\s\s\s|\\n)/g, "");
                        y = y.replace(/\\,/g, ",");
                        //var y = res._body.split('');
                        //y.forEach(function(entry) {
                        //	 console.log(entry);
                        //});
                        console.log(y);
                        var myregex = new RegExp("BEGIN:VEVENT");
                        var events = y.split(myregex);
                        events.splice(0, 1); //Remove first item in list becuase it is not a an event.
                        events.forEach(function (item) {
                            _this.eventInfo = { "date_published": "", "summary": "", "description": "", "location": "", "start": "", "end": "" };
                            myregex = new RegExp("(DTSTAMP:|SUMMARY:|DESCRIPTION:|LOCATION:|"
                                + "DTSTART;TZID=|DTEND;TZID=|UID:|TZID:)");
                            var calenderEvent = item.split(myregex);
                            //	console.log(calenderEvent);
                            calenderEvent.splice(0, 1);
                            //console.log(calenderEvent);
                            //console.log(calenderEvent.length);
                            for (var i = 0; i < calenderEvent.length; i++) {
                                var n = calenderEvent.splice(0, 1);
                                //console.log(n);
                                switch (String(n)) {
                                    case "DTSTAMP:":
                                        _this.eventInfo.date_published = String(calenderEvent.splice(0, 1));
                                        break;
                                    case "SUMMARY:":
                                        _this.eventInfo.summary = String(calenderEvent.splice(0, 1));
                                        break;
                                    case "DESCRIPTION:":
                                        _this.eventInfo.description = String(calenderEvent.splice(0, 1));
                                        break;
                                    case "LOCATION:":
                                        _this.eventInfo.location = String(calenderEvent.splice(0, 1));
                                        break;
                                    case "DTSTART;TZID=":
                                        var x = String(calenderEvent.splice(0, 1)).split('T');
                                        var y = x[0].split(':');
                                        _this.eventInfo.start = y[1] + " - " + x[1];
                                        break;
                                    case "DTEND;TZID=":
                                        var x = String(calenderEvent.splice(0, 1)).split('T');
                                        var y = x[0].split(':');
                                        _this.eventInfo.end = y[1] + " - " + x[1];
                                        break;
                                    default:
                                        console.log("not found");
                                }
                            }
                            console.log(_this.eventInfo);
                            _this.answer.push(_this.eventInfo);
                        });
                    }, function (error) { return console.log(error); }, function () { return console.log('OK Calender'); });
                    return this.answer;
                };
                CalenderService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CalenderService);
                return CalenderService;
            }());
            exports_1("CalenderService", CalenderService);
        }
    }
});
//# sourceMappingURL=calender.service.js.map