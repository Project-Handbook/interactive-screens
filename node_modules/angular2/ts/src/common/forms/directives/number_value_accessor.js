System.register(['angular2/core', './control_value_accessor', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, control_value_accessor_1, lang_1;
    var NUMBER_VALUE_ACCESSOR, NumberValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_value_accessor_1_1) {
                control_value_accessor_1 = control_value_accessor_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            NUMBER_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return NumberValueAccessor; }), multi: true }));
            /**
             * The accessor for writing a number value and listening to changes that is used by the
             * {@link NgModel}, {@link NgFormControl}, and {@link NgControlName} directives.
             *
             *  ### Example
             *  ```
             *  <input type="number" [(ngModel)]="age">
             *  ```
             */
            NumberValueAccessor = (function () {
                function NumberValueAccessor(_renderer, _elementRef) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                }
                NumberValueAccessor.prototype.writeValue = function (value) {
                    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
                };
                NumberValueAccessor.prototype.registerOnChange = function (fn) {
                    this.onChange = function (value) { fn(lang_1.NumberWrapper.parseFloat(value)); };
                };
                NumberValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                NumberValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'input[type=number][ngControl],input[type=number][ngFormControl],input[type=number][ngModel]',
                        host: {
                            '(change)': 'onChange($event.target.value)',
                            '(input)': 'onChange($event.target.value)',
                            '(blur)': 'onTouched()'
                        },
                        bindings: [NUMBER_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], NumberValueAccessor);
                return NumberValueAccessor;
            }());
            exports_1("NumberValueAccessor", NumberValueAccessor);
        }
    }
});
//# sourceMappingURL=number_value_accessor.js.map