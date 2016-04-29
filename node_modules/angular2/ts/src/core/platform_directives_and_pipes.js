System.register(["angular2/src/core/di", "angular2/src/facade/lang"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, lang_1;
    var PLATFORM_DIRECTIVES, PLATFORM_PIPES;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A token that can be provided when bootstraping an application to make an array of directives
             * available in every component of the application.
             *
             * ### Example
             *
             * ```typescript
             * import {PLATFORM_DIRECTIVES} from 'angular2/core';
             * import {OtherDirective} from './myDirectives';
             *
             * @Component({
             *   selector: 'my-component',
             *   template: `
             *     <!-- can use other directive even though the component does not list it in `directives` -->
             *     <other-directive></other-directive>
             *   `
             * })
             * export class MyComponent {
             *   ...
             * }
             *
             * bootstrap(MyComponent, [provide(PLATFORM_DIRECTIVES, {useValue: [OtherDirective], multi:true})]);
             * ```
             */
            exports_1("PLATFORM_DIRECTIVES", PLATFORM_DIRECTIVES = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Directives")));
            /**
             * A token that can be provided when bootstraping an application to make an array of pipes
             * available in every component of the application.
             *
             * ### Example
             *
             * ```typescript
             * import {PLATFORM_PIPES} from 'angular2/core';
             * import {OtherPipe} from './myPipe';
             *
             * @Component({
             *   selector: 'my-component',
             *   template: `
             *     {{123 | other-pipe}}
             *   `
             * })
             * export class MyComponent {
             *   ...
             * }
             *
             * bootstrap(MyComponent, [provide(PLATFORM_PIPES, {useValue: [OtherPipe], multi:true})]);
             * ```
             */
            exports_1("PLATFORM_PIPES", PLATFORM_PIPES = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Pipes")));
        }
    }
});
//# sourceMappingURL=platform_directives_and_pipes.js.map