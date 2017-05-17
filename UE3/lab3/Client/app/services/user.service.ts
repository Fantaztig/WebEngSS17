/* created by Paul Proell */

import {Device} from '../model/device';
import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

    private url: String = localStorage.getItem("api");

    constructor(private http: Http) {
    }

    authenticate(username: String, password: String): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + "/auth", { username: username, password: password }, options).map(res => res.json());
    }

    changePassword(old_password: String, new_password: String, repeat_password: String): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + "/api/me/change_password", { old_password: old_password, new_password: new_password, repeat_password: repeat_password }, options).map(res => res.json());
    }

}
