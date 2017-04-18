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
var router_1 = require('@angular/router');
var device_service_1 = require('../services/device.service');
var DetailsComponent = (function () {
    function DetailsComponent(deviceService, activatedRoute) {
        this.deviceService = deviceService;
        this.activatedRoute = activatedRoute;
        this.dataLoaded = false;
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var deviceId = params['id'];
            _this.deviceService.getDevice(deviceId).then(function (device) {
                _this.device = device;
                _this.dataLoaded = true;
            });
        });
    };
    DetailsComponent.prototype.hasControlType = function (type) {
        for (var i = 0; i < this.device.control_units.length; i++) {
            if (this.device.control_units[i].type == type)
                return true;
        }
        return false;
    };
    DetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'device-details',
            templateUrl: 'details.component.html',
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, router_1.ActivatedRoute])
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map