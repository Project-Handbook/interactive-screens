System.register(['angular2/core', './services/map-service', './location.interface', 'angular2/common', 'rxjs/add/operator/map', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/switchMap'], function(exports_1, context_1) {
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
    var core_1, map_service_1, location_interface_1, common_1;
    var SearchBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (location_interface_1_1) {
                location_interface_1 = location_interface_1_1;
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
                    this.searchForDepartment = false;
                    this.searchForAddress = false;
                    this.search_bar_placeholder = "Search for a location...";
                    this.term = new common_1.Control();
                    this.buttons = ["#2258A5", "white", "white"];
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
                                //Replacing ä,å,ö with a's and o's. googleapis works better without swedish charachters.
                                var location_type = _this.searchForAddress === true ? location_interface_1.Location_type.street_address : location_interface_1.Location_type.department;
                                var term = item.toString().replace(/ä|å/ig, 'a').replace(/ö/ig, 'o');
                                _this._mapService.getGeoCode(term, location_type).subscribe(function (res) { _this.searchResult = res; }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
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
                    this.term.updateValue(""); //Reset search field
                    //Locations that is not fetched from KTH Places hasnt got coordinates but an address.
                    //Those locations has to be sent to googleapis in order to recieve coordinates.
                    if (location.latitude !== undefined && location.longitude !== undefined) {
                        this.newLocation.emit(location); // Send selected location to output
                    }
                    else {
                        var location_type = this.searchForAddress === true ? location_interface_1.Location_type.street_address : location_interface_1.Location_type.department;
                        this._mapService.getGeoCode(location.streetAddress, location_type).subscribe(function (res) {
                            if (res.length !== 0) {
                                res[0].buildingName = location.buildingName;
                                _this.newLocation.emit(res[0]);
                            }
                            else {
                                _this.newLocation.emit(undefined);
                            }
                        }, function (error) { return _this.showErrorMessage = true; }, function () { return _this.showErrorMessage = false; });
                    }
                    this.searchResult = [];
                    this.departmentsCol1 = [];
                    this.departmentsCol2 = [];
                    this.schools = [];
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
                        this.buttons[0] = "#2258A5";
                        this.buttons[1] = "white";
                        this.buttons[2] = "white";
                        this.searchForLocation = true;
                        this.searchForAddress = false;
                        this.searchForDepartment = false;
                        this.schools = [];
                        this.departmentsCol1 = [];
                        this.departmentsCol2 = [];
                        this.search_bar_placeholder = "Search for a location...";
                    }
                    else if (value === 1) {
                        this.buttons[0] = "white";
                        this.buttons[1] = "#2258A5";
                        this.buttons[2] = "white";
                        this.searchForLocation = false;
                        this.searchForAddress = true;
                        this.searchForDepartment = false;
                        this.schools = [];
                        this.departmentsCol1 = [];
                        this.departmentsCol2 = [];
                        this.search_bar_placeholder = "Search for an address...";
                    }
                    else if (value === 2) {
                        this.buttons[0] = "white";
                        this.buttons[1] = "white";
                        this.buttons[2] = "#2258A5";
                        this.searchForLocation = false;
                        this.searchForAddress = false;
                        this.searchForDepartment = true;
                    }
                };
                SearchBarComponent.prototype.getSchools = function () {
                    var _this = this;
                    this._mapService.getSchools().subscribe(function (res) { return _this.schools = res; });
                };
                SearchBarComponent.prototype.getDepartments = function (department) {
                    var _this = this;
                    this._mapService.getDepartments(department).subscribe(function (res) {
                        if (res.length > 20) {
                            _this.departmentsCol1 = res.splice(0, 20);
                            _this.departmentsCol2 = res.splice(20, res.length);
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