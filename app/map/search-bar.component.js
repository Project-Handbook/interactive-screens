System.register(['angular2/core', './services/map-service', 'angular2/common', 'rxjs/add/operator/map', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/switchMap'], function(exports_1, context_1) {
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
    var SearchBarComponent;
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
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {}],
        execute: function() {
            SearchBarComponent = (function () {
                // items: Observable<Array<Location>>;
                function SearchBarComponent(_mapService, myElement) {
                    var _this = this;
                    this._mapService = _mapService;
                    // Used for passing the selected argument from the dropdown menu to the map component
                    this.newLocation = new core_1.EventEmitter();
                    this.showErrorMessage = false;
                    this.query = '';
                    this.searchResult = [];
                    this.searchForLocation = true;
                    this.term = new common_1.Control();
                    this.buttons = ["blue", "white", "white"];
                    this.schools = [];
                    this.departmentsCol1 = [];
                    this.departmentsCol2 = [];
                    //Saves the root node of this componenet. Used for toogling dropdown menu on and off.
                    this.elementRef = myElement;
                    this.term.valueChanges
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .subscribe(function (item) {
                        if (item.toString().length > 1) {
                            if (_this.searchForLocation === true) {
                                _this._mapService.getPlaces(item.toString()).subscribe(function (res) { _this.searchResult = res; }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                            }
                            else {
                                _this._mapService.getGeoCode(item.toString()).subscribe(function (res) { _this.searchResult = res; }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                            }
                        }
                        else {
                            _this.searchResult = [];
                        }
                    });
                }
                //Send the selected location to map component. 
                SearchBarComponent.prototype.select = function (location) {
                    var _this = this;
                    console.log(location);
                    console.log("+");
                    this.term.updateValue(""); //Reset search field
                    if (location.latitude !== undefined) {
                        this.newLocation.emit(location); // Send selected location to output
                    }
                    else {
                        this._mapService.getGeoCode(location.streetAddress).subscribe(function (res) { _this.newLocation.emit(res[0]); }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                    }
                    this.searchResult = [];
                };
                //This funtion determines if the user clicks outside the dropdown menu. If this is the case 
                // the searchresult array will be cleared and the dropdown will disappear.  
                SearchBarComponent.prototype.handleClick = function (event) {
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
                        this.schools = [];
                        this.departmentsCol1 = [];
                        this.departmentsCol2 = [];
                    }
                };
                SearchBarComponent.prototype.buttonPush = function (value) {
                    this.query = "";
                    this.searchResult = [];
                    if (value === 0) {
                        this.buttons[0] = "blue";
                        this.buttons[1] = "white";
                        this.buttons[2] = "white";
                        this.searchForLocation = true;
                        this.schools = [];
                        this.departmentsCol1 = [];
                        this.departmentsCol2 = [];
                    }
                    else if (value === 1) {
                        this.buttons[0] = "white";
                        this.buttons[1] = "blue";
                        this.buttons[2] = "white";
                        this.searchForLocation = false;
                        this.schools = [];
                        this.departmentsCol1 = [];
                        this.departmentsCol2 = [];
                    }
                    else if (value === 2) {
                        this.buttons[0] = "white";
                        this.buttons[1] = "white";
                        this.buttons[2] = "blue";
                    }
                };
                SearchBarComponent.prototype.getSchools = function () {
                    var _this = this;
                    this._mapService.getSchools().subscribe(function (res) { return _this.schools = res; });
                };
                SearchBarComponent.prototype.getDepartments = function (department) {
                    var _this = this;
                    this._mapService.getDepartments(department).subscribe(function (res) {
                        if (res.length > 25) {
                            _this.departmentsCol1 = res.splice(10, 25);
                            _this.departmentsCol2 = res.splice(25, res.length);
                        }
                        else {
                            _this.departmentsCol1 = res;
                            _this.departmentsCol2 = [];
                        }
                    });
                };
                SearchBarComponent = __decorate([
                    core_1.Component({
                        selector: 'auto-complete',
                        host: {
                            '(document:click)': 'handleClick($event)',
                        },
                        templateUrl: './app/map/html/search-bar.html',
                        providers: [map_service_1.MapService],
                        directives: [common_1.NgStyle],
                        styleUrls: ['./app/map/styles/search-bar.min.css'],
                        outputs: ['newLocation']
                    }), 
                    __metadata('design:paramtypes', [map_service_1.MapService, core_1.ElementRef])
                ], SearchBarComponent);
                return SearchBarComponent;
            }());
            exports_1("SearchBarComponent", SearchBarComponent);
        }
    }
});
//# sourceMappingURL=search-bar.component.js.map