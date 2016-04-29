System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocationType;
    return {
        setters:[],
        execute: function() {
            // This file contains interface versions of browser types that can be serialized to Plain Old
            // JavaScript Objects
            LocationType = (function () {
                function LocationType(href, protocol, host, hostname, port, pathname, search, hash, origin) {
                    this.href = href;
                    this.protocol = protocol;
                    this.host = host;
                    this.hostname = hostname;
                    this.port = port;
                    this.pathname = pathname;
                    this.search = search;
                    this.hash = hash;
                    this.origin = origin;
                }
                return LocationType;
            }());
            exports_1("LocationType", LocationType);
        }
    }
});
//# sourceMappingURL=serialized_types.js.map