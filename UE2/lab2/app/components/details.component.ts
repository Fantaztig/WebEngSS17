/**
 * Created by Paul Proell on 14.04.2017.
 */
import {Component, OnInit, ViewChild} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DeviceService} from '../services/device.service';
import {Device} from '../model/device';
import {ControlType} from '../model/controlType';
import {BaseChartDirective} from "ng2-charts";
import { DatePipe } from '@angular/common';



@Component ({
    moduleId: module.id,
    selector: 'device-details',
    templateUrl: 'details.component.html',
    providers: [DeviceService]
})



export class DetailsComponent implements OnInit{

    device: Device;

    dataLoaded: Boolean = false;
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    userName:string = localStorage.getItem("userName");


    constructor(private deviceService: DeviceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() { 
        this.activatedRoute.params.subscribe((params: Params) => {
            let deviceId = params['id'];
            this.deviceService.getDevice(deviceId).then((device) => {
                this.device = device;
                this.dataLoaded = true;
                if(this.hasControlType(0)){
                    this.booleaninput = this.getControl(0).current;
                    this.doughnutChartData[this.booleaninput]++;
                }
                if(this.hasControlType(1)){
                    this.discreteinput = this.getControl(1).current;
                    this.polarAreaChartData[this.discreteinput]++;
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
                    
                    this.doughnutChartData[Number(this.booleaninput)]++;
                }
                break;
            case ControlType.continuous:
            if(this.continuousinput != this.getControl(2).current){
                    this.continuoustext += new Date().toLocaleString() + " " 
                    + (this.getControl(2).current) + " -> " 
                    + (this.continuousinput) + "\n";
                    this.getControl(2).current = this.continuousinput;
                    this.barChartData[0].data[this.barChartData[0].data.length]=this.continuousinput;

                    this.lineChartLabels[this.lineChartLabels.length]= (new Date().toLocaleString()).substring(11);
                }

                break;
            case ControlType.enum:
            if(this.discreteinput != this.getControl(1).current){
                    this.discretetext += new Date().toLocaleString() + " " 
                    + (this.getControl(1).current==0 ? 'Aus' : this.getControl(1).current==1 ? 'Standby' : 'Ein') + " -> " 
                    + (this.discreteinput==0 ? 'Aus' : this.discreteinput==1 ? 'Standby' : 'Ein') + "\n";
                    this.getControl(1).current = this.discreteinput;

                    this.polarAreaChartData[this.discreteinput]++;
                }

                break;
            default:
            alert("Unexpected error!");
                break;
        }
        this.barChartData = this.barChartData.slice();
        this.polarAreaChartData = this.polarAreaChartData.slice();
        this.doughnutChartData = this.doughnutChartData.slice();
    }
    public lineChartLabels:Array<any> = [];
    private barChartOptions: any = {
        scaleShowVerticalLines: true,
        scaleShowHorizontalLines: true,
        responsive: true
    };

    private barChartLegend: boolean = true;

    private barChartData: any[] = [
        { data: [], label: 'Temperatur' }

    ];

    // events
    private chartClicked(e: any): void {
        console.log(e);
    }

    private chartHovered(e: any): void {
        console.log(e);
    }


    public doughnutChartLabels:string[] = ['Aus', 'An'];
    public doughnutChartData:number[] = [ 0, 0];

    public polarAreaChartLabels:string[] = ['Aus', 'Standby', 'Ein'];
    public polarAreaChartData:number[] = [0,0,0] ;
    public polarAreaLegend:boolean = true;



}