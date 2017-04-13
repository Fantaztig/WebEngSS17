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
var NavComponent = (function () {
    function NavComponent() {
    }
    NavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navi',
            template: "\n\n        <header aria-labelledby=\"bannerheadline\">\n        <a routerLink=\"/login\">\n            <img class=\"title-image\" src=\"/images/big-logo-small.png\" alt=\"BIG Smart Home logo\">\n        </a>\n        <h1 class=\"header-title\" id=\"bannerheadline\">\n            BIG Smart Home\n        </h1>\n        <nav aria-labelledby=\"navigationheadline\">\n            <h2 class=\"accessibility\" id=\"navigationheadline\">Navigation</h2>\n            <ul class=\"navigation-list\">\n            </ul>\n        </nav>\n    </header>\n\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=navi.component.js.map