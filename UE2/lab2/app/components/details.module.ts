/**
 * Created by Paul Proell on 14.04.2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DetailsComponent} from "./details.component";
import {NaviModule} from "./navi.module";
import {FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [CommonModule, NaviModule, FormsModule, RouterModule, ChartsModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent, ChartsModule]
})

export class DetailsModule {}