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
var device_parser_service_1 = require('./device-parser.service');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/observable/of');
var DeviceService = (function () {
    function DeviceService(parserService, http) {
        this.parserService = parserService;
        this.http = http;
        this.url = localStorage.getItem("api");
    }
    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren
    DeviceService.prototype.addDevice = function (device) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/api/devices", JSON.stringify(device), options).map(function (res) {
            var device = _this.parserService.parseDevice(res.json());
            return device;
        });
    };
    DeviceService.prototype.getDevices = function () {
        var _this = this;
        //TODO Lesen Sie die Geräte über die REST-Schnittstelle aus
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.url + "/api/devices", options).map(function (res) {
            var devices = res.json().devices;
            for (var i = 0; i < devices.length; i++) {
                devices[i] = _this.parserService.parseDevice(devices[i]);
            }
            return devices;
        });
    };
    DeviceService.prototype.getDevice = function (id) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.url + "/api/devices/" + id, options).map(function (res) {
            var device = _this.parserService.parseDevice(res.json());
            return device;
        });
    };
    DeviceService.prototype.deleteDevice = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.url + "/api/devices/" + id, options).map(function (res) {
            res = res.json();
        });
    };
    DeviceService.prototype.changeDevice = function (device, diagramData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        var options = new http_1.RequestOptions({ headers: headers });
        var data = { device: device, diagram: diagramData };
        return this.http.put(this.url + "/api/devices/" + device.id, JSON.stringify(data), options).map(function (res) {
            res = res.json();
        });
    };
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [device_parser_service_1.DeviceParserService, http_1.Http])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map