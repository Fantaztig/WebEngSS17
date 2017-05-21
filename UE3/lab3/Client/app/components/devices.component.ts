import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {DeviceParserService} from "../services/device-parser.service";
import {SocketService} from "../services/socket.service";
import {ControlType} from "../model/controlType";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'my-devices',
    templateUrl: '../views/devices.component.html'
})
export class DevicesComponent implements OnInit, AfterViewChecked {

    devices: Device[];
    update: boolean = true;
    edit: { id: string, value: boolean }[];

    device_num: number = 0;

    constructor(private deviceService: DeviceService, private parserService: DeviceParserService, private socketService: SocketService) {
    }

    ngOnInit(): void {
        this.update = true;
        this.listDevices();

        this.socketService.getConnection().subscribe(
            res => {
                let message = JSON.parse(res.data);
                console.log(message);

                if(message.action == "delete") {
                    for(let i = 0; i < this.devices.length; i++) {
                        if(this.devices[i].id == message.device) {
                            this.devices.splice(i,1);
                            for(let j = 0; j < this.edit.length; j++) {
                                if(this.edit[j].id == message.device) {
                                    this.edit.splice(j, 1);
                                }
                            }
                        }
                    }
                }
                if(message.action == "change") {
                    for(let i = 0; i < this.devices.length; i++) {
                        if(this.devices[i].id == message.device) {
                            Object.assign(this.devices[i], message.device_object);
                            this.devices[i] = this.parserService.parseDevice(this.devices[i]);
                            break;
                        }
                    }
                    if (message.diagram.log != null && message.diagram.log != undefined) {
                        let log = JSON.parse(sessionStorage.getItem(message.device + message.diagram.controlUnit.name));
                        let controlUnit = message.diagram.controlUnit;
                        if (log == null) {
                            log = {};
                        }
                        if (log.data == undefined) {
                            switch (controlUnit.type) {
                                case ControlType.boolean:
                                    log.data = [0, 0];
                                    break;
                                case ControlType.enum:
                                    log.data = [];
                                    for (let i = 0; i < controlUnit.values.length; i++) {
                                        log.data[i] = 0;
                                    }
                                    break;
                                case ControlType.continuous:
                                    log.data = [];
                                    log.labels = [];
                                    break;
                            }

                        }
                        if (log.log == undefined) {
                            log.log = message.diagram.log;
                        } else {
                            log.log += "\n" + message.diagram.log;
                        }

                        // Update Value in Diagram
                        switch (controlUnit.type) {
                            case ControlType.boolean:
                                log.data[message.diagram.new_value]++;
                                break;
                            case ControlType.enum:
                                log.data[message.diagram.new_value]++;
                                break;
                            case ControlType.continuous:
                                log.data.push(message.diagram.new_value);
                                log.labels.push(message.diagram.current_date);
                                break;
                        }
                        sessionStorage.setItem(message.device + message.diagram.controlUnit.name, JSON.stringify(log));
                    }
                }
                if(message.action == "added") {
                    let found = false;
                    for(let i = 0; i < this.devices.length; i++) {
                        if(this.devices[i].id == message.device.id) {
                            found = true;
                        }
                    }
                    if(!found) {
                        let device = this.parserService.parseDevice(message.device);
                        this.devices.push(device);
                        this.edit.push({id: device.id, value: false});
                    }
                }
            }
        )
    }


    ngAfterViewChecked(): void {
        if (this.devices != null && this.device_num != this.devices.length && this.device_num < this.devices.length) {
            this.update = true;
            this.device_num = this.devices.length
        }

        if (this.devices != null && this.device_num > this.devices.length) {
            this.device_num = this.devices.length;
        }

        if (this.devices == null || !this.update) {
            return;
        }

        this.update = false;
        for (let device of this.devices) {
            if (device.draw_image == null) {
                continue;
            }
            for (let control_unit of device.control_units) {
                if (control_unit.primary) {
                    device.draw_image(device.id, device.image, control_unit.min, control_unit.max, control_unit.current, control_unit.values);
                }
            }
        }
    }


    /**
     * Liest alle Geräte aus und initialisiert ein Flag zum Editierungs-Status dieses Gerätes
     */
    listDevices() {
        this.deviceService.getDevices().subscribe(res => {
            this.devices = res;
            this.edit = new Array(this.devices.length);
            for (let i = 0; i < this.devices.length; i++) {
                this.edit[i] = {id: this.devices[i].id, value: false};
            }
            this.device_num = this.devices.length;
        });
    }

    /**
     * Liest aus ob ein Gerät derzeit bearbeitet wird
     * @param device
     * @returns {boolean}
     */
    isEdited(device: Device): boolean {
        let index = this.findStatus(device);
        if (index < 0) {
            return false;
        }
        return this.edit[index].value;
    }

    /**
     * Liefert den index des gewünschten Gerätes innerhalb des Arrays für den Editierungs-Status zurück
     * @param device
     * @returns {number}
     */
    findStatus(device: Device): number {
        for (let i = 0; i < this.edit.length; i++) {
            if (device.id === this.edit[i].id) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Ersetzt das Geräte-Label durch ein Input-Field und ermöglicht so ein Ändern des Anzeigenamens
     * @param device
     */
    editDevice(device: Device): void {

        let index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = true;
        }

        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");

        var edit = device_outer.find(".device-edit");
        edit.hide();

        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/ok.png");

    }

    /**
     * Speichert die Änderungen welche am Gerät durchgeführt wurden
     * @param device
     */
    finishEdit(device: Device): void {
        this.showLabel(device);
        this.deviceService.changeDevice(device, {}).subscribe(res => {
            device.draw_image();
        });
    }

    /**
     * Entfernt das angegebene Gerät
     * @param device
     */
    removeDevice(device: Device): void {
        this.deviceService.deleteDevice(device.id).subscribe(res => {});
    }

    /**
     * Setz das Input-Feld wieder auf ein Label zurück und beendet so das Bearbeiten
     * @param device
     */
    showLabel(device: Device): void {

        let index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = false;
        }

        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");

        var edit = device_outer.find(".device-edit");
        edit.show();

        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/remove.png");
    }


}
