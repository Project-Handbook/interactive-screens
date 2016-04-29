System.register(['angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var di_1, lang_1;
    var APP_COMPONENT_REF_PROMISE, APP_COMPONENT, APP_ID, APP_ID_RANDOM_PROVIDER, PLATFORM_INITIALIZER, APP_INITIALIZER, PACKAGE_ROOT_URL;
    function _appIdRandomProviderFactory() {
        return "" + _randomChar() + _randomChar() + _randomChar();
    }
    function _randomChar() {
        return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
    }
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
             *  @internal
             */
            exports_1("APP_COMPONENT_REF_PROMISE", APP_COMPONENT_REF_PROMISE = lang_1.CONST_EXPR(new di_1.OpaqueToken('Promise<ComponentRef>')));
            /**
             * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
             * Injector}.
             *
             * ```
             * @Component(...)
             * class MyApp {
             *   ...
             * }
             *
             * bootstrap(MyApp).then((appRef:ApplicationRef) {
             *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
             * });
             *
             * ```
             */
            exports_1("APP_COMPONENT", APP_COMPONENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppComponent')));
            /**
             * A DI Token representing a unique string id assigned to the application by Angular and used
             * primarily for prefixing application attributes and CSS styles when
             * {@link ViewEncapsulation#Emulated} is being used.
             *
             * If you need to avoid randomly generated value to be used as an application id, you can provide
             * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
             * using this token.
             */
            exports_1("APP_ID", APP_ID = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppId')));
            /**
             * Providers that will generate a random APP_ID_TOKEN.
             */
            exports_1("APP_ID_RANDOM_PROVIDER", APP_ID_RANDOM_PROVIDER = lang_1.CONST_EXPR(new di_1.Provider(APP_ID, { useFactory: _appIdRandomProviderFactory, deps: [] })));
            /**
             * A function that will be executed when a platform is initialized.
             */
            exports_1("PLATFORM_INITIALIZER", PLATFORM_INITIALIZER = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Initializer")));
            /**
             * A function that will be executed when an application is initialized.
             */
            exports_1("APP_INITIALIZER", APP_INITIALIZER = lang_1.CONST_EXPR(new di_1.OpaqueToken("Application Initializer")));
            /**
             * A token which indicates the root directory of the application
             */
            exports_1("PACKAGE_ROOT_URL", PACKAGE_ROOT_URL = lang_1.CONST_EXPR(new di_1.OpaqueToken("Application Packages Root URL")));
        }
    }
});
//# sourceMappingURL=application_tokens.js.map