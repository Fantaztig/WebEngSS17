/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {Component, OnInit} from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component ({
    moduleId: module.id,
    selector: 'navi',
    templateUrl: 'navi.component.html'
})

export class NavComponent implements OnInit {

    currentComponent: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
            let currentRoute = this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            currentRoute.url.subscribe((url) => {
                this.currentComponent = url[0].path;
            });
        })
    }
}