System.register(['angular2/src/core/di', './css_animation_builder', './browser_details'], function(exports_1, context_1) {
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
    var di_1, css_animation_builder_1, browser_details_1;
    var AnimationBuilder;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (css_animation_builder_1_1) {
                css_animation_builder_1 = css_animation_builder_1_1;
            },
            function (browser_details_1_1) {
                browser_details_1 = browser_details_1_1;
            }],
        execute: function() {
            AnimationBuilder = (function () {
                /**
                 * Used for DI
                 * @param browserDetails
                 */
                function AnimationBuilder(browserDetails) {
                    this.browserDetails = browserDetails;
                }
                /**
                 * Creates a new CSS Animation
                 * @returns {CssAnimationBuilder}
                 */
                AnimationBuilder.prototype.css = function () { return new css_animation_builder_1.CssAnimationBuilder(this.browserDetails); };
                AnimationBuilder = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [browser_details_1.BrowserDetails])
                ], AnimationBuilder);
                return AnimationBuilder;
            }());
            exports_1("AnimationBuilder", AnimationBuilder);
        }
    }
});
//# sourceMappingURL=animation_builder.js.map