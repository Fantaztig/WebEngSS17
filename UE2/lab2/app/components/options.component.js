"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Paul Proell on 14.04.2017.
 */
var core_1 = require('@angular/core');
var OptionsComponent = (function () {
    function OptionsComponent() {
        this.equalPasswords = false;
    }
    OptionsComponent.prototype.onSubmit = function () {
        this.password_new = "";
        this.password_old = "";
        this.password_wh = "";
    };
    OptionsComponent.prototype.checkIfEqualToNewPassword = function () {
        if (this.password_new === this.password_wh) {
            this.equalPasswords = true;
        }
        else {
            this.equalPasswords = false;
        }
    };
    OptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'options',
            templateUrl: 'options.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], OptionsComponent);
    return OptionsComponent;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=options.component.js.map