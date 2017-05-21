import {Component, Input, OnInit} from '@angular/core';
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";
import {DeviceService} from "../services/device.service";

@Component({
    moduleId: module.id,
    selector: 'enum-details',
    templateUrl: '../views/enum-device-details.component.html'
})
export class EnumDeviceDetailsComponent implements OnInit {
    @Input()
    device: Device;

    @Input()
    controlUnit: ControlUnit;

    constructor(private deviceService: DeviceService) {
    };

    new_value: string;
    log_message: string;

    ngOnInit(): void {
        this.new_value = this.controlUnit.values[this.controlUnit.current];

        for (let val of this.controlUnit.values) {
            this.polarChartLabels.push(val);
            this.polarChartData.push(0);
        }

        let item = JSON.parse(sessionStorage.getItem(this.device.id+this.controlUnit.name));
        if (item !== null) {
            this.polarChartData = item.data;
            if (item.log != undefined) {
                this.controlUnit.log = item.log;
            }
        }
        this.polarChartData = this.polarChartData.slice();
    }

    /**
     * Liest den neuen Wert des Steuerungselements aus und leitet diesen an die REST-Schnittstelle weiter
     */
    onSubmit(): void {
        //TODO Lesen Sie die eingebenen Daten aus und verarbeiten Sie diese über die REST-Schnittstelle

        let _polarChartData: Array<any> = Object.assign({}, this.polarChartData);
        let index = this.controlUnit.values.indexOf(this.new_value);
        _polarChartData[index]++;


        let currentDate = new Date().toLocaleString();
        let newLog = currentDate + ": " + this.controlUnit.values[this.controlUnit.current] + " -> " + this.new_value;

        if (this.controlUnit.log != null) {
            this.controlUnit.log += "\n";
        } else {
            this.controlUnit.log = "";
        }
        this.controlUnit.log += newLog;

        this.polarChartData = _polarChartData;
        this.controlUnit.current = index;

        this.deviceService.changeDevice(this.device, {log: newLog, controlUnit: this.controlUnit, new_value: index, current_date: currentDate}).subscribe();
    }

    isSelected(val: string): boolean {
        return val == this.controlUnit.values[this.controlUnit.current];
    }

    public polarChartLabels: string[] = [];

    public polarChartData: any = [];
    public polarChartType: string = 'polarArea';
    public polarChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false
    };
    public polarChartLegend: boolean = true;

}
