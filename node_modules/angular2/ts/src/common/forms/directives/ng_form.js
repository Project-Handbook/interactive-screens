System.register(['angular2/src/facade/async', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/core', './control_container', '../model', './shared', '../validators'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var async_1, collection_1, lang_1, core_1, control_container_1, model_1, shared_1, validators_1;
    var formDirectiveProvider, NgForm;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (control_container_1_1) {
                control_container_1 = control_container_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            formDirectiveProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, { useExisting: core_1.forwardRef(function () { return NgForm; }) }));
            /**
             * If `NgForm` is bound in a component, `<form>` elements in that component will be
             * upgraded to use the Angular form system.
             *
             * ### Typical Use
             *
             * Include `FORM_DIRECTIVES` in the `directives` section of a {@link View} annotation
             * to use `NgForm` and its associated controls.
             *
             * ### Structure
             *
             * An Angular form is a collection of `Control`s in some hierarchy.
             * `Control`s can be at the top level or can be organized in `ControlGroup`s
             * or `ControlArray`s. This hierarchy is reflected in the form's `value`, a
             * JSON object that mirrors the form structure.
             *
             * ### Submission
             *
             * The `ngSubmit` event signals when the user triggers a form submission.
             *
             * ### Example ([live demo](http://plnkr.co/edit/ltdgYj4P0iY64AR71EpL?p=preview))
             *
             *  ```typescript
             * @Component({
             *   selector: 'my-app',
             *   template: `
             *     <div>
             *       <p>Submit the form to see the data object Angular builds</p>
             *       <h2>NgForm demo</h2>
             *       <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
             *         <h3>Control group: credentials</h3>
             *         <div ngControlGroup="credentials">
             *           <p>Login: <input type="text" ngControl="login"></p>
             *           <p>Password: <input type="password" ngControl="password"></p>
             *         </div>
             *         <h3>Control group: person</h3>
             *         <div ngControlGroup="person">
             *           <p>First name: <input type="text" ngControl="firstName"></p>
             *           <p>Last name: <input type="text" ngControl="lastName"></p>
             *         </div>
             *         <button type="submit">Submit Form</button>
             *       <p>Form data submitted:</p>
             *       </form>
             *       <pre>{{data}}</pre>
             *     </div>
             * `,
             *   directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
             * })
             * export class App {
             *   constructor() {}
             *
             *   data: string;
             *
             *   onSubmit(data) {
             *     this.data = JSON.stringify(data, null, 2);
             *   }
             * }
             *  ```
             */
            NgForm = (function (_super) {
                __extends(NgForm, _super);
                function NgForm(validators, asyncValidators) {
                    _super.call(this);
                    this.ngSubmit = new async_1.EventEmitter();
                    this.form = new model_1.ControlGroup({}, null, shared_1.composeValidators(validators), shared_1.composeAsyncValidators(asyncValidators));
                }
                Object.defineProperty(NgForm.prototype, "formDirective", {
                    get: function () { return this; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgForm.prototype, "control", {
                    get: function () { return this.form; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgForm.prototype, "path", {
                    get: function () { return []; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgForm.prototype, "controls", {
                    get: function () { return this.form.controls; },
                    enumerable: true,
                    configurable: true
                });
                NgForm.prototype.addControl = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        var ctrl = new model_1.Control();
                        shared_1.setUpControl(ctrl, dir);
                        container.addControl(dir.name, ctrl);
                        ctrl.updateValueAndValidity({ emitEvent: false });
                    });
                };
                NgForm.prototype.getControl = function (dir) { return this.form.find(dir.path); };
                NgForm.prototype.removeControl = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        if (lang_1.isPresent(container)) {
                            container.removeControl(dir.name);
                            container.updateValueAndValidity({ emitEvent: false });
                        }
                    });
                };
                NgForm.prototype.addControlGroup = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        var group = new model_1.ControlGroup({});
                        shared_1.setUpControlGroup(group, dir);
                        container.addControl(dir.name, group);
                        group.updateValueAndValidity({ emitEvent: false });
                    });
                };
                NgForm.prototype.removeControlGroup = function (dir) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var container = _this._findContainer(dir.path);
                        if (lang_1.isPresent(container)) {
                            container.removeControl(dir.name);
                            container.updateValueAndValidity({ emitEvent: false });
                        }
                    });
                };
                NgForm.prototype.getControlGroup = function (dir) {
                    return this.form.find(dir.path);
                };
                NgForm.prototype.updateModel = function (dir, value) {
                    var _this = this;
                    async_1.PromiseWrapper.scheduleMicrotask(function () {
                        var ctrl = _this.form.find(dir.path);
                        ctrl.updateValue(value);
                    });
                };
                NgForm.prototype.onSubmit = function () {
                    async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
                    return false;
                };
                /** @internal */
                NgForm.prototype._findContainer = function (path) {
                    path.pop();
                    return collection_1.ListWrapper.isEmpty(path) ? this.form : this.form.find(path);
                };
                NgForm = __decorate([
                    core_1.Directive({
                        selector: 'form:not([ngNoForm]):not([ngFormModel]),ngForm,[ngForm]',
                        bindings: [formDirectiveProvider],
                        host: {
                            '(submit)': 'onSubmit()',
                        },
                        outputs: ['ngSubmit'],
                        exportAs: 'ngForm'
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Self()),
                    __param(0, core_1.Inject(validators_1.NG_VALIDATORS)),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Self()),
                    __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), 
                    __metadata('design:paramtypes', [Array, Array])
                ], NgForm);
                return NgForm;
            }(control_container_1.ControlContainer));
            exports_1("NgForm", NgForm);
        }
    }
});
//# sourceMappingURL=ng_form.js.map