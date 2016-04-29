/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
System.register(['angular2/src/core/util/decorators', './lifecycle_annotations_impl'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var decorators_1, lifecycle_annotations_impl_1;
    var CanActivate;
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (lifecycle_annotations_impl_1_1) {
                lifecycle_annotations_impl_1 = lifecycle_annotations_impl_1_1;
                exports_1({
                    "routerCanReuse": lifecycle_annotations_impl_1_1["routerCanReuse"],
                    "routerCanDeactivate": lifecycle_annotations_impl_1_1["routerCanDeactivate"],
                    "routerOnActivate": lifecycle_annotations_impl_1_1["routerOnActivate"],
                    "routerOnReuse": lifecycle_annotations_impl_1_1["routerOnReuse"],
                    "routerOnDeactivate": lifecycle_annotations_impl_1_1["routerOnDeactivate"]
                });
            }],
        execute: function() {
            /**
             * Defines route lifecycle hook `CanActivate`, which is called by the router to determine
             * if a component can be instantiated as part of a navigation.
             *
             * <aside class="is-right">
             * Note that unlike other lifecycle hooks, this one uses an annotation rather than an interface.
             * This is because the `CanActivate` function is called before the component is instantiated.
             * </aside>
             *
             * The `CanActivate` hook is called with two {@link ComponentInstruction}s as parameters, the first
             * representing the current route being navigated to, and the second parameter representing the
             * previous route or `null`.
             *
             * ```typescript
             * @CanActivate((next, prev) => boolean | Promise<boolean>)
             * ```
             *
             * If `CanActivate` returns or resolves to `false`, the navigation is cancelled.
             * If `CanActivate` throws or rejects, the navigation is also cancelled.
             * If `CanActivate` returns or resolves to `true`, navigation continues, the component is
             * instantiated, and the {@link OnActivate} hook of that component is called if implemented.
             *
             * ### Example
             *
             * {@example router/ts/can_activate/can_activate_example.ts region='canActivate' }
             */
            exports_1("CanActivate", CanActivate = decorators_1.makeDecorator(lifecycle_annotations_impl_1.CanActivate));
        }
    }
});
//# sourceMappingURL=lifecycle_annotations.js.map