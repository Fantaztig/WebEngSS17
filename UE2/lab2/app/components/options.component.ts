/**
 * Created by Paul Proell on 14.04.2017.
 */
import {Component, OnInit} from '@angular/core'

@Component ({
    moduleId: module.id,
    selector: 'options',
    templateUrl: 'options.component.html'
})

export class OptionsComponent{

    password_new: string;
    password_old: string;
    password_wh: string;

    onSubmit() {
        alert(this.password_new);
    }

}