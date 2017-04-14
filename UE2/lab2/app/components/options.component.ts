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
    equalPasswords: boolean=false;
    password_new: string;
    password_old: string;
    password_wh: string;

    onSubmit() {
        this.password_new="";
        this.password_old="";
        this.password_wh="";
    }

    checkIfEqualToNewPassword(){


        if(this.password_new===this.password_wh){
            this.equalPasswords=true;
        }else{
            this.equalPasswords=false;
        }
    }

}