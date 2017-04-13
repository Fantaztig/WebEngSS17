/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes= [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {path:'login', component:LoginComponent},
    {
        path: '**',
        redirectTo: 'login'
    }
];

export var routing: ModuleWithProviders =RouterModule.forRoot(appRoutes);