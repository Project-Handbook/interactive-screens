System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './http_utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, http_utils_1;
    var Response;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (http_utils_1_1) {
                http_utils_1 = http_utils_1_1;
            }],
        execute: function() {
            /**
             * Creates `Response` instances from provided values.
             *
             * Though this object isn't
             * usually instantiated by end-users, it is the primary object interacted with when it comes time to
             * add data to a view.
             *
             * ### Example
             *
             * ```
             * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
             * ```
             *
             * The Response's interface is inspired by the Response constructor defined in the [Fetch
             * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
             * can be accessed many times. There are other differences in the implementation, but this is the
             * most significant.
             */
            Response = (function () {
                function Response(responseOptions) {
                    this._body = responseOptions.body;
                    this.status = responseOptions.status;
                    this.statusText = responseOptions.statusText;
                    this.headers = responseOptions.headers;
                    this.type = responseOptions.type;
                    this.url = responseOptions.url;
                }
                /**
                 * Not yet implemented
                 */
                // TODO: Blob return type
                Response.prototype.blob = function () { throw new exceptions_1.BaseException('"blob()" method not implemented on Response superclass'); };
                /**
                 * Attempts to return body as parsed `JSON` object, or raises an exception.
                 */
                Response.prototype.json = function () {
                    var jsonResponse;
                    if (http_utils_1.isJsObject(this._body)) {
                        jsonResponse = this._body;
                    }
                    else if (lang_1.isString(this._body)) {
                        jsonResponse = lang_1.Json.parse(this._body);
                    }
                    return jsonResponse;
                };
                /**
                 * Returns the body as a string, presuming `toString()` can be called on the response body.
                 */
                Response.prototype.text = function () { return this._body.toString(); };
                /**
                 * Not yet implemented
                 */
                // TODO: ArrayBuffer return type
                Response.prototype.arrayBuffer = function () {
                    throw new exceptions_1.BaseException('"arrayBuffer()" method not implemented on Response superclass');
                };
                return Response;
            }());
            exports_1("Response", Response);
        }
    }
});
//# sourceMappingURL=static_response.js.map