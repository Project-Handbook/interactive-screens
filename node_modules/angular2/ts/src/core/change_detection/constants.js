System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var ChangeDetectorState, ChangeDetectionStrategy, CHANGE_DETECTION_STRATEGY_VALUES, CHANGE_DETECTOR_STATE_VALUES;
    function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
        return lang_1.isBlank(changeDetectionStrategy) ||
            changeDetectionStrategy === ChangeDetectionStrategy.Default;
    }
    exports_1("isDefaultChangeDetectionStrategy", isDefaultChangeDetectionStrategy);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Describes the current state of the change detector.
             */
            (function (ChangeDetectorState) {
                /**
                 * `NeverChecked` means that the change detector has not been checked yet, and
                 * initialization methods should be called during detection.
                 */
                ChangeDetectorState[ChangeDetectorState["NeverChecked"] = 0] = "NeverChecked";
                /**
                 * `CheckedBefore` means that the change detector has successfully completed at least
                 * one detection previously.
                 */
                ChangeDetectorState[ChangeDetectorState["CheckedBefore"] = 1] = "CheckedBefore";
                /**
                 * `Errored` means that the change detector encountered an error checking a binding
                 * or calling a directive lifecycle method and is now in an inconsistent state. Change
                 * detectors in this state will no longer detect changes.
                 */
                ChangeDetectorState[ChangeDetectorState["Errored"] = 2] = "Errored";
            })(ChangeDetectorState || (ChangeDetectorState = {}));
            exports_1("ChangeDetectorState", ChangeDetectorState);
            /**
             * Describes within the change detector which strategy will be used the next time change
             * detection is triggered.
             */
            (function (ChangeDetectionStrategy) {
                /**
                 * `CheckedOnce` means that after calling detectChanges the mode of the change detector
                 * will become `Checked`.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["CheckOnce"] = 0] = "CheckOnce";
                /**
                 * `Checked` means that the change detector should be skipped until its mode changes to
                 * `CheckOnce`.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["Checked"] = 1] = "Checked";
                /**
                 * `CheckAlways` means that after calling detectChanges the mode of the change detector
                 * will remain `CheckAlways`.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["CheckAlways"] = 2] = "CheckAlways";
                /**
                 * `Detached` means that the change detector sub tree is not a part of the main tree and
                 * should be skipped.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["Detached"] = 3] = "Detached";
                /**
                 * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 4] = "OnPush";
                /**
                 * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 5] = "Default";
            })(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
            exports_1("ChangeDetectionStrategy", ChangeDetectionStrategy);
            /**
             * List of possible {@link ChangeDetectionStrategy} values.
             */
            exports_1("CHANGE_DETECTION_STRATEGY_VALUES", CHANGE_DETECTION_STRATEGY_VALUES = [
                ChangeDetectionStrategy.CheckOnce,
                ChangeDetectionStrategy.Checked,
                ChangeDetectionStrategy.CheckAlways,
                ChangeDetectionStrategy.Detached,
                ChangeDetectionStrategy.OnPush,
                ChangeDetectionStrategy.Default
            ]);
            /**
             * List of possible {@link ChangeDetectorState} values.
             */
            exports_1("CHANGE_DETECTOR_STATE_VALUES", CHANGE_DETECTOR_STATE_VALUES = [
                ChangeDetectorState.NeverChecked,
                ChangeDetectorState.CheckedBefore,
                ChangeDetectorState.Errored
            ]);
        }
    }
});
//# sourceMappingURL=constants.js.map