import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OverviewComponent} from './components/overview.component';
import {LoginComponent} from './components/login.component';
import {OptionsComponent} from './components/options.component';
import {DeviceDetailsComponent} from "./components/device-details.component";
import {AuthGuard} from "./auth-guard";

//TODO Setzen Sie Angular Guards ein um einen unbefugten Zugriff zu verhindern
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'options', component: OptionsComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DeviceDetailsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
