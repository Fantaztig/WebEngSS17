import {Device} from '../model/device';
import {Injectable} from '@angular/core';

import {DEVICES} from '../resources/mock-device';
import {DeviceParserService} from './device-parser.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';


@Injectable()
export class DeviceService {

    private url: String = localStorage.getItem("api");

    constructor(private parserService: DeviceParserService, private http: Http) {
    }

    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren

    addDevice(device: Device): Observable<Device> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + "/api/devices", JSON.stringify(device) , options).map(
            res => {
                let device: Device = this.parserService.parseDevice(res.json());
                return device;
            });
    }

    getDevices(): Observable<Device[]> {
        //TODO Lesen Sie die Geräte über die REST-Schnittstelle aus
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
         let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + "/api/devices", options).map(
            res => {
                let devices: Device[] = res.json().devices;
                for (let i = 0; i < devices.length; i++) {
                    devices[i] = this.parserService.parseDevice(devices[i]);
                }
                return devices;
            });
    }

    getDevice(id: string): Observable<Device> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + "/api/devices/" + id, options).map(
            res => {
                let device: Device = this.parserService.parseDevice(res.json());
                return device;
            });
    }

    deleteDevice(id: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.url + "/api/devices/" + id , options).map(
            res => {
                res = res.json();
            });
    }

    changeDevice(device: Device): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.url + "/api/devices/" + device.id ,JSON.stringify(device), options).map(
            res => {
                res = res.json();
            });
    }

}
