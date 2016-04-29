System.register(['./linker/directive_resolver', './linker/view_resolver', './linker/compiler', './linker/view_manager', './linker/query_list', './linker/dynamic_component_loader', './linker/element_ref', './linker/template_ref', './linker/view_ref', './linker/view_container_ref'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (directive_resolver_1_1) {
                exports_1({
                    "DirectiveResolver": directive_resolver_1_1["DirectiveResolver"]
                });
            },
            function (view_resolver_1_1) {
                exports_1({
                    "ViewResolver": view_resolver_1_1["ViewResolver"]
                });
            },
            function (compiler_1_1) {
                exports_1({
                    "Compiler": compiler_1_1["Compiler"]
                });
            },
            function (view_manager_1_1) {
                exports_1({
                    "AppViewManager": view_manager_1_1["AppViewManager"]
                });
            },
            function (query_list_1_1) {
                exports_1({
                    "QueryList": query_list_1_1["QueryList"]
                });
            },
            function (dynamic_component_loader_1_1) {
                exports_1({
                    "DynamicComponentLoader": dynamic_component_loader_1_1["DynamicComponentLoader"]
                });
                exports_1({
                    "ComponentRef": dynamic_component_loader_1_1["ComponentRef"]
                });
            },
            function (element_ref_1_1) {
                exports_1({
                    "ElementRef": element_ref_1_1["ElementRef"]
                });
            },
            function (template_ref_1_1) {
                exports_1({
                    "TemplateRef": template_ref_1_1["TemplateRef"]
                });
            },
            function (view_ref_1_1) {
                exports_1({
                    "EmbeddedViewRef": view_ref_1_1["EmbeddedViewRef"],
                    "HostViewRef": view_ref_1_1["HostViewRef"],
                    "ViewRef": view_ref_1_1["ViewRef"],
                    "HostViewFactoryRef": view_ref_1_1["HostViewFactoryRef"]
                });
            },
            function (view_container_ref_1_1) {
                exports_1({
                    "ViewContainerRef": view_container_ref_1_1["ViewContainerRef"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=linker.js.map