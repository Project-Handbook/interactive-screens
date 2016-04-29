System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var Message;
    /**
     * Computes the id of a message
     */
    function id(m) {
        var meaning = lang_1.isPresent(m.meaning) ? m.meaning : "";
        var content = lang_1.isPresent(m.content) ? m.content : "";
        return lang_1.escape("$ng|" + meaning + "|" + content);
    }
    exports_1("id", id);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A message extracted from a template.
             *
             * The identity of a message is comprised of `content` and `meaning`.
             *
             * `description` is additional information provided to the translator.
             */
            Message = (function () {
                function Message(content, meaning, description) {
                    if (description === void 0) { description = null; }
                    this.content = content;
                    this.meaning = meaning;
                    this.description = description;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});
//# sourceMappingURL=message.js.map