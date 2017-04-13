/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {Component} from '@angular/core'

@Component ({
    moduleId: module.id,
    selector: 'navi',
    template: `

        <header aria-labelledby="bannerheadline">
        <a routerLink="/login">
            <img class="title-image" src="/images/big-logo-small.png" alt="BIG Smart Home logo">
        </a>
        <h1 class="header-title" id="bannerheadline">
            BIG Smart Home
        </h1>
        <nav aria-labelledby="navigationheadline">
            <h2 class="accessibility" id="navigationheadline">Navigation</h2>
            <ul class="navigation-list">
            </ul>
        </nav>
    </header>

    `

})

export class NavComponent{

}