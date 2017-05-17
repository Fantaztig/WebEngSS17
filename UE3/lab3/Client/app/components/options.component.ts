import {Component, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../services/user.service';


@Component({
    moduleId: module.id,
    selector: 'my-options',
    templateUrl: '../views/options.html'
})
export class OptionsComponent implements OnInit {

    updateError: boolean;

    constructor(private http: Http, private userService: UserService, private router: Router) {
    };

    ngOnInit(): void {
        this.updateError = false;
    }

    public equalsPW(form: NgForm): boolean {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    }


    /**
     * Liest das alte Passwort, das neue Passwort und dessen Wiederholung ein und übertraegt diese an die REST-Schnittstelle
     * @param form
     */
    onSubmit(form: NgForm): void {

        //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle

        if (!form) {
            return;
        }

        this.userService.changePassword(form.value["old-password"], form.value["new-password"], form.value["repeat-password"]).subscribe(
            res => {
                this.updateError = false;
                this.router.navigate(['/overview'])
            },
            err => {
                this.updateError = true;
                form.resetForm();
            }
        )

       /* this.userService.changePassword(form.value["old-password"], form.value["new-password"], form.value["repeat-password"])
            .then(res => {
                this.updateError = false;
                this.router.navigate(['/overview'])
            })
            .catch(err => {
                this.updateError = true;
                form.resetForm();
            })*/

    }

}
