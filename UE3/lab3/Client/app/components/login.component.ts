import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {UserService} from '../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent {

    loginError: boolean = false;

    constructor(private router: Router, private authService: UserService) {
        localStorage.setItem("api", "http://localhost:8081");
    }

    onSubmit(form: NgForm): void {
        //TODO Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
        this.authService.authenticate(form.value.username, form.value.password).subscribe(
            res => {
                localStorage.setItem("token", res.token);
                this.router.navigate(['/overview'])
            },
            err => {
                this.loginError = true;
            }
        )
    }
}
