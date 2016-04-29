System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MatchedUrl, GeneratedUrl;
    return {
        setters:[],
        execute: function() {
            MatchedUrl = (function () {
                function MatchedUrl(urlPath, urlParams, allParams, auxiliary, rest) {
                    this.urlPath = urlPath;
                    this.urlParams = urlParams;
                    this.allParams = allParams;
                    this.auxiliary = auxiliary;
                    this.rest = rest;
                }
                return MatchedUrl;
            }());
            exports_1("MatchedUrl", MatchedUrl);
            GeneratedUrl = (function () {
                function GeneratedUrl(urlPath, urlParams) {
                    this.urlPath = urlPath;
                    this.urlParams = urlParams;
                }
                return GeneratedUrl;
            }());
            exports_1("GeneratedUrl", GeneratedUrl);
        }
    }
});
//# sourceMappingURL=route_path.js.map