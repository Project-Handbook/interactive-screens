System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, lang_1;
    var _nextRequestId, JSONP_HOME, _jsonpConnections, BrowserJsonp;
    function _getJsonpConnections() {
        if (_jsonpConnections === null) {
            _jsonpConnections = lang_1.global[JSONP_HOME] = {};
        }
        return _jsonpConnections;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            _nextRequestId = 0;
            exports_1("JSONP_HOME", JSONP_HOME = '__ng_jsonp__');
            _jsonpConnections = null;
            // Make sure not to evaluate this in a non-browser environment!
            BrowserJsonp = (function () {
                function BrowserJsonp() {
                }
                // Construct a <script> element with the specified URL
                BrowserJsonp.prototype.build = function (url) {
                    var node = document.createElement('script');
                    node.src = url;
                    return node;
                };
                BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
                BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
                BrowserJsonp.prototype.exposeConnection = function (id, connection) {
                    var connections = _getJsonpConnections();
                    connections[id] = connection;
                };
                BrowserJsonp.prototype.removeConnection = function (id) {
                    var connections = _getJsonpConnections();
                    connections[id] = null;
                };
                // Attach the <script> element to the DOM
                BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
                // Remove <script> element from the DOM
                BrowserJsonp.prototype.cleanup = function (node) {
                    if (node.parentNode) {
                        node.parentNode.removeChild((node));
                    }
                };
                BrowserJsonp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BrowserJsonp);
                return BrowserJsonp;
            }());
            exports_1("BrowserJsonp", BrowserJsonp);
        }
    }
});
//# sourceMappingURL=browser_jsonp.js.map