System.register(['react', 'react-dom', './components/HelloWorld.tsx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, ReactDOM, HelloWorld_tsx_1;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (HelloWorld_tsx_1_1) {
                HelloWorld_tsx_1 = HelloWorld_tsx_1_1;
            }],
        execute: function() {
            ReactDOM.render(<HelloWorld_tsx_1.default name="Shane"/>, document.getElementById('app'));
        }
    }
});
//# sourceMappingURL=main.js.map