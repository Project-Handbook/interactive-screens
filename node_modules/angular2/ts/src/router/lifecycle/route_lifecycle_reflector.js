System.register(['angular2/src/facade/lang', './lifecycle_annotations_impl', 'angular2/src/core/reflection/reflection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, lifecycle_annotations_impl_1, reflection_1;
    function hasLifecycleHook(e, type) {
        if (!(type instanceof lang_1.Type))
            return false;
        return e.name in type.prototype;
    }
    exports_1("hasLifecycleHook", hasLifecycleHook);
    function getCanActivateHook(type) {
        var annotations = reflection_1.reflector.annotations(type);
        for (var i = 0; i < annotations.length; i += 1) {
            var annotation = annotations[i];
            if (annotation instanceof lifecycle_annotations_impl_1.CanActivate) {
                return annotation.fn;
            }
        }
        return null;
    }
    exports_1("getCanActivateHook", getCanActivateHook);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (lifecycle_annotations_impl_1_1) {
                lifecycle_annotations_impl_1 = lifecycle_annotations_impl_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=route_lifecycle_reflector.js.map