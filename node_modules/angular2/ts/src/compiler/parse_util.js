System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ParseLocation, ParseSourceFile, ParseSourceSpan, ParseError;
    return {
        setters:[],
        execute: function() {
            ParseLocation = (function () {
                function ParseLocation(file, offset, line, col) {
                    this.file = file;
                    this.offset = offset;
                    this.line = line;
                    this.col = col;
                }
                ParseLocation.prototype.toString = function () { return this.file.url + "@" + this.line + ":" + this.col; };
                return ParseLocation;
            }());
            exports_1("ParseLocation", ParseLocation);
            ParseSourceFile = (function () {
                function ParseSourceFile(content, url) {
                    this.content = content;
                    this.url = url;
                }
                return ParseSourceFile;
            }());
            exports_1("ParseSourceFile", ParseSourceFile);
            ParseSourceSpan = (function () {
                function ParseSourceSpan(start, end) {
                    this.start = start;
                    this.end = end;
                }
                ParseSourceSpan.prototype.toString = function () {
                    return this.start.file.content.substring(this.start.offset, this.end.offset);
                };
                return ParseSourceSpan;
            }());
            exports_1("ParseSourceSpan", ParseSourceSpan);
            ParseError = (function () {
                function ParseError(span, msg) {
                    this.span = span;
                    this.msg = msg;
                }
                ParseError.prototype.toString = function () {
                    var source = this.span.start.file.content;
                    var ctxStart = this.span.start.offset;
                    if (ctxStart > source.length - 1) {
                        ctxStart = source.length - 1;
                    }
                    var ctxEnd = ctxStart;
                    var ctxLen = 0;
                    var ctxLines = 0;
                    while (ctxLen < 100 && ctxStart > 0) {
                        ctxStart--;
                        ctxLen++;
                        if (source[ctxStart] == "\n") {
                            if (++ctxLines == 3) {
                                break;
                            }
                        }
                    }
                    ctxLen = 0;
                    ctxLines = 0;
                    while (ctxLen < 100 && ctxEnd < source.length - 1) {
                        ctxEnd++;
                        ctxLen++;
                        if (source[ctxEnd] == "\n") {
                            if (++ctxLines == 3) {
                                break;
                            }
                        }
                    }
                    var context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
                        source.substring(this.span.start.offset, ctxEnd + 1);
                    return this.msg + " (\"" + context + "\"): " + this.span.start;
                };
                return ParseError;
            }());
            exports_1("ParseError", ParseError);
        }
    }
});
//# sourceMappingURL=parse_util.js.map