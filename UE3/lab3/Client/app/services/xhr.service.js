/* created by Paul Proell */
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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/toPromise');
require('rxjs/add/observable/fromPromise');
var XhrService = (function () {
    function XhrService() {
        this.url = localStorage.getItem("api");
    }
    XhrService.prototype.sendJSON = function (method, path, data) {
        var _this = this;
        return Observable_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 1) {
                    var token = sessionStorage.getItem("token");
                    if (token != null && token != undefined) {
                        xhr.setRequestHeader("Authorization", "Bearer " + token);
                    }
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
                else if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open(method, _this.url + path, true);
            xhr.send(JSON.stringify(data));
        }));
    };
    XhrService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], XhrService);
    return XhrService;
}());
exports.XhrService = XhrService;
//# sourceMappingURL=xhr.service.js.map