System.register(['angular2/src/facade/lang', 'angular2/src/compiler/html_ast', './message', 'angular2/src/compiler/html_parser', 'angular2/src/compiler/parse_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, html_ast_1, message_1, html_parser_1, parse_util_1;
    var _PLACEHOLDER_REGEXP, _ID_ATTR, _MSG_ELEMENT, _BUNDLE_ELEMENT, XmbDeserializationResult, XmbDeserializationError;
    function serializeXmb(messages) {
        var ms = messages.map(function (m) { return _serializeMessage(m); }).join("");
        return "<message-bundle>" + ms + "</message-bundle>";
    }
    exports_1("serializeXmb", serializeXmb);
    function deserializeXmb(content, url) {
        var parser = new html_parser_1.HtmlParser();
        var normalizedContent = _expandPlaceholder(content.trim());
        var parsed = parser.parse(normalizedContent, url);
        if (parsed.errors.length > 0) {
            return new XmbDeserializationResult(null, {}, parsed.errors);
        }
        if (_checkRootElement(parsed.rootNodes)) {
            return new XmbDeserializationResult(null, {}, [new XmbDeserializationError(null, "Missing element \"" + _BUNDLE_ELEMENT + "\"")]);
        }
        var bundleEl = parsed.rootNodes[0]; // test this
        var errors = [];
        var messages = {};
        _createMessages(bundleEl.children, messages, errors);
        return (errors.length == 0) ?
            new XmbDeserializationResult(normalizedContent, messages, []) :
            new XmbDeserializationResult(null, {}, errors);
    }
    exports_1("deserializeXmb", deserializeXmb);
    function _checkRootElement(nodes) {
        return nodes.length < 1 || !(nodes[0] instanceof html_ast_1.HtmlElementAst) ||
            nodes[0].name != _BUNDLE_ELEMENT;
    }
    function _createMessages(nodes, messages, errors) {
        nodes.forEach(function (item) {
            if (item instanceof html_ast_1.HtmlElementAst) {
                var msg = item;
                if (msg.name != _MSG_ELEMENT) {
                    errors.push(new XmbDeserializationError(item.sourceSpan, "Unexpected element \"" + msg.name + "\""));
                    return;
                }
                var id_1 = _id(msg);
                if (lang_1.isBlank(id_1)) {
                    errors.push(new XmbDeserializationError(item.sourceSpan, "\"" + _ID_ATTR + "\" attribute is missing"));
                    return;
                }
                messages[id_1] = msg.children;
            }
        });
    }
    function _id(el) {
        var ids = el.attrs.filter(function (a) { return a.name == _ID_ATTR; });
        return ids.length > 0 ? ids[0].value : null;
    }
    function _serializeMessage(m) {
        var desc = lang_1.isPresent(m.description) ? " desc='" + m.description + "'" : "";
        return "<msg id='" + message_1.id(m) + "'" + desc + ">" + m.content + "</msg>";
    }
    function _expandPlaceholder(input) {
        return lang_1.RegExpWrapper.replaceAll(_PLACEHOLDER_REGEXP, input, function (match) {
            var nameWithQuotes = match[2];
            return "<ph name=" + nameWithQuotes + "></ph>";
        });
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (html_parser_1_1) {
                html_parser_1 = html_parser_1_1;
            },
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            }],
        execute: function() {
            _PLACEHOLDER_REGEXP = lang_1.RegExpWrapper.create("\\<ph(\\s)+name=(\"(\\w)+\")\\/\\>");
            _ID_ATTR = "id";
            _MSG_ELEMENT = "msg";
            _BUNDLE_ELEMENT = "message-bundle";
            XmbDeserializationResult = (function () {
                function XmbDeserializationResult(content, messages, errors) {
                    this.content = content;
                    this.messages = messages;
                    this.errors = errors;
                }
                return XmbDeserializationResult;
            }());
            exports_1("XmbDeserializationResult", XmbDeserializationResult);
            XmbDeserializationError = (function (_super) {
                __extends(XmbDeserializationError, _super);
                function XmbDeserializationError(span, msg) {
                    _super.call(this, span, msg);
                }
                return XmbDeserializationError;
            }(parse_util_1.ParseError));
            exports_1("XmbDeserializationError", XmbDeserializationError);
        }
    }
});
//# sourceMappingURL=xmb_serializer.js.map