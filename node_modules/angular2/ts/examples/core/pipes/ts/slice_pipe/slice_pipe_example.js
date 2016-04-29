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
    var SlicePipeStringExample, SlicePipeListExample, AppCmp;
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
            // #docregion SlicePipe_string
            SlicePipeStringExample = (function () {
                function SlicePipeStringExample() {
                    this.str = 'abcdefghij';
                }
                SlicePipeStringExample = __decorate([
                    core_1.Component({
                        selector: 'slice-string-example',
                        template: "<div>\n    <p>{{str}}[0:4]: '{{str | slice:0:4}}' - output is expected to be 'abcd'</p>\n    <p>{{str}}[4:0]: '{{str | slice:4:0}}' - output is expected to be ''</p>\n    <p>{{str}}[-4]: '{{str | slice:-4}}' - output is expected to be 'ghij'</p>\n    <p>{{str}}[-4:-2]: '{{str | slice:-4:-2}}' - output is expected to be 'gh'</p>\n    <p>{{str}}[-100]: '{{str | slice:-100}}' - output is expected to be 'abcdefghij'</p>\n    <p>{{str}}[100]: '{{str | slice:100}}' - output is expected to be ''</p>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SlicePipeStringExample);
                return SlicePipeStringExample;
            }());
            exports_1("SlicePipeStringExample", SlicePipeStringExample);
            // #enddocregion
            // #docregion SlicePipe_list
            SlicePipeListExample = (function () {
                function SlicePipeListExample() {
                    this.collection = ['a', 'b', 'c', 'd'];
                }
                SlicePipeListExample = __decorate([
                    core_1.Component({
                        selector: 'slice-list-example',
                        template: "<div>\n    <li *ngFor=\"var i of collection | slice:1:3\">{{i}}</li>\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SlicePipeListExample);
                return SlicePipeListExample;
            }());
            exports_1("SlicePipeListExample", SlicePipeListExample);
            // #enddocregion
            AppCmp = (function () {
                function AppCmp() {
                }
                AppCmp = __decorate([
                    core_1.Component({
                        selector: 'example-app',
                        directives: [SlicePipeListExample, SlicePipeStringExample],
                        template: "\n    <h1>SlicePipe Examples</h1>\n    <slice-list-example></slice-list-example>\n    <slice-string-example></slice-string-example>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppCmp);
                return AppCmp;
            }());
            exports_1("AppCmp", AppCmp);
        }
    }
});
//# sourceMappingURL=slice_pipe_example.js.map