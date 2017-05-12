/* created by Paul Proell */

import {Device} from '../model/device';
import {Injectable} from '@angular/core';

import {XhrService} from './xhr.service';

@Injectable()
export class UserService {

    constructor(private xhrservice: XhrService) {
    }

    authenticate(username: String, password: String): Promise<String> {
        return new Promise((resolve, reject) => {
            this.xhrservice.sendJSON("POST", "/auth", { username: username, password: password}).subscribe(
                res => {
                    sessionStorage.setItem("token", res.token);
                    resolve(res.token);
                },
                err => {
                    reject();
                }
            )
        });
    }

    changePassword(old_password: String, new_password: String, repeat_password: String): Promise<String> {
        return new Promise((resolve, reject) => { 
            this.xhrservice.sendJSON("POST", "/me/change_password", { old_password: old_password, new_password: new_password, repeat_password: repeat_password}).subscribe(
                res => {
                    resolve();
                },
                err => {
                    reject();
                }
            )
        });
    }

}
