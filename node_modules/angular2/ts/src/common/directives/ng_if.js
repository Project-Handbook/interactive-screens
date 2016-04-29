System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, lang_1;
    var NgIf;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Removes or recreates a portion of the DOM tree based on an {expression}.
             *
             * If the expression assigned to `ngIf` evaluates to a false value then the element
             * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
             *
             * ### Example ([live demo](http://plnkr.co/edit/fe0kgemFBtmQOY31b4tw?p=preview)):
             *
             * ```
             * <div *ngIf="errorCount > 0" class="error">
             *   <!-- Error message displayed when the errorCount property on the current context is greater
             * than 0. -->
             *   {{errorCount}} errors detected
             * </div>
             * ```
             *
             * ### Syntax
             *
             * - `<div *ngIf="condition">...</div>`
             * - `<div template="ngIf condition">...</div>`
             * - `<template [ngIf]="condition"><div>...</div></template>`
             */
            NgIf = (function () {
                function NgIf(_viewContainer, _templateRef) {
                    this._viewContainer = _viewContainer;
                    this._templateRef = _templateRef;
                    this._prevCondition = null;
                }
                Object.defineProperty(NgIf.prototype, "ngIf", {
                    set: function (newCondition /* boolean */) {
                        if (newCondition && (lang_1.isBlank(this._prevCondition) || !this._prevCondition)) {
                            this._prevCondition = true;
                            this._viewContainer.createEmbeddedView(this._templateRef);
                        }
                        else if (!newCondition && (lang_1.isBlank(this._prevCondition) || this._prevCondition)) {
                            this._prevCondition = false;
                            this._viewContainer.clear();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                NgIf = __decorate([
                    core_1.Directive({ selector: '[ngIf]', inputs: ['ngIf'] }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef])
                ], NgIf);
                return NgIf;
            }());
            exports_1("NgIf", NgIf);
        }
    }
});
//# sourceMappingURL=ng_if.js.map