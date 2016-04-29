System.register(['angular2/core', 'angular2/platform/browser', 'angular2/compiler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1, browser_1, compiler_1;
    var MyApp, MyUrlResolver;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            }],
        execute: function() {
            // #docregion url_resolver
            MyUrlResolver = (function (_super) {
                __extends(MyUrlResolver, _super);
                function MyUrlResolver() {
                    _super.apply(this, arguments);
                }
                MyUrlResolver.prototype.resolve = function (baseUrl, url) {
                    // Serve CSS files from a special CDN.
                    if (url.substr(-4) === '.css') {
                        return _super.prototype.resolve.call(this, 'http://cdn.myapp.com/css/', url);
                    }
                    return _super.prototype.resolve.call(this, baseUrl, url);
                };
                return MyUrlResolver;
            }(compiler_1.UrlResolver));
            browser_1.bootstrap(MyApp, [core_1.provide(compiler_1.UrlResolver, { useClass: MyUrlResolver })]);
        }
    }
});
// #enddocregion
//# sourceMappingURL=url_resolver.js.map