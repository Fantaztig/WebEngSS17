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
 * Created by Reyhan Ibrahim on 15.04.2017.
 */
var core_1 = require('@angular/core');
var SaveDeviceNameDirective = (function () {
    function SaveDeviceNameDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    SaveDeviceNameDirective.prototype.onMouseOver = function () {
        //this._renderer.setElementAttribute(this._elementRef.nativeElement,"src","../../images/ok.png");
        //this._renderer.setElementStyle(this._elementRef.nativeElement, 'background-color','yellow');
        //console.log("sad");
        this.backgroundColor = "red";
    };
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SaveDeviceNameDirective.prototype, "onMouseOver", null);
    __decorate([
        core_1.HostBinding('style.backgroundColor'), 
        __metadata('design:type', String)
    ], SaveDeviceNameDirective.prototype, "backgroundColor", void 0);
    SaveDeviceNameDirective = __decorate([
        core_1.Directive({
            selector: '[highlightMouse]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], SaveDeviceNameDirective);
    return SaveDeviceNameDirective;
}());
exports.SaveDeviceNameDirective = SaveDeviceNameDirective;
//# sourceMappingURL=util.edit.device.js.map