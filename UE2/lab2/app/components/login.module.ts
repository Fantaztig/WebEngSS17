/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login.component";
import {NaviModule} from "./navi.module";
import { FormsModule }    from '@angular/forms';

@NgModule({
    imports: [CommonModule, NaviModule, FormsModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})

export class LoginModule {}