/**
 * Created by Paul Proell on 14.04.2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DetailsComponent} from "./details.component";
import {NaviModule} from "./navi.module";
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, NaviModule, FormsModule, RouterModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent]
})

export class DetailsModule {}