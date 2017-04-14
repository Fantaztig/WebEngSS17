/**
 * Created by Paul Proell on 14.04.2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {OverviewComponent} from "./overview.component";
import {NaviModule} from "./navi.module";
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, NaviModule, FormsModule, RouterModule],
    declarations: [OverviewComponent],
    exports: [OverviewComponent]
})

export class OverviewModule {}