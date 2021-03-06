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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ng2_charts_1 = require('ng2-charts');
var app_component_1 = require('./components/app.component');
var app_routing_1 = require("./app.routing");
var navi_module_1 = require("./components/navi.module");
var login_module_1 = require("./components/login.module");
var overview_module_1 = require("./components/overview.module");
var details_module_1 = require("./components/details.module");
var options_module_1 = require("./components/options.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ng2_charts_1.ChartsModule,
                navi_module_1.NaviModule,
                login_module_1.LoginModule,
                overview_module_1.OverviewModule,
                details_module_1.DetailsModule,
                options_module_1.OptionsModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map