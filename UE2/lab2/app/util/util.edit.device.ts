/**
 * Created by Reyhan Ibrahim on 15.04.2017.
 */
import {Directive, HostListener, ElementRef, Renderer, HostBinding} from '@angular/core';

@Directive({
    selector: '[highlightMouse]'
})

export class SaveDeviceNameDirective{
    @HostListener('mouseenter') onMouseOver(){
        //this._renderer.setElementAttribute(this._elementRef.nativeElement,"src","../../images/ok.png");
        //this._renderer.setElementStyle(this._elementRef.nativeElement, 'background-color','yellow');
        //console.log("sad");
        this.backgroundColor="red";
    }

    @HostBinding('style.backgroundColor') backgroundColor:string;

    constructor(
        private _elementRef:ElementRef,
        private _renderer: Renderer
    ){

}
}