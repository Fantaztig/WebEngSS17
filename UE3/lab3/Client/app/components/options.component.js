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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var router_1 = require('@angular/router');
var user_service_1 = require('../services/user.service');
var OptionsComponent = (function () {
    function OptionsComponent(http, userService, router) {
        this.http = http;
        this.userService = userService;
        this.router = router;
    }
    ;
    OptionsComponent.prototype.ngOnInit = function () {
        this.updateError = false;
    };
    OptionsComponent.prototype.equalsPW = function (form) {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    };
    /**
     * Liest das alte Passwort, das neue Passwort und dessen Wiederholung ein und übertraegt diese an die REST-Schnittstelle
     * @param form
     */
    OptionsComponent.prototype.onSubmit = function (form) {
        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
        var _this = this;
        if (!form) {
            return;
        }
        this.userService.changePassword(form.value["old-password"], form.value["new-password"], form.value["repeat-password"]).subscribe(function (res) {
            _this.updateError = false;
            _this.router.navigate(['/overview']);
        }, function (err) {
            _this.updateError = true;
            form.resetForm();
        });
        /* this.userService.changePassword(form.value["old-password"], form.value["new-password"], form.value["repeat-password"])
             .then(res => {
                 this.updateError = false;
                 this.router.navigate(['/overview'])
             })
             .catch(err => {
                 this.updateError = true;
                 form.resetForm();
             })*/
    };
    OptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-options',
            templateUrl: '../views/options.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService, router_1.Router])
    ], OptionsComponent);
    return OptionsComponent;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=options.component.js.map