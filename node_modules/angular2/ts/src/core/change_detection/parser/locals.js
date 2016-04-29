System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1;
    var Locals;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            Locals = (function () {
                function Locals(parent, current) {
                    this.parent = parent;
                    this.current = current;
                }
                Locals.prototype.contains = function (name) {
                    if (this.current.has(name)) {
                        return true;
                    }
                    if (lang_1.isPresent(this.parent)) {
                        return this.parent.contains(name);
                    }
                    return false;
                };
                Locals.prototype.get = function (name) {
                    if (this.current.has(name)) {
                        return this.current.get(name);
                    }
                    if (lang_1.isPresent(this.parent)) {
                        return this.parent.get(name);
                    }
                    throw new exceptions_1.BaseException("Cannot find '" + name + "'");
                };
                Locals.prototype.set = function (name, value) {
                    // TODO(rado): consider removing this check if we can guarantee this is not
                    // exposed to the public API.
                    // TODO: vsavkin maybe it should check only the local map
                    if (this.current.has(name)) {
                        this.current.set(name, value);
                    }
                    else {
                        throw new exceptions_1.BaseException("Setting of new keys post-construction is not supported. Key: " + name + ".");
                    }
                };
                Locals.prototype.clearLocalValues = function () { collection_1.MapWrapper.clearValues(this.current); };
                return Locals;
            }());
            exports_1("Locals", Locals);
        }
    }
});
//# sourceMappingURL=locals.js.map