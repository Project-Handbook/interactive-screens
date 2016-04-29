System.register(['angular2/src/core/di/decorators', "angular2/src/facade/collection", "angular2/src/facade/lang", 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var decorators_1, collection_1, lang_1, exceptions_1;
    var TokenType, Lexer, Token, EOF, $EOF, $TAB, $LF, $VTAB, $FF, $CR, $SPACE, $BANG, $DQ, $HASH, $$, $PERCENT, $AMPERSAND, $SQ, $LPAREN, $RPAREN, $STAR, $PLUS, $COMMA, $MINUS, $PERIOD, $SLASH, $COLON, $SEMICOLON, $LT, $EQ, $GT, $QUESTION, $0, $9, $A, $E, $Z, $LBRACKET, $BACKSLASH, $RBRACKET, $CARET, $_, $a, $e, $f, $n, $r, $t, $u, $v, $z, $LBRACE, $BAR, $RBRACE, $NBSP, ScannerError, _Scanner, OPERATORS, KEYWORDS;
    function newCharacterToken(index, code) {
        return new Token(index, TokenType.Character, code, lang_1.StringWrapper.fromCharCode(code));
    }
    function newIdentifierToken(index, text) {
        return new Token(index, TokenType.Identifier, 0, text);
    }
    function newKeywordToken(index, text) {
        return new Token(index, TokenType.Keyword, 0, text);
    }
    function newOperatorToken(index, text) {
        return new Token(index, TokenType.Operator, 0, text);
    }
    function newStringToken(index, text) {
        return new Token(index, TokenType.String, 0, text);
    }
    function newNumberToken(index, n) {
        return new Token(index, TokenType.Number, n, "");
    }
    function isWhitespace(code) {
        return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
    }
    function isIdentifierStart(code) {
        return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == $$);
    }
    function isIdentifier(input) {
        if (input.length == 0)
            return false;
        var scanner = new _Scanner(input);
        if (!isIdentifierStart(scanner.peek))
            return false;
        scanner.advance();
        while (scanner.peek !== $EOF) {
            if (!isIdentifierPart(scanner.peek))
                return false;
            scanner.advance();
        }
        return true;
    }
    exports_1("isIdentifier", isIdentifier);
    function isIdentifierPart(code) {
        return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) ||
            (code == $_) || (code == $$);
    }
    function isDigit(code) {
        return $0 <= code && code <= $9;
    }
    function isExponentStart(code) {
        return code == $e || code == $E;
    }
    function isExponentSign(code) {
        return code == $MINUS || code == $PLUS;
    }
    function unescape(code) {
        switch (code) {
            case $n:
                return $LF;
            case $f:
                return $FF;
            case $r:
                return $CR;
            case $t:
                return $TAB;
            case $v:
                return $VTAB;
            default:
                return code;
        }
    }
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            (function (TokenType) {
                TokenType[TokenType["Character"] = 0] = "Character";
                TokenType[TokenType["Identifier"] = 1] = "Identifier";
                TokenType[TokenType["Keyword"] = 2] = "Keyword";
                TokenType[TokenType["String"] = 3] = "String";
                TokenType[TokenType["Operator"] = 4] = "Operator";
                TokenType[TokenType["Number"] = 5] = "Number";
            })(TokenType || (TokenType = {}));
            exports_1("TokenType", TokenType);
            Lexer = (function () {
                function Lexer() {
                }
                Lexer.prototype.tokenize = function (text) {
                    var scanner = new _Scanner(text);
                    var tokens = [];
                    var token = scanner.scanToken();
                    while (token != null) {
                        tokens.push(token);
                        token = scanner.scanToken();
                    }
                    return tokens;
                };
                Lexer = __decorate([
                    decorators_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Lexer);
                return Lexer;
            }());
            exports_1("Lexer", Lexer);
            Token = (function () {
                function Token(index, type, numValue, strValue) {
                    this.index = index;
                    this.type = type;
                    this.numValue = numValue;
                    this.strValue = strValue;
                }
                Token.prototype.isCharacter = function (code) {
                    return (this.type == TokenType.Character && this.numValue == code);
                };
                Token.prototype.isNumber = function () { return (this.type == TokenType.Number); };
                Token.prototype.isString = function () { return (this.type == TokenType.String); };
                Token.prototype.isOperator = function (operater) {
                    return (this.type == TokenType.Operator && this.strValue == operater);
                };
                Token.prototype.isIdentifier = function () { return (this.type == TokenType.Identifier); };
                Token.prototype.isKeyword = function () { return (this.type == TokenType.Keyword); };
                Token.prototype.isKeywordVar = function () { return (this.type == TokenType.Keyword && this.strValue == "var"); };
                Token.prototype.isKeywordNull = function () { return (this.type == TokenType.Keyword && this.strValue == "null"); };
                Token.prototype.isKeywordUndefined = function () {
                    return (this.type == TokenType.Keyword && this.strValue == "undefined");
                };
                Token.prototype.isKeywordTrue = function () { return (this.type == TokenType.Keyword && this.strValue == "true"); };
                Token.prototype.isKeywordFalse = function () { return (this.type == TokenType.Keyword && this.strValue == "false"); };
                Token.prototype.toNumber = function () {
                    // -1 instead of NULL ok?
                    return (this.type == TokenType.Number) ? this.numValue : -1;
                };
                Token.prototype.toString = function () {
                    switch (this.type) {
                        case TokenType.Character:
                        case TokenType.Identifier:
                        case TokenType.Keyword:
                        case TokenType.Operator:
                        case TokenType.String:
                            return this.strValue;
                        case TokenType.Number:
                            return this.numValue.toString();
                        default:
                            return null;
                    }
                };
                return Token;
            }());
            exports_1("Token", Token);
            exports_1("EOF", EOF = new Token(-1, TokenType.Character, 0, ""));
            exports_1("$EOF", $EOF = 0);
            exports_1("$TAB", $TAB = 9);
            exports_1("$LF", $LF = 10);
            exports_1("$VTAB", $VTAB = 11);
            exports_1("$FF", $FF = 12);
            exports_1("$CR", $CR = 13);
            exports_1("$SPACE", $SPACE = 32);
            exports_1("$BANG", $BANG = 33);
            exports_1("$DQ", $DQ = 34);
            exports_1("$HASH", $HASH = 35);
            exports_1("$$", $$ = 36);
            exports_1("$PERCENT", $PERCENT = 37);
            exports_1("$AMPERSAND", $AMPERSAND = 38);
            exports_1("$SQ", $SQ = 39);
            exports_1("$LPAREN", $LPAREN = 40);
            exports_1("$RPAREN", $RPAREN = 41);
            exports_1("$STAR", $STAR = 42);
            exports_1("$PLUS", $PLUS = 43);
            exports_1("$COMMA", $COMMA = 44);
            exports_1("$MINUS", $MINUS = 45);
            exports_1("$PERIOD", $PERIOD = 46);
            exports_1("$SLASH", $SLASH = 47);
            exports_1("$COLON", $COLON = 58);
            exports_1("$SEMICOLON", $SEMICOLON = 59);
            exports_1("$LT", $LT = 60);
            exports_1("$EQ", $EQ = 61);
            exports_1("$GT", $GT = 62);
            exports_1("$QUESTION", $QUESTION = 63);
            $0 = 48;
            $9 = 57;
            $A = 65, $E = 69, $Z = 90;
            exports_1("$LBRACKET", $LBRACKET = 91);
            exports_1("$BACKSLASH", $BACKSLASH = 92);
            exports_1("$RBRACKET", $RBRACKET = 93);
            $CARET = 94;
            $_ = 95;
            $a = 97, $e = 101, $f = 102, $n = 110, $r = 114, $t = 116, $u = 117, $v = 118, $z = 122;
            exports_1("$LBRACE", $LBRACE = 123);
            exports_1("$BAR", $BAR = 124);
            exports_1("$RBRACE", $RBRACE = 125);
            $NBSP = 160;
            ScannerError = (function (_super) {
                __extends(ScannerError, _super);
                function ScannerError(message) {
                    _super.call(this);
                    this.message = message;
                }
                ScannerError.prototype.toString = function () { return this.message; };
                return ScannerError;
            }(exceptions_1.BaseException));
            exports_1("ScannerError", ScannerError);
            _Scanner = (function () {
                function _Scanner(input) {
                    this.input = input;
                    this.peek = 0;
                    this.index = -1;
                    this.length = input.length;
                    this.advance();
                }
                _Scanner.prototype.advance = function () {
                    this.peek =
                        ++this.index >= this.length ? $EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
                };
                _Scanner.prototype.scanToken = function () {
                    var input = this.input, length = this.length, peek = this.peek, index = this.index;
                    // Skip whitespace.
                    while (peek <= $SPACE) {
                        if (++index >= length) {
                            peek = $EOF;
                            break;
                        }
                        else {
                            peek = lang_1.StringWrapper.charCodeAt(input, index);
                        }
                    }
                    this.peek = peek;
                    this.index = index;
                    if (index >= length) {
                        return null;
                    }
                    // Handle identifiers and numbers.
                    if (isIdentifierStart(peek))
                        return this.scanIdentifier();
                    if (isDigit(peek))
                        return this.scanNumber(index);
                    var start = index;
                    switch (peek) {
                        case $PERIOD:
                            this.advance();
                            return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, $PERIOD);
                        case $LPAREN:
                        case $RPAREN:
                        case $LBRACE:
                        case $RBRACE:
                        case $LBRACKET:
                        case $RBRACKET:
                        case $COMMA:
                        case $COLON:
                        case $SEMICOLON:
                            return this.scanCharacter(start, peek);
                        case $SQ:
                        case $DQ:
                            return this.scanString();
                        case $HASH:
                        case $PLUS:
                        case $MINUS:
                        case $STAR:
                        case $SLASH:
                        case $PERCENT:
                        case $CARET:
                            return this.scanOperator(start, lang_1.StringWrapper.fromCharCode(peek));
                        case $QUESTION:
                            return this.scanComplexOperator(start, '?', $PERIOD, '.');
                        case $LT:
                        case $GT:
                            return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), $EQ, '=');
                        case $BANG:
                        case $EQ:
                            return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), $EQ, '=', $EQ, '=');
                        case $AMPERSAND:
                            return this.scanComplexOperator(start, '&', $AMPERSAND, '&');
                        case $BAR:
                            return this.scanComplexOperator(start, '|', $BAR, '|');
                        case $NBSP:
                            while (isWhitespace(this.peek))
                                this.advance();
                            return this.scanToken();
                    }
                    this.error("Unexpected character [" + lang_1.StringWrapper.fromCharCode(peek) + "]", 0);
                    return null;
                };
                _Scanner.prototype.scanCharacter = function (start, code) {
                    this.advance();
                    return newCharacterToken(start, code);
                };
                _Scanner.prototype.scanOperator = function (start, str) {
                    this.advance();
                    return newOperatorToken(start, str);
                };
                /**
                 * Tokenize a 2/3 char long operator
                 *
                 * @param start start index in the expression
                 * @param one first symbol (always part of the operator)
                 * @param twoCode code point for the second symbol
                 * @param two second symbol (part of the operator when the second code point matches)
                 * @param threeCode code point for the third symbol
                 * @param three third symbol (part of the operator when provided and matches source expression)
                 * @returns {Token}
                 */
                _Scanner.prototype.scanComplexOperator = function (start, one, twoCode, two, threeCode, three) {
                    this.advance();
                    var str = one;
                    if (this.peek == twoCode) {
                        this.advance();
                        str += two;
                    }
                    if (lang_1.isPresent(threeCode) && this.peek == threeCode) {
                        this.advance();
                        str += three;
                    }
                    return newOperatorToken(start, str);
                };
                _Scanner.prototype.scanIdentifier = function () {
                    var start = this.index;
                    this.advance();
                    while (isIdentifierPart(this.peek))
                        this.advance();
                    var str = this.input.substring(start, this.index);
                    if (collection_1.SetWrapper.has(KEYWORDS, str)) {
                        return newKeywordToken(start, str);
                    }
                    else {
                        return newIdentifierToken(start, str);
                    }
                };
                _Scanner.prototype.scanNumber = function (start) {
                    var simple = (this.index === start);
                    this.advance(); // Skip initial digit.
                    while (true) {
                        if (isDigit(this.peek)) {
                        }
                        else if (this.peek == $PERIOD) {
                            simple = false;
                        }
                        else if (isExponentStart(this.peek)) {
                            this.advance();
                            if (isExponentSign(this.peek))
                                this.advance();
                            if (!isDigit(this.peek))
                                this.error('Invalid exponent', -1);
                            simple = false;
                        }
                        else {
                            break;
                        }
                        this.advance();
                    }
                    var str = this.input.substring(start, this.index);
                    // TODO
                    var value = simple ? lang_1.NumberWrapper.parseIntAutoRadix(str) : lang_1.NumberWrapper.parseFloat(str);
                    return newNumberToken(start, value);
                };
                _Scanner.prototype.scanString = function () {
                    var start = this.index;
                    var quote = this.peek;
                    this.advance(); // Skip initial quote.
                    var buffer;
                    var marker = this.index;
                    var input = this.input;
                    while (this.peek != quote) {
                        if (this.peek == $BACKSLASH) {
                            if (buffer == null)
                                buffer = new lang_1.StringJoiner();
                            buffer.add(input.substring(marker, this.index));
                            this.advance();
                            var unescapedCode;
                            if (this.peek == $u) {
                                // 4 character hex code for unicode character.
                                var hex = input.substring(this.index + 1, this.index + 5);
                                try {
                                    unescapedCode = lang_1.NumberWrapper.parseInt(hex, 16);
                                }
                                catch (e) {
                                    this.error("Invalid unicode escape [\\u" + hex + "]", 0);
                                }
                                for (var i = 0; i < 5; i++) {
                                    this.advance();
                                }
                            }
                            else {
                                unescapedCode = unescape(this.peek);
                                this.advance();
                            }
                            buffer.add(lang_1.StringWrapper.fromCharCode(unescapedCode));
                            marker = this.index;
                        }
                        else if (this.peek == $EOF) {
                            this.error('Unterminated quote', 0);
                        }
                        else {
                            this.advance();
                        }
                    }
                    var last = input.substring(marker, this.index);
                    this.advance(); // Skip terminating quote.
                    // Compute the unescaped string value.
                    var unescaped = last;
                    if (buffer != null) {
                        buffer.add(last);
                        unescaped = buffer.toString();
                    }
                    return newStringToken(start, unescaped);
                };
                _Scanner.prototype.error = function (message, offset) {
                    var position = this.index + offset;
                    throw new ScannerError("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]");
                };
                return _Scanner;
            }());
            OPERATORS = collection_1.SetWrapper.createFromList([
                '+',
                '-',
                '*',
                '/',
                '%',
                '^',
                '=',
                '==',
                '!=',
                '===',
                '!==',
                '<',
                '>',
                '<=',
                '>=',
                '&&',
                '||',
                '&',
                '|',
                '!',
                '?',
                '#',
                '?.'
            ]);
            KEYWORDS = collection_1.SetWrapper.createFromList(['var', 'null', 'undefined', 'true', 'false', 'if', 'else']);
        }
    }
});
//# sourceMappingURL=lexer.js.map