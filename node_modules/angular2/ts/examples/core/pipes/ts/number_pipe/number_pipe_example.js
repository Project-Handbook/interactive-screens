System.register(['angular2/core', 'angular2/platform/browser'], function(exports_1, context_1) {
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
    var core_1, browser_1;
    var NumberPipeExample, PercentPipeExample, CurrencyPipeExample, AppCmp;
    function main() {
        browser_1.bootstrap(AppCmp);
    }
    exports_1("main", main);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            // #docregion NumberPipe
            NumberPipeExample = (function () {
                function NumberPipeExample() {
                    this.pi = 3.141;
                    this.e = 2.718281828459045;
                }
                NumberPipeExample = __decorate([
                    core_1.Component({
                        selector: 'number-example',
                        template: "<div>\n    <p>e (no formatting): {{e}}</p>\n    <p>e (3.1-5): {{e | number:'3.1-5'}}</p>\n    <p>pi (no formatting): {{pi}}</p>\n    <p>pi (3.5-5): {{pi | number:'3.5-5'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], NumberPipeExample);
                return NumberPipeExample;
            }());
            exports_1("NumberPipeExample", NumberPipeExample);
            // #enddocregion
            // #docregion PercentPipe
            PercentPipeExample = (function () {
                function PercentPipeExample() {
                    this.a = 0.259;
                    this.b = 1.3495;
                }
                PercentPipeExample = __decorate([
                    core_1.Component({
                        selector: 'percent-example',
                        template: "<div>\n    <p>A: {{a | percent}}</p>\n    <p>B: {{b | percent:'4.3-5'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PercentPipeExample);
                return PercentPipeExample;
            }());
            exports_1("PercentPipeExample", PercentPipeExample);
            // #enddocregion
            // #docregion CurrencyPipe
            CurrencyPipeExample = (function () {
                function CurrencyPipeExample() {
                    this.a = 0.259;
                    this.b = 1.3495;
                }
                CurrencyPipeExample = __decorate([
                    core_1.Component({
                        selector: 'currency-example',
                        template: "<div>\n    <p>A: {{a | currency:'USD':false}}</p>\n    <p>B: {{b | currency:'USD':true:'4.2-2'}}</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CurrencyPipeExample);
                return CurrencyPipeExample;
            }());
            exports_1("CurrencyPipeExample", CurrencyPipeExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [NumberPipeExample, PercentPipeExample, CurrencyPipeExample],
                        template: "\n    <h1>Numeric Pipe Examples</h1>\n    <h2>NumberPipe Example</h2>\n    <number-example></number-example>\n    <h2>PercentPipe Example</h2>\n    <percent-example></percent-example>\n    <h2>CurrencyPipeExample</h2>\n    <currency-example></currency-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});
//# sourceMappingURL=number_pipe_example.js.map