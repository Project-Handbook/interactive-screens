System.register(['angular2/compiler', 'angular2/core', 'angular2/src/router/directives/router_link_transform', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var compiler_1, core_1, router_link_transform_1, lang_1;
    var ROUTER_LINK_DSL_PROVIDER;
    return {
        setters:[
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_link_transform_1_1) {
                router_link_transform_1 = router_link_transform_1_1;
                exports_1({
                    "RouterLinkTransform": router_link_transform_1_1["RouterLinkTransform"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Enables the router link DSL.
             *
             * Warning. This feature is experimental and can change.
             *
             * To enable the transformer pass the router link DSL provider to `bootstrap`.
             *
             * ## Example:
             * ```
             * import {bootstrap} from 'angular2/platform/browser';
             * import {ROUTER_LINK_DSL_PROVIDER} from 'angular2/router/router_link_dsl';
             *
             * bootstrap(CustomApp, [ROUTER_LINK_DSL_PROVIDER]);
             * ```
             *
             * The DSL allows you to express router links as follows:
             * ```
             * <a [routerLink]="route:User"> <!-- Same as <a [routerLink]="['User']"> -->
             * <a [routerLink]="route:/User"> <!-- Same as <a [routerLink]="['User']"> -->
             * <a [routerLink]="route:./User"> <!-- Same as <a [routerLink]="['./User']"> -->
             * <a [routerLink]="./User(id: value, name: 'Bob')"> <!-- Same as <a [routerLink]="['./User', {id:
             * value, name: 'Bob'}]"> -->
             * <a [routerLink]="/User/Modal"> <!-- Same as <a [routerLink]="['/User', 'Modal']"> -->
             * <a [routerLink]="User[Modal]"> <!-- Same as <a [routerLink]="['User', ['Modal']]"> -->
             * ```
             */
            exports_1("ROUTER_LINK_DSL_PROVIDER", ROUTER_LINK_DSL_PROVIDER = lang_1.CONST_EXPR(new core_1.Provider(compiler_1.TEMPLATE_TRANSFORMS, { useClass: router_link_transform_1.RouterLinkTransform, multi: true })));
        }
    }
});
//# sourceMappingURL=router_link_dsl.js.map