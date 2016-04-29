/**
 * @module
 * @description
 * Change detection enables data binding in Angular.
 */
System.register(['./change_detection/change_detection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (change_detection_1_1) {
                exports_1({
                    "ChangeDetectionStrategy": change_detection_1_1["ChangeDetectionStrategy"],
                    "ExpressionChangedAfterItHasBeenCheckedException": change_detection_1_1["ExpressionChangedAfterItHasBeenCheckedException"],
                    "ChangeDetectionError": change_detection_1_1["ChangeDetectionError"],
                    "ChangeDetectorRef": change_detection_1_1["ChangeDetectorRef"],
                    "WrappedValue": change_detection_1_1["WrappedValue"],
                    "SimpleChange": change_detection_1_1["SimpleChange"],
                    "PipeTransform": change_detection_1_1["PipeTransform"],
                    "IterableDiffers": change_detection_1_1["IterableDiffers"],
                    "IterableDiffer": change_detection_1_1["IterableDiffer"],
                    "IterableDifferFactory": change_detection_1_1["IterableDifferFactory"],
                    "KeyValueDiffers": change_detection_1_1["KeyValueDiffers"],
                    "KeyValueDiffer": change_detection_1_1["KeyValueDiffer"],
                    "KeyValueDifferFactory": change_detection_1_1["KeyValueDifferFactory"],
                    "CollectionChangeRecord": change_detection_1_1["CollectionChangeRecord"],
                    "KeyValueChangeRecord": change_detection_1_1["KeyValueChangeRecord"],
                    "TrackByFn": change_detection_1_1["TrackByFn"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=change_detection.js.map