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
var router_1 = require('@angular/router');
var user_service_1 = require('../services/user.service');
var LoginComponent = (function () {
    function LoginComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.loginError = false;
        localStorage.setItem("api", "http://localhost:8081");
    }
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //TODO Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
        this.authService.authenticate(form.value.username, form.value.password).subscribe(function (res) {
            localStorage.setItem("token", res.token);
            _this.router.navigate(['overview']);
        }, function (err) {
            _this.loginError = true;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-login',
            templateUrl: '../views/login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map