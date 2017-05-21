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
var core_1 = require('@angular/core');
var device_1 = require("../model/device");
var controlUnit_1 = require("../model/controlUnit");
var device_service_1 = require("../services/device.service");
var EnumDeviceDetailsComponent = (function () {
    function EnumDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.polarChartLabels = [];
        this.polarChartData = [];
        this.polarChartType = 'polarArea';
        this.polarChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.polarChartLegend = true;
    }
    ;
    EnumDeviceDetailsComponent.prototype.ngOnInit = function () {
        this.new_value = this.controlUnit.values[this.controlUnit.current];
        for (var _i = 0, _a = this.controlUnit.values; _i < _a.length; _i++) {
            var val = _a[_i];
            this.polarChartLabels.push(val);
            this.polarChartData.push(0);
        }
        var item = JSON.parse(sessionStorage.getItem(this.device.id + this.controlUnit.name));
        if (item !== null) {
            this.polarChartData = item.data;
            if (item.log != undefined) {
                this.controlUnit.log = item.log;
            }
        }
        this.polarChartData = this.polarChartData.slice();
    };
    /**
     * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
     */
    EnumDeviceDetailsComponent.prototype.onSubmit = function () {
        //TODO Lesen Sie die eingebenen Daten aus und verarbeiten Sie diese über die REST-Schnittstelle
        var _polarChartData = Object.assign({}, this.polarChartData);
        var index = this.controlUnit.values.indexOf(this.new_value);
        _polarChartData[index]++;
        var currentDate = new Date().toLocaleString();
        var newLog = currentDate + ": " + this.controlUnit.values[this.controlUnit.current] + " -> " + this.new_value;
        if (this.controlUnit.log != null) {
            this.controlUnit.log += "\n";
        }
        else {
            this.controlUnit.log = "";
        }
        this.controlUnit.log += newLog;
        this.polarChartData = _polarChartData;
        this.controlUnit.current = index;
        this.deviceService.changeDevice(this.device, { log: newLog, controlUnit: this.controlUnit, new_value: index, current_date: currentDate }).subscribe();
    };
    EnumDeviceDetailsComponent.prototype.isSelected = function (val) {
        return val == this.controlUnit.values[this.controlUnit.current];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', device_1.Device)
    ], EnumDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', controlUnit_1.ControlUnit)
    ], EnumDeviceDetailsComponent.prototype, "controlUnit", void 0);
    EnumDeviceDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'enum-details',
            templateUrl: '../views/enum-device-details.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], EnumDeviceDetailsComponent);
    return EnumDeviceDetailsComponent;
}());
exports.EnumDeviceDetailsComponent = EnumDeviceDetailsComponent;
//# sourceMappingURL=enum-device-details.component.js.map