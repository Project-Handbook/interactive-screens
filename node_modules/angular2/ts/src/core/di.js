/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
System.register(['./di/metadata', './di/decorators', './di/forward_ref', './di/injector', './di/provider', './di/key', './di/exceptions', './di/opaque_token'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'InjectMetadata': true,
        'OptionalMetadata': true,
        'InjectableMetadata': true,
        'SelfMetadata': true,
        'HostMetadata': true,
        'SkipSelfMetadata': true,
        'DependencyMetadata': true,
        'forwardRef': true,
        'resolveForwardRef': true,
        'ForwardRefFn': true,
        'Injector': true,
        'Binding': true,
        'ProviderBuilder': true,
        'ResolvedBinding': true,
        'ResolvedFactory': true,
        'Dependency': true,
        'bind': true,
        'Provider': true,
        'ResolvedProvider': true,
        'provide': true,
        'Key': true,
        'NoProviderError': true,
        'AbstractProviderError': true,
        'CyclicDependencyError': true,
        'InstantiationError': true,
        'InvalidProviderError': true,
        'NoAnnotationError': true,
        'OutOfBoundsError': true,
        'OpaqueToken': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (metadata_1_1) {
                exports_1({
                    "InjectMetadata": metadata_1_1["InjectMetadata"],
                    "OptionalMetadata": metadata_1_1["OptionalMetadata"],
                    "InjectableMetadata": metadata_1_1["InjectableMetadata"],
                    "SelfMetadata": metadata_1_1["SelfMetadata"],
                    "HostMetadata": metadata_1_1["HostMetadata"],
                    "SkipSelfMetadata": metadata_1_1["SkipSelfMetadata"],
                    "DependencyMetadata": metadata_1_1["DependencyMetadata"]
                });
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            },
            function (forward_ref_1_1) {
                exports_1({
                    "forwardRef": forward_ref_1_1["forwardRef"],
                    "resolveForwardRef": forward_ref_1_1["resolveForwardRef"],
                    "ForwardRefFn": forward_ref_1_1["ForwardRefFn"]
                });
            },
            function (injector_1_1) {
                exports_1({
                    "Injector": injector_1_1["Injector"]
                });
            },
            function (provider_1_1) {
                exports_1({
                    "Binding": provider_1_1["Binding"],
                    "ProviderBuilder": provider_1_1["ProviderBuilder"],
                    "ResolvedBinding": provider_1_1["ResolvedBinding"],
                    "ResolvedFactory": provider_1_1["ResolvedFactory"],
                    "Dependency": provider_1_1["Dependency"],
                    "bind": provider_1_1["bind"],
                    "Provider": provider_1_1["Provider"],
                    "ResolvedProvider": provider_1_1["ResolvedProvider"],
                    "provide": provider_1_1["provide"]
                });
            },
            function (key_1_1) {
                exports_1({
                    "Key": key_1_1["Key"]
                });
            },
            function (exceptions_1_1) {
                exports_1({
                    "NoProviderError": exceptions_1_1["NoProviderError"],
                    "AbstractProviderError": exceptions_1_1["AbstractProviderError"],
                    "CyclicDependencyError": exceptions_1_1["CyclicDependencyError"],
                    "InstantiationError": exceptions_1_1["InstantiationError"],
                    "InvalidProviderError": exceptions_1_1["InvalidProviderError"],
                    "NoAnnotationError": exceptions_1_1["NoAnnotationError"],
                    "OutOfBoundsError": exceptions_1_1["OutOfBoundsError"]
                });
            },
            function (opaque_token_1_1) {
                exports_1({
                    "OpaqueToken": opaque_token_1_1["OpaqueToken"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=di.js.map