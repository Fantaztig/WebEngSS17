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
                if(this.hasControlType(0)){
                    this.booleaninput = this.getControl(0).current;
                }
                if(this.hasControlType(1)){
                    this.discreteinput = this.getControl(1).current;
                }
                if(this.hasControlType(2)){
                    this.continuousinput = this.getControl(2).current;
                }
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

    continuoustext: String = "";
    booleantext: String = "";
    discretetext: String = "";
    continuousinput: number;
    booleaninput: number;
    discreteinput: number;

    onSubmit(type: ControlType) {
        switch (type) {
            case ControlType.boolean:
                if(this.booleaninput != this.getControl(0).current){
                    this.booleantext += new Date().toLocaleString() + " " 
                    + (this.getControl(0).current ? 'Aktiviert' : 'Deaktiviert') + " -> " 
                    + (this.booleaninput ? 'Aktiviert' : 'Deaktiviert') + "\n";
                    this.getControl(0).current = this.booleaninput;
                }
                
                break;
            case ControlType.continuous:
            if(this.continuousinput != this.getControl(2).current){
                    this.continuoustext += new Date().toLocaleString() + " " 
                    + (this.getControl(2).current) + " -> " 
                    + (this.continuousinput) + "\n";
                    this.getControl(2).current = this.continuousinput;
                }
                
                break;
            case ControlType.enum:
            if(this.discreteinput != this.getControl(1).current){
                    this.discretetext += new Date().toLocaleString() + " " 
                    + (this.getControl(1).current==0 ? 'Aus' : this.getControl(1).current==1 ? 'Standby' : 'Ein') + " -> " 
                    + (this.discreteinput==0 ? 'Aus' : this.discreteinput==1 ? 'Standby' : 'Ein') + "\n";
                    this.getControl(1).current = this.discreteinput;
                }
                
                break;
            default:
            alert("Unexpected error!");
                break;
        }

    }

}