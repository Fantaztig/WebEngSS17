import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OverviewComponent} from "./overview.component";
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {ControlUnit} from "../model/controlUnit";
import {ControlType} from "../model/controlType";

@Component({
  moduleId: module.id,
  selector: 'my-overlay',
  templateUrl: '../views/overlay.component.html'
})
export class OverlayComponent implements OnInit {

  @Input()
  overviewComponent: OverviewComponent = null;

  device_types: any;
  controlUnit_types: any;
  selected_type: string = null;
  controlUnitType_selected: string = null;

  addError: boolean = false;
  createError: boolean = false;

  constructor(private deviceService: DeviceService) {
  }


  ngOnInit(): void {
    this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"]
    this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
    this.selected_type = this.device_types[0];
    this.controlUnitType_selected = this.controlUnit_types[0];
  }

  doClose(): void {
    if (this.overviewComponent != null) {
      this.overviewComponent.closeAddDeviceWindow();
    }
  }

  /**
   * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
   * @param form
   */
  onSubmit(form: NgForm): void {

    var device: Device = new Device();
    device.display_name = form.value["displayname"];
    device.type = form.value["type-input"];
    device.type_name = form.value.typename;
    device.image_alt = "";
    device.description = "";
    switch(device.type) {
      case "Beleuchtung":
        device.image = "images/bulb.svg";
        break;
      case "Heizkörperthermostat":
        device.image = "images/thermometer.svg";
        break;
      case "Rollladen":
        device.image = "images/roller_shutter.svg";
        break;
      case "Überwachungskamera":
        device.image = "images/webcam.svg";
        break;
      case "Webcam":
        device.image = "images/webcam.svg";
        break;
    }

    let controlUnit: ControlUnit = new ControlUnit();
    controlUnit.name = form.value.elementname;
    controlUnit.primary = true;
    switch(this.controlUnitType_selected) {
      case "Ein/Auschalter":
        controlUnit.type = ControlType.boolean;
        break;
      case "Diskrete Werte":
        controlUnit.type = ControlType.enum;
        break;
      case "Kontinuierlicher Wert":
        controlUnit.type = ControlType.continuous;
        break;
    }

    if(form.value["minimum-value"] != undefined && form.value["maximum-value"] != undefined) {
      controlUnit.min = form.value["minimum-value"];
      controlUnit.max = form.value["maximum-value"];
    }

    if(form.value["discrete-values"] != undefined) {
      let values = form.value["discrete-values"].split(",");
      for(var i = 0; i < values.length; i++) {
        values[i] = values[i].trim();
      }
      controlUnit.values = values;
    }

    let control_units: [ControlUnit];
    control_units = [controlUnit];

    device.control_units = control_units;

    this.deviceService.addDevice(device).subscribe(res => {});

    form.reset();
    this.overviewComponent.closeAddDeviceWindow();

    //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle

  }

  isSelected(type: string): boolean {
    return type == this.device_types[0];
  }

  isBooleanSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[0];
  }

  isEnumSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[1];
  }

  isContinuousSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[2];
  }

}
