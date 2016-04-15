System.register(['angular2/core', './map-service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, map_service_1, common_1;
    var AutoCompleteComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            AutoCompleteComponent = (function () {
                function AutoCompleteComponent(_mapService, myElement) {
                    this._mapService = _mapService;
                    // Used for passing the selected argument from the dropdown menu to the map component
                    this.newLocation = new core_1.EventEmitter();
                    this.showErrorMessage = false;
                    this.query = '';
                    this.searchResult = [];
                    this.searchForLocation = true;
                    this.buttons = ["white", "blue"];
                    //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
                    this.elementRef = myElement;
                }
                //Fetches Places that matches the given search term. Only returns places of type Övningssal and Datorsal at the moment.
                AutoCompleteComponent.prototype.search = function (term) {
                    if (term.length > 1) {
                        if (this.searchForLocation === true) {
                            this.searchLocation(term);
                        }
                        else {
                            this.searchAddress(term);
                        }
                    }
                    else {
                        this.searchResult = [];
                    }
                    if (term.length === 0) {
                        this.showErrorMessage = false;
                    }
                };
                AutoCompleteComponent.prototype.searchLocation = function (term) {
                    var _this = this;
                    this.searchResult = [];
                    this._mapService.getPlaces(term)
                        .subscribe(function (res) {
                        return _this.searchResult = res;
                    }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                    ;
                };
                AutoCompleteComponent.prototype.searchAddress = function (term) {
                    var _this = this;
                    this.searchResult = [];
                    this._mapService.getGeoCode(term)
                        .subscribe(function (res) {
                        return _this.searchResult = res;
                    }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                };
                //Send the selected location to map component.
                AutoCompleteComponent.prototype.select = function (item) {
                    this.query = "";
                    this.newLocation.emit(item);
                    this.searchResult = [];
                };
                //This funtion determines if the user clicks outside the dropdown menu. If this is the case
                // the searchresult array will be cleared and the dropdown will disappear.
                AutoCompleteComponent.prototype.handleClick = function (event) {
                    var clickedComponent = event.target;
                    var inside = false;
                    do {
                        if (clickedComponent === this.elementRef.nativeElement) {
                            inside = true;
                        }
                        clickedComponent = clickedComponent.parentNode;
                    } while (clickedComponent);
                    if (!inside) {
                        this.searchResult = [];
                    }
                };
                AutoCompleteComponent.prototype.buttonPush = function (value) {
                    this.query = "";
                    this.searchResult = [];
                    if (value === 2) {
                        this.buttons[1] = "blue";
                        this.buttons[0] = "white";
                        this.searchForLocation = true;
                        console.log(this.searchForLocation);
                    }
                    else {
                        this.buttons[1] = "white";
                        this.buttons[0] = "blue";
                        this.searchForLocation = false;
                        console.log(this.searchForLocation);
                    }
                };
                AutoCompleteComponent = __decorate([
                    core_1.Component({
                        selector: 'auto-complete',
                        host: {
                            '(document:click)': 'handleClick($event)',
                        },
                        templateUrl: './app/map/autocomplete.html',
                        providers: [map_service_1.MapService],
                        directives: [common_1.NgStyle],
                        styleUrls: ['./app/map/autocomplete.min.css'],
                        outputs: ['newLocation']
                    }), 
                    __metadata('design:paramtypes', [map_service_1.MapService, core_1.ElementRef])
                ], AutoCompleteComponent);
                return AutoCompleteComponent;
            }());
            exports_1("AutoCompleteComponent", AutoCompleteComponent);
        }
    }
});
//# sourceMappingURL=autocomplete.js.map