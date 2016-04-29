System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1;
    var MOUSE_EVENT_PROPERTIES, KEYBOARD_EVENT_PROPERTIES, TRANSITION_EVENT_PROPERTIES, EVENT_PROPERTIES, NODES_WITH_VALUE;
    function serializeGenericEvent(e) {
        return serializeEvent(e, EVENT_PROPERTIES);
    }
    exports_1("serializeGenericEvent", serializeGenericEvent);
    // TODO(jteplitz602): Allow users to specify the properties they need rather than always
    // adding value and files #3374
    function serializeEventWithTarget(e) {
        var serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    exports_1("serializeEventWithTarget", serializeEventWithTarget);
    function serializeMouseEvent(e) {
        return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
    }
    exports_1("serializeMouseEvent", serializeMouseEvent);
    function serializeKeyboardEvent(e) {
        var serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    exports_1("serializeKeyboardEvent", serializeKeyboardEvent);
    function serializeTransitionEvent(e) {
        var serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    exports_1("serializeTransitionEvent", serializeTransitionEvent);
    // TODO(jteplitz602): #3374. See above.
    function addTarget(e, serializedEvent) {
        if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
            var target = e.target;
            serializedEvent['target'] = { 'value': target.value };
            if (lang_1.isPresent(target.files)) {
                serializedEvent['target']['files'] = target.files;
            }
        }
        return serializedEvent;
    }
    function serializeEvent(e, properties) {
        var serialized = {};
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            serialized[prop] = e[prop];
        }
        return serialized;
    }
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            MOUSE_EVENT_PROPERTIES = [
                "altKey",
                "button",
                "clientX",
                "clientY",
                "metaKey",
                "movementX",
                "movementY",
                "offsetX",
                "offsetY",
                "region",
                "screenX",
                "screenY",
                "shiftKey"
            ];
            KEYBOARD_EVENT_PROPERTIES = [
                'altkey',
                'charCode',
                'code',
                'ctrlKey',
                'isComposing',
                'key',
                'keyCode',
                'location',
                'metaKey',
                'repeat',
                'shiftKey',
                'which'
            ];
            TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
            EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
            NODES_WITH_VALUE = new collection_1.Set(["input", "select", "option", "button", "li", "meter", "progress", "param"]);
        }
    }
});
//# sourceMappingURL=event_serializer.js.map