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
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
var core_1 = require('@angular/core');
var LoginComponent = (function () {
    function LoginComponent() {
    }
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            template: "\n\n        <navi></navi>\n        <div class=\"main-container\">\n            <main aria-labelledby=\"formheadline\">\n                <form class=\"form\" method=\"post\" action=\"overview.html\">\n                    <h2 id=\"formheadline\" class=\"registration-headline\">Anmelden</h2>\n                    <div class=\"form-row\">\n                        <label class=\"form-label\" for=\"username-input\">\n                            Benutzername\n                        </label>\n                        <input type=\"text\" name=\"username\" id=\"username-input\" required class=\"form-input\">\n                        <span id=\"username-error\" class=\"error-text\"></span>\n                    </div>\n                    <div class=\"form-row\">\n                        <label class=\"form-label\" for=\"password-input\">\n                            Passwort\n                        </label>\n                        <input type=\"password\" name=\"password\" id=\"password-input\" required class=\"form-input\" minlength=\"4\"\n                               maxlength=\"12\">\n                        <span id=\"password-error\" class=\"error-text\"></span>\n                    </div>\n                    <div class=\"form-row form-row-center\">\n                        <button class=\"button button-submit\">\n                            Anmelden\n                        </button>\n                    </div>\n                </form>\n            </main>\n        </div>\n              \n    \n    "
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map