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
var overview_component_1 = require("./overview.component");
var device_service_1 = require("../services/device.service");
var device_1 = require("../model/device");
var controlUnit_1 = require("../model/controlUnit");
var OverlayComponent = (function () {
    function OverlayComponent(deviceService) {
        this.deviceService = deviceService;
        this.overviewComponent = null;
        this.selected_type = null;
        this.controlUnitType_selected = null;
        this.addError = false;
        this.createError = false;
    }
    OverlayComponent.prototype.ngOnInit = function () {
        this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"];
        this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
        this.selected_type = this.device_types[0];
        this.controlUnitType_selected = this.controlUnit_types[0];
    };
    OverlayComponent.prototype.doClose = function () {
        if (this.overviewComponent != null) {
            this.overviewComponent.closeAddDeviceWindow();
        }
    };
    /**
     * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
     * @param form
     */
    OverlayComponent.prototype.onSubmit = function (form) {
        var device = new device_1.Device();
        device.display_name = form.value["displayname"];
        device.type = form.value["type-input"];
        device.type_name = form.value.typename;
        device.image_alt = "";
        device.description = "";
        device.image = "images/thermometer.svg";
        var controlUnit = new controlUnit_1.ControlUnit();
        controlUnit.name = form.value.elementname;
        controlUnit.primary = true;
        switch (this.controlUnitType_selected.trim()) {
            case "Ein/Ausschalter":
                controlUnit.type = "boolean";
                break;
            case "Diskrete Werte":
                controlUnit.type = "enum";
                break;
            case "Kontinuierlicher Wert":
                controlUnit.type = "continuous";
                break;
        }
        controlUnit.type = "boolean";
        if (form.value["minimum-value"] != undefined && form.value["maximum-value"] != undefined) {
            controlUnit.min = form.value["minimum-value"];
            controlUnit.max = form.value["maximum-value"];
        }
        if (form.value["discrete-values"] != undefined) {
            var values = form.value["discrete-values"].split(",");
            for (var i = 0; i < values.length; i++) {
                values[i] = values[i].trim();
            }
            controlUnit.values = values;
        }
        var control_units = [];
        control_units.push(controlUnit);
        device.control_units = control_units;
        this.deviceService.addDevice(device).subscribe(function (res) { });
        form.reset();
        this.overviewComponent.closeAddDeviceWindow();
        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
    };
    OverlayComponent.prototype.isSelected = function (type) {
        return type == this.device_types[0];
    };
    OverlayComponent.prototype.isBooleanSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[0];
    };
    OverlayComponent.prototype.isEnumSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[1];
    };
    OverlayComponent.prototype.isContinuousSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[2];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', overview_component_1.OverviewComponent)
    ], OverlayComponent.prototype, "overviewComponent", void 0);
    OverlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-overlay',
            templateUrl: '../views/overlay.component.html'
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], OverlayComponent);
    return OverlayComponent;
}());
exports.OverlayComponent = OverlayComponent;
//# sourceMappingURL=overlay.component.js.map