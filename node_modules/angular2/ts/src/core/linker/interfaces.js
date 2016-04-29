System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LifecycleHooks, LIFECYCLE_HOOKS_VALUES;
    return {
        setters:[],
        execute: function() {
            (function (LifecycleHooks) {
                LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
                LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
                LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
                LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
                LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
                LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
                LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
                LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
            })(LifecycleHooks || (LifecycleHooks = {}));
            exports_1("LifecycleHooks", LifecycleHooks);
            /**
             * @internal
             */
            exports_1("LIFECYCLE_HOOKS_VALUES", LIFECYCLE_HOOKS_VALUES = [
                LifecycleHooks.OnInit,
                LifecycleHooks.OnDestroy,
                LifecycleHooks.DoCheck,
                LifecycleHooks.OnChanges,
                LifecycleHooks.AfterContentInit,
                LifecycleHooks.AfterContentChecked,
                LifecycleHooks.AfterViewInit,
                LifecycleHooks.AfterViewChecked
            ]);
        }
    }
});
//# sourceMappingURL=interfaces.js.map