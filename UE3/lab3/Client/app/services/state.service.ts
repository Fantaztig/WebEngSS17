/* created by Paul Proell */

import {Device} from '../model/device';
import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class StateService {

    private url: String = localStorage.getItem("api");

    constructor(private http: Http) {
    }

    getState(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + "/api/status", options).map(res => res.json());
    }

}
