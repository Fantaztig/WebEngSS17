/**
 * Created by Paul Proell on 14.04.2017.
 */
import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DeviceService} from '../services/device.service';
import {Device} from '../model/device';
import {ControlType} from '../model/controlType';

@Component ({
    moduleId: module.id,
    selector: 'device-details',
    templateUrl: 'details.component.html',
    providers: [DeviceService]
})

export class DetailsComponent implements OnInit{

    device: Device;

    dataLoaded: Boolean = false;

    constructor(private deviceService: DeviceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() { 
        this.activatedRoute.params.subscribe((params: Params) => {
            let deviceId = params['id'];
            this.deviceService.getDevice(deviceId).then((device) => {
                this.device = device;
                this.dataLoaded = true;
            });
        });
    }

    hasControlType(type: ControlType) {
        for(var i = 0; i < this.device.control_units.length; i++) {
            if(this.device.control_units[i].type == type)
                return true;
        }
        return false;
    }

    getControl(type: ControlType) {
        for(var i = 0; i < this.device.control_units.length; i++) {
            if(this.device.control_units[i].type == type)
                return this.device.control_units[i];
        }
        return undefined;
    }

}