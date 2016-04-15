System.register(['angular2/core', './calender.service'], function(exports_1, context_1) {
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
    var core_1, calender_service_1;
    var CalenderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (calender_service_1_1) {
                calender_service_1 = calender_service_1_1;
            }],
        execute: function() {
            CalenderComponent = (function () {
                function CalenderComponent(_calenderService) {
                    this._calenderService = _calenderService;
                }
                CalenderComponent.prototype.getCalender = function () {
                    this.answer = [];
                    this.answer = this._calenderService.getCalender();
                };
                //Initalize the calender
                CalenderComponent.prototype.ngOnInit = function () {
                    this.getCalender();
                };
                CalenderComponent = __decorate([
                    core_1.Component({
                        selector: 'calender',
                        template: "\n\t\t<h3>Calender</h3>\n\t\t<div *ngFor=\"#event of answer\" style=\"border-style: solid; width:60%; float:left; border-width:1px;\">\n\t\t\t<div style=\"margin-left:20px;\">\n\t\t\t\t<h3>{{event.summary}}</h3>\n\t\t\t\t<p>{{event.description}}</p>\n\t\t\t\t<p><b>Location: </b>{{event.location}}</p>\n\t\t\t\t<p><b>Start: </b>{{event.start}}</p>\n\t\t\t\t<p><b>End: </b>{{event.end}}</p>\n\t\t\t</div>\t\n\t\t</div>\t\n\t",
                        providers: [calender_service_1.CalenderService],
                    }), 
                    __metadata('design:paramtypes', [calender_service_1.CalenderService])
                ], CalenderComponent);
                return CalenderComponent;
            }());
            exports_1("CalenderComponent", CalenderComponent);
        }
    }
});
//# sourceMappingURL=calender.component.js.map