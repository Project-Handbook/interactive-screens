System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var lang_1;
    var AngularEntrypoint;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Marks a function or method as an Angular 2 entrypoint. Only necessary in Dart code.
             *
             * The optional `name` parameter will be reflected in logs when the entry point is processed.
             *
             * See [the wiki][] for detailed documentation.
             * [the wiki]: https://github.com/angular/angular/wiki/Angular-2-Dart-Transformer#entry_points
             *
             * ## Example
             *
             * ```
             * @AngularEntrypoint("name-for-debug")
             * void main() {
             *   bootstrap(MyComponent);
             * }
             * ```
             */
            AngularEntrypoint = (function () {
                function AngularEntrypoint(name) {
                    this.name = name;
                }
                AngularEntrypoint = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String])
                ], AngularEntrypoint);
                return AngularEntrypoint;
            }());
            exports_1("AngularEntrypoint", AngularEntrypoint);
        }
    }
});
//# sourceMappingURL=angular_entrypoint.js.map