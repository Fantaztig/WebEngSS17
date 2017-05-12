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
var xhr_service_1 = require('./xhr.service');
var UserService = (function () {
    function UserService(xhrservice) {
        this.xhrservice = xhrservice;
    }
    UserService.prototype.authenticate = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.xhrservice.sendJSON("POST", "/auth", { username: username, password: password }).subscribe(function (res) {
                sessionStorage.setItem("token", res.token);
                resolve(res.token);
            }, function (err) {
                reject();
            });
        });
    };
    UserService.prototype.changePassword = function (old_password, new_password, repeat_password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.xhrservice.sendJSON("POST", "/me/change_password", { old_password: old_password, new_password: new_password, repeat_password: repeat_password }).subscribe(function (res) {
                resolve();
            }, function (err) {
                reject();
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [xhr_service_1.XhrService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map