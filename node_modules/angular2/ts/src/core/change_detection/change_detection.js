System.register(['./differs/iterable_differs', './differs/default_iterable_differ', './differs/keyvalue_differs', './differs/default_keyvalue_differ', 'angular2/src/facade/lang', './parser/ast', './parser/lexer', './parser/parser', './parser/locals', './exceptions', './interfaces', './constants', './proto_change_detector', './jit_proto_change_detector', './binding_record', './directive_record', './dynamic_change_detector', './change_detector_ref', './change_detection_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var iterable_differs_1, default_iterable_differ_1, keyvalue_differs_1, default_keyvalue_differ_1, lang_1;
    var keyValDiff, iterableDiff, defaultIterableDiffers, defaultKeyValueDiffers;
    return {
        setters:[
            function (iterable_differs_1_1) {
                iterable_differs_1 = iterable_differs_1_1;
                exports_1({
                    "IterableDiffers": iterable_differs_1_1["IterableDiffers"],
                    "IterableDiffer": iterable_differs_1_1["IterableDiffer"],
                    "IterableDifferFactory": iterable_differs_1_1["IterableDifferFactory"],
                    "TrackByFn": iterable_differs_1_1["TrackByFn"]
                });
            },
            function (default_iterable_differ_1_1) {
                default_iterable_differ_1 = default_iterable_differ_1_1;
                exports_1({
                    "DefaultIterableDifferFactory": default_iterable_differ_1_1["DefaultIterableDifferFactory"],
                    "CollectionChangeRecord": default_iterable_differ_1_1["CollectionChangeRecord"]
                });
            },
            function (keyvalue_differs_1_1) {
                keyvalue_differs_1 = keyvalue_differs_1_1;
                exports_1({
                    "KeyValueDiffers": keyvalue_differs_1_1["KeyValueDiffers"],
                    "KeyValueDiffer": keyvalue_differs_1_1["KeyValueDiffer"],
                    "KeyValueDifferFactory": keyvalue_differs_1_1["KeyValueDifferFactory"]
                });
            },
            function (default_keyvalue_differ_1_1) {
                default_keyvalue_differ_1 = default_keyvalue_differ_1_1;
                exports_1({
                    "DefaultKeyValueDifferFactory": default_keyvalue_differ_1_1["DefaultKeyValueDifferFactory"],
                    "KeyValueChangeRecord": default_keyvalue_differ_1_1["KeyValueChangeRecord"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (ast_1_1) {
                exports_1({
                    "ASTWithSource": ast_1_1["ASTWithSource"],
                    "AST": ast_1_1["AST"],
                    "AstTransformer": ast_1_1["AstTransformer"],
                    "PropertyRead": ast_1_1["PropertyRead"],
                    "LiteralArray": ast_1_1["LiteralArray"],
                    "ImplicitReceiver": ast_1_1["ImplicitReceiver"]
                });
            },
            function (lexer_1_1) {
                exports_1({
                    "Lexer": lexer_1_1["Lexer"]
                });
            },
            function (parser_1_1) {
                exports_1({
                    "Parser": parser_1_1["Parser"]
                });
            },
            function (locals_1_1) {
                exports_1({
                    "Locals": locals_1_1["Locals"]
                });
            },
            function (exceptions_1_1) {
                exports_1({
                    "DehydratedException": exceptions_1_1["DehydratedException"],
                    "ExpressionChangedAfterItHasBeenCheckedException": exceptions_1_1["ExpressionChangedAfterItHasBeenCheckedException"],
                    "ChangeDetectionError": exceptions_1_1["ChangeDetectionError"]
                });
            },
            function (interfaces_1_1) {
                exports_1({
                    "ProtoChangeDetector": interfaces_1_1["ProtoChangeDetector"],
                    "ChangeDetector": interfaces_1_1["ChangeDetector"],
                    "ChangeDispatcher": interfaces_1_1["ChangeDispatcher"],
                    "ChangeDetectorDefinition": interfaces_1_1["ChangeDetectorDefinition"],
                    "DebugContext": interfaces_1_1["DebugContext"],
                    "ChangeDetectorGenConfig": interfaces_1_1["ChangeDetectorGenConfig"]
                });
            },
            function (constants_1_1) {
                exports_1({
                    "ChangeDetectionStrategy": constants_1_1["ChangeDetectionStrategy"],
                    "CHANGE_DETECTION_STRATEGY_VALUES": constants_1_1["CHANGE_DETECTION_STRATEGY_VALUES"]
                });
            },
            function (proto_change_detector_1_1) {
                exports_1({
                    "DynamicProtoChangeDetector": proto_change_detector_1_1["DynamicProtoChangeDetector"]
                });
            },
            function (jit_proto_change_detector_1_1) {
                exports_1({
                    "JitProtoChangeDetector": jit_proto_change_detector_1_1["JitProtoChangeDetector"]
                });
            },
            function (binding_record_1_1) {
                exports_1({
                    "BindingRecord": binding_record_1_1["BindingRecord"],
                    "BindingTarget": binding_record_1_1["BindingTarget"]
                });
            },
            function (directive_record_1_1) {
                exports_1({
                    "DirectiveIndex": directive_record_1_1["DirectiveIndex"],
                    "DirectiveRecord": directive_record_1_1["DirectiveRecord"]
                });
            },
            function (dynamic_change_detector_1_1) {
                exports_1({
                    "DynamicChangeDetector": dynamic_change_detector_1_1["DynamicChangeDetector"]
                });
            },
            function (change_detector_ref_1_1) {
                exports_1({
                    "ChangeDetectorRef": change_detector_ref_1_1["ChangeDetectorRef"]
                });
            },
            function (change_detection_util_1_1) {
                exports_1({
                    "WrappedValue": change_detection_util_1_1["WrappedValue"],
                    "SimpleChange": change_detection_util_1_1["SimpleChange"]
                });
            }],
        execute: function() {
            /**
             * Structural diffing for `Object`s and `Map`s.
             */
            exports_1("keyValDiff", keyValDiff = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new default_keyvalue_differ_1.DefaultKeyValueDifferFactory())]));
            /**
             * Structural diffing for `Iterable` types such as `Array`s.
             */
            exports_1("iterableDiff", iterableDiff = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new default_iterable_differ_1.DefaultIterableDifferFactory())]));
            exports_1("defaultIterableDiffers", defaultIterableDiffers = lang_1.CONST_EXPR(new iterable_differs_1.IterableDiffers(iterableDiff)));
            exports_1("defaultKeyValueDiffers", defaultKeyValueDiffers = lang_1.CONST_EXPR(new keyvalue_differs_1.KeyValueDiffers(keyValDiff)));
        }
    }
});
//# sourceMappingURL=change_detection.js.map