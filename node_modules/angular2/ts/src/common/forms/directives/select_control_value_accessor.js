System.register(['angular2/core', 'angular2/src/facade/async', './control_value_accessor', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, async_1, control_value_accessor_1, lang_1;
    var SELECT_VALUE_ACCESSOR, NgSelectOption, SelectControlValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            SELECT_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return SelectControlValueAccessor; }), multi: true }));
            /**
             * Marks `<option>` as dynamic, so Angular can be notified when options change.
             *
             * ### Example
             *
             * ```
             * <select ngControl="city">
             *   <option *ngFor="#c of cities" [value]="c"></option>
             * </select>
             * ```
             */
            NgSelectOption = (function () {
                function NgSelectOption() {
                }
                NgSelectOption = __decorate([
                    core_1.Directive({ selector: 'option' }), 
                    __metadata('design:paramtypes', [])
                ], NgSelectOption);
                return NgSelectOption;
            }());
            exports_1("NgSelectOption", NgSelectOption);
            /**
             * The accessor for writing a value and listening to changes on a select element.
             */
            SelectControlValueAccessor = (function () {
                function SelectControlValueAccessor(_renderer, _elementRef, query) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                    this._updateValueWhenListOfOptionsChanges(query);
                }
                SelectControlValueAccessor.prototype.writeValue = function (value) {
                    this.value = value;
                    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
                };
                SelectControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
                SelectControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                SelectControlValueAccessor.prototype._updateValueWhenListOfOptionsChanges = function (query) {
                    var _this = this;
                    async_1.ObservableWrapper.subscribe(query.changes, function (_) { return _this.writeValue(_this.value); });
                };
                SelectControlValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'select[ngControl],select[ngFormControl],select[ngModel]',
                        host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                        bindings: [SELECT_VALUE_ACCESSOR]
                    }),
                    __param(2, core_1.Query(NgSelectOption, { descendants: true })), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.QueryList])
                ], SelectControlValueAccessor);
                return SelectControlValueAccessor;
            }());
            exports_1("SelectControlValueAccessor", SelectControlValueAccessor);
        }
    }
});
//# sourceMappingURL=select_control_value_accessor.js.map