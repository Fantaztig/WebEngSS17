import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {

    let loggedIn = !(localStorage.getItem("token") == null || localStorage.getItem("token") == undefined);
	console.log(loggedIn);
    if(!loggedIn) {
        this.router.navigate(['login']);
    }
    return loggedIn;
  }
}