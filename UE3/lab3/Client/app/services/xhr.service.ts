/* created by Paul Proell */

import {Device} from '../model/device';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class XhrService {

    private url: string = "http://localhost:8081";

    sendJSON(method: string, path: string, data: any): Observable<any> {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 1) {
                    var token = sessionStorage.getItem("token");
                    if(token != null || token != undefined) {
                        xhr.setRequestHeader("Authentication", "Bearer " + token)
                    }
                    xhr.setRequestHeader("Content-Type", "application/json");
                } else if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.response)
                    }
                }
            }
            xhr.open(method, this.url + path, true)
            xhr.send(JSON.stringify(data))
        }));
    }

}
