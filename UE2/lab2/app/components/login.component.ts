/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {Component} from '@angular/core'
import {Router} from '@angular/router';

@Component ({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent{
     username:string;
     password:string;
    constructor(private router: Router) {
    }

    onSubmit() {


        this.router.navigateByUrl("/overview");
    }
    setUserData(){
        localStorage.setItem("userName", this.username);
        localStorage.setItem("userPassword", this.password);

    }
}