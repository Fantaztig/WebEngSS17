/**
 * Created by Paul Proell on 14.04.2017.
 */
import {Component, OnInit} from '@angular/core'
import {DeviceService} from '../services/device.service';
import {Device} from '../model/device';


@Component ({
    moduleId: module.id,
    selector: 'overview',
    templateUrl: 'overview.component.html',
    providers: [DeviceService]
})

export class OverviewComponent implements OnInit{
    userName:string = localStorage.getItem("userName");

    devices: Device[];

    constructor(private deviceService: DeviceService) {}

    ngOnInit() { 
        this.deviceService.getDevices().then((devices) => {
            this.devices = devices;
        });
    }

}