System.register(['angular2/core', 'angular2/router', '../constants', '../screen-specific-information', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, constants_1, screen_specific_information_1, common_1;
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
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SetupProcess = (function () {
                function SetupProcess(router) {
                    this.router = router;
                    this.screenInfo = new screen_specific_information_1.ScreenSpecificInformation();
                    // Input - need to add this the the list
                    this.newDepartment = "";
                    // User selected department
                    this.selectedDepartment = "";
                    // List of user created departments
                    this.departments = [];
                }
                // Stores the ScreenSpecificInformation object
                SetupProcess.prototype.saveInformation = function () {
                    if (!this.validateInputs(this.screenInfo)) {
                        return;
                    }
                    this.screenInfo.departments = this.departments;
                    // Save the screen information in the session storage for use by all of the app
                    localStorage.setItem(constants_1.Constants.SETUP_PROCESS_KEY, JSON.stringify(this.screenInfo));
                    this.router.navigate(['Home']);
                };
                // Reads the stored ScreenSpecificInformation object
                SetupProcess.prototype.loadInformation = function () {
                    this.screenInfo = JSON.parse(localStorage.getItem(constants_1.Constants.SETUP_PROCESS_KEY));
                };
                // Validates that all the required fields in the setup process contain data
                SetupProcess.prototype.validateInputs = function (screenInfo) {
                    // TODO: Implement
                    return true;
                };
                SetupProcess.prototype.addDepartment = function () {
                    this.departments.push(this.newDepartment);
                };
                SetupProcess = __decorate([
                    core_1.Component({
                        selector: 'setup-process',
                        directives: [common_1.NgClass],
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