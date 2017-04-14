/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import { Routes,RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login.component";
import {OverviewComponent} from "./components/overview.component";
import {DetailsComponent} from './components/details.component';
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes= [
    { path: '',pathMatch: 'full',redirectTo: 'login' },
    { path:'login', component: LoginComponent },
    { path:'overview', component: OverviewComponent },
    { path:'device-details/:id', component: DetailsComponent },
    { path: '**',redirectTo: 'login' }
];

export var routing: ModuleWithProviders =RouterModule.forRoot(appRoutes);