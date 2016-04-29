System.register(['angular2/src/facade/lang', './ng_class', './ng_for', './ng_if', './ng_style', './ng_switch', './ng_plural'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, ng_class_1, ng_for_1, ng_if_1, ng_style_1, ng_switch_1, ng_plural_1;
    var CORE_DIRECTIVES;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (ng_class_1_1) {
                ng_class_1 = ng_class_1_1;
            },
            function (ng_for_1_1) {
                ng_for_1 = ng_for_1_1;
            },
            function (ng_if_1_1) {
                ng_if_1 = ng_if_1_1;
            },
            function (ng_style_1_1) {
                ng_style_1 = ng_style_1_1;
            },
            function (ng_switch_1_1) {
                ng_switch_1 = ng_switch_1_1;
            },
            function (ng_plural_1_1) {
                ng_plural_1 = ng_plural_1_1;
            }],
        execute: function() {
            /**
             * A collection of Angular core directives that are likely to be used in each and every Angular
             * application.
             *
             * This collection can be used to quickly enumerate all the built-in directives in the `directives`
             * property of the `@Component` annotation.
             *
             * ### Example ([live demo](http://plnkr.co/edit/yakGwpCdUkg0qfzX5m8g?p=preview))
             *
             * Instead of writing:
             *
             * ```typescript
             * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             * one could import all the core directives at once:
             *
             * ```typescript
             * import {CORE_DIRECTIVES} from 'angular2/common';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   templateUrl: 'myComponent.html',
             *   directives: [CORE_DIRECTIVES, OtherDirective]
             * })
             * export class MyComponent {
             *   ...
             * }
             * ```
             */
            exports_1("CORE_DIRECTIVES", CORE_DIRECTIVES = lang_1.CONST_EXPR([
                ng_class_1.NgClass,
                ng_for_1.NgFor,
                ng_if_1.NgIf,
                ng_style_1.NgStyle,
                ng_switch_1.NgSwitch,
                ng_switch_1.NgSwitchWhen,
                ng_switch_1.NgSwitchDefault,
                ng_plural_1.NgPlural,
                ng_plural_1.NgPluralCase
            ]));
        }
    }
});
//# sourceMappingURL=core_directives.js.map