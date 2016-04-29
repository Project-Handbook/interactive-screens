System.register(['angular2/src/facade/lang', './route_path'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, route_path_1;
    var RegexRoutePath;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (route_path_1_1) {
                route_path_1 = route_path_1_1;
            }],
        execute: function() {
            RegexRoutePath = (function () {
                function RegexRoutePath(_reString, _serializer) {
                    this._reString = _reString;
                    this._serializer = _serializer;
                    this.terminal = true;
                    this.specificity = '2';
                    this.hash = this._reString;
                    this._regex = lang_1.RegExpWrapper.create(this._reString);
                }
                RegexRoutePath.prototype.matchUrl = function (url) {
                    var urlPath = url.toString();
                    var params = {};
                    var matcher = lang_1.RegExpWrapper.matcher(this._regex, urlPath);
                    var match = lang_1.RegExpMatcherWrapper.next(matcher);
                    if (lang_1.isBlank(match)) {
                        return null;
                    }
                    for (var i = 0; i < match.length; i += 1) {
                        params[i.toString()] = match[i];
                    }
                    return new route_path_1.MatchedUrl(urlPath, [], params, [], null);
                };
                RegexRoutePath.prototype.generateUrl = function (params) { return this._serializer(params); };
                RegexRoutePath.prototype.toString = function () { return this._reString; };
                return RegexRoutePath;
            }());
            exports_1("RegexRoutePath", RegexRoutePath);
        }
    }
});
//# sourceMappingURL=regex_route_path.js.map