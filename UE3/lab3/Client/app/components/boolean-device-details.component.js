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
var socket_service_1 = require("../services/socket.service");
var BooleanDeviceDetailsComponent = (function () {
    function BooleanDeviceDetailsComponent(deviceService, socketService) {
        this.deviceService = deviceService;
        this.socketService = socketService;
        this.log_message = null;
        this.doughnutChartData = [0, 0];
        this.doughnutChartLabels = ['Aus', 'An'];
        this.doughnutChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.doughnutChartLegend = true;
        this.doughnutChartType = 'doughnut';
    }
    BooleanDeviceDetailsComponent.prototype.ngOnInit = function () {
        this.new_value = this.controlUnit.current == 1;
        var item = JSON.parse(sessionStorage.getItem(this.device.id + this.controlUnit.name));
        if (item !== null) {
            this.doughnutChartData[0] = item.data[0];
            this.doughnutChartData[1] = item.data[1];
            this.doughnutChartData.slice();
            if (item.log != undefined) {
                this.controlUnit.log = item.log;
            }
        }
    };
    /**
     * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
     */
    BooleanDeviceDetailsComponent.prototype.onSubmit = function () {
        this.doughnutChartData[this.new_value ? 1 : 0]++;
        this.doughnutChartData = Object.assign({}, this.doughnutChartData);
        var currentDate = new Date().toLocaleString();
        var newLog = currentDate + ": " + (this.controlUnit.current == 1 ? "An" : "Aus") + " -> " + (this.new_value ? "An" : "Aus");
        this.controlUnit.current = this.new_value ? 1 : 0;
        this.deviceService.changeDevice(this.device, { log: newLog, controlUnit: this.controlUnit, new_value: this.new_value ? 1 : 0, current_date: currentDate }).subscribe();
        if (this.controlUnit.log != null) {
            this.controlUnit.log += "\n";
        }
        else {
            this.controlUnit.log = "";
        }
        this.controlUnit.log += newLog;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', device_1.Device)
    ], BooleanDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', controlUnit_1.ControlUnit)
    ], BooleanDeviceDetailsComponent.prototype, "controlUnit", void 0);
    BooleanDeviceDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'boolean-details',
            templateUrl: '../views/boolean-device-details.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, socket_service_1.SocketService])
    ], BooleanDeviceDetailsComponent);
    return BooleanDeviceDetailsComponent;
}());
exports.BooleanDeviceDetailsComponent = BooleanDeviceDetailsComponent;
//# sourceMappingURL=boolean-device-details.component.js.map