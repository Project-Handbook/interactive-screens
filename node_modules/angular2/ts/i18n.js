System.register(['./src/i18n/message', './src/i18n/xmb_serializer', './src/i18n/message_extractor', './src/i18n/i18n_html_parser'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (message_1_1) {
                exportStar_1(message_1_1);
            },
            function (xmb_serializer_1_1) {
                exportStar_1(xmb_serializer_1_1);
            },
            function (message_extractor_1_1) {
                exportStar_1(message_extractor_1_1);
            },
            function (i18n_html_parser_1_1) {
                exportStar_1(i18n_html_parser_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=i18n.js.map