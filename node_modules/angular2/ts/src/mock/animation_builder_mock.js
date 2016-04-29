System.register(['angular2/src/core/di', 'angular2/src/animate/animation_builder', 'angular2/src/animate/css_animation_builder', 'angular2/src/animate/animation', 'angular2/src/animate/browser_details'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, animation_builder_1, css_animation_builder_1, animation_1, browser_details_1;
    var MockAnimationBuilder, MockCssAnimationBuilder, MockBrowserAbstraction, MockAnimation;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            },
            function (css_animation_builder_1_1) {
                css_animation_builder_1 = css_animation_builder_1_1;
            },
            function (animation_1_1) {
                animation_1 = animation_1_1;
            },
            function (browser_details_1_1) {
                browser_details_1 = browser_details_1_1;
            }],
        execute: function() {
            MockAnimationBuilder = (function (_super) {
                __extends(MockAnimationBuilder, _super);
                function MockAnimationBuilder() {
                    _super.call(this, null);
                }
                MockAnimationBuilder.prototype.css = function () { return new MockCssAnimationBuilder(); };
                MockAnimationBuilder = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MockAnimationBuilder);
                return MockAnimationBuilder;
            }(animation_builder_1.AnimationBuilder));
            exports_1("MockAnimationBuilder", MockAnimationBuilder);
            MockCssAnimationBuilder = (function (_super) {
                __extends(MockCssAnimationBuilder, _super);
                function MockCssAnimationBuilder() {
                    _super.call(this, null);
                }
                MockCssAnimationBuilder.prototype.start = function (element) { return new MockAnimation(element, this.data); };
                return MockCssAnimationBuilder;
            }(css_animation_builder_1.CssAnimationBuilder));
            MockBrowserAbstraction = (function (_super) {
                __extends(MockBrowserAbstraction, _super);
                function MockBrowserAbstraction() {
                    _super.apply(this, arguments);
                }
                MockBrowserAbstraction.prototype.doesElapsedTimeIncludesDelay = function () { this.elapsedTimeIncludesDelay = false; };
                return MockBrowserAbstraction;
            }(browser_details_1.BrowserDetails));
            MockAnimation = (function (_super) {
                __extends(MockAnimation, _super);
                function MockAnimation(element, data) {
                    _super.call(this, element, data, new MockBrowserAbstraction());
                }
                MockAnimation.prototype.wait = function (callback) { this._callback = callback; };
                MockAnimation.prototype.flush = function () {
                    this._callback(0);
                    this._callback = null;
                };
                return MockAnimation;
            }(animation_1.Animation));
        }
    }
});
//# sourceMappingURL=animation_builder_mock.js.map