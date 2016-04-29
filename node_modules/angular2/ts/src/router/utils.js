System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1;
    var TouchMap;
    function normalizeString(obj) {
        if (lang_1.isBlank(obj)) {
            return null;
        }
        else {
            return obj.toString();
        }
    }
    exports_1("normalizeString", normalizeString);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            TouchMap = (function () {
                function TouchMap(map) {
                    var _this = this;
                    this.map = {};
                    this.keys = {};
                    if (lang_1.isPresent(map)) {
                        collection_1.StringMapWrapper.forEach(map, function (value, key) {
                            _this.map[key] = lang_1.isPresent(value) ? value.toString() : null;
                            _this.keys[key] = true;
                        });
                    }
                }
                TouchMap.prototype.get = function (key) {
                    collection_1.StringMapWrapper.delete(this.keys, key);
                    return this.map[key];
                };
                TouchMap.prototype.getUnused = function () {
                    var _this = this;
                    var unused = {};
                    var keys = collection_1.StringMapWrapper.keys(this.keys);
                    keys.forEach(function (key) { return unused[key] = collection_1.StringMapWrapper.get(_this.map, key); });
                    return unused;
                };
                return TouchMap;
            }());
            exports_1("TouchMap", TouchMap);
        }
    }
});
//# sourceMappingURL=utils.js.map