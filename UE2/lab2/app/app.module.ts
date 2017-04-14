import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }         from './components/app.component';
import {routing} from "./app.routing";
import {NaviModule} from "./components/navi.module";
import {LoginModule} from "./components/login.module";
import {OverviewModule} from "./components/overview.module";
import {DetailsModule} from "./components/details.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    NaviModule,
    LoginModule,
    OverviewModule,
    DetailsModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
