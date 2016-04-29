System.register(['./route_config_decorator', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var route_config_decorator_1, lang_1, exceptions_1;
    /**
     * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
     * AuxRoute or Redirect object.
     *
     * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
     * `RouteRegistry`.
     */
    function normalizeRouteConfig(config, registry) {
        if (config instanceof route_config_decorator_1.AsyncRoute) {
            var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
            return new route_config_decorator_1.AsyncRoute({
                path: config.path,
                loader: wrappedLoader,
                name: config.name,
                data: config.data,
                useAsDefault: config.useAsDefault
            });
        }
        if (config instanceof route_config_decorator_1.Route || config instanceof route_config_decorator_1.Redirect || config instanceof route_config_decorator_1.AuxRoute) {
            return config;
        }
        if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
            throw new exceptions_1.BaseException("Route config should contain exactly one \"component\", \"loader\", or \"redirectTo\" property.");
        }
        if (config.as && config.name) {
            throw new exceptions_1.BaseException("Route config should contain exactly one \"as\" or \"name\" property.");
        }
        if (config.as) {
            config.name = config.as;
        }
        if (config.loader) {
            var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
            return new route_config_decorator_1.AsyncRoute({
                path: config.path,
                loader: wrappedLoader,
                name: config.name,
                data: config.data,
                useAsDefault: config.useAsDefault
            });
        }
        if (config.aux) {
            return new route_config_decorator_1.AuxRoute({ path: config.aux, component: config.component, name: config.name });
        }
        if (config.component) {
            if (typeof config.component == 'object') {
                var componentDefinitionObject = config.component;
                if (componentDefinitionObject.type == 'constructor') {
                    return new route_config_decorator_1.Route({
                        path: config.path,
                        component: componentDefinitionObject.constructor,
                        name: config.name,
                        data: config.data,
                        useAsDefault: config.useAsDefault
                    });
                }
                else if (componentDefinitionObject.type == 'loader') {
                    return new route_config_decorator_1.AsyncRoute({
                        path: config.path,
                        loader: componentDefinitionObject.loader,
                        name: config.name,
                        data: config.data,
                        useAsDefault: config.useAsDefault
                    });
                }
                else {
                    throw new exceptions_1.BaseException("Invalid component type \"" + componentDefinitionObject.type + "\". Valid types are \"constructor\" and \"loader\".");
                }
            }
            return new route_config_decorator_1.Route(config);
        }
        if (config.redirectTo) {
            return new route_config_decorator_1.Redirect({ path: config.path, redirectTo: config.redirectTo });
        }
        return config;
    }
    exports_1("normalizeRouteConfig", normalizeRouteConfig);
    function wrapLoaderToReconfigureRegistry(loader, registry) {
        return function () {
            return loader().then(function (componentType) {
                registry.configFromComponent(componentType);
                return componentType;
            });
        };
    }
    function assertComponentExists(component, path) {
        if (!lang_1.isType(component)) {
            throw new exceptions_1.BaseException("Component for route \"" + path + "\" is not defined, or is not a class.");
        }
    }
    exports_1("assertComponentExists", assertComponentExists);
    return {
        setters:[
            function (route_config_decorator_1_1) {
                route_config_decorator_1 = route_config_decorator_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=route_config_normalizer.js.map