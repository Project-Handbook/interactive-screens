System.register(['angular2/core', 'angular2/router', '../constants', '../screen-specific-information'], function(exports_1, context_1) {
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
    var core_1, router_1, constants_1, screen_specific_information_1;
    var SetupProcess;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (screen_specific_information_1_1) {
                screen_specific_information_1 = screen_specific_information_1_1;
            }],
        execute: function() {
            SetupProcess = (function () {
                function SetupProcess(router) {
                    this.router = router;
                }
                SetupProcess.prototype.submitInformation = function () {
                    if (!this.validateInputs()) {
                        return;
                    }
                    // Gather input
                    console.log(this.title, this.address, this.telephoneNumber);
                    var screenInfo = new screen_specific_information_1.ScreenSpecificInformation(this.title, this.address, this.telephoneNumber);
                    // Save the screen information in the session storage for use by all of the app
                    sessionStorage.setItem(constants_1.Constants.SETUP_PROCESS_KEY, JSON.stringify(screenInfo));
                    this.router.navigate(['Home']);
                };
                // Validates that all the required fields in the setup process contain data
                SetupProcess.prototype.validateInputs = function () {
                    // TODO: Implement
                    return true;
                };
                SetupProcess = __decorate([
                    core_1.Component({
                        selector: 'setup-process',
                        templateUrl: 'app/setup-process/setup-process.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], SetupProcess);
                return SetupProcess;
            }());
            exports_1("SetupProcess", SetupProcess);
        }
    }
});
//# sourceMappingURL=setup-process.js.map