/**
 * Created by Paul Proell on 14.04.2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {OptionsComponent} from "./options.component";
import {NaviModule} from "./navi.module";
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, NaviModule, FormsModule, RouterModule],
    declarations: [OptionsComponent],
    exports: [OptionsComponent]
})

export class OptionsModule {}