System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ref, Door, Lock, injector, door;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // #docregion forward_ref_fn
            ref = core_1.forwardRef(function () { return Lock; });
            // #enddocregion
            // #docregion forward_ref
            Door = (function () {
                function Door(lock) {
                    this.lock = lock;
                }
                Door = __decorate([
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return Lock; }))), 
                    __metadata('design:paramtypes', [Lock])
                ], Door);
                return Door;
            }());
            // Only at this point Lock is defined.
            Lock = (function () {
                function Lock() {
                }
                return Lock;
            }());
            injector = core_1.Injector.resolveAndCreate([Door, Lock]);
            door = injector.get(Door);
            expect(door instanceof Door).toBe(true);
            expect(door.lock instanceof Lock).toBe(true);
            // #enddocregion
            // #docregion resolve_forward_ref
            ref = core_1.forwardRef(function () { return "refValue"; });
            expect(core_1.resolveForwardRef(ref)).toEqual("refValue");
            expect(core_1.resolveForwardRef("regularValue")).toEqual("regularValue");
        }
    }
});
// #enddocregion 
//# sourceMappingURL=forward_ref.js.map