import {Component, Input, OnInit} from '@angular/core';
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";
import {DeviceService} from "../services/device.service";
import {SocketService} from "../services/socket.service";

@Component({
    moduleId: module.id,
    selector: 'boolean-details',
    templateUrl: '../views/boolean-device-details.component.html'
})
export class BooleanDeviceDetailsComponent implements OnInit {
    @Input()
    device: Device;

    @Input()
    controlUnit: ControlUnit;

    new_value: boolean;
    log_message: string = null;

    constructor(private deviceService: DeviceService, private socketService: SocketService) {
    }

    ngOnInit(): void {
        this.new_value = this.controlUnit.current == 1;

        let item = JSON.parse(sessionStorage.getItem(this.device.id+this.controlUnit.name));
        if (item !== null) {
            this.doughnutChartData[0] = item.data[0];
            this.doughnutChartData[1] = item.data[1];
            this.doughnutChartData.slice();
            if (item.log != undefined) {
                this.controlUnit.log = item.log;
            }
        }
    }

    /**
     * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
     */
    onSubmit(): void {
        this.doughnutChartData[this.new_value ? 1 : 0]++;
        this.doughnutChartData = Object.assign({}, this.doughnutChartData);


        let currentDate = new Date().toLocaleString();
        let newLog = currentDate + ": " + (this.controlUnit.current == 1 ? "An" : "Aus") + " -> " + (this.new_value ? "An" : "Aus");

        this.controlUnit.current = this.new_value ? 1 : 0;

        this.deviceService.changeDevice(this.device, {log: newLog, controlUnit: this.controlUnit, new_value: this.new_value ? 1 : 0, current_date: currentDate}).subscribe();

        if (this.controlUnit.log != null) {
            this.controlUnit.log += "\n";
        } else {
            this.controlUnit.log = "";
        }
        this.controlUnit.log += newLog;


    }

    public doughnutChartData: number[] = [0, 0];
    public doughnutChartLabels: string[] = ['Aus', 'An'];
    public doughnutChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
    };
    public doughnutChartLegend: boolean = true;
    public doughnutChartType: string = 'doughnut';

}
