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
var controlType_1 = require('../model/controlType');
var ng2_charts_1 = require("ng2-charts");
var DetailsComponent = (function () {
    function DetailsComponent(deviceService, activatedRoute) {
        this.deviceService = deviceService;
        this.activatedRoute = activatedRoute;
        this.dataLoaded = false;
        this.userName = localStorage.getItem("userName");
        this.continuoustext = "";
        this.booleantext = "";
        this.discretetext = "";
        this.lineChartLabels = [];
        this.barChartOptions = {
            scaleShowVerticalLines: true,
            scaleShowHorizontalLines: true,
            responsive: true
        };
        this.barChartLegend = true;
        this.barChartData = [
            { data: [], label: 'Temperatur' }
        ];
        this.doughnutChartLabels = ['Aus', 'An'];
        this.doughnutChartData = [0, 0];
        this.polarAreaChartLabels = ['Aus', 'Standby', 'Ein'];
        this.polarAreaChartData = [0, 0, 0];
        this.polarAreaLegend = true;
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var deviceId = params['id'];
            _this.deviceService.getDevice(deviceId).then(function (device) {
                _this.device = device;
                _this.dataLoaded = true;
                if (_this.hasControlType(0)) {
                    _this.booleaninput = _this.getControl(0).current;
                    _this.doughnutChartData[_this.booleaninput]++;
                }
                if (_this.hasControlType(1)) {
                    _this.discreteinput = _this.getControl(1).current;
                    _this.polarAreaChartData[_this.discreteinput]++;
                }
                if (_this.hasControlType(2)) {
                    _this.continuousinput = _this.getControl(2).current;
                }
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
    DetailsComponent.prototype.getControl = function (type) {
        for (var i = 0; i < this.device.control_units.length; i++) {
            if (this.device.control_units[i].type == type)
                return this.device.control_units[i];
        }
        return undefined;
    };
    DetailsComponent.prototype.onSubmit = function (type) {
        switch (type) {
            case controlType_1.ControlType.boolean:
                if (this.booleaninput != this.getControl(0).current) {
                    this.booleantext += new Date().toLocaleString() + " "
                        + (this.getControl(0).current ? 'Aktiviert' : 'Deaktiviert') + " -> "
                        + (this.booleaninput ? 'Aktiviert' : 'Deaktiviert') + "\n";
                    this.getControl(0).current = this.booleaninput;
                    this.doughnutChartData[Number(this.booleaninput)]++;
                }
                break;
            case controlType_1.ControlType.continuous:
                if (this.continuousinput != this.getControl(2).current) {
                    this.continuoustext += new Date().toLocaleString() + " "
                        + (this.getControl(2).current) + " -> "
                        + (this.continuousinput) + "\n";
                    this.getControl(2).current = this.continuousinput;
                    this.barChartData[0].data[this.barChartData[0].data.length] = this.continuousinput;
                    this.lineChartLabels[this.lineChartLabels.length] = (new Date().toLocaleString()).substring(11);
                }
                break;
            case controlType_1.ControlType.enum:
                if (this.discreteinput != this.getControl(1).current) {
                    this.discretetext += new Date().toLocaleString() + " "
                        + (this.getControl(1).current == 0 ? 'Aus' : this.getControl(1).current == 1 ? 'Standby' : 'Ein') + " -> "
                        + (this.discreteinput == 0 ? 'Aus' : this.discreteinput == 1 ? 'Standby' : 'Ein') + "\n";
                    this.getControl(1).current = this.discreteinput;
                    this.polarAreaChartData[this.discreteinput]++;
                }
                break;
            default:
                alert("Unexpected error!");
                break;
        }
        this.barChartData = this.barChartData.slice();
        this.polarAreaChartData = this.polarAreaChartData.slice();
        this.doughnutChartData = this.doughnutChartData.slice();
    };
    // events
    DetailsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DetailsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    __decorate([
        core_1.ViewChild(ng2_charts_1.BaseChartDirective), 
        __metadata('design:type', ng2_charts_1.BaseChartDirective)
    ], DetailsComponent.prototype, "chart", void 0);
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