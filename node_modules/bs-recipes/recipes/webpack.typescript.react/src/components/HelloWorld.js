System.register(['react'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React;
    var HelloWorldComponent;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            HelloWorldComponent = (function (_super) {
                __extends(HelloWorldComponent, _super);
                function HelloWorldComponent() {
                    _super.apply(this, arguments);
                }
                HelloWorldComponent.prototype.render = function () {
                    var name = this.props.name;
                    return (<div>
                Hello World! Good work {name}
            </div>);
                };
                return HelloWorldComponent;
            }(React.Component));
            exports_1("default", HelloWorldComponent);
        }
    }
});
//# sourceMappingURL=HelloWorld.js.map