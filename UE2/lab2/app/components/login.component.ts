/**
 * Created by Reyhan Ibrahim on 13.04.2017.
 */
import {Component} from '@angular/core'

@Component ({
    moduleId: module.id,
    selector: 'login',
    template: `

        <navi></navi>
        <div class="main-container">
            <main aria-labelledby="formheadline">
                <form class="form" method="post" action="overview.html">
                    <h2 id="formheadline" class="registration-headline">Anmelden</h2>
                    <div class="form-row">
                        <label class="form-label" for="username-input">
                            Benutzername
                        </label>
                        <input type="text" name="username" id="username-input" required class="form-input">
                        <span id="username-error" class="error-text"></span>
                    </div>
                    <div class="form-row">
                        <label class="form-label" for="password-input">
                            Passwort
                        </label>
                        <input type="password" name="password" id="password-input" required class="form-input" minlength="4"
                               maxlength="12">
                        <span id="password-error" class="error-text"></span>
                    </div>
                    <div class="form-row form-row-center">
                        <button class="button button-submit">
                            Anmelden
                        </button>
                    </div>
                </form>
            </main>
        </div>
              
    
    `

})

export class LoginComponent{

}