System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './forward_ref'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, forward_ref_1;
    var Key, KeyRegistry, _globalKeyRegistry;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (forward_ref_1_1) {
                forward_ref_1 = forward_ref_1_1;
            }],
        execute: function() {
            /**
             * A unique object used for retrieving items from the {@link Injector}.
             *
             * Keys have:
             * - a system-wide unique `id`.
             * - a `token`.
             *
             * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
             * injector to store created objects in a more efficient way.
             *
             * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
             * providers.
             */
            Key = (function () {
                /**
                 * Private
                 */
                function Key(token, id) {
                    this.token = token;
                    this.id = id;
                    if (lang_1.isBlank(token)) {
                        throw new exceptions_1.BaseException('Token must be defined!');
                    }
                }
                Object.defineProperty(Key.prototype, "displayName", {
                    /**
                     * Returns a stringified token.
                     */
                    get: function () { return lang_1.stringify(this.token); },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Retrieves a `Key` for a token.
                 */
                Key.get = function (token) { return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token)); };
                Object.defineProperty(Key, "numberOfKeys", {
                    /**
                     * @returns the number of keys registered in the system.
                     */
                    get: function () { return _globalKeyRegistry.numberOfKeys; },
                    enumerable: true,
                    configurable: true
                });
                return Key;
            }());
            exports_1("Key", Key);
            /**
             * @internal
             */
            KeyRegistry = (function () {
                function KeyRegistry() {
                    this._allKeys = new Map();
                }
                KeyRegistry.prototype.get = function (token) {
                    if (token instanceof Key)
                        return token;
                    if (this._allKeys.has(token)) {
                        return this._allKeys.get(token);
                    }
                    var newKey = new Key(token, Key.numberOfKeys);
                    this._allKeys.set(token, newKey);
                    return newKey;
                };
                Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
                    get: function () { return this._allKeys.size; },
                    enumerable: true,
                    configurable: true
                });
                return KeyRegistry;
            }());
            exports_1("KeyRegistry", KeyRegistry);
            _globalKeyRegistry = new KeyRegistry();
        }
    }
});
//# sourceMappingURL=key.js.map