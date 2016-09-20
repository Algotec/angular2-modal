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
import { Component, ViewEncapsulation } from '@angular/core';
import { DialogRef } from "angular2-modal";
/**
 * A Component representing a generic bootstrap modal content element.
 *
 * By configuring a MessageModalContext instance you can:
 *
 *  Header:
 *      - Set header container class (default: modal-header)
 *      - Set title text (enclosed in H3 element)
 *      - Set title html (overrides text)
 *
 *  Body:
 *      - Set body container class.  (default: modal-body)
 *      - Set body container HTML.
 *
 *  Footer:
 *      - Set footer class.  (default: modal-footer)
 *      - Set button configuration (from 0 to n)
 */
export let BSMessageModal = class BSMessageModal {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    onFooterButtonClick($event) {
        $event.btn.onClick(this, $event.$event);
    }
    get titleHtml() {
        return this.context.titleHtml ? 1 : 0;
    }
};
BSMessageModal = __decorate([
    Component({
        selector: 'modal-content',
        encapsulation: ViewEncapsulation.None,
        template: `<div [ngClass]="context.headerClass" [ngSwitch]="titleHtml">
        <button *ngIf="context.showClose" type="button" class="close" 
                aria-label="Close" (click)="dialog.dismiss()">
            <span aria-hidden="true">×</span>
        </button>
        <div *ngSwitchCase="1" [innerHtml]="context.titleHtml"></div>
        <h3 *ngSwitchDefault class="modal-title">{{context.title}}</h3>
    </div>
    <div [ngClass]="context.bodyClass" [innerHtml]="context.message"></div>
    <modal-footer [footerClass]="context.footerClass" 
                  [buttons]="context.buttons"
                  (onButtonClick)="onFooterButtonClick($event)"></modal-footer>`
    }), 
    __metadata('design:paramtypes', [DialogRef])
], BSMessageModal);

//# sourceMappingURL=message-modal.js.map
