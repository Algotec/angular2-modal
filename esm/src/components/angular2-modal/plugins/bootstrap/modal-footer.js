/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
/**
 * Represents the modal footer for storing buttons.
 */
export let BSModalFooter = class BSModalFooter {
    constructor() {
        /**
         * Emitted when a button was clicked
         * @type {EventEmitter<FooterButtonClickEvent>}
         */
        this.onButtonClick = new EventEmitter();
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        this.onButtonClick.emit({ btn, $event });
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], BSModalFooter.prototype, "footerClass", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Array)
], BSModalFooter.prototype, "buttons", void 0);
__decorate([
    Output(), 
    __metadata('design:type', Object)
], BSModalFooter.prototype, "onButtonClick", void 0);
BSModalFooter = __decorate([
    Component({
        selector: 'modal-footer',
        encapsulation: ViewEncapsulation.None,
        template: `<div [ngClass]="footerClass">
    <button *ngFor="let btn of buttons;"
            [ngClass]="btn.cssClass"
            (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
    }), 
    __metadata('design:paramtypes', [])
], BSModalFooter);

//# sourceMappingURL=modal-footer.js.map
