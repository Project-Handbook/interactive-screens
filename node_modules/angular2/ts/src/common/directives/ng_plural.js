System.register(['angular2/core', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './ng_switch'], function(exports_1, context_1) {
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
    var core_1, lang_1, collection_1, ng_switch_1;
    var _CATEGORY_DEFAULT, NgLocalization, NgPluralCase, NgPlural;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (ng_switch_1_1) {
                ng_switch_1 = ng_switch_1_1;
            }],
        execute: function() {
            _CATEGORY_DEFAULT = 'other';
            NgLocalization = (function () {
                function NgLocalization() {
                }
                return NgLocalization;
            }());
            exports_1("NgLocalization", NgLocalization);
            /**
             * `ngPlural` is an i18n directive that displays DOM sub-trees that match the switch expression
             * value, or failing that, DOM sub-trees that match the switch expression's pluralization category.
             *
             * To use this directive, you must provide an extension of `NgLocalization` that maps values to
             * category names. You then define a container element that sets the `[ngPlural]` attribute to a
             * switch expression.
             *    - Inner elements defined with an `[ngPluralCase]` attribute will display based on their
             * expression.
             *    - If `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
             * matches the switch expression exactly.
             *    - Otherwise, the view will be treated as a "category match", and will only display if exact
             * value matches aren't found and the value maps to its category using the `getPluralCategory`
             * function provided.
             *
             * If no matching views are found for a switch expression, inner elements marked
             * `[ngPluralCase]="other"` will be displayed.
             *
             * ```typescript
             * class MyLocalization extends NgLocalization {
             *    getPluralCategory(value: any) {
             *       if(value < 5) {
             *          return 'few';
             *       }
             *    }
             * }
             *
             * @Component({
             *    selector: 'app',
             *    providers: [provide(NgLocalization, {useClass: MyLocalization})]
             * })
             * @View({
             *   template: `
             *     <p>Value = {{value}}</p>
             *     <button (click)="inc()">Increment</button>
             *
             *     <div [ngPlural]="value">
             *       <template ngPluralCase="=0">there is nothing</template>
             *       <template ngPluralCase="=1">there is one</template>
             *       <template ngPluralCase="few">there are a few</template>
             *       <template ngPluralCase="other">there is some number</template>
             *     </div>
             *   `,
             *   directives: [NgPlural, NgPluralCase]
             * })
             * export class App {
             *   value = 'init';
             *
             *   inc() {
             *     this.value = this.value === 'init' ? 0 : this.value + 1;
             *   }
             * }
             *
             * ```
             */
            NgPluralCase = (function () {
                function NgPluralCase(value, template, viewContainer) {
                    this.value = value;
                    this._view = new ng_switch_1.SwitchView(viewContainer, template);
                }
                NgPluralCase = __decorate([
                    core_1.Directive({ selector: '[ngPluralCase]' }),
                    __param(0, core_1.Attribute('ngPluralCase')), 
                    __metadata('design:paramtypes', [String, core_1.TemplateRef, core_1.ViewContainerRef])
                ], NgPluralCase);
                return NgPluralCase;
            }());
            exports_1("NgPluralCase", NgPluralCase);
            NgPlural = (function () {
                function NgPlural(_localization) {
                    this._localization = _localization;
                    this._caseViews = new collection_1.Map();
                    this.cases = null;
                }
                Object.defineProperty(NgPlural.prototype, "ngPlural", {
                    set: function (value) {
                        this._switchValue = value;
                        this._updateView();
                    },
                    enumerable: true,
                    configurable: true
                });
                NgPlural.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this.cases.forEach(function (pluralCase) {
                        _this._caseViews.set(_this._formatValue(pluralCase), pluralCase._view);
                    });
                    this._updateView();
                };
                /** @internal */
                NgPlural.prototype._updateView = function () {
                    this._clearViews();
                    var view = this._caseViews.get(this._switchValue);
                    if (!lang_1.isPresent(view))
                        view = this._getCategoryView(this._switchValue);
                    this._activateView(view);
                };
                /** @internal */
                NgPlural.prototype._clearViews = function () {
                    if (lang_1.isPresent(this._activeView))
                        this._activeView.destroy();
                };
                /** @internal */
                NgPlural.prototype._activateView = function (view) {
                    if (!lang_1.isPresent(view))
                        return;
                    this._activeView = view;
                    this._activeView.create();
                };
                /** @internal */
                NgPlural.prototype._getCategoryView = function (value) {
                    var category = this._localization.getPluralCategory(value);
                    var categoryView = this._caseViews.get(category);
                    return lang_1.isPresent(categoryView) ? categoryView : this._caseViews.get(_CATEGORY_DEFAULT);
                };
                /** @internal */
                NgPlural.prototype._isValueView = function (pluralCase) { return pluralCase.value[0] === "="; };
                /** @internal */
                NgPlural.prototype._formatValue = function (pluralCase) {
                    return this._isValueView(pluralCase) ? this._stripValue(pluralCase.value) : pluralCase.value;
                };
                /** @internal */
                NgPlural.prototype._stripValue = function (value) { return lang_1.NumberWrapper.parseInt(value.substring(1), 10); };
                __decorate([
                    core_1.ContentChildren(NgPluralCase), 
                    __metadata('design:type', core_1.QueryList)
                ], NgPlural.prototype, "cases", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number), 
                    __metadata('design:paramtypes', [Number])
                ], NgPlural.prototype, "ngPlural", null);
                NgPlural = __decorate([
                    core_1.Directive({ selector: '[ngPlural]' }), 
                    __metadata('design:paramtypes', [NgLocalization])
                ], NgPlural);
                return NgPlural;
            }());
            exports_1("NgPlural", NgPlural);
        }
    }
});
//# sourceMappingURL=ng_plural.js.map