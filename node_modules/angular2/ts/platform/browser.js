System.register(['angular2/src/core/angular_entrypoint', 'angular2/src/platform/browser_common', 'angular2/src/facade/lang', 'angular2/compiler', 'angular2/core', 'angular2/src/core/reflection/reflection_capabilities', "angular2/src/platform/browser/xhr_impl", 'angular2/src/core/di'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, browser_common_1, compiler_1, core_1, reflection_capabilities_1, xhr_impl_1, compiler_2, di_1;
    var BROWSER_APP_PROVIDERS;
    /**
     * Bootstrapping for Angular applications.
     *
     * You instantiate an Angular application by explicitly specifying a component to use
     * as the root component for your application via the `bootstrap()` method.
     *
     * ## Simple Example
     *
     * Assuming this `index.html`:
     *
     * ```html
     * <html>
     *   <!-- load Angular script tags here. -->
     *   <body>
     *     <my-app>loading...</my-app>
     *   </body>
     * </html>
     * ```
     *
     * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
     * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
     * mainly for security reasons, as well as architectural changes in Angular 2. This means
     * that `index.html` can safely be processed using server-side technologies such as
     * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
     * Angular 2 component double-curly `{{ syntax }}`.
     *
     * We can use this script code:
     *
     * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
     *
     * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
     * argument, Angular performs the following tasks:
     *
     *  1. It uses the component's `selector` property to locate the DOM element which needs
     *     to be upgraded into the angular component.
     *  2. It creates a new child injector (from the platform injector). Optionally, you can
     *     also override the injector configuration for an app by invoking `bootstrap` with the
     *     `componentInjectableBindings` argument.
     *  3. It creates a new `Zone` and connects it to the angular application's change detection
     *     domain instance.
     *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
     *     template into it.
     *  5. It instantiates the specified component.
     *  6. Finally, Angular performs change detection to apply the initial data providers for the
     *     application.
     *
     *
     * ## Bootstrapping Multiple Applications
     *
     * When working within a browser window, there are many singleton resources: cookies, title,
     * location, and others. Angular services that represent these resources must likewise be
     * shared across all Angular applications that occupy the same browser window. For this
     * reason, Angular creates exactly one global platform object which stores all shared
     * services, and each angular application injector has the platform injector as its parent.
     *
     * Each application has its own private injector as well. When there are multiple
     * applications on a page, Angular treats each application injector's services as private
     * to that application.
     *
     * ## API
     *
     * - `appComponentType`: The root component which should act as the application. This is
     *   a reference to a `Type` which is annotated with `@Component(...)`.
     * - `customProviders`: An additional set of providers that can be added to the
     *   app injector to override default injection behavior.
     *
     * Returns a `Promise` of {@link ComponentRef}.
     */
    function bootstrap(appComponentType, customProviders) {
        core_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
        var appProviders = lang_1.isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
        return core_1.platform(browser_common_1.BROWSER_PROVIDERS).application(appProviders).bootstrap(appComponentType);
    }
    exports_1("bootstrap", bootstrap);
    return {
        setters:[
            function (angular_entrypoint_1_1) {
                exports_1({
                    "AngularEntrypoint": angular_entrypoint_1_1["AngularEntrypoint"]
                });
            },
            function (browser_common_2_1) {
                exports_1({
                    "BROWSER_PROVIDERS": browser_common_2_1["BROWSER_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS": browser_common_2_1["ELEMENT_PROBE_PROVIDERS"],
                    "ELEMENT_PROBE_PROVIDERS_PROD_MODE": browser_common_2_1["ELEMENT_PROBE_PROVIDERS_PROD_MODE"],
                    "inspectNativeElement": browser_common_2_1["inspectNativeElement"],
                    "BrowserDomAdapter": browser_common_2_1["BrowserDomAdapter"],
                    "By": browser_common_2_1["By"],
                    "Title": browser_common_2_1["Title"],
                    "DOCUMENT": browser_common_2_1["DOCUMENT"],
                    "enableDebugTools": browser_common_2_1["enableDebugTools"],
                    "disableDebugTools": browser_common_2_1["disableDebugTools"]
                });
                browser_common_1 = browser_common_2_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
                compiler_2 = compiler_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (reflection_capabilities_1_1) {
                reflection_capabilities_1 = reflection_capabilities_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            /**
             * An array of providers that should be passed into `application()` when bootstrapping a component.
             */
            exports_1("BROWSER_APP_PROVIDERS", BROWSER_APP_PROVIDERS = lang_1.CONST_EXPR([
                browser_common_1.BROWSER_APP_COMMON_PROVIDERS,
                compiler_1.COMPILER_PROVIDERS,
                new di_1.Provider(compiler_2.XHR, { useClass: xhr_impl_1.XHRImpl }),
            ]));
        }
    }
});
//# sourceMappingURL=browser.js.map