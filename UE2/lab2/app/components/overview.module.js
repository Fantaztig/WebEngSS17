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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var overview_component_1 = require("./overview.component");
var navi_module_1 = require("./navi.module");
var forms_1 = require('@angular/forms');
var OverviewModule = (function () {
    function OverviewModule() {
    }
    OverviewModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, navi_module_1.NaviModule, forms_1.FormsModule, router_1.RouterModule],
            declarations: [overview_component_1.OverviewComponent],
            exports: [overview_component_1.OverviewComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], OverviewModule);
    return OverviewModule;
}());
exports.OverviewModule = OverviewModule;
//# sourceMappingURL=overview.module.js.map