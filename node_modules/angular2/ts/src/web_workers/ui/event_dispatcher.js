System.register(['angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/ui/event_serializer', 'angular2/src/facade/exceptions', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var serializer_1, event_serializer_1, exceptions_1, async_1;
    var EventDispatcher;
    return {
        setters:[
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (event_serializer_1_1) {
                event_serializer_1 = event_serializer_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            EventDispatcher = (function () {
                function EventDispatcher(_sink, _serializer) {
                    this._sink = _sink;
                    this._serializer = _serializer;
                }
                EventDispatcher.prototype.dispatchRenderEvent = function (element, eventTarget, eventName, event) {
                    var serializedEvent;
                    // TODO (jteplitz602): support custom events #3350
                    switch (event.type) {
                        case "click":
                        case "mouseup":
                        case "mousedown":
                        case "dblclick":
                        case "contextmenu":
                        case "mouseenter":
                        case "mouseleave":
                        case "mousemove":
                        case "mouseout":
                        case "mouseover":
                        case "show":
                            serializedEvent = event_serializer_1.serializeMouseEvent(event);
                            break;
                        case "keydown":
                        case "keypress":
                        case "keyup":
                            serializedEvent = event_serializer_1.serializeKeyboardEvent(event);
                            break;
                        case "input":
                        case "change":
                        case "blur":
                            serializedEvent = event_serializer_1.serializeEventWithTarget(event);
                            break;
                        case "abort":
                        case "afterprint":
                        case "beforeprint":
                        case "cached":
                        case "canplay":
                        case "canplaythrough":
                        case "chargingchange":
                        case "chargingtimechange":
                        case "close":
                        case "dischargingtimechange":
                        case "DOMContentLoaded":
                        case "downloading":
                        case "durationchange":
                        case "emptied":
                        case "ended":
                        case "error":
                        case "fullscreenchange":
                        case "fullscreenerror":
                        case "invalid":
                        case "languagechange":
                        case "levelfchange":
                        case "loadeddata":
                        case "loadedmetadata":
                        case "obsolete":
                        case "offline":
                        case "online":
                        case "open":
                        case "orientatoinchange":
                        case "pause":
                        case "pointerlockchange":
                        case "pointerlockerror":
                        case "play":
                        case "playing":
                        case "ratechange":
                        case "readystatechange":
                        case "reset":
                        case "scroll":
                        case "seeked":
                        case "seeking":
                        case "stalled":
                        case "submit":
                        case "success":
                        case "suspend":
                        case "timeupdate":
                        case "updateready":
                        case "visibilitychange":
                        case "volumechange":
                        case "waiting":
                            serializedEvent = event_serializer_1.serializeGenericEvent(event);
                            break;
                        case "transitionend":
                            serializedEvent = event_serializer_1.serializeTransitionEvent(event);
                            break;
                        default:
                            throw new exceptions_1.BaseException(eventName + " not supported on WebWorkers");
                    }
                    async_1.ObservableWrapper.callEmit(this._sink, {
                        "element": this._serializer.serialize(element, serializer_1.RenderStoreObject),
                        "eventName": eventName,
                        "eventTarget": eventTarget,
                        "event": serializedEvent
                    });
                    // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
                    // should be canceled, but for now just call `preventDefault` on the original DOM event.
                    return false;
                };
                return EventDispatcher;
            }());
            exports_1("EventDispatcher", EventDispatcher);
        }
    }
});
//# sourceMappingURL=event_dispatcher.js.map