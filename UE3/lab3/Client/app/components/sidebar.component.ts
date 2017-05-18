import {Component, OnInit} from "@angular/core";
import {StateService} from "../services/state.service";

@Component({
  moduleId: module.id,
  selector: 'my-sidebar',
  templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit{

  failed_logins: number = 0;
  server_start: Date = new Date();

  constructor(private stateService: StateService){}

  ngOnInit(): void {
    //TODO Lesen Sie über die REST-Schnittstelle den Status des Servers aus und speichern Sie diesen in obigen Variablen
    this.stateService.getState().subscribe(
      res => {
        this.failed_logins = res.failed_logins;
        this.server_start = res.server_start;
      }
    )
  }
}
