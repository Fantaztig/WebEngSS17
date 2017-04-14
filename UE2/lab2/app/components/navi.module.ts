/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NavComponent} from "./navi.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [NavComponent],
    exports: [NavComponent]
})

export class NaviModule {}