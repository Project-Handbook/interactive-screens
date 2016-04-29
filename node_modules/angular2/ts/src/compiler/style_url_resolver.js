// Some of the code comes from WebComponents.JS
// https://github.com/webcomponents/webcomponentsjs/blob/master/src/HTMLImports/path.js
System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var StyleWithImports, _cssImportRe, _urlWithSchemaRe;
    function isStyleUrlResolvable(url) {
        if (lang_1.isBlank(url) || url.length === 0 || url[0] == '/')
            return false;
        var schemeMatch = lang_1.RegExpWrapper.firstMatch(_urlWithSchemaRe, url);
        return lang_1.isBlank(schemeMatch) || schemeMatch[1] == 'package' || schemeMatch[1] == 'asset';
    }
    exports_1("isStyleUrlResolvable", isStyleUrlResolvable);
    /**
     * Rewrites stylesheets by resolving and removing the @import urls that
     * are either relative or don't have a `package:` scheme
     */
    function extractStyleUrls(resolver, baseUrl, cssText) {
        var foundUrls = [];
        var modifiedCssText = lang_1.StringWrapper.replaceAllMapped(cssText, _cssImportRe, function (m) {
            var url = lang_1.isPresent(m[1]) ? m[1] : m[2];
            if (!isStyleUrlResolvable(url)) {
                // Do not attempt to resolve non-package absolute URLs with URI scheme
                return m[0];
            }
            foundUrls.push(resolver.resolve(baseUrl, url));
            return '';
        });
        return new StyleWithImports(modifiedCssText, foundUrls);
    }
    exports_1("extractStyleUrls", extractStyleUrls);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            StyleWithImports = (function () {
                function StyleWithImports(style, styleUrls) {
                    this.style = style;
                    this.styleUrls = styleUrls;
                }
                return StyleWithImports;
            }());
            exports_1("StyleWithImports", StyleWithImports);
            _cssImportRe = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
            // TODO: can't use /^[^:/?#.]+:/g due to clang-format bug:
            //       https://github.com/angular/angular/issues/4596
            _urlWithSchemaRe = /^([a-zA-Z\-\+\.]+):/g;
        }
    }
});
//# sourceMappingURL=style_url_resolver.js.map