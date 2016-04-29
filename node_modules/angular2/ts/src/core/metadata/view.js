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
    var ViewEncapsulation, VIEW_ENCAPSULATION_VALUES, ViewMetadata;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Defines template and style encapsulation options available for Component's {@link View}.
             *
             * See {@link ViewMetadata#encapsulation}.
             */
            (function (ViewEncapsulation) {
                /**
                 * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
                 * Element and pre-processing the style rules provided via
                 * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
                 * attribute to all selectors.
                 *
                 * This is the default option.
                 */
                ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
                /**
                 * Use the native encapsulation mechanism of the renderer.
                 *
                 * For the DOM this means using [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
                 * creating a ShadowRoot for Component's Host Element.
                 */
                ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
                /**
                 * Don't provide any template or style encapsulation.
                 */
                ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
            })(ViewEncapsulation || (ViewEncapsulation = {}));
            exports_1("ViewEncapsulation", ViewEncapsulation);
            exports_1("VIEW_ENCAPSULATION_VALUES", VIEW_ENCAPSULATION_VALUES = [ViewEncapsulation.Emulated, ViewEncapsulation.Native, ViewEncapsulation.None]);
            /**
             * Metadata properties available for configuring Views.
             *
             * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
             * `@View` annotation specifies the HTML template to use, and lists the directives that are active
             * within the template.
             *
             * When a component is instantiated, the template is loaded into the component's shadow root, and
             * the expressions and statements in the template are evaluated against the component.
             *
             * For details on the `@Component` annotation, see {@link ComponentMetadata}.
             *
             * ### Example
             *
             * ```
             * @Component({
             *   selector: 'greet',
             *   template: 'Hello {{name}}!',
             *   directives: [GreetUser, Bold]
             * })
             * class Greet {
             *   name: string;
             *
             *   constructor() {
             *     this.name = 'World';
             *   }
             * }
             * ```
             */
            ViewMetadata = (function () {
                function ViewMetadata(_a) {
                    var _b = _a === void 0 ? {} : _a, templateUrl = _b.templateUrl, template = _b.template, directives = _b.directives, pipes = _b.pipes, encapsulation = _b.encapsulation, styles = _b.styles, styleUrls = _b.styleUrls;
                    this.templateUrl = templateUrl;
                    this.template = template;
                    this.styleUrls = styleUrls;
                    this.styles = styles;
                    this.directives = directives;
                    this.pipes = pipes;
                    this.encapsulation = encapsulation;
                }
                ViewMetadata = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [Object])
                ], ViewMetadata);
                return ViewMetadata;
            }());
            exports_1("ViewMetadata", ViewMetadata);
        }
    }
});
//# sourceMappingURL=view.js.map