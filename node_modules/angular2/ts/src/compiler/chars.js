System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var $EOF, $TAB, $LF, $VTAB, $FF, $CR, $SPACE, $BANG, $DQ, $HASH, $$, $PERCENT, $AMPERSAND, $SQ, $LPAREN, $RPAREN, $STAR, $PLUS, $COMMA, $MINUS, $PERIOD, $SLASH, $COLON, $SEMICOLON, $LT, $EQ, $GT, $QUESTION, $0, $9, $A, $E, $Z, $LBRACKET, $BACKSLASH, $RBRACKET, $CARET, $_, $a, $e, $f, $n, $r, $t, $u, $v, $z, $LBRACE, $BAR, $RBRACE, $NBSP, $PIPE, $TILDA, $AT;
    function isWhitespace(code) {
        return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
    }
    exports_1("isWhitespace", isWhitespace);
    return {
        setters:[],
        execute: function() {
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
            exports_1("$0", $0 = 48);
            exports_1("$9", $9 = 57);
            exports_1("$A", $A = 65);
            exports_1("$E", $E = 69);
            exports_1("$Z", $Z = 90);
            exports_1("$LBRACKET", $LBRACKET = 91);
            exports_1("$BACKSLASH", $BACKSLASH = 92);
            exports_1("$RBRACKET", $RBRACKET = 93);
            exports_1("$CARET", $CARET = 94);
            exports_1("$_", $_ = 95);
            exports_1("$a", $a = 97);
            exports_1("$e", $e = 101);
            exports_1("$f", $f = 102);
            exports_1("$n", $n = 110);
            exports_1("$r", $r = 114);
            exports_1("$t", $t = 116);
            exports_1("$u", $u = 117);
            exports_1("$v", $v = 118);
            exports_1("$z", $z = 122);
            exports_1("$LBRACE", $LBRACE = 123);
            exports_1("$BAR", $BAR = 124);
            exports_1("$RBRACE", $RBRACE = 125);
            exports_1("$NBSP", $NBSP = 160);
            exports_1("$PIPE", $PIPE = 124);
            exports_1("$TILDA", $TILDA = 126);
            exports_1("$AT", $AT = 64);
        }
    }
});
//# sourceMappingURL=chars.js.map