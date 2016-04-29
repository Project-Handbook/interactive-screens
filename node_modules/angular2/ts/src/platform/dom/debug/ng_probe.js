System.register(['angular2/src/facade/lang', 'angular2/src/core/di', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/core/debug/debug_node', 'angular2/src/platform/dom/dom_renderer', 'angular2/core', 'angular2/src/core/debug/debug_renderer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, di_1, dom_adapter_1, debug_node_1, dom_renderer_1, core_1, debug_renderer_1;
    var CORE_TOKENS, INSPECT_GLOBAL_NAME, CORE_TOKENS_GLOBAL_NAME, ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE;
    /**
     * Returns a {@link DebugElement} for the given native DOM element, or
     * null if the given native element does not have an Angular view associated
     * with it.
     */
    function inspectNativeElement(element) {
        return debug_node_1.getDebugNode(element);
    }
    exports_1("inspectNativeElement", inspectNativeElement);
    function _createConditionalRootRenderer(rootRenderer) {
        if (lang_1.assertionsEnabled()) {
            return _createRootRenderer(rootRenderer);
        }
        return rootRenderer;
    }
    function _createRootRenderer(rootRenderer) {
        dom_adapter_1.DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
        dom_adapter_1.DOM.setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
        return new debug_renderer_1.DebugDomRootRenderer(rootRenderer);
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (debug_node_1_1) {
                debug_node_1 = debug_node_1_1;
            },
            function (dom_renderer_1_1) {
                dom_renderer_1 = dom_renderer_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (debug_renderer_1_1) {
                debug_renderer_1 = debug_renderer_1_1;
            }],
        execute: function() {
            CORE_TOKENS = lang_1.CONST_EXPR({ 'ApplicationRef': core_1.ApplicationRef, 'NgZone': core_1.NgZone });
            INSPECT_GLOBAL_NAME = 'ng.probe';
            CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
            /**
             * Providers which support debugging Angular applications (e.g. via `ng.probe`).
             */
            exports_1("ELEMENT_PROBE_PROVIDERS", ELEMENT_PROBE_PROVIDERS = lang_1.CONST_EXPR([
                new di_1.Provider(core_1.RootRenderer, { useFactory: _createConditionalRootRenderer, deps: [dom_renderer_1.DomRootRenderer] })
            ]));
            exports_1("ELEMENT_PROBE_PROVIDERS_PROD_MODE", ELEMENT_PROBE_PROVIDERS_PROD_MODE = lang_1.CONST_EXPR([new di_1.Provider(core_1.RootRenderer, { useFactory: _createRootRenderer, deps: [dom_renderer_1.DomRootRenderer] })]));
        }
    }
});
//# sourceMappingURL=ng_probe.js.map