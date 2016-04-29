System.register(['angular2/src/facade/lang', './forms', './directives'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, forms_1, directives_1;
    var COMMON_DIRECTIVES;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (directives_1_1) {
                directives_1 = directives_1_1;
            }],
        execute: function() {
            /**
             * A collection of Angular core directives that are likely to be used in each and every Angular
             * application. This includes core directives (e.g., NgIf and NgFor), and forms directives (e.g.,
             * NgModel).
             *
             * This collection can be used to quickly enumerate all the built-in directives in the `directives`
             * property of the `@Component` decorator.
             *
             * ### Example
             *
             * Instead of writing:
             *
             * ```typescript
             * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgModel, NgForm} from
             * 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgModel, NgForm,
             * OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             * one could import all the common directives at once:
             *
             * ```typescript
             * import {COMMON_DIRECTIVES} from 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [COMMON_DIRECTIVES, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             */
            exports_1("COMMON_DIRECTIVES", COMMON_DIRECTIVES = lang_1.CONST_EXPR([directives_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES]));
        }
    }
});
//# sourceMappingURL=common_directives.js.map