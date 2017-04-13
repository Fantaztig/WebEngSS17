"use strict";
/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
var router_1 = require('@angular/router');
var login_component_1 = require("./components/login.component");
var appRoutes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: '**',
        redirectTo: 'login'
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map